import type { Metadata } from 'next'
import Header from '@/components/cbm/Header'
import Footer from '@/components/cbm/Footer'
import ServicePageExtras from '@/components/cbm/ServicePageExtras'
import { createPageMetadata } from '@/lib/page-metadata'
import { SERVICES } from '@/lib/services'
import RecuperacaoJudicialContent from './RecuperacaoJudicialContent'

const service = SERVICES['recuperacao-judicial-produtor-rural']

export const metadata: Metadata = createPageMetadata({
  path: `/${service.slug}`,
  title: service.title,
  description: service.description,
  absoluteTitle: true,
})

export default function RecuperacaoJudicialProdutorRuralPage() {
  return (
    <>
      <Header />
      <main>
        <RecuperacaoJudicialContent />
        <ServicePageExtras slug={service.slug} />
      </main>
      <Footer />
    </>
  )
}
