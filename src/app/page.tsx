import Header from "@/components/cbm/Header";
import Hero from "@/components/cbm/Hero";
import Services from "@/components/cbm/Services";
import About from "@/components/cbm/About";
import Values from "@/components/cbm/Values";
import Stats from "@/components/cbm/Stats";
import Team from "@/components/cbm/Team";
import Testimonials from "@/components/cbm/Testimonials";
import Blog from "@/components/cbm/Blog";
import Faq from "@/components/cbm/Faq";
import CTABanner from "@/components/cbm/CTABanner";
import Contact from "@/components/cbm/Contact";
import Footer from "@/components/cbm/Footer";
import ScrollTracker from "@/components/cbm/ScrollTracker";
import JsonLd from "@/components/artigos/JsonLd";
import type { Metadata } from "next";
import { createHomeFaqPageNode } from "@/lib/home-faq";
import { ORGANIZATION_ID, SITE_NAME, SITE_URL, WEBSITE_ID } from "@/lib/site";
import { createPageMetadata } from "@/lib/page-metadata";

const HOME_TITLE = "CBM Agro e Gestão de Passivos | Advocacia Especializada em Direito Bancário e Agrário";
const HOME_DESCRIPTION =
  "Escudo jurídico do produtor rural: Direito Bancário e Agrário. Alongamento, defesa em execução, busca e apreensão e renegociação de dívidas. Atendimento em todo o Brasil.";

export const metadata: Metadata = {
  ...createPageMetadata({
    path: "/",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    socialTitle: HOME_TITLE,
  }),
  // A home usa o título completo, sem o sufixo do template.
  title: { absolute: HOME_TITLE },
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: HOME_DESCRIPTION,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANIZATION_ID },
      inLanguage: "pt-BR",
    },
    createHomeFaqPageNode(SITE_URL),
  ],
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollTracker />
      <Header />
      <main className="flex-1" role="main">
        <Hero />
        <Services />
        <About />
        <Values />
        <Stats />
        <Team />
        <Testimonials />
        <Blog />
        <Faq />
        <CTABanner
          title="Não assine renegociação abusiva sob pressão do banco"
          description="Antes de ceder terra, maquinário ou aceitar juros sobre juros, fale com quem domina a lei do crédito rural. Consulta gratuita com especialistas em defesa do produtor."
          buttonText="Quero Meu Escudo Jurídico"
          variant="dark"
          sectionId="cta_contato"
        />
        <Contact />
        <CTABanner
          title="Seu patrimônio não pode esperar o próximo vencimento"
          description="Cada dia sem estratégia jurídica aumenta o risco de execução, protesto e perda do que você levou uma vida para construir. Você não está sozinho."
          buttonText="Agendar Consulta Gratuita"
          variant="gold"
          sectionId="cta_final"
        />
      </main>
      <Footer />
      <JsonLd data={homeJsonLd} />
    </div>
  );
}
