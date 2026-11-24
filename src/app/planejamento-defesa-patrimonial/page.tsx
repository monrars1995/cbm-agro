import type { Metadata } from 'next'
import { createPageMetadata } from '@/lib/page-metadata'
import PlanejamentoPatrimonialContent from './PlanejamentoPatrimonialContent'

export const metadata: Metadata = createPageMetadata({
  path: '/planejamento-defesa-patrimonial',
  title: 'Planejamento e Defesa Patrimonial Rural',
  description: 'Organização jurídica de bens, contratos e sucessão para proteger o patrimônio rural construído em gerações contra cobranças e disputas futuras.',
  socialTitle: 'Planejamento e Defesa Patrimonial Rural | CBM Agro e Gestão de Passivos',
  socialDescription: 'Organização jurídica de bens, contratos e sucessão para proteger o patrimônio rural construído em gerações.',
})

export default function PlanejamentoDefesaPatrimonialPage() {
  return <PlanejamentoPatrimonialContent />
}
