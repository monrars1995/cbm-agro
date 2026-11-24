// Gerado a partir de cluster-plan.json (etapa 3 do plano de SEO).
// Cada tema do blog tem um artigo pilar e uma página de serviço.
import type { ServiceSlug } from './services'

export interface BlogCluster {
  name: string
  service: ServiceSlug
  pillarSlug: string
}

export const BLOG_CLUSTERS = {
  'prorrogacao': { name: "Prorrogação e renegociação da dívida rural", service: 'alongamento-de-divida-rural', pillarSlug: 'prorrogacao-de-divida-rural' },
  'frustracao-safra': { name: "Frustração de safra", service: 'alongamento-de-divida-rural', pillarSlug: 'frustracao-de-safra' },
  'execucao': { name: "Execução de cédula de crédito rural", service: 'defesa-execucao-rural', pillarSlug: 'execucao-cedula-de-credito-rural' },
  'busca-apreensao': { name: "Busca e apreensão de máquinas", service: 'defesa-busca-e-apreensao-agricola', pillarSlug: 'alienacao-fiduciaria-maquinas-agricolas' },
  'recuperacao-judicial': { name: "Recuperação judicial do produtor rural", service: 'recuperacao-judicial-produtor-rural', pillarSlug: 'recuperacao-judicial-produtor-rural-pessoa-fisica' },
  'tributario': { name: "Tributação do produtor rural", service: 'contencioso-tributario-rural', pillarSlug: 'tributacao-produtor-rural-pessoa-fisica' },
  'contratos': { name: "Contratos agrários", service: 'analise-elaboracao-de-contrato', pillarSlug: 'contratos-agrarios' },
  'patrimonio': { name: "Patrimônio e sucessão rural", service: 'planejamento-defesa-patrimonial', pillarSlug: 'planejamento-sucessorio-rural' },
} as const satisfies Record<string, BlogCluster>

export type BlogClusterId = keyof typeof BLOG_CLUSTERS

export const BLOG_CLUSTER_IDS = Object.keys(BLOG_CLUSTERS) as [BlogClusterId, ...BlogClusterId[]]
