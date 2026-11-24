import type { Metadata } from 'next'
import { createPageMetadata } from '@/lib/page-metadata'
import CookiesContent from './CookiesContent'

export const metadata: Metadata = createPageMetadata({
  path: '/politica-de-cookies',
  title: 'Política de Cookies',
  description: 'Política de Cookies da CBM Agro e Gestão de Passivos.',
})

export default function PoliticaDeCookiesPage() {
  return <CookiesContent />
}
