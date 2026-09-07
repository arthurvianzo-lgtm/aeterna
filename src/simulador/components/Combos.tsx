import { PackagePlus, Check, Sparkles, Boxes } from "lucide-react";
import {
  combos,
  precoCombo,
  produtoPorId,
  QUANTIDADE_MINIMA,
} from "@/simulador/config/regras-comerciais";
import { usePedidoStore } from "@/simulador/store/pedido";
import { formatBRL } from "@/simulador/lib/format";
import type { Combo } from "@/simulador/types";

export default function Combos() {
  return (
    <section>
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Kits estratégicos
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Kits prontos: cada produto entra com {QUANTIDADE_MINIMA} potes — já
          dentro do pedido mínimo da fábrica.
        </p>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {combos.map((combo) => (
          <CardCombo key={combo.id} combo={combo} />
        ))}
      </div>
    </section>
  );
}

function CardCombo({ combo }: { combo: Combo }) {
  const comboAtivo = usePedidoStore((s) =>
    combo.itens.every((item) =>
      s.itens.some((i) => i.produtoId === item.produtoId && i.comboId === combo.id)
    )
  );
  const adicionarCombo = usePedidoStore((s) => s.adicionarCombo);
  const preco = precoCombo(combo);

  return (
    <article
      className={`relative flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition ${
        combo.recomendado
          ? "border-emerald-300 ring-1 ring-emerald-200"
          : "border-slate-200/80 hover:border-slate-300"
      }`}
    >
      {combo.recomendado && (
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
        {comboAtivo && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <Check className="h-3.5 w-3.5" /> no pedido
          </span>
        )}
      </div>

      <button
        onClick={() => adicionarCombo(combo.id)}
        className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
          combo.recomendado
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