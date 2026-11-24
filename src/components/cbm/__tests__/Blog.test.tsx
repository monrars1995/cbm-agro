import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import Blog from '../Blog'

describe('home blog cards', () => {
  it('torna cada card da home um link para o artigo correspondente', () => {
    const html = renderToStaticMarkup(<Blog />)

    expect(html).toContain('href="/blog/agricultor-em-crise-financeira"')
    expect(html).toContain('href="/blog/como-manter-sua-terra"')
    expect(html).toContain('href="/blog/linha-de-credito-agricola"')
  })

  it('mantém o CTA de contato por cima do link do card', () => {
    const html = renderToStaticMarkup(<Blog />)

    expect(html.match(/Falar sobre este tema/g)).toHaveLength(3)
    expect(html.match(/href="\/#contato"/g)).toHaveLength(3)
    expect(html).toContain('relative z-10')
  })
})
