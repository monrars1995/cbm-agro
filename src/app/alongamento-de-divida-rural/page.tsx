import type { Metadata } from 'next'
import { createPageMetadata } from '@/lib/page-metadata'
import AlongamentoContent from './AlongamentoContent'

export const metadata: Metadata = createPageMetadata({
  path: '/alongamento-de-divida-rural',
  title: 'Alongamento de Dívida Rural',
  description: 'Defesa jurídica para alongamento de dívida rural, safra frustrada e renegociação de crédito rural.',
})

export default function AlongamentoPage() {
  return <AlongamentoContent />
}
