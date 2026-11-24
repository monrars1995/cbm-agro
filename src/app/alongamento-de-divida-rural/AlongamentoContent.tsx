'use client'

import Image from 'next/image'
import { Check, ArrowRight, Shield, FileText, Bell, Scale } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import StepLeadForm from '@/components/cbm/StepLeadForm'
import SectionHeading from '@/components/cbm/SectionHeading'

export default function AlongamentoContent() {
  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden bg-gradient-teal">
        <Image
          src="/images/hero-rural-producer.webp"
          alt="Produtor rural avaliando documentação de crédito no campo"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-28"
        />
        <div className="absolute inset-0 hero-command-overlay" />
        <div className="absolute inset-0 field-grid opacity-10" />
        <div className="relative z-10 mx-auto flex min-h-[78vh] w-full max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="animate-fade-up">
              <p className="mb-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
                <Scale className="size-4" />
                Súmula 298 do STJ
              </p>

              <h1 className="mb-6 text-4xl font-bold leading-[1.06] text-warm-white sm:text-5xl lg:text-5xl">
                Alongamento de dívida rural{' '}
                <span className="text-gold-light">é direito do produtor quando a lei prevê, não favor do banco.</span>
              </h1>

              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-warm-white/72">
                Se a safra foi frustrada por clima, pragas ou dificuldade de comercialização, o pedido de prorrogação deve ser feito por escrito, de preferência antes do vencimento, com laudo e proposta de pagamento compatível com a capacidade real.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Prorrogação com os encargos originalmente pactuados (MCR)',
                  'Pedido formal e documentado junto ao banco',
                  'Cronograma compatível com as próximas safras',
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
                formId="lp_alongamento"
                source="lp_alongamento"
                title="Análise de alongamento"
                description="Verificamos a viabilidade jurídica da prorrogação com base no contrato, na safra e no momento da dívida."
                defaultCaseType="alongamento_divida"
                redirectTo="/obrigado-contato?src=alongamento"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-warm-white/45" />
      </section>

      {/* ══════════ REQUIREMENTS ══════════ */}
      <section className="legal-paper py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Como funciona a lei"
            title="O pedido precisa chegar ao banco com prova, prazo e estratégia"
            description="A Súmula 298 do STJ reconhece o alongamento como direito do devedor. O ponto crítico é apresentar os pressupostos antes que o contrato vire inadimplência pura."
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                num: '01',
                icon: FileText,
                title: 'Laudo Técnico de Frustração de Safra',
                desc: 'Documento emitido por engenheiro agrônomo ou técnico habilitado comprovando que fatores climáticos (seca/excesso de chuva), pragas ou a quebra de preços do mercado inviabilizaram o pagamento original.',
              },
              {
                num: '02',
                icon: Shield,
                title: 'Capacidade de Pagamento Futuro',
                desc: 'Um estudo que demonstra como a sua operação vai se reestruturar nas próximas safras, comprovando que com o prazo e a carência solicitados a dívida será honrada sem comprometer seu sustento.',
              },
              {
                num: '03',
                icon: Bell,
                title: 'Notificação Formal Prévia',
                desc: 'O pedido de alongamento deve ser protocolado formalmente e por escrito junto ao banco antes do vencimento da parcela, apresentando o laudo técnico e a proposta de cronograma.',
              },
            ].map((step, i) => (
              <Card key={step.num} className={`rounded-2xl border-warm-border bg-warm-white transition-all duration-500 hover:-translate-y-0.5 hover:border-copper/25 hover:shadow-lg hover:shadow-copper/10 animate-fade-up delay-${(i + 1) * 200}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-copper/35">{step.num}</span>
                    <div className="flex size-10 items-center justify-center text-copper">
                      <step.icon className="size-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-teal-dark mb-3">{step.title}</h3>
                  <p className="text-text-medium text-sm leading-relaxed">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Urgency CTA */}
          <Card className="rounded-[1.75rem] border-copper/20 bg-transparent shadow-none">
            <CardContent className="p-8 sm:p-10 text-center">
              <h3 className="text-2xl font-bold text-teal-dark mb-4">
                Por que formalizar o pedido antes do vencimento?
              </h3>
              <p className="text-text-medium mb-4 max-w-3xl mx-auto leading-relaxed">
                Quando a dívida vence sem um pedido formal de prorrogação, o banco pode tratar a operação como inadimplida.
              </p>
              <p className="text-text-medium mb-8 max-w-3xl mx-auto leading-relaxed">
                A partir daí podem incidir encargos de mora, protesto da cédula e execução judicial. O pedido documentado antes do vencimento registra a situação do produtor e fundamenta a prorrogação.
              </p>
              <Button
                onClick={() => document.getElementById('lp-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="group rounded-xl bg-copper px-8 py-6 text-base font-semibold text-warm-white transition-all duration-300 hover:bg-clay hover:shadow-lg hover:shadow-clay/15"
              >
                Solicitar análise da cédula
                <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ══════════ AUTHORITY / BIO ══════════ */}
      <section className="bg-warm-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Photo */}
            <div className="lg:col-span-2 animate-fade-up">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-gold/15 ring-offset-6 ring-offset-warm-white border border-gold/20 hover:border-gold/40 shadow-lg shadow-teal-dark/10 transition-all duration-500">
                <Image
                  src="/images/dr-carlos.png"
                  alt="Dr. Carlos Benjamim"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Bio text */}
            <div className="lg:col-span-3 animate-fade-up delay-200">
              <p className="text-gold text-sm font-medium uppercase tracking-widest mb-3">
                Defesa Jurídica Especializada
              </p>
              <h3 className="text-3xl sm:text-4xl font-bold text-teal mb-6">
                Dr. Carlos Benjamim
              </h3>
              <p className="text-text-medium leading-relaxed mb-4">
                Advogado titular da CBM Advogados, o <strong className="text-teal">Dr. Carlos Benjamim</strong> atua na defesa de produtores rurais em contratos e operações de crédito rural.
              </p>
              <p className="text-text-medium leading-relaxed mb-8">
                A atuação parte de um princípio da legislação do crédito rural: o risco da atividade agrícola é reconhecido pela lei, que prevê instrumentos como a prorrogação de dívidas em caso de frustração de safra. A equipe atende produtores de todo o Brasil, com atendimento remoto e escritório em Feira de Santana (BA).
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { val: '+R$ 180M', label: 'Em Dívidas Reduzidas' },
                  { val: '+3.000', label: 'Clientes Atendidos' },
                  { val: '+2.500', label: 'Processos Ativos' },
                  { val: 'Brasil', label: 'Atuação Nacional' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-xl bg-warm-white border border-warm-border">
                    <div className="text-xl font-bold text-gold mb-1">{stat.val}</div>
                    <div className="text-xs text-text-light">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
