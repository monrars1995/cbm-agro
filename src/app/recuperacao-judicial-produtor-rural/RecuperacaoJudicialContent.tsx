'use client'

import Image from 'next/image'
import { Check, ArrowRight, Scale, Shield, FileText, Gavel, TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import StepLeadForm from '@/components/cbm/StepLeadForm'
import SectionHeading from '@/components/cbm/SectionHeading'
import Footer from '@/components/cbm/Footer'

export default function RecuperacaoJudicialContent() {
  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden bg-gradient-teal">
        <Image
          src="/images/services/recuperacao-judicial.webp"
          alt="Escritório jurídico estruturando plano de recuperação de dívida rural"
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
                <Scale className="size-4" />
                Reorganização com proteção da lei
              </p>

              <h1 className="mb-6 text-4xl font-bold leading-[1.06] text-warm-white sm:text-5xl lg:text-5xl">
                Recuperação judicial não é o fim.{' '}
                <span className="text-gold-light">É a ferramenta que reorganiza a dívida sem parar a produção.</span>
              </h1>

              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-warm-white/72">
                Quando a renegociação isolada já não resolve, a recuperação judicial suspende execuções e penhoras e abre um plano com prazos compatíveis com a realidade da safra.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Suspensão de execuções, penhoras e bloqueios em andamento',
                  'Plano de viabilidade com prazos compatíveis com o ciclo da safra',
                  'Equalização de credores bancários e fornecedores de insumos',
                  'Continuidade da atividade produtiva e das operações de crédito',
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
                formId="lp_recuperacao_judicial"
                source="lp_recuperacao_judicial"
                title="Análise de recuperação judicial"
                description="Avaliamos o passivo consolidado, a viabilidade do plano e a estratégia para reorganizar a dívida com proteção judicial."
                defaultCaseType="recuperacao_judicial"
                redirectTo="/obrigado-contato?src=recuperacao"
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
            eyebrow="Quando a dívida vira bola de neve"
            title="Sem um plano estruturado, cada credor avança sozinho contra o seu patrimônio"
            description="A recuperação judicial existe para substituir a corrida de execuções por uma reorganização ordenada da dívida, preservando a atividade."
            className="mb-14"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Gavel, title: 'Execuções em Cascata', desc: 'Bancos e fornecedores ajuizam cobranças simultâneas, impedindo qualquer negociação individual realista.' },
              { icon: Shield, title: 'Penhora Sobrepenhora', desc: 'Terra, maquinário e até contas da operação ficam travados ao mesmo tempo, paralisando a safra.' },
              { icon: TrendingDown, title: 'Juros Sem Controle', desc: 'Encargos moratórios e correções acumuladas multiplicam o passivo muito além do valor contratado.' },
              { icon: FileText, title: 'Insolvência Sem Plano', desc: 'Sem requisitos jurídicos organizados a tempo, a opção da recuperação se fecha e resta a liquidação.' },
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
          <p className="text-copper text-sm font-semibold uppercase tracking-[0.11em] mb-3">Decida com estratégia</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-teal-dark mb-4">
            Quanto mais cedo o diagnóstico, mais ferramentas o plano de recuperação preserva
          </h2>
          <p className="text-text-medium mb-8 max-w-2xl mx-auto leading-relaxed">
            A viabilidade da recuperação judicial depende do momento em que o pedido é requerido. Esperar a consolidação das execuções reduz drasticamente as opções de reorganização.
          </p>
          <Button
            onClick={() => document.getElementById('lp-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="group rounded-xl bg-copper px-10 py-6 text-base font-semibold text-warm-white transition-all duration-300 hover:bg-clay hover:shadow-lg hover:shadow-clay/15"
          >
            Solicitar Análise de Viabilidade
            <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <Footer />
    </>
  )
}
