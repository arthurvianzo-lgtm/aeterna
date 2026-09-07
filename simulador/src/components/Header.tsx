import { Search, UserRound, LogIn, LogOut } from "lucide-react";
import { usePedidoStore } from "@/store/pedido";

export default function Header() {
  const nomeCliente = usePedidoStore((s) => s.nomeCliente);
  const consultorLogado = usePedidoStore((s) => s.consultorLogado);
  const setNomeCliente = usePedidoStore((s) => s.setNomeCliente);
  const setConsultorLogado = usePedidoStore((s) => s.setConsultorLogado);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15 text-gold">
            <span className="text-lg font-black leading-none">A</span>
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold">Simulador Aeterna</p>
            <p className="text-[11px] text-muted">Área de vendas B2B</p>
          </div>
        </div>

        <div className="relative ml-auto w-full min-w-0 flex-1 sm:ml-0 sm:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={nomeCliente}
            onChange={(e) => setNomeCliente(e.target.value)}
            placeholder="Nome do cliente ou consultoria"
            className="w-full rounded-lg border border-line bg-panel py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/20"
          />
        </div>

        <div className="flex items-center gap-2">
          {consultorLogado ? (
            <>
              <span className="hidden items-center gap-2 rounded-lg border border-mint/30 bg-mint/10 px-3 py-2 text-xs font-semibold text-mint sm:flex">
                <UserRound className="h-4 w-4" />
                Consultor logado
              </span>
              <button
                onClick={() => setConsultorLogado(false)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-medium text-muted transition hover:border-danger/40 hover:text-danger"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </button>
            </>
          ) : (
            <button
              onClick={() => setConsultorLogado(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-panel-2 px-3 py-2 text-xs font-semibold text-ink ring-1 ring-line transition hover:ring-gold/50"
            >
              <LogIn className="h-4 w-4" />
              Entrar como consultor
            </button>
          )}
        </div>
      </div>
    </header>
  );
}