'use client'

import Image from 'next/image'
import { Check, ArrowRight, AlertTriangle, Shield, Clock, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import StepLeadForm from '@/components/cbm/StepLeadForm'
import SectionHeading from '@/components/cbm/SectionHeading'
import Footer from '@/components/cbm/Footer'

export default function BuscaApreensaoContent() {
  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden bg-gradient-teal">
        <Image
          src="/images/services/busca-apreensao-veiculos.webp"
          alt="Procedimento de busca e apreensão de veículo"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-24"
        />
        <div className="absolute inset-0 hero-command-overlay" />
        <div className="absolute inset-0 field-grid opacity-10" />
        <div className="relative z-10 mx-auto flex min-h-[78vh] w-full max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="animate-fade-up">
              <p className="mb-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-warm-white">
                <AlertTriangle className="size-4" />
                Urgente: prazo de 5 dias
              </p>

              <h1 className="mb-6 text-4xl font-bold leading-[1.06] text-warm-white sm:text-5xl lg:text-5xl">
                Mandado contra o maquinário?{' '}
                <span className="text-gold-light">A resposta precisa ser imediata.</span>
              </h1>

              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-warm-white/72">
                O oficial pode estar a caminho. Você tem poucos dias para contestar, provar essencialidade e pedir suspensão antes que a safra pare.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Contestação imediata do mandado judicial',
                  'Pedido de liminar para suspender a apreensão',
                  'Comprovação de bens essenciais à atividade rural',
                  'Defesa contra cláusulas abusivas do contrato',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-warm-white/80">
                    <Check className="size-5 shrink-0 text-gold-light" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-fade-up delay-300">
              <StepLeadForm
                formId="lp_busca_apreensao"
                source="lp_busca_apreensao"
                title="Defesa urgente"
                description="Preencha e nossa equipe avalia o risco de apreensão, essencialidade do bem e medida cabível para suspender a retirada."
                defaultCaseType="busca_apreensao"
                redirectTo="/obrigado-contato?src=urgencia"
                urgent
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-warm-white/45" />
      </section>

      {/* ══════════ TIMELINE ══════════ */}
      <section className="legal-paper py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Linha do tempo"
            title="Cinco dias mudam o destino do maquinário"
            description="A defesa precisa chegar antes que a apreensão se consolide. O objetivo é preservar o bem essencial e manter a operação rural funcionando."
            className="mb-14"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Clock, day: 'Dia 1–2', title: 'Mandado Cumprido', desc: 'Oficial de justiça bate na porta da fazenda e pode retirar os bens imediatamente.' },
              { icon: Truck, day: 'Dia 3-4', title: 'Bens Removidos', desc: 'Tratores, colheitadeiras e implementos levados para depósito judicial, sua safra para.' },
              { icon: Shield, day: 'Dia 5', title: 'Prazo Final', desc: 'Último dia para apresentar contestação. Sem defesa, a apreensão se torna definitiva.' },
              { icon: AlertTriangle, day: 'Após Dia 5', title: 'Perda Definitiva', desc: 'Bens consolidados com o banco. Possibilidade de leilão e prejuízo irreversível.' },
            ].map((item, i) => (
              <Card key={item.day} className={`rounded-2xl border-warm-border bg-warm-white transition-all duration-500 hover:-translate-y-0.5 hover:border-clay/25 hover:shadow-lg hover:shadow-clay/10 animate-fade-up delay-${(i + 1) * 100}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex size-10 items-center justify-center text-clay">
                      <item.icon className="size-5" />
                    </div>
                    <span className="text-xs font-bold text-clay uppercase tracking-widest">{item.day}</span>
                  </div>
                  <h3 className="text-base font-bold text-teal-dark mb-2">{item.title}</h3>
                  <p className="text-text-medium text-sm leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="bg-warm-white py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-up">
          <p className="text-clay text-sm font-semibold uppercase tracking-[0.11em] mb-3">Não espere</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-teal-dark mb-4">
            Cada hora sem defesa aumenta o risco ao seu patrimônio
          </h2>
          <p className="text-text-medium mb-8 max-w-2xl mx-auto leading-relaxed">
            Nossa equipe especializada está de plantão para montar sua defesa imediata. Não deixe que a inércia leve seus bens.
          </p>
          <Button
            onClick={() => document.getElementById('lp-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="group rounded-xl bg-clay px-10 py-6 text-base font-semibold text-warm-white transition-all duration-300 hover:bg-copper hover:shadow-lg hover:shadow-clay/15"
          >
            Acionar Defesa Emergencial
            <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <Footer />
    </>
  )
}
