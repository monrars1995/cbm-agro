import { describe, expect, it, vi } from 'vitest'
import { classifyBackgroundStyle, parseColorLuminance, resolveSectionTone, elementLooksLikeImageSurface } from '../headerSurface'

describe('header surface classification', () => {
  it('classifica rgb escuro (teal-dark) como dark', () => {
    expect(classifyBackgroundStyle({ backgroundColor: 'rgb(10, 46, 54)', backgroundImage: 'none' })).toBe('dark')
  })

  it('classifica rgb claro (warm-white) como light', () => {
    expect(classifyBackgroundStyle({ backgroundColor: 'rgb(250, 247, 240)', backgroundImage: 'none' })).toBe('light')
  })

  it('classifica gradiente escuro em hex+alpha como dark', () => {
    expect(classifyBackgroundStyle({
      backgroundColor: 'rgba(0, 0, 0, 0)',
      backgroundImage: 'linear-gradient(112deg, #001518eb 0%, #031f20d6 44%, #0b2f3194 76%, #001518e0 100%)',
    })).toBe('dark')
  })

  it('classifica gradiente escuro em lab() como dark', () => {
    expect(classifyBackgroundStyle({
      backgroundColor: 'rgba(0, 0, 0, 0)',
      backgroundImage: 'linear-gradient(112deg, lab(5.48989% -6.75846 -4.11196/.92) 0%, lab(9.86211% -10.7749 -3.97084/.84) 44%, lab(16.8685% -12.5438 -5.16202/.58) 76%)',
    })).toBe('dark')
  })

  it('classifica gradiente escuro em oklch decimal sem percentual como dark', () => {
    expect(classifyBackgroundStyle({
      backgroundColor: 'rgba(0, 0, 0, 0)',
      backgroundImage: 'linear-gradient(180deg, oklch(0.18 0.035 203) 0%, oklch(0.28 0.045 200) 100%)',
    })).toBe('dark')
  })

  it('classifica gradiente escuro em oklch com percentual como dark', () => {
    expect(classifyBackgroundStyle({
      backgroundColor: 'rgba(0, 0, 0, 0)',
      backgroundImage: 'linear-gradient(180deg, oklch(18% 0.035 203) 0%, oklch(28% 0.045 200) 100%)',
    })).toBe('dark')
  })

  it('classifica gradiente claro (legal-paper) como light', () => {
    expect(classifyBackgroundStyle({
      backgroundColor: 'rgba(0, 0, 0, 0)',
      backgroundImage: 'linear-gradient(180deg, oklch(97.5% 0.012 84) 0%, oklch(93.5% 0.018 82) 100%)',
    })).toBe('light')
  })

  it('classifica cor de fundo hex+alpha semiopaca escura como dark', () => {
    expect(classifyBackgroundStyle({ backgroundColor: '#001518eb', backgroundImage: 'none' })).toBe('dark')
  })

  it('classifica cor lab clara como light', () => {
    expect(classifyBackgroundStyle({ backgroundColor: 'lab(97.7178% .345469 3.80733)', backgroundImage: 'none' })).toBe('light')
  })

  it('classifica cor lab escura como dark', () => {
    expect(classifyBackgroundStyle({ backgroundColor: 'lab(7.25975% .55106 3.91361)', backgroundImage: 'none' })).toBe('dark')
  })

  it('classifica imagem de fundo (hero com foto) como dark', () => {
    expect(classifyBackgroundStyle({
      backgroundColor: 'rgba(0, 0, 0, 0)',
      backgroundImage: 'url("/images/hero-rural-producer.webp")',
    })).toBe('dark')
  })

  it('retorna null quando não há pista de fundo', () => {
    expect(classifyBackgroundStyle({ backgroundColor: 'rgba(0, 0, 0, 0)', backgroundImage: 'none' })).toBeNull()
  })

  it('parseColorLuminance interpreta rgb, hex8 e formatos modernos', () => {
    expect(parseColorLuminance('rgb(0, 0, 0)')).toBe(0)
    expect(parseColorLuminance('rgb(255, 255, 255)')).toBeCloseTo(1)
    expect(parseColorLuminance('oklch(18% 0.035 203)')).toBeCloseTo(0.18)
    expect(parseColorLuminance('oklch(0.18 0.035 203)')).toBeCloseTo(0.18)
    expect(parseColorLuminance('lab(5.48989% -6.75846 -4.11196/.92)')).toBeCloseTo(0.0549, 3)
    expect(parseColorLuminance('#001518')).toBeLessThan(0.1)
    expect(parseColorLuminance('#ffffff')).toBeCloseTo(1)
  })

  it('detecta elemento img como superfície de imagem', () => {
    const img = { tagName: 'IMG' } as unknown as Element
    const div = { tagName: 'DIV' } as unknown as Element

    expect(elementLooksLikeImageSurface(img)).toBe(true)
    expect(elementLooksLikeImageSurface(div)).toBe(false)
  })

  it('resolve o tom a partir da seção estrutural quando os overlays internos não definem fundo', () => {
    const section = {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      backgroundImage: 'url("/images/hero-rural-producer.webp")',
    }

    const overlay = { backgroundColor: 'rgba(0, 0, 0, 0)', backgroundImage: 'none' }
    const card = { backgroundColor: 'rgb(250, 247, 240)', backgroundImage: 'none' }

    const sectionEl = { id: 'inicio', tagName: 'SECTION' } as unknown as Element
    const overlayEl = { tagName: 'DIV' } as unknown as Element
    const cardEl = { tagName: 'DIV' } as unknown as Element
    const imgEl = { tagName: 'IMG' } as unknown as Element

    const getComputedStyleOf = vi.fn((element: Element) => {
      if (element === sectionEl) return section
      if (element === imgEl) return { backgroundColor: 'rgba(0, 0, 0, 0)', backgroundImage: 'none' }
      if (element === overlayEl) return overlay
      return card
    })

    const findStructuralAncestor = vi.fn((element: Element) => (element === cardEl || element === overlayEl || element === imgEl ? sectionEl : null))

    const tone = resolveSectionTone([imgEl, cardEl, overlayEl], getComputedStyleOf, findStructuralAncestor)

    expect(tone).toBe('dark')
  })

  it('usa o primeiro candidato com fundo definido quando a pilha traz seção e elemento interno', () => {
    const section = { backgroundColor: 'rgb(10, 46, 54)', backgroundImage: 'none' }
    const sectionEl = {} as Element
    const cardEl = {} as Element

    const tone = resolveSectionTone(
      [sectionEl, cardEl],
      vi.fn((element: Element) => (element === sectionEl ? section : { backgroundColor: 'rgba(0, 0, 0, 0)', backgroundImage: 'none' })),
      vi.fn(() => null),
    )

    expect(tone).toBe('dark')
  })
})
