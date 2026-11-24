import type { Metadata } from 'next'
import { createPageMetadata } from '@/lib/page-metadata'
import PrivacidadeContent from './PrivacidadeContent'

export const metadata: Metadata = createPageMetadata({
  path: '/politica-de-privacidade',
  title: 'Política de Privacidade',
  description: 'Política de Privacidade da CBM Agro e Gestão de Passivos.',
})

export default function PoliticaDePrivacidadePage() {
  return <PrivacidadeContent />
}
