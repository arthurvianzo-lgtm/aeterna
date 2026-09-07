import {
  COMISSAO_VENDEDOR_PERCENTUAL,
  DIAS_POR_MES,
  PLANOS,
  produtoPorId,
} from "@/simulador/config/regras-comerciais";
import type { ItemPedido, PlanoCompromisso, PlanoCompromissoId } from "@/simulador/types";

/** Subtotal do pedido = Σ quantidade × preço do catálogo (15% incluso). */
export function subtotalPedido(itens: ItemPedido[]): number {
  return itens.reduce((acc, item) => {
    const produto = produtoPorId(item.produtoId);
    return acc + (produto?.precoUnitario ?? 0) * item.quantidade;
  }, 0);
}

export function planoPorId(id: PlanoCompromissoId): PlanoCompromisso {
  return PLANOS.find((p) => p.id === id) ?? PLANOS[0];
}

/** Total do pedido aplicando o desconto do plano de compromisso. */
export function totalComDesconto(subtotal: number, descontoPercentual: number): number {
  return subtotal * (1 - descontoPercentual / 100);
}

/** Economia = total sem desconto − total com desconto. */
export function economia(subtotal: number, totalLiquido: number): number {
  return Math.max(0, subtotal - totalLiquido);
}

/** Custo diário = total do plano / (duração em meses × 30). */
export function custoDiario(totalLiquido: number, duracaoMinimaMeses: number): number {
  if (duracaoMinimaMeses <= 0) return 0;
  return totalLiquido / (duracaoMinimaMeses * DIAS_POR_MES);
}

/**
 * Comissão do vendedor embutida nos preços do catálogo.
 * Como o preço = fábrica × 1,15, a comissão é price × 15/115.
 */
export function comissaoVendedor(subtotal: number): number {
  return subtotal * (COMISSAO_VENDEDOR_PERCENTUAL / (1 + COMISSAO_VENDEDOR_PERCENTUAL));
}

export type ResumoPedido = {
  subtotal: number;
  totalLiquido: number;
  descontoPercentual: number;
  economiaTotal: number;
  comissao: number;
  custoDiario: number;
  plano: PlanoCompromisso;
};

/** Consolida todos os indicadores do pedido a partir do estado atual. */
export function resumoPedido(
  itens: ItemPedido[],
  planoId: PlanoCompromissoId
): ResumoPedido {
  const subtotal = subtotalPedido(itens);
  const plano = planoPorId(planoId);
  const liquido = totalComDesconto(subtotal, plano.descontoPercentual);
  return {
    subtotal,
    totalLiquido: liquido,
    descontoPercentual: plano.descontoPercentual,
    economiaTotal: economia(subtotal, liquido),
    comissao: comissaoVendedor(liquido),
    custoDiario: custoDiario(liquido, plano.duracaoMinimaMeses),
    plano,
  };
}