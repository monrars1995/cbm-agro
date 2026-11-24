'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { trackSectionView } from '@/lib/dataLayer'

function AnimatedCounter({
  value,
  suffix,
  prefix = '',
  isInView,
  formatNumber,
}: {
  value: number
  suffix: string
  prefix?: string
  isInView: boolean
  formatNumber: (n: number) => string
}) {
  const [count, setCount] = useState(0)
  const duration = 2000
  const steps = 60
  const stepDuration = duration / steps

  useEffect(() => {
    if (!isInView) return
    let current = 0
    const increment = value / steps
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)
    return () => clearInterval(timer)
  }, [isInView, value, stepDuration])

  return (
    <span className="text-3xl font-bold tabular-nums text-teal-dark sm:text-4xl lg:text-5xl">
      {prefix}{formatNumber(count)}{suffix}
    </span>
  )
}

function StatItem({
  value,
  suffix,
  label,
  prefix = '',
  isInView,
  formatNumber,
}: {
  value: number
  suffix: string
  label: string
  prefix?: string
  isInView: boolean
  formatNumber: (n: number) => string
}) {
  return (
    <div className="flex flex-col items-center text-center px-4">
      <AnimatedCounter value={value} suffix={suffix} prefix={prefix} isInView={isInView} formatNumber={formatNumber} />
      <p className="mt-2 text-sm font-medium text-text-medium sm:text-base">{label}</p>
    </div>
  )
}

const stats = [
  {
    value: 180000000,
    suffix: '',
    prefix: '+',
    label: 'Em dívidas reduzidas',
    format: (n: number) => `R$ ${Math.floor(n / 1000000)}M`,
  },
  {
    value: 3000,
    suffix: '+',
    prefix: '',
    label: 'Clientes',
    format: (n: number) => n.toLocaleString('pt-BR'),
  },
  {
    value: 2500,
    suffix: '+',
    prefix: '',
    label: 'Processos Ativos',
    format: (n: number) => n.toLocaleString('pt-BR'),
  },
  {
    value: 30000,
    suffix: '+',
    prefix: '',
    label: 'Atendimentos',
    format: (n: number) => n.toLocaleString('pt-BR'),
  },
]

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      trackSectionView('numeros')
    }
  }, [isInView])

  return (
    <section className="relative overflow-hidden bg-warm-white py-16 sm:py-20" ref={ref} aria-label="Números e resultados">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="grid grid-cols-2 gap-8 rounded-[2rem] border border-warm-border bg-paper p-6 shadow-sm shadow-teal-dark/5 lg:grid-cols-4 lg:gap-0 lg:p-8">
          {stats.map((stat, index) => (
            <div key={stat.label} className="relative flex justify-center">
              <StatItem
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                label={stat.label}
                isInView={isInView}
                formatNumber={stat.format}
              />
              {/* Gold separator between stats on desktop */}
              {index < stats.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-warm-border lg:block" />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
