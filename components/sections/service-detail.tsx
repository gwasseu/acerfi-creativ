"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  CheckCircle2,
  Clock,
  Quote,
  Tag,
} from "lucide-react";
import dynamic from "next/dynamic";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ACERFI } from "@/lib/acerfi";
import { SERVICE_BY_SLUG, getRelatedServices, type Service } from "@/content/services";

const FlippingBook = dynamic(
  () => import("@/components/ui/flipping-book").then((m) => m.FlippingBook),
  {
    ssr: false,
    loading: () => <div className="h-[480px] w-[340px]" aria-hidden />,
  },
);

type Props = {
  slug: string;
};

export function ServiceDetail({ slug }: Props) {
  const service = SERVICE_BY_SLUG[slug];
  if (!service) return null;
  const related = getRelatedServices(slug);
  const Icon = service.icon;
  const accent = service.accent;

  return (
    <article
      className="relative w-full"
      style={{ ["--accent" as string]: accent } as React.CSSProperties}
    >
      {/* HERO */}
      <section className="relative w-full overflow-hidden px-6 pb-16 pt-32 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${accent}26, transparent 70%)`,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(ellipse 80% 50% at 50% 0%, black 30%, transparent 100%)",
          }}
        />

        <div className="mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            aria-label="Fil d'Ariane"
            className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-foreground/80">{service.name}</span>
          </motion.nav>

          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur"
                style={{
                  borderColor: `${accent}40`,
                  background: `${accent}14`,
                }}
              >
                <Icon className="h-3.5 w-3.5" style={{ color: accent }} />
                <span
                  className="text-xs font-semibold uppercase tracking-[0.18em]"
                  style={{ color: accent }}
                >
                  {service.badge}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
              >
                {service.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-4 font-display text-2xl font-light text-foreground/80 md:text-3xl"
              >
                {service.tagline}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.26 }}
                className="mt-6 max-w-xl text-balance text-base text-muted-foreground md:text-lg"
              >
                {service.longDescription}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.34 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-card/50 px-4 py-2 text-sm">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  <span className="text-muted-foreground">Délai</span>
                  <span className="font-semibold text-foreground">{service.delay}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-card/50 px-4 py-2 text-sm">
                  <Tag className="h-3.5 w-3.5 text-primary" />
                  <span className="text-muted-foreground">Prix</span>
                  <span className="font-semibold text-foreground">
                    {service.priceLabel}
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.42 }}
                className="mt-10 flex flex-col items-start gap-4 sm:flex-row"
              >
                <Link
                  href={`/contact?service=${service.slug}`}
                  data-cursor="link"
                  data-cursor-label="Briefer →"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "group bg-gradient-gold text-black shadow-[0_8px_30px_rgba(245, 180, 0,0.4)] hover:scale-105 hover:bg-gradient-gold",
                  )}
                >
                  Démarrer ce produit
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a
                  href={`${ACERFI.contact.whatsapp}?text=${encodeURIComponent(
                    `Bonjour, je suis intéressé par ${service.name}.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  data-cursor-label="WhatsApp"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-primary/30 hover:border-primary/60 hover:bg-primary/[0.08]",
                  )}
                >
                  Discuter sur WhatsApp
                </a>
              </motion.div>
            </div>

            {/* Visuel hero : FlippingBook pour FlipBook Pro, image, sinon icon géant */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              {service.slug === "flipbook-pro" ? (
                <div className="motion-safe:animate-[float_5s_ease-in-out_infinite]">
                  <FlippingBook />
                </div>
              ) : service.image ? (
                <div
                  className="relative h-80 w-80 overflow-hidden rounded-3xl border-2"
                  style={{ borderColor: `${accent}40` }}
                >
                  <Image
                    src={service.image}
                    alt={service.imageAlt ?? service.name}
                    fill
                    sizes="320px"
                    className="object-cover"
                    priority
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${accent}30 0%, transparent 60%)`,
                    }}
                  />
                </div>
              ) : (
                <div
                  className="flex h-80 w-80 items-center justify-center rounded-3xl border-2 backdrop-blur"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${accent}30, ${accent}05)`,
                    borderColor: `${accent}40`,
                  }}
                >
                  <Icon className="h-32 w-32" style={{ color: accent }} />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROBLÈME → SOLUTION (rendu seulement si présent) */}
      {service.problem && service.solution && (
        <section className="relative w-full px-6 py-20 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-red-500/15 bg-red-950/10 p-8">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-red-400/80">
                  Le problème
                </span>
                <p className="mt-4 text-lg leading-relaxed text-foreground/85">
                  {service.problem}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div
                className="h-full rounded-2xl border p-8"
                style={{
                  borderColor: `${accent}30`,
                  background: `linear-gradient(160deg, ${accent}14, transparent)`,
                }}
              >
                <span
                  className="text-xs font-semibold uppercase tracking-[0.22em]"
                  style={{ color: accent }}
                >
                  Notre solution
                </span>
                <p className="mt-4 text-lg leading-relaxed text-foreground/85">
                  {service.solution}
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* DELIVERABLES (rendu seulement si présents) */}
      {service.deliverables && service.deliverables.length > 0 && (
      <section className="relative w-full px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                Ce qui est livré
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Vous savez exactement ce que vous recevez. Pas de surprise, pas
                d&apos;upsell caché.
              </p>
            </div>
          </Reveal>

          <ul className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2">
            {service.deliverables.map((deliverable, idx) => (
              <Reveal key={deliverable} delay={idx * 0.05}>
                <li
                  className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-card/50 p-4 transition-colors duration-300 hover:border-[var(--accent)]/30"
                >
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: `${accent}20`,
                      borderColor: `${accent}40`,
                    }}
                  >
                    <CheckCircle2 className="h-4 w-4" style={{ color: accent }} />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground/85">
                    {deliverable}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      )}

      {/* PROCESS (rendu seulement si présent) */}
      {service.steps && service.steps.length > 0 && (
      <section className="relative w-full px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                Comment ça se passe
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Un process clair, étape par étape. Vous savez quand vous recevez quoi.
              </p>
            </div>
          </Reveal>

          <ol className="relative mx-auto mt-14 max-w-3xl space-y-6">
            <span
              aria-hidden
              className="absolute left-[19px] top-2 bottom-2 w-px"
              style={{
                background: `linear-gradient(to bottom, transparent, ${accent}40, transparent)`,
              }}
            />
            {service.steps.map((step, idx) => (
              <Reveal key={step.day} delay={idx * 0.07}>
                <li className="relative flex gap-5 pl-1">
                  <div
                    className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 font-display text-sm font-bold"
                    style={{
                      background: `${accent}1a`,
                      borderColor: `${accent}60`,
                      color: accent,
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1 rounded-xl border border-white/[0.06] bg-card/50 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-display text-lg font-semibold">
                        {step.title}
                      </h3>
                      <span
                        className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
                        style={{
                          background: `${accent}14`,
                          borderColor: `${accent}30`,
                          color: accent,
                        }}
                      >
                        {step.day}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      )}

      {/* SHOWCASES — affiché uniquement si on a de vrais cas */}
      {service.showcases && service.showcases.length > 0 && (
        <section className="relative w-full px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                  Cas concrets
                </h2>
                <p className="mt-4 text-base text-muted-foreground">
                  Voici comment ça a marché ailleurs.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {service.showcases.map((showcase, idx) => (
                <Reveal key={showcase.title} delay={idx * 0.08}>
                  <article className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-card/50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--accent)]/40">
                    <Quote
                      className="h-7 w-7 opacity-30 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ color: accent }}
                    />
                    <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                      {showcase.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {showcase.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PRICING CARD */}
      <section className="relative w-full px-6 py-20 md:py-24">
        <Reveal>
          <div
            className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border-2 p-10 backdrop-blur md:p-12"
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

            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <span
                  className="text-xs font-semibold uppercase tracking-[0.22em]"
                  style={{ color: accent }}
                >
                  {service.badge}
                </span>
                <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
                  {service.priceLabel}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Tout est inclus. Aucun frais caché. Paiement Mobile Money,
                  virement ou carte.
                </p>
              </div>
              <Link
                href={`/contact?service=${service.slug}`}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group shrink-0 bg-gradient-gold text-black shadow-[0_8px_30px_rgba(245, 180, 0,0.4)] hover:scale-105 hover:bg-gradient-gold",
                )}
              >
                Démarrer maintenant
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ (rendu seulement si présente) */}
      {service.faq && service.faq.length > 0 && (
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
              {service.faq.map((item, idx) => (
                <Reveal key={item.q} delay={idx * 0.05}>
                  <FaqItem q={item.q} a={item.a} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED + CTA */}
      {related.length > 0 && (
        <section className="relative w-full px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                  À combiner avec
                </h2>
                <p className="mt-4 text-base text-muted-foreground">
                  Ces produits se complètent bien.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {related.map((rel, idx) => (
                <RelatedCard key={rel.slug} service={rel} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}
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

function RelatedCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
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
            <Icon className="h-5 w-5" style={{ color: service.accent }} />
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
    </motion.div>
  );
}
