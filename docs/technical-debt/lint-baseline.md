# Baseline de lint preexistente

## Status

Dívida técnica conhecida, aceita temporariamente durante a entrega da área de Artigos. Não faz parte do escopo desta entrega e não deve ser corrigida incidentalmente sem revisão específica.

## Ocorrências registradas

O comando `npm run lint` falha atualmente em dois pontos que já existiam antes da integração da home com `/artigos`:

1. `src/components/cbm/CookieConsent.tsx:73`
   - Regra: `react-hooks/set-state-in-effect`
   - Situação: `setPreferences(stored)` e `setHasChoice(true)` são chamados de forma síncrona dentro de um `useEffect` após carregar o consentimento armazenado.

2. `src/components/ui/carousel.tsx:98`
   - Regra: `react-hooks/set-state-in-effect`
   - Situação: `onSelect(api)` é chamado de forma síncrona dentro de um `useEffect` após a API do carousel estar disponível.

## Evidências de não regressão

- Os dois arquivos não possuem diff em relação a `origin/feature/blog` nesta entrega.
- A alteração da Task 8 ficou restrita a `src/components/cbm/Blog.tsx` e adiciona o botão `Ver todos os artigos` para `/artigos`.
- `Blog.tsx` passa no lint isoladamente.
- `npm run typecheck` e `npm test` passam com a área de Artigos implementada.

## Critério para revisitar

Revisitar em uma entrega independente quando houver autorização para alterar componentes existentes de consentimento e carousel. A correção deve:

1. reproduzir cada aviso com teste ou cenário isolado;
2. preservar o comportamento de consentimento, tracking e carousel;
3. verificar lint, typecheck, testes e build;
4. ser revisada separadamente da funcionalidade de Artigos.
