import type { Metadata } from 'next'
import type { ArticleDocument } from './schema'
import { DEFAULT_OG_IMAGE, ORGANIZATION_ID, SITE_NAME, SITE_URL, WEBSITE_ID, absoluteUrl } from '@/lib/site'

export { ORGANIZATION_ID, SITE_NAME, SITE_URL }
export const BLOG_PATH = '/blog'
export const ARTICLES_URL = `${SITE_URL}${BLOG_PATH}`

type JsonLdNode = Record<string, unknown>

function articleUrl(article: ArticleDocument): string {
  return absoluteUrl(article.href)
}

function articleImageUrl(article: ArticleDocument): string {
  return absoluteUrl(article.coverImage)
}

export function createArticlesMetadata(count: number): Metadata {
  const hasPublishedArticles = count > 0

  return {
    title: hasPublishedArticles
      ? 'Blog de Direito Bancário e Agrário para o produtor rural'
      : 'Blog em preparação',
    description: hasPublishedArticles
      ? 'Artigos sobre crédito rural, alongamento de dívida, execução, busca e apreensão e recuperação judicial do produtor rural.'
      : 'Novos artigos jurídicos para o produtor rural estão em preparação.',
    alternates: { canonical: ARTICLES_URL },
    robots: { index: hasPublishedArticles, follow: true },
    openGraph: {
      type: 'website',
      url: ARTICLES_URL,
      title: hasPublishedArticles
        ? `Blog | ${SITE_NAME}`
        : `Blog em preparação | ${SITE_NAME}`,
      description: hasPublishedArticles
        ? 'Artigos sobre crédito rural, alongamento de dívida, execução, busca e apreensão e recuperação judicial do produtor rural.'
        : 'Novos artigos jurídicos para o produtor rural estão em preparação.',
      siteName: SITE_NAME,
      locale: 'pt_BR',
      images: [DEFAULT_OG_IMAGE],
    },
  }
}

export function createArticleMetadata(article: ArticleDocument): Metadata {
  const url = articleUrl(article)
  const isDraft = article.draft

  return {
    title: article.seoTitle ? { absolute: article.seoTitle } : article.title,
    description: article.description,
    keywords: article.keywords,
    authors: [{ name: article.author }],
    alternates: { canonical: url },
    robots: isDraft ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: 'article',
      url,
      title: article.title,
      description: article.description,
      siteName: SITE_NAME,
      locale: 'pt_BR',
      images: [{ url: articleImageUrl(article), alt: article.coverImageAlt }],
      publishedTime: article.publishedAt ?? undefined,
      modifiedTime: article.updatedAt ?? undefined,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [articleImageUrl(article)],
    },
  }
}

export function createArticlesJsonLd(articles: ArticleDocument[]): { '@context': 'https://schema.org'; '@graph': JsonLdNode[] } {
  const publishedArticles = articles.filter((article) => !article.draft)

  const listItems = publishedArticles.map((article, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: articleUrl(article),
    name: article.title,
  }))

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${ARTICLES_URL}#collection-page`,
        url: ARTICLES_URL,
        name: 'Blog',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORGANIZATION_ID },
      },
      {
        '@type': 'Blog',
        '@id': `${ARTICLES_URL}#blog`,
        url: ARTICLES_URL,
        name: `Blog | ${SITE_NAME}`,
        publisher: { '@id': ORGANIZATION_ID },
      },
      {
        '@type': 'ItemList',
        '@id': `${ARTICLES_URL}#item-list`,
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        numberOfItems: listItems.length,
        itemListElement: listItems,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${ARTICLES_URL}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: ARTICLES_URL },
        ],
      },
    ],
  }
}

export function createArticleJsonLd(article: ArticleDocument): { '@context': 'https://schema.org'; '@graph': JsonLdNode[] } {
  const url = articleUrl(article)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#blog-posting`,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
          ...(article.reviewedBy
            ? {
                reviewedBy: {
                  '@type': 'Person',
                  name: article.reviewedBy.name,
                  jobTitle: 'Advogado',
                  identifier: article.reviewedBy.oab,
                  worksFor: { '@id': ORGANIZATION_ID },
                },
              }
            : {}),
        },
        headline: article.title,
        description: article.description,
        image: articleImageUrl(article),
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        author: { '@type': 'Organization', name: article.author, '@id': ORGANIZATION_ID },
        publisher: { '@id': ORGANIZATION_ID },
        articleSection: article.category,
        keywords: article.keywords.join(', '),
        inLanguage: 'pt-BR',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: ARTICLES_URL },
          { '@type': 'ListItem', position: 3, name: article.title, item: url },
        ],
      },
    ],
  }
}

const STATIC_PUBLIC_PATHS = [
  '/',
  '/alongamento-de-divida-rural',
  '/defesa-execucao-rural',
  '/defesa-busca-e-apreensao-agricola',
  '/recuperacao-judicial-produtor-rural',
  '/contencioso-tributario-rural',
  '/planejamento-defesa-patrimonial',
  '/analise-elaboracao-de-contrato',
  '/politica-de-privacidade',
  '/politica-de-cookies',
  '/termos-de-uso',
] as const

export interface SitemapEntry {
  url: string
  lastModified?: string
}

export function createSitemapEntries(articles: ArticleDocument[]): SitemapEntry[] {
  const publishedArticles = articles.filter((article) => !article.draft)
  const staticEntries = STATIC_PUBLIC_PATHS.map((pathname) => ({ url: absoluteUrl(pathname) }))

  if (publishedArticles.length === 0) {
    return staticEntries
  }

  return [
    ...staticEntries,
    { url: ARTICLES_URL },
    ...publishedArticles.map((article) => ({
      url: articleUrl(article),
      lastModified: article.updatedAt ?? article.publishedAt ?? undefined,
    })),
  ]
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
