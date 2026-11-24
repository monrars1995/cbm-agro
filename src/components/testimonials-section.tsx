"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Anderson",
    text: "Dr. Carlos e sua equipe é a excelência de alta competência atencioso e passa total segurança e conhecimento focado na causa do problema. Eu super indico!!! Muito obrigado!!!",
    rating: 5,
  },
  {
    name: "Edinalva",
    text: "A empresa foi bem atenciosa e esclarecedora... parabéns!",
    rating: 5,
  },
  {
    name: "Enilda",
    text: "Fui bem atendida, me deram informações certas, muito atenciosos. Agradeço por ter sido atendida.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 10);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    checkScroll();
    container.addEventListener("scroll", checkScroll);
    return () => container.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 380;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="depoimentos" className="py-20 md:py-28 bg-cbm-sage/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-16"
        >
          <span className="inline-block text-cbm-green font-semibold text-sm uppercase tracking-wider mb-3">
            Depoimentos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            O Que Dizem{" "}
            <span className="text-cbm-green">Sobre Nós</span>
          </h2>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-2 mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="h-10 w-10 rounded-full border-border/50 hover:border-cbm-green hover:text-cbm-green disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="h-10 w-10 rounded-full border-border/50 hover:border-cbm-green hover:text-cbm-green disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Testimonials Scroll */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="min-w-[320px] sm:min-w-[380px] lg:min-w-[420px] snap-center"
            >
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-border/50 h-full flex flex-col hover:shadow-md transition-shadow duration-300">
                {/* Quote Icon */}
                <div className="w-12 h-12 rounded-xl bg-cbm-green/10 flex items-center justify-center mb-6">
                  <Quote className="h-6 w-6 text-cbm-green" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-cbm-gold text-cbm-gold"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-foreground leading-relaxed mb-6 flex-grow text-sm md:text-base">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Name */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <div className="w-10 h-10 rounded-full bg-cbm-green flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <span className="font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
