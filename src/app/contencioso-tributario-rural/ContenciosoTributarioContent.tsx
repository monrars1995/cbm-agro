'use client'

import Image from 'next/image'
import { Check, ArrowRight, ReceiptText, FileWarning, Landmark, AlertOctagon, Scale } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import StepLeadForm from '@/components/cbm/StepLeadForm'
import SectionHeading from '@/components/cbm/SectionHeading'

export default function ContenciosoTributarioContent() {
  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden bg-gradient-teal">
        <Image
          src="/images/services/tributario.webp"
          alt="Revisão de lançamentos fiscais e documentação tributária da atividade rural"
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
                Defesa tributária especializada
              </p>

              <h1 className="mb-6 text-4xl font-bold leading-[1.06] text-warm-white sm:text-5xl lg:text-5xl">
                Contencioso tributário rural:{' '}
                <span className="text-gold-light">defesa administrativa e judicial do produtor.</span>
              </h1>

              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-warm-white/72">
                Autuações de ITR, Funrural e imposto de renda da atividade rural têm prazos próprios de defesa. Quando não são discutidas a tempo, podem virar execução fiscal e afetar o caixa, as certidões e o acesso a crédito.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Revisão de autuações e lançamentos fiscais da atividade rural',
                  'Defesa administrativa: impugnação, manifestação de inconformidade e recursos',
                  'Contencioso judicial: anulatórias, embargos à execução fiscal e mandados de segurança',
                  'Busca do enquadramento tributário correto para produtor e cooperativa',
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
                formId="lp_contencioso_tributario"
                source="lp_contencioso_tributario"
                title="Diagnóstico do passivo tributário"
                description="Analisamos suas autuações, notificações fiscais e enquadramento tributário para definir a estratégia de defesa."
                defaultCaseType="contencioso_tributario"
                redirectTo="/obrigado-contato?src=tributario"
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
            eyebrow="Riscos acumulados"
            title="Cada ano sem revisão fiscal, o passivo tributário cresce invisível"
            description="Impostos sobre produção, terra e comercialização que não são contestados viram execução fiscal — e aí a margem da safra já está comprometida."
            className="mb-14"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FileWarning, title: 'Autuações Incorretas', desc: 'Lançamentos fiscais que não respeitam o regime do produtor rural, gerando cobranças indevidas acumuladas.' },
              { icon: AlertOctagon, title: 'Execução Fiscal', desc: 'Passivo não contestado vira dívida ativa. A Fazenda pública avança sobre contas e bens da operação.' },
              { icon: Landmark, title: 'Enquadramento Errado', desc: 'Produtor tributado como empresa comum em vez de aproveitar regimes próprios do agro, perdendo margem todo ano.' },
              { icon: ReceiptText, title: 'Crédito Bloqueado', desc: 'Certidões negativas e CNDs bloqueadas impedem acesso a crédito rural, travando o investimento na safra seguinte.' },
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
          <p className="text-copper text-sm font-semibold uppercase tracking-[0.11em] mb-3">Recupere o controle</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-teal-dark mb-4">
            Cada autuação tem prazo de defesa
          </h2>
          <p className="text-text-medium mb-8 max-w-2xl mx-auto leading-relaxed">
            No processo administrativo federal, a impugnação deve ser apresentada em 30 dias da ciência do lançamento. Um diagnóstico do passivo fiscal e do enquadramento da atividade mostra quais pontos podem ser discutidos.
          </p>
          <Button
            onClick={() => document.getElementById('lp-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="group rounded-xl bg-copper px-10 py-6 text-base font-semibold text-warm-white transition-all duration-300 hover:bg-clay hover:shadow-lg hover:shadow-clay/15"
          >
            Fazer Análise do Passivo Fiscal
            <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

    </>
  )
}
