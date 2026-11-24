import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/artigos/seo'
import ContenciosoTributarioContent from './ContenciosoTributarioContent'

export const metadata: Metadata = {
  title: 'Contencioso Tributário Rural',
  description:
    'Defesa tributária para o produtor rural: revisão de autuações, defesa administrativa e judicial, e enquadramento fiscal correto da atividade agropecuária.',
  alternates: {
    canonical: `${SITE_URL}/contencioso-tributario-rural`,
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/contencioso-tributario-rural`,
    title: 'Contencioso Tributário Rural | CBM Agro e Gestão de Passivos',
    description:
      'Defesa tributária para o produtor rural: revisão de autuações e enquadramento fiscal correto da atividade agropecuária.',
    siteName: 'CBM Agro e Gestão de Passivos',
    locale: 'pt_BR',
  },
}

export default function ContenciosoTributarioRuralPage() {
  return <ContenciosoTributarioContent />
}
