import type { Metadata } from 'next'
import TermosContent from './TermosContent'

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de Uso do site da CBM Agro e Gestão de Passivos.',
}

export default function TermosDeUsoPage() {
  return <TermosContent />
}
