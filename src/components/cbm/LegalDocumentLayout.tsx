import Link from 'next/link'
import { ArrowRight, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LegalDocumentLayoutProps {
  icon: LucideIcon
  title: string
  intro: string
  children: React.ReactNode
  ctaTitle: string
  ctaDescription: string
  ctaLabel: string
}

export default function LegalDocumentLayout({
  icon: Icon,
  title,
  intro,
  children,
  ctaTitle,
  ctaDescription,
  ctaLabel,
}: LegalDocumentLayoutProps) {
  return (
    <section className="legal-paper pt-28 pb-24 sm:pt-36 sm:pb-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="command-panel rounded-3xl p-6 text-warm-white shadow-lg shadow-teal-dark/15">
            <div className="mb-5 flex size-12 items-center justify-center text-gold-light">
              <Icon className="size-6" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-light">
              Documento legal
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight">{title}</h1>
            <p className="mt-5 text-sm leading-relaxed text-warm-white/68">
              Última atualização: Maio de 2026
            </p>
          </div>
        </aside>

        <div>
          <div className="rounded-[2rem] border border-warm-border bg-warm-white p-6 shadow-lg shadow-teal-dark/5 sm:p-10 lg:p-12">
            <p className="max-w-3xl text-lg leading-relaxed text-text-medium">{intro}</p>
            <div className="mt-10 max-w-none space-y-6 text-text-medium [&_a]:font-semibold [&_a]:text-copper [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-teal-dark [&_li]:pl-1 [&_p]:leading-relaxed [&_strong]:text-teal-dark [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
              {children}
            </div>
          </div>

          <div className="mt-10 border-t border-copper/25 pt-7 text-center sm:pt-9">
            <p className="text-xl font-bold text-teal-dark">{ctaTitle}</p>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-text-medium">
              {ctaDescription}
            </p>
            <Button
              asChild
              className="mt-6 rounded-xl bg-teal-dark px-8 py-6 font-semibold text-warm-white hover:bg-teal"
            >
              <Link href="/#contato">
                {ctaLabel}
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
