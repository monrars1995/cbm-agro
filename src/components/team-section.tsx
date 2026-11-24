"use client";

import { motion, type Variants } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const team = [
  {
    name: "Dr. Carlos Benjamim Morais",
    role: "Advogado & CEO",
    initials: "CM",
    gradient: "from-cbm-green to-cbm-green-dark",
  },
  {
    name: "Dra. Zaíne Soto",
    role: "Advogada",
    initials: "ZS",
    gradient: "from-cbm-gold to-cbm-gold-light",
  },
  {
    name: "Dr. Lucas Carvalho",
    role: "Advogado",
    initials: "LC",
    gradient: "from-cbm-green to-cbm-green-dark",
  },
  {
    name: "Dr. Ailton Tanon",
    role: "Advogado",
    initials: "AT",
    gradient: "from-cbm-gold to-cbm-gold-light",
  },
  {
    name: "Dra. Jéssica Machado",
    role: "Advogada",
    initials: "JM",
    gradient: "from-cbm-green to-cbm-green-dark",
  },
  {
    name: "Dra. Rebeca Lobo",
    role: "Advogada",
    initials: "RL",
    gradient: "from-cbm-gold to-cbm-gold-light",
  },
  {
    name: "Lucas Aquino",
    role: "Executivo de Negócios",
    initials: "LA",
    gradient: "from-cbm-green to-cbm-green-dark",
  },
  {
    name: "Letícia Aquino",
    role: "Setor Financeiro",
    initials: "LE",
    gradient: "from-cbm-gold to-cbm-gold-light",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function TeamSection() {
  return (
    <section id="equipe" className="py-20 md:py-28 bg-background">
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
            Nossa Equipe
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nosso Time de{" "}
            <span className="text-cbm-green">Especialistas</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Equipe multidisciplinar com expertise em Direito Bancário e
            Agronegócio
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {team.map((member) => (
            <motion.div key={member.name} variants={cardVariants}>
              <Card className="group border border-border/50 bg-card hover:border-cbm-green/20 hover:shadow-lg hover:shadow-cbm-green/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <CardContent className="p-5 md:p-6 flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-cbm-green/20 to-cbm-gold/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-125" />
                    <Avatar className="h-20 w-20 md:h-24 md:w-24 ring-4 ring-cbm-sage group-hover:ring-cbm-green/20 transition-all duration-300">
                      <AvatarFallback
                        className={`bg-gradient-to-br ${member.gradient} text-white text-lg md:text-xl font-bold`}
                      >
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Name */}
                  <h3 className="font-bold text-foreground text-sm md:text-base mb-1 leading-tight">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="text-muted-foreground text-xs md:text-sm">
                    {member.role}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
