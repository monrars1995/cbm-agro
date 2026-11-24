import { z } from 'zod'
import { BLOG_CLUSTERS, BLOG_CLUSTER_IDS } from '@/lib/blog-clusters'

const dateOnly = z.string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((value) => {
    const parsed = new Date(`${value}T00:00:00.000Z`)
    return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value
  }, 'Informe uma data válida no formato YYYY-MM-DD')

export const ArticleFrontmatterSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(10),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(30).max(180),
  category: z.string().min(2),
  tags: z.array(z.string().min(2)).min(1),
  keywords: z.array(z.string().min(2)).min(1),
  coverImage: z.string().regex(/^\/images\/.+\.(?:avif|webp|png|jpe?g)$/),
  coverImageAlt: z.string().min(10),
  author: z.literal('CBM Agro e Gestão de Passivos'),
  draft: z.boolean(),
  publishedAt: dateOnly.nullable(),
  updatedAt: dateOnly.nullable(),
  /** Título da aba e do Google, até 60 caracteres, já com " | CBM Agro". Sem ele, usa o title. */
  seoTitle: z.string().min(20).max(60).optional(),
  /** Tema do blog (cluster). Liga o artigo ao pilar e à página de serviço. */
  cluster: z.enum(BLOG_CLUSTER_IDS).optional(),
  /** Marca o artigo pilar do tema. */
  pillar: z.boolean().optional(),
  /** Advogado que revisou o conteúdo (E-E-A-T). */
  reviewedBy: z.object({
    name: z.string().min(5),
    oab: z.string().regex(/^OAB\/[A-Z]{2} \d{1,3}(?:\.\d{3})*(?:-[A-Z])?$/, 'Use o formato OAB/BA 12.345'),
    /** "sociedade" quando a revisão é assinada pela sociedade de advogados (registro da sociedade na OAB). */
    kind: z.enum(['advogado', 'sociedade']).optional(),
  }).optional(),
}).superRefine((value, ctx) => {
  if (value.pillar && !value.cluster) {
    ctx.addIssue({
      code: 'custom',
      path: ['cluster'],
      message: 'Artigo pilar precisa informar o cluster',
    })
  }

  if (value.pillar && value.cluster && BLOG_CLUSTERS[value.cluster].pillarSlug !== value.slug) {
    ctx.addIssue({
      code: 'custom',
      path: ['slug'],
      message: `O pilar do cluster ${value.cluster} deve usar o slug ${BLOG_CLUSTERS[value.cluster].pillarSlug}`,
    })
  }

  if (!value.draft && !value.publishedAt) {
    ctx.addIssue({
      code: 'custom',
      path: ['publishedAt'],
      message: 'publishedAt é obrigatório para publicação',
    })
  }

  if (!value.draft && !value.updatedAt) {
    ctx.addIssue({
      code: 'custom',
      path: ['updatedAt'],
      message: 'updatedAt é obrigatório para publicação',
    })
  }

  if (value.publishedAt && value.updatedAt && value.updatedAt < value.publishedAt) {
    ctx.addIssue({
      code: 'custom',
      path: ['updatedAt'],
      message: 'updatedAt não pode ser anterior a publishedAt',
    })
  }
})

export type ArticleFrontmatter = z.infer<typeof ArticleFrontmatterSchema>
export type ArticleEnvironment = 'development' | 'test' | 'production'

export interface ArticleSummary extends ArticleFrontmatter {
  href: `/blog/${string}`
  readingTimeMinutes: number
}

export interface ArticleDocument extends ArticleSummary {
  body: string
  plainText: string
  sourcePath: string
}
