'use client'

import Image from 'next/image'
import { Check, ArrowRight, Shield, AlertTriangle, Scale, FileText, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import StepLeadForm from '@/components/cbm/StepLeadForm'
import SectionHeading from '@/components/cbm/SectionHeading'
import Footer from '@/components/cbm/Footer'

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
                Defesa Jurídica Urgente
              </p>

              <h1 className="mb-6 text-4xl font-bold leading-[1.06] text-warm-white sm:text-5xl lg:text-5xl">
                Execução rural não é sentença final.{' '}
                <span className="text-gold-light">É o início da defesa técnica.</span>
              </h1>

              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-warm-white/72">
                Muitas cédulas rurais carregam juros abusivos, cobranças indevidas e cláusulas que podem ser atacadas. A diferença está em agir antes da penhora avançar.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Revisão de juros e anatocismo (juros sobre juros)',
                  'Contestação de cálculos bancários e cobranças indevidas',
                  'Suspensão de penhora de maquinários essenciais',
                  'Proteção do bem de família e da sede da fazenda',
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
            eyebrow="Riscos reais"
            title="O processo avança em camadas: bloqueio, penhora, leilão e juros inflados"
            description="A defesa precisa organizar cálculo, contrato e urgência patrimonial. Esperar o banco aliviar a cobrança costuma piorar a posição do produtor."
            className="mb-14"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Penhora de Bens', desc: 'Tratores, colheitadeiras e implementos penhorados em dias, paralisando sua produção.' },
              { icon: FileText, title: 'Bloqueio de Contas', desc: 'Todo o dinheiro das vendas travado pelo BacenJud, asfixiando seu fluxo de caixa.' },
              { icon: Clock, title: 'Leilão Judicial', desc: 'Imóveis e máquinas levados a leilão por 50-60% do valor de mercado.' },
              { icon: Scale, title: 'Juros Abusivos', desc: 'Anatocismo e multa sobre multa inflam a dívida em até 300% do valor original.' },
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
          <p className="text-copper text-sm font-semibold uppercase tracking-[0.11em] mb-3">Aja antes do prazo</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-teal-dark mb-4">
            Quanto mais cedo você se defender, maior a chance de sucesso
          </h2>
          <p className="text-text-medium mb-8 max-w-2xl mx-auto leading-relaxed">
            Os prazos na execução são curtos e inadiáveis. A cada dia sem defesa técnica, novas penhoras podem ser deferidas e o prejuízo aumenta exponencialmente.
          </p>
          <Button
            onClick={() => document.getElementById('lp-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="group rounded-xl bg-copper px-10 py-6 text-base font-semibold text-warm-white transition-all duration-300 hover:bg-clay hover:shadow-lg hover:shadow-clay/15"
          >
            Quero Minha Defesa Agora
            <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <Footer />
    </>
  )
}
