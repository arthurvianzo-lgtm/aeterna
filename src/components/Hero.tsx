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

        {/* SVG Product Display - Direct bottles without card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              viewBox="0 0 500 450"
              className="h-96 w-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
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

                {/* Label gradient */}
                <linearGradient id="labelWhite" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#f0fdf4" />
                </linearGradient>

                {/* Pink gummies gradient */}
                <linearGradient id="gummiesPink" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#db2777" />
                </linearGradient>

                {/* Shadow */}
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.2" />
                </filter>
              </defs>

              {/* Background bottle (left, smaller) */}
              <g transform="translate(60, 120) scale(0.8)" opacity="0.7">
                <path d="M30 40 L30 160 Q30 190 60 190 Q90 190 90 160 L90 40 Z" fill="url(#bottleGreen)" />
                <rect x="40" y="25" width="40" height="20" fill="url(#bottleGreen)" />
                <path d="M35 10 L35 25 Q35 28 40 28 L80 28 Q85 28 85 25 L85 10 Q85 5 60 5 Q35 5 35 10" fill="url(#capGold)" />
                <rect x="35" y="80" width="50" height="70" rx="4" fill="url(#labelWhite)" />
                <text x="60" y="105" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#065f46">AETERNA</text>
                <text x="60" y="120" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="7" fill="#047857">CREATINA</text>
                <text x="60" y="135" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="6" fill="#6b7280">60 Gummies</text>
              </g>

              {/* Background bottle (right, smaller) */}
              <g transform="translate(350, 130) scale(0.75)" opacity="0.7">
                <path d="M30 40 L30 160 Q30 190 60 190 Q90 190 90 160 L90 40 Z" fill="url(#bottleGreen)" />
                <rect x="40" y="25" width="40" height="20" fill="url(#bottleGreen)" />
                <path d="M35 10 L35 25 Q35 28 40 28 L80 28 Q85 28 85 25 L85 10 Q85 5 60 5 Q35 5 35 10" fill="url(#capGold)" />
                <rect x="35" y="80" width="50" height="70" rx="4" fill="url(#labelWhite)" />
                <text x="60" y="105" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#065f46">AETERNA</text>
                <text x="60" y="120" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="7" fill="#047857">CREATINA</text>
                <text x="60" y="135" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="6" fill="#6b7280">60 Gummies</text>
              </g>

              {/* Main front bottle */}
              <g transform="translate(175, 100)" filter="url(#shadow)">
                {/* Bottle body */}
                <path
                  d="M25 50 L25 200 Q25 240 75 240 Q125 240 125 200 L125 50 Z"
                  fill="url(#bottleGreen)"
                  stroke="#047857"
                  strokeWidth="2"
                />

                {/* Pink gummies content (visible through bottle) */}
                <ellipse cx="75" cy="180" rx="35" ry="25" fill="url(#gummiesPink)" opacity="0.6" />
                <ellipse cx="60" cy="160" rx="12" ry="8" fill="url(#gummiesPink)" opacity="0.5" />
                <ellipse cx="90" cy="165" rx="10" ry="7" fill="url(#gummiesPink)" opacity="0.5" />
                <ellipse cx="75" cy="200" rx="15" ry="10" fill="url(#gummiesPink)" opacity="0.4" />

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
                <rect x="35" y="80" width="80" height="100" rx="6" fill="url(#labelWhite)" stroke="#d1fae5" strokeWidth="1" />

                {/* Label content */}
                <text x="75" y="105" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#065f46">
                  AETERNA
                </text>
                <text x="75" y="125" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="600" fill="#047857">
                  CREATINA
                </text>
                <text x="75" y="145" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fill="#6b7280">
                  Morango Cristalino
                </text>
                <line x1="45" y1="152" x2="105" y2="152" stroke="#10b981" strokeWidth="1.5" />
                <text x="75" y="168" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="#374151">
                  60 Gummies
                </text>
              </g>

              {/* Floating badges */}
              {/* 100% REGULADO - ANVISA */}
              <g transform="translate(30, 50)">
                <rect x="0" y="0" width="95" height="26" rx="13" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
                <text x="47.5" y="17" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="#047857">
                  100% REGULADO
                </text>
                <text x="47.5" y="36" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="6" fill="#047857">
                  ANVISA
                </text>
              </g>

              {/* ZERO TRABALHO */}
              <g transform="translate(370, 60)">
                <rect x="0" y="0" width="80" height="26" rx="13" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
                <text x="40" y="17" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="#92400e">
                  ZERO TRABALHO
                </text>
              </g>

              {/* +100% MARGEM MÉDIA */}
              <g transform="translate(40, 360)">
                <rect x="0" y="0" width="105" height="26" rx="13" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
                <text x="52.5" y="17" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="#047857">
                  +100% MARGEM
                </text>
              </g>

              {/* Turnkey */}
              <g transform="translate(380, 340)">
                <circle cx="20" cy="20" r="18" fill="#f0fdf4" stroke="#059669" strokeWidth="2" />
                <text x="20" y="24" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#065f46">
                  ✓
                </text>
                <text x="20" y="48" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="7" fontWeight="bold" fill="#065f46">
                  Turnkey
                </text>
              </g>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
