"use client";

import { useState } from "react";
import Header from "@/simulador/components/Header";
import Combos from "@/simulador/components/Combos";
import PlanoCompromisso from "@/simulador/components/PlanoCompromisso";
import Indicadores from "@/simulador/components/Indicadores";
import ConstrutorPedido from "@/simulador/components/ConstrutorPedido";
import MargemSlider from "@/simulador/components/MargemSlider";
import Rodape from "@/simulador/components/Rodape";
import PropostaModal from "@/simulador/components/PropostaModal";

export default function SimuladorApp() {
  const [propostaAberta, setPropostaAberta] = useState(false);

  return (
    <div className="sim-app min-h-screen bg-sim-surface text-sim-ink">
      <Header />

      <main className="mx-auto max-w-[1400px] px-4 pb-44 pt-6 sm:px-6">
        <Combos />
        <PlanoCompromisso />
        <Indicadores />
        <ConstrutorPedido />
        <MargemSlider />
      </main>

      <Rodape aoGerarProposta={() => setPropostaAberta(true)} />
      {propostaAberta && (
        <PropostaModal aoFechar={() => setPropostaAberta(false)} />
      )}
    </div>
  );
}