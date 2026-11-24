'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, MessageCircle, ArrowRight, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { trackWhatsAppClick } from '@/lib/dataLayer'

function ObrigadoContentInner() {
  const searchParams = useSearchParams()
  const source = searchParams.get('src')
  const [leadData, setLeadData] = useState<{name?: string, debtRange?: string} | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    try {
      const stored = sessionStorage.getItem('cbm_agro_last_lead')
      if (stored) {
        window.setTimeout(() => setLeadData(JSON.parse(stored)), 0)
      }
    } catch {}
  }, [])

  let title = 'Seu pedido está com nossa equipe'
  let description =
    'Recebemos seus dados. Um especialista em Direito Agrário e Bancário vai analisar seu caso e retornar com o próximo passo, sem pressão comercial.'
  let isUrgent = false

  if (source === 'urgencia' || source === 'defesa') {
    title = 'Defesa prioritária em análise'
    description =
      'Classificamos seu caso como urgente. Estamos montando a estratégia para proteger seu patrimônio dentro dos prazos legais.'
    isUrgent = true
  }

  return (
    <section className="legal-paper relative flex min-h-[85vh] items-center justify-center px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl text-center animate-fade-up">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="relative flex size-24 items-center justify-center rounded-full border border-warm-border bg-warm-white shadow-lg">
              <CheckCircle2 className="size-12 text-copper" />
            </div>
          </div>
        </div>

        <h1 className="mb-6 text-3xl font-bold text-teal-dark sm:text-4xl lg:text-5xl">
          {leadData?.name ? `Obrigado, ${leadData.name.split(' ')[0]}!` : title}
        </h1>
        
        {leadData?.name && (
          <h2 className="mb-4 text-xl font-bold text-teal/80 sm:text-2xl">{title}</h2>
        )}

        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-text-medium">
          {description}
        </p>

        {isUrgent && (
          <div className="clay-alert mb-10 inline-block rounded-2xl border p-4">
            <p className="font-semibold">
              Casos com prazos curtos (busca e apreensão ou execução): retorno em até 30 minutos em horário comercial. Não assine nada com o banco até falar conosco.
            </p>
          </div>
        )}

        <div className="mx-auto mb-10 max-w-lg rounded-[1.75rem] border border-warm-border bg-warm-white p-8 shadow-lg shadow-teal-dark/5 sm:p-10">
          <h3 className="mb-4 text-xl font-bold text-teal-dark">Quer acelerar?</h3>
          <p className="mb-6 text-sm text-text-medium">
            Se preferir não esperar, fale agora no WhatsApp com a equipe de plantão.
          </p>
          
          <a 
            href="https://wa.me/557196772343?text=Ol%C3%A1%2C%20acabei%20de%20preencher%20o%20formul%C3%A1rio%20no%20site%20e%20gostaria%20de%20falar%20com%20um%20especialista."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('obrigado_page')}
            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-base font-semibold text-warm-white transition-all duration-300 hover:bg-[#20bd5a] hover:shadow-lg hover:shadow-[#25D366]/20"
          >
            <MessageCircle className="size-6" />
            Falar no WhatsApp Agora
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <Link href="/">
          <Button variant="ghost" className="text-teal-dark hover:bg-transparent hover:text-copper">
            <Home className="size-4 mr-2" />
            Voltar para a página inicial
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default function ObrigadoContent() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[85vh] items-center justify-center bg-warm-white">
        <div className="size-12 animate-pulse rounded-full bg-copper/15"></div>
      </div>
    }>
      <ObrigadoContentInner />
    </Suspense>
  )
}
