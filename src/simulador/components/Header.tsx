"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, ShieldCheck } from "lucide-react";
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
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center" aria-label="Aeterna">
          <Image
            src="/logo.svg"
            alt="Aeterna"
            width={140}
            height={35}
            priority
            className="h-8 w-auto object-contain"
          />
        </a>

        <div className="hidden min-w-0 flex-1 md:block">
          <p className="truncate text-sm font-semibold text-slate-900">
            Simulador de vendas B2B
          </p>
          <p className="text-[11px] text-slate-500">
            Catálogo direto da fábrica · 15% de comissão evitada no preço
          </p>
        </div>

        <div className="relative ml-auto w-full max-w-xs min-w-0">
          <input
            type="text"
            value={nomeCliente}
            onChange={(e) => setNomeCliente(e.target.value)}
            placeholder="Nome do cliente"
            className="w-full rounded-full border border-slate-200 bg-white py-2 pl-4 pr-3 text-sm text-slate-900 outline-none ring-emerald-500/30 transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4"
          />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:inline-flex">
            <ShieldCheck className="h-4 w-4" />
            Consultor · Área restrita
          </span>
          <button
            onClick={sair}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </nav>
    </header>
  );
}