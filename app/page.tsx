import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { TrustBadges } from "@/components/sections/trust-badges";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { Manifesto } from "@/components/sections/manifesto";
import { ServicesPreview } from "@/components/sections/services-preview";
import { SectorsPreview } from "@/components/sections/sectors-preview";
import { Stats } from "@/components/sections/stats";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="relative flex min-h-screen flex-col">
        <Hero />
        <TrustBadges />
        <MarqueeBand />
        <Manifesto />
        <ServicesPreview />
        <SectorsPreview />
        <Stats />
        <FinalCta />
        <Footer />
      </main>
    </>
  );
}
