import type { Metadata } from 'next'
import Header from '@/components/cbm/Header'
import Footer from '@/components/cbm/Footer'
import ServicePageExtras from '@/components/cbm/ServicePageExtras'
import { createPageMetadata } from '@/lib/page-metadata'
import { SERVICES } from '@/lib/services'
import PlanejamentoPatrimonialContent from './PlanejamentoPatrimonialContent'

const service = SERVICES['planejamento-defesa-patrimonial']

export const metadata: Metadata = createPageMetadata({
  path: `/${service.slug}`,
  title: service.title,
  description: service.description,
  absoluteTitle: true,
})

export default function PlanejamentoDefesaPatrimonialPage() {
  return (
    <>
      <Header />
      <main>
        <PlanejamentoPatrimonialContent />
        <ServicePageExtras slug={service.slug} />
      </main>
      <Footer />
    </>
  )
}
