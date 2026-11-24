import type { Metadata } from 'next'
import ObrigadoContent from './ObrigadoContent'

export const metadata: Metadata = {
  title: 'Solicitação Recebida',
  description: 'Sua solicitação foi recebida pela equipe CBM Agro e Gestão de Passivos.',
}

export default function ObrigadoContatoPage() {
  return <ObrigadoContent />
}
