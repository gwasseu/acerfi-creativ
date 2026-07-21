import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { SectorDetail } from "@/components/sections/sector-detail";
import { SECTORS, SECTOR_BY_SLUG } from "@/content/sectors";

type Props = {
  params: Promise<{ secteur: string }>;
};

export function generateStaticParams() {
  return SECTORS.map((s) => ({ secteur: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { secteur } = await params;
  const sector = SECTOR_BY_SLUG[secteur];
  if (!sector) return {};
  return {
    title: `${sector.name} — ${sector.tagline}`,
    description: sector.shortDescription,
    openGraph: {
      title: `${sector.name} · ACERFI Créativ`,
      description: sector.shortDescription,
      images: [sector.image],
    },
  };
}

export default async function SectorPage({ params }: Props) {
  const { secteur } = await params;
  const sector = SECTOR_BY_SLUG[secteur];
  if (!sector) notFound();

  return (
    <>
      <SiteHeader />
      <main className="relative flex min-h-screen flex-col">
        <SectorDetail slug={secteur} />
        <Footer />
      </main>
    </>
  );
}
