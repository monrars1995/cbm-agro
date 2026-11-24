'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { trackSectionView } from '@/lib/dataLayer'

const values = [
  {
    numeral: 'I.',
    title: 'Escuta de campo',
    description:
      'O caso começa pelo que mantém a fazenda viva: safra, caixa, maquinário, família e prazo real.',
  },
  {
    numeral: 'II.',
    title: 'Prova antes da tese',
    description:
      'Contrato, laudo, cálculo bancário e histórico da dívida orientam a estratégia antes de qualquer promessa.',
  },
  {
    numeral: 'III.',
    title: 'Prioridade processual',
    description:
      'Quando existe citação, mandado ou leilão, a equipe organiza a resposta pela urgência jurídica.',
  },
  {
    numeral: 'IV.',
    title: 'Negociação com lastro',
    description:
      'A conversa com banco precisa sair do favor informal e entrar em documentação, lei e capacidade de pagamento.',
  },
]

const differentials = [
  'Direito Bancário e Agrário no mesmo raciocínio',
  'Atuação nacional para produtores e empresas rurais',
  'Equipe com mais de 30 profissionais envolvidos na operação',
  'Plano de defesa ajustado ao estágio da cobrança',
]

export default function Values() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      trackSectionView('valores')
    }
  }, [isInView])

  return (
    <section className="bg-paper-deep py-20 sm:py-28" ref={ref} aria-label="Nossos valores e diferenciais">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold leading-[1.08] text-teal-dark sm:text-4xl lg:text-5xl">
            Clareza técnica, resposta rápida e defesa sem teatro jurídico
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-medium sm:text-lg">
            A experiência precisa ser firme e legível: o produtor entende o
            risco, sabe qual documento importa e fala com uma equipe que toma o
            caso como prioridade.
          </p>
        </motion.div>

        {/* Dossiê do método: quatro movimentos em sequência */}
        <ol className="grid grid-cols-1 gap-x-12 border-t border-teal-dark/15 lg:grid-cols-2">
          {values.map((value, index) => (
            <motion.li
              key={value.numeral}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * index }}
              className={`border-b border-teal-dark/15 py-7 ${index % 2 === 0 ? 'lg:pr-10' : 'lg:pl-10'}`}
            >
              <div className="grid grid-cols-[3rem_1fr] gap-x-4">
                <span
                  aria-hidden="true"
                  className="pt-1 text-sm font-bold tabular-nums text-copper"
                >
                  {value.numeral}
                </span>
                <div>
                  <h3 className="text-xl font-bold leading-snug text-teal-dark">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-medium">
                    {value.description}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>

        {/* Diferenciais */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <p className="mx-auto mt-8 flex w-fit items-center rounded-full border border-copper/30 bg-paper-deep px-4 py-2 text-center text-[11px] font-bold uppercase leading-none tracking-[0.18em] text-copper shadow-[0_2px_0_rgba(184,98,37,0.08)] sm:px-5 sm:text-xs">
            Por que escolher a CBM
          </p>
          <div className="mt-4 grid gap-x-12 gap-y-5 border-t border-copper/30 pt-8 sm:grid-cols-2">
            {differentials.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-copper" />
                <span className="text-sm font-medium leading-relaxed text-teal-dark">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
