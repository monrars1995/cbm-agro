import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import Footer from '../Footer'

describe('footer service navigation', () => {
  it('oferece links para as três novas especialidades', () => {
    const html = renderToStaticMarkup(<Footer />)

    expect(html).toContain('href="/recuperacao-judicial-produtor-rural"')
    expect(html).toContain('href="/contencioso-tributario-rural"')
    expect(html).toContain('href="/planejamento-defesa-patrimonial"')
  })
})
