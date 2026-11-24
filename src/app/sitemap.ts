import type { MetadataRoute } from 'next'
import { articleRepository } from '@/lib/artigos/repository'
import { createSitemapEntries } from '@/lib/artigos/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await articleRepository.getPublishedArticles()
  return createSitemapEntries(articles)
}
