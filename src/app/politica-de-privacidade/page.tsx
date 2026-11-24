import type { Metadata } from 'next'
import PrivacidadeContent from './PrivacidadeContent'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de Privacidade da CBM Agro e Gestão de Passivos.',
}

export default function PoliticaDePrivacidadePage() {
  return <PrivacidadeContent />
}
