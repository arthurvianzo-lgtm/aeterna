import { FlaskConical, Plus } from "lucide-react";
import { produtos } from "@/config/regras-comerciais";
import { usePedidoStore } from "@/store/pedido";
import { formatBRL } from "@/lib/format";

export default function Catalogo() {
  return (
    <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-line bg-panel">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <FlaskConical className="h-4 w-4 text-mint" />
        <h3 className="text-sm font-bold">Catálogo Aeterna</h3>
        <span className="ml-auto rounded-full bg-surface px-2 py-0.5 text-[11px] text-muted">
          {produtos.length} produtos
        </span>
      </div>

      <div className="max-h-[480px] overflow-y-auto p-2">
        {produtos.map((produto) => (
          <LinhaProduto key={produto.id} produtoId={produto.id} />
        ))}
      </div>
    </div>
  );
}

function LinhaProduto({ produtoId }: { produtoId: string }) {
  const produto = produtos.find((p) => p.id === produtoId)!;
  const quantidade = usePedidoStore((s) =>
    s.itensAvulsos.find((i) => i.produtoId === produto.id)?.quantidade ?? 0
  );
  const adicionarAvulso = usePedidoStore((s) => s.adicionarAvulso);

  return (
    <article className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-surface/60">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-[13px] font-semibold text-ink">
            {produto.nome}
          </p>
          <span className="shrink-0 rounded border border-line bg-surface px-1.5 py-0.5 text-[10px] text-muted">
            {produto.categoria}
          </span>
        </div>
        <p className="mt-0.5 truncate text-xs text-muted">
          {produto.descricaoCurta}
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-sm font-bold text-ink">
          {formatBRL(produto.precoUnitario)}
        </p>
        {quantidade > 0 && (
          <p className="text-[11px] font-semibold text-mint">{quantidade} no pedido</p>
        )}
      </div>

      <button
        onClick={() => adicionarAvulso(produto.id)}
        className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-mint/15 px-2.5 py-1.5 text-xs font-semibold text-mint ring-1 ring-mint/30 transition hover:bg-mint hover:text-black"
        aria-label={`Adicionar ${produto.nome}`}
      >
        <Plus className="h-3.5 w-3.5" />
        Adicionar
      </button>
    </article>
  );
}