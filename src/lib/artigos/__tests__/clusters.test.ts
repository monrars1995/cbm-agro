import { describe, expect, it } from 'vitest'
import {
  getArticleClusterContext,
  getPublishedPillars,
  getRelatedArticles,
  getServiceArticles,
} from '../clusters'
import type { ArticleDocument } from '../schema'

function article(slug: string, extra: Partial<ArticleDocument> = {}): ArticleDocument {
  return {
    id: slug,
    title: `Título ${slug}`,
    slug,
    description: 'Descrição do artigo usada apenas no teste unitário.',
    category: 'Direito Bancário',
    tags: ['teste'],
    keywords: [slug],
    coverImage: '/images/blog/teste.webp',
    coverImageAlt: 'Imagem de teste do artigo',
    author: 'CBM Agro e Gestão de Passivos',
    draft: false,
    publishedAt: '2026-12-01',
    updatedAt: '2026-12-01',
    href: `/blog/${slug}`,
    readingTimeMinutes: 5,
    body: '',
    plainText: '',
    sourcePath: `${slug}.mdx`,
    ...extra,
  }
}

const pillar = article('execucao-cedula-de-credito-rural', { cluster: 'execucao', pillar: true })
const embargos = article('embargos-execucao-cedula-rural', { cluster: 'execucao' })
const sisbajud = article('bloqueio-sisbajud-produtor-rural', { cluster: 'execucao' })
const prorrogacaoPillar = article('prorrogacao-de-divida-rural', { cluster: 'prorrogacao', pillar: true })
const avulso = article('artigo-sem-cluster', { category: 'Direito Bancário' })
const published = [sisbajud, avulso, embargos, prorrogacaoPillar, pillar]

describe('clusters do blog', () => {
  it('liga o satélite ao pilar publicado e à página de serviço do tema', () => {
    const context = getArticleClusterContext(embargos, published)

    expect(context?.pillar?.slug).toBe('execucao-cedula-de-credito-rural')
    expect(context?.service.slug).toBe('defesa-execucao-rural')
  })

  it('não aponta o pilar para ele mesmo', () => {
    expect(getArticleClusterContext(pillar, published)?.pillar).toBeNull()
  })

  it('não cria contexto para artigo sem cluster', () => {
    expect(getArticleClusterContext(avulso, published)).toBeNull()
  })

  it('relaciona primeiro o pilar e depois os satélites do mesmo tema', () => {
    expect(getRelatedArticles(embargos, published).map(({ slug }) => slug)).toEqual([
      'execucao-cedula-de-credito-rural',
      'bloqueio-sisbajud-produtor-rural',
      'artigo-sem-cluster',
    ])
  })

  it('mostra na página de serviço o pilar antes dos satélites', () => {
    expect(getServiceArticles('defesa-execucao-rural', published).map(({ slug }) => slug)).toEqual([
      'execucao-cedula-de-credito-rural',
      'bloqueio-sisbajud-produtor-rural',
      'embargos-execucao-cedula-rural',
    ])
  })

  it('lista os pilares publicados na ordem dos temas', () => {
    expect(getPublishedPillars(published).map(({ slug }) => slug)).toEqual([
      'prorrogacao-de-divida-rural',
      'execucao-cedula-de-credito-rural',
    ])
  })
})
