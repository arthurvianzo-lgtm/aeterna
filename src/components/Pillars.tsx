"use client";

import { motion } from "framer-motion";
import { Palette, Factory, TrendingUp, HeartHandshake, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const PILLARS = [
  {
    icon: Palette,
    title: "Design & Identidade Visual Sob Medida",
    desc: "Rótulos, cores e identidade construídos para representar a força da sua marca, do conceito ao produto final.",
    accent: "from-fuchsia-500 to-purple-600",
    bg: "bg-fuchsia-50 text-fuchsia-600",
  },
  {
    icon: Factory,
    title: "Processo 100% Industrial & Regulamentado",
    desc: "Fabricação em escala com registro e conformidade total. Você nunca lida com burocracia, fiscalização ou fornecedores.",
    accent: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: TrendingUp,
    title: "Margem de Lucro Sem Intermediários",
    desc: "Compre direto da indústria e precifique como quiser. Sem distribuidores, a margem fica na sua mão.",
    accent: "from-indigo-500 to-blue-600",
    bg: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: HeartHandshake,
    title: "Retenção e Valor de Marca para os Alunos",
    desc: "Uma linha própria aumenta a autoridade da academia e fideliza alunos que se tornam embaixadores da sua marca.",
    accent: "from-amber-500 to-orange-600",
    bg: "bg-amber-50 text-amber-600",
  },
];

export default function Pillars() {
  return (
    <section id="pilares" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Os 4 pilares de uma{" "}
            <span className="text-gradient bg-gradient-to-r from-emerald-600 to-teal-500">
              linha própria vencedora
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Tudo pensado para transformar a sua academia em uma marca de suplementos
            completa — sem abrir mão da qualidade e da sua identidade.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50/60 p-7 shadow-sm backdrop-blur transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-200/60"
            >
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${pillar.accent} opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-20`}
              />
              <span
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${pillar.bg} transition-transform duration-300 group-hover:scale-110`}
              >
                <pillar.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold leading-snug text-slate-900">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{pillar.desc}</p>
              <a
                href={buildWhatsAppLink(
                  `Olá! Quero saber mais sobre: ${pillar.title}`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 transition-all duration-300 hover:gap-2"
              >
                Saber mais
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
