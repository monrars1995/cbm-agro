import type { Metadata } from 'next'
import { createPageMetadata } from '@/lib/page-metadata'
import ContenciosoTributarioContent from './ContenciosoTributarioContent'

export const metadata: Metadata = createPageMetadata({
  path: '/contencioso-tributario-rural',
  title: 'Contencioso Tributário Rural',
  description: 'Defesa tributária para o produtor rural: revisão de autuações, defesa administrativa e judicial, e enquadramento fiscal correto da atividade agropecuária.',
  socialTitle: 'Contencioso Tributário Rural | CBM Agro e Gestão de Passivos',
  socialDescription: 'Defesa tributária para o produtor rural: revisão de autuações e enquadramento fiscal correto da atividade agropecuária.',
})

export default function ContenciosoTributarioRuralPage() {
  return <ContenciosoTributarioContent />
}
