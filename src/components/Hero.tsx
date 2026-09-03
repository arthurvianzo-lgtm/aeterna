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
              className="gap-2 rounded-full bg-emerald-600 px-7 text-base font-medium text-white shadow-xl shadow-emerald-900/20 hover:bg-emerald-700 hover:shadow-emerald-900/30"
            >
              <MessageCircle className="h-5 w-5" />
              Lançar Linha Própria
            </OriginButton>
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

        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex items-center justify-center gap-4"
          >
            <img
              src="/001.jpeg"
              alt="Aeterna Creatina Product 1"
              className="h-[450px] w-auto rounded-3xl object-cover shadow-2xl"
            />
            <img
              src="/002.jpeg"
              alt="Aeterna Creatina Product 2"
              className="h-[450px] w-auto rounded-3xl object-cover shadow-2xl"
            />
            <img
              src="/003.jpeg"
              alt="Aeterna Creatina Product 3"
              className="h-[450px] w-auto rounded-3xl object-cover shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
