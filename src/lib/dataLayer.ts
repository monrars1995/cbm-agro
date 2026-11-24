// DataLayer utility for GTM event tracking
// Extends the window interface for TypeScript support

import { resolveMetaPixelIds } from './metaPixels'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

interface DataLayerEvent {
  event: string
  event_category?: string
  event_label?: string
  event_value?: string | number
  event_url?: string
  event_text?: string
  event_section?: string
  [key: string]: unknown
}

const GOOGLE_FORM_CONVERSION_SEND_TO =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_FORM_CONVERSION_SEND_TO || 'AW-10934127455/TvOxCMTSvLMcEN-W5t0o'
const GOOGLE_WHATSAPP_CONVERSION_SEND_TO =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION_SEND_TO || 'AW-10934127455/rSRCCMbns4oYEN-W5t0o'
const META_PIXEL_IDS = resolveMetaPixelIds(
  process.env.NEXT_PUBLIC_META_PIXEL_IDS,
  process.env.NEXT_PUBLIC_META_PIXEL_ID,
)

function removeEmpty<T extends Record<string, unknown>>(value: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== undefined && entry !== null && entry !== ''),
  ) as Partial<T>
}

function normalizeMetaPhone(phone: string): string {
  return phone.replace(/\D/g, '')
}

function normalizeMetaEmail(email: string): string {
  return email.trim().toLowerCase()
}

/**
 * Push an event to the GTM dataLayer
 */
export function pushEvent(event: DataLayerEvent): void {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      ...event,
      event_timestamp: new Date().toISOString(),
    })
  }
}

/**
 * Navigation click event
 */
export function trackNavClick(label: string, section: string, url?: string): void {
  pushEvent({
    event: 'nav_click',
    event_category: 'navegacao',
    event_label: label,
    event_section: section,
    event_url: url || label.toLowerCase().replace(/\s+/g, '-'),
  })
}

/**
 * CTA button click event
 */
export function trackCTAClick(text: string, location: string, url?: string): void {
  pushEvent({
    event: 'cta_click',
    event_category: 'conversao',
    event_label: text,
    event_section: location,
    event_url: url || '#contato',
  })
}

/**
 * WhatsApp click event
 */
export function trackWhatsAppClick(source: string): void {
  const eventId = `whatsapp-${Date.now()}`

  pushEvent({
    event: 'whatsapp_click',
    event_category: 'conversao',
    event_label: 'Fale conosco pelo WhatsApp',
    event_section: source,
    event_url: 'https://wa.me/557196772343',
    event_id: eventId,
  })

  // Google Ads: LEAD - WHATSAPP - DBA conversion
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': GOOGLE_WHATSAPP_CONVERSION_SEND_TO,
    })
  }

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq(
      'track',
      'Contact',
      {
        content_name: 'CBM WhatsApp click',
        content_category: 'whatsapp',
        currency: 'BRL',
        value: 1,
        source,
      },
      { eventID: eventId },
    )
  }
}

/**
 * Google Ads: Form lead submission conversion
 * Call this after any lead form is successfully submitted.
 */
export function trackFormConversion(): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': GOOGLE_FORM_CONVERSION_SEND_TO,
      'value': 1.0,
      'currency': 'BRL',
    })
  }

  pushEvent({
    event: 'form_conversion',
    event_category: 'conversao',
    event_label: 'lead_form_submit',
  })
}

interface LeadFormEventContext {
  form_id: string
  source: string
  page_path?: string
  case_type?: string
  debt_range?: string
  property_state?: string
  campaign_source?: string
  step_index?: number
  step_name?: string
  lead_id?: string
  error_type?: string
  urgency?: string
}

interface MetaLeadMatchingContext {
  email?: string | null
  phone?: string | null
}

function updateMetaAdvancedMatching(context?: MetaLeadMatchingContext): void {
  if (typeof window === 'undefined' || !window.fbq || !context) return

  const matching = removeEmpty({
    em: context.email ? normalizeMetaEmail(context.email) : undefined,
    ph: context.phone ? normalizeMetaPhone(context.phone) : undefined,
  })

  if (Object.keys(matching).length > 0) {
    META_PIXEL_IDS.forEach((pixelId) => {
      window.fbq?.('init', pixelId, matching)
    })
  }
}

export function trackLeadFormStarted(context: LeadFormEventContext): void {
  pushEvent({
    event: 'lead_form_started',
    event_category: 'conversao',
    ...context,
  })
}

export function trackLeadFormStepCompleted(context: LeadFormEventContext): void {
  pushEvent({
    event: 'lead_form_step_completed',
    event_category: 'conversao',
    ...context,
  })
}

export function trackLeadFormSubmitted(
  context: LeadFormEventContext,
  matching?: MetaLeadMatchingContext,
): void {
  const eventId = context.lead_id || `lead-${Date.now()}`

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': GOOGLE_FORM_CONVERSION_SEND_TO,
      'value': 1.0,
      'currency': 'BRL',
      'transaction_id': eventId,
    })
  }

  if (typeof window !== 'undefined' && window.fbq) {
    updateMetaAdvancedMatching(matching)

    window.fbq(
      'track',
      'Lead',
      removeEmpty({
        content_name: 'CBM lead form',
        content_category: context.case_type,
        content_type: 'lead_form',
        currency: 'BRL',
        value: 1,
        lead_id: context.lead_id,
        form_id: context.form_id,
        source: context.source,
        page_path: context.page_path,
        debt_range: context.debt_range,
        property_state: context.property_state,
        urgency: context.urgency,
        campaign_source: context.campaign_source,
      }),
      { eventID: eventId },
    )
  }

  pushEvent({
    event: 'lead_form_submitted',
    event_category: 'conversao',
    ...context,
  })
}

export function trackLeadFormSubmitFailed(context: LeadFormEventContext): void {
  pushEvent({
    event: 'lead_form_submit_failed',
    event_category: 'conversao',
    ...context,
  })
}

/**
 * Phone click event
 */
export function trackPhoneClick(source: string): void {
  pushEvent({
    event: 'phone_click',
    event_category: 'contato',
    event_label: '11 91029-2389',
    event_section: source,
  })
}

/**
 * Email click event
 */
export function trackEmailClick(source: string): void {
  pushEvent({
    event: 'email_click',
    event_category: 'contato',
    event_label: 'contato@cbmgestaodepassivos.com.br',
    event_section: source,
  })
}

/**
 * Service card click event
 */
export function trackServiceClick(serviceName: string): void {
  pushEvent({
    event: 'service_click',
    event_category: 'servicos',
    event_label: serviceName,
    event_section: 'servicos',
  })
}

/**
 * Blog article click event
 */
export function trackBlogClick(articleTitle: string, tag: string): void {
  pushEvent({
    event: 'blog_click',
    event_category: 'conteudo',
    event_label: articleTitle,
    event_section: 'blog',
    event_value: tag,
  })
}

/**
 * Section view event (triggered when section enters viewport)
 */
export function trackSectionView(sectionName: string): void {
  pushEvent({
    event: 'section_view',
    event_category: 'engajamento',
    event_label: sectionName,
  })
}

/**
 * Scroll depth event
 */
export function trackScrollDepth(depth: number): void {
  pushEvent({
    event: 'scroll_depth',
    event_category: 'engajamento',
    event_label: `${depth}%`,
    event_value: depth,
  })
}

/**
 * Carousel interaction event
 */
export function trackCarouselInteraction(carouselName: string, action: string, index?: number): void {
  pushEvent({
    event: 'carousel_interaction',
    event_category: 'engajamento',
    event_label: carouselName,
    event_value: index ?? 0,
    event_action: action,
  })
}

/**
 * Social media click event
 */
export function trackSocialClick(platform: string, source: string): void {
  pushEvent({
    event: 'social_click',
    event_category: 'social',
    event_label: platform,
    event_section: source,
  })
}

/**
 * Footer link click event
 */
export function trackFooterClick(label: string, column: string): void {
  pushEvent({
    event: 'footer_click',
    event_category: 'navegacao',
    event_label: label,
    event_section: `footer_${column}`,
  })
}
