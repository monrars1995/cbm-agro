---
name: CBM Agro e Gestão de Passivos
description: Advocacia bancária e agrária com autoridade de campo, clareza jurídica e conversão digna
colors:
  teal: "oklch(28% 0.045 200)"
  teal-light: "oklch(35% 0.055 198)"
  teal-dark: "oklch(18% 0.035 203)"
  gold: "oklch(72% 0.105 83)"
  gold-light: "oklch(80% 0.085 83)"
  gold-dark: "oklch(61% 0.095 82)"
  copper: "oklch(55% 0.11 48)"
  clay: "oklch(51% 0.13 29)"
  paper: "oklch(97.5% 0.012 84)"
  paper-deep: "oklch(93.5% 0.018 82)"
  warm-white: "oklch(98% 0.01 84)"
  warm-gray: "oklch(95.5% 0.013 84)"
  warm-border: "oklch(89.5% 0.014 83)"
  text-dark: "oklch(20% 0.012 84)"
  text-medium: "oklch(41% 0.018 84)"
  text-light: "oklch(55% 0.015 84)"
  whatsapp-green: "#25D366"
  destructive: "oklch(0.577 0.245 27.325)"
typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.03
    letterSpacing: "normal"
  headline:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "normal"
  title:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(1.125rem, 2vw, 1.5rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "normal"
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.11em"
rounded:
  sm: "6px"
  md: "8px"
  base: "10px"
  lg: "14px"
  card: "24px"
  panel: "28px"
  document: "32px"
  pill: "9999px"
spacing:
  section-y: "80px"
  section-y-lg: "112px"
  container-x-mobile: "16px"
  container-x-tablet: "24px"
  container-x-desktop: "32px"
  field-grid: "48px"
components:
  button-primary:
    backgroundColor: "{colors.copper}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.lg}"
    padding: "24px 32px"
  button-primary-hover:
    backgroundColor: "{colors.clay}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.lg}"
    padding: "24px 32px"
  button-secondary-dark:
    backgroundColor: "{colors.teal-dark}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.lg}"
    padding: "24px 32px"
  button-outline-hero:
    backgroundColor: "oklch(98% 0.01 84 / 0.10)"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.lg}"
    padding: "24px 32px"
  section-eyebrow:
    backgroundColor: "transparent"
    textColor: "{colors.copper}"
    typography: "{typography.label}"
    rounded: "0"
    padding: "0"
  command-panel:
    backgroundColor: "{colors.teal-dark}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.document}"
    padding: "28px"
  service-card:
    backgroundColor: "{colors.warm-white}"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.card}"
    padding: "0"
  lead-form:
    backgroundColor: "{colors.warm-white}"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.panel}"
    padding: "28px"
---

# Design System: CBM Agro e Gestão de Passivos

## Overview

**Creative North Star: "Field Command"**

O sistema atual coloca a CBM como sala de comando jurídica do produtor rural: quente o suficiente para acolher uma decisão difícil, técnico o suficiente para parecer preparado contra banco, execução e urgência patrimonial. O visitante deve sentir que há método, prioridade e equipe, não apenas uma vitrine bonita de advocacia.

A cena física é um produtor ou gestor rural olhando o site no celular ou notebook em meio a pressão bancária, com pouco tempo para decifrar jargão. Por isso a interface usa contraste alto, linguagem direta, CTAs repetidos com dignidade e seções que parecem mapas de decisão. O visual rejeita dashboards SaaS escuros, glassmorphism decorativo, luxo escuro vazio, gradiente em texto e grids de cards idênticos sem hierarquia.

**Key Characteristics:**

- Paleta **Committed**: teal profundo para autoridade, papel quente para leitura e cobre como chamada de ação principal.
- Fundo padrão em `warm-white` ou `paper`, nunca branco puro.
- Hero com imagem real, overlay teal, grade de campo muito discreta e prioridade textual integrada ao fundo.
- Componentes de decisão: `command-panel` sólido, `legal-paper`, `clay-alert`, formulários de triagem e cards com imagem.
- Motion curta com `ease-out` e entrada por opacidade mais deslocamento, sempre dispensável para compreensão.
- Conteúdo público em `max-w-7xl`, seções de `80px` a `112px` e texto corrido limitado a 65 a 75 caracteres.

## Colors

A cor deve parecer terra, contrato e comando. O teal segura a instituição; cobre e clay puxam urgência humana; ouro aparece como sinal de confiança, nunca como decoração abundante.

### Primary

- **Command Teal** (`oklch(28% 0.045 200)`): Base institucional, títulos em superfícies claras, overlays e navegação ativa.
- **Deep Command Teal** (`oklch(18% 0.035 203)`): Rodapé, painéis escuros, superfícies de hero e texto sobre acentos quentes.
- **Lifted Teal** (`oklch(35% 0.055 198)`): Hover, estados ativos e pequenas variações em superfícies escuras.

### Secondary

- **Judicial Copper** (`oklch(55% 0.11 48)`): CTA principal, foco, links jurídicos, ícones de contato e ações de formulário.
- **Clay Alert** (`oklch(51% 0.13 29)`): Urgência, riscos, estados emergenciais e hover do CTA principal.

### Tertiary

- **Harvest Gold** (`oklch(72% 0.105 83)`): Confiança, prova, labels em fundo escuro, seleção e acentos raros.
- **Sunlit Gold** (`oklch(80% 0.085 83)`): Texto em painéis escuros, highlights no hero e ícones sobre teal.
- **Aged Gold** (`oklch(61% 0.095 82)`): Estados pressionados, links de alto contraste e acentos menos luminosos.

### Neutral

- **Legal Paper** (`oklch(97.5% 0.012 84)`): Fundo de páginas legais, contato e seções que precisam de leitura calma.
- **Pressed Paper** (`oklch(93.5% 0.018 82)`): Variação de papel, alternância de seção e bases secundárias.
- **Warm White** (`oklch(98% 0.01 84)`): Cards, forms, header sólido e superfícies principais.
- **Warm Gray** (`oklch(95.5% 0.013 84)`): Muted backgrounds, hover de navegação e separação leve.
- **Warm Border** (`oklch(89.5% 0.014 83)`): Bordas de cards, inputs, divisores e contornos de painel.
- **Text Dark** (`oklch(20% 0.012 84)`): Texto principal em superfícies claras.
- **Text Medium** (`oklch(41% 0.018 84)`): Parágrafos, descrições e informação de suporte.
- **Text Light** (`oklch(55% 0.015 84)`): Captions, metadados e texto de baixo peso.

### Utility

- **WhatsApp Green** (`#25D366`): Exclusivo para o botão e blocos de WhatsApp.
- **Destructive** (`oklch(0.577 0.245 27.325)`): Erros, alertas destrutivos e estados inválidos.

**The Copper Leads Rule.** O CTA principal usa cobre, não ouro. Ouro é confiança e prova; cobre é ação.

**The Tinted Neutral Rule.** Nunca usar `#000` ou `#fff`. Todo neutro deve carregar um pouco do calor rural da marca.

## Typography

**Display Font:** System sans stack (`ui-sans-serif`, `system-ui`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `sans-serif`)
**Body Font:** System sans stack
**Label Font:** System sans stack com caixa alta e tracking amplo

**Character:** A tipografia é direta, geométrica e operacional. Ela deve parecer menos editorial e mais comando claro, com contraste de escala nos momentos estratégicos e corpo confortável para leitura em mobile.

### Hierarchy

- **Display** (700, `text-4xl` até `text-7xl`, line-height 1.03): H1 da home e páginas de campanha. Usar com uma única frase forte e uma cor sólida de destaque.
- **Headline** (700, `text-3xl` até `text-5xl`, line-height 1.08): Títulos de seção via `SectionHeading`.
- **Title** (700, `text-lg` até `text-2xl`, line-height 1.25): Cards, painéis, formulários e blocos de decisão.
- **Body** (400, `text-sm` até `text-lg`, line-height 1.65): Descrições, parágrafos e instruções de formulário.
- **Label** (700, `text-xs`, uppercase, `tracking-[0.11em]`): Eyebrows, badges de risco e rótulos de navegação contextual.

**The No Remote Font Rule.** O site não depende de Google Fonts em runtime local. O token `--font-poppins` aponta para a stack de sistema para manter o dev server estável.

**The Plain Authority Rule.** Não usar gradiente em texto. Ênfase vem de peso, escala e uma cor sólida (`gold-light`, `copper` ou `teal-dark`).

## Elevation

Profundidade vem de camadas tonais, bordas quentes e sombras funcionais. O sistema é plano em repouso, mas ganha presença quando o usuário passa por cards, entra em formulários ou fixa o olhar em painéis de comando.

### Shadow Vocabulary

- **Header Scrolled** (`shadow-lg shadow-teal-dark/[0.05]`): Header branco após scroll ou hover.
- **Command Panel** (`shadow-teal-dark/15`): Painéis escuros que concentram decisão quando há bloco funcional real.
- **Form Focus Surface** (`shadow-2xl shadow-teal-dark/20`): Formulários de landing e contato.
- **Card Hover** (`0 20px 25px -5px rgba(200,169,81,0.08), 0 8px 10px -6px rgba(200,169,81,0.08)`): Cards e blocos que aceitam elevação ao hover.
- **CTA Hover** (`shadow-lg shadow-clay/20` ou `shadow-copper/20`): Botões primários e ações de conversão.

**The State Earns Shadow Rule.** Sombras fortes precisam responder a função: header fixo, card em hover, formulário prioritário ou painel de comando. Não sombrear grade inteira por decoração.

## Components

### Buttons

- **Shape:** `rounded-xl` ou `rounded-full`, nunca canto agressivo.
- **Primary:** Fundo `copper`, texto `warm-white`, padding `px-8 py-6`, ícone `ArrowRight` com translate no hover.
- **Hover / Focus:** Hover troca para `clay`, sombra quente e foco com outline cobre de 3px.
- **Secondary dark:** Fundo `teal-dark`, texto `warm-white`, usado em CTA sobre papel ou card claro.
- **Outline hero:** `bg-warm-white/10`, borda `warm-white/30`, texto `warm-white`; só em hero escuro ou imagem com overlay.

### Chips

- **Section eyebrow:** Texto plain em caixa alta, sem pill, fundo ou borda. Em fundo claro usa `copper`; em fundo escuro usa `gold-light`.
- **Risk cue:** Texto uppercase com bolinha sólida, sem fundo translúcido, usado apenas para urgência real.
- **Nav active:** Texto `gold` e sublinha curta animada. Links featured usam `copper` em header sólido e `gold-light` no hero.

### Cards / Containers

- **Service card:** Card com imagem no topo, `rounded-[1.5rem]`, borda `warm-border`, fundo `warm-white`, hover com lift e borda `copper/35`.
- **Command panel:** Painel teal escuro sólido com borda sutil, `rounded-[2rem]`, ícones soltos em ouro e texto branco quente.
- **Legal paper container:** Superfície clara em papel quente, sem radiais decorativos, para documentos legais e contato.
- **Contact info row:** Ícone solto em `copper`, texto compacto e borda quente.
- **No nested cards:** Se um bloco já está dentro de painel, o item interno deve ser linha, lista ou bloco tonal, não outro card decorativo completo.

### Inputs / Fields

- **Style:** `h-11`, borda `warm-border`, fundo `warm-white`; campos legados com `bg-white` devem migrar para neutro quente quando tocados.
- **Focus:** Borda `copper`, ring `copper/20`, outline global de 3px para acessibilidade.
- **Selects:** Mesmo corpo visual dos inputs; texto `text-dark`, sombra interna muito leve.
- **Error / Disabled:** Usar `destructive` apenas quando houver erro real. Disabled reduz opacidade e remove interação.

### Navigation

- **Desktop header:** Transparente no topo do hero; vira `warm-white` com borda `warm-border/80` e sombra leve ao scroll ou hover.
- **Mobile sheet:** Fundo `warm-white`, orientação com divisor cobre e lista vertical de links com alto toque.
- **Logo:** Inverte para branco apenas sobre hero escuro; em estado sólido usa o arquivo original.
- **CTA:** "Falar agora" usa cobre e fica sempre disponível no desktop.

### Signature Components

- **SectionHeading:** Eyebrow, título e descrição com alinhamento `center` ou `left`, tom claro ou escuro. Deve ser usado antes de criar novos headers manuais.
- **StepLeadForm:** Formulário de triagem em quatro passos, com contexto de campanha preservado no envio e CTA cobre.
- **LegalDocumentLayout:** Layout de duas colunas com aside sticky em `command-panel` e conteúdo em papel jurídico.
- **WhatsApp FAB:** Verde WhatsApp real, fixo no canto. É exceção deliberada à paleta.

## Do's and Don'ts

### Do:

- **Do** usar OKLCH como formato canônico dos tokens visuais no código.
- **Do** manter o site público como superfície `brand`, com design tratado como produto de confiança.
- **Do** usar `Field Command` como lógica visual: painel, prioridade, prova e ação clara.
- **Do** usar `SectionHeading`, `StepLeadForm` e `LegalDocumentLayout` antes de criar variações soltas.
- **Do** reservar `copper` para conversão e `gold` para confiança, prova e leitura em painel escuro.
- **Do** manter texto corrido em 65 a 75 caracteres e CTAs legíveis no mobile.
- **Do** respeitar `prefers-reduced-motion`; animação deve enriquecer, não carregar significado essencial.
- **Do** usar imagens reais de equipe, escritório, agronegócio ou contexto jurídico quando a página pede prova visual.

### Don't:

- **Don't** usar dashboards SaaS escuros, glassmorphism decorativo ou métricas hero gigantes.
- **Don't** transformar labels, eyebrows ou blocos laterais em pílulas translúcidas quando texto direto resolve.
- **Don't** parecer escritório corporativo frio ou banco tradicional, especialmente com cinza azulado estéril.
- **Don't** usar gradiente em texto (`background-clip: text`). Use cor sólida, peso e escala.
- **Don't** repetir grids de cards idênticos com ícone, título e texto sem variação de hierarquia, imagem ou ritmo.
- **Don't** abrir modais quando scroll inline, seção dedicada ou progressive disclosure resolvem.
- **Don't** aplicar borda lateral colorida maior que 1px em cards, listas ou alertas.
- **Don't** usar ouro como wallpaper ou preencher telas inteiras com dourado.
- **Don't** tratar `index.html` ou qualquer painel escuro interno como referência visual da marca pública.
- **Don't** reintroduzir `next/font/google` sem motivo forte; a stack local foi escolhida para estabilidade do dev server.
