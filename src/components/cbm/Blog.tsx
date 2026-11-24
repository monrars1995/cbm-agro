'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { trackBlogClick, trackSectionView } from '@/lib/dataLayer'
import SectionHeading from './SectionHeading'

const blogPosts = [
  {
    tag: 'Direito Agrário',
    title: 'Agricultor em crise financeira: entenda as alternativas jurídicas antes de vender tudo',
    excerpt: 'Quando a produção falha, o crédito aperta e os boletos vencem, muitos agricultores pensam em vender tudo.',
    readTime: '5 min',
    image: '/images/blog/agricultor-crise.webp',
    href: '/artigos/agricultor-em-crise-financeira',
  },
  {
    tag: 'Proteção patrimonial',
    title: 'Como o escritório de advocacia pode ajudar produtores a manterem sua terra',
    excerpt: 'Quando a crise aperta e a dívida cresce, o produtor rural começa a se preocupar com o que mais importa.',
    readTime: '4 min',
    image: '/images/blog/manter-terra.webp',
    href: '/artigos/como-manter-sua-terra',
  },
  {
    tag: 'Direito Bancário',
    title: 'Linha de crédito agrícola virou dor de cabeça? Veja o que fazer',
    excerpt: 'A linha de crédito agrícola, que deveria ser uma solução para custear a produção no campo, muitas vezes se torna um problema.',
    readTime: '6 min',
    image: '/images/blog/linha-credito.webp',
    href: '/artigos/linha-de-credito-agricola',
  },
]

export default function Blog() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      trackSectionView('blog')
    }
  }, [isInView])

  return (
    <section id="blog" className="bg-warm-white py-20 sm:py-28" ref={ref} aria-label="Blog e artigos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <SectionHeading
            eyebrow="Antes de assinar"
            title="Orientação jurídica para decisões que não aceitam improviso"
            description="Conteúdo direto para entender quando o banco está cobrando demais, quando a lei permite alongar e quando a defesa precisa ser imediata."
          />
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <Card className="relative group h-full overflow-hidden rounded-[1.5rem] border-warm-border bg-warm-white py-0 shadow-sm shadow-teal-dark/5 transition-all duration-500 hover:-translate-y-0.5 hover:border-copper/25 hover:shadow-lg hover:shadow-copper/10">
                <Link
                  href={post.href}
                  className="absolute inset-0 rounded-[1.5rem] focus-visible:outline-offset-[-4px]"
                  aria-label={`Ler o artigo: ${post.title}`}
                >
                  <span className="sr-only">{post.title}</span>
                </Link>
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-warm-white px-3 py-1.5 text-xs font-semibold text-teal-dark shadow-sm">
                      {post.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 flex items-center gap-1 text-xs text-warm-white/82">
                    <Clock className="size-3" aria-hidden="true" />
                    {post.readTime}
                  </div>
                  <div className="absolute inset-0 bg-teal-dark/0 transition-colors duration-500 group-hover:bg-teal-dark/10" />
                </div>

                <CardContent className="p-6 flex flex-col flex-grow">
                  <h3 className="mb-3 text-lg font-bold leading-snug text-teal-dark transition-colors duration-300 group-hover:text-copper">
                    {post.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-text-medium">
                    {post.excerpt}
                  </p>
                  <a
                    href="/#contato"
                    onClick={() => trackBlogClick(post.title, post.tag)}
                    className="relative z-10 mt-auto inline-flex min-h-11 items-center text-sm font-bold text-copper transition-colors duration-200 hover:text-clay group/link"
                  >
                    Falar sobre este tema
                    <ArrowRight className="size-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            variant="outline"
            onClick={() => document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })}
            className="group rounded-xl border-teal text-teal-dark px-8 py-3 font-semibold transition-all duration-300 hover:bg-teal-dark hover:text-warm-white hover:shadow-lg hover:shadow-teal/10"
          >
            Receber orientação jurídica
            <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            asChild
            className="group rounded-xl bg-copper px-8 py-3 font-semibold text-warm-white transition-all duration-300 hover:bg-clay hover:shadow-lg hover:shadow-copper/20"
          >
            <Link href="/artigos">
              Ver todos os artigos
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
