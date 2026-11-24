/** Perguntas frequentes da home. Usadas no FAQ visível e no FAQPage (JSON-LD), sempre com o mesmo texto. */
export const HOME_FAQ_ITEMS = [
  {
    question: 'O que é gestão de passivos?',
    answer:
      'Gestão de passivos é o processo estratégico de administrar, renegociar e reduzir dívidas, buscando condições mais favoráveis e protegendo o patrimônio do devedor por meio de soluções jurídicas especializadas.',
  },
  {
    question: 'Como a CBM ajuda produtores rurais?',
    answer:
      'A CBM oferece suporte jurídico completo para produtores rurais endividados, protegendo suas terras, equipamentos e meio de subsistência contra execuções judiciais e cobranças abusivas, além de renegociar dívidas agrícolas com condições favoráveis.',
  },
  {
    question: 'A CBM atende em todo o Brasil?',
    answer:
      'Sim, a CBM Agro e Gestão de Passivos atende em todo o território nacional, com escritório em Feira de Santana, Bahia, e capacidade de atuação remota para clientes de qualquer estado do Brasil.',
  },
  {
    question: 'Quais são os principais serviços da CBM?',
    answer:
      'Os principais serviços da CBM são: Defesa contra Cobrança e Execução Judicial, Renegociação e Redução de Dívidas, Defesa para Produtores Rurais Endividados, Defesa contra Busca e Apreensão de bens, Recuperação Judicial do Produtor Rural, Contencioso Tributário Rural e Planejamento e Defesa Patrimonial.',
  },
] as const

/** Nó FAQPage do JSON-LD da home, gerado a partir do mesmo texto exibido na página. */
export function createHomeFaqPageNode(siteUrl: string) {
  return {
    '@type': 'FAQPage',
    '@id': `${siteUrl}/#faq`,
    mainEntity: HOME_FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}
