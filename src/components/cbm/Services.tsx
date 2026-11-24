'use client'

import { useRef, useState } from 'react'
import { useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Handshake, Wheat, Lock, Scale, ReceiptText, Landmark, FileCheck2, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { trackServiceClick, trackSectionView } from '@/lib/dataLayer'
import SectionHeading from './SectionHeading'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from '@/components/ui/carousel'

const services = [
  {
    icon: Shield,
    title: 'Defesa contra Cobrança e Execução Judicial',
    href: '/defesa-execucao-rural',
    cue: 'Prazo curto',
    description:
      'Travamos execuções e cobranças abusivas antes que o banco tome o que é seu. Defesa técnica para proteger fazenda, maquinário e fluxo de caixa.',
    image: '/images/services/defesa-cobranca.webp',
  },
  {
    icon: Handshake,
    title: 'Renegociação e Redução de Dívidas',
    href: '#contato',
    cue: 'Pressão bancária',
    description:
      'Renegociamos dívidas com base na lei, não no favor do gerente. Buscamos redução real de valores e parcelas que cabem na sua safra.',
    image: '/images/services/renegociacao-dividas.webp',
    imageClassName: 'object-[64%_center] brightness-90 saturate-75',
    overlayClassName: 'bg-teal-dark/55',
  },
  {
    icon: Wheat,
    title: 'Defesa para Produtores Rurais Endividados',
    href: '/alongamento-de-divida-rural',
    cue: 'Crédito rural',
    description:
      'Alongamento, laudo de frustração de safra e defesa do crédito rural. O risco da atividade é compartilhado, e a lei protege quem produz.',
    image: '/images/services/produtores-rurais.webp',
  },
  {
    icon: Lock,
    title: 'Defesa contra Busca e Apreensão',
    href: '/defesa-busca-e-apreensao-agricola',
    cue: 'Maquinário em risco',
    description:
      'Defesa imediata quando o mandado chega. Contestação, liminar e proteção de bens essenciais à lavoura, prazo curto exige ação rápida.',
    image: '/images/services/busca-apreensao-rural.webp',
  },
  {
    icon: Scale,
    title: 'Recuperação Judicial do Produtor Rural',
    href: '/recuperacao-judicial-produtor-rural',
    cue: 'Dívida estruturada',
    description:
      'Reorganização da dívida rural com proteção legal contra execuções, quando a negociação isolada já não é suficiente. Um plano de recuperação com respaldo da lei, preservando a atividade e o patrimônio.',
    image: '/images/services/recuperacao-judicial.webp',
  },
  {
    icon: ReceiptText,
    title: 'Contencioso Tributário Rural',
    href: '/contencioso-tributario-rural',
    cue: 'Passivo fiscal',
    description:
      'Impostos sobre produção, terra e comercialização pesam na margem quando somam anos sem revisão. Examinamos lançamentos, inscrevemos defesas administrativas e judiciais e buscamos o enquadramento que a lei prevê para a atividade rural.',
    image: '/images/services/tributario.webp',
  },
  {
    icon: Landmark,
    title: 'Planejamento e Defesa Patrimonial',
    href: '/planejamento-defesa-patrimonial',
    cue: 'Proteção de longo prazo',
    description:
      'Organização jurídica de bens, contratos e sucessão para proteger o que foi construído em uma vida. Estruturas patrimoniais revisadas antes de assinar, reduzindo exposição a cobranças e disputas futuras.',
    image: '/images/services/patrimonial.webp',
  },
  {
    icon: FileCheck2,
    title: 'Assessoria na elaboração e análise de contratos rurais',
    href: '/analise-elaboracao-de-contrato',
    cue: 'Cláusulas e garantias',
    description:
      'Revisamos e estruturamos contratos bancários, de barter, arrendamento, compra e venda e fornecimento para reduzir riscos antes da assinatura.',
    image: '/images/services/analise-contrato-rural.webp',
    imageClassName: 'object-[30%_center] brightness-105 saturate-110',
    overlayClassName: 'bg-copper/35',
  },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const AUTOPLAY_INTERVAL_MS = 5000

  useEffect(() => {
    if (isInView) {
      trackSectionView('servicos')
    }
  }, [isInView])

  useEffect(() => {
    if (!api) {
      return
    }

    const onSelect = (emblaApi: CarouselApi | undefined) => {
      if (!emblaApi) return
      setCurrent(emblaApi.selectedScrollSnap())
    }

    api.on('select', onSelect)
    api.on('reInit', onSelect)

    const frame = window.requestAnimationFrame(() => {
      setCurrent(api.selectedScrollSnap())
    })

    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
      window.cancelAnimationFrame(frame)
    }
  }, [api])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)

    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    if (!api || !isPlaying || prefersReducedMotion) {
      return
    }

    const interval = window.setInterval(() => {
      api.scrollNext()
    }, AUTOPLAY_INTERVAL_MS)

    return () => window.clearInterval(interval)
  }, [api, isPlaying, prefersReducedMotion])

  return (
    <section id="servicos" className="legal-paper overflow-x-clip py-20 sm:py-28" ref={ref} aria-label="Nossos serviços">
      <div className="mx-auto max-w-7xl overflow-x-clip px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="min-w-0 lg:sticky lg:top-28"
          >
            <SectionHeading
              eyebrow="Mapa de defesa"
              title="Escolha a frente certa antes que o banco escolha por você"
              description="O primeiro movimento define o risco: contestar, alongar, renegociar ou proteger o bem essencial."
              align="left"
            />

            <div className="mt-8 border-t border-copper/25 pt-5">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-copper">
                Triagem jurídica
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-medium">
                Se existe prazo judicial, mandado ou vencimento próximo, a rota urgente vem antes da negociação.
              </p>
            </div>
          </motion.div>

          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              loop: true,
            }}
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
            className="w-full min-w-0 max-w-2xl justify-self-end md:justify-self-center"
          >
            <CarouselContent>
              {services.map((service, index) => (
                <CarouselItem key={service.title} className="min-w-0 basis-full">
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.05 * index }}
                    className="h-full min-w-0"
                  >
                    <a
                      href={service.href}
                      onClick={(e) => {
                        trackServiceClick(service.title)
                        if (service.href.startsWith('#')) {
                          e.preventDefault()
                          document.querySelector(service.href)?.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                      aria-label={`${service.title}. Serviço ${index + 1} de ${services.length}.`}
                      className="group grid h-full min-w-0 overflow-hidden rounded-[1.5rem] border border-warm-border bg-warm-white shadow-sm shadow-teal-dark/5 transition-all duration-500 hover:-translate-y-0.5 hover:border-copper/25 hover:shadow-lg hover:shadow-copper/10 sm:grid-cols-[10rem_minmax(0,1fr)]"
                    >
                      <div className="relative min-h-40 overflow-hidden sm:min-h-full">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(min-width: 640px) 45vw, 100vw"
                          className={`object-cover transition-transform duration-700 group-hover:scale-[1.025] ${service.imageClassName ?? ''}`}
                        />
                        <div className={`absolute inset-0 ${service.overlayClassName ?? 'bg-teal-dark/45'}`} />
                        <div className="absolute left-4 top-4 text-xs font-semibold uppercase tracking-[0.11em] text-gold-light">
                          {service.cue}
                        </div>
                      </div>

                      <div className="flex flex-col justify-center p-5">
                        <div>
                          <div className="mb-4 flex size-11 items-center justify-center text-copper transition-colors duration-300 group-hover:text-clay">
                            <service.icon className="size-5" />
                          </div>
                          <h3 className="mb-2 text-lg font-bold leading-snug text-teal-dark">
                            {service.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-text-medium">
                            {service.description}
                          </p>
                        </div>
                        <span className="mt-4 inline-flex min-h-11 items-center text-sm font-bold text-copper transition-colors duration-200 group-hover:text-clay">
                          Ver estratégia
                          <ArrowRight className="size-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </a>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="mt-6 flex items-center justify-end gap-4">
              <div className="flex items-center gap-2" aria-hidden="true">
                {services.map((service, index) => (
                  <button
                    key={service.title}
                    type="button"
                    onClick={() => api?.scrollTo(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === current ? 'w-6 bg-copper' : 'w-2 bg-teal-dark/20 hover:bg-teal-dark/35'
                    }`}
                    tabIndex={-1}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <CarouselPrevious
                  variant="outline"
                  className="static size-10 translate-y-0 rounded-full border-warm-border text-teal-dark transition-colors hover:border-copper/35 hover:bg-copper/10 hover:text-clay disabled:opacity-40"
                >
                  <span className="sr-only">Anterior</span>
                </CarouselPrevious>
                <CarouselNext
                  variant="outline"
                  className="static size-10 translate-y-0 rounded-full border-warm-border text-teal-dark transition-colors hover:border-copper/35 hover:bg-copper/10 hover:text-clay disabled:opacity-40"
                >
                  <span className="sr-only">Próximo</span>
                </CarouselNext>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
