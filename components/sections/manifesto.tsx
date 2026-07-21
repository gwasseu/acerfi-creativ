"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SENTENCE = [
  "Du",
  "design",
  "à",
  "l'automatisation,",
  "nous",
  "transformons",
  "vos",
  "idées",
  "en",
  "performance.",
];

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.2"],
  });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden px-6 py-32 md:py-48"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(245, 180, 0,0.08), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="block text-[10px] font-semibold uppercase tracking-[0.32em] text-primary"
        >
          Manifeste
        </motion.span>

        <h2 className="mt-8 font-display text-[clamp(2.4rem,7vw,6rem)] font-light leading-[1.05] tracking-tight">
          {SENTENCE.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              word={word}
              progress={scrollYProgress}
              index={i}
              total={SENTENCE.length}
            />
          ))}
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid max-w-3xl grid-cols-1 gap-3 text-sm text-foreground/55 sm:grid-cols-3 sm:text-xs sm:uppercase sm:tracking-[0.18em]"
        >
          <span>↳ Création</span>
          <span>↳ Intelligence Artificielle</span>
          <span>↳ Performance</span>
        </motion.div>
      </div>
    </section>
  );
}

function Word({
  word,
  progress,
  index,
  total,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
  total: number;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.32, 1]);
  const y = useTransform(progress, [start, end], [12, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="mr-[0.25em] inline-block italic"
    >
      {word}
    </motion.span>
  );
}
