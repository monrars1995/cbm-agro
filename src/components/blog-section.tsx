"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const posts = [
  {
    title: "Agricultor em crise financeira: entenda as alternativas jurídicas antes de vender tudo",
    category: "Blog",
    excerpt:
      "Quando a produção falha, o crédito aperta e os boletos vencem, muitos agricultores pensam em vender tudo...",
    date: "15 Jan 2025",
  },
  {
    title: "Como o escritório de advocacia pode ajudar produtores a manterem sua terra",
    category: "Blog",
    excerpt:
      "Quando a crise aperta e a dívida cresce, o produtor rural começa a se preocupar com o que mais...",
    date: "10 Jan 2025",
  },
  {
    title: "Renegociação de dívidas agrícolas: o que todo produtor precisa saber",
    category: "Blog",
    excerpt:
      "A renegociação de dívidas agrícolas é um processo que pode salvar a propriedade rural...",
    date: "05 Jan 2025",
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function BlogSection() {
  return (
    <section id="blog" className="py-20 md:py-28 bg-background">
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
            Blog
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Artigos e{" "}
            <span className="text-cbm-green">Notícias</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Fique por dentro das últimas novidades em Direito Bancário, Agrário
            e gestão de passivos.
          </p>
        </motion.div>

        {/* Blog Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {posts.map((post) => (
            <motion.div key={post.title} variants={cardVariants}>
              <Card className="group h-full border border-border/50 bg-card hover:border-cbm-green/20 hover:shadow-xl hover:shadow-cbm-green/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
                {/* Top color bar */}
                <div className="h-1 bg-gradient-to-r from-cbm-green to-cbm-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-6 md:p-8 flex flex-col h-full">
                  {/* Category & Date */}
                  <div className="flex items-center gap-3 mb-4">
                    <Badge
                      variant="secondary"
                      className="bg-cbm-green/10 text-cbm-green hover:bg-cbm-green/15 font-medium text-xs"
                    >
                      {post.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-cbm-green transition-colors leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <div className="mt-6 flex items-center gap-2 text-cbm-green font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Ler artigo</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
