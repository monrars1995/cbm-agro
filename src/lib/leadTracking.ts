import type { LeadAttribution, LeadTechnicalContext } from './lead'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
const CLICK_ID_KEYS = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid', 'ttclid']
const TRACKING_COOKIE_KEYS = ['sck', '_fbp', '_fbc', '_ga', '_gid', '_gcl_aw', '_gcl_dc', '_gcl_gb']

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function readCookieMap(): Record<string, string> {
  if (typeof document === 'undefined') return {}

  return document.cookie
    .split(';')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, entry) => {
      const separator = entry.indexOf('=')
      if (separator === -1) return acc

      const key = safeDecode(entry.slice(0, separator).trim())
      const value = safeDecode(entry.slice(separator + 1).trim())
      acc[key] = value
      return acc
    }, {})
}

function pickKeys(source: Record<string, string>, keys: string[]): Record<string, string> {
  return keys.reduce<Record<string, string>>((acc, key) => {
    if (source[key]) acc[key] = source[key]
    return acc
  }, {})
}

function getReferrerHostname(referrer: string): string {
  try {
    return referrer ? new URL(referrer).hostname : ''
  } catch {
    return ''
  }
}

export function captureLeadTrackingContext(): {
  attribution: LeadAttribution
  cookies: Record<string, string>
  technical: LeadTechnicalContext
} {
  if (typeof window === 'undefined') {
    return {
      attribution: {
        campaign_source: 'direct',
        landing_page_url: '',
        current_url: '',
        referrer: '',
        url_params: {},
        utm: {},
        click_ids: {},
        sck: null,
      },
      cookies: {},
      technical: {
        user_agent: '',
        language: '',
        timezone: 'UTC',
        viewport: '',
        consent_basis: 'lead_submit',
      },
    }
  }

  const currentUrl = window.location.href
  const pageParams = new URLSearchParams(window.location.search)
  const urlParams = Object.fromEntries(pageParams.entries())
  const cookieMap = readCookieMap()
  const trackingCookies = pickKeys(cookieMap, TRACKING_COOKIE_KEYS)
  const utm = pickKeys(urlParams, UTM_KEYS)
  const clickIds = pickKeys(urlParams, CLICK_ID_KEYS)
  const sck = urlParams.sck || trackingCookies.sck || null
  const referrer = document.referrer || ''
  const referrerHostname = getReferrerHostname(referrer)
  const campaignSource = utm.utm_source || sck || referrerHostname || 'direct'

  return {
    attribution: {
      campaign_source: campaignSource,
      landing_page_url: currentUrl,
      current_url: currentUrl,
      referrer,
      url_params: urlParams,
      utm,
      click_ids: clickIds,
      sck,
    },
    cookies: trackingCookies,
    technical: {
      user_agent: window.navigator.userAgent,
      language: window.navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      consent_basis: 'lead_submit',
    },
  }
}
