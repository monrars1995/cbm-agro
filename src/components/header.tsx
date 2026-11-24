"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Blog", href: "#blog" },
  { label: "Contato", href: "#contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-cbm-sage"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div
              className={`p-2 rounded-lg transition-colors ${
                scrolled ? "bg-cbm-green" : "bg-white/20 backdrop-blur-sm"
              }`}
            >
              <Scale
                className={`h-6 w-6 transition-colors ${
                  scrolled ? "text-white" : "text-white"
                }`}
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-sm md:text-base font-bold leading-tight transition-colors ${
                  scrolled ? "text-cbm-green" : "text-white"
                }`}
              >
                CBM Agro
              </span>
              <span
                className={`text-[10px] md:text-xs font-light leading-tight transition-colors ${
                  scrolled ? "text-cbm-green/70" : "text-white/80"
                }`}
              >
                e Gestão de Passivos
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-foreground/80 hover:text-cbm-green hover:bg-cbm-green/5"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className={`ml-3 font-semibold text-sm ${
                scrolled
                  ? "bg-cbm-green hover:bg-cbm-green-dark text-white"
                  : "bg-cbm-gold hover:bg-cbm-gold-light text-cbm-green-deeper"
              }`}
            >
              <a href="#contato">Fale Conosco</a>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={scrolled ? "text-cbm-green" : "text-white"}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-white p-0">
                <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-4 border-b border-cbm-sage">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-cbm-green">
                        <Scale className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-bold text-cbm-green">CBM Agro</span>
                    </div>
                  </div>

                  {/* Mobile Links */}
                  <nav className="flex flex-col p-4 gap-1">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="px-4 py-3 rounded-lg text-foreground/80 hover:text-cbm-green hover:bg-cbm-green/5 font-medium transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                    <Button
                      asChild
                      className="mt-4 bg-cbm-green hover:bg-cbm-green-dark text-white font-semibold"
                    >
                      <a href="#contato" onClick={() => setOpen(false)}>
                        Fale Conosco
                      </a>
                    </Button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
