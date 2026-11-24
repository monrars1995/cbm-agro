/**
 * Dados de SEO e conteúdo complementar das páginas de serviço (fundo de funil).
 *
 * Cada serviço tem um termo principal de busca, title/description próprios,
 * etapas de atuação, documentos para a análise, FAQ visível (que também vira
 * FAQPage no JSON-LD) e links internos para outros serviços e para o blog.
 *
 * Regras editoriais (YMYL e Provimento OAB 205/2021):
 * - tom informativo e técnico, sem promessa de resultado;
 * - toda afirmação jurídica com a norma ou súmula de referência;
 * - nada de urgência artificial, comparação com concorrentes ou oferta gratuita.
 */

export type ServiceSlug =
  | 'defesa-execucao-rural'
  | 'alongamento-de-divida-rural'
  | 'defesa-busca-e-apreensao-agricola'
  | 'recuperacao-judicial-produtor-rural'
  | 'contencioso-tributario-rural'
  | 'planejamento-defesa-patrimonial'
  | 'analise-elaboracao-de-contrato'

export interface ServiceFaqItem {
  question: string
  answer: string
}

export interface ServiceStep {
  title: string
  description: string
}

export interface ServiceSeo {
  slug: ServiceSlug
  /** Nome do serviço usado no breadcrumb, no schema e nos links internos. */
  name: string
  /** Termo principal que a página disputa no Google. */
  primaryKeyword: string
  /** Title completo (sem template), até ~60 caracteres. */
  title: string
  /** Meta description, até ~155 caracteres. */
  description: string
  /** Descrição curta do serviço para o schema e para os links internos. */
  summary: string
  steps: ServiceStep[]
  documents: string[]
  faq: ServiceFaqItem[]
  relatedServices: ServiceSlug[]
  /** Slugs de artigos do blog relacionados. Artigos inexistentes são ignorados. */
  relatedArticles: string[]
}

export const SERVICES: Record<ServiceSlug, ServiceSeo> = {
  'defesa-execucao-rural': {
    slug: 'defesa-execucao-rural',
    name: 'Defesa em Execução de Dívida Rural',
    primaryKeyword: 'execução de dívida rural',
    title: 'Defesa em Execução de Dívida Rural | CBM Agro',
    description:
      'Citado em execução de cédula rural? Veja o prazo dos embargos, os limites da penhora de terra e máquinas e como a defesa é estruturada.',
    summary:
      'Defesa do produtor rural em execuções de cédulas e contratos de crédito rural, com revisão do título, do cálculo e da penhora.',
    steps: [
      {
        title: 'Leitura da citação e dos prazos',
        description:
          'Identificamos o tipo de execução, a data em que o prazo começou a correr e o que já foi pedido pelo banco, como penhora ou bloqueio de contas.',
      },
      {
        title: 'Análise do título e do cálculo',
        description:
          'Cédula, aditivos, extratos e a planilha do banco são conferidos para verificar encargos, capitalização, multa e valores sem previsão no contrato.',
      },
      {
        title: 'Proteção do patrimônio produtivo',
        description:
          'Avaliamos impenhorabilidades, excesso de penhora e pedidos de substituição para preservar o que é necessário para continuar produzindo.',
      },
      {
        title: 'Defesa e negociação em paralelo',
        description:
          'Embargos à execução ou exceção de pré-executividade, quando cabível, e propostas de composição baseadas em números revisados.',
      },
    ],
    documents: [
      'Mandado ou carta de citação da execução',
      'Cédula de crédito rural e todos os aditivos',
      'Extratos e demonstrativos de débito enviados pelo banco',
      'Matrículas dos imóveis e documentos das máquinas penhoradas ou ameaçadas',
      'Comprovantes de perda de safra ou de queda de receita, se houver',
    ],
    faq: [
      {
        question: 'Qual é o prazo para se defender em uma execução de dívida rural?',
        answer:
          'Na execução de título extrajudicial, como a cédula de crédito rural, o prazo para opor embargos à execução é de 15 dias úteis, contados em regra da juntada aos autos do comprovante de citação (art. 915 do Código de Processo Civil). Como o prazo é curto, o ideal é levar a citação e o contrato para análise assim que forem recebidos.',
      },
      {
        question: 'É preciso oferecer bens em garantia para apresentar embargos?',
        answer:
          'Não. Desde o Código de Processo Civil de 2015, os embargos à execução podem ser apresentados sem penhora, depósito ou caução (art. 914). A garantia do juízo pode ser relevante, porém, para pedir que os embargos suspendam a execução (art. 919, § 1º).',
      },
      {
        question: 'A terra e as máquinas podem ser penhoradas?',
        answer:
          'Depende. A lei protege a pequena propriedade rural trabalhada pela família (art. 5º, XXVI, da Constituição e art. 833, VIII, do CPC) e as máquinas e implementos agrícolas do produtor pessoa física, salvo quando foram financiados e estão vinculados em garantia ao próprio negócio (art. 833, V e § 3º, do CPC). Bens dados em hipoteca ou penhor na cédula seguem regras próprias, por isso cada caso precisa ser avaliado com a matrícula e o contrato.',
      },
      {
        question: 'O que pode ser questionado em uma execução de cédula rural?',
        answer:
          'Entre os pontos mais comuns estão a forma de cálculo dos encargos (juros, capitalização e multa), a cobrança de valores não previstos no contrato, o vencimento antecipado, a regularidade do título e o direito à prorrogação da dívida que não foi observado pelo banco. A pertinência de cada ponto depende do contrato e dos extratos da operação.',
      },
    ],
    relatedServices: ['alongamento-de-divida-rural', 'recuperacao-judicial-produtor-rural'],
    relatedArticles: ['como-manter-sua-terra', 'agricultor-em-crise-financeira'],
  },

  'alongamento-de-divida-rural': {
    slug: 'alongamento-de-divida-rural',
    name: 'Alongamento e Prorrogação de Dívida Rural',
    primaryKeyword: 'alongamento de dívida rural',
    title: 'Alongamento e Prorrogação de Dívida Rural | CBM Agro',
    description:
      'Safra frustrada ou queda de preço comprometeu o pagamento? Entenda o direito à prorrogação da dívida rural, os documentos e como pedir ao banco.',
    summary:
      'Pedido de prorrogação e alongamento de operações de crédito rural quando a capacidade de pagamento foi afetada por frustração de safra, preço ou comercialização.',
    steps: [
      {
        title: 'Diagnóstico da operação',
        description:
          'Levantamos a linha de crédito, a fonte dos recursos, os vencimentos e as garantias de cada contrato, porque as regras de prorrogação variam conforme a operação.',
      },
      {
        title: 'Prova da incapacidade de pagamento',
        description:
          'Organizamos o laudo técnico, as notas fiscais, os registros de produtividade e os comunicados de seguro ou Proagro que demonstram a perda.',
      },
      {
        title: 'Pedido formal ao banco',
        description:
          'O pedido é protocolado por escrito, de preferência antes do vencimento, com uma proposta de cronograma compatível com a capacidade de pagamento das próximas safras.',
      },
      {
        title: 'Acompanhamento e medidas judiciais',
        description:
          'Se o banco recusar sem fundamento ou não responder, avaliamos as medidas judiciais cabíveis para assegurar a prorrogação.',
      },
    ],
    documents: [
      'Cédula de crédito rural ou contrato e todos os aditivos',
      'Laudo técnico de perda assinado por engenheiro agrônomo ou profissional habilitado',
      'Notas fiscais de venda da produção e de compra de insumos da safra',
      'Comunicados, extratos e propostas enviados pelo banco',
      'Comprovante de acionamento do seguro rural ou do Proagro, se houver',
    ],
    faq: [
      {
        question: 'O banco é obrigado a prorrogar a dívida rural?',
        answer:
          'Para operações de crédito rural, a Súmula 298 do Superior Tribunal de Justiça estabelece que o alongamento da dívida "não constitui faculdade da instituição financeira, mas direito do devedor nos termos da lei". O Manual de Crédito Rural (MCR) prevê a prorrogação quando há incapacidade de pagamento comprovada por dificuldade de comercialização, frustração de safra por fatores adversos ou outras ocorrências que prejudiquem a atividade. O direito depende do preenchimento desses requisitos e da prova.',
      },
      {
        question: 'Quando devo pedir a prorrogação da dívida rural?',
        answer:
          'O recomendado é formalizar o pedido por escrito antes do vencimento da parcela, já com a documentação que comprova a perda. Pedidos feitos depois do vencimento ou depois de iniciada a cobrança judicial não são impossíveis, mas tendem a exigir mais prova e a enfrentar mais resistência.',
      },
      {
        question: 'Quais documentos comprovam a frustração de safra?',
        answer:
          'Em geral, laudo técnico assinado por engenheiro agrônomo ou profissional habilitado, notas fiscais de venda e de insumos, registros de produtividade, dados climáticos oficiais, decretos de situação de emergência quando existirem e comunicações de sinistro ao seguro rural ou ao Proagro.',
      },
      {
        question: 'Os juros mudam com o alongamento?',
        answer:
          'Na prorrogação prevista no MCR, a regra é a manutenção dos encargos financeiros pactuados para a operação. Renegociações feitas fora dessas normas, como a troca da dívida por um novo contrato, podem trazer encargos diferentes e por isso merecem leitura cuidadosa antes da assinatura.',
      },
    ],
    relatedServices: ['defesa-execucao-rural', 'analise-elaboracao-de-contrato'],
    relatedArticles: ['linha-de-credito-agricola', 'agricultor-em-crise-financeira'],
  },

  'defesa-busca-e-apreensao-agricola': {
    slug: 'defesa-busca-e-apreensao-agricola',
    name: 'Defesa em Busca e Apreensão de Máquinas Agrícolas',
    primaryKeyword: 'busca e apreensão de máquinas agrícolas',
    title: 'Busca e Apreensão de Máquinas Agrícolas | CBM Agro',
    description:
      'Trator, colheitadeira ou implemento com pedido de busca e apreensão? Entenda os prazos da alienação fiduciária e as defesas possíveis do produtor.',
    summary:
      'Defesa do produtor rural em ações de busca e apreensão de tratores, colheitadeiras, implementos e veículos financiados com alienação fiduciária.',
    steps: [
      {
        title: 'Conferência do contrato e da mora',
        description:
          'Verificamos se o bem está de fato em alienação fiduciária, como a mora foi comprovada e se a notificação chegou ao endereço do contrato.',
      },
      {
        title: 'Decisão nos primeiros 5 dias',
        description:
          'Avaliamos se é viável pagar a integralidade da dívida pendente para pedir a restituição do bem, e se os valores apresentados pelo credor estão corretos.',
      },
      {
        title: 'Contestação no prazo de 15 dias',
        description:
          'A resposta discute a validade da notificação, encargos e valores cobrados e outras questões do contrato.',
      },
      {
        title: 'Negociação e medidas relacionadas',
        description:
          'Quando há várias dívidas em cobrança, avaliamos o conjunto, inclusive se a recuperação judicial é uma alternativa para proteger bens essenciais.',
      },
    ],
    documents: [
      'Contrato ou cédula com a cláusula de alienação fiduciária',
      'Notificação extrajudicial recebida do banco ou da financeira',
      'Mandado de busca e apreensão e decisão liminar, se já houver',
      'Comprovantes de pagamento das parcelas',
      'Nota fiscal e documentos de identificação das máquinas (chassi, série)',
    ],
    faq: [
      {
        question: 'Quais são os prazos depois que a máquina é apreendida?',
        answer:
          'Pelo Decreto-Lei nº 911/1969, depois de cumprida a liminar o devedor tem 5 dias para pagar a integralidade da dívida pendente, segundo os valores apresentados pelo credor, e obter a restituição do bem livre de ônus (art. 3º, § 2º). O prazo para apresentar a contestação é de 15 dias contados da execução da liminar (art. 3º, § 3º).',
      },
      {
        question: 'Pagar só as parcelas atrasadas devolve a máquina?',
        answer:
          'Pela redação atual do Decreto-Lei nº 911/1969, a restituição depende do pagamento da integralidade da dívida pendente, conforme os valores apresentados pelo credor, e não apenas das parcelas vencidas. O Superior Tribunal de Justiça firmou esse entendimento em recurso repetitivo (Tema 722). Por isso a conferência dos valores cobrados é importante desde o primeiro dia.',
      },
      {
        question: 'O banco pode pedir busca e apreensão sem me notificar?',
        answer:
          'A busca e apreensão depende da comprovação da mora do devedor, normalmente feita por notificação enviada ao endereço indicado no contrato (art. 2º, § 2º, do Decreto-Lei nº 911/1969). Falhas nessa comprovação estão entre os pontos verificados na defesa.',
      },
      {
        question: 'Máquina essencial à produção pode ficar com o produtor?',
        answer:
          'A essencialidade do bem não impede, por si só, a busca e apreensão em alienação fiduciária. Ela ganha peso principalmente na recuperação judicial: nesse caso, a Lei nº 11.101/2005 impede a retirada de bens de capital essenciais à atividade durante o período de suspensão (art. 49, § 3º). Fora da recuperação, a defesa costuma se concentrar no contrato, na mora e nos valores cobrados.',
      },
    ],
    relatedServices: ['recuperacao-judicial-produtor-rural', 'defesa-execucao-rural'],
    relatedArticles: ['agricultor-em-crise-financeira', 'linha-de-credito-agricola'],
  },

  'recuperacao-judicial-produtor-rural': {
    slug: 'recuperacao-judicial-produtor-rural',
    name: 'Recuperação Judicial do Produtor Rural',
    primaryKeyword: 'recuperação judicial do produtor rural',
    title: 'Recuperação Judicial do Produtor Rural | CBM Agro',
    description:
      'Requisitos da recuperação judicial para produtor rural pessoa física e jurídica, documentos exigidos, dívidas que entram no plano e efeito nas execuções.',
    summary:
      'Diagnóstico de viabilidade, pedido e condução da recuperação judicial do produtor rural pessoa física ou jurídica, nos termos da Lei nº 11.101/2005.',
    steps: [
      {
        title: 'Diagnóstico de viabilidade',
        description:
          'Analisamos credores, garantias e o fluxo de caixa das próximas safras para saber se a recuperação judicial é o caminho adequado ou se há alternativas menos custosas.',
      },
      {
        title: 'Requisitos e documentação',
        description:
          'Organizamos a comprovação de pelo menos 2 anos de atividade rural e os documentos contábeis e fiscais exigidos pela lei.',
      },
      {
        title: 'Pedido e período de suspensão',
        description:
          'Com o processamento deferido, as execuções ficam suspensas por 180 dias, período usado para estruturar o plano.',
      },
      {
        title: 'Plano e negociação com credores',
        description:
          'O plano de recuperação é construído com prazos compatíveis com o ciclo produtivo e submetido aos credores.',
      },
    ],
    documents: [
      'Declarações de imposto de renda (DIRPF) e Livro Caixa Digital do Produtor Rural (LCDPR) dos últimos 2 anos',
      'Relação de credores com valores, vencimentos e garantias',
      'Contratos bancários, CPRs e contratos com fornecedores de insumos',
      'Relação de bens, matrículas e documentos das máquinas',
      'Fluxo de caixa e projeção das próximas safras',
    ],
    faq: [
      {
        question: 'Produtor rural pessoa física pode pedir recuperação judicial?',
        answer:
          'Sim. Com a Lei nº 14.112/2020, que alterou a Lei nº 11.101/2005, o produtor rural pode pedir recuperação judicial comprovando pelo menos 2 anos de atividade rural. Para a pessoa física, essa comprovação é feita com o Livro Caixa Digital do Produtor Rural (LCDPR), a declaração de imposto de renda e o balanço patrimonial, todos entregues no prazo (art. 48, § 3º). O registro na Junta Comercial é exigido no momento do pedido.',
      },
      {
        question: 'Quais dívidas entram na recuperação judicial do produtor rural?',
        answer:
          'Para o produtor pessoa física, entram apenas os créditos que decorram exclusivamente da atividade rural e estejam discriminados nos documentos exigidos por lei (art. 49, § 6º). Há exceções importantes: créditos garantidos por alienação fiduciária ficam fora do plano (art. 49, § 3º), e certas operações com recursos controlados de crédito rural renegociadas antes do pedido, além de CPRs com liquidação física em determinadas condições, têm regras próprias.',
      },
      {
        question: 'A recuperação judicial suspende as execuções?',
        answer:
          'Em regra, sim. Com o deferimento do processamento, as execuções contra o devedor ficam suspensas por 180 dias, prazo que pode ser prorrogado uma única vez, por igual período, em caráter excepcional (art. 6º, § 4º, da Lei nº 11.101/2005). Créditos que não se sujeitam à recuperação seguem regras próprias, ressalvada a proteção aos bens de capital essenciais durante esse período.',
      },
      {
        question: 'A recuperação judicial é indicada para todo produtor endividado?',
        answer:
          'Não. É um procedimento público, com custos e exigências contábeis relevantes. Em muitos casos, a prorrogação da dívida rural, a revisão dos contratos ou a defesa nas execuções resolvem o problema com menos custo. A decisão depende de um diagnóstico do passivo e do fluxo de caixa das próximas safras.',
      },
    ],
    relatedServices: ['defesa-execucao-rural', 'defesa-busca-e-apreensao-agricola'],
    relatedArticles: ['agricultor-em-crise-financeira', 'como-manter-sua-terra'],
  },

  'contencioso-tributario-rural': {
    slug: 'contencioso-tributario-rural',
    name: 'Contencioso Tributário Rural',
    primaryKeyword: 'defesa tributária do produtor rural',
    title: 'Contencioso Tributário Rural e Defesa Fiscal | CBM Agro',
    description:
      'Autuação de ITR, Funrural ou imposto de renda da atividade rural? Defesa administrativa e judicial do produtor, com revisão do enquadramento fiscal.',
    summary:
      'Defesa administrativa e judicial do produtor rural em autuações e execuções fiscais de ITR, Funrural e imposto de renda da atividade rural.',
    steps: [
      {
        title: 'Mapeamento do passivo fiscal',
        description:
          'Levantamos autos de infração, débitos inscritos em dívida ativa e a situação das certidões, que afetam o acesso a crédito.',
      },
      {
        title: 'Revisão do enquadramento',
        description:
          'Conferimos a forma de tributação da atividade (pessoa física ou jurídica), o LCDPR, a base do Funrural e os dados declarados do imóvel no ITR.',
      },
      {
        title: 'Defesa administrativa',
        description:
          'Impugnação e recursos no prazo legal, com laudos e documentos que sustentam a posição do produtor.',
      },
      {
        title: 'Defesa judicial',
        description:
          'Embargos à execução fiscal, ação anulatória ou mandado de segurança, conforme o estágio da cobrança.',
      },
    ],
    documents: [
      'Auto de infração ou notificação de lançamento',
      'Declarações de imposto de renda e LCDPR',
      'Declaração do ITR e documentos do imóvel (CCIR, CAR, ADA)',
      'Notas fiscais de comercialização da produção',
      'Relatório de situação fiscal e certidões',
    ],
    faq: [
      {
        question: 'Qual o prazo para contestar um auto de infração da Receita Federal?',
        answer:
          'No processo administrativo fiscal federal, a impugnação deve ser apresentada em 30 dias contados da ciência do lançamento (art. 15 do Decreto nº 70.235/1972). Perder esse prazo torna o débito definitivo na esfera administrativa e restringe as opções de defesa.',
      },
      {
        question: 'O que costuma gerar autuação de ITR?',
        answer:
          'Os motivos mais frequentes são o Valor da Terra Nua (VTN) declarado abaixo do valor de referência adotado pela Receita e a falta de comprovação de áreas não tributáveis, como Área de Preservação Permanente e Reserva Legal. A defesa costuma depender de laudo técnico e de documentos ambientais do imóvel.',
      },
      {
        question: 'Débito tributário impede o acesso a crédito rural?',
        answer:
          'Pode impedir. Instituições financeiras costumam exigir certidões de regularidade fiscal, e débitos inscritos em dívida ativa dificultam a obtenção dessas certidões. Com a suspensão da exigibilidade ou a garantia adequada do débito, é possível obter certidão positiva com efeitos de negativa (art. 206 do Código Tributário Nacional).',
      },
      {
        question: 'O que o produtor pode revisar no Funrural?',
        answer:
          'Entre os pontos mais comuns estão a base de cálculo usada nas notas de comercialização, a opção entre a contribuição sobre a receita bruta e sobre a folha de salários, quando cabível, e cobranças de períodos com discussão judicial. Cada situação exige a leitura das notas e da forma de comercialização.',
      },
    ],
    relatedServices: ['planejamento-defesa-patrimonial', 'analise-elaboracao-de-contrato'],
    relatedArticles: ['agricultor-em-crise-financeira'],
  },

  'planejamento-defesa-patrimonial': {
    slug: 'planejamento-defesa-patrimonial',
    name: 'Planejamento Patrimonial e Holding Rural',
    primaryKeyword: 'holding rural e planejamento patrimonial',
    title: 'Holding Rural e Planejamento Patrimonial | CBM Agro',
    description:
      'Organização jurídica do patrimônio rural: holding, sucessão familiar, revisão de garantias e separação entre bens pessoais e atividade produtiva.',
    summary:
      'Planejamento patrimonial e sucessório do produtor rural, com holding, revisão de garantias e organização da titularidade dos bens.',
    steps: [
      {
        title: 'Inventário de bens e dívidas',
        description:
          'Reunimos imóveis, máquinas, participações e o passivo da família, porque o planejamento só é seguro com o quadro completo.',
      },
      {
        title: 'Leitura dos riscos',
        description:
          'Avaliamos garantias prestadas, avais e fianças, regime de bens do casamento e sociedades existentes.',
      },
      {
        title: 'Desenho da estrutura',
        description:
          'Holding, acordo de sócios, doação de quotas com reserva de usufruto ou testamento, conforme os objetivos e o perfil da família.',
      },
      {
        title: 'Implementação e revisão',
        description:
          'Constituição, registros e transferências, com revisão periódica quando a atividade ou a família muda.',
      },
    ],
    documents: [
      'Matrículas, CCIR e CAR dos imóveis',
      'Contratos de crédito e garantias prestadas, inclusive avais e fianças',
      'Certidão de casamento e pacto antenupcial, se houver',
      'Contratos sociais de empresas existentes',
      'Declarações de imposto de renda dos titulares',
    ],
    faq: [
      {
        question: 'Holding rural protege o patrimônio de dívidas?',
        answer:
          'A holding organiza a titularidade dos bens e facilita a gestão e a sucessão, mas não é um escudo contra dívidas que já existem. Transferir bens para fugir de credores pode caracterizar fraude contra credores ou fraude à execução, e o ato pode ser anulado ou declarado ineficaz. Por isso o planejamento deve ser feito com antecedência e com o passivo mapeado.',
      },
      {
        question: 'Qual a diferença entre holding e inventário?',
        answer:
          'O inventário transfere os bens depois do falecimento, com imposto de transmissão (ITCMD), custos e tempo de tramitação. A holding permite organizar a sucessão em vida, por exemplo com doação de quotas com reserva de usufruto, o que traz previsibilidade. Custos e efeitos tributários variam conforme o estado e o perfil do patrimônio.',
      },
      {
        question: 'Garantir a dívida de familiares coloca a fazenda em risco?',
        answer:
          'Pode colocar. Garantias pessoais, como aval e fiança, tornam quem garante responsável pelo pagamento, e seus bens podem ser alcançados em uma cobrança. A validade de algumas dessas garantias em títulos de crédito rural tem regras próprias, que também devem ser verificadas.',
      },
    ],
    relatedServices: ['analise-elaboracao-de-contrato', 'contencioso-tributario-rural'],
    relatedArticles: ['como-manter-sua-terra'],
  },

  'analise-elaboracao-de-contrato': {
    slug: 'analise-elaboracao-de-contrato',
    name: 'Análise e Elaboração de Contratos Rurais',
    primaryKeyword: 'análise de contrato rural',
    title: 'Análise e Elaboração de Contratos Rurais | CBM Agro',
    description:
      'Revisão de CPR, barter, arrendamento, parceria e contratos bancários antes da assinatura: cláusulas de risco, garantias e vencimento antecipado.',
    summary:
      'Análise e elaboração de CPR, barter, arrendamento, parceria rural e contratos bancários, com foco em garantias, prazos e riscos de inadimplemento.',
    steps: [
      {
        title: 'Entendimento do negócio',
        description:
          'Objeto, safra, preço, prazos e quem são as partes: o contrato precisa refletir a operação real.',
      },
      {
        title: 'Leitura das cláusulas críticas',
        description:
          'Vencimento antecipado, garantias, índices de correção, multas, foro e obrigações de entrega são lidos com atenção às consequências práticas.',
      },
      {
        title: 'Ajustes e negociação',
        description:
          'Sugerimos redações alternativas e apoiamos a negociação com o banco, a trading, o fornecedor ou o arrendador.',
      },
      {
        title: 'Elaboração e registro',
        description:
          'Redigimos o instrumento e orientamos sobre registros exigidos, como o registro ou depósito da CPR.',
      },
    ],
    documents: [
      'Minuta do contrato a ser assinado',
      'Contratos anteriores com a mesma parte',
      'Matrícula e documentos do imóvel, em arrendamento ou parceria',
      'Documentos das garantias oferecidas',
      'Cronograma da safra e expectativa de produção',
    ],
    faq: [
      {
        question: 'Qual o prazo mínimo de um contrato de arrendamento rural?',
        answer:
          'O Decreto nº 59.566/1966, que regulamenta o Estatuto da Terra, fixa prazos mínimos conforme a atividade: 3 anos para lavoura temporária e pecuária de pequeno e médio porte, 5 anos para lavoura permanente e pecuária de grande porte e 7 anos para exploração florestal (art. 13, II, "a").',
      },
      {
        question: 'O que é CPR e quais riscos ela traz?',
        answer:
          'A Cédula de Produto Rural (Lei nº 8.929/1994) é um título em que o produtor se compromete a entregar produto ou a pagar em dinheiro no futuro. Os principais riscos estão no volume prometido, nas garantias vinculadas, no vencimento antecipado e, na CPR com entrega física, nas consequências de uma quebra de safra. A lei também exige o registro ou depósito da CPR em sistema autorizado.',
      },
      {
        question: 'O que observar em um contrato de barter?',
        answer:
          'No barter, o produtor recebe insumos e paga com parte da produção. É importante verificar a forma de conversão do preço, a qualidade e o local de entrega do produto, as garantias exigidas (muitas vezes uma CPR) e o que acontece se a safra for menor que a prevista.',
      },
      {
        question: 'Vale a pena revisar um contrato que já foi assinado?',
        answer:
          'Sim, sobretudo antes de renovações e aditivos ou quando há dificuldade de cumprir o contrato. A revisão mostra quais obrigações estão em vigor, quais garantias foram dadas e quais cláusulas podem ser discutidas.',
      },
    ],
    relatedServices: ['alongamento-de-divida-rural', 'planejamento-defesa-patrimonial'],
    relatedArticles: ['linha-de-credito-agricola'],
  },
}

export function getService(slug: ServiceSlug): ServiceSeo {
  return SERVICES[slug]
}
