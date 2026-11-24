# Navegação e dados estruturados das novas LPs de serviço

**Atualizado em:** 2026-09-17
**Status:** navegação concluída; auditoria estrutural de JSON-LD permanece como trabalho futuro separado.

## Contexto

As três LPs de serviços estruturais possuem as rotas:

- `/recuperacao-judicial-produtor-rural`
- `/contencioso-tributario-rural`
- `/planejamento-defesa-patrimonial`

## Navegação concluída

As três rotas estão vinculadas por anchors HTML diretos em:

1. Mini-links 04–06 do Hero (`src/components/cbm/Hero.tsx`);
2. Cards correspondentes do carrossel de serviços (`src/components/cbm/Services.tsx`);
3. Grupo mobile **"Rotas de defesa"** no Header (`src/components/cbm/Header.tsx`);
4. Coluna **"Serviços"** do Footer (`src/components/cbm/Footer.tsx`);
5. Sitemap estático (`STATIC_PUBLIC_PATHS` em `src/lib/artigos/seo.ts`).

O Header desktop não enumera serviços individuais: ele mantém o link para a seção `/#servicos`. Nenhum dropdown desktop adicional foi criado.

O Sheet do Header mobile possui rolagem interna (`overflow-y-auto` e `overscroll-contain`) para manter as novas rotas e o CTA acessíveis em viewports baixos.

## Metadata e FAQ

Cada LP tem title, description, canonical e OpenGraph URL próprios. A resposta visível da FAQ "Quais são os principais serviços da CBM?" e o `acceptedAnswer` correspondente no `FAQPage` global citam os sete serviços com texto idêntico.

## Dívida técnica futura: auditoria de JSON-LD global

O JSON-LD é injetado exclusivamente por `src/app/layout.tsx`; Header e Footer não injetam dados estruturados.

O layout raiz ainda injeta entidades específicas da home (`WebPage`, `BreadcrumbList` e `FAQPage`) em todas as rotas. Além disso, o `WebSite` declara um `SearchAction` para `/busca`, rota que não existe. Essa auditoria fica fora desta entrega porque o grafo global já foi validado em produção.

### Escopo recomendado para a auditoria futura

1. Capturar JSON-LD e HTML de produção como baseline de regressão.
2. Separar entidades globais (`Organization`/`LegalService` e `WebSite`) das entidades exclusivas da home.
3. Avaliar `WebPage`, breadcrumb e FAQ da home no escopo correto, mantendo paridade com conteúdo visível.
4. Remover ou implementar o `SearchAction` somente após validação explícita.
5. Validar home, páginas legais e LPs no Schema Markup Validator e Rich Results Test.
6. Executar build, typecheck, lint e Lighthouse antes de qualquer deploy.

Essa auditoria requer autorização explícita e não deve ser combinada com uma feature de navegação ou conteúdo.