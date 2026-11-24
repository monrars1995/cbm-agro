import { describe, expect, it } from 'vitest'
import type { ArticleDocument } from '../schema'
import {
  createArticleJsonLd,
  createArticleMetadata,
  createArticlesJsonLd,
  createArticlesMetadata,
  createSitemapEntries,
  serializeJsonLd,
} from '../seo'

const publishedArticle: ArticleDocument = {
  id: 'published',
  title: 'Artigo publicado usado no teste de SEO',
  slug: 'publicado',
  description: 'Descrição editorial completa para validar metadata e dados estruturados.',
  category: 'Direito Agrário',
  tags: ['crédito rural'],
  keywords: ['direito agrário'],
  coverImage: '/images/blog/agricultor-crise.webp',
  coverImageAlt: 'Produtor rural na propriedade durante o dia',
  author: 'CBM Agro e Gestão de Passivos',
  draft: false,
  publishedAt: '2026-09-01',
  updatedAt: '2026-09-02',
  href: '/blog/publicado',
  readingTimeMinutes: 5,
  body: 'Conteúdo publicado.',
  plainText: 'Conteúdo publicado.',
  sourcePath: '/tmp/publicado.mdx',
}

const draftArticle: ArticleDocument = {
  ...publishedArticle,
  id: 'draft',
  title: 'Artigo em revisão usado no teste de SEO',
  slug: 'draft',
  draft: true,
  publishedAt: null,
  updatedAt: null,
  href: '/blog/draft',
  sourcePath: '/tmp/draft.mdx',
}

describe('article SEO helpers', () => {
  it('marca índice vazio como noindex e follow', () => {
    expect(createArticlesMetadata(0).robots).toEqual({ index: false, follow: true })
  })

  it('marca índice com publicação como indexável', () => {
    expect(createArticlesMetadata(1).robots).toEqual({ index: true, follow: true })
  })

  it('gera canonical e openGraph article a partir do documento', () => {
    const metadata = createArticleMetadata(publishedArticle)

    expect(metadata.alternates?.canonical).toBe('https://cbmagro.com.br/blog/publicado')
    expect(metadata.openGraph).toMatchObject({ type: 'article' })
  })

  it('marca metadata de draft local como noindex nofollow', () => {
    expect(createArticleMetadata(draftArticle).robots).toEqual({ index: false, follow: false })
  })

  it('usa as mesmas datas no BlogPosting', () => {
    const graph = createArticleJsonLd(publishedArticle)
    const posting = graph['@graph'].find((item) => item['@type'] === 'BlogPosting')

    expect(posting?.datePublished).toBe('2026-09-01')
    expect(posting?.dateModified).toBe('2026-09-02')
  })

  it('não inclui drafts no ItemList', () => {
    const graph = createArticlesJsonLd([publishedArticle, draftArticle])

    expect(JSON.stringify(graph)).toContain('/blog/publicado')
    expect(JSON.stringify(graph)).not.toContain('/blog/draft')
  })

  it('inclui rotas públicas existentes e exclui drafts', () => {
    const urls = createSitemapEntries([publishedArticle, draftArticle]).map((entry) => entry.url)

    expect(urls).toContain('https://cbmagro.com.br/')
    expect(urls).toContain('https://cbmagro.com.br/blog')
    expect(urls).toContain('https://cbmagro.com.br/blog/publicado')
    expect(urls).not.toContain('https://cbmagro.com.br/blog/draft')
  })

  it('remove /blog quando não existe publicação', () => {
    expect(createSitemapEntries([]).some((entry) => entry.url.endsWith('/blog'))).toBe(false)
  })

  it('escapa sinal menor na serialização JSON-LD', () => {
    expect(serializeJsonLd({ value: '</script>' })).not.toContain('</script>')
  })
})
