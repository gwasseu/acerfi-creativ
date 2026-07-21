"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

type CountUpProps = {
  value: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
};

export function CountUp({
  value,
  duration = 1.4,
  format = (n) => Math.round(n).toString(),
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(value);
  // SSR + first paint = final value (so SEO/no-JS users see it)
  const [display, setDisplay] = useState(() => format(value));
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!inView || animatedRef.current) return;
    animatedRef.current = true;

    if (reduce) return;

    motionValue.set(0);
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(format(v)),
    });
    return controls.stop;
  }, [inView, reduce, value, duration, motionValue, format]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
