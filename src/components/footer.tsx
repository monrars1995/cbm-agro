"use client";

import { motion } from "framer-motion";
import {
  Scale,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Facebook,
  Instagram,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { LAW_FIRM } from "@/lib/site";

const servicesLinks = [
  "Defesa contra Cobrança",
  "Renegociação de Dívidas",
  "Defesa para Produtores Rurais",
  "Defesa contra Busca e Apreensão",
];

const companyLinks = [
  "Sobre Nós",
  "Nossa Equipe",
  "Blog",
  "Política de Privacidade",
];

const contactInfo = [
  {
    icon: MapPin,
    text: "Av. Getúlio Vargas, 3233, Edf Trade Center, Sala 401 e 402 - Santa Mônica, Feira de Santana - BA, 44042-010",
  },
  {
    icon: Phone,
    text: "557196772343",
    href: "tel:+557196772343",
  },
  {
    icon: Mail,
    text: "contato@cbmgestaodepassivos.com.br",
    href: "mailto:contato@cbmgestaodepassivos.com.br",
  },
];

export function Footer() {
  return (
    <footer id="contato" className="bg-cbm-green-deeper text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Logo & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="p-2 rounded-lg bg-white/10">
                  <Scale className="h-6 w-6 text-cbm-gold" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-white">CBM Agro</span>
                  <span className="text-[10px] text-white/60">
                    e Gestão de Passivos
                  </span>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Referência em Direito Bancário e Agrário. Soluções estratégicas
                para gestão de passivos.
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-cbm-gold/20 transition-colors"
                >
                  <Instagram className="h-5 w-5 text-white/80" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-cbm-gold/20 transition-colors"
                >
                  <Facebook className="h-5 w-5 text-white/80" />
                </a>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">
                Serviços
              </h3>
              <ul className="space-y-3">
                {servicesLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#servicos"
                      className="text-white/60 hover:text-cbm-gold transition-colors text-sm flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">
                Empresa
              </h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link}>
                    <a
                      href={
                        link === "Sobre Nós"
                          ? "#sobre"
                          : link === "Nossa Equipe"
                          ? "#equipe"
                          : link === "Blog"
                          ? "#blog"
                          : "#"
                      }
                      className="text-white/60 hover:text-cbm-gold transition-colors text-sm flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">
                Contato
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-start gap-3">
                      <Icon className="h-4 w-4 text-cbm-gold shrink-0 mt-0.5" />
                      {"href" in item ? (
                        <a
                          href={item.href}
                          className="text-white/60 hover:text-cbm-gold transition-colors text-sm"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span className="text-white/60 text-sm leading-relaxed">
                          {item.text}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <Separator className="bg-white/10" />
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center md:text-left">
            © 2025 CBM Agro e Gestão de Passivos. Todos os direitos reservados.
          </p>
          <p className="text-white/40 text-sm">
            Registro {LAW_FIRM.oabRegistration}
          </p>
        </div>
      </div>
    </footer>
  );
}
