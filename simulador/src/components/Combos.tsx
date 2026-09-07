import { PackagePlus, Check, Sparkles } from "lucide-react";
import { combos, produtoPorId } from "@/config/regras-comerciais";
import { usePedidoStore } from "@/store/pedido";
import { formatBRL } from "@/lib/format";
import type { Combo } from "@/types";

const BADGES_CLASS = [
  "bg-gold/15 text-gold ring-gold/30",
  "bg-mint/15 text-mint ring-mint/30",
  "bg-sky-500/15 text-sky-300 ring-sky-500/30",
  "bg-fuchsia-500/15 text-fuchsia-300 ring-fuchsia-500/30",
];

function SectionTitle() {
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
        Combos Estratégicos
      </h2>
      <p className="mt-1 text-sm text-muted">
        Selecione um combo de sucesso para a sua oferta.
      </p>
    </div>
  );
}

export default function Combos() {
  return (
    <section className="mb-10">
      <SectionTitle />
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {combos.map((combo, index) => (
          <CardCombo key={combo.id} comboId={combo.id} index={index} />
        ))}
      </div>
    </section>
  );
}

function CardCombo({ comboId, index }: { comboId: string; index: number }) {
  const combo = combos.find((c) => c.id === comboId) as Combo;
  const quantidade = usePedidoStore((s) =>
    s.combos.find((c) => c.comboId === combo.id)?.quantidade ?? 0
  );
  const adicionarCombo = usePedidoStore((s) => s.adicionarCombo);
  const observacao = usePedidoStore(
    (s) => s.observacoesPorCombo[combo.id] ?? ""
  );
  const setObservacaoCombo = usePedidoStore((s) => s.setObservacaoCombo);

  const ehRecomendado = Boolean(combo.recomendado);
  const selecionado = quantidade > 0;

  return (
    <article
      className={`relative flex flex-col rounded-2xl border bg-panel p-5 transition ${
        ehRecomendado
          ? "border-gold/60 shadow-lg shadow-gold/5"
          : selecionado
            ? "border-gold/40"
            : "border-line"
      }`}
    >
      {ehRecomendado && (
        <span className="absolute -top-2.5 left-4 inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-0.5 text-[11px] font-bold text-black shadow">
          <Sparkles className="h-3 w-3" /> Recomendado
        </span>
      )}

      <span
        className={`inline-flex w-fit rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ${BADGES_CLASS[index % BADGES_CLASS.length]}`}
      >
        {combo.badge ?? combo.nome}
      </span>

      <h3 className="mt-3 text-base font-bold text-ink">{combo.nome}</h3>
      <p className="mt-0.5 text-xs text-muted">{combo.tagline}</p>

      <ul className="mt-4 space-y-1.5 border-t border-line pt-3 text-sm">
        {combo.composicao.map((item) => {
          const produto = produtoPorId(item.produtoId);
          return (
            <li
              key={item.produtoId}
              className="flex items-center justify-between gap-2"
            >
              <span className="truncate text-[13px] text-muted">
                {produto?.nome ?? "—"}
              </span>
              <span className="text-xs font-semibold text-ink">
                {item.percentual}%
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-muted">
            Pacote mensal
          </p>
          <p className="text-xl font-bold text-ink">
            {formatBRL(combo.precoTotal)}
          </p>
        </div>
        {selecionado && (
          <span className="inline-flex items-center gap-1 rounded-full bg-mint/15 px-2 py-0.5 text-xs font-semibold text-mint">
            <Check className="h-3.5 w-3.5" /> {quantidade} no pedido
          </span>
        )}
      </div>

      <textarea
        value={observacao}
        onChange={(e) => setObservacaoCombo(combo.id, e.target.value)}
        rows={2}
        placeholder="Adicione uma observação para o cliente"
        className="mt-3 w-full resize-none rounded-lg border border-line bg-surface/60 px-3 py-2 text-xs text-ink outline-none transition placeholder:text-muted/60 focus:border-gold/50"
      />

      <button
        onClick={() => adicionarCombo(combo.id)}
        className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
          ehRecomendado
            ? "bg-gold text-black hover:brightness-110"
            : "bg-mint text-black hover:brightness-110"
        }`}
      >
        <PackagePlus className="h-4 w-4" />
        {selecionado ? "Adicionar +1" : "Adicionar este pacote"}
      </button>
    </article>
  );
}