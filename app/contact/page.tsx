import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { PageHero } from "@/components/sections/page-hero";
import { ContactBlock } from "@/components/sections/contact-block";

export const metadata: Metadata = {
  title: "Contact — Brief gratuit en 30 minutes",
  description:
    "Brief gratuit en visio ou WhatsApp. Nous vous disons en 30 minutes ce que nous pouvons faire, à quel prix, en combien de jours. Yaoundé & Douala, Cameroun.",
};

type Props = {
  searchParams: Promise<{ service?: string; plan?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const { service, plan } = await searchParams;

  return (
    <>
      <SiteHeader />
      <main className="relative flex min-h-screen flex-col">
        <PageHero
          eyebrow="On parle de votre projet"
          title={
            <>
              Brief gratuit,{" "}
              <span className="gradient-gold">30 minutes max</span>
            </>
          }
          description="WhatsApp, visio, ou rendez-vous physique à Yaoundé / Douala. Nous comprenons votre besoin, nous vous disons ce que nous pouvons faire, à quel prix, en combien de jours."
        />
        <ContactBlock prefilledService={service} prefilledPlan={plan} />
        <Footer />
      </main>
    </>
  );
}
