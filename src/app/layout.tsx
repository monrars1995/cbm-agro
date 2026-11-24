import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import CookieConsent from "@/components/cbm/CookieConsent";

const SITE_URL = "https://cbmgestaodepassivos.com.br";
const SITE_NAME = "CBM Agro e Gestão de Passivos";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.jpg`;
const PHONE = "+557196772343";

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
  alternates: {
    canonical: SITE_URL,
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
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "CBM Agro e Gestão de Passivos, Advocacia Especializada",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CBM Agro e Gestão de Passivos | Advocacia Especializada",
    description:
      "Referência em Direito Bancário e Agrário. Soluções estratégicas para gestão de passivos, renegociação de dívidas e defesa de produtores rurais.",
    images: [DEFAULT_OG_IMAGE],
    creator: "@cbmagro",
  },
  verification: {
    google: "google-site-verification-code",
  },
  category: "advocacia",
  other: {
    "geo.region": "BR-BA",
    "geo.placename": "Feira de Santana",
    "geo.position": "-12.2669;-38.9669",
    ICBM: "-12.2669, -38.9669",
  },
};

// JSON-LD: Organization + LegalService + LocalBusiness
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LegalService", "Organization"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: "CBM Agro",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
        width: 200,
        height: 193,
      },
      image: DEFAULT_OG_IMAGE,
      description:
        "Advocacia especializada em Direito Bancário e Agrário. Gestão de passivos, renegociação de dívidas e proteção de produtores rurais.",
      telephone: PHONE,
      email: "contato@cbmgestaodepassivos.com.br",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Av. Getúlio Vargas, 3233, Edf Trade Center, Sala 401 e 402 - Santa Monica",
        addressLocality: "Feira de Santana",
        addressRegion: "BA",
        postalCode: "44075-000",
        addressCountry: "BR",
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
      priceRange: "$$",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "08:00",
          closes: "18:00",
        },
      ],
      sameAs: [
        "https://www.instagram.com/cbmgestaodepassivos",
        "https://www.linkedin.com/company/cbm-gestao-de-passivos",
        "https://www.facebook.com/cbmgestaodepassivos",
      ],
      foundingDate: "2009",
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        minValue: 30,
        maxValue: 50,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços Jurídicos",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Defesa contra Cobrança e Execução Judicial",
              description:
                "Proteção contra cobranças abusivas e execuções judiciais com estratégias personalizadas.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Renegociação e Redução de Dívidas",
              description:
                "Renegociação de dívidas judiciais e extrajudiciais com condições favoráveis.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Defesa para Produtores Rurais Endividados",
              description:
                "Suporte jurídico especializado para produtores rurais em dificuldades financeiras.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Defesa contra Busca e Apreensão",
              description:
                "Proteção legal contra busca e apreensão de veículos, maquinários e bens essenciais.",
            },
          },
        ],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "3",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description:
        "Advocacia especializada em Direito Bancário e Agrário.",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/busca?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "CBM Agro e Gestão de Passivos | Advocacia Especializada",
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${SITE_URL}/#organization`,
      },
      description:
        "Advocacia especializada em Direito Bancário e Agrário. Gestão de passivos, renegociação de dívidas e proteção de produtores rurais em todo o Brasil.",
      inLanguage: "pt-BR",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "CBM Agro e Gestão de Passivos",
          item: SITE_URL,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "O que é gestão de passivos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Gestão de passivos é o processo estratégico de administrar, renegociar e reduzir dívidas, buscando condições mais favoráveis e protegendo o patrimônio do devedor por meio de soluções jurídicas especializadas.",
          },
        },
        {
          "@type": "Question",
          name: "Como a CBM ajuda produtores rurais?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A CBM oferece suporte jurídico completo para produtores rurais endividados, protegendo suas terras, equipamentos e meio de subsistência contra execuções judiciais e cobranças abusivas, além de renegociar dívidas agrícolas com condições favoráveis.",
          },
        },
        {
          "@type": "Question",
          name: "A CBM atende em todo o Brasil?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sim, a CBM Agro e Gestão de Passivos atende em todo o território nacional, com escritório em Feira de Santana, Bahia, e capacidade de atuação remota para clientes de qualquer estado do Brasil.",
          },
        },
        {
          "@type": "Question",
          name: "Quais são os principais serviços da CBM?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Os principais serviços da CBM são: Defesa contra Cobrança e Execução Judicial, Renegociação e Redução de Dívidas, Defesa para Produtores Rurais Endividados, Defesa contra Busca e Apreensão de bens, Recuperação Judicial do Produtor Rural, Contencioso Tributário Rural e Planejamento e Defesa Patrimonial.",
          },
        },
      ],
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
