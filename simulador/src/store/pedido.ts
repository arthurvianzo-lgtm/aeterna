import { create } from "zustand";
import {
  KIT_INTELIGENTE_COMBO_ID,
  comboPorId,
  produtoPorId,
} from "@/config/regras-comerciais";
import type { ComboPedido, ItemPedido, PlanoCompromissoId } from "@/types";

type PedidoState = {
  nomeCliente: string;
  consultorLogado: boolean;
  itensAvulsos: ItemPedido[];
  combos: ComboPedido[];
  planoId: PlanoCompromissoId;
  margemRevenda: number;
  observacoesPorCombo: Record<string, string>;
  observacaoPedido: string;

  setNomeCliente: (nome: string) => void;
  setConsultorLogado: (logado: boolean) => void;

  adicionarCombo: (comboId: string) => void;
  removerCombo: (comboId: string) => void;
  atualizarQuantidadeCombo: (comboId: string, quantidade: number) => void;
  setObservacaoCombo: (comboId: string, observacao: string) => void;

  adicionarAvulso: (produtoId: string) => void;
  removerAvulso: (produtoId: string) => void;
  atualizarQuantidadeAvulso: (produtoId: string, quantidade: number) => void;

  setPlanoId: (planoId: PlanoCompromissoId) => void;
  setMargemRevenda: (margem: number) => void;
  setObservacaoPedido: (observacao: string) => void;

  carregarKitInteligente: () => void;
  zerarPedido: () => void;
};

export const usePedidoStore = create<PedidoState>((set) => ({
  nomeCliente: "",
  consultorLogado: false,
  itensAvulsos: [],
  combos: [],
  planoId: "mensal",
  margemRevenda: 45,
  observacoesPorCombo: {},
  observacaoPedido: "",

  setNomeCliente: (nome) => set({ nomeCliente: nome }),
  setConsultorLogado: (logado) => set({ consultorLogado: logado }),

  adicionarCombo: (comboId) =>
    set((state) => {
      const combo = comboPorId(comboId);
      if (!combo) return state;
      const existente = state.combos.find((c) => c.comboId === comboId);
      const combos: ComboPedido[] = existente
        ? state.combos.map((c) =>
            c.comboId === comboId ? { ...c, quantidade: c.quantidade + 1 } : c
          )
        : [...state.combos, { comboId, quantidade: 1, precoTotal: combo.precoTotal }];
      return { combos };
    }),

  removerCombo: (comboId) =>
    set((state) => ({
      combos: state.combos.filter((c) => c.comboId !== comboId),
      observacoesPorCombo: Object.fromEntries(
        Object.entries(state.observacoesPorCombo).filter(([k]) => k !== comboId)
      ),
    })),

  atualizarQuantidadeCombo: (comboId, quantidade) =>
    set((state) => ({
      combos: state.combos
        .map((c) =>
          c.comboId === comboId
            ? { ...c, quantidade: Math.max(1, quantidade) }
            : c
        )
        .filter((c) => c.quantidade > 0),
    })),

  setObservacaoCombo: (comboId, observacao) =>
    set((state) => ({
      observacoesPorCombo: {
        ...state.observacoesPorCombo,
        [comboId]: observacao,
      },
    })),

  adicionarAvulso: (produtoId) =>
    set((state) => {
      const produto = produtoPorId(produtoId);
      if (!produto) return state;
      const existente = state.itensAvulsos.find((i) => i.produtoId === produtoId);
      const itensAvulsos: ItemPedido[] = existente
        ? state.itensAvulsos.map((i) =>
            i.produtoId === produtoId ? { ...i, quantidade: i.quantidade + 1 } : i
          )
        : [
            ...state.itensAvulsos,
            { produtoId, quantidade: 1, precoUnitario: produto.precoUnitario },
          ];
      return { itensAvulsos };
    }),

  removerAvulso: (produtoId) =>
    set((state) => ({
      itensAvulsos: state.itensAvulsos.filter((i) => i.produtoId !== produtoId),
    })),

  atualizarQuantidadeAvulso: (produtoId, quantidade) =>
    set((state) => ({
      itensAvulsos: state.itensAvulsos
        .map((i) =>
          i.produtoId === produtoId
            ? { ...i, quantidade: Math.max(1, quantidade) }
            : i
        )
        .filter((i) => i.quantidade > 0),
    })),

  setPlanoId: (planoId) => set({ planoId }),
  setMargemRevenda: (margem) => set({ margemRevenda: margem }),
  setObservacaoPedido: (observacao) => set({ observacaoPedido: observacao }),

  carregarKitInteligente: () =>
    set((state) => {
      const kitId = KIT_INTELIGENTE_COMBO_ID;
      if (!kitId) return state;
      const combo = comboPorId(kitId);
      if (!combo) return state;
      return {
        itensAvulsos: [],
        combos: [{ comboId: kitId, quantidade: 1, precoTotal: combo.precoTotal }],
      };
    }),

  zerarPedido: () =>
    set({
      itensAvulsos: [],
      combos: [],
      observacoesPorCombo: {},
      observacaoPedido: "",
    }),
}));