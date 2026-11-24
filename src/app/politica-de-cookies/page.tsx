import type { Metadata } from 'next'
import CookiesContent from './CookiesContent'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de Cookies da CBM Agro e Gestão de Passivos.',
}

export default function PoliticaDeCookiesPage() {
  return <CookiesContent />
}
