"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { POLES, getServicesByPole, type Service, type Pole } from "@/content/services";

export function ServicesGrid() {
  return (
    <section className="relative w-full px-6 py-12 md:py-16">
      <div className="mx-auto max-w-7xl space-y-20 md:space-y-28">
        {POLES.map((pole, idx) => (
          <PoleSection key={pole.slug} pole={pole} index={idx} />
        ))}
      </div>
    </section>
  );
}

function PoleSection({ pole, index }: { pole: Pole; index: number }) {
  const services = getServicesByPole(pole.slug);
  const indexStr = String(index + 1).padStart(3, "0");

  return (
    <section
      id={`pole-${pole.slug}`}
      style={{ ["--accent" as string]: pole.accent } as React.CSSProperties}
      className="scroll-mt-24"
    >
      {/* En-tête du pôle */}
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
      >
        <div className="flex items-baseline gap-4 md:gap-6">
          <span
            className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-none tracking-tighter"
            style={{
              color: "transparent",
              WebkitTextStroke: `1px ${pole.accent}80`,
            }}
          >
            {indexStr}
          </span>
          <div className="flex flex-col gap-2">
            <span
              className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: pole.accent }}
            >
              <span aria-hidden className="h-px w-10" style={{ background: pole.accent }} />
              <span>Pôle</span>
            </span>
            <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-5xl">
              {pole.name}
            </h2>
          </div>
        </div>
        <p className="max-w-md text-balance text-sm text-muted-foreground md:text-right md:text-base">
          {pole.description}
        </p>
      </motion.header>

      {/* Cards des services du pôle */}
      <div
        className={cn(
          "grid gap-5",
          services.length === 1 && "md:grid-cols-1",
          services.length === 2 && "md:grid-cols-2",
          services.length >= 3 && "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {services.map((service, sIdx) => (
          <ServiceGridCard key={service.slug} service={service} index={sIdx} />
        ))}
      </div>
    </section>
  );
}

function ServiceGridCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const hasImage = Boolean(service.image);
  const hasDetail = Boolean(service.problem || service.deliverables);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ ["--accent" as string]: service.accent } as React.CSSProperties}
      className={cn(
        "group relative h-full min-h-[320px] overflow-hidden rounded-2xl border transition-all duration-500",
        hasImage
          ? "border-white/[0.06] hover:border-[var(--accent)]/45 hover:shadow-[0_24px_70px_-20px_var(--accent)]/40"
          : "border-white/[0.06] bg-card/50 hover:-translate-y-1 hover:border-[var(--accent)]/45 hover:bg-card/80 hover:shadow-[0_20px_60px_-20px_var(--accent)]/40",
      )}
    >
      <Link
        href={`/services/${service.slug}`}
        data-cursor="link"
        data-cursor-label={service.name}
        className="absolute inset-0 z-10"
        aria-label={`Découvrir ${service.name}`}
      />

      {hasImage && service.image && service.imageAlt && (
        <>
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="absolute inset-0 -z-10 object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-t from-black/95 via-black/65 to-black/30"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `linear-gradient(135deg, ${service.accent}25 0%, transparent 65%)`,
            }}
          />
        </>
      )}

      <div className="relative flex h-full flex-col justify-between p-7">
        <div className="flex items-start justify-between gap-3">
          <span
            className={cn(
              "inline-flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-6",
              hasImage ? "backdrop-blur-md" : "",
            )}
            style={{
              background: `${service.accent}1f`,
              borderColor: `${service.accent}40`,
            }}
          >
            <Icon className="h-5 w-5" style={{ color: service.accent }} />
          </span>
          {service.flagship && (
            <span
              className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-md"
              style={{
                borderColor: `${service.accent}45`,
                background: `${service.accent}18`,
                color: service.accent,
              }}
              aria-label="Service phare"
            >
              ★ Phare
            </span>
          )}
        </div>

        <div className="mt-6">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em]",
              hasImage ? "text-white/70" : "text-muted-foreground",
            )}
          >
            <Clock className="h-3 w-3" />
            {service.delay}
          </span>
          <h3
            className={cn(
              "mt-2 font-display text-xl font-semibold transition-colors duration-300 md:text-2xl",
              hasImage ? "text-white" : "text-foreground group-hover:text-primary",
            )}
          >
            {service.name}
          </h3>
          <p
            className={cn(
              "mt-2 line-clamp-3 text-sm leading-relaxed",
              hasImage ? "text-white/80" : "text-muted-foreground",
            )}
          >
            {service.shortDescription}
          </p>
          <div className="mt-5 flex items-end justify-between gap-2">
            <span
              className={cn(
                "font-display text-base font-semibold leading-tight",
                hasImage ? "text-white" : "text-foreground",
              )}
            >
              {service.priceLabel}
            </span>
            <span
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: service.accent }}
            >
              {hasDetail ? "Détails" : "Devis"}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
