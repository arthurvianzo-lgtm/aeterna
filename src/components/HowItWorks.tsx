"use client";

import { motion } from "framer-motion";
import { Handshake, Palette, Factory, PackageCheck, MessageCircle } from "lucide-react";
import Reveal from "./Reveal";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { OriginButton } from "@/components/ui/origin-button";

const STEPS = [
  {
    icon: Handshake,
    step: "01",
    title: "Alinhamento",
    desc: "Entendemos seus objetivos, seu público e definimos o escopo da sua linha de suplementos.",
  },
  {
    icon: Palette,
    step: "02",
    title: "Design Exclusivo",
    desc: "Criamos a identidade visual, o rótulo e a embalagem que refletem a sua marca.",
  },
  {
    icon: Factory,
    step: "03",
    title: "Produção",
    desc: "Fabricação industrial em escala, com registro, qualidade e conformidade regulatória.",
  },
  {
    icon: PackageCheck,
    step: "04",
    title: "Entrega & Vendas",
    desc: "Recebemos o estoque pronto na sua academia. É só vender e lucrar.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-slate-50 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Do alinhamento à entrega em{" "}
            <span className="text-gradient bg-gradient-to-r from-emerald-600 to-emerald-500">
              4 passos
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Um processo turnkey, transparente e desenhado para tirar todo o trabalho
            operacional das suas costas.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:border-emerald-200 hover:shadow-lg hover:shadow-slate-200/60"
            >
              <div className="flex items-start justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-50 text-slate-600 ring-1 ring-slate-200 transition-colors duration-300 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:ring-emerald-100">
                  <step.icon className="h-5 w-5" />
                </span>
                <span className="text-3xl font-bold leading-none text-slate-200 transition-colors duration-300 group-hover:text-emerald-100">
                  {step.step}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.desc}</p>
              {i < STEPS.length - 1 && (
                <span className="mt-4 hidden h-px w-full bg-slate-100 lg:block" />
              )}
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14 text-center">
          <OriginButton
            onClick={() =>
              window.open(buildWhatsAppLink(), "_blank", "noopener")
            }
            className="min-w-52 gap-2 rounded-full bg-slate-900 text-base font-medium text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800"
          >
            <MessageCircle className="h-5 w-5" />
            Começar meu processo
          </OriginButton>
        </Reveal>
      </div>
    </section>
  );
}
