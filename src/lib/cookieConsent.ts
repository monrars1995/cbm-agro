export const COOKIE_CONSENT_STORAGE_KEY = 'cbm_cookie_consent_v1'

export interface CookieConsentPreferences {
  necessary: true
  analytics: boolean
  marketing: boolean
  updated_at: string
}

export const defaultCookieConsent: CookieConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  updated_at: '',
}

export function parseCookieConsent(value: unknown): CookieConsentPreferences | null {
  if (typeof value !== 'string' || !value) return null

  try {
    const parsed = JSON.parse(value) as Partial<CookieConsentPreferences>

    return {
      necessary: true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      updated_at: typeof parsed.updated_at === 'string' ? parsed.updated_at : '',
    }
  } catch {
    return null
  }
}

export function readCookieConsent(): CookieConsentPreferences | null {
  if (typeof window === 'undefined') return null

  try {
    return parseCookieConsent(window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY))
  } catch {
    return null
  }
}
