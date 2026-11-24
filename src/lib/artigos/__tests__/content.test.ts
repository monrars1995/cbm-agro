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

  it('mantém publicados os três conteúdos iniciais', async () => {
    const published = await articleRepository.getPublishedArticles()

    expect(published.map(({ slug }) => slug)).toEqual(expect.arrayContaining([
      'agricultor-em-crise-financeira',
      'como-manter-sua-terra',
      'linha-de-credito-agricola',
    ]))
    expect(published.every(({ draft }) => !draft)).toBe(true)
  })

  it('deixa os rascunhos fora da lista publicada', async () => {
    const all = await articleRepository.getAllArticles()
    const publishedSlugs = new Set(await articleRepository.getPublishedSlugs())

    for (const article of all.filter(({ draft }) => draft)) {
      expect(publishedSlugs.has(article.slug), `${article.slug} é rascunho`).toBe(false)
    }
  })

  it('pré-renderiza os slugs publicados para generateStaticParams', async () => {
    await expect(articleRepository.getPublishedSlugs()).resolves.toEqual(expect.arrayContaining([
      'agricultor-em-crise-financeira',
      'como-manter-sua-terra',
      'linha-de-credito-agricola',
    ]))
  })
})
