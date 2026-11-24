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
