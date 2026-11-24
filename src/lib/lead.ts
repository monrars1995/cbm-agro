export const LEAD_FORM_VARIANT = 'stepwise_v1' as const

export const leadFormIds = [
  'home_contact',
  'lp_execucao',
  'lp_alongamento',
  'lp_busca_apreensao',
  'lp_recuperacao_judicial',
  'lp_contencioso_tributario',
  'lp_planejamento_patrimonial',
  'lp_analise_contrato',
] as const

export type LeadFormId = (typeof leadFormIds)[number]

export const caseTypeOptions = [
  {
    value: 'execucao_rural',
    label: 'Execução rural',
    description: 'Cobrança judicial, penhora, leilão ou bloqueio.',
  },
  {
    value: 'alongamento_divida',
    label: 'Alongamento de dívida',
    description: 'Safra frustrada, vencimento próximo ou renegociação rural.',
  },
  {
    value: 'busca_apreensao',
    label: 'Busca e apreensão',
    description: 'Mandado, trator, colheitadeira ou bem essencial em risco.',
  },
  {
    value: 'recuperacao_judicial',
    label: 'Recuperação judicial rural',
    description: 'Dívidas que precisam de reorganização com proteção da lei.',
  },
  {
    value: 'contencioso_tributario',
    label: 'Contencioso tributário rural',
    description: 'Autuação fiscal, passivo tributário ou defesa administrativa.',
  },
  {
    value: 'planejamento_patrimonial',
    label: 'Planejamento patrimonial',
    description: 'Organização de bens, sucessão e proteção de longo prazo.',
  },
  {
    value: 'analise_contrato',
    label: 'Assessoria na elaboração e análise de contratos rurais',
    description: 'Revisão de cláusulas, garantias e riscos antes de assinar.',
  },
  {
    value: 'renegociacao',
    label: 'Renegociação bancária',
    description: 'Banco pressionando acordo, juros ou garantias.',
  },
  {
    value: 'outro',
    label: 'Outro caso rural',
    description: 'Ainda preciso entender a melhor frente jurídica.',
  },
] as const

export type CaseType = (typeof caseTypeOptions)[number]['value']

export const debtRangeOptions = [
  { value: 'ate_500k', label: 'Até R$ 500 mil' },
  { value: '500k_a_2m', label: 'R$ 500 mil a R$ 2 milhões' },
  { value: '2m_a_5m', label: 'R$ 2 milhões a R$ 5 milhões' },
  { value: 'mais_de_5m', label: 'Mais de R$ 5 milhões' },
] as const

export const urgencyOptions = [
  { value: 'imediata', label: 'Imediata', description: 'Existe citação, mandado, leilão ou prazo curto.' },
  { value: 'esta_semana', label: 'Esta semana', description: 'Preciso agir nos próximos dias.' },
  { value: 'sem_prazo', label: 'Sem prazo urgente', description: 'Quero organizar a estratégia antes de piorar.' },
  { value: 'nao_informado', label: 'Não sei informar', description: 'Preciso que a equipe avalie o risco.' },
] as const

export type Urgency = (typeof urgencyOptions)[number]['value']

export const states = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG',
  'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',
] as const

export type BrazilianState = (typeof states)[number]

export const stateNames: Record<BrazilianState, string> = {
  AC:'Acre',AL:'Alagoas',AP:'Amapá',AM:'Amazonas',BA:'Bahia',CE:'Ceará',
  DF:'Distrito Federal',ES:'Espírito Santo',GO:'Goiás',MA:'Maranhão',
  MT:'Mato Grosso',MS:'Mato Grosso do Sul',MG:'Minas Gerais',PA:'Pará',
  PB:'Paraíba',PR:'Paraná',PE:'Pernambuco',PI:'Piauí',RJ:'Rio de Janeiro',
  RN:'Rio Grande do Norte',RS:'Rio Grande do Sul',RO:'Rondônia',RR:'Roraima',
  SC:'Santa Catarina',SP:'São Paulo',SE:'Sergipe',TO:'Tocantins',
}

export interface LeadAttribution {
  campaign_source: string
  landing_page_url: string
  current_url: string
  referrer: string
  url_params: Record<string, string>
  utm: Record<string, string>
  click_ids: Record<string, string>
  sck: string | null
}

export interface LeadTechnicalContext {
  user_agent: string
  language: string
  timezone: string
  viewport: string
  consent_basis: 'lead_submit'
}

export interface LeadFormPayload {
  form: {
    id: LeadFormId
    variant: typeof LEAD_FORM_VARIANT
    source: string
    page_url: string
    page_path: string
  }
  contact: {
    name: string
    phone_raw: string
    email: string | null
  }
  qualification: {
    case_type: CaseType
    debt_range: string
    property_state: string
    urgency: Urgency
    message: string | null
  }
  attribution: LeadAttribution
  cookies: Record<string, string>
  technical: LeadTechnicalContext
}

export interface LeadSubmissionPayload extends LeadFormPayload {
  event: 'lead_submitted'
  lead_id: string
  submitted_at: string
  contact: LeadFormPayload['contact'] & {
    phone_normalized: string
  }
}

export function normalizeBrazilianPhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, '')

  if (digits.length === 10 || digits.length === 11) {
    return `+55${digits}`
  }

  if ((digits.length === 12 || digits.length === 13) && digits.startsWith('55')) {
    return `+${digits}`
  }

  return null
}
