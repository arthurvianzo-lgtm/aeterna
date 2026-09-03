"use client";

import { motion } from "framer-motion";
import { Handshake, Palette, Factory, PackageCheck } from "lucide-react";
import Reveal from "./Reveal";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const STEPS = [
  {
    icon: Handshake,
    step: "01",
    title: "Alinhamento",
    desc: "Entendemos seus objetivos, seu público e definimos juntos o escopo da sua linha de suplementos.",
    accent: "from-emerald-500 to-teal-600",
  },
  {
    icon: Palette,
    step: "02",
    title: "Design Exclusivo",
    desc: "Criamos a identidade visual, o rótulo e a embalagem que refletem a marca da sua academia.",
    accent: "from-fuchsia-500 to-purple-600",
  },
  {
    icon: Factory,
    step: "03",
    title: "Produção",
    desc: "Fabricação industrial em escala, com registro, qualidade e conformidade regulatória total.",
    accent: "from-indigo-500 to-blue-600",
  },
  {
    icon: PackageCheck,
    step: "04",
    title: "Entrega & Vendas",
    desc: "Recebemos e entregamos o estoque pronto na sua academia. É só vender e lucrar.",
    accent: "from-amber-500 to-orange-600",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-slate-50 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Do alinhamento à entrega em{" "}
            <span className="text-gradient bg-gradient-to-r from-emerald-600 to-teal-500">
              4 passos
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Um processo turnkey, transparente e desenhado para tirar todo o trabalho
            operacional das suas costas.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* Timeline line (desktop) */}
          <div className="absolute left-0 right-0 top-9 hidden h-0.5 bg-gradient-to-r from-emerald-200 via-indigo-200 to-amber-200 lg:block" />

          <div className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex h-18 w-18 items-center justify-center">
                  <span
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.accent} text-white shadow-lg transition-transform duration-300 hover:scale-110`}
                  >
                    <step.icon className="h-7 w-7" />
                  </span>
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-black text-slate-900 shadow ring-1 ring-slate-200">
                    {step.step}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <Reveal delay={0.2} className="mt-16 text-center">
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-slate-900/20 transition-all duration-300 hover:scale-[1.04] hover:bg-slate-800 active:scale-95"
          >
            Começar meu processo
          </a>
        </Reveal>
      </div>
    </section>
  );
}
