"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  ArrowDown,
  Palette,
  Factory,
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
    <section className="relative overflow-hidden bg-slate-50 pt-14">
      {/* Sophisticated background: radial glow + subtle grid */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 0%, rgba(5,150,105,0.10) 0%, rgba(5,150,105,0) 42%), radial-gradient(circle at 85% 35%, rgba(15,23,42,0.05) 0%, rgba(15,23,42,0) 55%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 75%)",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-6 lg:grid-cols-2 lg:px-8 lg:pb-24 lg:pt-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          <motion.h1
            variants={item}
            className="text-4xl font-bold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem]"
          >
            Transforme a marca da sua academia em uma{" "}
            <span className="text-gradient bg-gradient-to-r from-emerald-600 to-emerald-500">
              linha exclusiva de suplementos
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600"
          >
            Design, regulação, fabricação industrial e entrega — tudo em um
            só fornecedor, com margem alta e sem trabalho operacional para a
            sua academia.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <OriginButton
              onClick={() =>
                window.open(buildWhatsAppLink(), "_blank", "noopener")
              }
              className="gap-2 rounded-full bg-emerald-600 px-7 text-base font-medium text-white shadow-xl shadow-emerald-600/25 hover:bg-emerald-700"
            >
              <MessageCircle className="h-5 w-5" />
              Lançar Linha Própria
            </OriginButton>
            <a
              href="#prova-social"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300/70 bg-white/70 px-7 py-3.5 text-base font-medium text-slate-800 backdrop-blur transition-all duration-300 hover:border-slate-400 hover:bg-white active:scale-95"
            >
              <ArrowDown className="h-5 w-5 text-emerald-600" />
              Conheça a solução
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-slate-500"
          >
            <span className="inline-flex items-center gap-2">
              <span className="text-base font-bold text-slate-900">+100%</span>
              de margem média
            </span>
            <span className="hidden h-4 w-px bg-slate-300 sm:block" />
            <span className="inline-flex items-center gap-2">
              <span className="text-base font-bold text-slate-900">100%</span>
              regularizado ANVISA
            </span>
            <span className="hidden h-4 w-px bg-slate-300 sm:block" />
            <span className="inline-flex items-center gap-2">
              <span className="text-base font-bold text-slate-900">Turnkey</span>
              da fábrica à entrega
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
            className="relative mx-auto max-w-md rounded-3xl border border-slate-200/80 bg-white/85 p-6 shadow-2xl shadow-slate-300/50 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
                  A
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Sua Marca</p>
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
                <div className="h-36 w-24 rounded-b-[2rem] rounded-t-lg bg-gradient-to-b from-slate-800 to-slate-900">
                  <div className="mx-auto mt-4 h-3 w-3 rounded-full bg-emerald-400/80" />
                  <p className="mt-6 px-2 text-center text-xs font-bold uppercase leading-tight text-white">
                    Aeterna
                  </p>
                  <p className="mt-1 px-2 text-center text-[10px] text-slate-300">
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
                  className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 transition-colors duration-300 hover:border-slate-300"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-600 ring-1 ring-slate-200">
                    <m.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">{m.title}</p>
                    <p className="text-[10px] text-slate-500">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200/80">
              <div className="flex-1">
                <p className="text-xs font-semibold text-slate-900">Margem de lucro própria</p>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white ring-1 ring-slate-200/60">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.4, delay: 1 }}
                    className="h-full rounded-full bg-emerald-600"
                  />
                </div>
              </div>
              <span className="text-sm font-bold text-emerald-700">+100%</span>
            </div>
          </motion.div>

          {/* Floating accent chips */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -left-4 top-8 hidden rounded-2xl border border-slate-200/80 bg-white/85 px-4 py-3 shadow-xl shadow-slate-300/40 backdrop-blur sm:block"
          >
            <p className="text-[11px] font-medium text-slate-500">Exclusividade</p>
            <p className="text-lg font-bold text-slate-900">Sua marca</p>
          </motion.div>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -right-3 bottom-16 hidden rounded-2xl border border-slate-200/80 bg-white/85 px-4 py-3 shadow-xl shadow-slate-300/40 backdrop-blur sm:block"
          >
            <p className="text-[11px] font-medium text-slate-500">Zero trabalho</p>
            <p className="text-lg font-bold text-slate-900">Turnkey ✓</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
