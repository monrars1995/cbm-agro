"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Building2, Users, FileText, HeartHandshake } from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: 180,
    prefix: "R$ +",
    suffix: " Milhões",
    label: "Dívida Reduzida",
    color: "text-cbm-gold",
    bgColor: "bg-cbm-gold/10",
  },
  {
    icon: Users,
    value: 3000,
    prefix: "+",
    suffix: "",
    label: "Clientes Atendidos",
    color: "text-cbm-green",
    bgColor: "bg-cbm-green/10",
  },
  {
    icon: FileText,
    value: 2500,
    prefix: "+",
    suffix: "",
    label: "Processos Ativos",
    color: "text-cbm-gold",
    bgColor: "bg-cbm-gold/10",
  },
  {
    icon: HeartHandshake,
    value: 30000,
    prefix: "+",
    suffix: "",
    label: "Atendimentos Realizados",
    color: "text-cbm-green",
    bgColor: "bg-cbm-green/10",
  },
];

function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, target]);

  const formatted = count.toLocaleString("pt-BR");

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 md:py-28 bg-cbm-sage/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-cbm-green font-semibold text-sm uppercase tracking-wider mb-3">
              Sobre Nós
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Sobre a{" "}
              <span className="text-cbm-green">
                CBM Agro e Gestão de Passivos
              </span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-base md:text-lg">
              Na CBM, somos referência em Direito Bancário e Agrário e na defesa
              dos interesses empresariais. Mais do que um escritório de advocacia,
              oferecemos soluções estratégicas e inovadoras para a gestão de
              passivos e agronegócios, garantindo negociações seguras e eficazes.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 text-base md:text-lg">
              Com atuação em todo o Brasil, nossa equipe altamente qualificada
              combina expertise jurídica e visão financeira para proteger o
              patrimônio de nossos clientes.
            </p>
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-cbm-gold rounded-full" />
              <span className="text-cbm-green font-semibold">
                Empatia, Credibilidade e Compromisso
              </span>
            </div>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 md:gap-6"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                    <AnimatedCounter
                      target={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
