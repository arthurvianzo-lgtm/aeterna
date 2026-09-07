"use client";

import { useMemo, useState } from "react";
import { X, Minus, Plus, PackagePlus, Save, Search } from "lucide-react";
import { produtos, QUANTIDADE_MINIMA } from "@/simulador/config/regras-comerciais";
import { usePedidoStore } from "@/simulador/store/pedido";
import { formatBRL } from "@/simulador/lib/format";
import type { ComboItem } from "@/simulador/types";

export default function CriarKitModal({ aoFechar }: { aoFechar: () => void }) {
  const [nome, setNome] = useState("");
  const [busca, setBusca] = useState("");
  const [selecao, setSelecao] = useState<Record<string, number>>({});
  const adicionarSelecao = usePedidoStore((s) => s.adicionarSelecao);
  const adicionarKitPersonalizado = usePedidoStore((s) => s.adicionarKitPersonalizado);

  const listagem = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return produtos.filter(
      (p) => !termo || `${p.nome} ${p.categoria} ${p.formato}`.toLowerCase().includes(termo)
    );
  }, [busca]);

  const itens: ComboItem[] = useMemo(
    () =>
      Object.entries(selecao)
        .filter(([, qtd]) => qtd > 0)
        .map(([produtoId, quantidade]) => ({ produtoId, quantidade })),
    [selecao]
  );

  const total = itens.reduce((acc, item) => {
    const p = produtos.find((x) => x.id === item.produtoId);
    return acc + (p?.precoUnitario ?? 0) * item.quantidade;
  }, 0);

  const alterarQtd = (produtoId: string, quantidade: number) => {
    setSelecao((atual) => {
      const proxima = Math.max(0, Math.round(quantidade / QUANTIDADE_MINIMA) * QUANTIDADE_MINIMA);
      const copia = { ...atual };
      if (proxima > 0) copia[produtoId] = proxima;
      else delete copia[produtoId];
      return copia;
    });
  };

  const fechar = () => aoFechar();

  const adicionarDireto = () => {
    if (itens.length === 0) return;
    adicionarSelecao(itens);
    fechar();
  };

  const salvarKit = () => {
    if (itens.length === 0 || !nome.trim()) return;
    adicionarKitPersonalizado({ nome, itens });
    fechar();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm sm:items-center">
      <div className="my-8 w-full max-w-2xl rounded-2xl bg-white shadow-2xl sm:my-0">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Criar seu kit</h2>
            <p className="text-xs text-slate-500">
              Monte um kit com os produtos de sua escolha (mínimo de{" "}
              {QUANTIDADE_MINIMA} unidades por produto).
            </p>
          </div>
          <button
            onClick={fechar}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5">
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Nome do kit
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex.: Kit academia premium"
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none ring-emerald-500/30 transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4"
          />

          <div className="relative mt-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar produto"
              className="w-full rounded-full border border-slate-200 py-2 pl-9 pr-3 text-sm text-slate-900 outline-none ring-emerald-500/30 transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4"
            />
          </div>

          <div className="mt-3 max-h-72 space-y-1 overflow-y-auto rounded-xl border border-slate-100 p-2">
            {listagem.map((produto) => {
              const qtd = selecao[produto.id] ?? 0;
              return (
                <div
                  key={produto.id}
                  className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 transition hover:bg-slate-50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {produto.nome}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {formatBRL(produto.precoUnitario)}/un. · {produto.categoria}
                    </p>
                  </div>
                  {qtd > 0 ? (
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        onClick={() => alterarQtd(produto.id, qtd - QUANTIDADE_MINIMA)}
                        disabled={qtd <= QUANTIDADE_MINIMA}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:opacity-30"
                        aria-label="Diminuir"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-12 text-center text-sm font-bold text-slate-900">
                        {qtd}
                      </span>
                      <button
                        onClick={() => alterarQtd(produto.id, qtd + QUANTIDADE_MINIMA)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50"
                        aria-label="Aumentar"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => alterarQtd(produto.id, QUANTIDADE_MINIMA)}
                      className="shrink-0 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white transition hover:bg-slate-800"
                    >
                      +{QUANTIDADE_MINIMA}
                    </button>
                  )}
                </div>
              );
            })}
            {listagem.length === 0 && (
              <p className="px-2 py-6 text-center text-sm text-slate-400">
                Nenhum produto encontrado.
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] text-slate-400">Total do kit</p>
              <p className="text-xl font-black text-slate-900">{formatBRL(total)}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={adicionarDireto}
                disabled={itens.length === 0}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <PackagePlus className="h-4 w-4" />
                Adicionar ao pedido
              </button>
              <button
                onClick={salvarKit}
                disabled={itens.length === 0 || !nome.trim()}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Save className="h-4 w-4" />
                Salvar kit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}