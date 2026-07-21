"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { getFlagshipServices, type Service } from "@/content/services";
import { Chapter } from "@/components/ui/chapter";

export function ServicesPreview() {
  const featured = getFlagshipServices().slice(0, 6);

  return (
    <section className="relative w-full px-6 py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/[0.015] to-transparent"
      />

      <div className="mx-auto max-w-7xl">
        <Chapter index="001" label="Services" />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="font-display text-[clamp(2.4rem,6vw,5.5rem)] font-light leading-[1.02] tracking-tight"
          >
            <span className="block">Six pôles, une promesse :</span>
            <span className="gradient-gold italic">la performance.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-md text-balance text-base text-muted-foreground md:text-lg lg:justify-self-end lg:text-right"
          >
            Voici nos services <span className="text-foreground">phares</span> —
            ceux qu&apos;on déploie le plus souvent, parce qu&apos;ils marchent.
            Le catalogue complet (30+ services en 6 pôles) est à un clic.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service, idx) => (
            <ServicePreviewCard key={service.slug} service={service} index={idx} />
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
            href="/services"
            data-cursor="link"
            data-cursor-label="Catalogue"
            className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.06] px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/60 hover:bg-primary/[0.12]"
          >
            Voir le catalogue complet (30+ services)
            <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ServicePreviewCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const hasImage = Boolean(service.image);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ ["--accent" as string]: service.accent } as React.CSSProperties}
      className={cn(
        "group relative h-full min-h-[300px] overflow-hidden rounded-2xl border transition-all duration-500",
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
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]",
              hasImage
                ? "border-white/20 bg-black/40 text-primary backdrop-blur-md"
                : "border-primary/25 bg-primary/[0.08] text-primary",
            )}
          >
            Phare
          </span>
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
          <div className="mt-5 flex items-end justify-between">
            <span
              className={cn(
                "font-display text-base font-semibold",
                hasImage ? "text-white" : "text-foreground",
              )}
            >
              {service.priceLabel}
            </span>
            <span
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: service.accent }}
            >
              Détails
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
