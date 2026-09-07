import { ShieldCheck, Target, AlertTriangle } from "lucide-react";
import {
  MARGEM_MAXIMA,
  MARGEM_META_SUGERIDA,
  MARGEM_MINIMA,
  PLANOS,
} from "@/simulador/config/regras-comerciais";
import { usePedidoStore } from "@/simulador/store/pedido";
import { formatBRL } from "@/simulador/lib/format";

const piso = Math.round(MARGEM_MINIMA * 100);
const meta = Math.round(MARGEM_META_SUGERIDA * 100);
const max = Math.round(MARGEM_MAXIMA * 100);

export default function MargemSlider() {
  const margem = usePedidoStore((s) => s.margemRevenda);
  const setMargemRevenda = usePedidoStore((s) => s.setMargemRevenda);
  const itensAvulsos = usePedidoStore((s) => s.itensAvulsos);
  const combos = usePedidoStore((s) => s.combos);
  const planoId = usePedidoStore((s) => s.planoId);

  const bruto =
    itensAvulsos.reduce((acc, i) => acc + i.quantidade * i.precoUnitario, 0) +
    combos.reduce((acc, c) => acc + c.quantidade * c.precoTotal, 0);
  const plano = PLANOS.find((p) => p.id === planoId) ?? PLANOS[0];
  const custoLiquido = bruto * (1 - plano.descontoPercentual / 100);
  const precoVenda = custoLiquido / (1 - margem / 100);
  const noPiso = margem <= piso;

  return (
    <section className="mb-6 rounded-2xl border border-sim-line bg-sim-panel p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-sim-gold" />
        <h2 className="text-lg font-bold sm:text-xl">Trava de Margem — Aeterna</h2>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-sim-gold/15 px-3 py-1 text-xs font-semibold text-sim-gold">
          <Target className="h-3.5 w-3.5" /> Meta sugerida: {meta}%
        </span>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-sim-muted">Sua margem de revenda</span>
            <span className="text-2xl font-black text-sim-ink">{margem}%</span>
          </div>

          <input
            type="range"
            min={piso}
            max={max}
            step={0.5}
            value={Math.min(margem, max)}
            onChange={(e) => setMargemRevenda(Number(e.target.value))}
            className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-line accent-sim-gold"
          />

          <div className="mt-1.5 flex justify-between text-[11px] text-sim-muted">
            <span>Piso {piso}%</span>
            <span>Meta {meta}%</span>
            <span>{max}% (máx.)</span>
          </div>

          {noPiso && (
            <p className="mt-3 flex items-start gap-1.5 rounded-lg border border-sim-danger/30 bg-sim-danger/10 px-3 py-2 text-xs text-sim-danger">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                Você está no piso mínimo de {piso}%. A margem é protegida: não é
                permitido revender abaixo desse piso — o preço de venda mínimo
                nunca cai abaixo do piso do distribuidor.
              </span>
            </p>
          )}

          <p className="mt-3 text-xs leading-relaxed text-sim-muted">
            Margem mínima protegida: o preço de venda mínimo ao cliente é definido
            pelo piso de {piso}% e nunca fica abaixo dele. Ajuste o slider para ver
            o impacto no preço e na sua comissão.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-sim-line bg-sim-surface p-3">
            <p className="text-[11px] text-sim-muted">Custo (com desconto)</p>
            <p className="mt-1 text-lg font-bold text-sim-ink">{formatBRL(custoLiquido)}</p>
          </div>
          <div className="rounded-xl border border-sim-line bg-sim-surface p-3">
            <p className="text-[11px] text-sim-muted">Preço de venda ao cliente</p>
            <p className="mt-1 text-lg font-bold text-sim-gold">
              {formatBRL(precoVenda)}
            </p>
          </div>
          <div className="col-span-2 rounded-xl border border-sim-line bg-sim-surface p-3">
            <p className="text-[11px] text-sim-muted">Sua comissão estimada (área interna)</p>
            <p className="mt-1 text-lg font-bold text-sim-mint">
              {formatBRL(custoLiquido * (margem / 100) / (1 - margem / 100))}
            </p>
            <p className="mt-0.5 text-[11px] text-sim-muted/70">
              Nunca aparece na proposta enviada ao cliente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}