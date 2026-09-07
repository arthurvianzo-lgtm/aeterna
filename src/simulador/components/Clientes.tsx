"use client";

import { useState } from "react";
import { usePedidoStore } from "@/simulador/store/pedido";
import type { Cliente } from "@/simulador/types";
import { UserPlus, Users, Phone, UserRound, Trash2, Check } from "lucide-react";

export default function ClientesSection() {
  const clientes = usePedidoStore((s) => s.clientes);
  const [formAberto, setFormAberto] = useState(false);

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Clientes
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Gerencie seus clientes e crie propostas em segundos.
          </p>
        </div>
        <button
          onClick={() => setFormAberto((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-700"
        >
          <UserPlus className="h-4 w-4" />
          Novo cliente
        </button>
      </div>

      {formAberto && <FormNovoCliente aoCancelar={() => setFormAberto(false)} />}

      {clientes.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-white/60 p-10 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <Users className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-800">
              Nenhum cliente cadastrado ainda
            </p>
            <p className="mt-0.5 text-sm text-slate-500">
              Cadastre o primeiro cliente para começar.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {clientes.map((cliente) => (
            <CardCliente key={cliente.id} cliente={cliente} />
          ))}
        </div>
      )}
    </section>
  );
}

function FormNovoCliente({ aoCancelar }: { aoCancelar: () => void }) {
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [anotacao, setAnotacao] = useState("");
  const adicionarCliente = usePedidoStore((s) => s.adicionarCliente);

  const salvar = () => {
    if (!nome.trim()) return;
    adicionarCliente({ nome, contato, anotacao });
    aoCancelar();
  };

  return (
    <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
      <p className="text-sm font-bold text-slate-900">Cadastrar cliente</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Nome *
          </label>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome da cliente / academia"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-emerald-500/30 transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4"
          />
        </div>
        <div>
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Contato (WhatsApp / e-mail)
          </label>
          <input
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            placeholder="(11) 99999-9999"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-emerald-500/30 transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4"
          />
        </div>
      </div>
      <div className="mt-3">
        <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          Anotação
        </label>
        <textarea
          value={anotacao}
          onChange={(e) => setAnotacao(e.target.value)}
          rows={2}
          placeholder="Ex.: Quer linha completa para reinauguração em março."
          className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-emerald-500/30 transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4"
        />
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={salvar}
          disabled={!nome.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <UserPlus className="h-4 w-4" /> Salvar cliente
        </button>
        <button
          onClick={aoCancelar}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

function CardCliente({ cliente }: { cliente: Cliente }) {
  const setNomeCliente = usePedidoStore((s) => s.setNomeCliente);
  const removerCliente = usePedidoStore((s) => s.removerCliente);
  const nomeClienteAtual = usePedidoStore((s) => s.nomeCliente);
  const emUso = nomeClienteAtual === cliente.nome;

  return (
    <article
      className={`rounded-2xl border bg-white p-5 shadow-sm transition ${
        emUso ? "border-emerald-300 ring-1 ring-emerald-200" : "border-slate-200/80"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-emerald-400">
            <UserRound className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-bold text-slate-900">{cliente.nome}</p>
            {cliente.contato && (
              <p className="flex items-center gap-1 text-xs text-slate-500">
                <Phone className="h-3 w-3" /> {cliente.contato}
              </p>
            )}
          </div>
        </div>
        {emUso && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-200">
            <Check className="h-3 w-3" /> No pedido
          </span>
        )}
      </div>

      {cliente.anotacao && (
        <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
          {cliente.anotacao}
        </p>
      )}

      <p className="mt-3 text-[10px] text-slate-400">
        Cadastro em{" "}
        {new Date(cliente.criadoEm).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => setNomeCliente(cliente.nome)}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
        >
          <UserRound className="h-3.5 w-3.5" />
          Usar neste pedido
        </button>
        <button
          onClick={() => removerCliente(cliente.id)}
          className="inline-flex items-center justify-center gap-1 rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          aria-label="Excluir cliente"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
}