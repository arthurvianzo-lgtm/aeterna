import { NextResponse } from "next/server";

const CODIGO_ACESSO = process.env.SIMULADOR_ACCESS_CODE ?? "aeterna@2025";

const ERRO = { ok: false, erro: "Código de acesso inválido." } as const;

export async function POST(req: Request) {
  let codigo = "";
  try {
    const body = await req.json();
    codigo = typeof body?.codigo === "string" ? body.codigo : "";
  } catch {
    return NextResponse.json(ERRO, { status: 401 });
  }

  if (!codigo || codigo !== CODIGO_ACESSO) {
    return NextResponse.json(ERRO, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("simulador_auth", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/simulador",
    maxAge: 60 * 60 * 8,
    secure: new URL(req.url).protocol === "https:",
  });
  return res;
}