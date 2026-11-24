import Link from 'next/link'

export default function ArticleBreadcrumbs({ title }: { title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-warm-white/72">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li><Link href="/" className="transition-colors hover:text-gold-light">Início</Link></li>
        <li aria-hidden="true" className="text-gold/60">/</li>
        <li><Link href="/blog" className="transition-colors hover:text-gold-light">Blog</Link></li>
        <li aria-hidden="true" className="text-gold/60">/</li>
        <li aria-current="page" className="max-w-full truncate font-medium text-warm-white">{title}</li>
      </ol>
    </nav>
  )
}
