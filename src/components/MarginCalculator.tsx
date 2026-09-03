"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Check, MessageCircle, TrendingUp } from "lucide-react";
import Reveal from "./Reveal";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { OriginButton } from "@/components/ui/origin-button";

const TRADITIONAL_MARGIN = 0.25;
const AETERNA_MARGIN = 1.0;

const features = [
  { label: "Margem por produto", traditional: "~20-30%", aeterna: "+100%" },
  { label: "Exclusividade da marca", traditional: false, aeterna: true },
  { label: "Controle de preço", traditional: false, aeterna: true },
  { label: "Identidade da academia", traditional: false, aeterna: true },
  { label: "Fidelização de alunos", traditional: "Baixa", aeterna: "Alta" },
  { label: "Histórico com fornecedores", traditional: true, aeterna: false },
];

export default function MarginCalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(10000);

  const traditionalProfit = Math.round(monthlyRevenue * TRADITIONAL_MARGIN);
  const aeternProfit = Math.round(monthlyRevenue * AETERNA_MARGIN);
  const difference = aeternProfit - traditionalProfit;

  const fmt = (n: number) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

  return (
    <section id="margem" className="relative overflow-hidden bg-white py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-64 w-[700px] -translate-x-1/2 rounded-full bg-emerald-50 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Veja a diferença na{" "}
            <span className="text-gradient bg-gradient-to-r from-emerald-600 to-teal-500">
              sua margem
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Arraste para simular o quanto sua academia deixa de lucrar ao revender
            marcas tradicionais.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <div className="rounded-3xl border border-slate-200/80 bg-slate-50/60 p-6 shadow-xl shadow-slate-200/50 backdrop-blur sm:p-8">
            {/* Slider control */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="revenue" className="text-sm font-semibold text-slate-700">
                  Faturamento mensal com suplementos
                </label>
                <span className="rounded-full bg-white px-4 py-1 text-sm font-black text-slate-900 shadow-sm ring-1 ring-slate-200">
                  {fmt(monthlyRevenue)}
                </span>
              </div>
              <input
                id="revenue"
                type="range"
                min={2000}
                max={50000}
                step={500}
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-slate-300 to-emerald-400 accent-emerald-600"
              />
              <div className="flex justify-between text-xs font-medium text-slate-400">
                <span>R$ 2.000</span>
                <span>R$ 50.000</span>
              </div>
            </div>

            {/* Comparison */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {/* Traditional */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-500">
                    Revenda de marcas tradicionais
                  </h3>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-500">
                    ~25%
                  </span>
                </div>
                <p className="mt-4 text-3xl font-black text-slate-400">{fmt(traditionalProfit)}</p>
                <p className="text-xs text-slate-400">lucro estimado por mês</p>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    animate={{ width: `${TRADITIONAL_MARGIN * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full rounded-full bg-slate-300"
                  />
                </div>
                <div className="mt-6 space-y-2 text-sm text-slate-500">
                  <p className="flex items-center gap-2">
                    <X className="h-4 w-4 shrink-0 text-slate-400" /> Sem exclusividade
                  </p>
                  <p className="flex items-center gap-2">
                    <X className="h-4 w-4 shrink-0 text-slate-400" /> Sem controle de preço
                  </p>
                  <p className="flex items-center gap-2">
                    <X className="h-4 w-4 shrink-0 text-slate-400" /> Margem apertada
                  </p>
                </div>
              </div>

              {/* Aeterna */}
              <div className="relative rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-lg shadow-emerald-100/60">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald-600 px-4 py-1 text-xs font-bold text-white shadow">
                  Linha própria Aeterna
                </span>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-emerald-800">Exclusivo & premium</h3>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                    +100%
                  </span>
                </div>
                <p className="mt-4 text-3xl font-black text-emerald-700">
                  {fmt(aeternProfit)}
                </p>
                <p className="text-xs text-emerald-600/80">lucro estimado por mês</p>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-emerald-100">
                  <motion.div
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  />
                </div>
                <div className="mt-6 space-y-2 text-sm text-emerald-900">
                  <p className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-emerald-600" /> Exclusividade total
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-emerald-600" /> Controle de preço
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-emerald-600" /> Margem de sobra
                  </p>
                </div>
              </div>
            </div>

            {/* Difference banner */}
            <motion.div
              key={difference}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl bg-slate-900 p-6 text-center sm:flex-row sm:text-left"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <TrendingUp className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-300">
                    Diferença com a Aeterna
                  </p>
                  <p className="text-2xl font-black text-white">
                    {fmt(difference)}{" "}
                    <span className="text-sm font-semibold text-emerald-400">
                      a mais por mês
                    </span>
                  </p>
                </div>
              </div>
              <OriginButton
                onClick={() =>
                  window.open(
                    buildWhatsAppLink(
                      `Olá! Quero uma simulação completa de margem para minha academia. Meu faturamento mensal com suplementos é de aproximadamente ${fmt(monthlyRevenue)}.`
                    ),
                    "_blank",
                    "noopener"
                  )
                }
                className="gap-2 rounded-full bg-emerald-600 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500"
              >
                <MessageCircle className="h-4 w-4" />
                Simular com a Aeterna
              </OriginButton>
            </motion.div>
          </div>
        </Reveal>

        {/* Feature comparison table */}
        <Reveal delay={0.2} className="mt-10 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/40">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50 text-slate-500">
                  <th className="px-6 py-4 font-semibold">Característica</th>
                  <th className="px-6 py-4 font-semibold text-slate-500">Tradicional</th>
                  <th className="px-6 py-4 font-semibold text-emerald-700">Aeterna</th>
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr key={f.label} className={i % 2 ? "bg-slate-50/60" : "bg-white"}>
                    <td className="px-6 py-4 font-medium text-slate-800">{f.label}</td>
                    <td className="px-6 py-4">
                      {typeof f.traditional === "boolean" ? (
                        f.traditional ? (
                          <Check className="h-5 w-5 text-slate-300" />
                        ) : (
                          <X className="h-5 w-5 text-slate-300" />
                        )
                      ) : (
                        <span className="text-slate-500">{f.traditional}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {typeof f.aeterna === "boolean" ? (
                        f.aeterna ? (
                          <Check className="h-5 w-5 text-emerald-600" />
                        ) : (
                          <X className="h-5 w-5 text-slate-300" />
                        )
                      ) : (
                        <span className="font-semibold text-emerald-700">{f.aeterna}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
