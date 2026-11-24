import type { Metadata } from 'next'
import { createPageMetadata } from '@/lib/page-metadata'
import TermosContent from './TermosContent'

export const metadata: Metadata = createPageMetadata({
  path: '/termos-de-uso',
  title: 'Termos de Uso',
  description: 'Termos de Uso do site da CBM Agro e Gestão de Passivos.',
})

export default function TermosDeUsoPage() {
  return <TermosContent />
}
