'use client'

import Image from 'next/image'
import { Check, ArrowRight, Landmark, Shield, FileText, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import StepLeadForm from '@/components/cbm/StepLeadForm'
import SectionHeading from '@/components/cbm/SectionHeading'

export default function PlanejamentoPatrimonialContent() {
  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden bg-gradient-teal">
        <Image
          src="/images/services/patrimonial.webp"
          alt="Estruturação jurídica de patrimônio rural e sucessão familiar"
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
                <Shield className="size-4" />
                Proteção de longo prazo
              </p>

              <h1 className="mb-6 text-4xl font-bold leading-[1.06] text-warm-white sm:text-5xl lg:text-5xl">
                Holding rural e planejamento patrimonial{' '}
                <span className="text-gold-light">para organizar bens, garantias e sucessão da família.</span>
              </h1>

              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-warm-white/72">
                A organização jurídica dos bens, a revisão das garantias prestadas e a sucessão planejada reduzem disputas e dão previsibilidade à continuidade da fazenda entre gerações.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Estruturação de holding rural e separação entre atividade e patrimônio',
                  'Revisão de contratos, garantias e cláusulas de risco antes de assinar',
                  'Planejamento sucessório para continuidade da fazenda na família',
                  'Proteção contra penhoras, disputas societárias e cobranças futuras',
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
                formId="lp_planejamento_patrimonial"
                source="lp_planejamento_patrimonial"
                title="Diagnóstico de estrutura patrimonial"
                description="Avaliamos a organização atual dos bens, contratos e sucessão para identificar vulnerabilidades e propor a estrutura correta."
                defaultCaseType="planejamento_patrimonial"
                redirectTo="/obrigado-contato?src=patrimonial"
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
            eyebrow="O que coloca o patrimônio em risco"
            title="A desorganização jurídica expõe a fazenda, a família e o futuro da operação"
            description="A maioria das perdas patrimoniais não vem de processos em andamento, mas de estruturas que nunca foram revisadas antes do problema."
            className="mb-14"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: AlertTriangle, title: 'Contratos sem Revisão', desc: 'Cláusulas de garantia e juros em contratos antigos expõem terra e maquinário a cobranças desproporcionais.' },
              { icon: Landmark, title: 'Patrimônio Misto', desc: 'Bens pessoais e da atividade misturados numa mesma titularidade facilitam penhoras indiscriminadas.' },
              { icon: FileText, title: 'Sucessão sem Plano', desc: 'Sem estruturação, a transferência entre gerações trava a operação em inventários e disputas familiares.' },
              { icon: Shield, title: 'Vulnerabilidade Societária', desc: 'Sócios e administradores respondem com bens pessoais quando a estrutura não separa riscos da atividade.' },
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
          <p className="text-copper text-sm font-semibold uppercase tracking-[0.11em] mb-3">Invista antes do problema</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-teal-dark mb-4">
            O melhor momento para proteger o patrimônio é antes que ele esteja sob ameaça
          </h2>
          <p className="text-text-medium mb-8 max-w-2xl mx-auto leading-relaxed">
            O planejamento patrimonial é mais eficaz quando feito com antecedência e com as dívidas mapeadas. Transferências feitas depois de uma cobrança podem ser questionadas pelos credores.
          </p>
          <Button
            onClick={() => document.getElementById('lp-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="group rounded-xl bg-copper px-10 py-6 text-base font-semibold text-warm-white transition-all duration-300 hover:bg-clay hover:shadow-lg hover:shadow-clay/15"
          >
            Solicitar Diagnóstico Patrimonial
            <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

    </>
  )
}
