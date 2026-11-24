import { describe, expect, it } from 'vitest'
import { articleRepository } from '../repository'

describe('initial articles publication', () => {
  it('carrega o artigo sobre crise financeira publicado com metadata completa', async () => {
    const article = await articleRepository.getArticleBySlug('agricultor-em-crise-financeira')

    expect(article?.draft).toBe(false)
    expect(article?.publishedAt).toBe('2026-09-04')
    expect(article?.updatedAt).toBe('2026-09-04')
    expect(article?.title).toBe('Agricultor em crise financeira: entenda as alternativas jurídicas antes de vender tudo')
    expect(article?.body.length).toBeGreaterThan(2500)
  })

  it('carrega o artigo sobre manutenção da terra publicado com metadata completa', async () => {
    const article = await articleRepository.getArticleBySlug('como-manter-sua-terra')

    expect(article?.draft).toBe(false)
    expect(article?.publishedAt).toBe('2026-09-04')
    expect(article?.updatedAt).toBe('2026-09-04')
    expect(article?.title).toBe('Como o escritório de advocacia pode ajudar produtores a manterem sua terra')
    expect(article?.body.length).toBeGreaterThan(2500)
  })

  it('carrega o artigo sobre linha de crédito publicado com metadata completa', async () => {
    const article = await articleRepository.getArticleBySlug('linha-de-credito-agricola')

    expect(article?.draft).toBe(false)
    expect(article?.publishedAt).toBe('2026-09-04')
    expect(article?.updatedAt).toBe('2026-09-04')
    expect(article?.title).toBe('Linha de crédito agrícola virou dor de cabeça? Veja o que fazer')
    expect(article?.body.length).toBeGreaterThan(2500)
  })

  it('mantém exatamente os três conteúdos iniciais publicados', async () => {
    const articles = await articleRepository.getAllArticles()

    expect(articles.map(({ slug }) => slug).sort()).toEqual([
      'agricultor-em-crise-financeira',
      'como-manter-sua-terra',
      'linha-de-credito-agricola',
    ])
    expect(articles.every(({ draft }) => draft)).toBe(false)
  })

  it('pré-renderiza os três slugs publicados para generateStaticParams', async () => {
    await expect(articleRepository.getPublishedSlugs()).resolves.toEqual([
      'agricultor-em-crise-financeira',
      'como-manter-sua-terra',
      'linha-de-credito-agricola',
    ])
  })
})
