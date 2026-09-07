import { BadgePercent } from "lucide-react";
import { PLANOS } from "@/config/regras-comerciais";
import { usePedidoStore } from "@/store/pedido";
import { cn } from "@/lib/cn";

export default function PlanoCompromisso() {
  const planoId = usePedidoStore((s) => s.planoId);
  const setPlanoId = usePedidoStore((s) => s.setPlanoId);

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2">
        <BadgePercent className="h-5 w-5 text-gold" />
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
          Descontos por Compromisso
        </h2>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {PLANOS.map((plano) => {
          const ativo = planoId === plano.id;
          return (
            <button
              key={plano.id}
              onClick={() => setPlanoId(plano.id)}
              className={cn(
                "rounded-2xl border bg-panel p-5 text-left transition",
                ativo
                  ? "border-mint ring-2 ring-mint/30"
                  : "border-line hover:border-mint/40"
              )}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-ink">{plano.nome}</p>
                {plano.descontoPercentual > 0 && (
                  <span className="rounded-full bg-mint/15 px-2 py-0.5 text-xs font-bold text-mint">
                    −{plano.descontoPercentual}%
                  </span>
                )}
              </div>
              <p className="mt-1 text-2xl font-black text-ink">
                {plano.descontoPercentual > 0
                  ? `−${plano.descontoPercentual}%`
                  : "Sem desconto"}
              </p>
              <p className="mt-1 text-xs text-muted">{plano.descricao}</p>
              <p className="mt-2 text-[11px] text-muted/70">
                Duração mínima: {plano.duracaoMinimaMeses}{" "}
                {plano.duracaoMinimaMeses === 1 ? "mês" : "meses"}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}