# Design da área de Artigos

**Data:** 2026-09-03  
**Status:** aprovado para planejamento  
**Branch obrigatória:** `feature/blog`

## 1. Objetivo

Criar uma área pública de conteúdo jurídico formada pela listagem `/artigos` e por páginas individuais `/artigos/[slug]`. A solução deve seguir a arquitetura Next.js App Router e o design system documentado do projeto, preservar renderização server-side e oferecer uma base sólida para SEO, otimização para mecanismos generativos (GEO), relevância geográfica/local e mecanismos de resposta (AEO).

A primeira entrega incluirá três rascunhos completos baseados nos temas já exibidos na seção de artigos da home. Esses textos permanecerão fora da produção pública até revisão editorial/jurídica e mudança explícita do status para publicado.

## 2. Decisões confirmadas

- Usar React com Next.js App Router, Server Components e pré-renderização.
- Usar arquivos MDX/Markdown versionados no repositório.
- Encapsular a fonte de conteúdo em um repositório tipado para permitir futura migração para TypeScript/JSON, banco ou CMS.
- Criar `/artigos` e `/artigos/[slug]`.
- Manter a seção atual de artigos da home e adicionar nela o botão “Ver todos os artigos”, apontando para `/artigos`.
- Manter os itens “Artigos” do header e do footer apontando para `/#blog`.
- Não implementar busca ou filtros na primeira versão; preparar metadados e fronteiras para busca textual e semântica futura.
- Usar autoria institucional “CBM Agro e Gestão de Passivos”.
- Manter os três textos iniciais como `draft` até aprovação.
- Permitir prévia de drafts apenas no ambiente local; em produção, a rota de um draft retorna `404`.
- Enquanto não houver artigo publicado, `/artigos` exibirá “Artigos em preparação”, usará `noindex, follow` e ficará fora do sitemap.
- Usar `npm` para dependências, testes, lint e build. Manter Bun apenas no script `start` existente.
- Não remover, mover ou modificar os dados estruturados já existentes em `src/app/layout.tsx` nesta entrega.
- Catalogar a auditoria do JSON-LD global como trabalho futuro, separado da implementação de Artigos.
- Nunca alterar, commitar, fazer merge, rebase ou push na `main` durante este trabalho.

## 3. Alternativas avaliadas

### 3.1 MDX com repositório interno — escolhida

Os arquivos MDX são lidos por uma camada central que valida frontmatter, aplica regras de publicação e entrega objetos tipados às rotas. Isso preserva a simplicidade editorial e desacopla as páginas da fonte de dados.

### 3.2 MDX com imports e registro manual

Tem menor abstração inicial, mas exige atualizar um registro a cada artigo e tende a duplicar regras de drafts, metadata e sitemap. Também dificulta a troca futura da fonte de conteúdo.

### 3.3 Framework externo de content collections

É útil em acervos maiores, mas introduz configuração e risco de compatibilidade desnecessários para os três conteúdos iniciais.

## 4. Arquitetura

```text
content/
└── artigos/
    ├── agricultor-em-crise-financeira.mdx
    ├── como-manter-sua-terra.mdx
    └── linha-de-credito-agricola.mdx

src/
├── app/
│   ├── artigos/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   └── artigos/
│       ├── ArticleCard.tsx
│       ├── ArticleHeader.tsx
│       ├── ArticleBody.tsx
│       ├── ArticleBreadcrumbs.tsx
│       └── ArticleCta.tsx
└── lib/
    └── artigos/
        ├── schema.ts
        ├── repository.ts
        ├── mdx.ts
        └── seo.ts
```

### 4.1 Responsabilidades

- `content/artigos`: conteúdo e frontmatter, sem lógica de aplicação.
- `schema.ts`: contrato do artigo e validações editoriais.
- `repository.ts`: única porta de leitura; resolve slugs, ordena, filtra drafts e detecta duplicações.
- `mdx.ts`: compilação server-side e allowlist de componentes MDX.
- `seo.ts`: criação consistente de metadata e JSON-LD.
- `/artigos`: índice server-side com estado publicado ou vazio.
- `/artigos/[slug]`: artigo server-side e pré-renderizado quando publicado.
- `components/artigos`: componentes pequenos, sem acoplamento à fonte de conteúdo.

Páginas e componentes recebem um contrato tipado de artigo. Uma migração futura substitui a implementação do repositório, sem alterar as rotas públicas.

## 5. Contrato editorial

Cada arquivo terá frontmatter validado com, no mínimo:

```yaml
id: identificador-estavel
title: Título do artigo
slug: slug-canonico
description: Resumo exclusivo para listagem e metadata
category: Categoria editorial
tags:
  - tag
keywords:
  - termo relacionado
coverImage: /images/blog/imagem.webp
coverImageAlt: Descrição editorial da imagem
author: CBM Agro e Gestão de Passivos
draft: true
publishedAt: null
updatedAt: null
```

Regras:

- `id` é estável e independente do slug.
- Slugs são únicos, minúsculos e separados por hífen.
- Artigos publicados exigem datas reais e válidas.
- `updatedAt` não pode ser anterior a `publishedAt`.
- Imagem e texto alternativo são obrigatórios.
- URL canônica, tempo de leitura, texto normalizado e dados estruturados são derivados.
- Nenhuma data atual, imagem ou metadata é inventada como fallback.

## 6. Publicação e drafts

`repository.ts` centraliza a política:

- `getPublishedArticles()` nunca retorna drafts.
- parâmetros estáticos, relacionados, listagem, sitemap e JSON-LD público usam apenas artigos publicados.
- em desenvolvimento, `getArticleBySlug()` pode retornar um draft para prévia, com `noindex, nofollow` e aviso de revisão pendente.
- em produção, um slug em draft chama `notFound()` e retorna `404`.
- quando não houver publicações, `/artigos` retorna `200`, exibe o estado “Artigos em preparação”, recebe `noindex, follow` e não entra no sitemap.
- ao publicar o primeiro artigo, a listagem, metadata e sitemap passam automaticamente ao estado indexável.

Publicar exige revisão editorial/jurídica, datas preenchidas e `draft: false`.

## 7. Experiência e design

A interface seguirá `DESIGN.md` e `PRODUCT.md`, especialmente o conceito “Field Command”.

### 7.1 Listagem `/artigos`

1. Header existente sobre hero compacto em `teal-dark`.
2. Eyebrow “Orientação jurídica”.
3. H1 “Artigos para decisões rurais que não aceitam improviso”.
4. Introdução curta.
5. Grade simples, ordenada por publicação, em superfícies `paper`/`warm-white`.
6. Cards com imagem, categoria, título, descrição, data e tempo de leitura.
7. Estado “Artigos em preparação” quando necessário.
8. CTA institucional em cobre.
9. Footer existente.

### 7.2 Artigo `/artigos/[slug]`

1. Header existente.
2. Breadcrumb visível.
3. Categoria, H1 e descrição.
4. Autoria institucional, data e tempo de leitura.
5. Imagem principal.
6. Conteúdo em coluna de 65–75 caracteres.
7. Bloco “Em resumo” quando o texto justificar.
8. Corpo semântico com headings, listas, destaques e links.
9. Referências/fontes quando utilizadas.
10. Aviso de caráter educativo.
11. Artigos relacionados publicados.
12. CTA de contato contextual.
13. Footer.

### 7.3 Regras visuais

- teal comunica autoridade; papel quente favorece leitura; cobre é CTA; ouro é acento de confiança.
- usar os tokens, espaçamentos, raios e componentes existentes.
- não usar branco/preto puros, gradiente em texto, glassmorphism, fonte remota ou grades genéricas.
- sombras respondem a estado funcional.
- motion é curta, dispensável e respeita `prefers-reduced-motion`.
- o texto continua compreensível sem JavaScript.

Não entram na primeira versão: sidebar, comentários, compartilhamento, newsletter e tabela de conteúdo.

## 8. Conteúdo inicial

Serão criados três rascunhos:

1. “Agricultor em crise financeira: entenda as alternativas jurídicas antes de vender tudo”.
2. “Como o escritório de advocacia pode ajudar produtores a manterem sua terra”.
3. “Linha de crédito agrícola virou dor de cabeça? Veja o que fazer”.

Os textos seguirão voz especialista, firme, acolhedora e direta. Cada um terá estrutura própria, mas poderá incluir:

- resposta curta ao problema;
- contexto jurídico em linguagem clara;
- sinais de atenção;
- possibilidades dependentes do caso concreto;
- documentos úteis;
- erros a evitar;
- momento adequado para procurar orientação;
- conclusão, fontes e aviso educativo.

Os futuros artigos fornecidos pelo responsável do projeto servirão como referência de voz antes da publicação. Os rascunhos não apresentarão garantia, resultado ou tese jurídica como universal.

## 9. SEO técnico

Cada artigo publicado terá:

- title e description exclusivos;
- canonical absoluto;
- Open Graph do tipo `article`, com imagem e datas;
- Twitter Card;
- HTML pré-renderizado;
- um H1 e hierarquia correta de headings;
- landmarks e elementos semânticos;
- imagem com dimensões conhecidas e alt editorial;
- links internos contextuais;
- `404` real para slug ausente ou draft em produção.

`/artigos` terá metadata e canonical próprios. `src/app/sitemap.ts` e `src/app/robots.ts` formalizarão descoberta e indexação, sempre respeitando o status editorial.

## 10. Dados estruturados

### Restrição de segurança desta entrega

O JSON-LD existente em `src/app/layout.tsx` é considerado imutável nesta entrega por já estar validado em produção. Os novos schemas serão adicionados apenas às novas rotas de Artigos. A presença global de objetos específicos da home (`WebPage`, `BreadcrumbList` e `FAQPage`) é uma ressalva conhecida: pode gerar redundância semântica nas novas rotas, portanto não se afirma que o grafo completo ficará ideal até uma auditoria futura e explicitamente autorizada.

Essa auditoria fica registrada em `docs/technical-debt/structured-data-audit.md` e não será misturada à implementação inicial de Artigos.

### Listagem

- `CollectionPage`;
- `Blog`;
- `ItemList` somente com publicações;
- `BreadcrumbList`.

### Artigo

- `BlogPosting`;
- `headline`, `description` e `image`;
- `datePublished` e `dateModified` iguais aos valores visíveis;
- `author` institucional;
- `publisher` referenciando o mesmo `@id` da organização global;
- `mainEntityOfPage`, `isPartOf` e `inLanguage: pt-BR`;
- `about` e `keywords` derivados do conteúdo;
- `BreadcrumbList`.

Schemas só serão emitidos quando corresponderem ao conteúdo visível. `FAQPage` não será criado por padrão.

## 11. AEO e GEO generativo

Os artigos priorizarão conteúdo original, útil e verificável:

- resposta direta após a introdução;
- resumo de pontos principais;
- headings alinhados à intenção real de busca;
- definições antes do aprofundamento;
- listas apenas quando representarem processos reais;
- limites, exceções e contexto;
- fontes primárias para legislação e afirmações jurídicas;
- conclusão com próximo passo útil;
- aviso educativo sem substituir análise individual.

Não haverá keyword stuffing, páginas massificadas nem afirmações sem base. `llms.txt` fica fora da primeira versão porque não substitui indexação, SEO ou conteúdo de qualidade.

## 12. GEO geográfico/local

- preservar uma única entidade para a organização e o mesmo `@id` no publisher;
- manter endereço, telefone e `areaServed` consistentes com o site;
- mencionar Feira de Santana, Bahia ou atendimento nacional apenas quando verdadeiro e relevante;
- não gerar páginas ou repetições artificiais por cidade;
- usar o domínio `https://cbmgestaodepassivos.com.br` em canonicals.

## 13. Autoridade e confiança

- autoria visível: “CBM Agro e Gestão de Passivos”;
- datas reais de publicação e atualização;
- conexão clara com informações institucionais e canais oficiais;
- aviso de revisão pendente apenas na prévia local;
- nenhum selo “revisado por advogado” sem pessoa e validação reais;
- fontes identificadas pelo nome e contexto;
- nenhuma promessa de resultado, economia ou prazo sem base verificável.

## 14. Dependências e segurança

Dependências planejadas:

- `next-mdx-remote` para compilação server-side;
- `gray-matter` para frontmatter;
- `zod` existente para validação;
- `vitest` para testes automatizados.

O tempo de leitura será calculado internamente.

O MDX é versionado e confiável, mas terá:

- allowlist de componentes;
- links externos seguros;
- ausência de scripts vindos do conteúdo;
- imports arbitrários fora do contrato editorial;
- JSON-LD serializado com escape adequado;
- metadata limitada ao schema validado.

## 15. Tratamento de erros

O build falha com nome do arquivo e detalhes quando houver:

- frontmatter inválido ou ausente;
- slug duplicado ou fora da convenção;
- datas inválidas;
- publicação sem datas;
- imagem ausente ou sem alt;
- MDX inválido;
- componente não permitido.

Não haverá fallback silencioso que publique conteúdo incompleto.

## 16. Testes

### Unidade

- leitura de artigo válido;
- rejeição de frontmatter inválido;
- detecção de slug duplicado;
- ordenação por data;
- filtragem de drafts;
- prévia local e bloqueio em produção;
- cálculo de tempo de leitura;
- geração coerente de URLs e dados estruturados.

### Rotas e SEO

- `/artigos` sem publicados mostra estado vazio e `noindex`;
- `/artigos` com publicação gera listagem e indexação;
- artigo gera metadata exclusiva;
- datas visíveis coincidem com JSON-LD;
- sitemap contém somente publicações;
- drafts não aparecem em relacionados.

### Visual e acessibilidade

- desktop e mobile;
- teclado e foco;
- headings e landmarks;
- contraste;
- imagens e textos alternativos;
- reduced motion;
- leitura do conteúdo sem JavaScript.

## 17. Verificação de conclusão

A implementação só estará concluída após resultados reais de:

```bash
npm test
npm run lint
npm run build
```

Também serão executados:

- checagem TypeScript separada, pois o projeto ignora erros TypeScript no build;
- servidor de produção local e inspeção das respostas HTTP/HTML;
- inspeção de canonical, robots e sitemap;
- validação do JSON-LD;
- Lighthouse nas rotas aplicáveis;
- revisão visual com Impeccable;
- comparação final de `feature/blog` contra `main`.
- confirmação de que o bloco JSON-LD preexistente em `src/app/layout.tsx` não foi alterado.

## 18. Segurança da branch

Antes da primeira alteração de implementação e antes de commits, deve-se confirmar a branch ativa. Se não for `feature/blog`, o trabalho para imediatamente. Não haverá merge nem deploy sem pedido explícito.

## 19. Fora do escopo

- painel administrativo;
- banco de dados ou CMS;
- busca textual ou semântica;
- filtros e paginação;
- comentários;
- newsletter;
- RSS;
- página individual de autor;
- publicação dos três drafts.

A arquitetura preserva a possibilidade de adicionar esses recursos sem implementá-los prematuramente.

## 20. Referências técnicas

- [Next.js: generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js: generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- [Next.js: Metadata e OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Google Search Central: Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google Search Central: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google Search Central: publication dates](https://developers.google.com/search/docs/appearance/publication-dates)
- [Schema.org: BlogPosting](https://schema.org/BlogPosting)
