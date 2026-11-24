'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { trackSectionView } from '@/lib/dataLayer'

const ceo = {
  name: 'Dr. Igor Costa e Costa e Dr. Carlos Benjamim Morais',
  image: '/images/team/igor-benjamim-dark.png',
}

export default function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      trackSectionView('equipe')
    }
  }, [isInView])

  return (
    <section className="legal-paper py-20 sm:py-28" ref={ref} aria-label="Equipe CBM">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-copper text-sm font-medium uppercase tracking-widest mb-3">
            Conheça nossos sócios
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-teal-dark mb-4">
            Estratégia jurídica da negociação ao processo
          </h2>
          <p className="text-text-medium max-w-2xl mx-auto mt-4">
            Atuação técnica e próxima para orientar cada decisão do caso.
          </p>
          <div className="w-16 h-0.5 bg-copper/45 mx-auto rounded-full mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto w-full max-w-5xl"
        >
          <div className="flex flex-col items-center rounded-2xl border border-warm-border bg-warm-white p-6 text-center shadow-lg shadow-teal-dark/5 sm:p-10">
            <div className="relative aspect-[6/5] w-full max-w-4xl overflow-hidden rounded-2xl shadow-sm shadow-teal-dark/10 ring-1 ring-copper/20 ring-offset-4 ring-offset-warm-white transition-all duration-500 hover:scale-[1.01] hover:shadow-lg hover:shadow-copper/10">
              <Image
                src={ceo.image}
                alt={ceo.name}
                fill
                sizes="(min-width: 1024px) 896px, (min-width: 640px) 640px, calc(100vw - 64px)"
                className="object-cover"
              />
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-bold text-teal-dark">{ceo.name}</h3>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
