import type { ArticleDocument } from '@/lib/artigos/schema'

function formatPublishedDate(date: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00.000Z`))
}

export default function ArticleHeader({ article }: { article: ArticleDocument }) {
  return (
    <header className="mt-7 mx-auto max-w-3xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-gold-light">{article.category}</p>
      {article.draft ? (
        <p className="mt-4 inline-flex rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-gold-light">
          Rascunho em revisão
        </p>
      ) : null}
      <h1 className="mt-5 text-4xl font-bold leading-[1.05] text-warm-white sm:text-5xl lg:text-6xl">
        {article.title}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-warm-white/76">{article.description}</p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-warm-white/66">
        <span>{article.author}</span>
        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold/70" />
        {article.publishedAt ? <time dateTime={article.publishedAt}>{formatPublishedDate(article.publishedAt)}</time> : null}
        {article.publishedAt ? <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold/70" /> : null}
        <span>{article.readingTimeMinutes} min de leitura</span>
      </div>
      {article.reviewedBy ? (
        <p className="mt-3 text-sm text-warm-white/66">
          Revisão jurídica: {article.reviewedBy.name}, {article.reviewedBy.oab}
        </p>
      ) : null}
    </header>
  )
}
