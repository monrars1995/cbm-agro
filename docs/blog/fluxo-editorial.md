# Fluxo editorial do blog

Plano completo, mapa de clusters e briefings: pasta `seo-cbm/etapa-3` nos arquivos do projeto.

## Etapas de cada artigo

| Etapa | Quem | Prazo | Saída |
|---|---|---|---|
| 1. Rascunho | Redação | até 4 dias úteis antes da publicação | `content/blog/<slug>.mdx` com `draft: true`, seguindo o briefing e `docs/blog/modelo-artigo.mdx` |
| 2. Revisão jurídica | Advogado revisor | até 2 dias úteis antes | Normas e precedentes conferidos na versão vigente, checklist OAB marcado, notas `REVISAR` resolvidas e apagadas. `reviewedBy` já vem com a sociedade (CBM Advogados, OAB/BA 5.496); para assinar como advogado, troque nome e OAB e apague `kind` |
| 3. Revisão de SEO | Responsável pelo SEO | 1 dia útil antes | `seoTitle`, `description`, links obrigatórios e imagem conferidos; `npm test` passando |
| 4. Publicação | Responsável pelo site | dia previsto | `draft: false`, `publishedAt` e `updatedAt` preenchidos, deploy |
| 5. Indexação | Responsável pelo SEO | mesmo dia | Inspeção de URL no Search Console e pedido de indexação |

## Regras que os testes verificam

Para todo artigo com `updatedAt` a partir de 30/11/2026:

- tem `cluster`, `seoTitle` e `reviewedBy`;
- tem link no texto para a página de serviço do tema;
- tem link no texto para o pilar do tema, quando o pilar já estiver publicado;
- a primeira palavra-chave não repete a de outro artigo;
- não usa termos vedados (gratuito, garantimos, garantia de resultado, 100%, blindagem, o melhor escritório).

Para todos os artigos, inclusive rascunhos:

- o MDX compila (o build só gera os publicados, então o teste pega erro de rascunho antes);
- todo link `/blog/<slug>` aponta para um artigo que existe em `content/blog`, e todo outro link interno aponta para uma página de serviço;
- artigo publicado não pode ter nota `REVISAR`.

O artigo pilar precisa usar o slug definido em `src/lib/blog-clusters.ts`.

## Notas e links entre rascunhos

- **Notas para o revisor** ficam em comentários MDX: `{/* REVISAR (advogado): ... */}`. Não aparecem no site, mas o teste impede publicar enquanto houver alguma.
- **Link para artigo ainda não publicado** pode ficar no texto. Enquanto o destino for rascunho, a página publicada mostra só o texto, sem link; quando o destino publicar, o link passa a funcionar no deploy seguinte.
- **Links para artigos que ainda nem existem** ficam anotados no topo do rascunho, em `{/* LINKS A INCLUIR quando publicarem: ... */}`. Quando um artigo novo for publicado, procure o slug dele nessas notas e acrescente o link nos artigos indicados.
- **Tabelas em Markdown** são aceitas (`| coluna | coluna |`) e aparecem com rolagem lateral no celular.

## Revisão semanal (Search Console)

Toda segunda-feira, a partir da semana 3:

1. Consultas com impressões e posição entre 8 e 20: reforçar o artigo que já responde ou abrir um novo post (vagas das semanas 7 e 8).
2. Duas URLs do blog disputando a mesma consulta: juntar ou diferenciar os títulos.
3. Artigos sem impressões depois de 21 dias: revisar título, links de entrada e indexação.
