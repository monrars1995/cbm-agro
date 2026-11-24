import type { Metadata } from 'next'
import { DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl } from './site'

interface PageMetadataInput {
  /** Caminho a partir da raiz, por exemplo `/defesa-execucao-rural`. */
  path: string
  title: string
  description: string
  /** Título para redes sociais, se diferente do title. */
  socialTitle?: string
  socialDescription?: string
  noindex?: boolean
}

/**
 * Metadata padrão de uma página: canonical próprio, OpenGraph e Twitter.
 * Toda página pública deve usar este helper para não herdar o canonical da home.
 */
export function createPageMetadata({
  path,
  title,
  description,
  socialTitle,
  socialDescription,
  noindex = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path)
  const ogTitle = socialTitle ?? `${title} | ${SITE_NAME}`
  const ogDescription = socialDescription ?? description

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      url,
      title: ogTitle,
      description: ogDescription,
      siteName: SITE_NAME,
      locale: 'pt_BR',
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [DEFAULT_OG_IMAGE.url],
    },
  }
}
