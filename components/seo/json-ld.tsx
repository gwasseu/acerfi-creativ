import { ACERFI } from "@/lib/acerfi";

const SITE_URL = ACERFI.creativ.site;

const sanitize = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

const organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: ACERFI.creativ.name,
  legalName: ACERFI.group.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/shared/images/Creativ/LOGO%20AC%20FAVICON%20COULEUR.png`,
  foundingDate: String(ACERFI.group.foundedYear),
  founder: { "@type": "Person", name: ACERFI.group.founderName },
  parentOrganization: {
    "@type": "Organization",
    name: ACERFI.group.parentCompany.name,
  },
  sameAs: ACERFI.socials.map((s) => s.href),
  contactPoint: ACERFI.contact.phones.map((tel) => ({
    "@type": "ContactPoint",
    telephone: tel,
    contactType: "customer service",
    areaServed: ["CM", "Africa"],
    availableLanguage: ["French", "English"],
  })),
};

const yaounde = ACERFI.contact.addresses.find((a) => a.primary);

const localBusiness = {
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}#localbusiness`,
  name: ACERFI.creativ.name,
  image: `${SITE_URL}/shared/images/Creativ/LOGO%20AC%20FAVICON%20COULEUR.png`,
  url: SITE_URL,
  telephone: ACERFI.contact.phonePrimary,
  email: ACERFI.contact.emails.primary,
  priceRange: "$$",
  description: ACERFI.creativ.description,
  address: yaounde
    ? {
        "@type": "PostalAddress",
        streetAddress: yaounde.line,
        addressLocality: yaounde.city,
        addressCountry: "CM",
      }
    : undefined,
  areaServed: [
    { "@type": "Country", name: "Cameroon" },
    { "@type": "Place", name: "Afrique francophone" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  sameAs: ACERFI.socials.map((s) => s.href),
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  url: SITE_URL,
  name: ACERFI.creativ.name,
  description: ACERFI.creativ.subtitle,
  inLanguage: "fr-FR",
  publisher: { "@id": `${SITE_URL}#organization` },
};

const graph = {
  "@context": "https://schema.org",
  "@graph": [organization, localBusiness, website],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitize(graph) }}
    />
  );
}
