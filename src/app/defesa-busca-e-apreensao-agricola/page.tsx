import type { Metadata } from 'next'
import BuscaApreensaoContent from './BuscaApreensaoContent'

export const metadata: Metadata = {
  title: 'Defesa contra Busca e Apreensão Agrícola',
  description: 'Atuação emergencial para proteger máquinas, veículos e bens essenciais contra busca e apreensão.',
}

export default function DefesaBuscaApreensaoAgricolaPage() {
  return <BuscaApreensaoContent />
}
