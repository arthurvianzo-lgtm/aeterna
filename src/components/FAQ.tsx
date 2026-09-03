"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "Como funciona a regularização com a ANVISA?",
    a: "Todo o processo de registro e conformidade é conduzido pela Aeterna. Você não precisa lidar com documentação, fiscalização ou laboratório — entregamos o produto 100% regularizado e pronto para venda.",
  },
  {
    q: "Qual o prazo para receber minha primeira entrega?",
    a: "O fluxo completo — do alinhamento à primeira entrega — leva em média 90 dias. Esse prazo cobre o desenvolvimento do rótulo, o registro regulatório e a produção industrial.",
  },
  {
    q: "Existe um pedido mínimo?",
    a: "Sim, trabalhamos com um volume mínimo competitivo que viabiliza o modelo de fabricação industrial. No alinhamento inicial, definimos juntos a quantidade ideal para o porte da sua academia.",
  },
  {
    q: "Quem faz o design do meu rótulo?",
    a: "Nossa equipe de design desenvolve a identidade visual, o rótulo e a embalagem sob medida para a sua marca. Você aprova cada etapa e recebe um produto com cara de grande laboratório.",
  },
  {
    q: "Posso vender online ou só na academia?",
    a: "Sim. A linha é sua, então você define os canais — balcão, app, loja virtual ou redes sociais. Você controla preço e distribuição sem intermediários.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-slate-50 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-600">
            Perguntas frequentes
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Dúvidas respondidas
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Tudo o que os donos de academia costumam perguntar antes de lançar a
            própria linha.
          </p>
        </Reveal>

        <div className="mt-12">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={i * 0.05}>
                <div
                  className={`rounded-xl border bg-white transition-colors ${
                    isOpen ? "border-emerald-200" : "border-slate-200/80"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-medium text-slate-900">
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        isOpen
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
