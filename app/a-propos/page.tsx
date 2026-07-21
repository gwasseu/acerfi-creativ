import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Award,
  Brain,
  Compass,
  GraduationCap,
  Layers,
  Palette,
  Shield,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { FinalCta } from "@/components/sections/final-cta";
import { PageHero } from "@/components/sections/page-hero";
import { ACERFI } from "@/lib/acerfi";

export const metadata: Metadata = {
  title: `À propos — ${ACERFI.creativ.tagline}`,
  description: `${ACERFI.creativ.description} Pôle créatif & marketing du Groupe ACERFI fondé en ${ACERFI.group.foundedYear} par ${ACERFI.group.founderName}.`,
};

const VALUES_ICONS: Record<string, typeof Compass> = {
  Excellence: Award,
  Innovation: Zap,
  Engagement: Target,
  Souveraineté: Shield,
};

const ECOSYSTEM_ICONS = {
  creativ: Palette,
  formation: GraduationCap,
  maya: Brain,
  "tw-micronics": Layers,
} as const;

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative flex min-h-screen flex-col">
        <PageHero
          eyebrow={`${ACERFI.creativ.name} · ${ACERFI.creativ.positioning}`}
          title={
            <>
              {ACERFI.creativ.tagline.split(" Augmentée par l'IA")[0]}{" "}
              <span className="gradient-gold italic">
                Augmentée par l&apos;IA
              </span>
            </>
          }
          description={ACERFI.creativ.subtitle}
        />

        {/* Notre histoire — réalité 1995 + TW Micronics */}
        <section className="relative w-full px-6 py-20 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Notre histoire
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl">
                <span className="text-foreground/55">30+ ans d&apos;expertise.</span>
                <br />
                <span>Une décennie d&apos;avance sur l&apos;IA.</span>
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Tout commence en{" "}
                  <span className="text-foreground">
                    {ACERFI.group.parentCompany.since}
                  </span>{" "}
                  avec{" "}
                  <span className="text-foreground">
                    {ACERFI.group.parentCompany.name}
                  </span>
                  ,{" "}
                  <span className="text-foreground italic">
                    {ACERFI.group.parentCompany.certification}
                  </span>{" "}
                  — pôle technologique fondateur.
                </p>
                <p>
                  En{" "}
                  <span className="text-foreground">
                    {ACERFI.group.foundedYear}
                  </span>
                  ,{" "}
                  <span className="text-foreground">
                    {ACERFI.group.founderName}
                  </span>{" "}
                  fonde le{" "}
                  <span className="text-foreground">
                    {ACERFI.group.legalName}
                  </span>{" "}
                  à Yaoundé. Pendant 3 décennies, le groupe développe une
                  expertise unique en formation tech, marketing digital et
                  création visuelle.
                </p>
                <p>
                  En <span className="text-foreground">2025</span>, ACERFI lance{" "}
                  <Link
                    href="https://maya.acerfi.net"
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    MAYA Enterprise
                  </Link>
                  , la première plateforme d&apos;agents IA autonomes pour
                  l&apos;Afrique.
                </p>
                <p>
                  En{" "}
                  <span className="text-foreground italic">
                    {new Date().getFullYear()}
                  </span>
                  , <span className="text-foreground">ACERFI Créativ</span>{" "}
                  devient le <span className="text-foreground italic">{ACERFI.creativ.positioning.toLowerCase()}</span>,
                  laboratoire d&apos;innovation marketing le plus avancé
                  d&apos;Afrique centrale.
                </p>
              </div>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/[0.06]">
              <Image
                src="/photos/brand-starter.jpg"
                alt="Atelier de création ACERFI Créativ — design system sur iMac"
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                  Premier studio IA marketing du Cameroun
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Mission / Vision */}
        <section className="relative w-full px-6 py-20 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
            <article className="rounded-3xl border border-white/[0.06] bg-card/50 p-8 md:p-10">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Mission
              </span>
              <p className="mt-4 font-display text-xl leading-snug text-foreground/90 md:text-2xl">
                {ACERFI.creativ.mission}
              </p>
            </article>
            <article className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/[0.10] to-transparent p-8 md:p-10">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Vision
              </span>
              <p className="mt-4 font-display text-xl leading-snug text-foreground/90 md:text-2xl">
                {ACERFI.creativ.vision}
              </p>
            </article>
          </div>
        </section>

        {/* L'écosystème ACERFI */}
        <section className="relative w-full px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Le Groupe ACERFI
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                4 entités, une vision
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Du Microsoft Gold Partner historique aux agents IA autonomes —
                ACERFI accompagne le digital africain à tous les étages.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {ACERFI.ecosystem.map((entity) => {
                const Icon =
                  ECOSYSTEM_ICONS[
                    entity.slug as keyof typeof ECOSYSTEM_ICONS
                  ] ?? Sparkles;
                const isCurrent = entity.current;

                return (
                  <a
                    key={entity.slug}
                    href={entity.url}
                    target={isCurrent ? undefined : "_blank"}
                    rel={isCurrent ? undefined : "noopener noreferrer"}
                    className={`group relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-500 ${
                      isCurrent
                        ? "border-primary/45 bg-gradient-to-br from-primary/[0.10] via-card/40 to-card/20"
                        : "border-white/[0.06] bg-card/50 hover:-translate-y-1 hover:border-primary/40"
                    }`}
                  >
                    {isCurrent && (
                      <span className="absolute right-4 top-4 rounded-full border border-primary/40 bg-primary/15 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-primary">
                        Vous êtes ici
                      </span>
                    )}

                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="h-5 w-5 text-primary" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold transition-colors duration-300 group-hover:text-primary">
                      {entity.name}
                    </h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                      {entity.description}
                    </p>
                    {!isCurrent && (
                      <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80 transition-transform duration-300 group-hover:translate-x-0.5">
                        Visiter
                        <ArrowUpRight className="h-3 w-3" />
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Valeurs — depuis ACERFI.creativ.values */}
        <section className="relative w-full px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Ce qui nous guide
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                Nos valeurs
              </h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {ACERFI.creativ.values.map((value) => {
                const Icon = VALUES_ICONS[value.title] ?? Sparkles;
                return (
                  <article
                    key={value.title}
                    className="group rounded-2xl border border-white/[0.06] bg-card/50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="h-5 w-5 text-primary" />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-semibold transition-colors duration-300 group-hover:text-primary">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {value.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Parent group banner */}
        <section className="relative w-full px-6 py-20 md:py-24">
          <div className="mx-auto max-w-4xl rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] via-card/40 to-card/20 p-10 backdrop-blur md:p-14">
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                  <Award className="h-3 w-3" /> Microsoft Gold Partner depuis{" "}
                  {ACERFI.group.parentCompany.since}
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold leading-tight md:text-3xl">
                  {ACERFI.group.legalName}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  Acteur historique de l&apos;inclusion numérique en Afrique
                  centrale. Pôles : Formation (MINFOP) · Créativ (cette agence) ·
                  MAYA Enterprise (IA autonomous business) · TW Micronics
                  (technologie).
                </p>
              </div>
              <Link
                href="https://www.acerfi.net"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/[0.08] px-5 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary hover:bg-primary/[0.16]"
              >
                Visiter acerfi.net
                <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </section>

        <FinalCta />
        <Footer />
      </main>
    </>
  );
}
