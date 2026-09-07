"use client";

import { FileText, Minus, Plus, Trash2, Wand2, X, PackageOpen } from "lucide-react";
import {
  PLANOS,
  produtoPorId,
  comboPorId,
  QUANTIDADE_MINIMA,
} from "@/simulador/config/regras-comerciais";
import { usePedidoStore } from "@/simulador/store/pedido";
import { resumoPedido } from "@/simulador/lib/calculos";
import { formatBRL } from "@/simulador/lib/format";

export default function PedidoAtual({
  aoGerarProposta,
}: {
  aoGerarProposta: () => void;
}) {
  const itens = usePedidoStore((s) => s.itens);
  const planoId = usePedidoStore((s) => s.planoId);
  const setPlanoId = usePedidoStore((s) => s.setPlanoId);
  const observacaoPedido = usePedidoStore((s) => s.observacaoPedido);
  const setObservacaoPedido = usePedidoStore((s) => s.setObservacaoPedido);
  const carregarKitRecomendado = usePedidoStore((s) => s.carregarKitRecomendado);
  const zerarPedido = usePedidoStore((s) => s.zerarPedido);

  const resumo = resumoPedido(itens, planoId);
  const vazio = itens.length === 0;

  const itensKit = itens.filter((i) => i.comboId);
  const itensAvulsos = itens.filter((i) => !i.comboId);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
        <PackageOpen className="h-4 w-4 text-emerald-600" />
        <h2 className="text-sm font-bold text-slate-900">Resumo do pedido</h2>
        {!vazio && (
          <>
            <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
              {itens.length} produto{itens.length > 1 ? "s" : ""}
            </span>
            <button
              onClick={zerarPedido}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-3.5 w-3.5" /> Limpar
            </button>
          </>
        )}
      </div>

      <div className="p-5">
        {/* Plano de compromisso */}
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Desconto por compromisso
        </p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {PLANOS.map((plano) => {
            const ativo = planoId === plano.id;
            return (
              <button
                key={plano.id}
                onClick={() => setPlanoId(plano.id)}
                className={`rounded-xl border px-2 py-2 text-center transition ${
                  ativo
                    ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <p className={`text-xs font-bold ${ativo ? "text-emerald-700" : "text-slate-700"}`}>
                  {plano.descontoPercentual > 0
                    ? `−${plano.descontoPercentual}%`
                    : "Padrão"}
                </p>
                <p className="text-[10px] text-slate-500">
                  {plano.duracaoMinimaMeses === 1
                    ? "mensal"
                    : `${plano.duracaoMinimaMeses} meses`}
                </p>
              </button>
            );
          })}
        </div>

        {/* Itens */}
        {vazio ? (
          <div className="mt-5 flex flex-col items-center gap-3 rounded-xl border border-dashed border-slate-200 p-6 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <PackageOpen className="h-5 w-5" />
            </span>
            <p className="max-w-60 text-sm text-slate-500">
              Seu pedido está vazio. Adicione produtos do catálogo ou carregue um
              kit pronto.
            </p>
            <button
              onClick={carregarKitRecomendado}
              className="mt-1 inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
            >
              <Wand2 className="h-4 w-4" />
              Carregar kit recomendado
            </button>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {itensKit.length > 0 && (
              <div>
                <p className="px-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Kits estratégicos
                </p>
                <div className="mt-1 space-y-1">
                  {itensKit.map((item) => (
                    <LinhaItem key={item.produtoId} produtoId={item.produtoId} />
                  ))}
                </div>
              </div>
            )}
            {itensAvulsos.length > 0 && (
              <div>
                <p className="px-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Produtos avulsos
                </p>
                <div className="mt-1 space-y-1">
                  {itensAvulsos.map((item) => (
                    <LinhaItem key={item.produtoId} produtoId={item.produtoId} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Totais */}
        {!vazio && (
          <div className="mt-5 space-y-1.5 border-t border-slate-100 pt-4 text-sm">
            <div className="flex items-center justify-between text-slate-600">
              <span>Subtotal (15% incluso)</span>
              <span className="font-semibold text-slate-900">
                {formatBRL(resumo.subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between text-emerald-700">
              <span>Desconto {resumo.plano.nome}</span>
              <span className="font-semibold">
                −{resumo.descontoPercentual}%
                {resumo.descontoPercentual > 0
                  ? ` (${formatBRL(resumo.economiaTotal)})`
                  : ""}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-base font-black text-slate-900">
              <span>Total do pedido</span>
              <span>{formatBRL(resumo.totalLiquido)}</span>
            </div>
            <p className="text-right text-[11px] text-slate-400">
              Custo diário ≈ {formatBRL(resumo.custoDiario)} · {resumo.plano.duracaoMinimaMeses}{" "}
              {resumo.plano.duracaoMinimaMeses === 1 ? "mês" : "meses"}
            </p>
          </div>
        )}

        {/* Comissão (área restrita) */}
        <div className="mt-4 flex items-start justify-between gap-3 rounded-xl bg-slate-900 p-4 text-white">
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-semibold text-slate-300">
                Comissão do vendedor
              </p>
              <span className="rounded bg-emerald-500 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-white">
                Área restrita
              </span>
            </div>
            <p className="mt-1 text-2xl font-black text-emerald-400">
              {formatBRL(resumo.comissao)}
            </p>
            <p className="text-[11px] text-slate-400">
              15% incluso no preço. Nunca vai para a proposta do cliente.
            </p>
          </div>
        </div>

        {/* Observação final */}
        <div className="mt-4">
          <label
            htmlFor="observacao"
            className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500"
          >
            Observação final da proposta
          </label>
          <textarea
            id="observacao"
            rows={2}
            value={observacaoPedido}
            onChange={(e) => setObservacaoPedido(e.target.value)}
            placeholder="Ex.: Condição especial para fechamento deste mês."
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500/30 transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4"
          />
        </div>

        <button
          onClick={aoGerarProposta}
          disabled={vazio}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FileText className="h-4 w-4" />
          Gerar Proposta Oficial
        </button>
      </div>
    </div>
  );
}

function LinhaItem({ produtoId }: { produtoId: string }) {
  const produto = produtoPorId(produtoId)!;
  const item = usePedidoStore((s) => s.itens.find((i) => i.produtoId === produtoId));
  const atualizarQuantidade = usePedidoStore((s) => s.atualizarQuantidade);
  const removerItem = usePedidoStore((s) => s.removerItem);

  const combo = item?.comboId ? comboPorId(item.comboId) : undefined;
  const quantidade = item?.quantidade ?? 0;
  const total = produto.precoUnitario * quantidade;

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2.5">
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-[13px] font-semibold text-slate-900">
          {produto.nome}
        </p>
        <div className="flex shrink-0 items-center gap-1">
          <span className="text-[11px] text-slate-400">
            {formatBRL(produto.precoUnitario)}/un.
          </span>
          <button
            onClick={() => removerItem(produtoId)}
            className="inline-flex h-6 w-6 items-center justify-center rounded-md text-slate-400 transition hover:bg-red-50 hover:text-red-600"
            aria-label="Remover"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-1.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white">
          <button
            onClick={() =>
              atualizarQuantidade(produtoId, quantidade - QUANTIDADE_MINIMA)
            }
            disabled={quantidade <= QUANTIDADE_MINIMA}
            className="px-2 py-1 text-slate-500 transition hover:text-slate-900 disabled:opacity-30"
            aria-label="Diminuir"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-12 text-center text-sm font-bold text-slate-900">
            {quantidade}
          </span>
          <button
            onClick={() =>
              atualizarQuantidade(produtoId, quantidade + QUANTIDADE_MINIMA)
            }
            className="px-2 py-1 text-slate-500 transition hover:text-slate-900"
            aria-label="Aumentar"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <p className="text-sm font-bold text-slate-900">{formatBRL(total)}</p>
      </div>
      {combo && (
        <p className="mt-1 text-[10px] font-medium text-emerald-700">
          parte do kit “{combo.nome}”
        </p>
      )}
    </div>
  );
}