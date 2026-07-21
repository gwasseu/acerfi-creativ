import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { FinalCta } from "@/components/sections/final-cta";
import { PageHero } from "@/components/sections/page-hero";
import { FaqList } from "@/components/sections/faq-list";

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes",
  description:
    "Tout ce que tu dois savoir avant de travailler avec ACERFI Créativ : zone d'intervention, différenciation IA, garanties de résultats, délais, paiements, formation.",
};

const FAQ = [
  {
    q: "ACERFI Créativ travaille-t-elle avec des clients hors Cameroun ?",
    a: "Oui. Nous accompagnons des marques dans toute l'Afrique francophone (Gabon, Côte d'Ivoire, Sénégal, Bénin, RDC) à distance ou via missions ponctuelles.",
  },
  {
    q: "Quelle différence avec les autres agences créatives ?",
    a: "Notre adossement au Groupe ACERFI (30+ ans, Microsoft Gold Partner, programme de formation IA ISA) nous donne une maîtrise technologique unique. Nous sommes les premiers à avoir industrialisé l'IA générative dans nos workflows.",
  },
  {
    q: "Comment garantissez-vous les résultats ?",
    a: "Pour les Packs Rocket Start, Conquest Totale et Empire Builder, nous nous engageons sur des KPIs mesurables (vues, leads, conversions). Si non atteints, des prestations correctives sont offertes.",
  },
  {
    q: "Quels sont vos délais habituels ?",
    a: "Visuels : 48–72h · Site web vitrine : 7–15 jours · Campagne complète : 3–4 semaines · Production vidéo : 7–21 jours selon ampleur.",
  },
  {
    q: "Acceptez-vous le paiement échelonné ?",
    a: "Oui. Acompte de 30–50% à la commande, solde selon échéancier convenu. Mobile Money, virement, espèces acceptés.",
  },
  {
    q: "Proposez-vous de la formation ?",
    a: "Oui, en partenariat avec ACERFI Formation et le programme ISA (IA Solutions Architect). Nous formons vos équipes pour qu'elles deviennent autonomes après la prestation.",
  },
];

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative flex min-h-screen flex-col">
        <PageHero
          eyebrow="Questions fréquentes"
          title={
            <>
              Tout ce que tu dois savoir{" "}
              <span className="gradient-gold italic">avant de briefer</span>.
            </>
          }
          description="Si ta question n'est pas dans la liste, contacte-nous : on répond sous 1 heure en journée ouvrée."
        />
        <FaqList items={FAQ} />
        <FinalCta />
        <Footer />
      </main>
    </>
  );
}
