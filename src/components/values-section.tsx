"use client";

import { motion, type Variants } from "framer-motion";
import {
  Sparkles,
  MapPin,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Sparkles,
    title: "Atuação Inovadora",
    description:
      "Atuação inovadora e ágil no Direito Bancário e Agrário",
  },
  {
    icon: MapPin,
    title: "Reconhecimento Nacional",
    description:
      "Reconhecimento nacional em todas as regiões do Brasil",
  },
  {
    icon: Users,
    title: "Equipe Especializada",
    description: "Equipe especializada, pronta para soluções eficazes",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function ValuesSection() {
  return (
    <section className="py-20 md:py-28 bg-cbm-green-deeper relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 1px, transparent 1px),
                           radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cbm-green/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cbm-gold/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Empatia, Credibilidade e{" "}
            <span className="text-cbm-gold">Compromisso</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg">
            Nosso compromisso é com resultados.
          </p>
        </motion.div>

        {/* Values Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12"
        >
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div key={value.title} variants={itemVariants}>
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-cbm-gold/30 transition-all duration-300 h-full">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-cbm-gold/20 flex items-center justify-center mb-6 group-hover:bg-cbm-gold/30 transition-colors duration-300">
                    <Icon className="h-7 w-7 text-cbm-gold" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 leading-relaxed text-sm md:text-base">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Commitment List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12"
        >
          <div className="flex flex-col gap-3">
            {values.map((value) => (
              <div key={value.description} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cbm-gold shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm md:text-base">
                  {value.description}
                </span>
              </div>
            ))}
          </div>

          <Button
            asChild
            size="lg"
            className="bg-cbm-gold hover:bg-cbm-gold-light text-cbm-green-deeper font-bold px-8 py-6 rounded-xl shadow-lg shadow-cbm-gold/20 hover:shadow-xl transition-all"
          >
            <a href="#contato" className="flex items-center gap-2">
              Saiba Mais
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
