import { renderToStaticMarkup } from 'react-dom/server'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import Faq from '../Faq'

describe('home FAQ section', () => {
  const html = renderToStaticMarkup(<Faq />)

  it('renderiza a seção com identidade e âncora própria', () => {
    expect(html).toContain('id="faq"')
    expect(html).toContain('Perguntas frequentes')
    expect(html).toContain('aria-label')
  })

  it('exibe as quatro perguntas do FAQPage global com as respostas visíveis', () => {
    expect(html).toContain('O que é gestão de passivos?')
    expect(html).toContain('Como a CBM ajuda produtores rurais?')
    expect(html).toContain('A CBM atende em todo o Brasil?')
    expect(html).toContain('Quais são os principais serviços da CBM?')

    expect(html).toContain('processo estratégico de administrar, renegociar e reduzir dívidas')
    expect(html).toContain('suporte jurídico completo para produtores rurais endividados')
    expect(html).toContain('atende em todo o território nacional')
    expect(html).toContain('Defesa contra Cobrança e Execução Judicial')
  })

  it('mantém os novos serviços idênticos na resposta visível e no FAQPage global', () => {
    const answer = 'Os principais serviços da CBM são: Defesa contra Cobrança e Execução Judicial, Renegociação e Redução de Dívidas, Defesa para Produtores Rurais Endividados, Defesa contra Busca e Apreensão de bens, Recuperação Judicial do Produtor Rural, Contencioso Tributário Rural e Planejamento e Defesa Patrimonial.'
    const layoutSource = readFileSync(resolve(process.cwd(), 'src/app/layout.tsx'), 'utf8')

    expect(html).toContain(answer)
    expect(layoutSource).toContain(`text: "${answer}"`)
  })

  it('usa details/summary nativo com as respostas no HTML estático', () => {
    expect(html).toContain('<details')
    expect(html).toContain('<summary')
  })
})
