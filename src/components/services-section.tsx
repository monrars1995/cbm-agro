"use client";

import { motion, type Variants } from "framer-motion";
import { Shield, TrendingDown, Wheat, ShieldAlert, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Shield,
    title: "Defesa contra Cobrança e Execução",
    description:
      "Protegemos seu patrimônio, impedimos bloqueios e penhoras com estratégias jurídicas sólidas e eficazes.",
    color: "text-cbm-green",
    bgColor: "bg-cbm-green/10",
  },
  {
    icon: TrendingDown,
    title: "Renegociação e Redução de Dívidas",
    description:
      "Protegemos seus direitos e negociamos para reduzir sua dívida judicial com as melhores condições.",
    color: "text-cbm-gold",
    bgColor: "bg-cbm-gold/10",
  },
  {
    icon: Wheat,
    title: "Defesa para Produtores Rurais",
    description:
      "Ajudamos você a renegociar sua dívida e proteger sua propriedade rural com expertise no agronegócio.",
    color: "text-cbm-green",
    bgColor: "bg-cbm-green/10",
  },
  {
    icon: ShieldAlert,
    title: "Defesa contra Busca e Apreensão",
    description:
      "Protegemos você contra busca e apreensão de veículos, caminhões e maquinário agrícola.",
    color: "text-cbm-gold",
    bgColor: "bg-cbm-gold/10",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function ServicesSection() {
  return (
    <section id="servicos" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="inline-block text-cbm-green font-semibold text-sm uppercase tracking-wider mb-3">
            Nossos Serviços
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Como Podemos Te <span className="text-cbm-green">Ajudar?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Oferecemos soluções jurídicas completas para proteger seus direitos e seu
            patrimônio com excelência e dedicação.
          </p>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.title} variants={cardVariants}>
                <Card className="group h-full border border-border/50 bg-card hover:border-cbm-green/20 hover:shadow-xl hover:shadow-cbm-green/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6 md:p-8 flex flex-col h-full">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-2xl ${service.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`h-7 w-7 ${service.color}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-cbm-green transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                      {service.description}
                    </p>

                    {/* Learn More */}
                    <div className="mt-6 flex items-center gap-2 text-cbm-green font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Saiba mais</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
