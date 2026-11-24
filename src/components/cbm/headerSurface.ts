const HEX_PATTERN = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i
const MODERN_COLOR_LIGHTNESS_PATTERN = /(?:oklch|oklab|lab|lch)\(\s*([\d.]+)\s*%?/i

export type SurfaceTone = 'dark' | 'light'

export interface BackgroundStyle {
  backgroundColor: string
  backgroundImage: string
}

export function parseColorLuminance(color: string): number | null {
  const trimmed = color.trim()

  if (HEX_PATTERN.test(trimmed)) {
    let hex = trimmed.slice(1)
    if (hex.length === 3 || hex.length === 4) {
      hex = hex.split('').map((char) => char + char).join('')
    }
    const value = Number.parseInt(hex, 16)

    if (hex.length === 8) {
      const alpha = (value & 0xff) / 255
      if (alpha < 0.15) {
        return null
      }
      const red = (value >> 24) & 0xff
      const green = (value >> 16) & 0xff
      const blue = (value >> 8) & 0xff
      return (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255
    }

    const red = (value >> 16) & 0xff
    const green = (value >> 8) & 0xff
    const blue = value & 0xff
    return (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255
  }

  const rgbMatch = trimmed.match(/^rgba?\(\s*([^)]+)\)$/i)
  if (rgbMatch) {
    const components = rgbMatch[1].split(/[\s,/]+/).filter(Boolean)
    const red = components[0]
    const green = components[1]
    const blue = components[2]
    const alpha = components.length >= 4 ? Number.parseFloat(components[3]) : 1
    if (alpha < 0.15) {
      return null
    }
    return (0.2126 * Number(red) + 0.7152 * Number(green) + 0.0722 * Number(blue)) / 255
  }

  const modernMatch = trimmed.match(MODERN_COLOR_LIGHTNESS_PATTERN)
  if (modernMatch) {
    const rawLightness = Number.parseFloat(modernMatch[1])
    const alphaMatch = trimmed.match(/\/\s*([\d.]+)\s*\)/)
    const alpha = alphaMatch ? Number.parseFloat(alphaMatch[1]) : 1
    if (alpha < 0.15) {
      return null
    }

    const isPercentage = /%/.test(trimmed.slice(0, trimmed.indexOf(modernMatch[1]) + modernMatch[1].length + 1))
    return isPercentage ? rawLightness / 100 : rawLightness
  }

  return null
}

const DARK_LUMINANCE_THRESHOLD = 0.45

export function classifyBackgroundStyle(style: BackgroundStyle): SurfaceTone | null {
  const backgroundColorLuminance = parseColorLuminance(style.backgroundColor)

  if (backgroundColorLuminance !== null) {
    return backgroundColorLuminance < DARK_LUMINANCE_THRESHOLD ? 'dark' : 'light'
  }

  const image = style.backgroundImage.trim()

  if (image === 'none' || image === '') {
    return null
  }

  if (/^url\(/i.test(image)) {
    return 'dark'
  }

  const gradientColors = image.match(/(?:rgba?|hsla?|oklch|oklab|lab|lch|color)\([^)]*\)|#[0-9a-f]{3,8}/gi) ?? []
  const luminances = gradientColors
    .map((color) => parseColorLuminance(color))
    .filter((luminance): luminance is number => luminance !== null)

  if (luminances.length === 0) {
    return null
  }

  const averageLuminance = luminances.reduce((total, luminance) => total + luminance, 0) / luminances.length
  return averageLuminance < DARK_LUMINANCE_THRESHOLD ? 'dark' : 'light'
}

export function elementLooksLikeImageSurface(element: Element): boolean {
  return element.tagName === 'IMG'
}

interface ProbeElement {
  backgroundColor: string
  backgroundImage: string
}

export function resolveSectionTone(
  stack: Element[],
  getComputedStyleOf: (element: Element) => ProbeElement,
  findStructuralAncestor: (element: Element) => Element | null,
): SurfaceTone | null {
  const structural = new Set<Element>()

  for (const element of stack) {
    const ancestor = findStructuralAncestor(element)
    if (ancestor) {
      structural.add(ancestor)
    }
  }

  const internalWithBackground: Element[] = []

  for (const element of stack) {
    if (structural.has(element)) {
      continue
    }

    if (elementLooksLikeImageSurface(element)) {
      internalWithBackground.push(element)
      continue
    }

    const style = getComputedStyleOf(element)
    const tone = classifyBackgroundStyle({
      backgroundColor: style.backgroundColor,
      backgroundImage: style.backgroundImage,
    })

    if (tone !== null) {
      internalWithBackground.push(element)
    }
  }

  for (const ancestor of structural) {
    const style = getComputedStyleOf(ancestor)
    const tone = classifyBackgroundStyle({
      backgroundColor: style.backgroundColor,
      backgroundImage: style.backgroundImage,
    })

    if (tone !== null) {
      return tone
    }
  }

  if (structural.size > 0 && internalWithBackground.length > 0) {
    return 'dark'
  }

  for (const element of internalWithBackground) {
    const style = getComputedStyleOf(element)
    const tone = classifyBackgroundStyle({
      backgroundColor: style.backgroundColor,
      backgroundImage: style.backgroundImage,
    })

    if (tone !== null) {
      return tone
    }
  }

  return null
}
