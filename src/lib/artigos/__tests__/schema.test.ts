import { describe, expect, it } from 'vitest'
import { ArticleFrontmatterSchema } from '../schema'

const validDraft = {
  id: 'artigo-001',
  title: 'Título válido para teste',
  slug: 'titulo-valido-para-teste',
  description: 'Resumo editorial exclusivo e informativo.',
  category: 'Direito Agrário',
  tags: ['crédito rural'],
  keywords: ['direito agrário'],
  coverImage: '/images/blog/agricultor-crise.webp',
  coverImageAlt: 'Produtor rural observando a propriedade',
  author: 'CBM Agro e Gestão de Passivos',
  draft: true,
  publishedAt: null,
  updatedAt: null,
}

describe('ArticleFrontmatterSchema', () => {
  it('aceita draft completo sem datas de publicação', () => {
    expect(ArticleFrontmatterSchema.parse(validDraft)).toEqual(validDraft)
  })

  it('rejeita slug fora da convenção', () => {
    expect(() => ArticleFrontmatterSchema.parse({ ...validDraft, slug: 'Slug Inválido' })).toThrow()
  })

  it('exige datas em artigo publicado', () => {
    expect(() => ArticleFrontmatterSchema.parse({ ...validDraft, draft: false })).toThrow(/publishedAt/)
  })

  it('rejeita atualização anterior à publicação', () => {
    expect(() => ArticleFrontmatterSchema.parse({
      ...validDraft,
      draft: false,
      publishedAt: '2026-09-03',
      updatedAt: '2026-09-02',
    })).toThrow(/updatedAt/)
  })

  it('rejeita uma data inexistente no calendário', () => {
    expect(() => ArticleFrontmatterSchema.parse({
      ...validDraft,
      draft: false,
      publishedAt: '2026-02-30',
      updatedAt: '2026-03-01',
    })).toThrow(/data válida/)
  })
})

describe('ArticleFrontmatterSchema: campos do plano editorial', () => {
  it('aceita cluster, seoTitle e revisão jurídica', () => {
    const parsed = ArticleFrontmatterSchema.parse({
      ...validDraft,
      cluster: 'execucao',
      seoTitle: 'Execução de cédula rural: prazos e defesas | CBM Agro',
      reviewedBy: { name: 'Dr. Fulano de Tal', oab: 'OAB/BA 12.345' },
    })

    expect(parsed.cluster).toBe('execucao')
    expect(parsed.reviewedBy?.oab).toBe('OAB/BA 12.345')
  })

  it('aceita revisão assinada pela sociedade de advogados', () => {
    const parsed = ArticleFrontmatterSchema.parse({
      ...validDraft,
      reviewedBy: { name: 'CBM Advogados', oab: 'OAB/BA 5.496', kind: 'sociedade' },
    })

    expect(parsed.reviewedBy?.kind).toBe('sociedade')
  })

  it('rejeita cluster inexistente', () => {
    expect(() => ArticleFrontmatterSchema.parse({ ...validDraft, cluster: 'outro-tema' })).toThrow()
  })

  it('rejeita seoTitle com mais de 60 caracteres', () => {
    expect(() => ArticleFrontmatterSchema.parse({ ...validDraft, seoTitle: 'x'.repeat(61) })).toThrow()
  })

  it('rejeita OAB fora do formato', () => {
    expect(() => ArticleFrontmatterSchema.parse({
      ...validDraft,
      reviewedBy: { name: 'Dr. Fulano de Tal', oab: '12345' },
    })).toThrow(/OAB\/BA 12\.345/)
  })

  it('exige cluster no artigo pilar', () => {
    expect(() => ArticleFrontmatterSchema.parse({ ...validDraft, pillar: true })).toThrow(/cluster/)
  })

  it('exige que o pilar use o slug definido para o cluster', () => {
    expect(() => ArticleFrontmatterSchema.parse({ ...validDraft, pillar: true, cluster: 'execucao' }))
      .toThrow(/execucao-cedula-de-credito-rural/)
    expect(ArticleFrontmatterSchema.parse({
      ...validDraft,
      pillar: true,
      cluster: 'execucao',
      slug: 'execucao-cedula-de-credito-rural',
    }).pillar).toBe(true)
  })
})
