'use client'

import { useEffect, useMemo, useState } from 'react'
import Script from 'next/script'
import { Cookie, Settings2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { resolveMetaPixelIds } from '@/lib/metaPixels'
import {
  COOKIE_CONSENT_STORAGE_KEY,
  type CookieConsentPreferences,
  defaultCookieConsent,
  parseCookieConsent,
} from '@/lib/cookieConsent'
import { cn } from '@/lib/utils'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-WNX33PHB'
const META_PIXEL_IDS = resolveMetaPixelIds(
  process.env.NEXT_PUBLIC_META_PIXEL_IDS,
  process.env.NEXT_PUBLIC_META_PIXEL_ID,
)

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

function getStoredConsent(): CookieConsentPreferences | null {
  try {
    return parseCookieConsent(window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY))
  } catch {
    return null
  }
}

function writeStoredConsent(preferences: CookieConsentPreferences) {
  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(preferences))
}

function pushConsentMode(preferences: CookieConsentPreferences) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'cookie_consent_update',
    analytics_storage: preferences.analytics ? 'granted' : 'denied',
    ad_storage: preferences.marketing ? 'granted' : 'denied',
    ad_user_data: preferences.marketing ? 'granted' : 'denied',
    ad_personalization: preferences.marketing ? 'granted' : 'denied',
  })

  window.gtag?.('consent', 'update', {
    analytics_storage: preferences.analytics ? 'granted' : 'denied',
    ad_storage: preferences.marketing ? 'granted' : 'denied',
    ad_user_data: preferences.marketing ? 'granted' : 'denied',
    ad_personalization: preferences.marketing ? 'granted' : 'denied',
  })

  window.fbq?.('consent', preferences.marketing ? 'grant' : 'revoke')
}

export default function CookieConsent() {
  const [preferences, setPreferences] = useState<CookieConsentPreferences>(defaultCookieConsent)
  const [hasChoice, setHasChoice] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [customizing, setCustomizing] = useState(false)

  useEffect(() => {
    const stored = getStoredConsent()

    if (stored) {
      setPreferences(stored)
      setHasChoice(true)
      pushConsentMode(stored)
      return
    }

    setIsOpen(true)
  }, [])

  useEffect(() => {
    const openPreferences = () => {
      setCustomizing(true)
      setIsOpen(true)
    }

    window.addEventListener('cbm:open-cookie-preferences', openPreferences)
    return () => window.removeEventListener('cbm:open-cookie-preferences', openPreferences)
  }, [])

  const metaPixelInitScript = useMemo(
    () => META_PIXEL_IDS.map((pixelId) => `fbq('init', '${pixelId}');`).join('\n'),
    [],
  )

  const persist = (next: CookieConsentPreferences) => {
    const saved = { ...next, necessary: true as const, updated_at: new Date().toISOString() }
    setPreferences(saved)
    setHasChoice(true)
    setIsOpen(false)
    setCustomizing(false)
    writeStoredConsent(saved)
    pushConsentMode(saved)
  }

  const acceptAll = () => persist({ necessary: true, analytics: true, marketing: true, updated_at: '' })
  const rejectOptional = () => persist({ necessary: true, analytics: false, marketing: false, updated_at: '' })
  const saveCustom = () => persist(preferences)
  const trackingAllowed = hasChoice && (preferences.analytics || preferences.marketing)
  const marketingAllowed = hasChoice && preferences.marketing

  return (
    <>
      {trackingAllowed && (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      )}

      {marketingAllowed && META_PIXEL_IDS.length > 0 && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            ${metaPixelInitScript}
            fbq('consent', 'grant');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {marketingAllowed && (
        <>
          <Script
            src="https://opex.cbmagro.com.br/js/external-tracking.js"
            data-tracking-id="tk_6f8871daef734cc3b8e3ccecea12b6dd"
            strategy="afterInteractive"
          />
          <Script
            src="https://widgets.leadconnectorhq.com/loader.js"
            data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
            data-widget-id="69fc8c1901f21caea8baeff7"
            data-source="WEB_USER"
            suppressHydrationWarning
            strategy="afterInteractive"
          />
        </>
      )}

      {!isOpen && hasChoice && (
        <button
          type="button"
          onClick={() => {
            setCustomizing(true)
            setIsOpen(true)
          }}
          className="fixed bottom-4 left-4 z-50 inline-flex size-11 items-center justify-center rounded-full border border-warm-border bg-warm-white text-teal-dark shadow-lg shadow-teal-dark/15 transition-colors hover:border-copper hover:text-copper"
          aria-label="Gerenciar cookies"
        >
          <Cookie className="size-5" />
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:left-4 sm:right-4">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-warm-border bg-warm-white shadow-2xl shadow-teal-dark/20">
            <div className="grid gap-0 lg:grid-cols-[1fr_27rem]">
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-paper text-copper">
                      <Cookie className="size-5" />
                    </span>
                    <div>
                      <h2 className="text-lg font-bold leading-tight text-teal-dark">Preferências de cookies</h2>
                      <p className="mt-1 text-sm leading-relaxed text-text-medium">
                        Usamos cookies necessários para o site funcionar e, com seu consentimento, cookies de análise e marketing para medir campanhas e enviar eventos aos pixels.
                      </p>
                    </div>
                  </div>
                  {hasChoice && (
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="rounded-full p-2 text-text-light transition-colors hover:bg-paper hover:text-teal-dark"
                      aria-label="Fechar preferências de cookies"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>

                {customizing && (
                  <div className="mt-5 grid gap-3">
                    {[
                      {
                        key: 'necessary',
                        title: 'Necessários',
                        desc: 'Mantêm segurança, preferências de consentimento e envio do formulário.',
                        checked: true,
                        disabled: true,
                      },
                      {
                        key: 'analytics',
                        title: 'Análise',
                        desc: 'Permitem medir visitas, páginas e origem dos leads no Google Tag Manager.',
                        checked: preferences.analytics,
                        disabled: false,
                      },
                      {
                        key: 'marketing',
                        title: 'Marketing e pixels',
                        desc: 'Ativam Meta Pixel, CAPI de leads, chat GHL e cookies de atribuição de mídia.',
                        checked: preferences.marketing,
                        disabled: false,
                      },
                    ].map((item) => (
                      <label
                        key={item.key}
                        className={cn(
                          'flex cursor-pointer items-start gap-3 rounded-xl border border-warm-border bg-paper/70 p-4',
                          item.disabled && 'cursor-not-allowed opacity-80',
                        )}
                      >
                        <Checkbox
                          checked={item.checked}
                          disabled={item.disabled}
                          onCheckedChange={(checked) => {
                            if (item.key === 'analytics') {
                              setPreferences((current) => ({ ...current, analytics: checked === true }))
                            }
                            if (item.key === 'marketing') {
                              setPreferences((current) => ({ ...current, marketing: checked === true }))
                            }
                          }}
                          className="mt-1"
                        />
                        <span>
                          <span className="block text-sm font-bold text-teal-dark">{item.title}</span>
                          <span className="mt-1 block text-xs leading-relaxed text-text-medium">{item.desc}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center gap-3 border-t border-warm-border bg-paper p-5 sm:p-6 lg:border-l lg:border-t-0">
                <Button onClick={acceptAll} className="min-h-11 rounded-xl bg-copper font-semibold text-warm-white hover:bg-clay">
                  Aceitar todos
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (customizing) {
                      saveCustom()
                      return
                    }
                    setCustomizing(true)
                  }}
                  className="min-h-11 rounded-xl border-warm-border text-teal-dark hover:border-copper hover:bg-warm-white"
                >
                  <Settings2 className="mr-2 size-4" />
                  {customizing ? 'Salvar preferências' : 'Gerenciar preferências'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={rejectOptional}
                  className="min-h-11 rounded-xl text-text-medium hover:bg-warm-white hover:text-teal-dark"
                >
                  Rejeitar opcionais
                </Button>
                <div className="flex justify-center gap-4 pt-2 text-xs text-text-light">
                  <a href="/politica-de-privacidade" className="hover:text-copper">Privacidade</a>
                  <a href="/politica-de-cookies" className="hover:text-copper">Cookies</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
