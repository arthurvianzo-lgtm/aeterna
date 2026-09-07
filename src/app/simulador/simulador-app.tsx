"use client";

import { useState } from "react";
import Header from "@/simulador/components/Header";
import Indicadores from "@/simulador/components/Indicadores";
import Combos from "@/simulador/components/Combos";
import Catalogo from "@/simulador/components/Catalogo";
import PedidoAtual from "@/simulador/components/PedidoAtual";
import PropostaModal from "@/simulador/components/PropostaModal";

export default function SimuladorApp() {
  const [propostaAberta, setPropostaAberta] = useState(false);

  return (
    <div className="sim-app min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Monte o pedido do seu{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                cliente
              </span>
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Catálogo direto da fábrica · pedido mínimo de 100 potes por
              produto · 15% de comissão do vendedor já inclusa.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <Indicadores />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.55fr_1fr]">
          <div className="min-w-0 space-y-10">
            <Combos />
            <Catalogo />
          </div>

          <aside className="lg:sticky lg:top-20 lg:self-start">
            <PedidoAtual aoGerarProposta={() => setPropostaAberta(true)} />
          </aside>
        </div>
      </main>

      {propostaAberta && (
        <PropostaModal aoFechar={() => setPropostaAberta(false)} />
      )}
    </div>
  );
}