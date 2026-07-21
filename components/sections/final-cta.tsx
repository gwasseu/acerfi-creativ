"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FinalCta() {
  return (
    <section className="relative w-full px-6 py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(245, 180, 0,0.12), transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/[0.08] via-card/60 to-card/40 p-10 text-center backdrop-blur md:p-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(245, 180, 0,0.5), transparent)",
          }}
        />

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Prêt à passer à la vitesse supérieure
          </span>
        </div>

        <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
          On parle de{" "}
          <span className="gradient-gold">ton projet</span>{" "}?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
          Brief gratuit en visio ou WhatsApp. On te dit en 30 minutes ce qu&apos;on
          peut faire, à quel prix, en combien de jours. Sans baratin.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "group bg-gradient-gold text-black shadow-[0_8px_30px_rgba(245, 180, 0,0.4)] hover:scale-105 hover:bg-gradient-gold",
            )}
          >
            Demander un brief gratuit
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/services"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-primary/30 text-foreground hover:border-primary/60 hover:bg-primary/[0.08]",
            )}
          >
            Voir nos services
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
