import type { Metadata } from 'next'
import Header from '@/components/cbm/Header'
import Footer from '@/components/cbm/Footer'
import ServicePageExtras from '@/components/cbm/ServicePageExtras'
import { createPageMetadata } from '@/lib/page-metadata'
import { SERVICES } from '@/lib/services'
import ContenciosoTributarioContent from './ContenciosoTributarioContent'

const service = SERVICES['contencioso-tributario-rural']

export const metadata: Metadata = createPageMetadata({
  path: `/${service.slug}`,
  title: service.title,
  description: service.description,
  absoluteTitle: true,
})

export default function ContenciosoTributarioRuralPage() {
  return (
    <>
      <Header />
      <main>
        <ContenciosoTributarioContent />
        <ServicePageExtras slug={service.slug} />
      </main>
      <Footer />
    </>
  )
}
