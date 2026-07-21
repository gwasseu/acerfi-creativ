"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Eye,
  Layout,
  Megaphone,
  Package,
  Palette,
  Wand2,
  type LucideIcon,
} from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
};

const SERVICES: Service[] = [
  {
    icon: Eye,
    title: "Identité Visuelle",
    description:
      "Logo, charte graphique, brand guidelines. La signature qui rend ta marque reconnaissable au premier coup d'œil.",
  },
  {
    icon: Palette,
    title: "Design Graphique",
    description:
      "Print, digital, réseaux sociaux, signalétique. Tous tes supports déclinés avec exigence et cohérence.",
    image: "/images/services/branding.jpg",
    imageAlt:
      "Bureau de designer avec tablette et iMac affichant les outils Adobe",
  },
  {
    icon: Layout,
    title: "UI/UX Design",
    description:
      "Interfaces intuitives, design systems, prototypes. Pensé pour tes utilisateurs, livré aux développeurs.",
  },
  {
    icon: Package,
    title: "Packaging",
    description:
      "Emballages, design produit, PLV. L'expérience de ta marque, prise en main par le client.",
  },
  {
    icon: Wand2,
    title: "Direction Artistique",
    description:
      "Campagnes, événements, shootings. Une vision, déclinée dans chaque image, chaque détail.",
    image: "/images/services/caravane.jpg",
    imageAlt: "Caravane brandée pour campagne marketing",
  },
  {
    icon: Megaphone,
    title: "Branding Digital",
    description:
      "Sites web, landing pages, stratégie digitale. Ta marque, partout où tes clients te cherchent.",
    image: "/images/services/street-marketing.jpg",
    imageAlt: "Activation street-marketing en milieu urbain",
  },
];

export function Services() {
  return (
    <section id="services" className="relative w-full px-6 py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/[0.015] to-transparent"
      />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
            <Palette className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Studio design & branding
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Au-delà de FlipBook,{" "}
            <span className="gradient-gold">une agence créative complète</span>
          </h2>
          <p className="mt-6 text-balance text-base text-muted-foreground md:text-lg">
            ACERFI Créativ accompagne les marques africaines de
            l&apos;identité à l&apos;activation digitale.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, idx) => (
            <ServiceCard key={service.title} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const Icon = service.icon;
  const hasImage = Boolean(service.image);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: idx_to_delay(index),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={
        hasImage
          ? "group relative h-full min-h-[340px] overflow-hidden rounded-2xl border border-white/[0.06] transition-all duration-500 hover:border-primary/45 hover:shadow-[0_24px_70px_-20px_rgba(245, 180, 0,0.4)]"
          : "group relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-primary/15 bg-card/50 transition-all duration-500 hover:-translate-y-1 hover:border-primary/45 hover:bg-card/80 hover:shadow-[0_20px_60px_-20px_rgba(245, 180, 0,0.4)]"
      }
    >
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
              background:
                "linear-gradient(135deg, rgba(245, 180, 0,0.25) 0%, transparent 65%)",
            }}
          />
        </>
      )}

      {!hasImage && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:from-primary/[0.06] group-hover:to-transparent group-hover:opacity-100"
        />
      )}

      <div className="relative flex h-full flex-col justify-between p-7">
        <motion.div
          initial={{ scale: 0.65, rotate: -12, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.6,
            delay: idx_to_delay(index) + 0.15,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className={
            hasImage
              ? "inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/40 bg-primary/15 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:border-primary/70"
              : "inline-flex h-12 w-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:border-primary/60 group-hover:bg-primary/20"
          }
        >
          <Icon className="h-5 w-5 text-primary" />
        </motion.div>

        <div className="mt-6">
          <h3
            className={
              hasImage
                ? "font-display text-2xl font-semibold text-white transition-colors duration-300"
                : "font-display text-xl font-semibold transition-colors duration-300 group-hover:text-primary"
            }
          >
            {service.title}
          </h3>
          <p
            className={
              hasImage
                ? "mt-2 text-sm leading-relaxed text-white/80"
                : "mt-2 text-sm leading-relaxed text-muted-foreground"
            }
          >
            {service.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

function idx_to_delay(i: number) {
  return i * 0.07;
}
