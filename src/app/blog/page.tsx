import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/cbm/Header'
import Footer from '@/components/cbm/Footer'
import ArticleCard from '@/components/artigos/ArticleCard'
import JsonLd from '@/components/artigos/JsonLd'
import { getPublishedPillars } from '@/lib/artigos/clusters'
import { articleRepository } from '@/lib/artigos/repository'
import { BLOG_CLUSTERS } from '@/lib/blog-clusters'
import { createArticlesJsonLd, createArticlesMetadata } from '@/lib/artigos/seo'

export const dynamic = 'force-static'

export async function generateMetadata(): Promise<Metadata> {
  const articles = await articleRepository.getPublishedArticles()
  return createArticlesMetadata(articles.length)
}

export default async function ArticlesPage() {
  const articles = await articleRepository.getPublishedArticles()
  const pillars = getPublishedPillars(articles)

  return (
    <>
      <Header />
      <main>
        <section className="bg-gradient-dark relative overflow-hidden px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-40 lg:px-8">
          <div aria-hidden="true" className="absolute inset-0 field-grid opacity-20" />
          <div className="relative mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-gold-light">Orientação jurídica</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.04] text-warm-white sm:text-5xl lg:text-6xl">
              Artigos para decisões rurais que não aceitam improviso
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-warm-white/72 sm:text-lg">
              Informações claras para quem precisa compreender riscos, documentos e caminhos jurídicos antes de decidir sobre o patrimônio rural.
            </p>
          </div>
        </section>

        {pillars.length > 0 ? (
          <section className="bg-warm-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8" aria-labelledby="pillar-guides-heading">
            <div className="mx-auto max-w-7xl">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-copper">Comece por aqui</p>
              <h2 id="pillar-guides-heading" className="mt-2 text-3xl font-bold text-teal-dark">Guias por tema</h2>
              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pillars.map((pillar) => (
                  <Link
                    key={pillar.slug}
                    href={pillar.href}
                    className="group flex flex-col rounded-[1.25rem] border border-warm-border bg-paper p-6 transition-colors hover:border-copper/45"
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-copper">
                      {pillar.cluster ? BLOG_CLUSTERS[pillar.cluster].name : pillar.category}
                    </span>
                    <span className="mt-3 text-lg font-bold leading-snug text-teal-dark group-hover:text-copper">{pillar.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="legal-paper px-4 py-14 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="articles-list-heading">
          <div className="mx-auto max-w-7xl">
            {articles.length > 0 ? (
              <>
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-warm-border pb-6">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.14em] text-copper">Acervo publicado</p>
                    <h2 id="articles-list-heading" className="mt-2 text-3xl font-bold text-teal-dark">
                      Conteúdos para consulta
                    </h2>
                  </div>
                  <p className="text-sm text-text-light">{articles.length} artigo{articles.length === 1 ? '' : 's'} publicado{articles.length === 1 ? '' : 's'}</p>
                </div>
                <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {articles.map((article) => <ArticleCard key={article.id} article={article} />)}
                </div>
              </>
            ) : (
              <div className="command-panel max-w-3xl rounded-[1.5rem] p-8 sm:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-gold-light">Acervo em construção</p>
                <h2 id="articles-list-heading" className="mt-4 text-3xl font-bold text-warm-white sm:text-4xl">
                  Artigos em preparação
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-warm-white/70">
                  Estamos preparando conteúdos revisados para apoiar decisões rurais com mais clareza. Para uma orientação sobre o seu caso, fale diretamente com a nossa equipe.
                </p>
                <Link
                  href="/#contato"
                  className="mt-7 inline-flex rounded-full bg-copper px-6 py-3 text-sm font-semibold text-warm-white transition-colors hover:bg-clay"
                >
                  Falar com a equipe
                </Link>
              </div>
            )}
          </div>
        </section>
        <JsonLd data={createArticlesJsonLd(articles)} />
      </main>
      <Footer />
    </>
  )
}
