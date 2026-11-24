import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { renderArticleMdx } from '../mdx'
import { articleRepository } from '../repository'

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

  it('mostra como texto o link para artigo do blog que ainda não publicou', async () => {
    const source = '[guia](/blog/publicado) e [rascunho](/blog/rascunho) e [serviço](/defesa-execucao-rural)'
    const node = await renderArticleMdx(source, { linkableBlogSlugs: new Set(['publicado']) })
    const html = renderToStaticMarkup(node)

    expect(html).toContain('<a href="/blog/publicado">guia</a>')
    expect(html).not.toContain('/blog/rascunho')
    expect(html).toContain('rascunho')
    expect(html).toContain('<a href="/defesa-execucao-rural">serviço</a>')
  })

  it('compila todos os artigos, inclusive rascunhos, sem mostrar notas internas', async () => {
    // O build só pré-renderiza artigos publicados; este teste pega erro de MDX nos rascunhos antes da publicação.
    const articles = await articleRepository.getAllArticles()

    for (const article of articles) {
      const html = renderToStaticMarkup(await renderArticleMdx(article.body))
      expect(html, `${article.slug} mostra nota interna`).not.toMatch(/REVISAR|LINKS A INCLUIR/)
      expect(html.length, `${article.slug} renderizou vazio`).toBeGreaterThan(1000)
    }
  })

  it('renderiza tabelas em markdown dentro de um contêiner com rolagem', async () => {
    const html = renderToStaticMarkup(await renderArticleMdx('| Prazo | Base |\n| --- | --- |\n| 3 dias | CPC, art. 829 |'))

    expect(html).toContain('overflow-x-auto')
    expect(html).toContain('<th>Prazo</th>')
    expect(html).toContain('<td>3 dias</td>')
  })
})
