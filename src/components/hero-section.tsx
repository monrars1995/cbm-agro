"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-cbm-green-deeper/95 via-cbm-green-dark/85 to-cbm-green-deeper/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-cbm-green-deeper/60 via-transparent to-transparent" />

      {/* Subtle Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge
              variant="outline"
              className="mb-6 px-4 py-2 text-sm font-medium border-cbm-gold/40 text-cbm-gold bg-cbm-gold/10 backdrop-blur-sm"
            >
              <Phone className="h-3.5 w-3.5 mr-2" />
              Excelência em Direito Bancário e Agrário
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Gestão de Passivos e{" "}
            <span className="text-cbm-gold">Direito Agrário</span> com Excelência
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Na CBM Agro e Gestão de Passivos, garantimos negociações seguras e
            soluções personalizadas para proteger seu patrimônio e fortalecer a
            saúde financeira de sua empresa.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-cbm-gold hover:bg-cbm-gold-light text-cbm-green-deeper font-bold text-base px-8 py-6 rounded-xl shadow-lg shadow-cbm-gold/25 transition-all hover:shadow-xl hover:shadow-cbm-gold/30 hover:scale-[1.02]"
            >
              <a href="#contato" className="flex items-center gap-2">
                Fale com um Advogado
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 hover:text-white font-semibold text-base px-8 py-6 rounded-xl backdrop-blur-sm transition-all"
            >
              <a href="#servicos" className="flex items-center gap-2">
                Conheça Nossos Serviços
              </a>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/60 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 bg-cbm-gold/50 rounded-full" />
              <span>+3.000 Clientes Atendidos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 bg-cbm-gold/50 rounded-full" />
              <span>+30.000 Atendimentos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 bg-cbm-gold/50 rounded-full" />
              <span>Atuação Nacional</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 50L48 45.7C96 41.3 192 32.7 288 30.2C384 27.7 480 31.3 576 38.5C672 45.7 768 56.3 864 58.8C960 61.3 1056 55.7 1152 48.5C1248 41.3 1344 32.7 1392 28.3L1440 24V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z"
            fill="oklch(0.985 0.002 150)"
          />
        </svg>
      </div>
    </section>
  );
}
