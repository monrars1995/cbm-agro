'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { trackWhatsAppClick } from '@/lib/dataLayer'

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/557196772343?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20com%20a%20CBM%20Gest%C3%A3o%20de%20Passivos."
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 160, damping: 22 }}
      aria-label="Fale conosco pelo WhatsApp"
      onClick={() => trackWhatsAppClick('floating_button')}
    >
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-xl border border-warm-border bg-warm-white px-3 py-2 text-sm font-bold text-teal-dark opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:block">
        Defesa pelo WhatsApp
        <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-warm-white" />
      </span>

      <div className="relative flex size-15 items-center justify-center rounded-full border-4 border-warm-white bg-[#25D366] shadow-lg shadow-teal-dark/15 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg sm:size-16">
        <MessageCircle className="size-6 text-warm-white" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-10" />
      </div>
    </motion.a>
  )
}
