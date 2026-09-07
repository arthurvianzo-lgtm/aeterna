import { Search, LogOut, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePedidoStore } from "@/simulador/store/pedido";

export default function Header() {
  const router = useRouter();
  const nomeCliente = usePedidoStore((s) => s.nomeCliente);
  const setNomeCliente = usePedidoStore((s) => s.setNomeCliente);

  const sair = async () => {
    await fetch("/api/simulador/logout", { method: "POST" });
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-sim-line bg-sim-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sim-gold/15 text-sim-gold">
            <span className="text-lg font-black leading-none">A</span>
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold">Simulador Aeterna</p>
            <p className="text-[11px] text-sim-muted">Área de vendas B2B</p>
          </div>
        </div>

        <div className="relative ml-auto w-full min-w-0 flex-1 sm:ml-0 sm:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sim-muted" />
          <input
            type="text"
            value={nomeCliente}
            onChange={(e) => setNomeCliente(e.target.value)}
            placeholder="Nome do cliente ou consultoria"
            className="w-full rounded-lg border border-sim-line bg-sim-panel py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-sim-gold/60 focus:ring-2 focus:ring-sim-gold/20"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 rounded-lg border border-sim-mint/30 bg-sim-mint/10 px-3 py-2 text-xs font-semibold text-sim-mint sm:flex">
            <ShieldCheck className="h-4 w-4" />
            Consultor · Área restrita
          </span>
          <button
            onClick={sair}
            className="inline-flex items-center gap-1.5 rounded-lg border border-sim-line px-3 py-2 text-xs font-medium text-sim-muted transition hover:border-sim-danger/40 hover:text-sim-danger"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}