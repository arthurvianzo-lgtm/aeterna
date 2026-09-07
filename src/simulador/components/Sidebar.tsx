"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  FlaskConical,
  ShoppingCart,
  Users,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/simulador/lib/cn";

export type SecaoId = "visao-geral" | "kits" | "catalogo" | "resumo" | "clientes";

export const ROTULOS_SECAO: Record<SecaoId, string> = {
  "visao-geral": "Visão geral",
  kits: "Kits estratégicos",
  catalogo: "Catálogo de produtos",
  resumo: "Resumo do pedido",
  clientes: "Clientes",
};

const ITENS_MENU: { id: SecaoId; label: string; icon: React.ElementType }[] = [
  { id: "visao-geral", label: "Visão geral", icon: LayoutDashboard },
  { id: "kits", label: "Kits estratégicos", icon: FolderKanban },
  { id: "catalogo", label: "Catálogo de produtos", icon: FlaskConical },
  { id: "resumo", label: "Resumo do pedido", icon: ShoppingCart },
  { id: "clientes", label: "Clientes", icon: Users },
];

export default function Sidebar({
  collapsed,
  active,
  badgeResumo,
  onSelect,
  className,
}: {
  collapsed: boolean;
  active: SecaoId;
  badgeResumo?: number;
  onSelect: (id: SecaoId) => void;
  className?: string;
}) {
  const router = useRouter();
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    if (!saindo) return;
    (async () => {
      try {
        await fetch("/api/simulador/logout", { method: "POST" });
      } finally {
        router.refresh();
      }
    })();
  }, [saindo, router]);

  return (
    <nav
      className={cn(
        "flex h-full flex-col border-r border-slate-200/80 bg-white p-3 transition-[width] duration-300",
        collapsed ? "w-[76px]" : "w-64",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center px-2 pb-4",
          collapsed && "justify-center px-0"
        )}
      >
        <Image
          src="/logo.svg"
          alt="Aeterna"
          width={140}
          height={35}
          priority
          className={cn(
            "h-8 w-auto object-contain transition-opacity",
            collapsed && "h-8 opacity-0"
          )}
        />
        {collapsed && (
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 font-black text-emerald-700">
            A
          </span>
        )}
      </div>

      <ul className="flex-1 space-y-0.5 overflow-y-auto">
        {ITENS_MENU.map((item) => {
          const ativo = active === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item.id)}
                title={collapsePreserva(collapsed, item.label)}
                className={cn(
                  "group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                  collapsed && "justify-center px-0",
                  ativo
                    ? "bg-emerald-50 font-semibold text-emerald-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <item.icon
                  className={cn(
                    "h-[18px] w-[18px] shrink-0",
                    ativo ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600"
                  )}
                  strokeWidth={1.5}
                />
                {!collapsed && (
                  <>
                    <span className="min-w-0 flex-1 truncate text-left">
                      {item.label}
                    </span>
                    {item.id === "resumo" && badgeResumo !== undefined && badgeResumo > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1.5 text-[10px] font-bold text-white">
                        {badgeResumo}
                      </span>
                    )}
                  </>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto space-y-2 border-t border-slate-100 pt-3">
        <div
          className={cn(
            "flex items-center gap-2 rounded-lg",
            collapsed ? "justify-center" : "px-2"
          )}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
          </span>
          {!collapsed && (
            <div className="min-w-0 leading-tight">
              <p className="truncate text-xs font-semibold text-slate-900">
                Consultor Aeterna
              </p>
              <p className="text-[10px] text-slate-500">Área restrita</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setSaindo(true)}
          title={collapsePreserva(collapsed, "Sair")}
          className={cn(
            "group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600",
            collapsed && "justify-center px-0"
          )}
        >
          <LogOut className="h-[18px] w-[18px] shrink-0 text-slate-400 group-hover:text-red-500" strokeWidth={1.5} />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </nav>
  );
}

function collapsePreserva(collapsed: boolean, texto: string): string {
  return collapsed ? texto : "";
}