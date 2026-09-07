import Catalogo from "./Catalogo";
import PedidoAtual from "./PedidoAtual";

export default function ConstrutorPedido() {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
        Construa a cotação
      </h2>
      <p className="mt-1 text-sm text-muted">
        Combine combos estratégicos com produtos avulsos do catálogo.
      </p>
      <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        <Catalogo />
        <PedidoAtual />
      </div>
    </section>
  );
}