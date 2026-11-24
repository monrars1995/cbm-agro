export const DEFAULT_META_PIXEL_IDS = ['806549649835729', '573236791754746'] as const

const META_PIXEL_ID_PATTERN = /^\d{6,32}$/

export function parseMetaPixelIds(...values: Array<string | null | undefined>): string[] {
  const ids = values
    .flatMap((value) => value?.split(/[,\s]+/) || [])
    .map((value) => value.trim())
    .filter((value) => META_PIXEL_ID_PATTERN.test(value))

  return Array.from(new Set(ids))
}

export function resolveMetaPixelIds(...values: Array<string | null | undefined>): string[] {
  const configuredIds = parseMetaPixelIds(...values)

  return configuredIds.length > 0 ? configuredIds : [...DEFAULT_META_PIXEL_IDS]
}
