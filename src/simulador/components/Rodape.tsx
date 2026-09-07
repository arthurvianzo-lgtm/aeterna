import { FileText, LockKeyhole } from "lucide-react";
import { PLANOS } from "@/simulador/config/regras-comerciais";
import { usePedidoStore } from "@/simulador/store/pedido";
import { formatBRL } from "@/simulador/lib/format";

export default function Rodape({
  aoGerarProposta,
}: {
  aoGerarProposta: () => void;
}) {
  const itensAvulsos = usePedidoStore((s) => s.itensAvulsos);
  const combos = usePedidoStore((s) => s.combos);
  const planoId = usePedidoStore((s) => s.planoId);
  const margem = usePedidoStore((s) => s.margemRevenda);
  const consultorLogado = usePedidoStore((s) => s.consultorLogado);

  const bruto =
    itensAvulsos.reduce((acc, i) => acc + i.quantidade * i.precoUnitario, 0) +
    combos.reduce((acc, c) => acc + c.quantidade * c.precoTotal, 0);
  const plano = PLANOS.find((p) => p.id === planoId) ?? PLANOS[0];
  const liquido = bruto * (1 - plano.descontoPercentual / 100);
  const comissao = liquido * (margem / 100) / (1 - margem / 100);
  const vazio = itensAvulsos.length === 0 && combos.length === 0;

  return (
    <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-sim-line bg-sim-panel/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="pr-3 text-right sm:text-left">
            <p className="text-[11px] text-sim-muted">Investimento no plano</p>
            <p className="text-lg font-black text-sim-ink">{formatBRL(liquido)}</p>
          </div>

          {consultorLogado ? (
            <div className="rounded-xl border border-sim-mint/40 bg-sim-mint/10 px-4 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-sim-mint">
                  Comissão do consultor
                </span>
                <span className="rounded bg-sim-mint px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-black">
                  Área restrita
                </span>
              </div>
              <p className="text-lg font-black text-sim-mint">
                {formatBRL(comissao)}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-xl border border-sim-line bg-sim-surface px-3 py-2 text-xs text-sim-muted">
              <LockKeyhole className="h-4 w-4" />
              Entre como consultor para ver a comissão
            </div>
          )}
        </div>

        <button
          onClick={aoGerarProposta}
          disabled={vazio}
          className="ml-auto inline-flex items-center gap-2 rounded-xl bg-sim-mint px-5 py-2.5 text-sm font-bold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FileText className="h-4 w-4" />
          Gerar Proposta Oficial
        </button>
      </div>
    </footer>
  );
}