import { useState } from "react";
import Header from "@/components/Header";
import Combos from "@/components/Combos";
import PlanoCompromisso from "@/components/PlanoCompromisso";
import Indicadores from "@/components/Indicadores";
import ConstrutorPedido from "@/components/ConstrutorPedido";
import MargemSlider from "@/components/MargemSlider";
import Rodape from "@/components/Rodape";
import PropostaModal from "@/components/PropostaModal";

export default function App() {
  const [propostaAberta, setPropostaAberta] = useState(false);

  return (
    <div id="app-shell" className="min-h-screen bg-surface text-ink">
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