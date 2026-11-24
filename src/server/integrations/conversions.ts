import { createHash } from 'node:crypto'
import type { LeadSubmissionPayload } from '@/lib/lead'
import { resolveMetaPixelIds } from '@/lib/metaPixels'

type ConversionStatus = 'sent' | 'skipped' | 'failed'

interface MetaGraphError {
  error?: {
    code?: number
    error_subcode?: number
    message?: string
    type?: string
  }
}

export interface ConversionDispatchResult {
  meta: {
    status: ConversionStatus
    reason?: string
    pixel_results?: Array<{
      pixel_id: string
      status: ConversionStatus
      reason?: string
    }>
  }
  google_ads: {
    status: ConversionStatus
    reason?: string
  }
}

interface ConversionContext {
  clientIp: string
}

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

function normalizeForHash(value: string): string {
  return value.trim().toLowerCase()
}

function normalizePhoneForHash(phone: string): string {
  return phone.replace(/\D/g, '')
}

function splitFullName(name: string): { firstName: string; lastName: string } {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const firstName = parts.shift() || ''
  const lastName = parts.join(' ')

  return { firstName, lastName }
}

function hashArray(value?: string | null): string[] | undefined {
  const normalized = value?.trim()
  return normalized ? [sha256(normalizeForHash(normalized))] : undefined
}

function getDebtRangeValue(debtRange: string): number {
  const estimates: Record<string, number> = {
    ate_500k: 250000,
    '500k_a_2m': 1000000,
    '2m_a_5m': 3000000,
    mais_de_5m: 5000000,
  }

  return estimates[debtRange] || 1
}

function cleanCustomerId(value: string): string {
  return value.replace(/\D/g, '')
}

function removeUndefined<T extends Record<string, unknown>>(value: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== undefined && entry !== null && entry !== ''),
  ) as Partial<T>
}

function getEventUnixTime(payload: LeadSubmissionPayload): number {
  const parsed = Date.parse(payload.submitted_at)
  return Number.isFinite(parsed) ? Math.floor(parsed / 1000) : Math.floor(Date.now() / 1000)
}

function getFacebookClickId(payload: LeadSubmissionPayload, eventTime: number): string | undefined {
  if (payload.cookies._fbc) return payload.cookies._fbc

  const fbclid = payload.attribution.click_ids.fbclid
  if (!fbclid) return undefined

  return `fb.1.${eventTime}.${fbclid}`
}

function buildMetaUserData(payload: LeadSubmissionPayload, context: ConversionContext, eventTime: number) {
  const { firstName, lastName } = splitFullName(payload.contact.name)

  return removeUndefined({
    em: hashArray(payload.contact.email),
    ph: payload.contact.phone_normalized
      ? [sha256(normalizePhoneForHash(payload.contact.phone_normalized))]
      : undefined,
    fn: hashArray(firstName),
    ln: hashArray(lastName),
    st: hashArray(payload.qualification.property_state),
    country: [sha256('br')],
    external_id: [sha256(payload.lead_id)],
    client_ip_address: context.clientIp || undefined,
    client_user_agent: payload.technical.user_agent || undefined,
    fbp: payload.cookies._fbp,
    fbc: getFacebookClickId(payload, eventTime),
  })
}

function buildMetaCustomData(payload: LeadSubmissionPayload) {
  const debtValueEstimate = getDebtRangeValue(payload.qualification.debt_range)

  return removeUndefined({
    content_name: 'CBM lead form',
    content_category: payload.qualification.case_type,
    content_type: 'lead_form',
    content_ids: [payload.form.id, payload.qualification.case_type],
    currency: 'BRL',
    value: Number(process.env.META_LEAD_VALUE || 1),
    debt_value_estimate: debtValueEstimate,
    status: 'submitted',
    lead_id: payload.lead_id,
    form_id: payload.form.id,
    form_source: payload.form.source,
    page_path: payload.form.page_path,
    case_type: payload.qualification.case_type,
    debt_range: payload.qualification.debt_range,
    property_state: payload.qualification.property_state,
    urgency: payload.qualification.urgency,
    campaign_source: payload.attribution.campaign_source,
    sck: payload.attribution.sck || undefined,
    utm_source: payload.attribution.utm.utm_source,
    utm_medium: payload.attribution.utm.utm_medium,
    utm_campaign: payload.attribution.utm.utm_campaign,
    utm_content: payload.attribution.utm.utm_content,
    utm_term: payload.attribution.utm.utm_term,
    gclid: payload.attribution.click_ids.gclid,
    fbclid: payload.attribution.click_ids.fbclid,
  })
}

function getMetaFailureReason(status: number, body: MetaGraphError): string {
  const error = body.error
  const code = error?.code
  const subcode = error?.error_subcode
  const message = typeof error?.message === 'string' ? error.message : ''
  const messageSuffix = message ? `:${message.slice(0, 120)}` : ''

  if (status === 400 && code === 100 && subcode === 33) {
    return 'meta_permission_or_dataset_error:token_cannot_publish_events'
  }

  if (status === 403 || code === 200) {
    return 'meta_permission_error:token_missing_required_asset_access'
  }

  return `meta_${status}${messageSuffix}`
}

async function sendMetaConversion(
  pixelId: string,
  payload: LeadSubmissionPayload,
  context: ConversionContext,
): Promise<NonNullable<ConversionDispatchResult['meta']['pixel_results']>[number]> {
  const accessToken = process.env.META_ACCESS_TOKEN?.trim()

  if (!accessToken) return { pixel_id: pixelId, status: 'skipped', reason: 'meta_not_configured' }

  const eventTime = getEventUnixTime(payload)
  const userData = buildMetaUserData(payload, context, eventTime)
  const body = removeUndefined({
    data: [
      {
        event_name: 'Lead',
        event_time: eventTime,
        event_id: payload.lead_id,
        action_source: 'website',
        event_source_url: payload.attribution.current_url,
        user_data: userData,
        custom_data: buildMetaCustomData(payload),
      },
    ],
    test_event_code: process.env.META_TEST_EVENT_CODE?.trim(),
  })
  const version = process.env.META_GRAPH_API_VERSION || 'v21.0'
  const response = await fetch(
    `https://graph.facebook.com/${version}/${encodeURIComponent(pixelId)}/events?access_token=${encodeURIComponent(accessToken)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    },
  )

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({})) as MetaGraphError

    return { pixel_id: pixelId, status: 'failed', reason: getMetaFailureReason(response.status, errorBody) }
  }

  return { pixel_id: pixelId, status: 'sent' }
}

async function sendMetaConversions(
  payload: LeadSubmissionPayload,
  context: ConversionContext,
): Promise<ConversionDispatchResult['meta']> {
  const pixelIds = resolveMetaPixelIds(process.env.META_PIXEL_IDS, process.env.META_PIXEL_ID)
  const accessToken = process.env.META_ACCESS_TOKEN?.trim()

  if (!accessToken) return { status: 'skipped', reason: 'meta_not_configured' }
  if (pixelIds.length === 0) return { status: 'skipped', reason: 'meta_pixels_not_configured' }

  const pixelResults = await Promise.all(pixelIds.map((pixelId) => sendMetaConversion(pixelId, payload, context)))
  const sentCount = pixelResults.filter((result) => result.status === 'sent').length
  const failedResults = pixelResults.filter((result) => result.status === 'failed')

  if (sentCount === pixelResults.length) {
    return { status: 'sent', pixel_results: pixelResults }
  }

  if (sentCount > 0) {
    return { status: 'sent', reason: 'meta_partial_pixel_delivery', pixel_results: pixelResults }
  }

  return {
    status: failedResults.length > 0 ? 'failed' : 'skipped',
    reason: failedResults[0]?.reason || pixelResults[0]?.reason,
    pixel_results: pixelResults,
  }
}

function getGoogleClickIdentifier(payload: LeadSubmissionPayload): Record<string, string> | null {
  const { gclid, gbraid, wbraid } = payload.attribution.click_ids

  if (gclid) return { gclid }
  if (gbraid) return { gbraid }
  if (wbraid) return { wbraid }
  return null
}

function formatGoogleAdsDateTime(isoDate: string): string {
  const date = new Date(isoDate)
  const safeDate = Number.isNaN(date.getTime()) ? new Date() : date
  const pad = (value: number) => String(value).padStart(2, '0')

  return [
    safeDate.getUTCFullYear(),
    '-',
    pad(safeDate.getUTCMonth() + 1),
    '-',
    pad(safeDate.getUTCDate()),
    ' ',
    pad(safeDate.getUTCHours()),
    ':',
    pad(safeDate.getUTCMinutes()),
    ':',
    pad(safeDate.getUTCSeconds()),
    '+00:00',
  ].join('')
}

async function getGoogleAccessToken(): Promise<string | null> {
  const clientId = process.env.GOOGLE_ADS_OAUTH_CLIENT_ID?.trim()
  const clientSecret = process.env.GOOGLE_ADS_OAUTH_CLIENT_SECRET?.trim()
  const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN?.trim()

  if (!clientId || !clientSecret || !refreshToken) return null

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
    cache: 'no-store',
  })
  const body = await response.json().catch(() => ({}))

  return response.ok && typeof body.access_token === 'string' ? body.access_token : null
}

async function sendGoogleAdsConversion(
  payload: LeadSubmissionPayload,
): Promise<ConversionDispatchResult['google_ads']> {
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN?.trim()
  const customerId = cleanCustomerId(process.env.GOOGLE_ADS_CUSTOMER_ID || '')
  const conversionCustomerId = cleanCustomerId(process.env.GOOGLE_ADS_CONVERSION_CUSTOMER_ID || customerId)
  const conversionActionId = process.env.GOOGLE_ADS_CONVERSION_ACTION_ID?.trim()
  const clickIdentifier = getGoogleClickIdentifier(payload)

  if (!developerToken || !customerId || !conversionCustomerId || !conversionActionId) {
    return { status: 'skipped', reason: 'google_ads_not_configured' }
  }

  if (!clickIdentifier) return { status: 'skipped', reason: 'google_click_id_missing' }

  const accessToken = await getGoogleAccessToken()
  if (!accessToken) return { status: 'failed', reason: 'google_oauth_failed' }

  const userIdentifiers = [
    payload.contact.email ? { hashedEmail: sha256(normalizeForHash(payload.contact.email)) } : null,
    payload.contact.phone_normalized ? { hashedPhoneNumber: sha256(normalizePhoneForHash(payload.contact.phone_normalized)) } : null,
  ].filter(Boolean)
  const consentValue = process.env.GOOGLE_ADS_AD_USER_DATA_CONSENT?.trim()
  const conversion = removeUndefined({
    conversionAction: `customers/${conversionCustomerId}/conversionActions/${conversionActionId}`,
    conversionDateTime: formatGoogleAdsDateTime(payload.submitted_at),
    conversionValue: Number(process.env.GOOGLE_ADS_LEAD_VALUE || 1),
    currencyCode: 'BRL',
    orderId: payload.lead_id,
    ...clickIdentifier,
    userIdentifiers,
    consent: consentValue ? { adUserData: consentValue } : undefined,
  })
  const version = process.env.GOOGLE_ADS_API_VERSION || 'v21'
  const headers = removeUndefined({
    Authorization: `Bearer ${accessToken}`,
    'developer-token': developerToken,
    'login-customer-id': process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID
      ? cleanCustomerId(process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID)
      : undefined,
    'Content-Type': 'application/json',
  }) as HeadersInit
  const response = await fetch(
    `https://googleads.googleapis.com/${version}/customers/${customerId}:uploadClickConversions`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        conversions: [conversion],
        partialFailure: true,
        validateOnly: process.env.GOOGLE_ADS_VALIDATE_ONLY === 'true',
      }),
      cache: 'no-store',
    },
  )

  if (!response.ok) return { status: 'failed', reason: `google_ads_${response.status}` }

  return { status: 'sent' }
}

export async function sendServerConversionEvents(
  payload: LeadSubmissionPayload,
  context: ConversionContext,
): Promise<ConversionDispatchResult> {
  const [meta, googleAds] = await Promise.allSettled([
    sendMetaConversions(payload, context),
    sendGoogleAdsConversion(payload),
  ])

  return {
    meta: meta.status === 'fulfilled' ? meta.value : { status: 'failed', reason: 'meta_request_error' },
    google_ads: googleAds.status === 'fulfilled'
      ? googleAds.value
      : { status: 'failed', reason: 'google_ads_request_error' },
  }
}
