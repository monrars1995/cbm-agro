import type { ComponentProps, ReactNode } from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'

const BLOG_LINK = /^\/blog\/([a-z0-9-]+)(?:[#?].*)?$/

export interface RenderArticleMdxOptions {
  /**
   * Slugs do blog que podem receber link. Links para outros slugs (rascunhos ainda
   * não publicados) viram texto simples e passam a ser link quando o artigo publicar.
   */
  linkableBlogSlugs?: ReadonlySet<string>
}

function createArticleLink(linkableBlogSlugs?: ReadonlySet<string>) {
  return function ArticleLink({ href, children, ...props }: ComponentProps<'a'>) {
    const isExternal = typeof href === 'string' && /^https?:\/\//.test(href)
    const blogSlug = typeof href === 'string' ? BLOG_LINK.exec(href)?.[1] : undefined

    if (blogSlug && linkableBlogSlugs && !linkableBlogSlugs.has(blogSlug)) {
      return <>{children}</>
    }

    return (
      <a
        {...props}
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }
}

function ArticleTable(props: ComponentProps<'table'>) {
  return (
    <div className="article-table my-6 overflow-x-auto rounded-xl border border-warm-border">
      <table {...props} className="w-full min-w-[32rem] border-collapse text-left text-sm" />
    </div>
  )
}

function Callout({ title, children }: { title?: string; children: ReactNode }) {
  if (!title) {
    throw new Error('Callout requer uma propriedade title')
  }

  return (
    <aside className="my-6 border-l-4 border-copper/30 bg-paper p-5 text-text-medium" aria-label={title}>
      <h2 className="font-semibold text-teal-dark">{title}</h2>
      <div className="mt-2 leading-[1.75]">{children}</div>
    </aside>
  )
}

export async function renderArticleMdx(source: string, options: RenderArticleMdxOptions = {}): Promise<ReactNode> {
  const { content } = await compileMDX({
    source,
    components: { a: createArticleLink(options.linkableBlogSlugs), Callout, table: ArticleTable },
    options: { parseFrontmatter: false, mdxOptions: { remarkPlugins: [remarkGfm] } },
  })

  return content
}
