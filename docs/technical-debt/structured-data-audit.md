# Auditoria futura de dados estruturados globais

**Registrado em:** 2026-09-03  
**Status:** trabalho futuro; não autorizado na entrega inicial de Artigos

## Contexto

`src/app/layout.tsx` injeta um grafo JSON-LD em todas as rotas. Além de entidades adequadas ao escopo global, como `Organization`, `LegalService` e `WebSite`, o grafo contém objetos específicos da página inicial: `WebPage`, `BreadcrumbList` e `FAQPage`.

Como o layout raiz envolve todas as páginas, esses objetos também aparecem em páginas legais, landing pages e futuras rotas `/artigos` e `/artigos/[slug]`. O `FAQPage` precisa ainda ser comparado com conteúdo visível equivalente, conforme as diretrizes de dados estruturados do Google.

## Decisão atual

A implementação inicial de Artigos não removerá, moverá nem modificará esse bloco. O site já está validado em produção, e o responsável priorizou uma entrega aditiva e de baixo risco.

Os novos artigos terão metadata, canonicals e schemas próprios. A redundância do grafo global será documentada como limitação conhecida, sem afirmar que os dados estruturados completos estão ideais.

## Escopo da auditoria futura

1. Capturar o JSON-LD e o HTML de produção das rotas existentes como fixtures de regressão.
2. Inventariar quais entidades pertencem ao site inteiro e quais pertencem somente à home.
3. Confirmar se cada `Question` do `FAQPage` possui conteúdo visível equivalente.
4. Definir identificadores `@id` estáveis e relações entre `Organization`, `WebSite`, `WebPage` e entidades de conteúdo.
5. Manter `Organization`/`LegalService` e `WebSite` globais.
6. Avaliar a realocação de `WebPage` e `BreadcrumbList` para a rota inicial sem reduzir as informações entregues pela home.
7. Avaliar uma seção FAQ visível ou a retirada do `FAQPage`, sempre mediante autorização explícita.
8. Validar home, páginas legais, landing pages, `/artigos` e `/artigos/[slug]` no Schema Markup Validator e no Rich Results Test.
9. Comparar antes/depois, executar build, lint, typecheck e Lighthouse.
10. Fazer essa alteração em branch e entrega próprias, sem combinar com uma feature de conteúdo.

## Critérios de autorização

Nenhuma remoção ou realocação deve ocorrer sem:

- aprovação explícita do responsável;
- evidência do comportamento atual em produção;
- testes de regressão por rota;
- validação do grafo proposto;
- plano de reversão.

## Referências

- [Google: Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google: General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Schema.org: FAQPage](https://schema.org/FAQPage)
- [Schema.org: WebPage](https://schema.org/WebPage)