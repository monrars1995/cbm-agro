/**
 * Fonte única de verdade para domínio e NAP (nome, endereço, telefone).
 * Qualquer menção ao domínio, telefone ou endereço no site deve vir daqui,
 * para que Google, schema e páginas mostrem sempre os mesmos dados.
 */

/** Domínio oficial (canônico). O domínio legado continua no ar, mas aponta o canonical para cá. */
export const SITE_URL = 'https://cbmagro.com.br'
export const LEGACY_SITE_URL = 'https://cbmgestaodepassivos.com.br'

export const SITE_NAME = 'CBM Agro e Gestão de Passivos'
export const SITE_ALTERNATE_NAME = 'CBM Agro'

export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/images/og-default.jpg`,
  width: 1200,
  height: 630,
  alt: 'CBM Agro e Gestão de Passivos, advocacia em Direito Bancário e Agrário',
} as const

export const NAP = {
  name: SITE_NAME,
  phoneE164: '+557196772343',
  phoneDisplay: '(71) 99677-2343',
  whatsappNumber: '557196772343',
  email: 'contato@cbmgestaodepassivos.com.br',
  building: 'Edifício Trade Center',
  streetAddress: 'Av. Getúlio Vargas, 3233 - Sl 401 e 402',
  neighborhood: 'Santa Mônica',
  city: 'Feira de Santana',
  region: 'BA',
  postalCode: '44077-420',
  country: 'BR',
} as const

/** Endereço em uma linha, idêntico ao Perfil da Empresa no Google (confirmado pelo cliente em 2026-11-24). */
export const NAP_ADDRESS_LINE = `${NAP.building} - ${NAP.streetAddress} - ${NAP.neighborhood}, ${NAP.city} - ${NAP.region}, ${NAP.postalCode}`

/** Sociedade de advogados responsável pelo site (Provimento OAB 205/2021: nome e registro na OAB). */
export const LAW_FIRM = {
  name: 'CBM Advogados',
  legalName: 'Carlos Benjamim Morais Sociedade Individual de Advocacia',
  oabRegistration: 'OAB/BA 5.496',
  cnpj: '47.878.182/0001-61',
} as const

export const SOCIAL_PROFILES = [
  'https://www.instagram.com/cbmgestaodepassivos',
  'https://www.linkedin.com/company/cbm-gestao-de-passivos',
  'https://www.facebook.com/cbmgestaodepassivos',
] as const

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).toString()
}
