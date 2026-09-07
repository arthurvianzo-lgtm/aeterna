import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Printer, X, CheckCircle2 } from "lucide-react";
import { comboPorId, produtoPorId, PLANOS } from "@/config/regras-comerciais";
import { usePedidoStore } from "@/store/pedido";
import { formatBRL } from "@/lib/format";

export default function PropostaModal({ aoFechar }: { aoFechar: () => void }) {
  const itensAvulsos = usePedidoStore((s) => s.itensAvulsos);
  const combos = usePedidoStore((s) => s.combos);
  const planoId = usePedidoStore((s) => s.planoId);
  const nomeCliente = usePedidoStore((s) => s.nomeCliente);
  const observacoesPorCombo = usePedidoStore((s) => s.observacoesPorCombo);
  const observacaoPedido = usePedidoStore((s) => s.observacaoPedido);
  const setObservacaoPedido = usePedidoStore((s) => s.setObservacaoPedido);

  const plano = PLANOS.find((p) => p.id === planoId) ?? PLANOS[0];
  const bruto =
    itensAvulsos.reduce((acc, i) => acc + i.quantidade * i.precoUnitario, 0) +
    combos.reduce((acc, c) => acc + c.quantidade * c.precoTotal, 0);
  const liquido = bruto * (1 - plano.descontoPercentual / 100);
  const economiaTotal = bruto - liquido;
  const custoDiario = liquido / (plano.duracaoMinimaMeses * 30);

  const { register, handleSubmit } = useForm<{ observacao: string }>({
    defaultValues: { observacao: observacaoPedido },
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") aoFechar();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [aoFechar]);

  const salvarObservacao = (dados: { observacao: string }) => {
    setObservacaoPedido(dados.observacao);
  };

  const hoje = new Date().toLocaleDateString("pt-BR");

  const observacoesDosCombos = combos
    .map((c) => ({
      combo: comboPorId(c.comboId),
      obs: observacoesPorCombo[c.comboId] ?? "",
    }))
    .filter((x) => x.combo && x.obs.trim());

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 sm:items-center">
      <div className="my-8 w-full max-w-3xl rounded-2xl border border-line bg-panel p-3 sm:my-0">
        {/* Barra de ações (não vai para o print) */}
        <div className="mb-3 flex items-center justify-end gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-lg bg-panel-2 px-3 py-2 text-xs font-semibold ring-1 ring-line transition hover:ring-gold/50"
          >
            <Printer className="h-4 w-4" /> Imprimir / Salvar PDF
          </button>
          <button
            onClick={aoFechar}
            className="inline-flex items-center gap-1 rounded-lg px-2 py-2 text-muted transition hover:text-danger"
            aria-label="Fechar proposta"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Documento da proposta */}
        <div
          id="documento-proposta"
          className="overflow-hidden rounded-xl bg-white text-slate-900"
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
                Aeterna
              </p>
              <p className="text-xs text-slate-500">
                Suplementos · Cosmético · Peptídeos
              </p>
            </div>
            <div className="text-right text-xs text-slate-500">
              <p className="font-semibold text-slate-700">Proposta Comercial</p>
              <p>{hoje}</p>
            </div>
          </div>

          <div className="px-6 py-5">
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <p className="text-xs text-slate-500">Cliente</p>
                <p className="text-sm font-bold">
                  {nomeCliente.trim() || "Cliente"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Plano de compromisso</p>
                <p className="text-sm font-bold">
                  {plano.nome} ({plano.duracaoMinimaMeses}{" "}
                  {plano.duracaoMinimaMeses === 1 ? "mês" : "meses"})
                </p>
              </div>
            </div>

            <table className="mt-5 w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="py-2 pr-2">Item</th>
                  <th className="py-2 pr-2 text-center">Qtd.</th>
                  <th className="py-2 pr-2 text-right">Unitário</th>
                  <th className="py-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {combos.map((c) => {
                  const combo = comboPorId(c.comboId);
                  return (
                    <tr key={c.comboId} className="border-b border-slate-100">
                      <td className="py-2 pr-2">
                        <p className="font-semibold">{combo?.nome ?? "Combo"}</p>
                        <p className="text-xs text-slate-500">
                          Combo estratégico · pacote mensal
                        </p>
                      </td>
                      <td className="py-2 pr-2 text-center">{c.quantidade}</td>
                      <td className="py-2 pr-2 text-right">
                        {formatBRL(c.precoTotal)}
                      </td>
                      <td className="py-2 text-right font-semibold">
                        {formatBRL(c.precoTotal * c.quantidade)}
                      </td>
                    </tr>
                  );
                })}
                {itensAvulsos.map((i) => {
                  const produto = produtoPorId(i.produtoId);
                  return (
                    <tr key={i.produtoId} className="border-b border-slate-100">
                      <td className="py-2 pr-2">
                        <p className="font-semibold">{produto?.nome ?? "Produto"}</p>
                        <p className="text-xs text-slate-500">
                          {produto?.categoria ?? ""}
                        </p>
                      </td>
                      <td className="py-2 pr-2 text-center">{i.quantidade}</td>
                      <td className="py-2 pr-2 text-right">
                        {formatBRL(i.precoUnitario)}
                      </td>
                      <td className="py-2 text-right font-semibold">
                        {formatBRL(i.precoUnitario * i.quantidade)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="mt-4 ml-auto w-full max-w-xs space-y-1 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{formatBRL(bruto)}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Desconto {plano.nome}</span>
                <span>
                  −{plano.descontoPercentual}%
                  {plano.descontoPercentual > 0 ? ` (${formatBRL(economiaTotal)})` : ""}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-black">
                <span>Total</span>
                <span>{formatBRL(liquido)}</span>
              </div>
              <p className="text-right text-xs text-slate-500">
                Custo diário ≈ {formatBRL(custoDiario)} · Economia de {formatBRL(economiaTotal)}
              </p>
            </div>

            {(observacoesDosCombos.length > 0 || observacaoPedido.trim()) && (
              <div className="mt-5 rounded-lg bg-slate-50 p-3 text-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Observações
                </p>
                <ul className="mt-1 list-inside list-disc space-y-1 text-slate-700">
                  {observacoesDosCombos.map((o) => (
                    <li key={o.combo!.id}>
                      <span className="font-semibold">{o.combo!.nome}:</span>{" "}
                      {o.obs}
                    </li>
                  ))}
                  {observacaoPedido.trim() && <li>{observacaoPedido}</li>}
                </ul>
              </div>
            )}

            <div className="mt-6 flex items-center gap-2 border-t border-slate-200 pt-4 text-xs text-slate-500">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Proposta válida por 7 dias. Fábrica parceira regulamentada pela
              ANVISA.
            </div>
          </div>
        </div>

        {/* Formulário de observação da proposta (não vai para o print) */}
        <form
          onSubmit={handleSubmit(salvarObservacao)}
          className="mt-3 flex items-end gap-2"
        >
          <div className="min-w-0 flex-1">
            <label
              htmlFor="observacao-proposta"
              className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted"
            >
              Observação final da proposta
            </label>
            <textarea
              id="observacao-proposta"
              rows={2}
              placeholder="Ex.: Condição especial para fechamento deste mês."
              className="w-full resize-none rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-gold/50"
              {...register("observacao", {
                onChange: (e) => setObservacaoPedido(e.target.value),
              })}
            />
          </div>
          <button
            type="submit"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-mint px-4 py-2.5 text-sm font-bold text-black transition hover:brightness-110"
          >
            <CheckCircle2 className="h-4 w-4" /> Confirmar
          </button>
        </form>
      </div>
    </div>
  );
}