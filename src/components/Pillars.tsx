"use client";

import { motion } from "framer-motion";
import { Palette, Factory, TrendingUp, HeartHandshake, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { OriginButton } from "@/components/ui/origin-button";

const PILLARS = [
  {
    icon: Palette,
    title: "Rede de Fábricas Validadas",
    desc: "Acesso a parceiros de produção auditados e testados, prontos para fabricar a sua linha.",
    cta: "Ver fábricas da rede",
  },
  {
    icon: Factory,
    title: "Curadoria por Categoria",
    desc: "Suplementos, cosméticos e peptídeos — indicamos o parceiro certo para cada produto.",
    cta: "Ver como funciona a curadoria",
  },
  {
    icon: TrendingUp,
    title: "Negociação e Condições",
    desc: "Usamos volume e relacionamento para conseguir condições melhores do que você sozinho.",
    cta: "Ver como negociamos",
  },
  {
    icon: HeartHandshake,
    title: "Suporte na Jornada",
    desc: "Acompanhamos cada etapa, do match com a fábrica até a sua primeira entrega.",
    cta: "Ver a jornada completa",
  },
];

export default function Pillars() {
  return (
    <section id="pilares" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
O que você ganha com a{" "}
              <span className="text-gradient bg-gradient-to-r from-emerald-600 to-emerald-500">
                rede Aeterna
              </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Tudo pensado para o seu negócio vender com marca própria — sem
            garimpar fornecedor, sem abrir mão de qualidade e identidade.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col rounded-2xl border border-slate-200/80 bg-slate-50/50 p-7 transition-shadow duration-300 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-600 ring-1 ring-slate-200 transition-colors duration-300 group-hover:text-emerald-600 group-hover:ring-emerald-200">
                <pillar.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold leading-snug text-slate-900">
                {pillar.title}
              </h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600">
                {pillar.desc}
              </p>
              <OriginButton
                onClick={() =>
                  window.open(
                    buildWhatsAppLink(
                      `Olá! Quero saber mais sobre: ${pillar.title}`
                    ),
                    "_blank",
                    "noopener"
                  )
                }
                className="mt-5 w-full gap-1 rounded-full border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:border-emerald-300 hover:text-emerald-700"
              >
                {pillar.cta}
                <ArrowUpRight className="h-4 w-4" />
              </OriginButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
