'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'
import SectionHeading from './SectionHeading'
import StepLeadForm from './StepLeadForm'
import { NAP } from '@/lib/site'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Endereço',
    lines: [
      'Av. Getúlio Vargas, 3233',
      'Edf Trade Center, Sala 401 e 402',
      `${NAP.neighborhood}, ${NAP.city} - ${NAP.region}`,
      `CEP: ${NAP.postalCode}`,
    ],
  },
  {
    icon: Clock,
    title: 'Horário de Atendimento',
    lines: ['Segunda a Sexta: 8h às 18h', 'Sábado: 8h às 12h'],
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contato" className="legal-paper py-20 sm:py-28" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <SectionHeading
            eyebrow="Análise inicial"
            title="Conte o que está em risco antes de negociar com o banco"
            description="A consulta inicial é direta: entendemos o prazo, o contrato e o patrimônio envolvido para indicar o próximo passo jurídico."
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5 lg:col-span-2"
          >
            {contactInfo.map((item) => (
              <div key={item.title} className="flex gap-4 rounded-2xl border border-warm-border bg-warm-white p-4 shadow-sm shadow-teal-dark/5">
                <div className="flex size-11 shrink-0 items-center justify-center text-copper">
                  <item.icon className="size-5" />
                </div>
                <div>
                  <h3 className="mb-1 font-bold text-teal-dark">{item.title}</h3>
                  {item.lines.map((line, i) => (
                    <p key={i} className="text-sm text-text-medium">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <StepLeadForm
              formId="home_contact"
              source="home_contact"
              title="Receber análise da equipe"
              description="Responda em poucos passos. O retorno acontece em horário comercial, com sigilo profissional."
              defaultCaseType="renegociacao"
              className="p-6 shadow-teal-dark/5 sm:p-8"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
