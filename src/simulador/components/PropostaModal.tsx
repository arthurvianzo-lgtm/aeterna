"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Printer, X, CheckCircle2 } from "lucide-react";
import { comboPorId, produtoPorId } from "@/simulador/config/regras-comerciais";
import { usePedidoStore } from "@/simulador/store/pedido";
import { resumoPedido } from "@/simulador/lib/calculos";
import { formatBRL } from "@/simulador/lib/format";

export default function PropostaModal({ aoFechar }: { aoFechar: () => void }) {
  const itens = usePedidoStore((s) => s.itens);
  const nomeCliente = usePedidoStore((s) => s.nomeCliente);
  const planoId = usePedidoStore((s) => s.planoId);
  const observacaoPedido = usePedidoStore((s) => s.observacaoPedido);
  const setObservacaoPedido = usePedidoStore((s) => s.setObservacaoPedido);

  const resumo = resumoPedido(itens, planoId);
  const plano = resumo.plano;

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

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm sm:items-center">
      <div className="my-8 w-full max-w-3xl rounded-2xl bg-white p-3 shadow-2xl sm:my-0">
        {/* Barra de ações (não vai para o print) */}
        <div className="mb-3 flex items-center justify-end gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
          >
            <Printer className="h-4 w-4" /> Imprimir / Salvar PDF
          </button>
          <button
            onClick={aoFechar}
            className="inline-flex items-center justify-center gap-1 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Fechar proposta"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Documento da proposta */}
        <div
          id="documento-proposta"
          className="overflow-hidden rounded-xl bg-white text-slate-900 ring-1 ring-slate-200"
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
                Aeterna
              </p>
              <p className="text-xs text-slate-500">
                Suplementos · Cosméticos · Peptídeos — private label
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
                <p className="text-xs text-slate-500">Pedido mínimo por produto</p>
                <p className="text-sm font-bold">100 potes / unidades</p>
              </div>
            </div>

            <table className="mt-5 w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="py-2 pr-2">Produto</th>
                  <th className="py-2 pr-2 text-center">Qtd.</th>
                  <th className="py-2 pr-2 text-right">Unitário</th>
                  <th className="py-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {itens.map((item) => {
                  const produto = produtoPorId(item.produtoId);
                  const combo = item.comboId ? comboPorId(item.comboId) : undefined;
                  return (
                    <tr key={item.produtoId} className="border-b border-slate-100">
                      <td className="py-2 pr-2">
                        <p className="font-semibold">
                          {produto?.nome ?? "Produto"}
                        </p>
                        <p className="text-xs text-slate-500">
                          {produto?.categoria ?? ""}
                          {combo ? ` · kit "${combo.nome}"` : ""}
                        </p>
                      </td>
                      <td className="py-2 pr-2 text-center">{item.quantidade}</td>
                      <td className="py-2 pr-2 text-right">
                        {formatBRL(produto?.precoUnitario ?? 0)}
                      </td>
                      <td className="py-2 text-right font-semibold">
                        {formatBRL((produto?.precoUnitario ?? 0) * item.quantidade)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="mt-4 ml-auto w-full max-w-xs space-y-1 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{formatBRL(resumo.subtotal)}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Desconto {plano.nome}</span>
                <span>
                  −{plano.descontoPercentual}%
                  {plano.descontoPercentual > 0
                    ? ` (${formatBRL(resumo.economiaTotal)})`
                    : ""}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-black">
                <span>Total</span>
                <span>{formatBRL(resumo.totalLiquido)}</span>
              </div>
              <p className="text-right text-xs text-slate-500">
                Custo diário ≈ {formatBRL(resumo.custoDiario)} · economia de{" "}
                {formatBRL(resumo.economiaTotal)}
              </p>
            </div>

            {observacaoPedido.trim() && (
              <div className="mt-5 rounded-lg bg-slate-50 p-3 text-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Observações
                </p>
                <p className="mt-1 text-slate-700">{observacaoPedido}</p>
              </div>
            )}

            <div className="mt-6 flex items-center gap-2 border-t border-slate-200 pt-4 text-xs text-slate-500">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Proposta válida por 7 dias. Fábrica parceira regulamentada pela
              ANVISA.
            </div>
          </div>
        </div>

        {/* Formulário de observação (não vai para o print) */}
        <form
          onSubmit={handleSubmit(salvarObservacao)}
          className="mt-3 flex items-end gap-2"
        >
          <div className="min-w-0 flex-1">
            <label
              htmlFor="observacao-proposta"
              className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500"
            >
              Observação final da proposta
            </label>
            <textarea
              id="observacao-proposta"
              rows={2}
              placeholder="Ex.: Condição especial para fechamento deste mês."
              className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500/30 transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4"
              {...register("observacao", {
                onChange: (e) => setObservacaoPedido(e.target.value),
              })}
            />
          </div>
          <button
            type="submit"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700"
          >
            <CheckCircle2 className="h-4 w-4" /> Confirmar
          </button>
        </form>
      </div>
    </div>
  );
}