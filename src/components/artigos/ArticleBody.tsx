import { renderArticleMdx } from '@/lib/artigos/mdx'

interface ArticleBodyProps {
  source: string
  /** Slugs do blog que podem receber link; os demais viram texto simples. */
  linkableBlogSlugs?: ReadonlySet<string>
}

export default async function ArticleBody({ source, linkableBlogSlugs }: ArticleBodyProps) {
  const content = await renderArticleMdx(source, { linkableBlogSlugs })

  return (
    <div className="mx-auto max-w-[72ch] space-y-6 text-text-medium [&_h2]:pt-6 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-teal-dark [&_h3]:pt-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-teal-dark [&_p]:leading-[1.75] [&_strong]:text-teal-dark [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_th]:bg-paper-deep [&_th]:px-4 [&_th]:py-3 [&_th]:font-semibold [&_th]:text-teal-dark [&_td]:border-t [&_td]:border-warm-border [&_td]:px-4 [&_td]:py-3 [&_td]:align-top [&_a]:font-medium [&_a]:text-teal-dark [&_a]:underline [&_a]:decoration-copper [&_a]:decoration-2 [&_a]:underline-offset-4 [&_a:hover]:decoration-teal-dark">
      {content}
    </div>
  )
}
