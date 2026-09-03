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

            {/* SVG Product Display */}
            <div className="mt-5 flex items-center justify-center">
              <svg
                viewBox="0 0 600 500"
                className="h-72 w-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Gold gradient for display */}
                  <linearGradient id="goldBase" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>

                  {/* Green gradient for bottles */}
                  <linearGradient id="bottleGreen" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#064e3b" />
                    <stop offset="30%" stopColor="#059669" />
                    <stop offset="70%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#064e3b" />
                  </linearGradient>

                  {/* Cap gradient */}
                  <linearGradient id="capGold" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#b45309" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>

                  {/* Pink gummies gradient */}
                  <linearGradient id="gummiesPink" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f472b6" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#db2777" />
                  </linearGradient>

                  {/* Label gradient */}
                  <linearGradient id="labelWhite" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#f0fdf4" />
                  </linearGradient>

                  {/* Shadow */}
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15" />
                  </filter>

                  {/* Glass effect */}
                  <linearGradient id="glassEffect" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Background decorative geometric structures */}
                <g opacity="0.15">
                  <rect x="50" y="50" width="80" height="200" fill="#94a3b8" transform="rotate(-15 90 150)" />
                  <rect x="480" y="80" width="60" height="150" fill="#94a3b8" transform="rotate(20 510 155)" />
                  <circle cx="100" cy="400" r="40" fill="#e2e8f0" />
                  <circle cx="520" cy="350" r="30" fill="#e2e8f0" />
                </g>

                {/* Decorative bar charts */}
                <g transform="translate(40, 280)">
                  <rect x="0" y="40" width="15" height="60" fill="#10b981" opacity="0.4" rx="2" />
                  <rect x="20" y="20" width="15" height="80" fill="#f59e0b" opacity="0.4" rx="2" />
                  <rect x="40" y="30" width="15" height="70" fill="#10b981" opacity="0.4" rx="2" />
                </g>

                <g transform="translate(520, 250)">
                  <rect x="0" y="30" width="12" height="50" fill="#f59e0b" opacity="0.4" rx="2" />
                  <rect x="16" y="10" width="12" height="70" fill="#10b981" opacity="0.4" rx="2" />
                  <rect x="32" y="25" width="12" height="55" fill="#f59e0b" opacity="0.4" rx="2" />
                </g>

                {/* Staggered display platform */}
                {/* Back level */}
                <path d="M100 350 L300 390 L500 350 L500 360 L300 400 L100 360 Z" fill="url(#goldBase)" opacity="0.8" />
                {/* Middle level */}
                <path d="M120 370 L300 405 L480 370 L480 380 L300 415 L120 380 Z" fill="url(#goldBase)" opacity="0.9" />
                {/* Front transparent platform */}
                <path d="M80 390 L300 430 L520 390 L520 400 L300 440 L80 400 Z" fill="url(#glassEffect)" stroke="#d1d5db" strokeWidth="1" />

                {/* Background bottles (smaller, behind) */}
                <g transform="translate(130, 180) scale(0.75)">
                  <path d="M30 40 L30 160 Q30 190 60 190 Q90 190 90 160 L90 40 Z" fill="url(#bottleGreen)" opacity="0.6" />
                  <rect x="40" y="25" width="40" height="20" fill="url(#bottleGreen)" opacity="0.6" />
                  <path d="M35 10 L35 25 Q35 28 40 28 L80 28 Q85 28 85 25 L85 10 Q85 5 60 5 Q35 5 35 10" fill="url(#capGold)" opacity="0.6" />
                </g>

                <g transform="translate(380, 170) scale(0.8)">
                  <path d="M30 40 L30 160 Q30 190 60 190 Q90 190 90 160 L90 40 Z" fill="url(#bottleGreen)" opacity="0.6" />
                  <rect x="40" y="25" width="40" height="20" fill="url(#bottleGreen)" opacity="0.6" />
                  <path d="M35 10 L35 25 Q35 28 40 28 L80 28 Q85 28 85 25 L85 10 Q85 5 60 5 Q35 5 35 10" fill="url(#capGold)" opacity="0.6" />
                </g>

                {/* Left side bottle */}
                <g transform="translate(70, 200) scale(0.85)">
                  <path d="M30 40 L30 160 Q30 190 60 190 Q90 190 90 160 L90 40 Z" fill="url(#bottleGreen)" opacity="0.8" />
                  <rect x="40" y="25" width="40" height="20" fill="url(#bottleGreen)" opacity="0.8" />
                  <path d="M35 10 L35 25 Q35 28 40 28 L80 28 Q85 28 85 25 L85 10 Q85 5 60 5 Q35 5 35 10" fill="url(#capGold)" opacity="0.8" />
                </g>

                {/* Main front bottle */}
                <g transform="translate(220, 130)" filter="url(#shadow)">
                  {/* Bottle body */}
                  <path
                    d="M25 50 L25 200 Q25 240 75 240 Q125 240 125 200 L125 50 Z"
                    fill="url(#bottleGreen)"
                    stroke="#047857"
                    strokeWidth="2"
                  />

                  {/* Pink gummies content (visible through bottle) */}
                  <ellipse cx="75" cy="180" rx="35" ry="25" fill="url(#gummiesPink)" opacity="0.7" />
                  <ellipse cx="60" cy="160" rx="12" ry="8" fill="url(#gummiesPink)" opacity="0.6" />
                  <ellipse cx="90" cy="165" rx="10" ry="7" fill="url(#gummiesPink)" opacity="0.6" />
                  <ellipse cx="75" cy="200" rx="15" ry="10" fill="url(#gummiesPink)" opacity="0.5" />

                  {/* Bottle neck */}
                  <rect x="45" y="30" width="60" height="25" fill="url(#bottleGreen)" stroke="#047857" strokeWidth="2" />

                  {/* Cap */}
                  <path
                    d="M40 10 L40 30 Q40 33 45 33 L105 33 Q110 33 110 30 L110 10 Q110 0 75 0 Q40 0 40 10"
                    fill="url(#capGold)"
                    stroke="#92400e"
                    strokeWidth="2"
                  />

                  {/* Label */}
                  <rect x="30" y="70" width="90" height="110" rx="6" fill="url(#labelWhite)" stroke="#d1fae5" strokeWidth="1" />

                  {/* Label content */}
                  <text x="75" y="88" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="bold" fill="#065f46">
                    AETERNA
                  </text>
                  <text x="75" y="102" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="600" fill="#047857">
                    CREATINA AETERNA
                  </text>
                  <text x="75" y="118" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="7" fill="#6b7280">
                    Performance e Recuperação
                  </text>
                  <text x="75" y="130" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="7" fill="#6b7280">
                    Aumento de Força
                  </text>
                  <line x1="40" y1="136" x2="110" y2="136" stroke="#10b981" strokeWidth="1" />
                  <text x="75" y="148" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="7" fill="#374151">
                    Sabor Morango Cristalino
                  </text>
                  <text x="75" y="160" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="6" fill="#9ca3af">
                    SUPLEMENTO ALIMENTAR
                  </text>
                  <text x="75" y="170" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="6" fill="#9ca3af">
                    EM PASTILHA DE GOMA
                  </text>
                  <text x="75" y="182" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="#374151">
                    180g
                  </text>
                  <text x="75" y="194" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="7" fill="#6b7280">
                    80 GUMMIES
                  </text>
                </g>

                {/* Floating badges */}
                {/* 100% REGULADO - ANVISA (circle) */}
                <g transform="translate(30, 60)">
                  <circle cx="45" cy="45" r="40" fill="#ffffff" stroke="#10b981" strokeWidth="2" opacity="0.95" />
                  <text x="45" y="40" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="#047857">
                    100%
                  </text>
                  <text x="45" y="52" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="7" fontWeight="bold" fill="#047857">
                    REGULADO
                  </text>
                  <text x="45" y="62" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="6" fill="#047857">
                    ANVISA
                  </text>
                </g>

                {/* ZERO TRABALHO (white rounded rect) */}
                <g transform="translate(460, 70)">
                  <rect x="0" y="0" width="90" height="30" rx="15" fill="#ffffff" stroke="#d97706" strokeWidth="2" />
                  <text x="45" y="19" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="#92400e">
                    ZERO TRABALHO
                  </text>
                </g>

                {/* +100% MARGEM MÉDIA (white rounded rect) */}
                <g transform="translate(40, 340)">
                  <rect x="0" y="0" width="115" height="30" rx="15" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
                  <text x="57.5" y="19" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="#047857">
                    +100% MARGEM MÉDIA
                  </text>
                </g>

                {/* Turnkey with truck icon */}
                <g transform="translate(480, 310)">
                  <circle cx="25" cy="25" r="22" fill="#f0fdf4" stroke="#059669" strokeWidth="2" />
                  {/* Simple truck icon */}
                  <path d="M15 20 L15 28 L35 28 L35 20 M15 20 L20 15 L30 15 L35 20" fill="none" stroke="#065f46" strokeWidth="2" />
                  <circle cx="20" cy="28" r="3" fill="#065f46" />
                  <circle cx="30" cy="28" r="3" fill="#065f46" />
                  <text x="25" y="55" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="#065f46">
                    Turnkey
                  </text>
                </g>
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
