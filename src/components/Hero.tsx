"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  ArrowDown,
  Palette,
  Factory,
  TrendingUp,
  BadgeCheck,
  Users,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { OriginButton } from "@/components/ui/origin-button";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const mockupItems = [
  { icon: Palette, title: "Rótulo Exclusivo", desc: "Identidade sob medida" },
  { icon: ShieldCheck, title: "100% Regulado", desc: "Registro ANVISA incluso" },
  { icon: Factory, title: "Produção Industrial", desc: "Fábrica própria" },
  { icon: Truck, title: "Entrega Final", desc: "Até sua academia" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 pt-16">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-200/40 via-sky-100/30 to-indigo-200/40 blur-3xl" />
        <div className="absolute right-[-10%] top-1/3 h-72 w-72 rounded-full bg-emerald-100/50 blur-2xl" />
        <div className="absolute left-[-10%] top-1/2 h-72 w-72 rounded-full bg-indigo-100/50 blur-2xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-16 lg:grid-cols-2 lg:px-8 lg:pb-28 lg:pt-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-black leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            Transforme a Marca da Sua Academia em uma{" "}
            <span className="text-gradient bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500">
              Linha Exclusiva de Suplementos
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-lg leading-relaxed text-slate-600"
          >
            Esqueça a burocracia, os fornecedores e a logística. A Aeterna cuida do
            design, da regulação, da fabricação industrial e da entrega — você apenas
            lança a sua marca e lucra muito mais com cada venda.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <OriginButton
              onClick={() =>
                window.open(buildWhatsAppLink(), "_blank", "noopener")
              }
              className="gap-2 rounded-full bg-emerald-600 px-7 text-base font-semibold text-white shadow-xl shadow-emerald-600/30 hover:bg-emerald-700"
            >
              <MessageCircle className="h-5 w-5" />
              Lançar Linha Própria
            </OriginButton>
            <a
              href="#pilares"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300/80 bg-white/70 px-7 py-3.5 text-base font-semibold text-slate-800 backdrop-blur transition-all duration-300 hover:scale-[1.03] hover:border-slate-400 active:scale-95"
            >
              <ArrowDown className="h-5 w-5 text-emerald-600" />
              Conheça a solução
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500"
          >
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4 text-emerald-600" /> Para academias e studios
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-emerald-600" /> Linha 100% personalizada
            </span>
          </motion.div>
        </motion.div>

        {/* Mockup float card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative mx-auto max-w-md rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-2xl shadow-slate-300/50 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 text-sm font-black text-white">
                  A
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900">Sua Marca</p>
                  <p className="text-xs text-slate-500">Por Aeterna</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200/70">
                Suplemento Premium
              </span>
            </div>

            {/* Fake product bottle */}
            <div className="mt-5 flex items-center justify-center">
              <div className="relative flex flex-col items-center">
                <div className="h-36 w-24 rounded-b-[2rem] rounded-t-lg bg-gradient-to-b from-emerald-500/90 to-teal-600/90 shadow-inner">
                  <div className="mx-auto mt-4 h-3 w-3 rounded-full bg-white/50" />
                  <p className="mt-6 px-2 text-center text-xs font-black uppercase leading-tight text-white">
                    Aeterna
                  </p>
                  <p className="mt-1 px-2 text-center text-[10px] text-white/80">
                    Whey Protein
                  </p>
                </div>
                <div className="-mt-0.5 h-4 w-10 rounded-full bg-slate-300/80" />
                <p className="mt-2 rounded-full bg-slate-100 px-3 py-0.5 text-[10px] font-medium text-slate-500">
                  Whey Protein · 900g
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {mockupItems.map((m) => (
                <div
                  key={m.title}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/70 p-3 transition-all duration-300 hover:border-emerald-200 hover:shadow-md"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <m.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{m.title}</p>
                    <p className="text-[10px] text-slate-500">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 p-3 ring-1 ring-emerald-100/80">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-900">Margem de lucro própria</p>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-emerald-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.4, delay: 1 }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  />
                </div>
              </div>
              <span className="text-sm font-black text-emerald-700">+100%</span>
            </div>
          </motion.div>

          {/* Floating accent chips */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -left-4 top-8 hidden rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 shadow-xl shadow-slate-300/40 backdrop-blur sm:block"
          >
            <p className="text-[11px] font-semibold text-slate-500">Exclusividade</p>
            <p className="text-lg font-black text-emerald-600">Sua marca</p>
          </motion.div>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -right-3 bottom-16 hidden rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 shadow-xl shadow-slate-300/40 backdrop-blur sm:block"
          >
            <p className="text-[11px] font-semibold text-slate-500">Zero trabalho</p>
            <p className="text-lg font-black text-slate-900">
              Turnkey <span className="text-emerald-600">✓</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
