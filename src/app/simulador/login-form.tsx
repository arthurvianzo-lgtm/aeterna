"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, LogIn, ShieldCheck } from "lucide-react";

export default function LoginForm() {
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const entrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      const res = await fetch("/api/simulador/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo }),
      });
      if (res.ok) {
        router.refresh();
        router.replace("/simulador");
      } else {
        const dados = await res.json().catch(() => ({}));
        setErro(dados.erro ?? "Código de acesso inválido.");
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="sim-app flex min-h-screen items-center justify-center bg-sim-surface px-4 text-sim-ink">
      <form
        onSubmit={entrar}
        className="w-full max-w-sm rounded-2xl border border-sim-line bg-sim-panel p-6 shadow-lg shadow-black/30"
      >
        <div className="flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sim-gold/15 text-sim-gold">
            <LockKeyhole className="h-6 w-6" />
          </span>
          <h1 className="mt-4 text-xl font-black tracking-tight">
            Simulador Aeterna
          </h1>
          <p className="mt-1 text-sm text-sim-muted">
            Acesso restrito à equipe de vendas B2B.
          </p>
        </div>

        <div className="mt-6">
          <label
            htmlFor="codigo-acesso"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-sim-muted"
          >
            Código de acesso
          </label>
          <input
            id="codigo-acesso"
            type="password"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Digite o código do consultor"
            autoFocus
            className="w-full rounded-lg border border-sim-line bg-sim-surface px-3 py-2.5 text-sm outline-none transition placeholder:text-sim-muted/60 focus:border-sim-gold/60 focus:ring-2 focus:ring-sim-gold/20"
          />
          {erro && (
            <p className="mt-2 rounded-lg border border-sim-danger/30 bg-sim-danger/10 px-3 py-2 text-xs text-sim-danger">
              {erro}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={carregando || !codigo.trim()}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sim-gold px-4 py-3 text-sm font-bold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <LogIn className="h-4 w-4" />
          {carregando ? "Entrando..." : "Entrar no simulador"}
        </button>

        <p className="mt-4 flex items-start justify-center gap-1.5 text-[11px] text-sim-muted">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sim-mint" />
          Área interna: dados de comissão jamais aparecem na proposta do cliente.
        </p>
      </form>
    </div>
  );
}