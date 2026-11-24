import { renderToStaticMarkup } from 'react-dom/server'
import { expect, it } from 'vitest'
import ArticleCard from '../ArticleCard'
import type { ArticleSummary } from '@/lib/artigos/schema'

const publishedSummary: ArticleSummary = {
  id: 'published',
  title: 'Artigo publicado usado no teste do card',
  slug: 'artigo-publicado',
  description: 'Descrição editorial completa para validar o card server-side.',
  category: 'Direito Agrário',
  tags: ['crédito rural'],
  keywords: ['direito agrário'],
  coverImage: '/images/blog/agricultor-crise.webp',
  coverImageAlt: 'Produtor rural na propriedade durante o dia',
  author: 'CBM Agro e Gestão de Passivos',
  draft: false,
  publishedAt: '2026-09-01',
  updatedAt: '2026-09-01',
  href: '/blog/artigo-publicado',
  readingTimeMinutes: 5,
}

it('renderiza card como article com link, categoria e time', () => {
  const html = renderToStaticMarkup(<ArticleCard article={publishedSummary} />)

  expect(html).toContain('<article')
  expect(html).toContain('href="/blog/artigo-publicado"')
  expect(html).toContain('<time')
  expect(html).toContain('Direito Agrário')
})
