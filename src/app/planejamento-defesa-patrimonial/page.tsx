import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/artigos/seo'
import PlanejamentoPatrimonialContent from './PlanejamentoPatrimonialContent'

export const metadata: Metadata = {
  title: 'Planejamento e Defesa Patrimonial Rural',
  description:
    'Organização jurídica de bens, contratos e sucessão para proteger o patrimônio rural construído em gerações contra cobranças e disputas futuras.',
  alternates: {
    canonical: `${SITE_URL}/planejamento-defesa-patrimonial`,
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/planejamento-defesa-patrimonial`,
    title: 'Planejamento e Defesa Patrimonial Rural | CBM Agro e Gestão de Passivos',
    description:
      'Organização jurídica de bens, contratos e sucessão para proteger o patrimônio rural construído em gerações.',
    siteName: 'CBM Agro e Gestão de Passivos',
    locale: 'pt_BR',
  },
}

export default function PlanejamentoDefesaPatrimonialPage() {
  return <PlanejamentoPatrimonialContent />
}
