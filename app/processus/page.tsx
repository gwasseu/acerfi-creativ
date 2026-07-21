import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Compass, Pencil, Rocket } from "lucide-react";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { FinalCta } from "@/components/sections/final-cta";
import { PageHero } from "@/components/sections/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ACERFI } from "@/lib/acerfi";

export const metadata: Metadata = {
  title: "Notre processus — Méthode ACERFI Créativ en 4 étapes",
  description:
    "Brief & Audit, Stratégie & Concepts, Production & Itération, Déploiement & Mesure. Un process clair, transparent, mesurable.",
};

const STEP_ICONS = [Compass, Pencil, ClipboardCheck, Rocket];

const DELAIS = [
  { label: "Visuels", value: "48–72h" },
  { label: "Site web vitrine", value: "7–15 jours" },
  { label: "Campagne complète", value: "3–4 semaines" },
  { label: "Production vidéo", value: "7–21 jours" },
];

export default function ProcessusPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative flex min-h-screen flex-col">
        <PageHero
          eyebrow="Méthode ACERFI Créativ · 4 étapes"
          title={
            <>
              Un process{" "}
              <span className="gradient-gold italic">clair</span>, étape par
              étape.
            </>
          }
          description="Vous savez quand vous recevez quoi. Vous validez à chaque étape. Vous gardez la main."
        />

        {/* Timeline 4 étapes */}
        <section className="relative w-full px-6 py-16 md:py-20">
          <div className="mx-auto max-w-4xl">
            <ol className="relative space-y-6">
              <span
                aria-hidden
                className="absolute left-7 top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"
              />

              {ACERFI.process.map((step, idx) => {
                const Icon = STEP_ICONS[idx] ?? Compass;
                return (
                  <li key={step.step} className="relative flex gap-6">
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-primary/45 bg-gradient-to-br from-primary/[0.18] to-primary/[0.04] backdrop-blur">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 rounded-2xl border border-white/[0.06] bg-card/50 p-7 transition-colors duration-500 hover:border-primary/30">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h2 className="font-display text-xl font-bold leading-tight md:text-2xl">
                          {step.step}. {step.title}
                        </h2>
                        <span className="rounded-full border border-primary/30 bg-primary/[0.08] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                          {step.window}
                        </span>
                      </div>
                      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                        {step.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Délais types */}
        <section className="relative w-full px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Délais standards
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                Ce que vous pouvez attendre, en jours
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Chaque chantier a son rythme — et on s&apos;y tient.
              </p>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {DELAIS.map((d) => (
                <div
                  key={d.label}
                  className="rounded-2xl border border-white/[0.06] bg-card/50 p-6 transition-colors duration-500 hover:border-primary/30"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    {d.label}
                  </span>
                  <p className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
                    {d.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Garanties / KPIs */}
        <section className="relative w-full px-6 py-20 md:py-24">
          <div className="mx-auto max-w-4xl rounded-3xl border-2 border-primary/40 bg-gradient-to-br from-primary/[0.10] via-card/40 to-card/20 p-10 backdrop-blur md:p-14">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Engagement de résultats
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold leading-tight md:text-3xl">
              Sur les Packs Rocket Start, Conquest Totale et Empire Builder…
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Nous nous engageons sur des KPIs mesurables (vues, leads,
              conversions). Si non atteints, des prestations correctives sont
              offertes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/services/pack-rocket-start"
                className={cn(
                  buttonVariants({ size: "default" }),
                  "bg-gradient-gold text-black hover:bg-gradient-gold hover:scale-105",
                )}
              >
                Pack Rocket Start
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services/pack-conquest-totale"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "border-primary/30 hover:border-primary/60",
                )}
              >
                Pack Conquest Totale
              </Link>
              <Link
                href="/services/pack-empire-builder"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "border-primary/30 hover:border-primary/60",
                )}
              >
                Pack Empire Builder
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
