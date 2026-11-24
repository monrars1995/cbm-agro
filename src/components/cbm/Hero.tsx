'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock3, FileWarning, PhoneCall, ShieldCheck, Wheat } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { trackCTAClick, trackSectionView } from '@/lib/dataLayer'

export default function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    trackSectionView('hero')
  }, [])

  const defenseRoutes = [
    { label: 'Execução rural', note: 'Contestação e cálculo', href: '/defesa-execucao-rural' },
    { label: 'Alongamento', note: 'Safra frustrada', href: '/alongamento-de-divida-rural' },
    { label: 'Busca e apreensão', note: 'Máquina em risco', href: '/defesa-busca-e-apreensao-agricola' },
    { label: 'Recuperação Judicial', note: 'Dívida estruturada', href: '/recuperacao-judicial-produtor-rural' },
    { label: 'Contencioso Tributário', note: 'Passivo fiscal', href: '/contencioso-tributario-rural' },
    { label: 'Planejamento Patrimonial', note: 'Proteção de longo prazo', href: '/planejamento-defesa-patrimonial' },
    { label: 'Assessoria na elaboração e análise de contratos rurais', note: 'Cláusulas e garantias', href: '/analise-elaboracao-de-contrato' },
  ]

  const commandSteps = [
    { icon: Clock3, label: 'Prazo', text: 'Identificar vencimento, citação ou mandado.' },
    { icon: FileWarning, label: 'Contrato', text: 'Separar cédula, cálculo e garantias exigidas.' },
    { icon: Wheat, label: 'Safra', text: 'Provar impacto real na produção e no caixa.' },
    { icon: ShieldCheck, label: 'Medida', text: 'Escolher defesa, liminar ou negociação formal.' },
  ]

  return (
    <section id="inicio" className="relative min-h-[94svh] overflow-hidden" aria-label="Seção principal">
      <Image
        src="/images/hero-rural-producer.webp"
        alt="Produtor rural observando a lavoura ao pôr do sol"
        fill
        sizes="100vw"
        className="object-cover object-[64%_center] scale-[1.02]"
        priority
      />

      <div className="absolute inset-0 hero-command-overlay" />
      <div className="absolute inset-0 field-grid opacity-10" />

      <div className="relative z-10 mx-auto flex min-h-[94svh] w-full max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid w-full items-end gap-10 lg:grid-cols-[1fr_0.68fr]">
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold-light sm:text-sm"
            >
              <ShieldCheck className="size-4" />
              Sala de comando jurídico do produtor rural
            </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6 max-w-5xl text-[clamp(2.5rem,5.8vw,5.35rem)] font-bold leading-[1.02] text-warm-white"
          >
            Defenda terra, safra e maquinário{' '}
            <span className="text-gold-light">antes do banco avançar.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-9 max-w-2xl text-lg leading-relaxed text-warm-white/72 sm:text-xl"
          >
            A CBM organiza a defesa contra cobrança abusiva, execução de cédula rural,
            busca e apreensão de maquinário e renegociação imposta sob pressão.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button
              onClick={() => {
                trackCTAClick('Quero Meu Escudo Jurídico', 'hero', '#contato')
                handleScroll('#contato')
              }}
              size="lg"
              className="group min-h-14 rounded-xl bg-copper px-8 text-base font-semibold text-warm-white shadow-lg shadow-copper/15 transition-all duration-300 hover:bg-clay hover:shadow-clay/15"
            >
              Montar minha defesa
              <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <button
              type="button"
              onClick={() => {
                trackCTAClick('Nossos Serviços', 'hero', '#servicos')
                handleScroll('#servicos')
              }}
              className="inline-flex min-h-11 items-center justify-center rounded-xl px-2 text-base font-semibold text-gold-light transition-colors duration-200 hover:text-warm-white focus-visible:outline-copper"
            >
              Ver caminhos jurídicos
              <ArrowRight className="ml-2 size-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-10 grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-3"
          >
            {defenseRoutes.map((route, index) => (
              <a
                key={route.href}
                href={route.href}
                onClick={() => trackCTAClick(route.label, 'hero_route', route.href)}
                aria-label={`${route.label}: ${route.note}`}
                className="group grid min-h-[5.75rem] grid-cols-[2rem_1fr] gap-3 border-t border-warm-white/15 py-3.5 transition-colors duration-300 hover:border-gold/35"
              >
                <span className="pt-1 text-xs font-bold text-gold-light">
                  0{index + 1}
                </span>
                <span>
                  <span className="block text-sm font-bold text-warm-white">{route.label}</span>
                  <span className="mt-1 block text-xs text-warm-white/58">{route.note}</span>
                </span>
              </a>
            ))}
          </motion.div>
        </div>

          <motion.aside
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="hidden lg:block"
            aria-label="Prioridades de defesa"
          >
            <div className="relative border-y border-warm-white/15 py-6">
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-light">
                  Protocolo de resposta
                </p>
                <h2 className="mt-4 text-3xl font-bold leading-tight text-warm-white">
                  Quatro decisões antes da próxima cobrança.
                </h2>
              </div>
              <ol className="mt-7 space-y-3">
                {commandSteps.map((item) => (
                  <li key={item.label} className="grid grid-cols-[42px_1fr] gap-4 border-t border-warm-white/10 py-4 first:border-t-0 first:pt-0">
                    <div className="flex size-10 items-center justify-center text-gold-light">
                      <item.icon className="size-5" />
                    </div>
                    <div>
                      <p className="font-bold text-warm-white">{item.label}</p>
                      <p className="mt-1 text-sm leading-relaxed text-warm-white/62">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <a
                href="tel:+557196772343"
                onClick={() => trackCTAClick('Ligar para CBM', 'hero_panel', 'tel:+557196772343')}
                className="mt-5 inline-flex min-h-11 items-center rounded-full bg-gold/90 px-5 text-sm font-bold text-teal-dark transition-colors duration-200 hover:bg-gold-light"
              >
                <PhoneCall className="mr-2 size-4" />
                Ligar para a equipe
              </a>
            </div>
          </motion.aside>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-warm-white/45" />
    </section>
  )
}
