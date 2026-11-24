'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { trackSectionView } from '@/lib/dataLayer'
import SectionHeading from './SectionHeading'
import { HOME_FAQ_ITEMS as faqItems } from '@/lib/home-faq'

export default function Faq() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      trackSectionView('faq')
    }
  }, [isInView])

  return (
    <section id="faq" className="bg-warm-gray py-20 sm:py-28" ref={ref} aria-label="Perguntas frequentes">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="Dúvidas comuns"
            title="Perguntas frequentes"
            description="Respostas diretas sobre gestão de passivos, defesa do produtor rural e como a CBM atua."
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 border-t border-warm-border"
        >
          {faqItems.map((item) => (
            <details key={item.question} className="group border-b border-warm-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base font-bold text-teal-dark transition-colors hover:text-copper [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  className="size-4 shrink-0 text-text-light transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-text-medium">{item.answer}</p>
            </details>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
