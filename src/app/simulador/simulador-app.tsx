"use client";

import { useState } from "react";
import {
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldCheck,
} from "lucide-react";
import Sidebar, { ROTULOS_SECAO, type SecaoId } from "@/simulador/components/Sidebar";
import VisaoGeral from "@/simulador/components/VisaoGeral";
import Kits from "@/simulador/components/Kits";
import Catalogo from "@/simulador/components/Catalogo";
import PedidoAtual from "@/simulador/components/PedidoAtual";
import ClientesSection from "@/simulador/components/Clientes";
import PropostaModal from "@/simulador/components/PropostaModal";
import { usePedidoStore } from "@/simulador/store/pedido";
import { cn } from "@/simulador/lib/cn";

export default function SimuladorApp() {
  const [secao, setSecao] = useState<SecaoId>("visao-geral");
  const [colapsado, setColapsado] = useState(false);
  const [menuMobile, setMenuMobile] = useState(false);
  const [propostaAberta, setPropostaAberta] = useState(false);

  const quantidadeItens = usePedidoStore((s) => s.itens.length);

  const irPara = (id: SecaoId) => {
    setSecao(id);
    setMenuMobile(false);
  };

  return (
    <div className="sim-app flex h-screen w-full overflow-hidden bg-slate-50 text-slate-900">
      {/* Sidebar desktop */}
      <div className="hidden h-full shrink-0 lg:block">
        <Sidebar
          collapsed={colapsado}
          active={secao}
          badgeResumo={quantidadeItens}
          onSelect={irPara}
        />
      </div>

      {/* Drawer mobile */}
      {menuMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setMenuMobile(false)}
          />
          <div className="absolute inset-y-0 left-0 shadow-xl">
            <Sidebar
              collapsed={false}
              active={secao}
              badgeResumo={quantidadeItens}
              onSelect={irPara}
            />
          </div>
        </div>
      )}

      {/* Conteúdo principal */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white px-4">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => setMenuMobile(true)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <button
              onClick={() => setColapsado((v) => !v)}
              className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 lg:inline-flex"
              aria-label={colapsado ? "Expandir menu" : "Recolher menu"}
            >
              {colapsado ? (
                <PanelLeftOpen className="h-[18px] w-[18px]" strokeWidth={1.5} />
              ) : (
                <PanelLeftClose className="h-[18px] w-[18px]" strokeWidth={1.5} />
              )}
            </button>
            <div className="flex min-w-0 items-center gap-2 text-sm text-slate-500">
              <span className="hidden shrink-0 sm:inline">Aeterna</span>
              <span className="hidden shrink-0 text-slate-300 sm:inline">/</span>
              <span className="truncate font-medium text-slate-900">
                {ROTULOS_SECAO[secao]}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:inline-flex">
              <ShieldCheck className="h-4 w-4" />
              Consultor · Área restrita
            </span>
          </div>
        </header>

        <main className={cn("flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8")}>
          <div className="mx-auto max-w-6xl">
            {secao === "visao-geral" && <VisaoGeral irPara={irPara} />}
            {secao === "kits" && <Kits />}
            {secao === "catalogo" && <Catalogo />}
            {secao === "resumo" && (
              <div className="mx-auto max-w-3xl">
                <h1 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
                  Resumo do pedido
                </h1>
                <PedidoAtual aoGerarProposta={() => setPropostaAberta(true)} />
              </div>
            )}
            {secao === "clientes" && <ClientesSection />}
          </div>
        </main>
      </div>

      {propostaAberta && (
        <PropostaModal aoFechar={() => setPropostaAberta(false)} />
      )}
    </div>
  );
}