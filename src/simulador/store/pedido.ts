import { create } from "zustand";
import {
  comboPorId,
  KIT_RECOMENDADO_ID,
  produtoPorId,
  QUANTIDADE_MINIMA,
} from "@/simulador/config/regras-comerciais";
import type { Combo, ItemPedido, PlanoCompromissoId } from "@/simulador/types";

function arredondarParaMinimo(valor: number): number {
  const passos = Math.ceil(Math.max(0, valor) / QUANTIDADE_MINIMA);
  return Math.max(QUANTIDADE_MINIMA, passos * QUANTIDADE_MINIMA);
}

/** Adiciona os componentes de um combo aos itens atuais (marcando a origem). */
function adicionarComboNosItens(combo: Combo, itens: ItemPedido[]): ItemPedido[] {
  const resultado = [...itens];
  for (const item of combo.itens) {
    const existente = resultado.find((i) => i.produtoId === item.produtoId);
    if (existente) {
      existente.quantidade += item.quantidade;
      existente.comboId = combo.id;
    } else {
      resultado.push({
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        comboId: combo.id,
      });
    }
  }
  return resultado;
}

type PedidoState = {
  nomeCliente: string;
  itens: ItemPedido[];
  planoId: PlanoCompromissoId;
  observacaoPedido: string;

  setNomeCliente: (nome: string) => void;
  setPlanoId: (planoId: PlanoCompromissoId) => void;
  setObservacaoPedido: (observacao: string) => void;

  adicionarProduto: (produtoId: string) => void;
  atualizarQuantidade: (produtoId: string, quantidade: number) => void;
  removerItem: (produtoId: string) => void;

  adicionarCombo: (comboId: string) => void;
  removerCombo: (comboId: string) => void;

  carregarKitRecomendado: () => void;
  zerarPedido: () => void;
};

export const usePedidoStore = create<PedidoState>((set) => ({
  nomeCliente: "",
  itens: [],
  planoId: "mensal",
  observacaoPedido: "",

  setNomeCliente: (nome) => set({ nomeCliente: nome }),
  setPlanoId: (planoId) => set({ planoId }),
  setObservacaoPedido: (observacao) => set({ observacaoPedido: observacao }),

  adicionarProduto: (produtoId) => {
    if (!produtoPorId(produtoId)) return;
    set((state) => {
      const existente = state.itens.find((i) => i.produtoId === produtoId);
      const itens: ItemPedido[] = existente
        ? state.itens.map((i) =>
            i.produtoId === produtoId
              ? { ...i, quantidade: i.quantidade + QUANTIDADE_MINIMA, comboId: undefined }
              : i
          )
        : [...state.itens, { produtoId, quantidade: QUANTIDADE_MINIMA }];
      return { itens };
    });
  },

  atualizarQuantidade: (produtoId, quantidade) => {
    if (!produtoPorId(produtoId)) return;
    set((state) => ({
      itens: state.itens
        .map((i) =>
          i.produtoId === produtoId
            ? { ...i, quantidade: arredondarParaMinimo(quantidade) }
            : i
        )
        .filter((i) => i.quantidade > 0),
    }));
  },

  removerItem: (produtoId) =>
    set((state) => ({
      itens: state.itens.filter((i) => i.produtoId !== produtoId),
    })),

  adicionarCombo: (comboId) => {
    const combo = comboPorId(comboId);
    if (!combo) return;
    set((state) => ({ itens: adicionarComboNosItens(combo, state.itens) }));
  },

  removerCombo: (comboId) => {
    const combo = comboPorId(comboId);
    if (!combo) return;
    set((state) => ({
      itens: state.itens
        .map((i) => {
          const componente = combo.itens.find((c) => c.produtoId === i.produtoId);
          if (!componente) return i;
          return {
            ...i,
            quantidade: i.quantidade - componente.quantidade,
            comboId: i.comboId === comboId ? undefined : i.comboId,
          };
        })
        .filter((i) => i.quantidade > 0),
    }));
  },

  carregarKitRecomendado: () => {
    const combo = comboPorId(KIT_RECOMENDADO_ID);
    if (!combo) return;
    set((state) => ({ itens: adicionarComboNosItens(combo, state.itens) }));
  },

  zerarPedido: () => set({ itens: [], observacaoPedido: "" }),
}));