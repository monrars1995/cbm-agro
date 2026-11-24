import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import Services from '../Services'

describe('home services carousel', () => {
  const html = renderToStaticMarkup(<Services />)

  it('mantém os oito serviços disponíveis no carrossel', () => {
    expect(html).toContain('Defesa contra Cobrança e Execução Judicial')
    expect(html).toContain('Renegociação e Redução de Dívidas')
    expect(html).toContain('Defesa para Produtores Rurais Endividados')
    expect(html).toContain('Defesa contra Busca e Apreensão')
    expect(html).toContain('Recuperação Judicial do Produtor Rural')
    expect(html).toContain('Contencioso Tributário Rural')
    expect(html).toContain('Planejamento e Defesa Patrimonial')
    expect(html).toContain('Assessoria na elaboração e análise de contratos rurais')
  })

  it('renderiza a estrutura de carrossel acessível do projeto', () => {
    expect(html).toContain('role="region"')
    expect(html).toContain('aria-roledescription="carousel"')
    expect(html).toContain('data-slot="carousel-item"')
  })

  it('cada slide mantém role group e label próprio em pt-BR', () => {
    expect((html.match(/aria-roledescription="slide"/g) ?? []).length).toBe(8)
    expect(html).toContain('Serviço 1 de 8')
    expect(html).toContain('Serviço 8 de 8')
  })

  it('exibe um card por vez no tamanho compacto original', () => {
    expect((html.match(/basis-full/g) ?? []).length).toBe(8)
    expect(html).toContain('sm:grid-cols-[10rem_minmax(0,1fr)]')
    expect(html).toContain('min-h-40')
    expect(html).not.toContain('sm:basis-1/2')
  })

  it('exibe mini pagination com dots clicáveis e setas', () => {
    expect(html).toContain('data-slot="carousel-previous"')
    expect(html).toContain('data-slot="carousel-next"')
    expect((html.match(/bg-copper/g) ?? []).length).toBeGreaterThanOrEqual(1)
    expect(html).not.toContain('aria-live="polite"')
  })

  it('possui autoplay de 5s que pausa no hover', () => {
    expect(html).not.toContain('Pausar rotação automática')
    expect(html).not.toContain('aria-pressed')
    expect(html).toContain('data-slot="carousel"')
  })
})
