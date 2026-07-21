import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { PageHero } from "@/components/sections/page-hero";
import { ACERFI } from "@/lib/acerfi";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales, conditions générales, politique de confidentialité et de cookies — ACERFI Créativ.",
  robots: { index: true, follow: false },
};

const SECTIONS = [
  {
    title: "1. Éditeur du site",
    body: (
      <ul className="space-y-1.5">
        <li>
          <strong className="text-foreground">Raison sociale :</strong>{" "}
          {ACERFI.creativ.name} — pôle créatif et marketing du{" "}
          {ACERFI.group.legalName}
        </li>
        <li>
          <strong className="text-foreground">Directeur de la publication :</strong>{" "}
          {ACERFI.group.founderName}
        </li>
        <li>
          <strong className="text-foreground">Adresse :</strong>{" "}
          {ACERFI.contact.addresses[0].full}
        </li>
        <li>
          <strong className="text-foreground">Téléphones :</strong>{" "}
          {ACERFI.contact.phones.join(" · ")}
        </li>
        <li>
          <strong className="text-foreground">Email :</strong>{" "}
          <a
            href={`mailto:${ACERFI.contact.emails.primary}`}
            className="text-primary hover:underline"
          >
            {ACERFI.contact.emails.primary}
          </a>
        </li>
      </ul>
    ),
  },
  {
    title: "2. Hébergeur",
    body: (
      <p>
        Le site <strong>creativ.acerfi.net</strong> est hébergé sur l&apos;infrastructure
        Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723, États-Unis) et
        livré via réseau de distribution global. Les données sont mises en
        cache en Europe (Francfort, Paris) selon la géolocalisation des
        visiteurs.
      </p>
    ),
  },
  {
    title: "3. Propriété intellectuelle",
    body: (
      <p>
        L&apos;ensemble du site (textes, visuels, logos, code source, structure de
        navigation) est la propriété exclusive d&apos;ACERFI Créativ ou de ses
        partenaires, sauf mentions contraires. Toute reproduction, même
        partielle, est interdite sans autorisation écrite préalable. Les
        marques tierces citées (Microsoft, HeyGen, Synthesia, etc.) restent la
        propriété de leurs détenteurs respectifs.
      </p>
    ),
  },
  {
    title: "4. Données personnelles",
    body: (
      <>
        <p>
          ACERFI Créativ collecte uniquement les données strictement
          nécessaires aux missions confiées par ses clients ou aux demandes de
          contact. Les données sont stockées de manière sécurisée et ne sont
          jamais revendues à des tiers.
        </p>
        <p className="mt-4">
          Conformément à la réglementation en vigueur (notamment au cadre
          juridique camerounais sur la protection des données personnelles et
          au RGPD pour les visiteurs européens), vous disposez d&apos;un droit
          d&apos;accès, de rectification, de suppression et d&apos;opposition. Pour
          exercer ces droits, contactez-nous à{" "}
          <a
            href={`mailto:${ACERFI.contact.emails.primary}`}
            className="text-primary hover:underline"
          >
            {ACERFI.contact.emails.primary}
          </a>
          .
        </p>
      </>
    ),
  },
  {
    title: "5. Cookies",
    body: (
      <>
        <p>
          Ce site utilise un nombre minimal de cookies, strictement nécessaires
          au fonctionnement (préférences d&apos;affichage, session). Aucun cookie de
          tracking publicitaire n&apos;est posé sans votre consentement explicite.
        </p>
        <p className="mt-4">
          Vous pouvez à tout moment configurer votre navigateur pour refuser les
          cookies. Consultez la documentation de votre navigateur (Chrome,
          Firefox, Safari, Edge) pour savoir comment.
        </p>
      </>
    ),
  },
  {
    title: "6. Conditions générales de prestation",
    body: (
      <ul className="space-y-2.5">
        <li>
          <strong className="text-foreground">Devis :</strong> tout devis émis
          par ACERFI Créativ est valable 30 jours sauf mention contraire.
        </li>
        <li>
          <strong className="text-foreground">Acompte :</strong> 30 à 50 % à la
          signature du devis, solde selon échéancier convenu.
        </li>
        <li>
          <strong className="text-foreground">Modes de paiement :</strong>{" "}
          Mobile Money (Orange Money, MTN MoMo), virement bancaire, espèces.
        </li>
        <li>
          <strong className="text-foreground">Livrables :</strong> tous les
          fichiers sources sont remis au client à l&apos;issue de la prestation.
          ACERFI Créativ conserve un droit de portfolio (présenter le travail
          réalisé) sauf accord de confidentialité explicite.
        </li>
        <li>
          <strong className="text-foreground">Garanties de résultats :</strong>{" "}
          uniquement applicables aux Packs Rocket Start, Conquest Totale et
          Empire Builder. KPIs définis dans le devis. Si non atteints,
          prestations correctives offertes.
        </li>
        <li>
          <strong className="text-foreground">Droit applicable :</strong>{" "}
          Cameroun. En cas de litige, les juridictions de Yaoundé sont
          compétentes.
        </li>
      </ul>
    ),
  },
  {
    title: "7. Crédits",
    body: (
      <p>
        Conception, design et développement :{" "}
        <Link href="/" className="text-primary hover:underline">
          ACERFI Créativ
        </Link>{" "}
        · Photos d&apos;illustration : sources publiques (Unsplash) en attendant la
        bibliothèque finale ACERFI.
      </p>
    ),
  },
];

export default function MentionsLegalesPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative flex min-h-screen flex-col">
        <PageHero
          eyebrow="Légal · Conditions · Données"
          title={
            <>
              Mentions{" "}
              <span className="gradient-gold italic">légales</span>
            </>
          }
          description="Tout ce que vous devez savoir sur l'éditeur, les CGV, les cookies et la protection de vos données."
        />

        <section className="relative w-full px-6 py-16 md:py-20">
          <div className="mx-auto max-w-3xl space-y-10">
            {SECTIONS.map((section) => (
              <article
                key={section.title}
                className="rounded-2xl border border-white/[0.06] bg-card/40 p-7 md:p-9"
              >
                <h2 className="font-display text-xl font-bold leading-tight md:text-2xl">
                  {section.title}
                </h2>
                <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {section.body}
                </div>
              </article>
            ))}

            <p className="pt-4 text-center text-xs text-muted-foreground/60">
              Dernière mise à jour : 21 juillet 2026.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
