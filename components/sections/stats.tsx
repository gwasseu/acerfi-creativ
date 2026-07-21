"use client";

import { motion } from "framer-motion";
import {
  Banknote,
  Clock,
  Globe2,
  Recycle,
  type LucideIcon,
} from "lucide-react";
import { CountUp } from "@/components/ui/count-up";

type Stat = {
  icon: LucideIcon;
  value: number;
  suffix?: string;
  prefix?: string;
  format?: (n: number) => string;
  label: string;
  hint: string;
};

const formatThousand = (n: number) =>
  new Intl.NumberFormat("fr-FR")
    .format(Math.round(n))
    .replace(/[ \s]/g, " ");

const STATS: Stat[] = [
  {
    icon: Clock,
    value: 5,
    suffix: " j",
    label: "Délai moyen",
    hint: "Du brief à la mise en ligne",
  },
  {
    icon: Banknote,
    value: 99,
    suffix: " k",
    prefix: "À partir de ",
    format: (n) => formatThousand(n),
    label: "FCFA / an",
    hint: "Soit 271 FCFA / jour",
  },
  {
    icon: Globe2,
    value: 24,
    suffix: " / 7",
    label: "Disponibilité",
    hint: "Accessible partout, tout le temps",
  },
  {
    icon: Recycle,
    value: 0,
    suffix: "",
    label: "Réimpression",
    hint: "Modifications instantanées, à vie",
  },
];

export function Stats() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="relative w-full px-6 py-20 md:py-24"
    >
      {/* Mesh gradient subtil */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(245, 180, 0,0.08), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="stats-heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="sr-only"
        >
          Chiffres clés FlipBook Pro
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative overflow-hidden rounded-2xl border border-primary/15 bg-card/40 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/70 md:p-7"
              >
                {/* Highlight haut */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <motion.div
                  initial={{ rotate: -8, scale: 0.7, opacity: 0 }}
                  whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08 + 0.15,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:border-primary/55"
                >
                  <Icon className="h-5 w-5 text-primary" />
                </motion.div>

                <div className="flex items-baseline gap-1">
                  {stat.prefix && (
                    <span className="text-xs text-muted-foreground/70">
                      {stat.prefix}
                    </span>
                  )}
                  <span className="font-display text-5xl font-bold leading-none tracking-tight text-foreground">
                    <CountUp
                      value={stat.value}
                      format={stat.format}
                      duration={1.6}
                    />
                  </span>
                  {stat.suffix && (
                    <span className="font-display text-2xl font-semibold text-primary">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <div className="mt-3 text-sm font-semibold text-foreground/85">
                  {stat.label}
                </div>
                <p className="mt-1 text-xs text-muted-foreground/80">
                  {stat.hint}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
