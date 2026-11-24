'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, Menu, ArrowRight, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { trackNavClick, trackCTAClick } from '@/lib/dataLayer'
import { classifyBackgroundStyle, resolveSectionTone } from './headerSurface'

const navLinks = [
  { label: 'Início', href: '/#inicio' },
  { label: 'Defesas rurais', href: '/#servicos' },
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Provas', href: '/#depoimentos' },
  { label: 'Artigos', href: '/#blog' },
]

const defenseLinks = [
  { label: 'Alongamento rural', href: '/alongamento-de-divida-rural' },
  { label: 'Execução judicial', href: '/defesa-execucao-rural' },
  { label: 'Busca e apreensão', href: '/defesa-busca-e-apreensao-agricola' },
  { label: 'Recuperação Judicial do Produtor Rural', href: '/recuperacao-judicial-produtor-rural' },
  { label: 'Contencioso Tributário Rural', href: '/contencioso-tributario-rural' },
  { label: 'Planejamento e Defesa Patrimonial', href: '/planejamento-defesa-patrimonial' },
]

const DARK_SECTIONS = new Set(['contato', 'cta_contato', 'cta_final'])

function findStructuralAncestor(element: Element): Element | null {
  return element.closest('section, footer, main')
}

function detectSurfaceTone(): 'dark' | 'light' | null {
  if (typeof document === 'undefined') {
    return null
  }

  const headerHeight = 80
  const probeX = window.innerWidth > 768 ? Math.floor(window.innerWidth * 0.12) : Math.floor(window.innerWidth / 2)
  const probeY = Math.min(headerHeight + 4, Math.floor(window.innerHeight / 2))
  const stack = document.elementsFromPoint(probeX, probeY)

  const filtered = stack.filter((element) => {
    if (element instanceof HTMLElement && (element.closest('header') || element.closest('[role="banner"]'))) {
      return false
    }
    return true
  })

  return resolveSectionTone(filtered, (element) => {
    const style = window.getComputedStyle(element)
    return { backgroundColor: style.backgroundColor, backgroundImage: style.backgroundImage }
  }, findStructuralAncestor)
}
export function getHeaderChromeClasses(isSolid: boolean, overDarkSurface = false): string {
  if (!isSolid) {
    return 'bg-transparent'
  }

  return overDarkSurface
    ? 'bg-teal-dark/80 backdrop-blur-md shadow-sm shadow-black/10'
    : 'bg-warm-white/85 backdrop-blur-md shadow-sm shadow-teal-dark/[0.04]'
}

export function headerUsesLightText(isSolid: boolean, overDarkSurface: boolean): boolean {
  return !isSolid || overDarkSurface
}

export function getHeaderShellClasses(isSolid: boolean): string {
  return [
    'fixed left-1/2 z-50 -translate-x-1/2',
    isSolid ? 'top-2' : 'top-3',
    'mx-auto w-[min(72rem,calc(100%-2rem))]',
    isSolid ? 'h-16 rounded-3xl' : 'h-20 rounded-[2rem]',
  ].join(' ')
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [overDarkSurface, setOverDarkSurface] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setOverDarkSurface(detectSurfaceTone() === 'dark')
    })

    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
      setOverDarkSurface(detectSurfaceTone() === 'dark')
      const sections = ['inicio', 'servicos', 'sobre', 'depoimentos', 'blog', 'contato']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string, source: string) => {
    trackNavClick(label, source, href)
    
    if (href.startsWith('#') || href.startsWith('/#')) {
      const targetId = href.replace('/#', '#')
      const el = document.querySelector(targetId)
      if (el && window.location.pathname === '/') {
        e.preventDefault()
        setMobileOpen(false)
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const isSolid = scrolled || hovered
  const lightText = headerUsesLightText(isSolid, overDarkSurface)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`transition-all duration-300 ${getHeaderShellClasses(isSolid)} ${getHeaderChromeClasses(isSolid, overDarkSurface)}`}
      role="banner"
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a
            href="/#inicio"
            onClick={(e) => handleNavClick(e, '/#inicio', 'Logo CBM', 'header')}
            className="relative group"
            aria-label="CBM Agro e Gestão de Passivos - Ir para o início"
          >
            <Image
              src="/images/logo.png"
              alt="CBM Agro e Gestão de Passivos"
              width={96}
              height={93}
              className={`h-[64px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:h-[78px] ${
                lightText ? 'brightness-0 invert' : ''
              }`}
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('/#', '')
              const isActive = activeSection === sectionId
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.label, 'header')}
                  className={`relative rounded-full px-3 py-2 text-sm transition-all duration-300 ${
                    isActive
                      ? lightText
                        ? 'font-semibold text-gold-light'
                        : 'font-semibold text-copper'
                      : lightText
                        ? 'text-warm-white/78 hover:bg-warm-white/10 hover:text-warm-white'
                        : 'text-teal-dark/80 hover:bg-teal/5 hover:text-teal'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className={`absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full ${
                        lightText ? 'bg-gold-light' : 'bg-copper'
                      }`}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button
              onClick={(e) => {
                trackCTAClick('Falar com Advogado', 'header')
                const mockEvent = { preventDefault: () => {} } as React.MouseEvent<HTMLAnchorElement>
                handleNavClick(mockEvent, '/#contato', 'Falar com Advogado', 'header')
                if (window.location.pathname !== '/') {
                  window.location.href = '/#contato'
                }
              }}
              className="group rounded-full bg-copper px-5 py-2.5 font-semibold text-warm-white shadow-lg shadow-copper/20 transition-all duration-300 hover:bg-clay hover:shadow-clay/25"
            >
              <Phone className="size-4 mr-2" />
              Falar agora
              <ArrowRight className="size-3 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`lg:hidden transition-colors ${
                  lightText ? 'text-warm-white hover:bg-warm-white/10' : 'text-teal hover:bg-teal/10'
                }`}
                aria-label="Abrir menu de navegação"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 border-warm-border bg-warm-white">
              <SheetHeader className="mt-8">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/logo.png"
                    alt="CBM Agro e Gestão de Passivos"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                  <div>
                    <SheetTitle className="text-teal text-lg font-bold leading-tight">
                      CBM Agro
                    </SheetTitle>
                    <p className="text-gold text-[10px] tracking-widest uppercase">
                      e Gestão de Passivos
                    </p>
                  </div>
                </div>
              </SheetHeader>
              <div className="mt-5 border-t border-warm-border px-4 pt-3">
                <div className="flex items-center gap-2 text-copper">
                  <ShieldCheck className="size-4" />
                  <span className="text-xs font-bold uppercase tracking-[0.1em]">Defesa do produtor</span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-text-medium">
                  Escolha o serviço ou fale com a equipe antes de negociar com o banco.
                </p>
              </div>
              <nav className="flex flex-col gap-1 mt-5" aria-label="Navegação mobile">
                {navLinks.map((link) => {
                  const sectionId = link.href.replace('/#', '')
                  const isActive = activeSection === sectionId
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href, link.label, 'mobile_menu')}
                      className={`rounded-xl px-4 py-3 text-base transition-colors duration-200 ${
                        isActive
                          ? 'bg-gold/10 font-semibold text-gold-dark'
                          : 'text-teal-dark hover:bg-warm-gray hover:text-copper'
                      }`}
                    >
                      {link.label}
                    </a>
                  )
                })}
              </nav>
              <div className="mt-7 border-t border-warm-border pt-6">
                <p className="px-4 text-xs font-bold uppercase tracking-[0.12em] text-copper">
                  Rotas de defesa
                </p>
                <div className="mt-2 flex flex-col gap-1">
                  {defenseLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href, link.label, 'mobile_menu_defense')}
                      className="rounded-xl px-4 py-3 text-base transition-colors duration-200 text-teal-dark hover:bg-warm-gray hover:text-copper"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-8 px-4">
                <Button
                  onClick={(e) => {
                    trackCTAClick('Falar com Advogado', 'mobile_menu')
                    const mockEvent = { preventDefault: () => {} } as React.MouseEvent<HTMLAnchorElement>
                    handleNavClick(mockEvent, '/#contato', 'Falar com Advogado', 'mobile_menu')
                    if (window.location.pathname !== '/') {
                      window.location.href = '/#contato'
                    }
                  }}
                  className="w-full rounded-xl bg-copper py-6 text-base font-semibold text-warm-white hover:bg-clay"
                >
                  <Phone className="size-5 mr-2" />
                  Falar com Advogado
                </Button>
              </div>
            </SheetContent>
          </Sheet>
      </div>
    </motion.header>
  )
}
