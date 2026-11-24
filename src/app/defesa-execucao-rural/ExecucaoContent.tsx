'use client'

import Image from 'next/image'
import { Check, ArrowRight, Shield, AlertTriangle, Scale, FileText, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import StepLeadForm from '@/components/cbm/StepLeadForm'
import SectionHeading from '@/components/cbm/SectionHeading'

export default function ExecucaoContent() {
  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden bg-gradient-teal">
        <Image
          src="/images/hero-footer.webp"
          alt="Equipe jurídica analisando contratos rurais e defesa patrimonial"
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
              <p className="mb-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
                <AlertTriangle className="size-4" />
                Prazo de 15 dias úteis para embargos
              </p>

              <h1 className="mb-6 text-4xl font-bold leading-[1.06] text-warm-white sm:text-5xl lg:text-5xl">
                Defesa em execução de dívida rural{' '}
                <span className="text-gold-light">começa pelo contrato, pelo cálculo e pelos prazos.</span>
              </h1>

              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-warm-white/72">
                Cédulas e contratos de crédito rural podem conter encargos e cobranças que merecem revisão. A análise do título, da planilha do banco e do estágio do processo orienta a defesa antes que a penhora avance.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Revisão de juros, capitalização e multa cobrados',
                  'Conferência dos cálculos e valores apresentados pelo banco',
                  'Análise da penhora de máquinas e implementos',
                  'Proteção da pequena propriedade rural e do bem de família',
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
                formId="lp_execucao"
                source="lp_execucao"
                title="Defesa na execução rural"
                description="Avaliamos os vícios da cédula, o estágio do processo e a estratégia para conter penhora, bloqueio ou leilão."
                defaultCaseType="execucao_rural"
                redirectTo="/obrigado-contato?src=defesa"
                urgent
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-warm-white/45" />
      </section>

      {/* ══════════ RISCOS ══════════ */}
      <section className="legal-paper py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="O que acontece na execução"
            title="A execução avança em etapas: citação, bloqueio, penhora e leilão"
            description="Cada etapa tem prazos e medidas de defesa próprias. Entender em qual delas o processo está ajuda a priorizar o que fazer primeiro."
            className="mb-14"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Penhora de bens', desc: 'Tratores, colheitadeiras, implementos e imóveis podem ser penhorados se a dívida não for paga ou garantida no prazo.' },
              { icon: FileText, title: 'Bloqueio de contas', desc: 'O juiz pode determinar o bloqueio de valores em conta pelo Sisbajud, o que afeta o caixa da safra.' },
              { icon: Clock, title: 'Leilão judicial', desc: 'Bens penhorados podem ir a leilão. No segundo leilão, o lance mínimo pode ficar abaixo do valor de avaliação.' },
              { icon: Scale, title: 'Encargos em discussão', desc: 'Juros, capitalização e multa cobrados em desacordo com o contrato ou com as normas do crédito rural aumentam o saldo devedor.' },
            ].map((item, i) => (
              <Card key={item.title} className={`rounded-2xl border-warm-border bg-warm-white transition-all duration-500 hover:-translate-y-0.5 hover:border-copper/25 hover:shadow-lg hover:shadow-copper/10 animate-fade-up delay-${(i + 1) * 100}`}>
                <CardContent className="p-6">
                  <div className="mb-4 flex size-12 items-center justify-center text-copper">
                    <item.icon className="size-6" />
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
          <p className="text-copper text-sm font-semibold uppercase tracking-[0.11em] mb-3">Prazos processuais</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-teal-dark mb-4">
            Recebeu a citação? Leve o documento para análise
          </h2>
          <p className="text-text-medium mb-8 max-w-2xl mx-auto leading-relaxed">
            O prazo dos embargos é contado a partir da juntada da citação ao processo. Com a citação, o contrato e os extratos em mãos, é possível avaliar as medidas cabíveis dentro desse prazo.
          </p>
          <Button
            onClick={() => document.getElementById('lp-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="group rounded-xl bg-copper px-10 py-6 text-base font-semibold text-warm-white transition-all duration-300 hover:bg-clay hover:shadow-lg hover:shadow-clay/15"
          >
            Solicitar análise do caso
            <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

    </>
  )
}
