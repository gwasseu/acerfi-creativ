"use client";

import { motion } from "framer-motion";
import { Award, Users, Zap, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ACERFI } from "@/lib/acerfi";

const ICONS: LucideIcon[] = [Award, Users, Zap, MapPin];

export function TrustBadges() {
  return (
    <section
      aria-label="Chiffres clés ACERFI"
      className="relative w-full border-y border-primary/10 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent px-6 py-12 md:py-16"
    >
      <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.03] sm:grid-cols-2 lg:grid-cols-4">
        {ACERFI.trustBadges.map((badge, idx) => {
          const Icon = ICONS[idx] ?? Award;
          return (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="group relative flex flex-col gap-2 bg-background/60 p-6 transition-colors duration-500 hover:bg-primary/[0.04] md:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <Icon className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
              <span className="font-display text-2xl font-bold leading-none tracking-tight text-foreground md:text-3xl">
                {badge.value}
              </span>
              <span className="text-xs leading-relaxed text-muted-foreground">
                {badge.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
