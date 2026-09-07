"use client";

import { useState } from "react";
import {
  PackagePlus,
  Check,
  Sparkles,
  Boxes,
  Plus,
  Trash2,
} from "lucide-react";
import {
  combos,
  precoCombo,
  produtoPorId,
  QUANTIDADE_MINIMA,
} from "@/simulador/config/regras-comerciais";
import { usePedidoStore } from "@/simulador/store/pedido";
import { formatBRL } from "@/simulador/lib/format";
import type { ComboItem } from "@/simulador/types";
import CriarKitModal from "./CriarKitModal";

function precoDeItens(itens: ComboItem[]): number {
  return itens.reduce((acc, item) => {
    const produto = produtoPorId(item.produtoId);
    return acc + (produto?.precoUnitario ?? 0) * item.quantidade;
  }, 0);
}

export default function Kits() {
  const [modalAberto, setModalAberto] = useState(false);
  const kitsPersonalizados = usePedidoStore((s) => s.kitsPersonalizados);

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Kits <span className="text-gradient bg-gradient-to-r from-emerald-600 to-emerald-500">estratégicos</span>
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Kits prontos e os seus kits personalizados — cada produto entra com{" "}
            {QUANTIDADE_MINIMA} unidades (pedido mínimo da fábrica).
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {combos.map((combo) => (
          <CardKit key={combo.id} kitId={combo.id} recomendado={combo.recomendado} />
        ))}

        {kitsPersonalizados.map((kit) => (
          <CardKitPersonalizado key={kit.id} kitId={kit.id} />
        ))}

        <button
          onClick={() => setModalAberto(true)}
          className="flex min-h-52 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-300 bg-white/60 p-5 text-center transition hover:border-emerald-400 hover:bg-emerald-50/50"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Plus className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-bold text-slate-900">Criar seu kit</p>
            <p className="mt-0.5 text-xs text-slate-500">
              Monte um kit com os produtos de sua escolha e salve para reutilizar.
            </p>
          </div>
        </button>
      </div>

      {modalAberto && <CriarKitModal aoFechar={() => setModalAberto(false)} />}
    </section>
  );
}

function CardKit({ kitId, recomendado }: { kitId: string; recomendado?: boolean }) {
  const combo = combos.find((c) => c.id === kitId)!;
  const ativo = usePedidoStore((s) =>
    combo.itens.every((item) =>
      s.itens.some((i) => i.produtoId === item.produtoId && i.comboId === combo.id)
    )
  );
  const adicionarKit = usePedidoStore((s) => s.adicionarKit);
  const preco = precoCombo(combo);

  return (
    <article
      className={`relative flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition ${
        recomendado
          ? "border-emerald-300 ring-1 ring-emerald-200"
          : "border-slate-200/80 hover:border-slate-300"
      }`}
    >
      {recomendado && (
        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-0.5 text-[11px] font-bold text-white shadow">
          <Sparkles className="h-3 w-3" /> Recomendado
        </span>
      )}

      <h3 className="mt-2 text-base font-bold text-slate-900">{combo.nome}</h3>
      <p className="mt-0.5 text-xs text-slate-500">{combo.tagline}</p>

      <ul className="mt-3 space-y-1.5 border-t border-slate-100 pt-3 text-sm">
        {combo.itens.map((item) => {
          const produto = produtoPorId(item.produtoId);
          return (
            <li key={item.produtoId} className="flex items-center justify-between gap-2">
              <span className="truncate text-[13px] text-slate-600">
                {produto?.nome ?? "—"}
              </span>
              <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-slate-700">
                <Boxes className="h-3 w-3 text-slate-400" />
                {item.quantidade} un.
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-slate-400">
            Preço do kit
          </p>
          <p className="text-xl font-black text-slate-900">{formatBRL(preco)}</p>
        </div>
        {ativo && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <Check className="h-3.5 w-3.5" /> no pedido
          </span>
        )}
      </div>

      <button
        onClick={() => adicionarKit(combo.id)}
        className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
          recomendado
            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20 hover:bg-emerald-700"
            : "bg-slate-900 text-white hover:bg-slate-800"
        }`}
      >
        <PackagePlus className="h-4 w-4" />
        Adicionar kit
      </button>
    </article>
  );
}

function CardKitPersonalizado({ kitId }: { kitId: string }) {
  const kit = usePedidoStore((s) => s.kitsPersonalizados.find((k) => k.id === kitId))!;
  const adicionarKit = usePedidoStore((s) => s.adicionarKit);
  const removerKitPersonalizado = usePedidoStore((s) => s.removerKitPersonalizado);
  const preco = precoDeItens(kit.itens);

  return (
    <article className="relative flex flex-col rounded-2xl border border-slate-200/80 bg-slate-50 p-5 shadow-sm transition hover:border-slate-300">
      <span className="inline-flex w-fit items-center gap-1 rounded-full bg-slate-900 px-2.5 py-0.5 text-[11px] font-bold text-white">
        Seu kit
      </span>

      <h3 className="mt-2 text-base font-bold text-slate-900">{kit.nome}</h3>

      <ul className="mt-3 space-y-1.5 border-t border-slate-100 pt-3 text-sm">
        {kit.itens.map((item) => {
          const produto = produtoPorId(item.produtoId);
          return (
            <li key={item.produtoId} className="flex items-center justify-between gap-2">
              <span className="truncate text-[13px] text-slate-600">
                {produto?.nome ?? "—"}
              </span>
              <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-slate-700">
                <Boxes className="h-3 w-3 text-slate-400" />
                {item.quantidade} un.
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-slate-400">
            Preço do kit
          </p>
          <p className="text-xl font-black text-slate-900">{formatBRL(preco)}</p>
        </div>
        <button
          onClick={() => removerKitPersonalizado(kit.id)}
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-slate-400 transition hover:bg-red-50 hover:text-red-600"
          aria-label="Excluir kit"
        >
          <Trash2 className="h-4 w-4" />
          Excluir
        </button>
      </div>

      <button
        onClick={() => adicionarKit(kit.id)}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-700"
      >
        <PackagePlus className="h-4 w-4" />
        Adicionar kit
      </button>
    </article>
  );
}