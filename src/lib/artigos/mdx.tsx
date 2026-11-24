import type { ComponentProps, ReactNode } from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'

function ArticleLink({ href, children, ...props }: ComponentProps<'a'>) {
  const isExternal = typeof href === 'string' && /^https?:\/\//.test(href)

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

const articleMdxComponents = {
  a: ArticleLink,
  Callout,
}

export async function renderArticleMdx(source: string): Promise<ReactNode> {
  const { content } = await compileMDX({
    source,
    components: articleMdxComponents,
    options: { parseFrontmatter: false },
  })

  return content
}
