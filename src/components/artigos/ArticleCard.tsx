import Image from 'next/image'
import Link from 'next/link'
import type { ArticleSummary } from '@/lib/artigos/schema'

function formatPublishedDate(date: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00.000Z`))
}

export default function ArticleCard({ article }: { article: ArticleSummary }) {
  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-warm-border bg-warm-white shadow-sm shadow-teal-dark/[0.04] transition-all duration-300 hover:-translate-y-1 hover:border-copper/45 hover:shadow-lg hover:shadow-copper/10">
      <Link href={article.href} className="block focus-visible:outline-offset-[-4px]">
        <div className="relative aspect-[16/9] overflow-hidden bg-paper-deep">
          <Image
            src={article.coverImage}
            alt={article.coverImageAlt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />
        </div>
        <div className="p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-[0.12em] text-copper">
            <span>{article.category}</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold-dark" />
            <span>{article.readingTimeMinutes} min de leitura</span>
          </div>
          <h2 className="mt-4 text-2xl font-bold leading-tight text-teal-dark transition-colors group-hover:text-copper">
            {article.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-medium">{article.description}</p>
          {article.publishedAt ? (
            <time dateTime={article.publishedAt} className="mt-5 block text-sm font-medium text-text-light">
              Publicado em {formatPublishedDate(article.publishedAt)}
            </time>
          ) : null}
        </div>
      </Link>
    </article>
  )
}
