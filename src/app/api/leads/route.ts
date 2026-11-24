import { NextResponse } from 'next/server'
import {
  LEAD_FORM_VARIANT,
  type CaseType,
  type LeadFormId,
  type LeadSubmissionPayload,
  type Urgency,
  caseTypeOptions,
  leadFormIds,
  normalizeBrazilianPhone,
  urgencyOptions,
  states,
} from '@/lib/lead'
import { GhlIntegrationError, sendLeadToGhl } from '@/server/integrations/ghl'
import { sendServerConversionEvents } from '@/server/integrations/conversions'

export const runtime = 'nodejs'

const caseTypeValues = new Set<string>(caseTypeOptions.map((option) => option.value))
const urgencyValues = new Set<string>(urgencyOptions.map((option) => option.value))
const leadFormValues = new Set<string>(leadFormIds)
const stateValues = new Set<string>(states)

type UnknownRecord = Record<string, unknown>

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function asString(value: unknown, max = 500): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function asNullableString(value: unknown, max = 1200): string | null {
  const text = asString(value, max)
  return text || null
}

function asStringRecord(value: unknown): Record<string, string> {
  if (!isRecord(value)) return {}

  return Object.entries(value).reduce<Record<string, string>>((acc, [key, entry]) => {
    if (typeof entry === 'string') acc[key] = entry.slice(0, 500)
    return acc
  }, {})
}

function isValidUrl(value: string): boolean {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

function invalid(message = 'Dados inválidos ou incompletos.') {
  return NextResponse.json({ error: 'invalid_payload', message }, { status: 400 })
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()

  return (
    forwardedFor ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    ''
  )
}

function shouldRequirePixelDelivery() {
  return process.env.LEAD_REQUIRE_PIXEL_DELIVERY === 'true'
}

function hasMarketingConsent(value: unknown): boolean {
  if (!isRecord(value)) return true
  return value.marketing !== false
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return invalid()
  }

  if (!isRecord(body) || !isRecord(body.form) || !isRecord(body.contact) || !isRecord(body.qualification)) {
    return invalid()
  }

  const formId = asString(body.form.id, 80)
  const variant = asString(body.form.variant, 80)
  const source = asString(body.form.source, 80)
  const pageUrl = asString(body.form.page_url, 500)
  const pagePath = asString(body.form.page_path, 240)
  const name = asString(body.contact.name, 120)
  const phoneRaw = asString(body.contact.phone_raw, 32)
  const email = asNullableString(body.contact.email, 160)
  const caseType = asString(body.qualification.case_type, 80)
  const debtRange = asString(body.qualification.debt_range, 80)
  const propertyState = asString(body.qualification.property_state, 2).toUpperCase()
  const urgency = asString(body.qualification.urgency, 80)
  const message = asNullableString(body.qualification.message, 1200)
  const attribution = isRecord(body.attribution) ? body.attribution : {}
  const campaignSource = asString(attribution.campaign_source, 180) || 'direct'
  const landingPageUrl = asString(attribution.landing_page_url, 500)
  const currentUrl = asString(attribution.current_url, 500)
  const referrer = asString(attribution.referrer, 500)
  const technical = isRecord(body.technical) ? body.technical : {}
  const marketingConsent = hasMarketingConsent(body.cookie_consent)

  if (!leadFormValues.has(formId)) return invalid('Origem do formulário inválida.')
  if (variant !== LEAD_FORM_VARIANT) return invalid('Versão do formulário inválida.')
  if (!source || !pagePath || !isValidUrl(pageUrl)) return invalid()
  if (name.length < 2) return invalid('Informe seu nome.')
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return invalid('Informe um e-mail válido.')
  if (!caseTypeValues.has(caseType)) return invalid('Tipo de caso inválido.')
  if (!debtRange || !stateValues.has(propertyState)) return invalid()
  if (!urgencyValues.has(urgency)) return invalid('Urgência inválida.')
  if (!isValidUrl(landingPageUrl) || !isValidUrl(currentUrl)) return invalid('Dados de atribuição inválidos.')

  const phoneNormalized = normalizeBrazilianPhone(phoneRaw)

  if (!phoneNormalized) {
    return NextResponse.json(
      { error: 'invalid_phone', message: 'Informe um WhatsApp com DDD válido.' },
      { status: 400 },
    )
  }

  const leadId = crypto.randomUUID()
  const submittedAt = new Date().toISOString()
  const leadPayload: LeadSubmissionPayload = {
    event: 'lead_submitted',
    lead_id: leadId,
    submitted_at: submittedAt,
    form: {
      id: formId as LeadFormId,
      variant: LEAD_FORM_VARIANT,
      source,
      page_url: pageUrl,
      page_path: pagePath,
    },
    contact: {
      name,
      phone_raw: phoneRaw,
      phone_normalized: phoneNormalized,
      email,
    },
    qualification: {
      case_type: caseType as CaseType,
      debt_range: debtRange,
      property_state: propertyState,
      urgency: urgency as Urgency,
      message,
    },
    attribution: {
      campaign_source: campaignSource,
      landing_page_url: landingPageUrl,
      current_url: currentUrl,
      referrer,
      url_params: asStringRecord(attribution.url_params),
      utm: asStringRecord(attribution.utm),
      click_ids: asStringRecord(attribution.click_ids),
      sck: asNullableString(attribution.sck, 240),
    },
    cookies: asStringRecord(body.cookies),
    technical: {
      user_agent: asString(technical.user_agent, 500),
      language: asString(technical.language, 80),
      timezone: asString(technical.timezone, 120),
      viewport: asString(technical.viewport, 40),
      consent_basis: 'lead_submit',
    },
  }

  try {
    const ghl = await sendLeadToGhl(leadPayload)
    const conversions = marketingConsent
      ? await sendServerConversionEvents(leadPayload, { clientIp: getClientIp(request) })
      : {
          meta: { status: 'skipped' as const, reason: 'cookie_marketing_consent_denied' },
          google_ads: { status: 'skipped' as const, reason: 'cookie_marketing_consent_denied' },
        }
    const pixelFailed = conversions.meta.status === 'failed' || conversions.google_ads.status === 'failed'

    if (pixelFailed && shouldRequirePixelDelivery()) {
      return NextResponse.json(
        {
          error: 'pixel_delivery_failed',
          message: 'Lead registrado, mas a conversão server-side falhou.',
          integrations: { ghl, conversions },
        },
        { status: 502 },
      )
    }

    return NextResponse.json({
      lead_id: leadId,
      submitted_at: submittedAt,
      pixel_event: {
        event_id: leadId,
        meta_event_name: 'Lead',
        google_event_name: 'conversion',
      },
      integrations: { ghl, conversions },
    })
  } catch (error) {
    if (error instanceof GhlIntegrationError) {
      return NextResponse.json(
        { error: error.code, message: error.message },
        { status: error.status },
      )
    }

    return NextResponse.json(
      { error: 'crm_unreachable', message: 'CRM indisponível no momento.' },
      { status: 502 },
    )
  }
}
