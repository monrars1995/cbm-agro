import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import ArticleBreadcrumbs from '../ArticleBreadcrumbs'
import ArticleCta from '../ArticleCta'
import ArticleHeader from '../ArticleHeader'
import type { ArticleDocument } from '@/lib/artigos/schema'

const draftArticle: ArticleDocument = {
  id: 'draft',
  title: 'Artigo em revisão usado no teste de detalhes',
  slug: 'artigo-em-revisao',
  description: 'Descrição editorial completa para validar os componentes de detalhe.',
  category: 'Direito Agrário',
  tags: ['crédito rural'],
  keywords: ['direito agrário'],
  coverImage: '/images/blog/agricultor-crise.webp',
  coverImageAlt: 'Produtor rural na propriedade durante o dia',
  author: 'CBM Agro e Gestão de Passivos',
  draft: true,
  publishedAt: null,
  updatedAt: null,
  href: '/artigos/artigo-em-revisao',
  readingTimeMinutes: 5,
  body: 'Conteúdo em revisão.',
  plainText: 'Conteúdo em revisão.',
  sourcePath: '/tmp/artigo-em-revisao.mdx',
}

describe('article detail components', () => {
  it('renderiza breadcrumb navegável com a página atual identificada', () => {
    const html = renderToStaticMarkup(<ArticleBreadcrumbs title={draftArticle.title} />)

    expect(html).toContain('aria-label="Breadcrumb"')
    expect(html).toContain('href="/artigos"')
    expect(html).toContain('aria-current="page"')
  })

  it('renderiza metadados do artigo e aviso de rascunho', () => {
    const html = renderToStaticMarkup(<ArticleHeader article={draftArticle} />)

    expect(html).toContain('<h1')
    expect(html).toContain('Rascunho em revisão')
    expect(html).toContain('5 min de leitura')
  })

  it('centraliza o conteúdo editorial no hero e deixa a imagem para a abertura do artigo', () => {
    const html = renderToStaticMarkup(<ArticleHeader article={draftArticle} />)

    expect(html).toContain('text-center')
    expect(html).not.toContain('article-hero-image')
    expect(html).not.toContain('alt="Produtor rural na propriedade durante o dia"')
  })

  it('renderiza CTA contextual para contato', () => {
    const html = renderToStaticMarkup(<ArticleCta />)

    expect(html).toContain('href="/#contato"')
    expect(html).toContain('Falar com a equipe')
  })
})
