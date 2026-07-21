"use client";

import { motion } from "framer-motion";
import { POLES } from "@/content/services";

export function PoleNav() {
  return (
    <nav
      aria-label="Navigation rapide entre les pôles"
      className="sticky top-20 z-30 w-full border-y border-white/[0.06] bg-background/80 px-4 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl">
        <ul className="scrollbar-hide flex gap-2 overflow-x-auto py-3">
          {POLES.map((pole, idx) => {
            const Icon = pole.icon;
            return (
              <li key={pole.slug} className="shrink-0">
                <motion.a
                  href={`#pole-${pole.slug}`}
                  data-cursor="link"
                  data-cursor-label={pole.name}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 350, damping: 18 }}
                  style={
                    {
                      ["--accent" as string]: pole.accent,
                    } as React.CSSProperties
                  }
                  className="group inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-card/50 px-4 py-2 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-[var(--accent)]/45 hover:text-foreground"
                >
                  <span
                    className="font-display text-[10px] font-bold tracking-tighter"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: `1px ${pole.accent}80`,
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <Icon className="h-3.5 w-3.5" style={{ color: pole.accent }} />
                  <span className="whitespace-nowrap">{pole.name}</span>
                </motion.a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
