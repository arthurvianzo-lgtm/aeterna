import catalog from "../catalog.json";
import type { Combo, PlanoCompromisso, Produto } from "../types";

/**
 * Regras comerciais centralizadas da Aeterna.
 * Para ajustar preços, combos, descontos, margens ou pontos,
 * altere este arquivo (e o catalog.json) sem tocar na lógica de UI.
 */

const CATALOGO = catalog as { produtos: Produto[]; combos: Combo[] };

export const produtos: Produto[] = CATALOGO.produtos;
export const combos: Combo[] = CATALOGO.combos;

/** Piso de margem de revenda do distribuidor (protegido). */
export const MARGEM_MINIMA = 0.15;

/** Meta sugerida de margem para o consultor. */
export const MARGEM_META_SUGERIDA = 0.45;

/** Limite superior do slider de margem. */
export const MARGEM_MAXIMA = 0.7;

/** 1 ponto de indicação a cada VALOR_POR_PONTO reais investidos. */
export const VALOR_POR_PONTO = 50;

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

/** Kit inteligente carregado pelo atalho "Carregar um kit inteligente". */
export const KIT_INTELIGENTE_COMBO_ID =
  combos.find((c) => c.recomendado)?.id ?? combos[0]?.id;

/** Busca um produto pelo id no catálogo atual. */
export function produtoPorId(id: string): Produto | undefined {
  return produtos.find((p) => p.id === id);
}

/** Busca um combo pelo id no catálogo atual. */
export function comboPorId(id: string): Combo | undefined {
  return combos.find((c) => c.id === id);
}