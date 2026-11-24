import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { renderArticleMdx } from '../mdx'

describe('renderArticleMdx', () => {
  it('renderiza headings, lista e link externo seguro', async () => {
    const node = await renderArticleMdx('# Título\n\n- Item\n\n[BCB](https://www.bcb.gov.br/)')
    const html = renderToStaticMarkup(node)

    expect(html).toContain('<h1')
    expect(html).toContain('<li>Item</li>')
    expect(html).toContain('rel="noopener noreferrer"')
  })

  it('renderiza Callout permitido', async () => {
    const node = await renderArticleMdx('<Callout title="Atenção">Analise o caso concreto.</Callout>')

    expect(renderToStaticMarkup(node)).toContain('Atenção')
  })
})
