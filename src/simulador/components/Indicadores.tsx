import {
  Boxes,
  Wallet,
  BadgePercent,
  TrendingUp,
  LockKeyhole,
} from "lucide-react";
import { QUANTIDADE_MINIMA } from "@/simulador/config/regras-comerciais";
import { usePedidoStore } from "@/simulador/store/pedido";
import { resumoPedido } from "@/simulador/lib/calculos";
import { formatBRL } from "@/simulador/lib/format";

export default function Indicadores() {
  const itens = usePedidoStore((s) => s.itens);
  const planoId = usePedidoStore((s) => s.planoId);
  const resumo = resumoPedido(itens, planoId);

  const cards = [
    {
      icon: Boxes,
      label: "Pedido mínimo",
      value: `${QUANTIDADE_MINIMA} potes`,
      hint: "por produto / unidade",
      color: "bg-slate-100 text-slate-700",
      semDestaque: true,
    },
    {
      icon: Wallet,
      label: "Investimento no plano",
      value: formatBRL(resumo.totalLiquido),
      hint: `${resumo.plano.nome} · ${resumo.descontoPercentual}% de desconto`,
      color: "bg-sky-50 text-sky-600",
    },
    {
      icon: BadgePercent,
      label: "Comissão do vendedor",
      value: formatBRL(resumo.comissao),
      hint: "15% incluso no preço do catálogo",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: TrendingUp,
      label: "Economia no plano",
      value: resumo.economiaTotal > 0 ? formatBRL(resumo.economiaTotal) : "—",
      hint:
        resumo.descontoPercentual > 0
          ? `−${resumo.descontoPercentual}% vs. tabela padrão`
          : "Sem desconto aplicado",
      color: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.color}`}
              >
                <card.icon className="h-4 w-4" />
              </span>
              {card.label === "Comissão do vendedor" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">
                  <LockKeyhole className="h-3 w-3" /> Área restrita
                </span>
              )}
            </div>
            <p className="mt-3 text-xl font-black text-slate-900 sm:text-2xl">
              {card.value}
            </p>
            <p className="mt-1 text-[13px] font-medium text-slate-700">
              {card.label}
            </p>
            <p className="text-[11px] text-slate-500">{card.hint}</p>
          </div>
        ))}
      </div>
    </section>
  );
}