import type { Metadata } from 'next'
import { createPageMetadata } from '@/lib/page-metadata'
import RecuperacaoJudicialContent from './RecuperacaoJudicialContent'

export const metadata: Metadata = createPageMetadata({
  path: '/recuperacao-judicial-produtor-rural',
  title: 'Recuperação Judicial do Produtor Rural',
  description: 'Reorganize dívidas rurais com proteção da lei: suspensão de execuções, plano de viabilidade e continuidade da produção sem perder terra ou maquinário.',
  socialTitle: 'Recuperação Judicial do Produtor Rural | CBM Agro e Gestão de Passivos',
  socialDescription: 'Reorganize dívidas rurais com proteção da lei: suspensão de execuções, plano de viabilidade e continuidade da produção.',
})

export default function RecuperacaoJudicialProdutorRuralPage() {
  return <RecuperacaoJudicialContent />
}
