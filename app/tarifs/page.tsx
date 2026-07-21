import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { FinalCta } from "@/components/sections/final-cta";
import { PageHero } from "@/components/sections/page-hero";
import { Pricing } from "@/components/sections/pricing";
import { ServicesPriceTable } from "@/components/sections/services-price-table";

export const metadata: Metadata = {
  title: "Tarifs — Prix annoncés, sans surprise",
  description:
    "FlipBook Pro à partir de 99 000 FCFA / an. Tous nos produits packagés à prix fixe : Brand Starter, Site Express, Pack Resto, Story Reels, WhatsApp Catalog, Caravane Mobile.",
};

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative flex min-h-screen flex-col">
        <PageHero
          eyebrow="Tarifs · Prix FCFA · TVA non applicable"
          title={
            <>
              Des prix{" "}
              <span className="gradient-gold">annoncés</span>, pas de devis qui
              traîne
            </>
          }
          description="Mobile Money, virement, carte. Tu sais ce que tu paies, ce que tu reçois, et en combien de jours."
        />

        <Pricing />

        <ServicesPriceTable />

        <FinalCta />
        <Footer />
      </main>
    </>
  );
}
