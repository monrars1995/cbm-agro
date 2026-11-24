"use client";

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
    </div>
  );
}
