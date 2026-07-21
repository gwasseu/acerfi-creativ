/**
 * Source unique des infos ACERFI Créativ.
 * Source de vérité : Documentation officielle 2026.1 — validée par Guy Wasseu.
 * Modifier ce fichier propage partout (Header, Footer, Contact, About, metadata).
 */

export const ACERFI = {
  group: {
    legalName: "Groupe ACERFI",
    positioning: "Acteur de l'Inclusion Numérique en Afrique",
    historicTagline: "Des idées qui rayonnent…",
    founderName: "Guy Wasseu",
    foundedYear: 1995,
    yearsExperience: "30+",
    employeesRange: "11–50",
    industry: "Studio créatif & marketing IA",
    clientsCount: "100+",
    clientsArea: "Cameroun & Afrique francophone",
    parentCompany: {
      name: "TW Micronics",
      certification: "Microsoft Gold Partner",
      since: 1993,
    },
  },

  creativ: {
    name: "ACERFI Créativ",
    tagline: "L'Agence Créative Augmentée par l'IA",
    subtitle:
      "Du design à l'automatisation, nous transformons vos idées en performance digitale.",
    positioning: "Premier studio IA marketing du Cameroun",
    description:
      "Studio créatif et marketing IA basé à Yaoundé, au service des marques africaines ambitieuses. Pôle créatif et marketing du Groupe ACERFI.",
    mission:
      "Démocratiser l'accès aux outils marketing les plus avancés au monde pour les entreprises et entrepreneurs africains, en alliant créativité humaine et puissance de l'IA.",
    vision:
      "Faire de chaque marque africaine accompagnée par ACERFI Créativ une marque visible, désirable et performante, à hauteur de ses ambitions.",
    pillars: [
      {
        title: "Création",
        body: "Design, vidéo, photo, contenu rédactionnel — chaque livrable est pensé pour convertir.",
      },
      {
        title: "Intelligence Artificielle",
        body: "Avatars, agents conversationnels, automatisation des publications, génération de contenu — l'IA au service de votre croissance.",
      },
      {
        title: "Performance",
        body: "Stratégie, mesure, optimisation. Nous ne livrons pas des fichiers, nous livrons des résultats.",
      },
    ],
    values: [
      {
        title: "Excellence",
        body: "Chaque livrable est traité comme une vitrine.",
      },
      {
        title: "Innovation",
        body: "Nous adoptons l'IA avant les autres, pas après.",
      },
      {
        title: "Engagement",
        body: "Nous nous engageons sur les résultats, pas sur les heures.",
      },
      {
        title: "Souveraineté",
        body: "Nous formons et outillons nos clients pour qu'ils maîtrisent leurs propres canaux.",
      },
    ],
    site: "https://creativ.acerfi.net",
    linkedin: "https://www.linkedin.com/company/acerfi-creativ",
  },

  contact: {
    phones: ["+237 695 08 08 08", "+237 672 060 060"],
    phonePrimary: "+237 695 08 08 08",
    phonePrimaryRaw: "237695080808",
    whatsapp: "https://wa.me/237695080808",
    whatsappLabel: "Réponse sous 1 h en journée ouvrée",
    emails: {
      general: "contact@acerfi.net",
      info: "info@acerfi.net",
      primary: "contact@acerfi.net",
    },
    hours: {
      weekday: "Lun – Ven : 8h00 – 18h00",
      saturday: "Sam : 9h00 – 13h00",
      sunday: "Dim : Fermé",
    },
    quoteSLA: "Devis gratuit en 24 h ouvrées",
    addresses: [
      {
        city: "Yaoundé",
        line: "143, Rue 1695 Ngousso Hôpital Général",
        full: "143, Rue 1695 Ngousso Hôpital Général, Yaoundé, Cameroun",
        primary: true,
      },
      {
        city: "Douala",
        line: "Cameroun · sur RDV",
        primary: false,
      },
    ],
  },

  socials: [
    { type: "facebook" as const, label: "Facebook", href: "https://facebook.com/AcerfiCreativ" },
    { type: "instagram" as const, label: "Instagram", href: "https://instagram.com/acerfi.creativ" },
    { type: "linkedin" as const, label: "LinkedIn", href: "https://www.linkedin.com/company/acerfi-creativ" },
    { type: "tiktok" as const, label: "TikTok", href: "https://tiktok.com/@acerfi.creativ" },
  ],

  trustBadges: [
    { icon: "🏆", value: "30+ ans", label: "d'expertise (Groupe ACERFI, depuis 1995)" },
    { icon: "🎯", value: "100+", label: "clients accompagnés au Cameroun et en Afrique francophone" },
    { icon: "⚡", value: "Premier", label: "studio IA marketing du Cameroun" },
    { icon: "🌍", value: "Yaoundé · Douala", label: "Afrique francophone" },
  ],

  ecosystem: [
    {
      slug: "creativ",
      name: "ACERFI Créativ",
      description:
        "Pôle créatif & marketing IA — design, vidéo, web, automatisation",
      url: "https://creativ.acerfi.net",
      status: "live" as const,
      current: true,
    },
    {
      slug: "formation",
      name: "ACERFI Formation",
      description:
        "Centre de formation professionnelle agréé MINFOP — programme ISA inclus",
      url: "https://formation.acerfi.net",
      status: "live" as const,
      current: false,
    },
    {
      slug: "maya",
      name: "MAYA Enterprise",
      description:
        "Plateforme d'agents IA autonomes pour l'Afrique — CRM, Ventes, Social, Compta, RH",
      url: "https://maya.acerfi.net",
      status: "live" as const,
      current: false,
    },
    {
      slug: "tw-micronics",
      name: "TW Micronics",
      description:
        "Microsoft Gold Partner depuis 1993 — pôle technologique du groupe",
      url: "https://www.acerfi.net",
      status: "live" as const,
      current: false,
    },
  ],

  process: [
    {
      step: 1,
      title: "Brief & Audit",
      window: "Jour 1–3",
      body: "Compréhension profonde de votre marque, vos objectifs et votre marché. Audit gratuit de votre communication actuelle.",
    },
    {
      step: 2,
      title: "Stratégie & Concepts",
      window: "Jour 4–7",
      body: "Production de la stratégie créative et des premiers concepts. Validation client avant production.",
    },
    {
      step: 3,
      title: "Production & Itération",
      window: "Jour 8–21",
      body: "Réalisation des livrables avec révisions intégrées. Vous gardez la main à chaque étape.",
    },
    {
      step: 4,
      title: "Déploiement & Mesure",
      window: "Jour 22+",
      body: "Diffusion, animation, suivi des KPIs, optimisation continue. Reporting mensuel transparent.",
    },
  ],

  meta: {
    confirmedAt: "2026-05-02",
    docVersion: "2026.1",
    sources: [
      "Documentation officielle ACERFI Créativ 2026.1 (Guy Wasseu)",
      "https://maya.acerfi.net/about",
      "https://formation.acerfi.net (séparé : pôle Formation, contacts différents)",
    ],
  },
} as const;

export type AcerfiContact = typeof ACERFI.contact;
export type AcerfiSocial = (typeof ACERFI.socials)[number];
export type AcerfiEntity = (typeof ACERFI.ecosystem)[number];
export type AcerfiPillar = (typeof ACERFI.creativ.pillars)[number];
export type AcerfiValue = (typeof ACERFI.creativ.values)[number];
export type AcerfiProcessStep = (typeof ACERFI.process)[number];
