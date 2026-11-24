import { BLOG_CLUSTERS, type BlogClusterId } from '@/lib/blog-clusters'
import { SERVICES, type ServiceSeo, type ServiceSlug } from '@/lib/services'
import type { ArticleDocument } from './schema'

/**
 * Regras de link interno dos clusters do blog (método hub-and-spoke):
 * satélite -> pilar -> página de serviço, com satélites do mesmo tema entre si.
 */

export interface ArticleClusterContext {
  clusterName: string
  pillar: ArticleDocument | null
  service: ServiceSeo
}

export function getArticleClusterContext(
  article: ArticleDocument,
  published: ArticleDocument[],
): ArticleClusterContext | null {
  if (!article.cluster) {
    return null
  }

  const cluster = BLOG_CLUSTERS[article.cluster]
  const pillar = article.pillar
    ? null
    : published.find((candidate) => candidate.slug === cluster.pillarSlug) ?? null

  return { clusterName: cluster.name, pillar, service: SERVICES[cluster.service] }
}

/** Até `limit` artigos relacionados: pilar do tema, satélites do mesmo tema e, se faltar, a mesma categoria. */
export function getRelatedArticles(
  article: ArticleDocument,
  published: ArticleDocument[],
  limit = 3,
): ArticleDocument[] {
  const others = published.filter((candidate) => candidate.slug !== article.slug)
  const sameCluster = article.cluster ? others.filter((candidate) => candidate.cluster === article.cluster) : []
  const ordered = [
    ...sameCluster.filter((candidate) => candidate.pillar),
    ...sameCluster.filter((candidate) => !candidate.pillar),
    ...others.filter((candidate) => candidate.category === article.category),
  ]

  return [...new Map(ordered.map((candidate) => [candidate.slug, candidate])).values()].slice(0, limit)
}

function clusterIdsForService(slug: ServiceSlug): BlogClusterId[] {
  return (Object.keys(BLOG_CLUSTERS) as BlogClusterId[]).filter((id) => BLOG_CLUSTERS[id].service === slug)
}

/** Artigos exibidos numa página de serviço: pilares do tema, escolhas manuais e os satélites mais recentes. */
export function getServiceArticles(
  slug: ServiceSlug,
  published: ArticleDocument[],
  limit = 5,
): ArticleDocument[] {
  const clusterIds = clusterIdsForService(slug)
  const inCluster = published.filter((article) => article.cluster && clusterIds.includes(article.cluster))
  const manual = SERVICES[slug].relatedArticles
    .map((articleSlug) => published.find((article) => article.slug === articleSlug))
    .filter((article): article is ArticleDocument => Boolean(article))
  const ordered = [
    ...inCluster.filter((article) => article.pillar),
    ...manual,
    ...inCluster.filter((article) => !article.pillar),
  ]

  return [...new Map(ordered.map((article) => [article.slug, article])).values()].slice(0, limit)
}

/** Pilares publicados, na ordem dos temas. */
export function getPublishedPillars(published: ArticleDocument[]): ArticleDocument[] {
  return (Object.keys(BLOG_CLUSTERS) as BlogClusterId[])
    .map((id) => published.find((article) => article.pillar && article.cluster === id))
    .filter((article): article is ArticleDocument => Boolean(article))
}
