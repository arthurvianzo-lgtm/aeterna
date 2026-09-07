import { Wallet, PiggyBank, CalendarClock, Gift } from "lucide-react";
import { usePedidoStore } from "@/store/pedido";
import { formatBRL, formatPontos } from "@/lib/format";
import { VALOR_POR_PONTO } from "@/config/regras-comerciais";

export default function Indicadores() {
  const itensAvulsos = usePedidoStore((s) => s.itensAvulsos);
  const combos = usePedidoStore((s) => s.combos);
  const planoId = usePedidoStore((s) => s.planoId);

  const custoBrutoTotal = itensAvulsos.reduce(
    (acc, i) => acc + i.quantidade * i.precoUnitario,
    0
  );
  const custoCombos = combos.reduce(
    (acc, c) => acc + c.quantidade * c.precoTotal,
    0
  );
  const bruto = custoBrutoTotal + custoCombos;

  const plano =
    planoId === "trimestral"
      ? { desconto: 8, meses: 3 }
      : planoId === "anual"
        ? { desconto: 15, meses: 12 }
        : { desconto: 0, meses: 1 };

  const liquido = bruto * (1 - plano.desconto / 100);
  const economiaTotal = bruto - liquido;
  const custoDiario = liquido / (plano.meses * 30);
  const pontos = Math.floor(liquido / VALOR_POR_PONTO);

  const cards = [
    {
      icon: Wallet,
      label: "Investimento no seu plano",
      value: formatBRL(liquido),
      hint: `${plano.meses} ${plano.meses === 1 ? "mês" : "meses"} de compromisso`,
      color: "text-gold bg-gold/10",
    },
    {
      icon: PiggyBank,
      label: "Economia no plano",
      value: plano.desconto > 0 ? formatBRL(economiaTotal) : "—",
      hint: plano.desconto > 0 ? `−${plano.desconto}% vs. tabela padrão` : "Sem desconto aplicado",
      color: "text-mint bg-mint/10",
    },
    {
      icon: CalendarClock,
      label: "Custo diário no seu plano",
      value: formatBRL(custoDiario),
      hint: "≈ R$ por dia de uso",
      color: "text-sky-300 bg-sky-500/10",
    },
    {
      icon: Gift,
      label: "Pontos por indicação",
      value: `${formatPontos(pontos)} pts`,
      hint: `1 ponto a cada R$ ${VALOR_POR_PONTO}`,
      color: "text-fuchsia-300 bg-fuchsia-500/10",
    },
  ];

  return (
    <section className="mb-10">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-line bg-panel p-4">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${card.color}`}
              >
                <card.icon className="h-4 w-4" />
              </span>
              <p className="text-[13px] font-medium text-muted">{card.label}</p>
            </div>
            <p className="mt-3 text-2xl font-black text-ink">{card.value}</p>
            <p className="mt-1 text-[11px] text-muted/70">{card.hint}</p>
          </div>
        ))}
      </div>
    </section>
  );
}