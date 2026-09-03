"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { OriginButton } from "@/components/ui/origin-button";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const features = [
  { icon: ShieldCheck, title: "100% Regulado", desc: "ANVISA" },
  { icon: Truck, title: "Entrega", desc: "Turnkey" },
  { icon: CheckCircle2, title: "Margem", desc: "+100%" },
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

      <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 pb-16 pt-6 lg:grid-cols-2 lg:px-8 lg:pb-24 lg:pt-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.div variants={item} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">
              <Sparkles className="h-4 w-4" />
              Nova Era de Suplementos
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-[3.5rem]"
          >
            Sua marca,{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              sua linha
            </span>
            <br />
            de suplementos
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-xl leading-relaxed text-slate-600"
          >
            Design exclusivo, regulação ANVISA, produção industrial e entrega —
            tudo em um só fornecedor. Margem premium sem trabalho operacional.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <OriginButton
              onClick={() =>
                window.open(buildWhatsAppLink(), "_blank", "noopener")
              }
              className="group gap-2 rounded-full bg-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-emerald-900/20 transition-all hover:scale-105 hover:bg-emerald-700 hover:shadow-emerald-900/30"
            >
              <MessageCircle className="h-5 w-5" />
              Começar Agora
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </OriginButton>
            <a
              href="#prova-social"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300/70 bg-white/70 px-8 py-4 text-base font-semibold text-slate-800 backdrop-blur transition-all hover:border-slate-400 hover:bg-white"
            >
              Ver Resultados
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 grid grid-cols-3 gap-6"
          >
            {features.map((f) => (
              <div
                key={f.title}
                className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/70 p-4 backdrop-blur ring-1 ring-slate-200/60"
              >
                <f.icon className="h-6 w-6 text-emerald-600" />
                <span className="text-sm font-semibold text-slate-900">{f.title}</span>
                <span className="text-xs text-slate-500">{f.desc}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Model Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/20 to-amber-500/20 blur-2xl" />
            <img
              src="/001.jpeg"
              alt="Model with Aeterna Creatina"
              className="relative h-[450px] w-full rounded-3xl object-cover shadow-2xl ring-1 ring-slate-200/80"
            />
            
            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -left-4 top-16 rounded-2xl border border-slate-200/80 bg-white/85 px-5 py-3 shadow-xl shadow-slate-300/40 backdrop-blur"
            >
              <p className="text-xs font-medium text-slate-500">Premium</p>
              <p className="text-lg font-bold text-slate-900">Qualidade</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-4 bottom-20 rounded-2xl border border-emerald-200/80 bg-emerald-50/85 px-5 py-3 shadow-xl shadow-emerald-300/40 backdrop-blur"
            >
              <p className="text-xs font-medium text-emerald-600">Resultados</p>
              <p className="text-lg font-bold text-slate-900">Comprovados</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
