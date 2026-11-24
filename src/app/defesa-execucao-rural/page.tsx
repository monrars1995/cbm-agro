import type { Metadata } from 'next'
import ExecucaoContent from './ExecucaoContent'

export const metadata: Metadata = {
  title: 'Defesa em Execução Rural',
  description: 'Defesa contra cobrança judicial, penhora, bloqueio e leilão em execução de dívida rural.',
}

export default function DefesaExecucaoRuralPage() {
  return <ExecucaoContent />
}
