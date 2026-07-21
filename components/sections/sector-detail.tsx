"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SECTOR_BY_SLUG } from "@/content/sectors";
import { SERVICE_BY_SLUG } from "@/content/services";

type Props = {
  slug: string;
};

export function SectorDetail({ slug }: Props) {
  const sector = SECTOR_BY_SLUG[slug];
  if (!sector) return null;
  const recommendedServices = sector.recommendedServices
    .map((s) => SERVICE_BY_SLUG[s])
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const Icon = sector.icon;
  const accent = sector.accent;

  return (
    <article
      className="relative w-full"
      style={{ ["--accent" as string]: accent } as React.CSSProperties}
    >
      {/* HERO avec image en bandeau */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[60vh] min-h-[480px] w-full">
          <Image
            src={sector.image}
            alt={sector.imageAlt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 70% 50% at 50% 50%, ${accent}26, transparent 70%)`,
            }}
          />

          <div className="absolute inset-0 flex items-end px-6 pb-16 md:pb-20">
            <div className="mx-auto w-full max-w-6xl">
              <motion.nav
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                aria-label="Fil d'Ariane"
                className="mb-6 flex items-center gap-1.5 text-xs text-white/60"
              >
                <Link href="/" className="hover:text-white transition-colors">
                  Accueil
                </Link>
                <span>/</span>
                <Link
                  href="/secteurs"
                  className="hover:text-white transition-colors"
                >
                  Secteurs
                </Link>
                <span>/</span>
                <span className="text-white/90">{sector.name}</span>
              </motion.nav>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur"
                style={{
                  borderColor: `${accent}50`,
                  background: `${accent}1f`,
                }}
              >
                <Icon className="h-3.5 w-3.5" style={{ color: accent }} />
                <span
                  className="text-xs font-semibold uppercase tracking-[0.18em]"
                  style={{ color: accent }}
                >
                  {sector.tagline}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl"
              >
                {sector.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 max-w-2xl text-balance text-base text-white/80 md:text-lg"
              >
                {sector.longDescription}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLÈMES */}
      <section className="relative w-full px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-red-400/80">
                Ce qu&apos;on entend tout le temps
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                Les vrais problèmes
              </h2>
            </div>
          </Reveal>

          <ul className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2">
            {sector.problems.map((problem, idx) => (
              <Reveal key={problem} delay={idx * 0.05}>
                <li className="flex items-start gap-3 rounded-xl border border-red-500/15 bg-red-950/10 p-5">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400/70" />
                  <span className="text-sm leading-relaxed text-foreground/85">
                    {problem}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="relative w-full px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span
                className="text-xs font-semibold uppercase tracking-[0.22em]"
                style={{ color: accent }}
              >
                Notre approche
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                Comment on règle ça
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {sector.solutions.map((solution, idx) => (
              <Reveal key={solution.title} delay={idx * 0.08}>
                <article
                  className="group relative h-full overflow-hidden rounded-2xl border p-7 transition-all duration-500 hover:-translate-y-1"
                  style={{
                    borderColor: `${accent}20`,
                    background: `linear-gradient(160deg, ${accent}0a, transparent)`,
                  }}
                >
                  <CheckCircle2
                    className="h-7 w-7 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: accent }}
                  />
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                    {solution.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {solution.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES RECOMMANDÉS */}
      {recommendedServices.length > 0 && (
        <section className="relative w-full px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Pack recommandé
                  </span>
                </div>
                <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                  Les produits qu&apos;on conseille
                </h2>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {recommendedServices.map((service, idx) => {
                const ServiceIcon = service.icon;
                return (
                  <Reveal key={service.slug} delay={idx * 0.07}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group relative block h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-card/50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/80"
                    >
                      <div className="flex items-start justify-between">
                        <span
                          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                          style={{
                            background: `${service.accent}1f`,
                            borderColor: `${service.accent}40`,
                          }}
                        >
                          <ServiceIcon
                            className="h-5 w-5"
                            style={{ color: service.accent }}
                          />
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                      </div>
                      <h3 className="mt-5 font-display text-lg font-semibold transition-colors duration-300 group-hover:text-primary">
                        {service.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {service.shortDescription}
                      </p>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                        {service.priceLabel}
                      </p>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {sector.faq.length > 0 && (
        <section className="relative w-full px-6 py-20 md:py-24">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="text-center">
                <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                  Questions fréquentes
                </h2>
              </div>
            </Reveal>

            <div className="mt-12 space-y-3">
              {sector.faq.map((item, idx) => (
                <Reveal key={item.q} delay={idx * 0.05}>
                  <FaqItem q={item.q} a={item.a} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative w-full px-6 py-20 md:py-24">
        <Reveal>
          <div
            className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border-2 p-10 text-center backdrop-blur md:p-12"
            style={{
              borderColor: `${accent}45`,
              background: `linear-gradient(160deg, ${accent}10 0%, rgba(0,0,0,0.4) 100%)`,
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${accent}80, transparent)`,
              }}
            />
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Vous êtes dans le secteur{" "}
              <span style={{ color: accent }}>{sector.name.split(",")[0]}</span> ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
              Brief gratuit en 30 minutes pour évaluer ce que nous pouvons faire
              pour vous.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group bg-gradient-gold text-black shadow-[0_8px_30px_rgba(245, 180, 0,0.4)] hover:scale-105 hover:bg-gradient-gold",
                )}
              >
                Demander un brief
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-primary/30 hover:border-primary/60 hover:bg-primary/[0.08]",
                )}
              >
                Voir les services
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </article>
  );
}

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-card/40 transition-colors duration-300 hover:border-[var(--accent)]/30">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-base font-semibold text-foreground md:text-lg">
          {q}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
            open && "rotate-180 text-primary",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
