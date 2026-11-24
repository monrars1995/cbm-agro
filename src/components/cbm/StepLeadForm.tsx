'use client'

import { useRef, useState } from 'react'
import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { type CaseType, type LeadFormId, normalizeBrazilianPhone, states } from '@/lib/lead'
import {
  trackLeadFormStarted,
  trackLeadFormSubmitted,
  trackLeadFormSubmitFailed,
} from '@/lib/dataLayer'

interface StepLeadFormProps {
  formId: LeadFormId
  source: string
  title: string
  description: string
  defaultCaseType: CaseType
  redirectTo?: string
  urgent?: boolean
  className?: string
}

interface LeadFormData {
  name: string
  email: string
  phone: string
  ruralProducer: string
  debtRange: string
  propertyState: string
}

const GHL_TRACKING = {
  trackingId: 'tk_6f8871daef734cc3b8e3ccecea12b6dd',
  locationId: 'NoHjXMKNvasUNgguYqhh',
  projectId: '1790182885978653784',
  formName: 'Formulário de Leads CBM',
  customFields: {
    debtRange: 'kgJV4ulrSJLLki9eH9l1',
    propertyState: '4LFe0lPTzzj3XkuTS2Bi',
    ruralProducer: 'zB12eaIClu5JyBm8sJkL',
  },
} as const

const debtRangeOptions = [
  'Até R$ 200 mil',
  'De R$ 200 mil a R$ 1 milhão',
  'De R$ 1 milhão a R$ 5 milhões',
  'Acima de R$ 5 milhões',
] as const

const inputClass = 'h-12 border-warm-border bg-warm-white text-base focus:border-copper focus-visible:ring-copper/25'
const selectClass = 'flex h-12 w-full rounded-xl border border-warm-border bg-warm-white px-3 text-base text-text-dark shadow-inner shadow-teal/5 transition-colors focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20'

function makeSessionId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now())
}

export default function StepLeadForm({
  formId,
  source,
  title,
  description,
  defaultCaseType,
  urgent = false,
  className,
}: StepLeadFormProps) {
  const startedRef = useRef(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [data, setData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    ruralProducer: '',
    debtRange: '',
    propertyState: '',
  })

  const markStarted = () => {
    if (startedRef.current) return
    startedRef.current = true

    trackLeadFormStarted({
      form_id: formId,
      source,
      case_type: defaultCaseType,
      page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
    })
  }

  const updateData = <Key extends keyof LeadFormData>(key: Key, value: LeadFormData[Key]) => {
    markStarted()
    setData((current) => ({ ...current, [key]: value }))
    setErrorMessage('')
    if (status !== 'idle') setStatus('idle')
  }

  const submitLead = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    markStarted()

    const phone = normalizeBrazilianPhone(data.phone)

    if (!phone) {
      setStatus('error')
      setErrorMessage('Informe um telefone com DDD válido.')
      trackLeadFormSubmitFailed({ form_id: formId, source, case_type: defaultCaseType, error_type: 'invalid_phone' })
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    const formData = {
      first_name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      [GHL_TRACKING.customFields.debtRange]: data.debtRange,
      [GHL_TRACKING.customFields.propertyState]: data.propertyState,
      [GHL_TRACKING.customFields.ruralProducer]: data.ruralProducer,
    }

    const formLabels = {
      first_name: 'Nome completo',
      email: 'E-mail',
      phone: 'Telefone',
      [GHL_TRACKING.customFields.debtRange]: 'Qual o valor aproximado da dívida?',
      [GHL_TRACKING.customFields.propertyState]: 'Estado da propriedade',
      [GHL_TRACKING.customFields.ruralProducer]: 'Você é produtor rural?',
    }

    const eventPayload = {
      type: 'external_form_submission',
      timestamp: Date.now(),
      formId: 'cbm-lead-form',
      formData,
      formLabels,
      url: window.location.href,
      title: document.title,
      path: window.location.pathname,
      userAgent: navigator.userAgent,
      trackingId: GHL_TRACKING.trackingId,
      locationId: GHL_TRACKING.locationId,
      projectId: GHL_TRACKING.projectId,
      sessionId: makeSessionId(),
      properties: {
        deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        source,
        projectId: GHL_TRACKING.projectId,
        formName: GHL_TRACKING.formName,
        caseType: defaultCaseType,
        urgent,
      },
    }

    const requestBody = new FormData()
    requestBody.append('event', JSON.stringify(eventPayload))

    try {
      const response = await fetch('https://backend.leadconnectorhq.com/external-tracking/events', {
        method: 'POST',
        headers: { version: '2021-07-28' },
        body: requestBody,
      })

      if (!response.ok) throw new Error('O CRM não confirmou o recebimento dos dados.')

      trackLeadFormSubmitted({
        form_id: formId,
        source,
        case_type: defaultCaseType,
        debt_range: data.debtRange,
        property_state: data.propertyState,
        page_path: window.location.pathname,
      }, {
        email: data.email.trim(),
        phone,
      })
      setStatus('success')
      setData({ name: '', email: '', phone: '', ruralProducer: '', debtRange: '', propertyState: '' })
    } catch (error) {
      trackLeadFormSubmitFailed({ form_id: formId, source, case_type: defaultCaseType, error_type: 'crm_request_failed' })
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Não foi possível enviar seus dados. Tente novamente.')
    }
  }

  return (
    <div
      id="lp-form"
      className={cn(
        'relative overflow-hidden rounded-[1.75rem] border border-copper/25 bg-warm-white p-5 shadow-2xl shadow-teal-dark/20 ring-1 ring-warm-white/70 sm:p-7',
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-copper" />

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold leading-tight text-teal-dark">{title}</h2>
          <p className="mt-2 text-base leading-relaxed text-text-medium">{description}</p>
        </div>
        <ShieldCheck className="mt-1 hidden size-6 shrink-0 text-copper sm:block" aria-hidden="true" />
      </div>

      <form className="mt-6 space-y-4" onSubmit={submitLead}>
        <div>
          <label htmlFor={`${formId}-name`} className="mb-1.5 block text-sm font-semibold text-teal-dark">
            Nome completo
          </label>
          <Input
            id={`${formId}-name`}
            name="first_name"
            value={data.name}
            onChange={(event) => updateData('name', event.target.value)}
            placeholder="Seu nome"
            autoComplete="name"
            minLength={2}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-email`} className="mb-1.5 block text-sm font-semibold text-teal-dark">
            E-mail
          </label>
          <Input
            id={`${formId}-email`}
            name="email"
            value={data.email}
            onChange={(event) => updateData('email', event.target.value)}
            type="email"
            placeholder="voce@email.com"
            autoComplete="email"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-phone`} className="mb-1.5 block text-sm font-semibold text-teal-dark">
            Telefone
          </label>
          <Input
            id={`${formId}-phone`}
            name="phone"
            value={data.phone}
            onChange={(event) => updateData('phone', event.target.value)}
            type="tel"
            placeholder="(11) 99999-9999"
            autoComplete="tel"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-rural-producer`} className="mb-1.5 block text-sm font-semibold text-teal-dark">
            Você é produtor rural?
          </label>
          <select
            id={`${formId}-rural-producer`}
            name="produtorRural"
            value={data.ruralProducer}
            onChange={(event) => updateData('ruralProducer', event.target.value)}
            required
            className={selectClass}
          >
            <option value="">Selecione uma opção</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
        </div>

        <div>
          <label htmlFor={`${formId}-debt-range`} className="mb-1.5 block text-sm font-semibold text-teal-dark">
            Qual o valor aproximado da dívida?
          </label>
          <select
            id={`${formId}-debt-range`}
            name="faixaValorRisco"
            value={data.debtRange}
            onChange={(event) => updateData('debtRange', event.target.value)}
            required
            className={selectClass}
          >
            <option value="">Selecione o valor</option>
            {debtRangeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor={`${formId}-property-state`} className="mb-1.5 block text-sm font-semibold text-teal-dark">
            Estado da propriedade
          </label>
          <select
            id={`${formId}-property-state`}
            name="estadoPropriedade"
            value={data.propertyState}
            onChange={(event) => updateData('propertyState', event.target.value)}
            required
            className={selectClass}
          >
            <option value="">Selecione o estado</option>
            {states.map((state) => <option key={state} value={state}>{state}</option>)}
          </select>
        </div>

        <div aria-live="polite" className="min-h-5">
          {status === 'error' && errorMessage && (
            <p role="alert" className="text-sm font-medium text-clay">{errorMessage}</p>
          )}
          {status === 'success' && (
            <p className="flex items-center gap-2 text-sm font-medium text-teal-dark">
              <CheckCircle2 className="size-5 text-teal" aria-hidden="true" />
              Recebemos seu contato! Em breve retornaremos.
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={status === 'submitting'}
          className="min-h-12 w-full rounded-xl bg-copper px-5 text-base font-semibold text-warm-white shadow-lg shadow-copper/15 transition-all duration-200 hover:bg-clay"
        >
          {status === 'submitting' ? (
            <><Loader2 className="mr-2 size-5 animate-spin" /> Enviando...</>
          ) : 'Enviar solicitação'}
        </Button>

        <p className="text-center text-xs leading-relaxed text-text-light">
          Seus dados estão seguros e serão usados apenas para contato.
        </p>
      </form>
    </div>
  )
}
