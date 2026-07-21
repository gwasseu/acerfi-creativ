import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { FinalCta } from "@/components/sections/final-cta";
import { PageHero } from "@/components/sections/page-hero";
import { SECTORS } from "@/content/sectors";

export const metadata: Metadata = {
  title: "Portfolio — Réalisations & secteurs d'expertise",
  description:
    "Hôtellerie, formation, santé (cas MAVIZ-VISION), commerce, immobilier, PME. Quelques références et secteurs où on a fait nos preuves.",
};

// Cas confirmé par la doc officielle
const REAL_CASES = [
  {
    sector: "sante",
    name: "MAVIZ-VISION",
    body: "Cabinet d'ophtalmologie : site avec prise de RDV en ligne, automatisation des rappels patients, identité visuelle.",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative flex min-h-screen flex-col">
        <PageHero
          eyebrow="Portfolio · 100+ clients · 6 secteurs"
          title={
            <>
              Là où nous{" "}
              <span className="gradient-gold italic">faisons nos preuves</span>
            </>
          }
          description="Six secteurs où on excelle, des dizaines de marques accompagnées au Cameroun et en Afrique francophone. Quelques cas concrets ci-dessous — la liste complète sur demande."
        />

        {/* Real cases — affichés en haut, mis en avant */}
        <section className="relative w-full px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Cas client référence
              </span>
              <h2 className="font-display text-3xl font-bold leading-[1.05] md:text-5xl">
                Quelques marques qui nous font confiance
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {REAL_CASES.map((c) => {
                const sector = SECTORS.find((s) => s.slug === c.sector);
                return (
                  <article
                    key={c.name}
                    className="group relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.08] via-card/40 to-card/20 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/45"
                  >
                    {sector && (
                      <span
                        className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
                        style={{
                          borderColor: `${sector.accent}45`,
                          background: `${sector.accent}18`,
                          color: sector.accent,
                        }}
                      >
                        {sector.name.split("&")[0].split(",")[0].trim()}
                      </span>
                    )}
                    <h3 className="mt-4 font-display text-2xl font-bold">
                      {c.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {c.body}
                    </p>
                  </article>
                );
              })}

              {/* Slot "À venir" pour clients sous NDA / à officialiser */}
              {Array.from({ length: 5 }).map((_, i) => (
                <article
                  key={`slot-${i}`}
                  className="flex h-full min-h-[180px] flex-col justify-center rounded-2xl border border-dashed border-white/[0.08] bg-card/20 p-7 text-center"
                >
                  <Sparkles className="mx-auto h-5 w-5 text-primary/40" />
                  <p className="mt-3 text-xs uppercase tracking-[0.22em] text-muted-foreground/50">
                    Bientôt révélé
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground/40">
                    Plus de 100 clients accompagnés.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Secteurs d'expertise */}
        <section className="relative w-full px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Nos terrains de jeu
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                6 secteurs d&apos;expertise
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Pour chaque secteur, on a packagé une approche pensée et des
                solutions éprouvées. Clique pour voir le détail.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {SECTORS.map((sector) => {
                const Icon = sector.icon;
                return (
                  <Link
                    key={sector.slug}
                    href={`/secteurs/${sector.slug}`}
                    style={
                      {
                        ["--accent" as string]: sector.accent,
                      } as React.CSSProperties
                    }
                    className="group relative block min-h-[280px] overflow-hidden rounded-2xl border border-white/[0.06] transition-all duration-500 hover:border-[var(--accent)]/45 hover:shadow-[0_24px_70px_-20px_var(--accent)]/35"
                  >
                    <Image
                      src={sector.image}
                      alt={sector.imageAlt}
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
                        background: `linear-gradient(135deg, ${sector.accent}25 0%, transparent 60%)`,
                      }}
                    />

                    <div className="relative flex h-full flex-col justify-between p-6 md:p-7">
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                          style={{
                            background: `${sector.accent}1f`,
                            borderColor: `${sector.accent}45`,
                          }}
                        >
                          <Icon className="h-5 w-5" style={{ color: sector.accent }} />
                        </span>
                        <span
                          className="rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur-md"
                          style={{ color: sector.accent }}
                        >
                          {sector.tagline}
                        </span>
                      </div>
                      <div className="mt-6">
                        <h3 className="font-display text-xl font-bold leading-tight text-white md:text-2xl">
                          {sector.name}
                        </h3>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-white transition-transform duration-300 group-hover:translate-x-1">
                          Voir le détail
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <FinalCta />
        <Footer />
      </main>
    </>
  );
}
