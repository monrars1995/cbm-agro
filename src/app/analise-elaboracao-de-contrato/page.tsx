import type { Metadata } from 'next'
import { createPageMetadata } from '@/lib/page-metadata'
import AnaliseContratoContent from './AnaliseContratoContent'

export const metadata: Metadata = createPageMetadata({
  path: '/analise-elaboracao-de-contrato',
  title: 'Assessoria na Elaboração e Análise de Contratos Rurais',
  description: 'Assessoria na elaboração e análise de contratos rurais para identificar cláusulas de risco, garantias excessivas e obrigações que podem comprometer a operação.',
  socialTitle: 'Assessoria na Elaboração e Análise de Contratos Rurais | CBM Agro e Gestão de Passivos',
  socialDescription: 'Entenda cláusulas, garantias e obrigações antes de assinar contratos que impactam a sua produção e patrimônio.',
})

export default function AnaliseElaboracaoContratoPage() {
  return <AnaliseContratoContent />
}
