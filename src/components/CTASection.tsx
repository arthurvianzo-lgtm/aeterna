"use client";

import { MessageCircle, ShieldCheck, BadgeCheck } from "lucide-react";
import Reveal from "./Reveal";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function CTASection() {
  return (
    <section className="bg-white px-6 pb-24 sm:pb-28 lg:px-8">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-10 shadow-2xl shadow-emerald-900/30 sm:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
              Pronto para lançar a sua própria linha de suplementos?
            </h2>
            <p className="mt-4 text-lg text-emerald-50/90">
              Simule seu projeto, tire dúvidas e receba uma proposta personalizada
              direto no WhatsApp. Sem burocracia, sem compromisso.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-emerald-700 shadow-xl shadow-emerald-950/20 transition-all duration-300 hover:scale-[1.04] active:scale-95 sm:w-auto"
              >
                <MessageCircle className="h-5 w-5 text-emerald-600 transition-transform duration-300 group-hover:rotate-12" />
                Quero uma simulação gratuita
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-emerald-50/80">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" /> Totalmente regulamentado
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4" /> Atendimento exclusivo
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
