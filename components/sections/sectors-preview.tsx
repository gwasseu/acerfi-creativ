"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SECTORS, type Sector } from "@/content/sectors";
import { Chapter } from "@/components/ui/chapter";

const LAYOUT: Array<{ slug: string; size: "hero" | "tall" | "default" }> = [
  { slug: "restaurants-hotels", size: "hero" },
  { slug: "boutiques-retail", size: "tall" },
  { slug: "ecoles-formations", size: "default" },
  { slug: "immobilier", size: "default" },
];

export function SectorsPreview() {
  const ordered: Array<Sector & { size: "hero" | "tall" | "default" }> = LAYOUT
    .map(({ slug, size }) => {
      const sector = SECTORS.find((s) => s.slug === slug);
      return sector ? { ...sector, size } : null;
    })
    .filter((s): s is Sector & { size: "hero" | "tall" | "default" } => Boolean(s));

  return (
    <section className="relative w-full px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Chapter index="002" label="Secteurs" />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="font-display text-[clamp(2.4rem,6vw,5.5rem)] font-light leading-[1.02] tracking-tight"
          >
            <span className="block">Pour ceux qui</span>
            <span className="gradient-gold italic">refusent l&apos;ordinaire.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-md text-balance text-base text-muted-foreground md:text-lg lg:justify-self-end lg:text-right"
          >
            On a packagé des solutions sectorielles. Choisis ton terrain, on a
            déjà les bonnes idées.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-4 md:gap-5 lg:grid-cols-3 lg:grid-rows-2 lg:[grid-template-areas:'hero_hero_tall''hero_hero_tall'] xl:grid-cols-4 xl:[grid-template-areas:'hero_hero_tall_default-1''hero_hero_default-2_default-1']">
          {ordered.map((sector, idx) => (
            <SectorCard key={sector.slug} sector={sector} index={idx} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/secteurs"
            className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.06] px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/60 hover:bg-primary/[0.12]"
          >
            Voir tous les secteurs et solutions
            <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function SectorCard({
  sector,
  index,
}: {
  sector: Sector & { size: "hero" | "tall" | "default" };
  index: number;
}) {
  const Icon = sector.icon;
  const isHero = sector.size === "hero";
  const isTall = sector.size === "tall";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={
        {
          gridArea:
            sector.size === "hero"
              ? "hero"
              : sector.size === "tall"
                ? "tall"
                : index === 2
                  ? "default-1"
                  : "default-2",
          ["--accent" as string]: sector.accent,
        } as React.CSSProperties
      }
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-card",
        "transition-all duration-500 hover:border-[var(--accent)]/40",
        "hover:shadow-[0_30px_80px_-20px_var(--accent)]/30",
        isHero && "min-h-[420px] lg:min-h-[600px]",
        isTall && "min-h-[400px] lg:row-span-2",
        !isHero && !isTall && "min-h-[280px]",
      )}
    >
      <Link
        href={`/secteurs/${sector.slug}`}
        data-cursor="media"
        data-cursor-label={sector.name.split(",")[0]}
        className="absolute inset-0 z-10"
        aria-label={`Découvrir le secteur ${sector.name}`}
      />

      <Image
        src={sector.image}
        alt={sector.imageAlt}
        fill
        sizes={
          isHero
            ? "(min-width:1280px) 50vw, (min-width:1024px) 66vw, 100vw"
            : "(min-width:1280px) 25vw, (min-width:1024px) 33vw, 100vw"
        }
        className="absolute inset-0 -z-10 object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        priority={isHero}
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/95 via-black/60 to-black/30 transition-opacity duration-500"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${sector.accent}25 0%, transparent 60%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, var(--accent), transparent)`,
        }}
      />

      <div
        className={cn(
          "relative flex h-full flex-col justify-between p-6 md:p-8",
          isHero && "lg:p-10",
        )}
      >
        <div className="flex items-start justify-between">
          <span
            className={cn(
              "inline-flex items-center justify-center rounded-xl border backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
              isHero ? "h-14 w-14" : "h-12 w-12",
            )}
            style={{
              background: `${sector.accent}1f`,
              borderColor: `${sector.accent}40`,
            }}
          >
            <Icon
              className={cn(isHero ? "h-6 w-6" : "h-5 w-5")}
              style={{ color: sector.accent }}
            />
          </span>

          <span
            className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur-md"
            style={{ color: sector.accent }}
          >
            {sector.tagline}
          </span>
        </div>

        <div className="mt-6">
          <h3
            className={cn(
              "font-display font-bold leading-[1.05] tracking-tight text-white",
              isHero ? "text-3xl md:text-4xl lg:text-5xl" : "text-xl md:text-2xl",
            )}
          >
            {sector.name}
          </h3>
          <p
            className={cn(
              "mt-3 leading-relaxed text-white/75",
              isHero ? "max-w-md text-base md:text-lg" : "text-sm",
            )}
          >
            {sector.shortDescription}
          </p>

          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">
            <span>Voir les solutions</span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ color: sector.accent }}
            />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
