import { caseTypeOptions, debtRangeOptions, type LeadSubmissionPayload, urgencyOptions } from '@/lib/lead'

const DEFAULT_GHL_API_BASE_URL = 'https://services.leadconnectorhq.com'
const DEFAULT_GHL_API_VERSION = '2021-07-28'
const DEFAULT_LOCATION_ID = 'NoHjXMKNvasUNgguYqhh'
const DEFAULT_PIPELINE_ID = '1MWgwclGcJcslagWVHMe'
const DEFAULT_PIPELINE_STAGE_ID = 'a432ec74-829e-47a6-b6dc-1c61cfd4fcfc'

type GhlRequestResult = {
  status: 'success' | 'skipped'
  id?: string
}

export interface GhlLeadResult {
  contact: GhlRequestResult
  opportunity: GhlRequestResult
  note: GhlRequestResult
  pipeline_id: string
  pipeline_stage_id: string
}

export class GhlIntegrationError extends Error {
  constructor(
    message: string,
    readonly status = 502,
    readonly code = 'ghl_integration_failed',
  ) {
    super(message)
  }
}

interface GhlConfig {
  apiBaseUrl: string
  apiVersion: string
  token: string
  locationId: string
  pipelineId: string
  pipelineStageId: string
  createTrackingNote: boolean
}

interface GhlPipeline {
  id?: string
  name?: string
  stages?: Array<{ id?: string; name?: string }>
}

const TRACKING_COOKIE_KEYS = [
  'sck',
  '_fbp',
  '_fbc',
  '_ga',
  '_gid',
  '_gcl_aw',
  '_gcl_dc',
  '_gcl_gb',
] as const

function getGhlConfig(): GhlConfig {
  const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN?.trim()

  if (!token) {
    throw new GhlIntegrationError('Integração GHL não configurada.', 503, 'ghl_not_configured')
  }

  return {
    apiBaseUrl: (process.env.GHL_API_BASE_URL || DEFAULT_GHL_API_BASE_URL).replace(/\/$/, ''),
    apiVersion: process.env.GHL_API_VERSION || DEFAULT_GHL_API_VERSION,
    token,
    locationId: process.env.GHL_LOCATION_ID || DEFAULT_LOCATION_ID,
    pipelineId: process.env.GHL_PIPELINE_ID || DEFAULT_PIPELINE_ID,
    pipelineStageId: process.env.GHL_PIPELINE_STAGE_ID || DEFAULT_PIPELINE_STAGE_ID,
    createTrackingNote: process.env.GHL_CREATE_TRACKING_NOTE !== 'false',
  }
}

function authHeaders(config: GhlConfig) {
  return {
    Accept: 'application/json',
    Authorization: `Bearer ${config.token}`,
    Version: config.apiVersion,
  }
}

async function readJson(response: Response): Promise<Record<string, unknown>> {
  const text = await response.text()
  if (!text) return {}

  try {
    return JSON.parse(text) as Record<string, unknown>
  } catch {
    return { raw: text.slice(0, 1000) }
  }
}

async function ghlFetch(config: GhlConfig, path: string, init?: RequestInit) {
  const response = await fetch(`${config.apiBaseUrl}${path}`, {
    ...init,
    headers: {
      ...authHeaders(config),
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
    cache: 'no-store',
  })
  const body = await readJson(response)

  if (!response.ok) {
    const message = typeof body.message === 'string' ? body.message : 'Falha ao integrar com o GHL.'
    throw new GhlIntegrationError(message, response.status, 'ghl_api_error')
  }

  return body
}

function getContactId(response: Record<string, unknown>): string {
  const contact = response.contact

  if (contact && typeof contact === 'object' && 'id' in contact && typeof contact.id === 'string') {
    return contact.id
  }

  if (typeof response.id === 'string') return response.id
  if (typeof response.contactId === 'string') return response.contactId

  throw new GhlIntegrationError('GHL não retornou o ID do contato.', 502, 'ghl_contact_id_missing')
}

function getOpportunityId(response: Record<string, unknown>): string | undefined {
  const opportunity = response.opportunity

  if (
    opportunity &&
    typeof opportunity === 'object' &&
    'id' in opportunity &&
    typeof opportunity.id === 'string'
  ) {
    return opportunity.id
  }

  if (typeof response.id === 'string') return response.id
  if (typeof response.opportunityId === 'string') return response.opportunityId
  return undefined
}

function getNoteId(response: Record<string, unknown>): string | undefined {
  const note = response.note

  if (note && typeof note === 'object' && 'id' in note && typeof note.id === 'string') {
    return note.id
  }

  if (typeof response.id === 'string') return response.id
  return undefined
}

function splitName(name: string) {
  const parts = name.trim().split(/\s+/)
  const firstName = parts.shift() || name
  const lastName = parts.join(' ')

  return { firstName, lastName }
}

function compactObject<T extends Record<string, unknown>>(value: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== undefined && entry !== null && entry !== ''),
  ) as Partial<T>
}

function sanitizeTag(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

function labelFor(options: readonly { value: string; label: string }[], value: string): string {
  return options.find((option) => option.value === value)?.label || value
}

function estimateMonetaryValue(debtRange: string): number {
  const estimates: Record<string, number> = {
    ate_500k: 250000,
    '500k_a_2m': 1000000,
    '2m_a_5m': 3000000,
    mais_de_5m: 5000000,
  }

  return estimates[debtRange] || 0
}

function buildTags(payload: LeadSubmissionPayload): string[] {
  const source = sanitizeTag(payload.attribution.campaign_source || payload.form.source)

  return [
    'cbm-site',
    'lead-stepwise-v1',
    `form-${sanitizeTag(payload.form.id)}`,
    `caso-${sanitizeTag(payload.qualification.case_type)}`,
    `urgencia-${sanitizeTag(payload.qualification.urgency)}`,
    source ? `origem-${source}` : '',
  ].filter(Boolean)
}

function pickTrackingCookies(cookies: Record<string, string>) {
  return compactObject(
    Object.fromEntries(TRACKING_COOKIE_KEYS.map((key) => [key, cookies[key]])) as Record<string, unknown>,
  )
}

function stringifyTrackingObject(value: Record<string, unknown>): string | undefined {
  const cleaned = compactObject(value)
  return Object.keys(cleaned).length ? JSON.stringify(cleaned) : undefined
}

function buildAttributionSource(payload: LeadSubmissionPayload) {
  const clickIds = compactObject(payload.attribution.click_ids)
  const utm = compactObject(payload.attribution.utm)
  const urlParams = compactObject(payload.attribution.url_params)
  const trackingCookies = pickTrackingCookies(payload.cookies)
  const sck = payload.attribution.sck || payload.cookies.sck

  return compactObject({
    url: payload.attribution.current_url,
    landingPageUrl: payload.attribution.landing_page_url,
    currentUrl: payload.attribution.current_url,
    pageUrl: payload.form.page_url,
    pagePath: payload.form.page_path,
    campaign: utm.utm_campaign,
    campaignSource: payload.attribution.campaign_source,
    utmSource: utm.utm_source,
    utmMedium: utm.utm_medium,
    utmCampaign: utm.utm_campaign,
    utmContent: utm.utm_content,
    utmTerm: utm.utm_term,
    referrer: payload.attribution.referrer,
    fbclid: clickIds.fbclid,
    gclid: clickIds.gclid,
    gbraid: clickIds.gbraid,
    wbraid: clickIds.wbraid,
    msclkid: clickIds.msclkid,
    ttclid: clickIds.ttclid,
    sck,
    fbc: trackingCookies._fbc,
    fbp: trackingCookies._fbp,
    ga: trackingCookies._ga,
    gid: trackingCookies._gid,
    gclAw: trackingCookies._gcl_aw,
    gclDc: trackingCookies._gcl_dc,
    gclGb: trackingCookies._gcl_gb,
    urlParams,
    utm,
    clickIds,
    trackingCookies,
    urlParamsJson: stringifyTrackingObject(urlParams),
    utmJson: stringifyTrackingObject(utm),
    clickIdsJson: stringifyTrackingObject(clickIds),
    trackingCookiesJson: stringifyTrackingObject(trackingCookies),
  })
}

function buildContactPayload(config: GhlConfig, payload: LeadSubmissionPayload) {
  const { firstName, lastName } = splitName(payload.contact.name)

  return compactObject({
    firstName,
    lastName,
    name: payload.contact.name,
    email: payload.contact.email,
    phone: payload.contact.phone_normalized,
    locationId: config.locationId,
    source: payload.attribution.campaign_source || payload.form.source,
    country: 'BR',
    state: payload.qualification.property_state,
    timezone: payload.technical.timezone,
    tags: buildTags(payload),
    attributionSource: buildAttributionSource(payload),
    createNewIfDuplicateAllowed: false,
  })
}

function buildOpportunityPayload(config: GhlConfig, payload: LeadSubmissionPayload, contactId: string) {
  const caseLabel = labelFor(caseTypeOptions, payload.qualification.case_type)

  return compactObject({
    locationId: config.locationId,
    pipelineId: config.pipelineId,
    pipelineStageId: config.pipelineStageId,
    contactId,
    name: `${payload.contact.name} - ${caseLabel}`,
    status: 'open',
    monetaryValue: estimateMonetaryValue(payload.qualification.debt_range),
    source: payload.attribution.campaign_source || payload.form.source,
  })
}

function buildTrackingNote(payload: LeadSubmissionPayload): string {
  const caseLabel = labelFor(caseTypeOptions, payload.qualification.case_type)
  const debtLabel = labelFor(debtRangeOptions, payload.qualification.debt_range)
  const urgencyLabel = labelFor(urgencyOptions, payload.qualification.urgency)
  const tracking = {
    lead_id: payload.lead_id,
    submitted_at: payload.submitted_at,
    form: payload.form,
    qualification: payload.qualification,
    attribution: payload.attribution,
    cookies: payload.cookies,
    technical: payload.technical,
  }

  return [
    `Lead recebido pelo site CBM (${payload.form.id}).`,
    `Caso: ${caseLabel}.`,
    `Valor/faixa: ${debtLabel}.`,
    `Estado: ${payload.qualification.property_state}.`,
    `Urgência: ${urgencyLabel}.`,
    payload.qualification.message ? `Mensagem: ${payload.qualification.message}` : '',
    '',
    'Tracking estruturado:',
    JSON.stringify(tracking, null, 2),
  ].filter(Boolean).join('\n').slice(0, 12000)
}

async function maybeValidatePipeline(config: GhlConfig) {
  if (process.env.GHL_VALIDATE_PIPELINE !== 'true') return

  const response = await ghlFetch(
    config,
    `/opportunities/pipelines?locationId=${encodeURIComponent(config.locationId)}`,
  )
  const pipelines = Array.isArray(response.pipelines) ? response.pipelines as GhlPipeline[] : []
  const pipeline = pipelines.find((entry) => entry.id === config.pipelineId)
  const hasStage = pipeline?.stages?.some((stage) => stage.id === config.pipelineStageId)

  if (!pipeline || !hasStage) {
    throw new GhlIntegrationError('Pipeline ou etapa GHL não encontrados.', 502, 'ghl_pipeline_not_found')
  }
}

export async function sendLeadToGhl(payload: LeadSubmissionPayload): Promise<GhlLeadResult> {
  const config = getGhlConfig()
  await maybeValidatePipeline(config)

  const contactResponse = await ghlFetch(config, '/contacts/upsert', {
    method: 'POST',
    body: JSON.stringify(buildContactPayload(config, payload)),
  })
  const contactId = getContactId(contactResponse)

  const opportunityResponse = await ghlFetch(config, '/opportunities/upsert', {
    method: 'POST',
    body: JSON.stringify(buildOpportunityPayload(config, payload, contactId)),
  })
  const opportunityId = getOpportunityId(opportunityResponse)

  let note: GhlRequestResult = { status: 'skipped' }

  if (config.createTrackingNote) {
    try {
      const noteResponse = await ghlFetch(config, `/contacts/${encodeURIComponent(contactId)}/notes`, {
        method: 'POST',
        body: JSON.stringify({ body: buildTrackingNote(payload) }),
      })
      note = { status: 'success', id: getNoteId(noteResponse) }
    } catch {
      note = { status: 'skipped' }
    }
  }

  return {
    contact: { status: 'success', id: contactId },
    opportunity: { status: 'success', id: opportunityId },
    note,
    pipeline_id: config.pipelineId,
    pipeline_stage_id: config.pipelineStageId,
  }
}
