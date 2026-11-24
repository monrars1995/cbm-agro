import { access, readdir, readFile } from 'node:fs/promises'
import type { Dirent } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import {
  ArticleFrontmatterSchema,
  type ArticleDocument,
  type ArticleEnvironment,
} from './schema'

export interface ArticleRepositoryOptions {
  contentDir: string
  publicDir: string
  environment: ArticleEnvironment
}

export interface ArticleRepository {
  getAllArticles(): Promise<ArticleDocument[]>
  getPublishedArticles(): Promise<ArticleDocument[]>
  getArticleBySlug(slug: string): Promise<ArticleDocument | null>
  getPublishedSlugs(): Promise<string[]>
}

function formatError(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

function toPlainText(body: string): string {
  return body
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^(?:#{1,6}|>|[-+*]|\d+\.)\s+/gm, '')
    .replace(/(?:\*\*|__|\*|_|~~)/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function calculateReadingTimeMinutes(plainText: string): number {
  const words = plainText ? plainText.split(/\s+/).length : 0
  return Math.max(1, Math.ceil(words / 220))
}

function assertSafeMdxBody(body: string, sourcePath: string): void {
  if (/^(?:import|export)\b/m.test(body)) {
    throw new Error(`Instrução MDX import/export não permitida em ${sourcePath}`)
  }
}

function sortPublishedArticles(articles: ArticleDocument[]): ArticleDocument[] {
  return [...articles].sort((first, second) => {
    const dateDifference = (second.publishedAt ?? '').localeCompare(first.publishedAt ?? '')
    return dateDifference || first.title.localeCompare(second.title, 'pt-BR')
  })
}

export function createArticleRepository(options: ArticleRepositoryOptions): ArticleRepository {
  function normalizeFrontmatterDates(data: Record<string, unknown>): Record<string, unknown> {
    const normalized: Record<string, unknown> = { ...data }

    for (const key of ['publishedAt', 'updatedAt']) {
      const value = normalized[key]

      if (value instanceof Date) {
        normalized[key] = value.toISOString().slice(0, 10)
      }
    }

    return normalized
  }

  async function getAllArticles(): Promise<ArticleDocument[]> {
    let entries: Dirent[]

    try {
      entries = await readdir(options.contentDir, { withFileTypes: true })
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return []
      }

      throw new Error(`Não foi possível ler o diretório de artigos ${options.contentDir}: ${formatError(error)}`)
    }

    const files = entries
      .filter((entry) => entry.isFile() && /\.mdx?$/i.test(entry.name))
      .map((entry) => entry.name)
      .sort((first, second) => first.localeCompare(second, 'pt-BR'))

    const documents = await Promise.all(files.map(async (fileName) => {
      const sourcePath = path.join(options.contentDir, fileName)

      try {
        const source = await readFile(sourcePath, 'utf8')
        const parsed = matter(source)
        const frontmatter = ArticleFrontmatterSchema.parse(normalizeFrontmatterDates(parsed.data))
        const body = parsed.content.trim()

        assertSafeMdxBody(body, sourcePath)
        await access(path.join(options.publicDir, frontmatter.coverImage.replace(/^\//, '')))

        const plainText = toPlainText(body)

        return {
          ...frontmatter,
          body,
          plainText,
          sourcePath,
          href: `/blog/${frontmatter.slug}` as const,
          readingTimeMinutes: calculateReadingTimeMinutes(plainText),
        }
      } catch (error) {
        throw new Error(`Erro no artigo ${sourcePath}: ${formatError(error)}`)
      }
    }))

    const ids = new Map<string, string>()
    const slugs = new Map<string, string>()

    for (const document of documents) {
      const duplicateIdPath = ids.get(document.id)
      if (duplicateIdPath) {
        throw new Error(`ID duplicado "${document.id}" em ${document.sourcePath}; já usado em ${duplicateIdPath}`)
      }
      ids.set(document.id, document.sourcePath)

      const duplicateSlugPath = slugs.get(document.slug)
      if (duplicateSlugPath) {
        throw new Error(`Slug duplicado "${document.slug}" em ${document.sourcePath}; já usado em ${duplicateSlugPath}`)
      }
      slugs.set(document.slug, document.sourcePath)
    }

    return documents
  }

  async function getPublishedArticles(): Promise<ArticleDocument[]> {
    const articles = await getAllArticles()
    return sortPublishedArticles(articles.filter((article) => !article.draft))
  }

  async function getArticleBySlug(slug: string): Promise<ArticleDocument | null> {
    const article = (await getAllArticles()).find((candidate) => candidate.slug === slug)

    if (!article || (article.draft && options.environment === 'production')) {
      return null
    }

    return article
  }

  async function getPublishedSlugs(): Promise<string[]> {
    return (await getPublishedArticles()).map((article) => article.slug)
  }

  return {
    getAllArticles,
    getPublishedArticles,
    getArticleBySlug,
    getPublishedSlugs,
  }
}

export const articleRepository = createArticleRepository({
  contentDir: path.join(process.cwd(), 'content', 'blog'),
  publicDir: path.join(process.cwd(), 'public'),
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
})
