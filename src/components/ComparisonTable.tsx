"use client";

import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

export type FeatureStatus = boolean | "partial" | string;

interface FeatureRow {
  label: string;
  description?: string;
  traditional: FeatureStatus;
  aeterna: FeatureStatus;
}

const FEATURES: FeatureRow[] = [
  {
    label: "Margem por produto",
    traditional: "~20-30%",
    aeterna: "+100%",
  },
  {
    label: "Exclusividade da marca",
    traditional: false,
    aeterna: true,
  },
  {
    label: "Controle de preço",
    traditional: false,
    aeterna: true,
  },
  {
    label: "Identidade da sua marca",
    traditional: false,
    aeterna: true,
  },
  {
    label: "Fidelização de clientes",
    traditional: "Baixa",
    aeterna: "Alta",
  },
  {
    label: "Acesso a fábricas validadas",
    traditional: "Sem indicação",
    aeterna: "Rede Aeterna",
  },
];

function StatusCell({ value, positive }: { value: FeatureStatus; positive?: boolean }) {
  if (typeof value === "boolean") {
    if (value) {
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
            positive
              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/70"
              : "bg-slate-50 text-slate-500 ring-1 ring-slate-200"
          }`}
        >
          <Check className="h-3.5 w-3.5" />
          Sim
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-400 ring-1 ring-slate-200">
        <X className="h-3.5 w-3.5" />
        Não
      </span>
    );
  }

  if (value === "partial") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 ring-1 ring-amber-200/70">
        <Minus className="h-3.5 w-3.5" />
        Parcial
      </span>
    );
  }

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        positive
          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/70"
          : "bg-slate-50 text-slate-500 ring-1 ring-slate-200"
      }`}
    >
      {value}
    </span>
  );
}

export default function ComparisonTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
    >
      {/* Header (md and up) */}
      <div className="hidden grid-cols-[1.2fr_1fr_1fr] items-center border-b border-slate-200/80 bg-slate-50/70 md:grid">
        <div className="px-5 py-4">
          <span className="text-sm font-medium text-slate-500">Característica</span>
        </div>
        <div className="border-l border-slate-200/80 px-5 py-4">
          <span className="text-sm font-medium text-slate-500">Revenda</span>
        </div>
        <div className="border-l border-emerald-200/70 bg-emerald-50/40 px-5 py-4">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
            <Check className="h-4 w-4" /> Aeterna
          </span>
        </div>
      </div>

      {/* Rows */}
      {FEATURES.map((f, i) => (
        <div
          key={f.label}
          className={`border-b border-slate-100 transition-colors last:border-b-0 ${
            i % 2 ? "bg-slate-50/40" : "bg-white"
          }`}
        >
          {/* Desktop layout */}
          <div className="hidden items-center md:grid md:grid-cols-[1.2fr_1fr_1fr]">
            <div className="px-5 py-3.5">
              <p className="text-sm font-medium text-slate-800">{f.label}</p>
              {f.description && (
                <p className="mt-0.5 text-xs text-slate-400">{f.description}</p>
              )}
            </div>
            <div className="border-l border-slate-100 px-5 py-3.5">
              <StatusCell value={f.traditional} />
            </div>
            <div className="border-l border-emerald-100 bg-emerald-50/30 px-5 py-3.5">
              <StatusCell value={f.aeterna} positive />
            </div>
          </div>

          {/* Mobile layout */}
          <div className="px-5 py-4 md:hidden">
            <p className="text-sm font-medium text-slate-800">{f.label}</p>
            {f.description && (
              <p className="mt-0.5 text-xs text-slate-400">{f.description}</p>
            )}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <p className="mb-1.5 text-xs font-medium text-slate-400">Revenda</p>
                <StatusCell value={f.traditional} />
              </div>
              <div>
                <p className="mb-1.5 text-xs font-medium text-emerald-600">Aeterna</p>
                <StatusCell value={f.aeterna} positive />
              </div>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
