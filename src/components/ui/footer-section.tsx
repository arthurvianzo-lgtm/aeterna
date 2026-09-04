"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  AtSign,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react"
import { buildWhatsAppLink } from "@/lib/whatsapp"

const QUICK_LINKS = [
  { label: "Início", href: "#" },
  { label: "Pilares", href: "#pilares" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Sua margem", href: "#margem" },
]

const SOCIALS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    tip: "Fale com a gente no WhatsApp",
    href: buildWhatsAppLink(),
  },
  {
    icon: AtSign,
    label: "Instagram",
    tip: "Acompanhe a Aeterna no Instagram",
    href: "#",
  },
  {
    icon: Mail,
    label: "E-mail",
    tip: "Envie um e-mail para a Aeterna",
    href: "mailto:contato@aeterna.com.br",
  },
]

function Footerdemo() {
  const [subscribed, setSubscribed] = React.useState(false)

  return (
    <footer className="relative border-t border-slate-200/80 bg-slate-50 text-slate-900">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter / brand */}
          <div className="relative">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight">
                Aeterna<span className="text-emerald-600">.</span>
              </span>
            </div>
            <p className="mt-3 mb-6 text-sm leading-relaxed text-slate-600">
              Sua marca conectada às melhores fábricas de suplementos,
              cosméticos e peptídeos do Brasil. Curadoria, negociação e
              acompanhamento do match à primeira entrega.
            </p>
            <form
              className="relative"
              onSubmit={(e) => {
                e.preventDefault()
                setSubscribed(true)
              }}
            >
              <Input
                type="email"
                required
                placeholder="Seu melhor e-mail"
                className="pr-12 bg-white backdrop-blur-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-emerald-600 text-white transition-transform hover:scale-105 hover:bg-emerald-700"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Quero receber indicações de fábrica</span>
              </Button>
            </form>
            <p
              className={`mt-2 h-4 text-xs text-emerald-600 transition-opacity ${
                subscribed ? "opacity-100" : "opacity-0"
              }`}
            >
              Obrigado! Você está na lista.
            </p>
            <div className="pointer-events-none absolute -right-4 top-0 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900">
              Navegação
            </h3>
            <nav className="space-y-2.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-slate-600 transition-colors hover:text-emerald-600"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900">
              Contato
            </h3>
            <address className="space-y-2.5 text-sm not-italic text-slate-600">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-emerald-600" />
                Atendimento para todo o Brasil
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-emerald-600"
                >
                  +55 21 95918-3710
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-emerald-600" />
                <a
                  href="mailto:contato@aeterna.com.br"
                  className="transition-colors hover:text-emerald-600"
                >
                  contato@aeterna.com.br
                </a>
              </p>
            </address>
            <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
              <ShieldCheck className="h-4 w-4" /> Fábricas parceiras 100% regulamentadas
            </p>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900">
              Siga a Aeterna
            </h3>
            <div className="mb-6 flex space-x-3">
              <TooltipProvider delayDuration={100}>
                {SOCIALS.map((social) => (
                  <Tooltip key={social.label}>
                    <TooltipTrigger asChild>
                      <a
                        href={social.href}
                        target={social.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                        aria-label={social.label}
                      >
                        <social.icon className="h-4 w-4" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{social.tip}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
            <a
              href={buildWhatsAppLink(
                "Olá! Quero conectar minha marca às melhores fábricas de suplementos, cosméticos ou peptídeos."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-all hover:gap-2.5"
            >
              Conectar minha marca
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-8 text-center md:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Aeterna. Todos os direitos reservados.
          </p>
          <nav className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="#" className="text-slate-500 transition-colors hover:text-emerald-600">
              Política de Privacidade
            </a>
            <a href="#" className="text-slate-500 transition-colors hover:text-emerald-600">
              Termos de Uso
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo }
