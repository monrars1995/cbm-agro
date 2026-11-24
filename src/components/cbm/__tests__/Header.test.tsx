import { renderToStaticMarkup } from 'react-dom/server'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import Header, { getHeaderChromeClasses, getHeaderShellClasses, headerUsesLightText } from '../Header'

describe('header chrome', () => {
  it('mantém fundo transparente no topo da página', () => {
    expect(getHeaderChromeClasses(false, false)).toContain('bg-transparent')
    expect(getHeaderChromeClasses(false, false)).not.toContain('border-b')
  })

  it('usa vidro claro translúcido sem linha quando fixo sobre superfície clara', () => {
    const classes = getHeaderChromeClasses(true, false)

    expect(classes).toContain('bg-warm-white/85')
    expect(classes).toContain('backdrop-blur-md')
    expect(classes).not.toContain('border-b')
  })

  it('usa vidro escuro translúcido quando fixo sobre superfície escura', () => {
    const classes = getHeaderChromeClasses(true, true)

    expect(classes).toContain('bg-teal-dark/80')
    expect(classes).toContain('backdrop-blur-md')
    expect(classes).not.toContain('bg-warm-white')
    expect(classes).not.toContain('border-b')
  })

  it('usa texto claro no topo da página', () => {
    expect(headerUsesLightText(false, false)).toBe(true)
  })

  it('usa texto claro sobre o vidro escuro, como no estado transparente', () => {
    expect(headerUsesLightText(true, true)).toBe(true)
  })

  it('usa texto escuro sobre o vidro claro', () => {
    expect(headerUsesLightText(true, false)).toBe(false)
  })

  describe('floating pill shell', () => {
    it('fica destacado do topo com margem e pílula plena quando não rolou', () => {
      const classes = getHeaderShellClasses(false)

      expect(classes).toContain('top-3')
      expect(classes).toContain('rounded-[2rem]')
      expect(classes).toContain('h-20')
      expect(classes).not.toContain('h-16')
    })

    it('reduz altura e arredondamento ao scrollar, mantendo a pílula', () => {
      const classes = getHeaderShellClasses(true)

      expect(classes).toContain('top-2')
      expect(classes).toContain('rounded-3xl')
      expect(classes).toContain('h-16')
    })

    it('mantém largura limitada e centralização flutuante', () => {
      const classes = getHeaderShellClasses(false)

      expect(classes).toContain('mx-auto')
      expect(classes).toContain('w-[min(72rem,calc(100%-2rem))]')
    })
  })

  it('renderiza o header com role banner', () => {
    const html = renderToStaticMarkup(<Header />)

    expect(html).toContain('role="banner"')
  })

  it('compacta o contexto da defesa no menu mobile', () => {
    const source = readFileSync(resolve(process.cwd(), 'src/components/cbm/Header.tsx'), 'utf8')

    expect(source).toContain('mt-5 border-t border-warm-border px-4 pt-3')
    expect(source).toContain('mt-1.5 text-sm leading-relaxed text-text-medium')
    expect(source).toContain('flex flex-col gap-1 mt-5')
  })

  it('oferece as três novas especialidades nas rotas de defesa mobile', () => {
    const source = readFileSync(resolve(process.cwd(), 'src/components/cbm/Header.tsx'), 'utf8')

    expect(source).toContain("label: 'Recuperação Judicial do Produtor Rural'")
    expect(source).toContain("href: '/recuperacao-judicial-produtor-rural'")
    expect(source).toContain("label: 'Contencioso Tributário Rural'")
    expect(source).toContain("href: '/contencioso-tributario-rural'")
    expect(source).toContain("label: 'Planejamento e Defesa Patrimonial'")
    expect(source).toContain("href: '/planejamento-defesa-patrimonial'")
  })

  it('usa links de navegação, não cards, nas rotas de defesa mobile', () => {
    const source = readFileSync(resolve(process.cwd(), 'src/components/cbm/Header.tsx'), 'utf8')

    expect(source).toContain('mt-2 flex flex-col gap-1')
    expect(source).toContain('rounded-xl px-4 py-3 text-base transition-colors duration-200 text-teal-dark hover:bg-warm-gray hover:text-copper')
    expect(source).not.toContain('border border-warm-border bg-paper px-4 py-3 text-sm font-semibold')
  })
})
