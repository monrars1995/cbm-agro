import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/artigos/seo'
import AnaliseContratoContent from './AnaliseContratoContent'

export const metadata: Metadata = {
  title: 'Assessoria na Elaboração e Análise de Contratos Rurais',
  description:
    'Assessoria na elaboração e análise de contratos rurais para identificar cláusulas de risco, garantias excessivas e obrigações que podem comprometer a operação.',
  alternates: {
    canonical: `${SITE_URL}/analise-elaboracao-de-contrato`,
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/analise-elaboracao-de-contrato`,
    title: 'Assessoria na Elaboração e Análise de Contratos Rurais | CBM Agro e Gestão de Passivos',
    description:
      'Entenda cláusulas, garantias e obrigações antes de assinar contratos que impactam a sua produção e patrimônio.',
    siteName: 'CBM Agro e Gestão de Passivos',
    locale: 'pt_BR',
  },
}

export default function AnaliseElaboracaoContratoPage() {
  return <AnaliseContratoContent />
}
