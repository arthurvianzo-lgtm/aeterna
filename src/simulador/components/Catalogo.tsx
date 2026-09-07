import { useMemo, useState } from "react";
import { FlaskConical, Plus, Minus, X, Search } from "lucide-react";
import {
  LINHAS,
  produtos,
  QUANTIDADE_MINIMA,
} from "@/simulador/config/regras-comerciais";
import { usePedidoStore } from "@/simulador/store/pedido";
import { formatBRL } from "@/simulador/lib/format";
import type { LinhaProduto } from "@/simulador/types";

type Filtro = "todas" | LinhaProduto;

const ROTULOS_LINHA: Record<LinhaProduto, string> = {
  premium: "Premium",
  basica: "Básica",
  complementar: "Complementares",
};

export default function Catalogo() {
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [busca, setBusca] = useState("");

  const itens = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return produtos.filter((p) => {
      if (busca && !`${p.nome} ${p.categoria} ${p.formato}`.toLowerCase().includes(termo)) {
        return false;
      }
      if (filtro !== "todas" && p.linha !== filtro) return false;
      return true;
    });
  }, [busca, filtro]);

  const linhasVisiveis = filtro === "todas" ? LINHAS.map((l) => l.id) : [filtro];

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Catálogo de produtos
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Pedido mínimo de {QUANTIDADE_MINIMA} potes por produto.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar produto ou categoria"
            className="w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 outline-none ring-emerald-500/30 transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setFiltro("todas")}
          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
            filtro === "todas"
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
          }`}
        >
          Todas
        </button>
        {LINHAS.map((linha) => (
          <button
            key={linha.id}
            onClick={() => setFiltro(linha.id)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              filtro === linha.id
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {linha.label}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        {linhasVisiveis.map((linhaId, idx) => {
          const daLinha = itens.filter((p) => p.linha === linhaId);
          if (daLinha.length === 0) return null;
          return (
            <div key={linhaId}>
              {idx > 0 && <div className="h-px bg-slate-100" />}
              <div className="flex items-center gap-2 px-4 pt-4 sm:px-5">
                <FlaskConical className="h-4 w-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Linha {ROTULOS_LINHA[linhaId]}
                </h3>
                <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                  {daLinha.length} produto{daLinha.length > 1 ? "s" : ""}
                </span>
              </div>
              <div className="p-2">
                {daLinha.map((produto) => (
                  <LinhaProdutoItem key={produto.id} produtoId={produto.id} />
                ))}
              </div>
            </div>
          );
        })}
        {itens.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-slate-500">
            Nenhum produto encontrado para essa busca.
          </div>
        )}
      </div>
    </section>
  );
}

function LinhaProdutoItem({ produtoId }: { produtoId: string }) {
  const produto = produtos.find((p) => p.id === produtoId)!;
  const quantidade = usePedidoStore(
    (s) => s.itens.find((i) => i.produtoId === produto.id)?.quantidade ?? 0
  );
  const adicionarProduto = usePedidoStore((s) => s.adicionarProduto);
  const atualizarQuantidade = usePedidoStore((s) => s.atualizarQuantidade);
  const removerItem = usePedidoStore((s) => s.removerItem);

  return (
    <article className="flex flex-col gap-3 rounded-xl px-2 py-2.5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-3">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-slate-900">{produto.nome}</p>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200/70">
            {ROTULOS_LINHA[produto.linha]}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-slate-500">
          {produto.categoria} · {produto.formato}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-28 text-right">
          <p className="text-sm font-bold text-slate-900">
            {formatBRL(produto.precoUnitario)}
          </p>
          <p className="text-[11px] text-slate-400">por unidade</p>
        </div>

        {quantidade > 0 ? (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => atualizarQuantidade(produtoId, quantidade - QUANTIDADE_MINIMA)}
              disabled={quantidade <= QUANTIDADE_MINIMA}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:opacity-30"
              aria-label="Diminuir quantidade"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-16 text-center text-sm font-bold text-slate-900">
              {quantidade}
            </span>
            <button
              onClick={() => atualizarQuantidade(produtoId, quantidade + QUANTIDADE_MINIMA)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
              aria-label="Aumentar quantidade"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              onClick={() => removerItem(produtoId)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
              aria-label="Remover produto"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => adicionarProduto(produtoId)}
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <Plus className="h-3.5 w-3.5" />
            Adicionar
          </button>
        )}
      </div>
    </article>
  );
}