export type LinhaProduto = "premium" | "basica" | "complementar";

export type Produto = {
  id: string;
  nome: string;
  categoria: string;
  formato: string;
  linha: LinhaProduto;
  precoUnitario: number;
};

export type ComboItem = {
  produtoId: string;
  quantidade: number;
};

export type Combo = {
  id: string;
  nome: string;
  tagline: string;
  badge?: string;
  recomendado?: boolean;
  itens: ComboItem[];
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
  comboId?: string;
};

export type Pedido = {
  itens: ItemPedido[];
  planoId: PlanoCompromissoId;
  observacaoPedido?: string;
};