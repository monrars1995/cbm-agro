import { renderArticleMdx } from '@/lib/artigos/mdx'

export default async function ArticleBody({ source }: { source: string }) {
  const content = await renderArticleMdx(source)

  return (
    <div className="mx-auto max-w-[72ch] space-y-6 text-text-medium [&_h2]:pt-6 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-teal-dark [&_h3]:pt-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-teal-dark [&_p]:leading-[1.75] [&_strong]:text-teal-dark [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6">
      {content}
    </div>
  )
}
