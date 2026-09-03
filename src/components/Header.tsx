"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { OriginButton } from "@/components/ui/origin-button";

const NAV_LINKS = [
  { label: "Pilares", href: "#pilares" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Sua Margem", href: "#margem" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/80 bg-white/70 shadow-lg shadow-slate-200/40 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-12 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a href="#" className="flex items-center">
          <span className="text-lg font-black tracking-tight text-slate-900">
            Aeterna
            <span className="text-emerald-600">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-emerald-600 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <OriginButton
            onClick={() =>
              window.open(buildWhatsAppLink(), "_blank", "noopener")
            }
            className="h-8 gap-2 rounded-full bg-emerald-600 px-4 text-xs font-semibold text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 hover:shadow-emerald-600/40"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Falar no WhatsApp
          </OriginButton>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-800 transition-colors hover:bg-slate-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden border-t border-slate-200/80 bg-white/90 backdrop-blur-xl md:hidden"
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
            >
              {link.label}
            </a>
          ))}
          <OriginButton
            onClick={() => {
              setOpen(false);
              window.open(buildWhatsAppLink(), "_blank", "noopener");
            }}
            className="mt-2 w-full gap-2 rounded-full bg-emerald-600 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25"
          >
            <MessageCircle className="h-4 w-4" />
            Falar no WhatsApp
          </OriginButton>
        </div>
      </motion.div>
    </motion.header>
  );
}
