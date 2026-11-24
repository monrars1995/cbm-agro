import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Header from '@/components/cbm/Header'
import Footer from '@/components/cbm/Footer'
import ArticleBody from '@/components/artigos/ArticleBody'
import ArticleBreadcrumbs from '@/components/artigos/ArticleBreadcrumbs'
import ArticleCard from '@/components/artigos/ArticleCard'
import ArticleCta from '@/components/artigos/ArticleCta'
import ArticleHeader from '@/components/artigos/ArticleHeader'
import JsonLd from '@/components/artigos/JsonLd'
import { articleRepository } from '@/lib/artigos/repository'
import { createArticleJsonLd, createArticleMetadata } from '@/lib/artigos/seo'

export const dynamic = 'force-static'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await articleRepository.getPublishedSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await articleRepository.getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return createArticleMetadata(article)
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await articleRepository.getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = (await articleRepository.getPublishedArticles())
    .filter((candidate) => candidate.slug !== article.slug && candidate.category === article.category)
    .slice(0, 3)

  return (
    <>
      <Header />
      <main>
        <article>
          <section className="bg-gradient-dark relative overflow-hidden px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-40 lg:px-8">
            <div aria-hidden="true" className="absolute inset-0 field-grid opacity-20" />
            <div className="relative mx-auto max-w-7xl">
              <ArticleBreadcrumbs title={article.title} />
              <ArticleHeader article={article} />
            </div>
          </section>

          <section className="legal-paper px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <div className="relative mx-auto aspect-[16/7] max-w-3xl overflow-hidden rounded-[1.5rem] border border-warm-border bg-paper-deep shadow-lg shadow-teal-dark/[0.08] sm:aspect-[16/6]">
                <Image
                  src={article.coverImage}
                  alt={article.coverImageAlt}
                  fill
                  sizes="(min-width: 1024px) 768px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-12">
                <ArticleBody source={article.body} />
              </div>
              <aside className="mx-auto mt-10 max-w-[72ch] border-l-4 border-copper/40 bg-warm-white px-5 py-4 text-sm leading-relaxed text-text-medium">
                Este conteúdo tem caráter educativo e não substitui a análise jurídica individual dos documentos e circunstâncias do caso.
              </aside>
            </div>
          </section>

          {relatedArticles.length > 0 ? (
            <section className="bg-warm-gray px-4 py-14 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="related-articles-heading">
              <div className="mx-auto max-w-7xl">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-copper">Continue a leitura</p>
                <h2 id="related-articles-heading" className="mt-2 text-3xl font-bold text-teal-dark">Artigos relacionados</h2>
                <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {relatedArticles.map((relatedArticle) => <ArticleCard key={relatedArticle.id} article={relatedArticle} />)}
                </div>
              </div>
            </section>
          ) : null}

          <ArticleCta />
          <JsonLd data={createArticleJsonLd(article)} />
        </article>
      </main>
      <Footer />
    </>
  )
}
