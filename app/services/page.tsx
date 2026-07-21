import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { FinalCta } from "@/components/sections/final-cta";
import { ServicesGrid } from "@/components/sections/services-grid";
import { PoleNav } from "@/components/sections/pole-nav";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Services — Catalogue complet par pôle",
  description:
    "6 pôles · 30+ services. Intelligence Artificielle, Vidéo & Photo, Design, Stratégie, Web & Digital, Terrain & Événementiel + Packs Premium. Prix annoncés.",
};

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative flex min-h-screen flex-col">
        <PageHero
          eyebrow="Catalogue · 6 pôles · 30+ services"
          title={
            <>
              Tout ce qu&apos;une marque a besoin,{" "}
              <span className="gradient-gold italic">augmenté par l&apos;IA</span>
            </>
          }
          description="Du design à l'automatisation. Chaque service a son scope, son délai, son prix. Choisissez votre pôle ci-dessous et nous livrons."
        />
        <PoleNav />
        <ServicesGrid />
        <FinalCta />
        <Footer />
      </main>
    </>
  );
}
