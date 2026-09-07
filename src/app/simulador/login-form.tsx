"use client";

import Image from "next/image";
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
    <div className="sim-app flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-900">
      <form
        onSubmit={entrar}
        className="w-full max-w-sm rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/60"
      >
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo.svg"
            alt="Aeterna"
            width={140}
            height={35}
            priority
            className="h-9 w-auto object-contain"
          />
          <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <LockKeyhole className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-xl font-black tracking-tight">
            Simulador de vendas
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Acesso restrito à equipe comercial B2B.
          </p>
        </div>

        <div className="mt-6">
          <label
            htmlFor="codigo-acesso"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500"
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
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none ring-emerald-500/30 transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4"
          />
          {erro && (
            <p className="mt-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
              {erro}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={carregando || !codigo.trim()}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <LogIn className="h-4 w-4" />
          {carregando ? "Entrando..." : "Entrar no simulador"}
        </button>

        <p className="mt-4 flex items-start justify-center gap-1.5 text-[11px] text-slate-500">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
          Área interna: a comissão de 15% jamais aparece na proposta do cliente.
        </p>
      </form>
    </div>
  );
}