export function formatBRL(n: number): string {
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatNumero(n: number): string {
  return n.toLocaleString("pt-BR", { maximumFractionDigits: 0 });
}

export function formatPontos(n: number): string {
  return n.toLocaleString("pt-BR");
}