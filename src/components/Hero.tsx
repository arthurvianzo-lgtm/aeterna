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

            {/* SVG Product Bottle */}
            <div className="mt-5 flex items-center justify-center">
              <svg
                viewBox="0 0 400 500"
                className="h-72 w-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background glow */}
                <defs>
                  <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="bottleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#065f46" />
                    <stop offset="50%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#065f46" />
                  </linearGradient>
                  <linearGradient id="capGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#b45309" />
                    <stop offset="50%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                  <linearGradient id="labelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#f0fdf4" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Glow effect */}
                <circle cx="200" cy="250" r="180" fill="url(#glow)" />

                {/* Bottle shadow */}
                <ellipse cx="200" cy="470" rx="70" ry="12" fill="#000000" opacity="0.1" />

                {/* Bottle body */}
                <path
                  d="M140 120 L140 400 Q140 440 200 440 Q260 440 260 400 L260 120 Z"
                  fill="url(#bottleGradient)"
                  stroke="#047857"
                  strokeWidth="2"
                />

                {/* Bottle neck */}
                <rect x="155" y="80" width="90" height="45" fill="url(#bottleGradient)" stroke="#047857" strokeWidth="2" />

                {/* Cap */}
                <path
                  d="M150 60 L150 80 Q150 85 155 85 L245 85 Q250 85 250 80 L250 60 Q250 50 200 50 Q150 50 150 60"
                  fill="url(#capGradient)"
                  stroke="#92400e"
                  strokeWidth="2"
                />

                {/* Label background */}
                <rect x="155" y="160" width="90" height="120" rx="8" fill="url(#labelGradient)" stroke="#d1fae5" strokeWidth="1" />

                {/* Label text - Brand */}
                <text x="200" y="195" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#065f46">
                  AETERNA
                </text>

                {/* Label text - Product */}
                <text x="200" y="220" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="600" fill="#047857">
                  Creatina
                </text>

                {/* Label text - Flavor */}
                <text x="200" y="245" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="#6b7280">
                  Morango Cristalino
                </text>

                {/* Label decorative line */}
                <line x1="165" y1="255" x2="235" y2="255" stroke="#10b981" strokeWidth="2" />

                {/* Label weight */}
                <text x="200" y="275" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#374151">
                  300g
                </text>

                {/* Badge: 100% REGULADO */}
                <g transform="translate(60, 140)">
                  <rect x="0" y="0" width="75" height="24" rx="12" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
                  <text x="37.5" y="16" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="#047857">
                    100% REGULADO
                  </text>
                </g>

                {/* Badge: ZERO TRABALHO */}
                <g transform="translate(265, 180)">
                  <rect x="0" y="0" width="70" height="24" rx="12" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                  <text x="35" y="16" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="#92400e">
                    ZERO TRABALHO
                  </text>
                </g>

                {/* Badge: +100% MARGEM */}
                <g transform="translate(50, 320)">
                  <rect x="0" y="0" width="80" height="24" rx="12" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
                  <text x="40" y="16" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="#047857">
                    +100% MARGEM
                  </text>
                </g>

                {/* Badge: Turnkey */}
                <g transform="translate(270, 300)">
                  <rect x="0" y="0" width="60" height="24" rx="12" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
                  <text x="30" y="16" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="#065f46">
                    Turnkey
                  </text>
                </g>

                {/* Small icon badges */}
                <circle cx="85" cy="250" r="18" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
                <text x="85" y="255" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#10b981">
                  ✓
                </text>

                <circle cx="315" cy="240" r="18" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
                <text x="315" y="245" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#d97706">
                  ★
                </text>
              </svg>
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
