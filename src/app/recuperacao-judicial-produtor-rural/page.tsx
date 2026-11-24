import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/artigos/seo'
import RecuperacaoJudicialContent from './RecuperacaoJudicialContent'

export const metadata: Metadata = {
  title: 'Recuperação Judicial do Produtor Rural',
  description:
    'Reorganize dívidas rurais com proteção da lei: suspensão de execuções, plano de viabilidade e continuidade da produção sem perder terra ou maquinário.',
  alternates: {
    canonical: `${SITE_URL}/recuperacao-judicial-produtor-rural`,
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/recuperacao-judicial-produtor-rural`,
    title: 'Recuperação Judicial do Produtor Rural | CBM Agro e Gestão de Passivos',
    description:
      'Reorganize dívidas rurais com proteção da lei: suspensão de execuções, plano de viabilidade e continuidade da produção.',
    siteName: 'CBM Agro e Gestão de Passivos',
    locale: 'pt_BR',
  },
}

export default function RecuperacaoJudicialProdutorRuralPage() {
  return <RecuperacaoJudicialContent />
}
