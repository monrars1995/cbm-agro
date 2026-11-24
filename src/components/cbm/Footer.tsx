'use client'

import { Instagram, Linkedin, Facebook, Phone, Mail, MapPin } from 'lucide-react'
import Image from 'next/image'
import { trackFooterClick, trackPhoneClick, trackEmailClick, trackSocialClick } from '@/lib/dataLayer'

const navLinks = [
  { label: 'Início', href: '/#inicio' },
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Blog', href: '/#blog' },
  { label: 'Contato', href: '/#contato' },
  { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
  { label: 'Termos de Uso', href: '/termos-de-uso' },
  { label: 'Política de Cookies', href: '/politica-de-cookies' },
]

const serviceLinks = [
  { label: 'Alongamento de dívida rural', href: '/alongamento-de-divida-rural' },
  { label: 'Defesa em execução rural', href: '/defesa-execucao-rural' },
  { label: 'Busca e apreensão agrícola', href: '/defesa-busca-e-apreensao-agricola' },
  { label: 'Recuperação judicial do produtor rural', href: '/recuperacao-judicial-produtor-rural' },
  { label: 'Contencioso tributário rural', href: '/contencioso-tributario-rural' },
  { label: 'Planejamento e defesa patrimonial', href: '/planejamento-defesa-patrimonial' },
  { label: 'Agendar consulta', href: '/#contato' },
]

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/cbmgestaodepassivos', label: 'Instagram', platform: 'instagram' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/cbm-gestao-de-passivos', label: 'LinkedIn', platform: 'linkedin' },
  { icon: Facebook, href: 'https://www.facebook.com/cbmgestaodepassivos', label: 'Facebook', platform: 'facebook' },
]

export default function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string, column: string) => {
    trackFooterClick(label, column)
    if (href.startsWith('#') || href.startsWith('/#')) {
      const targetId = href.replace('/#', '#')
      const el = document.querySelector(targetId)
      if (el && window.location.pathname === '/') {
        e.preventDefault()
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const openCookiePreferences = () => {
    trackFooterClick('Gerenciar cookies', 'legal')
    window.dispatchEvent(new Event('cbm:open-cookie-preferences'))
  }

  return (
    <footer className="bg-teal-dark pt-16 pb-0" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12">
          {/* Column 1: Logo + Description + Social */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/logo.png"
                alt="CBM Agro e Gestão de Passivos"
                width={44}
                height={44}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-warm-white/52 text-sm leading-relaxed mb-6">
              Escudo jurídico do produtor rural. Alongamento, defesa em execução
              e proteção de patrimônio contra abusos do crédito bancário.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Siga-nos no ${social.label}`}
                  className="w-10 h-10 rounded-full bg-warm-white/5 border border-warm-white/10 flex items-center justify-center text-warm-white/62 hover:bg-gold hover:border-gold hover:text-teal-dark transition-all duration-200"
                  onClick={() => trackSocialClick(social.platform, 'footer')}
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navegue */}
          <div>
            <h3 className="text-warm-white font-semibold text-lg mb-4">Navegue</h3>
            <nav aria-label="Navegação do rodapé">
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href + link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleClick(e, link.href, link.label, 'navegacao')}
                      className="text-warm-white/52 hover:text-gold text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Serviços */}
          <div>
            <h3 className="text-warm-white font-semibold text-lg mb-4">Serviços</h3>
            <nav aria-label="Serviços">
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleClick(e, link.href, link.label, 'servicos')}
                      className="text-warm-white/52 hover:text-gold text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 4: Contato */}
          <div>
            <h3 className="text-warm-white font-semibold text-lg mb-4">Contato</h3>
            <address className="not-italic">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="size-4 text-gold mt-0.5 shrink-0" aria-hidden="true" />
                  <a
                    href="tel:+557196772343"
                    className="text-warm-white/52 hover:text-gold text-sm transition-colors duration-200"
                    onClick={() => trackPhoneClick('footer')}
                  >
                    71 99677-2343
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="size-4 text-gold mt-0.5 shrink-0" aria-hidden="true" />
                  <a
                    href="mailto:contato@cbmgestaodepassivos.com.br"
                    className="text-warm-white/52 hover:text-gold text-sm transition-colors duration-200 break-all"
                    onClick={() => trackEmailClick('footer')}
                  >
                    contato@cbmgestaodepassivos.com.br
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="size-4 text-gold mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="text-warm-white/52 text-sm leading-relaxed">
                    Av. Getúlio Vargas, 3233, Edf Trade Center, Sala 401 e 402 - Santa Monica, Feira de Santana - BA
                  </span>
                </li>
              </ul>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-warm-white/10 py-6 text-center">
          <button
            type="button"
            onClick={openCookiePreferences}
            className="mb-4 text-xs font-semibold text-gold transition-colors hover:text-gold-light"
          >
            Gerenciar preferências de cookies
          </button>
          <p className="text-warm-white/34 text-xs mb-2">
            Carlos Benjamim Morais Sociedade Individual de Advocacia - CNPJ: 47.878.182/0001-61
          </p>
          <p className="text-warm-white/34 text-xs">
            © {new Date().getFullYear()} CBM Agro e Gestão de Passivos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
