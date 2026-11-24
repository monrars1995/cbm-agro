import type { ServiceSeo } from './services'
import { ORGANIZATION_ID, SITE_URL, WEBSITE_ID } from './site'

/** JSON-LD de uma página de serviço: WebPage, Service, BreadcrumbList e FAQPage. */
export function createServiceJsonLd(service: ServiceSeo) {
  const url = `${SITE_URL}/${service.slug}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: service.title,
        description: service.description,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': `${url}#service` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        inLanguage: 'pt-BR',
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.name,
        serviceType: service.name,
        description: service.summary,
        url,
        provider: { '@id': ORGANIZATION_ID },
        areaServed: { '@type': 'Country', name: 'Brasil' },
        audience: { '@type': 'Audience', audienceType: 'Produtores rurais e empresas do agronegócio' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: service.name, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: service.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  }
}
