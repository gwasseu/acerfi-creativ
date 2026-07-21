"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { POLES, getServicesByPole, type Pole, type Service } from "@/content/services";

export function ServicesPriceTable() {
  return (
    <section className="relative w-full px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Catalogue · Tous les prix
          </span>
          <h2 className="mt-6 font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            Le catalogue par <span className="gradient-gold italic">pôle</span>
          </h2>
          <p className="mt-6 text-balance text-base text-muted-foreground md:text-lg">
            Tous les services packagés, organisés par pôle. Prix en FCFA,
            paiement Mobile Money, virement ou carte.
          </p>
        </motion.div>

        <div className="mt-14 space-y-12">
          {POLES.map((pole) => (
            <PoleTable key={pole.slug} pole={pole} />
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-muted-foreground/70">
          Acompte 30–50% à la commande, solde selon échéancier convenu. TVA non
          applicable, art. 293B.
        </p>
      </div>
    </section>
  );
}

function PoleTable({ pole }: { pole: Pole }) {
  const services = getServicesByPole(pole.slug);
  const Icon = pole.icon;

  return (
    <motion.section
      id={`tarifs-${pole.slug}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      style={{ ["--accent" as string]: pole.accent } as React.CSSProperties}
      className="scroll-mt-24"
    >
      <header className="mb-5 flex items-center gap-3">
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border"
          style={{
            background: `${pole.accent}1f`,
            borderColor: `${pole.accent}40`,
          }}
        >
          <Icon className="h-4 w-4" style={{ color: pole.accent }} />
        </span>
        <div>
          <h3 className="font-display text-xl font-bold leading-tight md:text-2xl">
            {pole.name}
          </h3>
          <p className="text-xs text-muted-foreground">{pole.tagline}</p>
        </div>
      </header>

      <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-card/40 backdrop-blur">
        <ul>
          {services.map((service, idx) => (
            <PriceRow key={service.slug} service={service} last={idx === services.length - 1} />
          ))}
        </ul>
      </div>
    </motion.section>
  );
}

function PriceRow({ service, last }: { service: Service; last: boolean }) {
  const Icon = service.icon;

  return (
    <li className={last ? "" : "border-b border-white/[0.04]"}>
      <Link
        href={`/services/${service.slug}`}
        data-cursor="link"
        data-cursor-label={service.name}
        className="group grid grid-cols-1 items-center gap-3 px-6 py-5 transition-colors duration-300 hover:bg-card/80 md:grid-cols-[1.5fr_0.8fr_1fr_auto] md:gap-4"
      >
        <div className="flex items-center gap-4">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
            style={{
              background: `${service.accent}1f`,
              borderColor: `${service.accent}40`,
            }}
          >
            <Icon className="h-4 w-4" style={{ color: service.accent }} />
          </span>
          <div className="min-w-0">
            <span className="block font-display text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-primary md:text-base">
              {service.name}
              {service.flagship && (
                <span
                  className="ml-2 align-middle text-[10px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: service.accent }}
                >
                  Phare
                </span>
              )}
            </span>
            <span className="mt-0.5 block truncate text-xs text-muted-foreground">
              {service.tagline}
            </span>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground md:text-sm">
          <Clock className="h-3 w-3 text-primary" />
          {service.delay}
        </span>

        <span className="font-display text-sm font-semibold text-foreground md:text-base">
          {service.priceLabel}
        </span>

        <span
          className="inline-flex items-center justify-end gap-1 text-xs font-semibold uppercase tracking-wider transition-transform duration-300 group-hover:translate-x-1"
          style={{ color: service.accent }}
        >
          Détail
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </Link>
    </li>
  );
}
