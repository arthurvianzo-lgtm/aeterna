import {
  DIAS_POR_MES,
  MARGEM_META_SUGERIDA,
  MARGEM_MINIMA,
  PLANOS,
  VALOR_POR_PONTO,
} from "@/simulador/config/regras-comerciais";
import type {
  ComboPedido,
  ItemPedido,
  PlanoCompromisso,
  PlanoCompromissoId,
} from "@/simulador/types";

/** Soma dos itens avulsos (sem desconto). */
export function subtotalAvulsos(itens: ItemPedido[]): number {
  return itens.reduce((acc, i) => acc + i.quantidade * i.precoUnitario, 0);
}

/** Soma dos combos selecionados (sem desconto). */
export function subtotalCombos(combos: ComboPedido[]): number {
  return combos.reduce((acc, c) => acc + c.quantidade * c.precoTotal, 0);
}

/** Custo bruto do pedido: combos + avulsos, sem desconto. */
export function custoBruto(itens: ItemPedido[], combos: ComboPedido[]): number {
  return subtotalAvulsos(itens) + subtotalCombos(combos);
}

export function planoPorId(id: PlanoCompromissoId): PlanoCompromisso {
  return PLANOS.find((p) => p.id === id) ?? PLANOS[0];
}

/** Total do pedido aplicando o desconto do plano de compromisso. */
export function totalComDesconto(custoBrutoTotal: number, descontoPercentual: number): number {
  return custoBrutoTotal * (1 - descontoPercentual / 100);
}

/** Economia = total sem desconto − total com desconto. */
export function economia(custoBrutoTotal: number, totalLiquido: number): number {
  return Math.max(0, custoBrutoTotal - totalLiquido);
}

/** Custo diário = total do plano / (duração em meses × 30). */
export function custoDiario(totalLiquido: number, duracaoMinimaMeses: number): number {
  if (duracaoMinimaMeses <= 0) return 0;
  return totalLiquido / (duracaoMinimaMeses * DIAS_POR_MES);
}

/** Pontos por indicação: 1 ponto a cada VALOR_POR_PONTO de investimento. */
export function pontosIndicacao(
  investimento: number,
  valorPorPonto: number = VALOR_POR_PONTO
): number {
  if (valorPorPonto <= 0) return 0;
  return Math.floor(investimento / valorPorPonto);
}

/**
 * Preço de venda ao cliente = custo do consultor / (1 − margem%).
 * Este é o valor mínimo de venda que respeita a margem escolhida.
 */
export function precoMinimoVenda(custo: number, margemPercentual: number): number {
  const m = margemPercentual / 100;
  if (m >= 1) return 0;
  return custo / (1 - m);
}

/**
 * Comissão do consultor = (preço de venda − custo) × quantidade, somado ao longo
 * de todos os itens. Equivale a custoLiquido × (m / (1 − m)).
 */
export function comissaoConsultor(custoLiquido: number, margemPercentual: number): number {
  const m = margemPercentual / 100;
  if (m >= 1) return 0;
  return custoLiquido * (m / (1 - m));
}

export type ResumoPedido = {
  custoBrutoTotal: number;
  descontoPercentual: number;
  totalLiquido: number;
  economiaTotal: number;
  precoVendaCliente: number;
  comissao: number;
  custoDiario: number;
  pontos: number;
  plano: PlanoCompromisso;
};

/** Consolida todos os indicadores do pedido a partir do estado atual. */
export function resumoPedido(
  itens: ItemPedido[],
  combos: ComboPedido[],
  planoId: PlanoCompromissoId,
  margemPercentual: number
): ResumoPedido {
  const bruto = custoBruto(itens, combos);
  const plano = planoPorId(planoId);
  const liquido = totalComDesconto(bruto, plano.descontoPercentual);
  return {
    custoBrutoTotal: bruto,
    descontoPercentual: plano.descontoPercentual,
    totalLiquido: liquido,
    economiaTotal: economia(bruto, liquido),
    precoVendaCliente: precoMinimoVenda(liquido, margemPercentual),
    comissao: comissaoConsultor(liquido, margemPercentual),
    custoDiario: custoDiario(liquido, plano.duracaoMinimaMeses),
    pontos: pontosIndicacao(liquido),
    plano,
  };
}

export { MARGEM_MINIMA, MARGEM_META_SUGERIDA, VALOR_POR_PONTO, DIAS_POR_MES };