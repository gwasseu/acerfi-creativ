import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { FinalCta } from "@/components/sections/final-cta";
import { PageHero } from "@/components/sections/page-hero";
import { SECTORS } from "@/content/sectors";

export const metadata: Metadata = {
  title: "Secteurs — Solutions par métier",
  description:
    "Restaurants, boutiques, écoles, immobilier : on a packagé des solutions sectorielles. Choisis ton terrain, on a déjà les bonnes idées.",
};

export default function SectorsPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative flex min-h-screen flex-col">
        <PageHero
          eyebrow="Solutions sectorielles · 4 métiers couverts"
          title={
            <>
              Pour chaque métier,{" "}
              <span className="gradient-gold">une approche pensée</span>
            </>
          }
          description="On ne fait pas de la com générique. Chaque secteur a ses codes, ses canaux, ses cycles. On a packagé une approche par métier."
        />

        <section className="relative w-full px-6 py-12 md:py-16">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
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
                  className="group relative block min-h-[360px] overflow-hidden rounded-3xl border border-white/[0.06] transition-all duration-500 hover:border-[var(--accent)]/45 hover:shadow-[0_30px_80px_-20px_var(--accent)]/40"
                >
                  <Image
                    src={sector.image}
                    alt={sector.imageAlt}
                    fill
                    sizes="(min-width:768px) 50vw, 100vw"
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

                  <div className="relative flex h-full flex-col justify-between p-8 md:p-10">
                    <div className="flex items-start justify-between">
                      <span
                        className="inline-flex h-14 w-14 items-center justify-center rounded-xl border backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                        style={{
                          background: `${sector.accent}1f`,
                          borderColor: `${sector.accent}40`,
                        }}
                      >
                        <Icon
                          className="h-6 w-6"
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
                      <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-white md:text-4xl">
                        {sector.name}
                      </h2>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
                        {sector.shortDescription}
                      </p>
                      <span
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition-transform duration-300 group-hover:translate-x-1"
                      >
                        Voir les solutions →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <FinalCta />
        <Footer />
      </main>
    </>
  );
}
