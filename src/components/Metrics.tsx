"use client";

import Reveal from "./Reveal";
import AnimatedNumber from "./AnimatedNumber";

const metrics = [
  {
    value: 100,
    prefix: "+",
    suffix: "%",
    label: "de margem média",
    desc: "Vs. ~20-30% na revenda tradicional.",
  },
  {
    value: 100,
    suffix: "%",
    label: "regularizado ANVISA",
    desc: "Registro e conformidade inclusos no processo.",
  },
  {
    value: 90,
    suffix: " dias",
    label: "para lançar",
    desc: "Do alinhamento à primeira entrega.",
  },
  {
    value: 120,
    prefix: "+",
    label: "academias",
    desc: "Já operam com linha própria Aeterna.",
  },
];

export default function Metrics() {
  return (
    <section className="border-y border-slate-200/80 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08} className="text-center lg:text-left">
              <div className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                <AnimatedNumber
                  value={m.value}
                  prefix={m.prefix ?? ""}
                  suffix={m.suffix ?? ""}
                />
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-700">{m.label}</p>
              <p className="mt-1 text-sm text-slate-500">{m.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
