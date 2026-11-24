# CBM Advogados

Site público da CBM Agro e Gestão de Passivos, desenvolvido com Next.js, Tailwind CSS e componentes reutilizáveis para páginas institucionais, landing pages comerciais e documentos legais.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Integrações

O formulário envia leads para `/api/leads`, que valida o payload, cria/atualiza contato no GoHighLevel, cria oportunidade no pipeline `CBM — Captação & Qualificação` e dispara eventos de conversão quando as credenciais estiverem configuradas.

Tracking ativo:

- Google Tag Manager via `NEXT_PUBLIC_GTM_ID`.
- Meta Pixel web via `NEXT_PUBLIC_META_PIXEL_IDS`, mantendo compatibilidade com `NEXT_PUBLIC_META_PIXEL_ID`.
- Meta Conversions API via `META_PIXEL_IDS` e `META_ACCESS_TOKEN`, mantendo compatibilidade com `META_PIXEL_ID` e usando `event_id` compartilhado para deduplicação Pixel/CAPI.
- Banner de consentimento funcional: GTM, Meta Pixel, scripts de tracking e widget GHL só carregam após consentimento de análise/marketing. Rejeição explícita de marketing também impede conversões server-side opcionais.
- GoHighLevel recebe a atribuição completa do lead: URL atual, landing page, referrer, todos os parâmetros da URL, UTMs, click IDs (`gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`, `ttclid`), `sck` e cookies de mídia acessíveis no submit. Esses dados seguem no `attributionSource` do contato e também na nota estruturada de tracking.

Configure as variáveis de ambiente a partir de `.env.example`. O PIT do GoHighLevel deve ficar somente em ambiente seguro (`GHL_PRIVATE_INTEGRATION_TOKEN`) e nunca deve ser commitado.

Para Meta CAPI, o token precisa conseguir publicar em cada `/{pixel_id}/events` listado em `META_PIXEL_IDS`. Tokens com escopo somente de leitura, como `read_ads_dataset_quality`, validam o dataset mas retornam `meta_permission_or_dataset_error:token_cannot_publish_events` no envio server-side.

## Autor

- Site: [goldneuron.io](https://goldneuron.io)
- GitHub: [@monrars1995](https://github.com/monrars1995) [@DevManuelSereno](https://github.com/DevManuelSereno)

## Licença

Projeto proprietário. Consulte [LICENSE.md](./LICENSE.md).
