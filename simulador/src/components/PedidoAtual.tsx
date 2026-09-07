import { PackageOpen, Minus, Plus, Trash2, Wand2, X } from "lucide-react";
import { comboPorId, produtoPorId, PLANOS } from "@/config/regras-comerciais";
import { usePedidoStore } from "@/store/pedido";
import { formatBRL } from "@/lib/format";

export default function PedidoAtual() {
  const itensAvulsos = usePedidoStore((s) => s.itensAvulsos);
  const combos = usePedidoStore((s) => s.combos);
  const planoId = usePedidoStore((s) => s.planoId);
  const carregarKitInteligente = usePedidoStore((s) => s.carregarKitInteligente);
  const zerarPedido = usePedidoStore((s) => s.zerarPedido);

  const brutoCombos = combos.reduce((acc, c) => acc + c.quantidade * c.precoTotal, 0);
  const brutoAvulsos = itensAvulsos.reduce(
    (acc, i) => acc + i.quantidade * i.precoUnitario,
    0
  );
  const bruto = brutoCombos + brutoAvulsos;
  const plano = PLANOS.find((p) => p.id === planoId) ?? PLANOS[0];
  const liquido = bruto * (1 - plano.descontoPercentual / 100);
  const vazio = combos.length === 0 && itensAvulsos.length === 0;

  return (
    <div className="flex min-h-[360px] flex-col overflow-hidden rounded-2xl border border-line bg-panel">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <PackageOpen className="h-4 w-4 text-gold" />
        <h3 className="text-sm font-bold">Pedido atual</h3>
        {!vazio && (
          <span className="ml-auto rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-semibold text-gold">
            {combos.length + itensAvulsos.length} linha(s)
          </span>
        )}
        {!vazio && (
          <button
            onClick={zerarPedido}
            className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-[11px] text-muted transition hover:text-danger"
          >
            <Trash2 className="h-3.5 w-3.5" /> Limpar
          </button>
        )}
      </div>

      {vazio ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-muted">
            <PackageOpen className="h-6 w-6" />
          </span>
          <p className="max-w-[240px] text-sm text-muted">
            Seu pedido está vazio. Adicione itens do catálogo ao lado.
          </p>
          <button
            onClick={carregarKitInteligente}
            className="mt-1 inline-flex items-center gap-2 rounded-xl border border-mint/40 bg-mint/10 px-4 py-2.5 text-sm font-semibold text-mint transition hover:bg-mint hover:text-black"
          >
            <Wand2 className="h-4 w-4" />
            Carregar um kit inteligente do catálogo
          </button>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="max-h-[380px] flex-1 overflow-y-auto p-2">
            {combos.length > 0 && (
              <>
                <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-muted/70">
                  Combos estratégicos
                </p>
                {combos.map((c) => (
                  <LinhaCombo key={c.comboId} comboId={c.comboId} />
                ))}
              </>
            )}
            {itensAvulsos.length > 0 && (
              <>
                <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wide text-muted/70">
                  Produtos avulsos
                </p>
                {itensAvulsos.map((i) => (
                  <LinhaAvulso key={i.produtoId} produtoId={i.produtoId} />
                ))}
              </>
            )}
          </div>

          <div className="space-y-1 border-t border-line p-4 text-sm">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span>{formatBRL(bruto)}</span>
            </div>
            <div className="flex justify-between text-mint">
              <span>Desconto {plano.nome}</span>
              <span>
                −{plano.descontoPercentual}%
                {plano.descontoPercentual > 0 ? " · " + formatBRL(bruto - liquido) : ""}
              </span>
            </div>
            <div className="mt-2 flex justify-between border-t border-line pt-2 text-base font-bold text-ink">
              <span>Total {plano.nome}</span>
              <span>{formatBRL(liquido)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LinhaCombo({ comboId }: { comboId: string }) {
  const combo = comboPorId(comboId)!;
  const quantidade = usePedidoStore((s) =>
    s.combos.find((c) => c.comboId === comboId)?.quantidade ?? 1
  );
  const atualizarQuantidadeCombo = usePedidoStore((s) => s.atualizarQuantidadeCombo);
  const removerCombo = usePedidoStore((s) => s.removerCombo);

  return (
    <div className="rounded-xl px-3 py-2 hover:bg-surface/60">
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-[13px] font-semibold text-ink">{combo.nome}</p>
        <button
          onClick={() => removerCombo(comboId)}
          className="text-muted transition hover:text-danger"
          aria-label={`Remover ${combo.nome}`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-1.5 flex items-center justify-between">
        <div className="flex items-center gap-1 rounded-lg border border-line bg-surface">
          <button
            className="px-2 py-1 text-muted transition hover:text-gold"
            onClick={() => atualizarQuantidadeCombo(comboId, quantidade - 1)}
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-semibold">{quantidade}</span>
          <button
            className="px-2 py-1 text-muted transition hover:text-gold"
            onClick={() => atualizarQuantidadeCombo(comboId, quantidade + 1)}
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-ink">
            {formatBRL(combo.precoTotal * quantidade)}
          </p>
          <p className="text-[10px] text-muted">{formatBRL(combo.precoTotal)}/mês</p>
        </div>
      </div>
    </div>
  );
}

function LinhaAvulso({ produtoId }: { produtoId: string }) {
  const produto = produtoPorId(produtoId)!;
  const quantidade = usePedidoStore((s) =>
    s.itensAvulsos.find((i) => i.produtoId === produtoId)?.quantidade ?? 1
  );
  const atualizarQuantidadeAvulso = usePedidoStore((s) => s.atualizarQuantidadeAvulso);
  const removerAvulso = usePedidoStore((s) => s.removerAvulso);

  return (
    <div className="rounded-xl px-3 py-2 hover:bg-surface/60">
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-[13px] font-semibold text-ink">{produto.nome}</p>
        <button
          onClick={() => removerAvulso(produtoId)}
          className="text-muted transition hover:text-danger"
          aria-label={`Remover ${produto.nome}`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-1.5 flex items-center justify-between">
        <div className="flex items-center gap-1 rounded-lg border border-line bg-surface">
          <button
            className="px-2 py-1 text-muted transition hover:text-gold"
            onClick={() => atualizarQuantidadeAvulso(produtoId, quantidade - 1)}
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-semibold">{quantidade}</span>
          <button
            className="px-2 py-1 text-muted transition hover:text-gold"
            onClick={() => atualizarQuantidadeAvulso(produtoId, quantidade + 1)}
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <p className="text-sm font-bold text-ink">
          {formatBRL(produto.precoUnitario * quantidade)}
        </p>
      </div>
    </div>
  );
}