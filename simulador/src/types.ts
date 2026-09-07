export type Produto = {
  id: string;
  nome: string;
  precoUnitario: number;
  categoria: string;
  descricaoCurta: string;
};

export type ComposicaoItem = {
  produtoId: string;
  percentual: number;
};

export type Combo = {
  id: string;
  nome: string;
  tagline: string;
  badge?: string;
  composicao: ComposicaoItem[];
  precoTotal: number;
  recomendado?: boolean;
};

export type PlanoCompromissoId = "mensal" | "trimestral" | "anual";

export type PlanoCompromisso = {
  id: PlanoCompromissoId;
  nome: string;
  duracaoMinimaMeses: number;
  descontoPercentual: number;
  descricao: string;
};

export type ItemPedido = {
  produtoId: string;
  quantidade: number;
  precoUnitario: number;
};

export type ComboPedido = {
  comboId: string;
  quantidade: number;
  precoTotal: number;
};

export type Pedido = {
  itensAvulsos: ItemPedido[];
  combos: ComboPedido[];
  planoId: PlanoCompromissoId;
  margemRevenda: number;
  observacao?: string;
};