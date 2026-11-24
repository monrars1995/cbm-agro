import type { Metadata } from 'next'
import { createPageMetadata } from '@/lib/page-metadata'
import ObrigadoContent from './ObrigadoContent'

export const metadata: Metadata = createPageMetadata({
  path: '/obrigado-contato',
  title: 'Solicitação Recebida',
  description: 'Sua solicitação foi recebida pela equipe CBM Agro e Gestão de Passivos.',
  noindex: true,
})

export default function ObrigadoContatoPage() {
  return <ObrigadoContent />
}
