'use client'

import Image from 'next/image'
import { ArrowRight, Check, FileCheck2, FileSearch, Handshake, Scale, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import StepLeadForm from '@/components/cbm/StepLeadForm'
import SectionHeading from '@/components/cbm/SectionHeading'
import Footer from '@/components/cbm/Footer'

const reviewPoints = [
  {
    icon: FileSearch,
    title: 'Cláusulas e obrigações',
    description: 'Lemos prazos, índices, multas e deveres para identificar pontos que precisam de ajuste antes da assinatura.',
  },
  {
    icon: ShieldCheck,
    title: 'Garantias e patrimônio',
    description: 'Verificamos quais bens respondem pela obrigação e se a garantia exigida é proporcional ao negócio.',
  },
  {
    icon: Scale,
    title: 'Risco jurídico',
    description: 'Avaliamos inadimplemento, vencimento antecipado e consequências práticas de cada compromisso assumido.',
  },
  {
    icon: Handshake,
    title: 'Negociação e elaboração',
    description: 'Estruturamos termos claros para relações com bancos, fornecedores, parceiros e arrendadores.',
  },
]

export default function AnaliseContratoContent() {
  const scrollToForm = () => document.getElementById('lp-form')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <section className="relative min-h-[68vh] overflow-hidden bg-gradient-teal">
        <Image
          src="/images/services/renegociacao-dividas.webp"
          alt="Análise de documentos e obrigações financeiras de um contrato rural"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-24"
        />
        <div className="absolute inset-0 hero-command-overlay" />
        <div className="absolute inset-0 field-grid opacity-10" />

        <div className="relative z-10 mx-auto flex min-h-[68vh] w-full max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-4xl animate-fade-up">
            <p className="mb-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
              <FileCheck2 className="size-4" />
              Segurança antes da assinatura
            </p>

            <h1 className="mb-6 text-4xl font-bold leading-[1.06] text-warm-white sm:text-5xl lg:text-6xl">
              Contrato não é formalidade.{' '}
              <span className="text-gold-light">É onde o risco e a proteção da operação são definidos.</span>
            </h1>

            <p className="mb-8 max-w-3xl text-lg leading-relaxed text-warm-white/72 sm:text-xl">
              Antes de assumir juros, garantias, multas ou compromissos de longo prazo, a CBM analisa os termos do negócio e estrutura contratos compatíveis com a realidade da atividade rural.
            </p>

            <ul className="mb-9 space-y-3">
              {[
                'Revisão de contratos bancários, de barter e arrendamento, além de contratos de compra e venda e fornecimento',
                'Análise de garantias, responsabilidades e hipóteses de vencimento antecipado',
                'Elaboração de instrumentos claros para reduzir disputas e incertezas',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-warm-white/82">
                  <Check className="mt-0.5 size-5 shrink-0 text-gold-light" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={scrollToForm}
              size="lg"
              className="group min-h-14 rounded-xl bg-copper px-8 text-base font-semibold text-warm-white shadow-lg shadow-copper/15 transition-all duration-300 hover:bg-clay hover:shadow-clay/15"
            >
              Solicitar análise de contrato
              <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-warm-white/45" />
      </section>

      <section className="legal-paper py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Leitura técnica antes de assinar"
            title="O contrato precisa proteger a produção, não criar uma armadilha para o futuro"
            description="Cada cláusula pode afetar o caixa, a liberdade de negociação e até os bens dados em garantia. A análise jurídica coloca essas consequências em linguagem clara antes da decisão."
            className="mb-14"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reviewPoints.map((item) => (
              <Card key={item.title} className="rounded-2xl border-warm-border bg-warm-white transition-all duration-300 hover:-translate-y-0.5 hover:border-copper/25 hover:shadow-lg hover:shadow-copper/10">
                <CardContent className="p-6">
                  <div className="mb-4 flex size-12 items-center justify-center text-copper">
                    <item.icon className="size-6" />
                  </div>
                  <h2 className="mb-2 text-base font-bold text-teal-dark">{item.title}</h2>
                  <p className="text-sm leading-relaxed text-text-medium">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-20 sm:py-28" aria-label="Formulário para análise de contrato">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.84fr_1.16fr] lg:items-start lg:px-8">
          <div className="lg:pt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-copper">Próximo passo</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-teal-dark sm:text-4xl">
              Envie seus dados para iniciarmos a leitura do seu caso
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-text-medium">
              Nossa equipe fará o primeiro contato em horário comercial para entender o contrato, o momento da negociação e os documentos relevantes para a análise.
            </p>
          </div>

          <StepLeadForm
            formId="lp_analise_contrato"
            source="lp_analise_contrato"
            title="Solicite a análise do seu contrato"
            description="Preencha os dados abaixo. O retorno é sigiloso e sem compromisso."
            defaultCaseType="analise_contrato"
            className="shadow-teal-dark/5"
          />
        </div>
      </section>

      <Footer />
    </>
  )
}
