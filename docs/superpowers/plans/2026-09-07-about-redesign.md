Plano de redesign — Seção Sobre (About.tsx)
=============================================

Direção escolhida: "Editorial de dossiê" (ui-ux-pro-max: editorial-grid-magazine
+ craft-floor do impeccable), mantendo o Field Command do projeto.

Diagnóstico do layout atual
- Colunas 0.9/1.1 com foto quadrada + texto: formato template (imagem | texto).
- Overlay teal/25 sobre a foto suja os rostos da equipe.
- Badge "15+" solto sobre a foto compete com as pessoas.
- 3 proof items em cards repetidos (icon+label x3) = "cards como container".
- Eyebrow "Dossiê CBM" antes do heading (ban do craft-floor).

Decisões de design (e por quê)
1. Grid editorial assimétrico 12-col: foto 7 col / texto 5 col, com a foto
   sangrando levemente para fora do grid via margem negativa no lg (assinatura
   visual da seção) — sem gradient overlay, sem badge sobre a foto.
2. Figura + figcaption: caption editorial "Equipe CBM em Feira de Santana"
   (impeccable: browser surfaces/copy; a foto ganha contexto real).
3. Micro-dossiê: os 3 proof items viram linhas tipográficas com numeração
   romana discreta (I. II. III.) — a sequência NÃO é decorativa, é a ordem do
   método CBM (escuta → prova → atuação); separadas por hairlines, sem cards.
4. "15+ anos" sai da foto e vira linha de dados tabulares no bloco de texto,
   junto a "Atendimento nacional" — dados, não métricas de vaidade (Stats
   continua sendo a seção de números animados).
5. Eyebrow removido; o H2 fala por si. CTA mantém comportamento/tracking.
6. Motion: um único momento — a foto entra com clip-path suave; texto em fade
   curto. Nada de scale/hover decorativo.
7. Acessibilidade: contrastes ≥4.5:1 (texto base #191610 em fundo paper),
   focus ring cobre já global, figure/figcaption semânticos.

Restrições
- Tokens existentes (teal-dark, copper, paper, warm-white); nenhuma cor nova.
- Copy preservada (apenas reordenada); nenhuma promessa nova.
- Não tocar em Header/Footer/Stats/Blog.
