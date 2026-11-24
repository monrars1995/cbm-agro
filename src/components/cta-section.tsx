"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cbm-green via-cbm-green-dark to-cbm-green-deeper" />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cbm-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cbm-green/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cbm-gold/20 mb-8">
            <Phone className="h-8 w-8 text-cbm-gold" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Garanta mais segurança e controle financeiro nos seus negócios!
          </h2>

          <p className="text-white/70 text-base md:text-lg mb-10 max-w-2xl mx-auto">
            Entre em contato com nossa equipe e descubra como podemos ajudá-lo a
            proteger seu patrimônio e resolver suas questões jurídicas.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-cbm-gold hover:bg-cbm-gold-light text-cbm-green-deeper font-bold text-base px-10 py-6 rounded-xl shadow-lg shadow-cbm-gold/25 hover:shadow-xl hover:shadow-cbm-gold/30 transition-all hover:scale-[1.02]"
          >
            <a href="#contato" className="flex items-center gap-2">
              Entrar em Contato
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
