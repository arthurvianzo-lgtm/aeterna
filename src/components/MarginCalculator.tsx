"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, TrendingUp, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import ComparisonTable from "./ComparisonTable";
import AnimatedNumber from "./AnimatedNumber";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { OriginButton } from "@/components/ui/origin-button";

const TRADITIONAL_MARGIN = 0.25;
const AETERNA_MARGIN = 1.0;

export default function MarginCalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(10000);

  const traditionalProfit = Math.round(monthlyRevenue * TRADITIONAL_MARGIN);
  const aeternProfit = Math.round(monthlyRevenue * AETERNA_MARGIN);
  const difference = aeternProfit - traditionalProfit;

  return (
    <section id="margem" className="relative overflow-hidden bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Veja a diferença na{" "}
            <span className="text-gradient bg-gradient-to-r from-emerald-600 to-emerald-500">
              sua margem
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Arraste para simular o quanto sua academia deixa de lucrar ao revender
            marcas tradicionais.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 shadow-sm sm:p-8">
            {/* Slider control */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="revenue" className="text-sm font-medium text-slate-700">
                  Faturamento mensal com suplementos
                </label>
                <span className="text-sm font-semibold text-slate-900">
                  <AnimatedNumber value={monthlyRevenue} prefix="R$ " />
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
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-emerald-600"
              />
              <div className="flex justify-between text-xs font-medium text-slate-400">
                <span>R$ 2.000</span>
                <span>R$ 50.000</span>
              </div>
            </div>

            {/* Comparison cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {/* Traditional */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-slate-500">
                    Revenda de marcas tradicionais
                  </h3>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
                    ~25%
                  </span>
                </div>
                <p className="mt-4 text-3xl font-bold text-slate-400">
                  <AnimatedNumber value={traditionalProfit} prefix="R$ " />
                </p>
                <p className="text-xs text-slate-400">lucro estimado por mês</p>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    animate={{ width: `${TRADITIONAL_MARGIN * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full rounded-full bg-slate-300"
                  />
                </div>
              </div>

              {/* Aeterna */}
              <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-white p-6">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-emerald-600" />
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-slate-900">
                    Linha própria Aeterna
                  </h3>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200/70">
                    +100%
                  </span>
                </div>
                <p className="mt-4 text-3xl font-bold text-emerald-700">
                  <AnimatedNumber value={aeternProfit} prefix="R$ " />
                </p>
                <p className="text-xs text-slate-500">lucro estimado por mês</p>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-emerald-50">
                  <motion.div
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5 }}
                    className="h-full rounded-full bg-emerald-600"
                  />
                </div>
              </div>
            </div>

            {/* Difference banner */}
            <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-slate-900 p-6 text-center sm:flex-row sm:text-left">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-400">
                  <TrendingUp className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-300">
                    Diferença com a Aeterna
                  </p>
                  <p className="text-2xl font-bold text-white">
                    <AnimatedNumber value={difference} prefix="R$ " />{" "}
                    <span className="text-sm font-medium text-emerald-400">
                      a mais por mês
                    </span>
                  </p>
                </div>
              </div>
              <OriginButton
                onClick={() =>
                  window.open(
                    buildWhatsAppLink(
                      `Olá! Quero uma simulação completa de margem para minha academia. Meu faturamento mensal com suplementos é de aproximadamente R$ ${monthlyRevenue}.`
                    ),
                    "_blank",
                    "noopener"
                  )
                }
                className="min-w-48 gap-2 rounded-full bg-emerald-600 text-sm font-medium text-white shadow-lg shadow-emerald-900/20 hover:bg-emerald-500 hover:shadow-emerald-900/30"
              >
                <MessageCircle className="h-4 w-4" />
                Simular com a Aeterna
              </OriginButton>
            </div>
          </div>
        </Reveal>

        {/* Feature comparison */}
        <div className="mt-12">
          <Reveal className="mx-auto mb-8 max-w-xl text-center">
            <h3 className="text-xl font-semibold tracking-tight text-slate-900">
              Tradicional vs. Aeterna
            </h3>
            <p className="mt-2 flex items-center justify-center gap-2 text-sm text-slate-500">
              Veja o que muda ao ter a sua própria linha
              <ArrowRight className="hidden h-4 w-4 sm:block" />
            </p>
          </Reveal>
          <ComparisonTable />
        </div>
      </div>
    </section>
  );
}
