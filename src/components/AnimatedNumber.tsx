"use client";

import { useEffect, useRef } from "react";
import { useInView, useSpring } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export default function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const spring = useSpring(0, {
    stiffness: 60,
    damping: 20,
    mass: 1,
  });

  useEffect(() => {
    const format = (n: number) =>
      `${prefix}${n.toLocaleString("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;

    const update = (n: number) => {
      if (ref.current) {
        ref.current.textContent = format(n);
      }
    };

    update(spring.get());

    const unsubscribe = spring.on("change", update);
    return unsubscribe;
  }, [spring, prefix, suffix, decimals]);

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [inView, value, spring]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
