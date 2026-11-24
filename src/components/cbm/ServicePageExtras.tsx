import Link from 'next/link'
import { ArrowRight, ChevronDown, FileText } from 'lucide-react'
import JsonLd from '@/components/artigos/JsonLd'
import SectionHeading from '@/components/cbm/SectionHeading'
import { articleRepository } from '@/lib/artigos/repository'
import { SERVICES, type ServiceSlug } from '@/lib/services'
import { createServiceJsonLd } from '@/lib/service-jsonld'

/**
 * Seções comuns às páginas de serviço: como atuamos, documentos, FAQ e links
 * internos (outros serviços e artigos do blog). Renderizado no servidor, então
 * todo o texto está no HTML que o Google lê.
 */
export default async function ServicePageExtras({ slug }: { slug: ServiceSlug }) {
  const service = SERVICES[slug]
  const relatedArticles = (
    await Promise.all(service.relatedArticles.map((articleSlug) => articleRepository.getArticleBySlug(articleSlug)))
  ).filter((article): article is NonNullable<typeof article> => article !== null && !article.draft)

  return (
    <>
      <section className="legal-paper py-20 sm:py-24" aria-labelledby={`${slug}-como-atuamos`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-copper">Como atuamos</p>
              <h2 id={`${slug}-como-atuamos`} className="text-3xl font-bold leading-tight text-teal-dark sm:text-4xl">
                {service.name}: etapas da análise
              </h2>
              <ol className="mt-10 space-y-8">
                {service.steps.map((step, index) => (
                  <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-4">
                    <span className="text-3xl font-bold tabular-nums text-copper/45">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="text-lg font-bold text-teal-dark">{step.title}</h3>
                      <p className="mt-2 leading-relaxed text-text-medium">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="self-start rounded-[1.5rem] border border-warm-border bg-warm-white p-7 sm:p-8" aria-labelledby={`${slug}-documentos`}>
              <div className="flex items-center gap-3 text-copper">
                <FileText className="size-5" aria-hidden="true" />
                <h2 id={`${slug}-documentos`} className="text-lg font-bold text-teal-dark">
                  Documentos que ajudam na análise
                </h2>
              </div>
              <ul className="mt-5 space-y-3">
                {service.documents.map((document) => (
                  <li key={document} className="flex gap-3 text-sm leading-relaxed text-text-medium">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                    <span>{document}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-warm-border pt-5 text-sm leading-relaxed text-text-light">
                Não tem todos? Envie o que estiver disponível. A análise indica o que ainda precisa ser reunido.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-warm-gray py-20 sm:py-24" aria-label={`Perguntas frequentes sobre ${service.primaryKeyword}`}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Dúvidas comuns" title="Perguntas frequentes" />
          <div className="mt-10 border-t border-warm-border">
            {service.faq.map((item) => (
              <details key={item.question} className="group border-b border-warm-border">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base font-bold text-teal-dark transition-colors hover:text-copper [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-bold">{item.question}</h3>
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 shrink-0 text-text-light transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-text-medium">{item.answer}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-xs leading-relaxed text-text-light">
            Conteúdo informativo, que não substitui a análise jurídica individual dos documentos e das circunstâncias de cada caso.
          </p>
        </div>
      </section>

      <section className="bg-warm-white py-16 sm:py-20" aria-labelledby={`${slug}-relacionados`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id={`${slug}-relacionados`} className="text-2xl font-bold text-teal-dark sm:text-3xl">
            Temas relacionados
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {service.relatedServices.map((relatedSlug) => {
              const related = SERVICES[relatedSlug]
              return (
                <Link
                  key={relatedSlug}
                  href={`/${relatedSlug}`}
                  className="group flex flex-col justify-between rounded-[1.25rem] border border-warm-border bg-paper p-6 transition-colors hover:border-copper/45"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-copper">Serviço</span>
                  <span className="mt-3 text-base font-bold leading-snug text-teal-dark">{related.name}</span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-copper">
                    Ver página <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              )
            })}
            {relatedArticles.map((article) => (
              <Link
                key={article.slug}
                href={article.href}
                className="group flex flex-col justify-between rounded-[1.25rem] border border-warm-border bg-paper p-6 transition-colors hover:border-copper/45"
              >
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-copper">Artigo</span>
                <span className="mt-3 text-base font-bold leading-snug text-teal-dark">{article.title}</span>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-copper">
                  Ler artigo <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <JsonLd data={createServiceJsonLd(service)} />
    </>
  )
}
