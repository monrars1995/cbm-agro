'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ShieldCheck } from 'lucide-react'
import { trackSectionView } from '@/lib/dataLayer'

const testimonials = [
  {
    name: 'Anderson',
    text: 'Dr. Carlos e sua equipe é a excelência de alta competência atencioso e passa total segurança e conhecimento focado na causa do problema. Eu super indico!!! Muito obrigado!!!',
    stars: 5,
  },
  {
    name: 'Edinalva',
    text: 'A empresa foi bem atenciosa e esclarecedora... parabéns!',
    stars: 5,
  },
  {
    name: 'Enilda',
    text: 'Fui bem atendida, me deram informações certas, muito atenciosos. Agradeço por ter sido atendida.',
    stars: 5,
  },
]

export default function Testimonials() {
  useEffect(() => {
    trackSectionView('depoimentos')
  }, [])

  return (
    <section id="depoimentos" className="bg-warm-gray py-20 sm:py-28" aria-label="Depoimentos de clientes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
        >
          <div>
            <p className="mb-4 inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-copper">
              Prova social
            </p>
            <h2 className="text-3xl font-bold leading-[1.08] text-teal-dark sm:text-4xl lg:text-5xl">
              Quem já precisou de resposta rápida percebe a diferença.
            </h2>
          </div>
          <div className="border-t border-warm-border pt-5">
            <div className="flex items-center gap-3 text-copper">
              <ShieldCheck className="size-5" />
              <span className="text-xs font-bold uppercase tracking-[0.12em]">Atendimento validado</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-medium">
              Os relatos destacam o ponto que mais importa em crise: segurança para decidir com advogado no comando.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={index === 0 ? 'rounded-[1.5rem] border border-copper/20 bg-warm-white p-7 text-text-dark shadow-lg shadow-teal-dark/5' : 'rounded-[1.5rem] border border-warm-border bg-warm-white p-7 text-text-dark shadow-sm shadow-teal-dark/5'}
            >
              <Quote className="mb-6 size-10 text-copper/25" aria-hidden="true" />
              <div className="mb-6 flex gap-1" role="img" aria-label={`${testimonial.stars} de 5 estrelas`}>
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <Star key={i} className="size-5 fill-gold text-gold" />
                ))}
              </div>
              <p className="mb-8 text-lg leading-relaxed text-text-dark">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className={index === 0 ? 'flex size-12 items-center justify-center text-copper' : 'flex size-12 items-center justify-center text-teal-dark'}>
                  <span className="text-lg font-bold">{testimonial.name.charAt(0)}</span>
                </div>
                <span className="text-lg font-bold text-teal-dark">
                  {testimonial.name}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
