'use client'

import Image from 'next/image'
import { Check, ArrowRight, AlertTriangle, Shield, Clock, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import StepLeadForm from '@/components/cbm/StepLeadForm'
import SectionHeading from '@/components/cbm/SectionHeading'

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
                Prazos de 5 e 15 dias após a liminar
              </p>

              <h1 className="mb-6 text-4xl font-bold leading-[1.06] text-warm-white sm:text-5xl lg:text-5xl">
                Busca e apreensão de máquinas agrícolas:{' '}
                <span className="text-gold-light">o que fazer quando o mandado chega.</span>
              </h1>

              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-warm-white/72">
                Tratores, colheitadeiras e implementos financiados com alienação fiduciária podem ser retirados por decisão liminar. Depois disso, os prazos para pagar ou contestar são curtos e precisam ser acompanhados de perto.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Conferência da notificação e da comprovação da mora',
                  'Análise dos valores cobrados para a restituição do bem',
                  'Contestação dentro do prazo legal',
                  'Avaliação de bens essenciais em caso de recuperação judicial',
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
                title="Análise de busca e apreensão"
                description="Envie os dados do caso. A equipe avalia o contrato, a notificação recebida e as medidas cabíveis no prazo."
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
            title="Os prazos começam a correr quando a liminar é cumprida"
            description="Pelo Decreto-Lei nº 911/1969, o devedor tem 5 dias para pagar a dívida pendente e pedir o bem de volta e 15 dias para apresentar a contestação."
            className="mb-14"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck, day: 'Dia 0', title: 'Liminar cumprida', desc: 'O oficial de justiça retira o bem, que fica com o credor ou com um depositário indicado por ele.' },
              { icon: Clock, day: 'Até 5 dias', title: 'Pagamento e restituição', desc: 'O pagamento da integralidade da dívida pendente, conforme os valores do credor, permite pedir o bem de volta (art. 3º, § 2º).' },
              { icon: Shield, day: 'Até 15 dias', title: 'Contestação', desc: 'Prazo para a resposta do devedor, que pode discutir a mora, a notificação e os valores cobrados (art. 3º, § 3º).' },
              { icon: AlertTriangle, day: 'Depois do 5º dia', title: 'Consolidação da propriedade', desc: 'Sem pagamento, a propriedade se consolida com o credor, que pode vender o bem. A contestação segue em discussão.' },
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
          <p className="text-clay text-sm font-semibold uppercase tracking-[0.11em] mb-3">Prazos curtos</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-teal-dark mb-4">
            Recebeu notificação ou mandado? Reúna os documentos
          </h2>
          <p className="text-text-medium mb-8 max-w-2xl mx-auto leading-relaxed">
            Contrato, notificação e mandado permitem verificar a regularidade do pedido e os valores cobrados. Quanto antes a análise começar, mais opções ficam disponíveis dentro dos prazos.
          </p>
          <Button
            onClick={() => document.getElementById('lp-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="group rounded-xl bg-clay px-10 py-6 text-base font-semibold text-warm-white transition-all duration-300 hover:bg-copper hover:shadow-lg hover:shadow-clay/15"
          >
            Solicitar análise do caso
            <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

    </>
  )
}
