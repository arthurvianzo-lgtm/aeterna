"use client";

import {
  FolderKanban,
  FlaskConical,
  ShoppingCart,
  Users,
  ArrowRight,
  Wand2,
} from "lucide-react";
import Indicadores from "./Indicadores";
import { usePedidoStore } from "@/simulador/store/pedido";
import { resumoPedido } from "@/simulador/lib/calculos";
import { formatBRL } from "@/simulador/lib/format";
import { QUANTIDADE_MINIMA } from "@/simulador/config/regras-comerciais";
import type { SecaoId } from "./Sidebar";

const ACOES: {
  id: SecaoId;
  titulo: string;
  descricao: string;
  icon: React.ElementType;
}[] = [
  {
    id: "kits",
    titulo: "Kits estratégicos",
    descricao: "Comece por um kit pronto ou crie o seu.",
    icon: FolderKanban,
  },
  {
    id: "catalogo",
    titulo: "Catálogo de produtos",
    descricao: `Navegue pelas 3 linhas e adicione produtos (mín. ${QUANTIDADE_MINIMA} un.).`,
    icon: FlaskConical,
  },
  {
    id: "resumo",
    titulo: "Resumo do pedido",
    descricao: "Confira o pedido, desconto e comissão.",
    icon: ShoppingCart,
  },
  {
    id: "clientes",
    titulo: "Clientes",
    descricao: "Gerencie seus clientes e use no pedido atual.",
    icon: Users,
  },
];

export default function VisaoGeral({ irPara }: { irPara: (id: SecaoId) => void }) {
  const itens = usePedidoStore((s) => s.itens);
  const planoId = usePedidoStore((s) => s.planoId);
  const carregarKitRecomendado = usePedidoStore((s) => s.carregarKitRecomendado);
  const resumo = resumoPedido(itens, planoId);
  const vazio = itens.length === 0;

  return (
    <section>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Visão geral
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Acompanhe o pedido atual e comece a montar a venda.
        </p>
      </div>

      <div className="mt-5">
        <Indicadores />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        {/* Estado do pedido atual */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900">Pedido atual</h2>
          </div>
          {vazio ? (
            <div className="mt-4 flex flex-col items-start gap-3">
              <p className="text-sm text-slate-500">
                Nenhum produto no pedido ainda. Carregue o kit recomendado para
                começar ou monte uma cotação do catálogo.
              </p>
              <button
                onClick={carregarKitRecomendado}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-700"
              >
                <Wand2 className="h-4 w-4" />
                Carregar kit recomendado
              </button>
            </div>
          ) : (
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Produtos</span>
                <span className="font-semibold text-slate-900">{itens.length}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Total do pedido</span>
                <span className="font-bold text-slate-900">
                  {formatBRL(resumo.totalLiquido)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Comissão do vendedor</span>
                <span className="font-semibold text-emerald-700">
                  {formatBRL(resumo.comissao)}
                </span>
              </div>
              <button
                onClick={() => irPara("resumo")}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Ver resumo do pedido
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="grid gap-4 sm:grid-cols-2">
          {ACOES.map((acao) => (
            <button
              key={acao.id}
              onClick={() => irPara(acao.id)}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-sm transition hover:border-emerald-300 hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-emerald-50 group-hover:text-emerald-600">
                <acao.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">{acao.titulo}</p>
                <p className="mt-0.5 text-xs text-slate-500">{acao.descricao}</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-slate-300 transition group-hover:text-emerald-600" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}