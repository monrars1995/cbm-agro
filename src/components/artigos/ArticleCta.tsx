import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { ServiceSeo } from '@/lib/services'

export default function ArticleCta({ service }: { service?: ServiceSeo }) {
  return (
    <section className="bg-teal-dark px-6 py-9 text-center sm:px-10 sm:py-11" aria-labelledby="article-cta-title">
      <p className="mx-auto text-sm font-bold uppercase tracking-[0.14em] text-gold-light">Converse sobre seu caso</p>
      <h2 id="article-cta-title" className="mx-auto mt-3 max-w-2xl text-3xl font-bold text-warm-white">
        Decisões sobre patrimônio rural merecem análise antes da próxima assinatura.
      </h2>
      <p className="mx-auto mt-4 max-w-xl leading-relaxed text-warm-white/70">
        A equipe pode avaliar os documentos disponíveis e indicar os próximos passos adequados à sua situação.
      </p>
      <Button asChild className="mt-7 rounded-full bg-copper px-6 text-warm-white hover:bg-clay">
        <Link href="/#contato">Falar com a equipe</Link>
      </Button>
      {service ? (
        <p className="mt-5 text-sm text-warm-white/70">
          Conheça a atuação em{' '}
          <Link href={`/${service.slug}`} className="font-semibold text-gold-light underline underline-offset-4 hover:text-warm-white">
            {service.name}
          </Link>
        </p>
      ) : null}
    </section>
  )
}
