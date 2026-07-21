import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { ServiceDetail } from "@/components/sections/service-detail";
import { SERVICES, SERVICE_BY_SLUG } from "@/content/services";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_BY_SLUG[slug];
  if (!service) return {};
  return {
    title: `${service.name} — ${service.tagline}`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.name} · ACERFI Créativ`,
      description: service.shortDescription,
      images: service.image ? [service.image] : undefined,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICE_BY_SLUG[slug];
  if (!service) notFound();

  return (
    <>
      <SiteHeader />
      <main className="relative flex min-h-screen flex-col">
        <ServiceDetail slug={slug} />
        <Footer />
      </main>
    </>
  );
}
