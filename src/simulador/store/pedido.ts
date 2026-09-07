import { create } from "zustand";
import {
  comboPorId,
  KIT_RECOMENDADO_ID,
  produtoPorId,
  QUANTIDADE_MINIMA,
} from "@/simulador/config/regras-comerciais";
import type {
  Cliente,
  ComboItem,
  ItemPedido,
  KitPersonalizado,
  PlanoCompromissoId,
} from "@/simulador/types";

const STORAGE_KEY = "aeterna-simulador-v1";

function arredondarParaMinimo(valor: number): number {
  const passos = Math.ceil(Math.max(0, valor) / QUANTIDADE_MINIMA);
  return Math.max(QUANTIDADE_MINIMA, passos * QUANTIDADE_MINIMA);
}

function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function carregarDoStorage(): { clientes: Cliente[]; kitsPersonalizados: KitPersonalizado[] } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      clientes: Array.isArray(parsed?.clientes) ? parsed.clientes : [],
      kitsPersonalizados: Array.isArray(parsed?.kitsPersonalizados)
        ? parsed.kitsPersonalizados
        : [],
    };
  } catch {
    return null;
  }
}

function addItens(itens: ItemPedido[], novos: ComboItem[], kitId?: string): ItemPedido[] {
  const resultado = [...itens];
  for (const novo of novos) {
    const existente = resultado.find((i) => i.produtoId === novo.produtoId);
    if (existente) {
      existente.quantidade += novo.quantidade;
      existente.comboId = kitId;
    } else {
      resultado.push({
        produtoId: novo.produtoId,
        quantidade: novo.quantidade,
        comboId: kitId,
      });
    }
  }
  return resultado;
}

function subItens(itens: ItemPedido[], componentes: ComboItem[], kitId?: string): ItemPedido[] {
  return itens
    .map((i) => {
      const componente = componentes.find((c) => c.produtoId === i.produtoId);
      if (!componente) return i;
      return {
        ...i,
        quantidade: i.quantidade - componente.quantidade,
        comboId: i.comboId === kitId ? undefined : i.comboId,
      };
    })
    .filter((i) => i.quantidade > 0);
}

const inicial = carregarDoStorage();

type PedidoState = {
  nomeCliente: string;
  itens: ItemPedido[];
  planoId: PlanoCompromissoId;
  observacaoPedido: string;
  clientes: Cliente[];
  kitsPersonalizados: KitPersonalizado[];

  setNomeCliente: (nome: string) => void;
  setPlanoId: (planoId: PlanoCompromissoId) => void;
  setObservacaoPedido: (observacao: string) => void;

  adicionarProduto: (produtoId: string) => void;
  atualizarQuantidade: (produtoId: string, quantidade: number) => void;
  removerItem: (produtoId: string) => void;

  adicionarKit: (kitId: string) => void;
  removerKit: (kitId: string) => void;
  adicionarSelecao: (itens: ComboItem[]) => void;
  carregarKitRecomendado: () => void;
  zerarPedido: () => void;

  adicionarCliente: (dados: { nome: string; contato: string; anotacao?: string }) => void;
  atualizarCliente: (id: string, dados: Partial<Cliente>) => void;
  removerCliente: (id: string) => void;

  adicionarKitPersonalizado: (dados: { nome: string; itens: ComboItem[] }) => KitPersonalizado;
  removerKitPersonalizado: (id: string) => void;
};

export const usePedidoStore = create<PedidoState>((set, get) => ({
  nomeCliente: "",
  itens: [],
  planoId: "mensal",
  observacaoPedido: "",
  clientes: inicial?.clientes ?? [],
  kitsPersonalizados: inicial?.kitsPersonalizados ?? [],

  setNomeCliente: (nome) => set({ nomeCliente: nome }),
  setPlanoId: (planoId) => set({ planoId }),
  setObservacaoPedido: (observacao) => set({ observacaoPedido: observacao }),

  /** Produto avulso: adiciona (ou soma) 100 unidades, sem vínculo de kit. */
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

  /** Adiciona um kit (oficial ou personalizado) ao pedido. */
  adicionarKit: (kitId) => {
    const itens = itensDoKit(kitId, get);
    if (!itens) return;
    set((state) => ({ itens: addItens(state.itens, itens, kitId) }));
  },

  removerKit: (kitId) => {
    const itens = itensDoKit(kitId, get);
    if (!itens) return;
    set((state) => ({ itens: subItens(state.itens, itens, kitId) }));
  },

  /** Adiciona produtos avulsos (sem vínculo de kit) — usado pelo "Criar seu kit". */
  adicionarSelecao: (itens) =>
    set((state) => ({ itens: addItens(state.itens, itens) })),

  carregarKitRecomendado: () => {
    const combo = comboPorId(KIT_RECOMENDADO_ID);
    if (!combo) return;
    set((state) => ({ itens: addItens(state.itens, combo.itens, combo.id) }));
  },

  zerarPedido: () => set({ itens: [], observacaoPedido: "" }),

  adicionarCliente: ({ nome, contato, anotacao }) =>
    set((state) => ({
      clientes: [
        ...state.clientes,
        { id: uid(), nome: nome.trim(), contato: contato.trim(), anotacao, criadoEm: new Date().toISOString() },
      ],
    })),

  atualizarCliente: (id, dados) =>
    set((state) => ({
      clientes: state.clientes.map((c) => (c.id === id ? { ...c, ...dados } : c)),
    })),

  removerCliente: (id) =>
    set((state) => ({ clientes: state.clientes.filter((c) => c.id !== id) })),

  adicionarKitPersonalizado: ({ nome, itens }) => {
    const kit: KitPersonalizado = {
      id: uid(),
      nome: nome.trim(),
      itens,
      criadoEm: new Date().toISOString(),
    };
    set((state) => ({ kitsPersonalizados: [...state.kitsPersonalizados, kit] }));
    return kit;
  },

  removerKitPersonalizado: (id) =>
    set((state) => ({
      kitsPersonalizados: state.kitsPersonalizados.filter((k) => k.id !== id),
    })),
}));

type GetState = typeof usePedidoStore.getState;

function itensDoKit(kitId: string, get: GetState): ComboItem[] | undefined {
  const combo = comboPorId(kitId);
  if (combo) return combo.itens;
  const custom = get().kitsPersonalizados.find((k) => k.id === kitId);
  return custom?.itens;
}

/** Nome de um kit (oficial ou personalizado) para exibição nas linhas do pedido. */
export function nomeDeKit(id?: string): string | undefined {
  if (!id) return undefined;
  return comboPorId(id)?.nome ?? usePedidoStore.getState().kitsPersonalizados.find((k) => k.id === id)?.nome;
}

// Persistência local dos dados do vendedor (clientes e kits personalizados).
if (typeof window !== "undefined") {
  usePedidoStore.subscribe((state) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          clientes: state.clientes,
          kitsPersonalizados: state.kitsPersonalizados,
        })
      );
    } catch {
      /* armazenamento indisponível */
    }
  });
}