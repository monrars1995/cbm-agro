'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackCTAClick, trackSectionView } from '@/lib/dataLayer'

interface CTABannerProps {
  title: string
  description: string
  buttonText: string
  variant?: 'dark' | 'gold'
  sectionId?: string
}

export default function CTABanner({
  title,
  description,
  buttonText,
  variant = 'dark',
  sectionId,
}: CTABannerProps) {
  const isDark = variant === 'dark'

  useEffect(() => {
    if (sectionId) {
      trackSectionView(sectionId)
    }
  }, [sectionId])

  return (
    <section className="bg-paper-deep py-16 sm:py-20" aria-label={title}>
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className={`${isDark ? 'border border-teal/15 bg-warm-white' : 'border border-copper/15 bg-warm-white'} rounded-[1.75rem] p-7 shadow-lg shadow-teal-dark/5 sm:p-10`}>
            <h2 className="mx-auto mb-4 max-w-3xl text-2xl font-bold leading-tight text-teal-dark sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-text-medium">
              {description}
            </p>
          <Button
            size="lg"
            onClick={() => {
              trackCTAClick(buttonText, sectionId || 'cta_banner')
              document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className={`group h-auto w-full max-w-full justify-center rounded-xl px-4 py-4 text-sm font-semibold transition-all duration-200 hover:shadow-lg sm:w-auto sm:px-8 sm:py-6 sm:text-base ${
              isDark
                ? 'bg-copper text-warm-white hover:bg-clay hover:shadow-clay/15'
                : 'bg-teal-dark text-warm-white hover:bg-teal hover:shadow-teal/15'
            }`}
          >
            <Phone className="mr-2 size-5 shrink-0" />
            <span>{buttonText}</span>
            <ArrowRight className="ml-2 size-5 shrink-0 transition-transform group-hover:translate-x-1" />
          </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
