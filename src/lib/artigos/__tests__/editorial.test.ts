import { describe, expect, it } from 'vitest'
import { BLOG_CLUSTERS } from '@/lib/blog-clusters'
import { articleRepository } from '../repository'

/**
 * Regras do plano editorial (clusters do blog, OAB e YMYL), aplicadas a todo
 * artigo criado ou atualizado a partir do início do calendário editorial.
 */
const EDITORIAL_RULES_SINCE = '2026-11-30'
const BANNED_TERMS = [/gratuit/i, /garantimos/i, /garantia de resultado/i, /100\s?%/, /blindagem/i, /o melhor escritório/i]

describe('regras editoriais do blog', () => {
  it('não repete a palavra-chave principal entre artigos', async () => {
    const articles = await articleRepository.getAllArticles()
    const primary = articles.map(({ keywords }) => keywords[0].toLowerCase())

    expect(new Set(primary).size).toBe(primary.length)
  })

  it('não usa termos vedados pela publicidade da advocacia', async () => {
    const articles = await articleRepository.getAllArticles()

    for (const article of articles) {
      const text = `${article.title}\n${article.description}\n${article.body}`
      for (const term of BANNED_TERMS) {
        expect(text, `${article.slug} contém ${term}`).not.toMatch(term)
      }
    }
  })

  it('liga cada artigo novo ao pilar e à página de serviço do tema', async () => {
    const published = await articleRepository.getPublishedArticles()
    const publishedSlugs = new Set(published.map(({ slug }) => slug))
    const covered = published.filter(({ updatedAt }) => (updatedAt ?? '') >= EDITORIAL_RULES_SINCE)

    for (const article of covered) {
      expect(article.cluster, `${article.slug} sem cluster`).toBeDefined()
      expect(article.seoTitle, `${article.slug} sem seoTitle`).toBeDefined()
      expect(article.reviewedBy, `${article.slug} sem revisão jurídica`).toBeDefined()

      const cluster = BLOG_CLUSTERS[article.cluster!]
      expect(article.body, `${article.slug} sem link para /${cluster.service}`).toContain(`](/${cluster.service}`)

      if (!article.pillar && publishedSlugs.has(cluster.pillarSlug)) {
        expect(article.body, `${article.slug} sem link para o pilar`).toContain(`](/blog/${cluster.pillarSlug}`)
      }
    }
  })
})
