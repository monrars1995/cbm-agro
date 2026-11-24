'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, FileText, MapPinned, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackCTAClick, trackSectionView } from '@/lib/dataLayer'

const proofItems = [
  { icon: FileText, label: 'Contratos, cálculos e garantias analisados antes da tese' },
  { icon: MapPinned, label: 'Atendimento nacional com leitura do contexto rural local' },
  { icon: ShieldCheck, label: 'Equipe jurídica, não central genérica de triagem' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      trackSectionView('sobre')
    }
  }, [isInView])

  return (
    <section id="sobre" className="bg-warm-white py-20 sm:py-28" ref={ref} aria-label="Sobre a CBM">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-copper">
              Dossiê CBM
            </p>
            <h2 className="mb-6 text-3xl font-bold leading-[1.08] text-teal-dark sm:text-4xl lg:text-5xl">
              Autoridade jurídica para quem precisa manter a produção em movimento.
            </h2>

            <p className="mb-4 text-text-medium leading-relaxed">
              Há mais de uma década, a CBM defende quem produz quando o banco
              aperta. Não vendemos promessas: aplicamos a lei do crédito rural
              para reduzir dívidas, travar execuções e proteger patrimônio.
            </p>
            <p className="mb-4 text-text-medium leading-relaxed">
              Cada caso recebe estratégia sob medida: revisão contratual,
              alongamento, laudo de frustração de safra ou defesa em execução.
              Você fala com advogados, não com call center.
            </p>
            <p className="mb-8 text-text-medium leading-relaxed">
              Atendemos produtores em todo o Brasil, com equipe dedicada ao
              Direito Bancário e Agrário e histórico comprovado em gestão de
              passivos rurais.
            </p>

            <div className="mb-8 grid gap-3 sm:max-w-lg sm:mx-auto">
              {proofItems.map((item) => (
                <div key={item.label} className="grid grid-cols-[2.5rem_1fr] items-center gap-3 rounded-2xl border border-warm-border bg-paper p-3">
                  <div className="flex size-10 items-center justify-center text-copper">
                    <item.icon className="size-5" />
                  </div>
                  <p className="text-sm font-semibold leading-snug text-teal-dark">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <Button
              onClick={() => {
                trackCTAClick('Saiba mais', 'sobre')
                document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group rounded-xl bg-teal-dark px-6 py-3 font-semibold text-warm-white transition-all duration-200 hover:bg-teal"
            >
              Falar com especialista
              <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
