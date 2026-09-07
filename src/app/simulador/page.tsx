import type { Metadata } from "next";
import { cookies } from "next/headers";

import "@/simulador/simulador.css";

import SimuladorApp from "./simulador-app";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Simulador Aeterna · Área de vendas",
  description:
    "Simulador de vendas B2B da Aeterna para consultores e equipe comercial.",
  robots: { index: false, follow: false },
};

export default async function SimuladorPage() {
  const autenticado = (await cookies()).get("simulador_auth")?.value === "1";

  if (!autenticado) {
    return <LoginForm />;
  }

  return <SimuladorApp />;
}