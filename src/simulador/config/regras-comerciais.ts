import catalog from "../catalog.json";
import type { Combo, ComboItem, LinhaProduto, PlanoCompromisso, Produto } from "../types";

/**
 * Regras comerciais centralizadas da Aeterna (uso interno).
 * Os preços do catálogo já incluem 15% de comissão do vendedor
 * sobre o valor de fábrica. Ajuste aqui (e no catalog.json)
 * sem tocar na lógica de UI.
 */

const CATALOGO = catalog as { produtos: Produto[]; combos: Combo[] };

export const produtos: Produto[] = CATALOGO.produtos;
export const combos: Combo[] = CATALOGO.combos;

/** Pedido mínimo por produto: 100 potes/unidades. */
export const QUANTIDADE_MINIMA = 100;

/** Comissão do vendedor embutida no preço do catálogo (sobre o valor de fábrica). */
export const COMISSAO_VENDEDOR_PERCENTUAL = 0.15;

/** Linhas do catálogo para filtro. */
export const LINHAS: { id: LinhaProduto; label: string }[] = [
  { id: "premium", label: "Premium" },
  { id: "basica", label: "Básica" },
  { id: "complementar", label: "Complementares" },
];

/** Dias considerados por mês para o cálculo do custo diário. */
export const DIAS_POR_MES = 30;

/** Planos de compromisso disponíveis. */
export const PLANOS: PlanoCompromisso[] = [
  {
    id: "mensal",
    nome: "Pacote Mensal",
    duracaoMinimaMeses: 1,
    descontoPercentual: 0,
    descricao: "Tabela padrão, sem fidelidade",
  },
  {
    id: "trimestral",
    nome: "Pacote Trimestral",
    duracaoMinimaMeses: 3,
    descontoPercentual: 8,
    descricao: "A partir de 3 meses",
  },
  {
    id: "anual",
    nome: "Pacote Anual",
    duracaoMinimaMeses: 12,
    descontoPercentual: 15,
    descricao: "A partir de 12 meses",
  },
];

/** Kit inteligente usado pelo atalho de carregamento rápido. */
export const KIT_RECOMENDADO_ID =
  combos.find((c) => c.recomendado)?.id ?? combos[0]?.id;

/** Busca um produto pelo id no catálogo atual. */
export function produtoPorId(id: string): Produto | undefined {
  return produtos.find((p) => p.id === id);
}

/** Busca um combo pelo id no catálogo atual. */
export function comboPorId(id: string): Combo | undefined {
  return combos.find((c) => c.id === id);
}

/** Preço do kit = soma de cada componente × sua quantidade (100 potes/un). */
export function precoCombo(combo: Combo): number {
  return combo.itens.reduce((acc, item) => {
    const produto = produtoPorId(item.produtoId);
    return acc + (produto?.precoUnitario ?? 0) * item.quantidade;
  }, 0);
}

/** Valor de fábrica de um item do kit (preço já inclui comissão de 15%). */
export function valorFabrica(produto: Produto, quantidade: number): number {
  return produto.precoUnitario * (quantidade / (1 + COMISSAO_VENDEDOR_PERCENTUAL));
}

export type { ComboItem, LinhaProduto };