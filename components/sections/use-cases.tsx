"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Building,
  GraduationCap,
  ShoppingBag,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Sector = {
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  accent: string;
  size: "hero" | "tall" | "default";
};

const SECTORS: Sector[] = [
  {
    icon: UtensilsCrossed,
    title: "Restaurants & Hôtels",
    tagline: "Menu vivant",
    description:
      "Un QR Code sur la table, et tes clients feuillettent ta carte sur leur téléphone. Photos plein écran, mises à jour instantanées, plats du jour en temps réel.",
    image: "/images/sectors/restaurant.jpg",
    imageAlt:
      "Restaurant haut de gamme avec architecture en lattes de bois et éclairage intimiste",
    accent: "#EF4444",
    size: "hero",
  },
  {
    icon: ShoppingBag,
    title: "Boutiques & Commerce",
    tagline: "Vitrine 24/7",
    description:
      "Catalogue produits accessible partout. Plus jamais de réimpression à chaque changement de prix.",
    image: "/images/sectors/boutique.jpg",
    imageAlt: "Boutique de vêtements avec mise en scène éditoriale",
    accent: "#8B5CF6",
    size: "tall",
  },
  {
    icon: GraduationCap,
    title: "Écoles & Formations",
    tagline: "Diffusion virale",
    description:
      "Brochures partageables sur WhatsApp par les parents eux-mêmes. Plus de visibilité, plus de demandes.",
    image: "/images/sectors/ecole.jpg",
    imageAlt: "Salle de classe moderne",
    accent: "#3B82F6",
    size: "default",
  },
  {
    icon: Building,
    title: "Immobilier & Services",
    tagline: "Portfolio premium",
    description:
      "Books de programmes, plans, visites virtuelles. Comparer, partager, contacter — tout en un seul lien.",
    image: "/images/sectors/immobilier.jpg",
    imageAlt: "Immeuble moderne en perspective",
    accent: "#10B981",
    size: "default",
  },
];

export function UseCases() {
  return (
    <section
      id="secteurs"
      className="relative w-full px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Nos terrains de jeu
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Pour les marques qui{" "}
            <span className="gradient-gold">refusent l&apos;ordinaire</span>
          </h2>
          <p className="mt-6 text-balance text-base text-muted-foreground md:text-lg">
            Quel que soit ton secteur, FlipBook Pro s&apos;adapte à ton image
            et révèle ton ambition.
          </p>
        </motion.div>

        {/* Bento asymétrique */}
        <div className="mt-16 grid gap-4 md:gap-5 lg:grid-cols-3 lg:grid-rows-2 lg:[grid-template-areas:'hero_hero_tall''hero_hero_tall'] xl:grid-cols-4 xl:[grid-template-areas:'hero_hero_tall_default-1''hero_hero_default-2_default-1']">
          {SECTORS.map((sector, idx) => (
            <SectorCard
              key={sector.title}
              sector={sector}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectorCard({
  sector,
  index,
}: {
  sector: Sector;
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
      {/* Photo de fond */}
      <Image
        src={sector.image}
        alt={sector.imageAlt}
        fill
        sizes={
          isHero
            ? "(min-width:1280px) 50vw, (min-width:1024px) 66vw, 100vw"
            : isTall
              ? "(min-width:1280px) 25vw, (min-width:1024px) 33vw, 100vw"
              : "(min-width:1280px) 25vw, (min-width:1024px) 33vw, 100vw"
        }
        className="absolute inset-0 -z-10 object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        priority={isHero}
      />

      {/* Overlay sombre + accent au hover */}
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

      {/* Bordure animée au hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, var(--accent), transparent)`,
        }}
      />

      {/* Contenu */}
      <div
        className={cn(
          "relative flex h-full flex-col justify-between p-6 md:p-8",
          isHero && "lg:p-10",
        )}
      >
        {/* Top : icon + tagline */}
        <div className="flex items-start justify-between">
          <motion.div
            initial={{ scale: 0.7, rotate: -10, opacity: 0 }}
            whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.08 + 0.2,
              ease: [0.34, 1.56, 0.64, 1],
            }}
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
              className={cn(
                "transition-transform duration-300 group-hover:scale-110",
                isHero ? "h-6 w-6" : "h-5 w-5",
              )}
              style={{ color: sector.accent }}
            />
          </motion.div>

          <span
            className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur-md"
            style={{ color: sector.accent }}
          >
            {sector.tagline}
          </span>
        </div>

        {/* Bottom : titre + description */}
        <div className="mt-6">
          <h3
            className={cn(
              "font-display font-bold leading-[1.05] tracking-tight text-white",
              isHero
                ? "text-3xl md:text-4xl lg:text-5xl"
                : "text-xl md:text-2xl",
            )}
          >
            {sector.title}
          </h3>
          <p
            className={cn(
              "mt-3 leading-relaxed text-white/75",
              isHero ? "max-w-md text-base md:text-lg" : "text-sm",
            )}
          >
            {sector.description}
          </p>

          {isHero && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition-transform duration-300 group-hover:translate-x-1"
            >
              <span>Voir un exemple</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ color: sector.accent }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
