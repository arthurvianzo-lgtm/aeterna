import { AtSign, Mail, MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-sm text-center md:text-left">
            <span className="text-xl font-black tracking-tight text-slate-900">
              Aeterna<span className="text-emerald-600">.</span>
            </span>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Private Label de suplementos para academias. Do design à entrega, sua
              linha própria completa e regulamentada.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            <div>
              <h4 className="font-semibold text-slate-900">Navegação</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#pilares" className="text-slate-500 transition-colors hover:text-emerald-600">Pilares</a></li>
                <li><a href="#como-funciona" className="text-slate-500 transition-colors hover:text-emerald-600">Como funciona</a></li>
                <li><a href="#margem" className="text-slate-500 transition-colors hover:text-emerald-600">Sua margem</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Solução</h4>
              <ul className="mt-4 space-y-2">
                <li><span className="text-slate-500">Design do rótulo</span></li>
                <li><span className="text-slate-500">Regulação</span></li>
                <li><span className="text-slate-500">Fabricação industrial</span></li>
                <li><span className="text-slate-500">Entrega final</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Contato</h4>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-slate-500 transition-colors hover:text-emerald-600"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contato@aeterna.com.br"
                    className="inline-flex items-center gap-2 text-slate-500 transition-colors hover:text-emerald-600"
                  >
                    <Mail className="h-4 w-4" /> contato@aeterna.com.br
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-slate-500 transition-colors hover:text-emerald-600"
                  >
                    <AtSign className="h-4 w-4" /> @aeterna
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>© {year} Aeterna. Todos os direitos reservados.</p>
          <p>Private Label de Suplementos · Feito para academias</p>
        </div>
      </div>
    </footer>
  );
}
