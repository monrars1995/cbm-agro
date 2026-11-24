import { describe, expect, it } from 'vitest'
import { SERVICES } from '../services'
import { createServiceJsonLd } from '../service-jsonld'

const services = Object.values(SERVICES)

describe('dados de SEO das páginas de serviço', () => {
  it.each(services)('$slug tem title e description dentro do limite exibido pelo Google', (service) => {
    expect(service.title.length).toBeLessThanOrEqual(60)
    expect(service.description.length).toBeGreaterThanOrEqual(110)
    expect(service.description.length).toBeLessThanOrEqual(160)
  })

  it.each(services)('$slug tem etapas, documentos e FAQ', (service) => {
    expect(service.steps.length).toBeGreaterThanOrEqual(3)
    expect(service.documents.length).toBeGreaterThanOrEqual(3)
    expect(service.faq.length).toBeGreaterThanOrEqual(3)
  })

  it.each(services)('$slug só aponta para serviços que existem', (service) => {
    for (const related of service.relatedServices) {
      expect(SERVICES[related]).toBeDefined()
      expect(related).not.toBe(service.slug)
    }
  })

  it('não repete o termo principal entre páginas (evita canibalização)', () => {
    const keywords = services.map((service) => service.primaryKeyword)
    expect(new Set(keywords).size).toBe(keywords.length)
  })

  it('não usa linguagem vedada pelo Provimento 205/2021 nos textos de SEO', () => {
    const text = JSON.stringify(services).toLowerCase()
    for (const term of ['gratuit', 'garantimos', 'garantia de resultado', '100%', 'blindagem', 'o melhor escritório']) {
      expect(text).not.toContain(term)
    }
  })

  it('gera JSON-LD com Service, BreadcrumbList e FAQPage no domínio oficial', () => {
    const graph = createServiceJsonLd(SERVICES['defesa-execucao-rural'])['@graph']
    const types = graph.map((node) => node['@type'])
    expect(types).toEqual(['WebPage', 'Service', 'BreadcrumbList', 'FAQPage'])
    expect(JSON.stringify(graph)).toContain('https://cbmagro.com.br/defesa-execucao-rural')
  })
})
