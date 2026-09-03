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
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 min-h-screen">
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-20 h-80 w-80 rounded-full bg-amber-500/20 blur-3xl"
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.div variants={item} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400 ring-1 ring-emerald-500/20">
              <Sparkles className="h-4 w-4" />
              Nova Era de Suplementos
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Sua marca,{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-400 bg-clip-text text-transparent">
              sua linha
            </span>
            <br />
            de suplementos
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-xl leading-relaxed text-slate-300"
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
              className="group gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-emerald-500/30 transition-all hover:scale-105 hover:shadow-emerald-500/50"
            >
              <MessageCircle className="h-5 w-5" />
              Começar Agora
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </OriginButton>
            <a
              href="#prova-social"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-600/50 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-all hover:bg-white/10 hover:border-slate-500"
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
                className="flex flex-col items-center gap-2 rounded-2xl bg-white/5 p-4 backdrop-blur ring-1 ring-white/10"
              >
                <f.icon className="h-6 w-6 text-emerald-400" />
                <span className="text-sm font-semibold text-white">{f.title}</span>
                <span className="text-xs text-slate-400">{f.desc}</span>
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
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500 to-amber-500 blur-2xl opacity-30" />
            <img
              src="/001.jpeg"
              alt="Model with Aeterna Creatina"
              className="relative h-[600px] w-full rounded-3xl object-cover shadow-2xl ring-1 ring-white/10"
            />
            
            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -left-8 top-20 rounded-2xl bg-white/10 px-5 py-3 backdrop-blur-xl ring-1 ring-white/20"
            >
              <p className="text-xs font-medium text-slate-300">Premium</p>
              <p className="text-lg font-bold text-white">Qualidade</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-4 bottom-32 rounded-2xl bg-emerald-500/20 px-5 py-3 backdrop-blur-xl ring-1 ring-emerald-500/30"
            >
              <p className="text-xs font-medium text-emerald-300">Resultados</p>
              <p className="text-lg font-bold text-white">Comprovados</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
