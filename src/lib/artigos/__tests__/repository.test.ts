import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import matter from 'gray-matter'
import { createArticleRepository } from '../repository'

const base = {
  id: 'article-one',
  title: 'Título editorial válido para o teste',
  slug: 'article-one',
  description: 'Descrição completa e exclusiva usada pelo teste automatizado.',
  category: 'Direito Agrário',
  tags: ['crédito rural'],
  keywords: ['direito agrário'],
  coverImage: '/images/blog/cover.webp',
  coverImageAlt: 'Descrição acessível da imagem usada no teste',
  author: 'CBM Agro e Gestão de Passivos',
  draft: true,
  publishedAt: null,
  updatedAt: null,
}

describe('article repository', () => {
  let rootDir: string
  let contentDir: string
  let publicDir: string
  let repository: ReturnType<typeof createArticleRepository>

  async function writeArticle(
    name: string,
    data: Record<string, unknown>,
    body = 'Conteúdo editorial para leitura.',
  ) {
    await writeFile(path.join(contentDir, name), matter.stringify(body, data), 'utf8')
  }

  beforeEach(async () => {
    rootDir = await mkdtemp(path.join(os.tmpdir(), 'cbm-artigos-'))
    contentDir = path.join(rootDir, 'content', 'artigos')
    publicDir = path.join(rootDir, 'public')

    await mkdir(contentDir, { recursive: true })
    await mkdir(path.join(publicDir, 'images', 'blog'), { recursive: true })
    await writeFile(path.join(publicDir, 'images', 'blog', 'cover.webp'), '')

    repository = createArticleRepository({
      contentDir,
      publicDir,
      environment: 'test',
    })
  })

  afterEach(async () => {
    await rm(rootDir, { recursive: true, force: true })
  })

  it('ordena publicados por publishedAt decrescente', async () => {
    await writeArticle('older.mdx', {
      ...base,
      id: 'older',
      slug: 'older',
      draft: false,
      publishedAt: '2026-08-01',
      updatedAt: '2026-08-01',
    })
    await writeArticle('newer.mdx', {
      ...base,
      id: 'newer',
      slug: 'newer',
      draft: false,
      publishedAt: '2026-09-01',
      updatedAt: '2026-09-01',
    })

    expect((await repository.getPublishedArticles()).map(({ slug }) => slug)).toEqual(['newer', 'older'])
  })

  it('remove drafts da coleção pública', async () => {
    await writeArticle('draft.mdx', base)

    expect(await repository.getPublishedArticles()).toEqual([])
  })

  it('permite obter draft em development e oculta em production', async () => {
    await writeArticle('draft.mdx', base)
    const development = createArticleRepository({ contentDir, publicDir, environment: 'development' })
    const production = createArticleRepository({ contentDir, publicDir, environment: 'production' })

    expect((await development.getArticleBySlug('article-one'))?.slug).toBe('article-one')
    expect(await production.getArticleBySlug('article-one')).toBeNull()
  })

  it('rejeita slug duplicado', async () => {
    await writeArticle('one.mdx', base)
    await writeArticle('two.mdx', { ...base, id: 'article-two' })

    await expect(repository.getAllArticles()).rejects.toThrow(/slug.*article-one/i)
  })

  it('rejeita imagem inexistente', async () => {
    await writeArticle('missing.mdx', { ...base, coverImage: '/images/blog/missing.webp' })

    await expect(repository.getAllArticles()).rejects.toThrow(/missing\.webp/)
  })

  it.each(['import Widget from "./Widget"', 'export const value = 1'])(
    'rejeita instrução MDX arbitrária: %s',
    async (body) => {
      await writeArticle('unsafe.mdx', base, body)

      await expect(repository.getAllArticles()).rejects.toThrow(/import|export/i)
    },
  )

  it('calcula tempo de leitura com mínimo de um minuto', async () => {
    await writeArticle('short.mdx', base, 'Texto curto.')

    expect((await repository.getAllArticles())[0].readingTimeMinutes).toBe(1)
  })

  it('retorna somente slugs publicados para generateStaticParams', async () => {
    await writeArticle('published.mdx', {
      ...base,
      id: 'published',
      slug: 'artigo-publicado',
      draft: false,
      publishedAt: '2026-09-01',
      updatedAt: '2026-09-01',
    })
    await writeArticle('draft.mdx', base)

    expect(await repository.getPublishedSlugs()).toEqual(['artigo-publicado'])
  })

  it('deriva texto simples sem marcação para busca futura', async () => {
    await writeArticle('plain.mdx', base, '## Seção\n\nTexto com **ênfase** e [fonte](https://example.com).')

    expect((await repository.getAllArticles())[0].plainText).toContain('Seção Texto com ênfase e fonte')
  })

})
