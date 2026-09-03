"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Reveal from "./Reveal";

const testimonials = [
  {
    initials: "RM",
    name: "Ricardo Mendes",
    gym: "Academia Iron Club",
    quote:
      "Em 90 dias lançamos nossa linha própria de whey. A margem dobra todos os meses e os alunos amam comprar da própria marca da academia.",
    highlight: true,
  },
  {
    initials: "CS",
    name: "Camila Santos",
    gym: "Studio Fit & Co",
    quote:
      "Zero burocracia. A Aeterna cuidou do rótulo, da ANVISA e da produção. Eu só recebi o estoque pronto e coloquei à venda.",
  },
  {
    initials: "PL",
    name: "Paulo Lopes",
    gym: "Academia Vitta",
    quote:
      "O melhor de tudo é o controle de preço. Sem intermediários, consegui dobrar minha margem e ainda manter um preço justo.",
  },
  {
    initials: "AN",
    name: "Alana Nogueira",
    gym: "CrossFit Factory",
    quote:
      "A retenção disparou. Os alunos que usam a linha própria viram embaixadores da marca — é outra dinâmica de comunidade.",
  },
  {
    initials: "JF",
    name: "João Ferreira",
    gym: "Academia Performance",
    quote:
      "Atendimento premium do início ao fim. O design do meu rótulo ficou tão bom que parece marca de grande laboratório.",
  },
  {
    initials: "MT",
    name: "Marina Tavares",
    gym: "Studio Pilates 360",
    quote:
      "Eu sempre quis ter uma linha própria, mas achava impossível pela burocracia. A Aeterna entregou tudo pronto, turnkey.",
    highlight: true,
  },
];

const gymLogos = [
  "Iron Club",
  "Studio Fit & Co",
  "Academia Vitta",
  "CrossFit Factory",
  "Performance",
  "Pilates 360",
  "PowerFit",
  "BodyLab",
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function SocialProof() {
  return (
    <section id="prova-social" className="bg-slate-50 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-600">
            Prova social
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Academias que já lucram com{" "}
            <span className="text-gradient bg-gradient-to-r from-emerald-600 to-emerald-500">
              linha própria
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            De studios boutique a redes de academias, donos confiam na Aeterna
            para transformar a marca em receita.
          </p>
        </Reveal>

        {/* Testimonial grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col justify-between rounded-2xl border p-6 shadow-sm ${
                t.highlight
                  ? "border-emerald-200/80 bg-white"
                  : "border-slate-200/80 bg-white/70 backdrop-blur"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <Stars />
                  <Quote className="h-5 w-5 text-slate-300" />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">
                  “{t.quote}”
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.gym}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logos marquee */}
        <Reveal delay={0.2} className="mt-16">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
            Mais de 120 academias já lançaram sua linha
          </p>
          <div className="relative mt-8 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-50 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-50 to-transparent" />
            <div className="flex w-max animate-marquee gap-12 pr-12">
              {[...gymLogos, ...gymLogos].map((logo, i) => (
                <span
                  key={`${logo}-${i}`}
                  className="whitespace-nowrap text-lg font-semibold text-slate-400 transition-colors hover:text-slate-600"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
