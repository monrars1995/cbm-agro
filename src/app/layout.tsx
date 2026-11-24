import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import CookieConsent from "@/components/cbm/CookieConsent";
import {
  DEFAULT_OG_IMAGE,
  NAP,
  ORGANIZATION_ID,
  SITE_ALTERNATE_NAME,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
  WEBSITE_ID,
} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CBM Agro e Gestão de Passivos | Advocacia Especializada em Direito Bancário e Agrário",
    template: "%s | CBM Agro e Gestão de Passivos",
  },
  description:
    "Escudo jurídico do produtor rural: Direito Bancário e Agrário. Alongamento, defesa em execução, busca e apreensão e renegociação de dívidas. Atendimento em todo o Brasil.",
  keywords: [
    "CBM Agro",
    "Gestão de Passivos",
    "Direito Bancário",
    "Direito Agrário",
    "Renegociação de Dívidas",
    "Defesa contra Cobrança",
    "Busca e Apreensão",
    "Advocacia Especializada",
    "Produtores Rurais",
    "Agronegócio",
    "Crédito Rural",
    "Execução Judicial",
    "Advogado Feira de Santana",
    "Advogado Bahia",
    "Dívida Agrícola",
    "Proteção Patrimonial",
    "Recuperação de Ativos",
    "Consultoria Jurídica",
  ],
  authors: [{ name: "CBM Agro e Gestão de Passivos", url: SITE_URL }],
  creator: "CBM Agro e Gestão de Passivos",
  publisher: "CBM Agro e Gestão de Passivos",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "CBM Agro e Gestão de Passivos | Advocacia Especializada em Direito Bancário e Agrário",
    description:
      "Referência em Direito Bancário e Agrário. Soluções estratégicas para gestão de passivos, renegociação de dívidas e defesa de produtores rurais. Atendimento em todo o Brasil.",
    siteName: SITE_NAME,
    type: "website",
    locale: "pt_BR",
    images: [{ ...DEFAULT_OG_IMAGE, type: "image/jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CBM Agro e Gestão de Passivos | Advocacia Especializada",
    description:
      "Referência em Direito Bancário e Agrário. Soluções estratégicas para gestão de passivos, renegociação de dívidas e defesa de produtores rurais.",
    images: [DEFAULT_OG_IMAGE.url],
    creator: "@cbmagro",
  },
  category: "advocacia",
  other: {
    "geo.region": "BR-BA",
    "geo.placename": "Feira de Santana",
    "geo.position": "-12.2669;-38.9669",
    ICBM: "-12.2669, -38.9669",
  },
};

// JSON-LD global: apenas entidades válidas em todas as páginas.
// Entidades específicas (WebPage, FAQPage, BlogPosting, BreadcrumbList) ficam em cada página.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LegalService", "Organization"],
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAME,
      url: `${SITE_URL}/`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
        width: 200,
        height: 193,
      },
      image: DEFAULT_OG_IMAGE.url,
      description:
        "Advocacia especializada em Direito Bancário e Agrário. Gestão de passivos, renegociação de dívidas e proteção de produtores rurais.",
      telephone: NAP.phoneE164,
      email: NAP.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${NAP.building} - ${NAP.streetAddress} - ${NAP.neighborhood}`,
        addressLocality: NAP.city,
        addressRegion: NAP.region,
        postalCode: NAP.postalCode,
        addressCountry: NAP.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -12.2669,
        longitude: -38.9669,
      },
      areaServed: {
        "@type": "Country",
        name: "Brasil",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "08:00",
          closes: "12:00",
        },
      ],
      sameAs: [...SOCIAL_PROFILES],
      foundingDate: "2009",
      knowsAbout: [
        "Direito Bancário",
        "Direito Agrário",
        "Crédito rural",
        "Alongamento de dívida rural",
        "Execução de dívida rural",
        "Busca e apreensão",
        "Recuperação judicial do produtor rural",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços Jurídicos",
        itemListElement: [
          { path: "/alongamento-de-divida-rural", name: "Alongamento de Dívida Rural" },
          { path: "/defesa-execucao-rural", name: "Defesa em Execução Rural" },
          { path: "/defesa-busca-e-apreensao-agricola", name: "Defesa contra Busca e Apreensão Agrícola" },
          { path: "/recuperacao-judicial-produtor-rural", name: "Recuperação Judicial do Produtor Rural" },
          { path: "/contencioso-tributario-rural", name: "Contencioso Tributário Rural" },
          { path: "/planejamento-defesa-patrimonial", name: "Planejamento e Defesa Patrimonial Rural" },
          { path: "/analise-elaboracao-de-contrato", name: "Análise e Elaboração de Contratos Rurais" },
        ].map(({ path, name }) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
            url: `${SITE_URL}${path}`,
            provider: { "@id": ORGANIZATION_ID },
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: "pt-BR",
      description: "Advocacia especializada em Direito Bancário e Agrário.",
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/images/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />

        {/* Theme Color */}
        <meta name="theme-color" content="#0A2E36" />
        <meta name="msapplication-TileColor" content="#0A2E36" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* GTM DataLayer Initialization */}
        <Script id="gtm-datalayer" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: 'default_consent',
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied'
            });
            window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
            window.gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500
            });
          `}
        </Script>
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Toaster />
        <CookieConsent />
      </body>
    </html>
  );
}
