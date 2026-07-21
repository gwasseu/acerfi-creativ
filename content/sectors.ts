import {
  Building,
  GraduationCap,
  HeartPulse,
  ShoppingBag,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

export type Sector = {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  icon: LucideIcon;
  accent: string;
  image: string;
  imageAlt: string;
  problems: string[];
  solutions: { title: string; body: string }[];
  recommendedServices: string[];
  faq: { q: string; a: string }[];
};

export const SECTORS: Sector[] = [
  {
    slug: "restaurants-hotels",
    name: "Restaurants, hôtels, lounges",
    tagline: "Menu vivant",
    shortDescription:
      "QR Code à chaque table, carte qui se met à jour en 5 minutes, plats du jour en temps réel.",
    longDescription:
      "On accompagne les restaurants et hôtels camerounais qui visent le haut de gamme. De l'identité au menu digital feuilletable, des photos plats aux Reels Instagram, tu ouvres prêt et tu rayonnes.",
    icon: UtensilsCrossed,
    accent: "#EF4444",
    image: "/images/sectors/restaurant.jpg",
    imageAlt: "Salle de restaurant haut de gamme aux lumières tamisées",
    problems: [
      "Les cartes papier coûtent cher et se périment vite",
      "Modifier un prix oblige à tout réimprimer",
      "Les photos plats sur les réseaux sociaux sont de mauvaise qualité",
      "Difficile de mesurer ce que les clients consultent vraiment",
    ],
    solutions: [
      {
        title: "Menu FlipBook accessible par QR Code",
        body: "Une carte feuilletable depuis chaque table. Mise à jour en temps réel. Statistiques de consultation par plat.",
      },
      {
        title: "Shooting photo pro de tes plats",
        body: "Inclus dans le Pack Resto. Notre photographe vient en cuisine, capture 15 plats signature, retouches incluses.",
      },
      {
        title: "Reels Instagram & TikTok réguliers",
        body: "Avec Story Reels, tu produis 8 à 12 vidéos / mois autour de tes plats du jour, ambiance, équipe.",
      },
    ],
    recommendedServices: ["flipbook-pro", "brand-starter", "production-video-standard"],
    faq: [
      {
        q: "On peut commencer petit avec juste le FlipBook ?",
        a: "Oui. FlipBook Pro Essentiel à 99 000 FCFA / an. Tu peux toujours upgrade vers le Pack Resto plus tard.",
      },
      {
        q: "Le QR Code à chaque table, ça abîme l'esthétique ?",
        a: "On le designe à tes couleurs, sur support qualité (acrylique gravé, présentoir bois). Discret et chic.",
      },
    ],
  },
  {
    slug: "boutiques-retail",
    name: "Boutiques, retail, e-commerce",
    tagline: "Vitrine 24/7",
    shortDescription:
      "Catalogue accessible partout, paiement Mobile Money, commande WhatsApp. Ta boutique ne ferme jamais.",
    longDescription:
      "On accompagne les boutiques qui veulent passer en mode mobile-first. Catalogue WhatsApp Business pro, FlipBook accessible 24/7, Reels mode/produit, et activations street pour les ouvertures et lancements.",
    icon: ShoppingBag,
    accent: "#8B5CF6",
    image: "/images/sectors/boutique.jpg",
    imageAlt: "Boutique de mode masculine avec mise en scène éditoriale",
    problems: [
      "Les clients consomment d'abord sur WhatsApp et Instagram",
      "Le catalogue papier coûte cher à réimprimer à chaque collection",
      "Les visuels produits sont irréguliers selon qui les fait",
      "Les ouvertures / lancements ne touchent pas assez de monde",
    ],
    solutions: [
      {
        title: "WhatsApp Catalog optimisé",
        body: "50 produits, visuels retouchés, descriptions vendeuses, paiement Mobile Money intégré. Setup en 3 jours.",
      },
      {
        title: "FlipBook nouvelle collection",
        body: "À chaque collection, un FlipBook partagé sur WhatsApp/réseaux. Tes clients feuillettent, commandent, paient.",
      },
      {
        title: "Caravane Mobile pour lancements",
        body: "Activation terrain à l'ouverture ou pour une nouvelle collection. Buzz local garanti.",
      },
    ],
    recommendedServices: ["bots-conversationnels", "flipbook-pro", "caravane-mobile"],
    faq: [
      {
        q: "Le combo WhatsApp + FlipBook, est-ce utile ?",
        a: "Oui. WhatsApp pour le quotidien et la commande, FlipBook pour la collection saison qui circule en lien partagé.",
      },
      {
        q: "Vous travaillez avec quels paiements ?",
        a: "Orange Money et MTN MoMo en natif. Carte bancaire et virement aussi possibles via partenaires.",
      },
    ],
  },
  {
    slug: "ecoles-formations",
    name: "Écoles, instituts, formations",
    tagline: "Diffusion virale",
    shortDescription:
      "Brochure rentrée scolaire partagée par les parents eux-mêmes sur WhatsApp. Plus de visibilité, plus de demandes.",
    longDescription:
      "On accompagne les écoles, instituts privés et centres de formation pour transformer leur brochure en outil de communication virale. Brochure FlipBook que les parents partagent, site Express avec inscription en ligne, vidéos des locaux et de la pédagogie.",
    icon: GraduationCap,
    accent: "#3B82F6",
    image: "/images/sectors/ecole.jpg",
    imageAlt: "Salle de classe moderne",
    problems: [
      "La brochure papier coûte cher et reste sur les bureaux",
      "Pas de mesure des consultations ni des intéressés",
      "Les inscriptions se font encore au comptoir, sans pré-qualification",
      "Difficile de différencier visuellement de la concurrence",
    ],
    solutions: [
      {
        title: "Brochure FlipBook qui circule",
        body: "Un seul lien partageable. Les parents l'envoient eux-mêmes. Statistiques précises sur les pages les plus lues.",
      },
      {
        title: "Site Express avec préinscription",
        body: "Site one-pager présentation + formulaire de préinscription. Tu reçois les contacts qualifiés directement.",
      },
      {
        title: "Story Reels — montrer la pédagogie",
        body: "Vidéos courtes des locaux, des activités, des témoignages élèves. Touchent les parents là où ils sont (Facebook, WhatsApp).",
      },
    ],
    recommendedServices: ["flipbook-pro", "site-express", "production-video-standard"],
    faq: [
      {
        q: "Les parents savent ouvrir un FlipBook sur leur téléphone ?",
        a: "Oui. C'est conçu pour fonctionner même sur 3G et téléphones bas de gamme. Tap pour feuilleter — c'est intuitif.",
      },
      {
        q: "Vous accompagnez les écoles publiques ?",
        a: "Oui, tarifs préférentiels possibles selon contexte. Contact direct.",
      },
    ],
  },
  {
    slug: "immobilier",
    name: "Immobilier, promoteurs, agences",
    tagline: "Portfolio premium",
    shortDescription:
      "Books de programmes, plans, visites virtuelles. Comparer, partager, contacter — en un seul lien.",
    longDescription:
      "On accompagne les promoteurs immobiliers et agences qui vendent des programmes, terrains, propriétés. FlipBook par programme, identité haut de gamme, site Express avec demande de visite, captation vidéo des biens.",
    icon: Building,
    accent: "#10B981",
    image: "/images/sectors/immobilier.jpg",
    imageAlt: "Immeuble moderne en perspective contre-plongée",
    problems: [
      "Les books papier sont lourds, datés, perdus",
      "Pas de mesure du sérieux d'un prospect avant la visite",
      "Difficile de transmettre le standing visuel d'un programme premium",
      "Les vidéos de visite sont mal montées et ne convertissent pas",
    ],
    solutions: [
      {
        title: "FlipBook par programme",
        body: "Un livre numérique premium par programme : plans, visuels 3D, prestations, modalités. QR Code chez le promoteur, lien dans les emails.",
      },
      {
        title: "Identité visuelle haut de gamme",
        body: "Brand Starter dédié à ton image immobilière. Logo, charte, papeterie qui inspirent confiance et sérieux.",
      },
      {
        title: "Vidéos de visite premium",
        body: "Story Reels adapté immobilier : drones, Steadicam, voix-off pro. Format Reels 60 s ou plus long pour YouTube.",
      },
    ],
    recommendedServices: ["flipbook-pro", "brand-starter", "clip-video-creatif"],
    faq: [
      {
        q: "Vous tournez les visites avec drone ?",
        a: "Oui pour les programmes neufs et propriétés haut de gamme. Inclus dans Story Reels Premium (sur devis).",
      },
      {
        q: "Combien de FlipBooks pour un promoteur multi-programmes ?",
        a: "Plan Business (40 pages, multi-catalogues) ou Illimité sur devis. Économies d'échelle dès 3 programmes.",
      },
    ],
  },
  {
    slug: "sante",
    name: "Santé & Cabinets médicaux",
    tagline: "Digital santé",
    shortDescription:
      "Cabinets médicaux modernisés : prise de RDV en ligne, agents IA d'accueil, communication patient. Cas client : MAVIZ-VISION.",
    longDescription:
      "On accompagne cabinets médicaux, cliniques et professionnels de santé qui veulent moderniser l'expérience patient. Site avec prise de RDV en ligne, agent IA pour FAQ et orientation, automatisation rappels — sans perdre le contact humain qui compte.",
    icon: HeartPulse,
    accent: "#06B6D4",
    image: "/photos/sante.jpg",
    imageAlt: "Médecin avec stéthoscope consultant son smartphone",
    problems: [
      "Le standard téléphonique est saturé aux heures creuses",
      "Les patients oublient les rappels de RDV",
      "Pas d'identité visuelle reconnaissable, qui inspire confiance",
      "Le site web (s'il existe) est obsolète et pas mobile",
    ],
    solutions: [
      {
        title: "Site Premium IA + prise de RDV en ligne",
        body: "Site moderne, mobile-first, avec calendrier intégré. Le patient prend RDV en 30 secondes, sans appeler.",
      },
      {
        title: "Agent IA pour l'accueil et la FAQ",
        body: "Réponse 24/7 aux questions standard (horaires, tarifs, urgences). Escalade humaine sur cas sérieux.",
      },
      {
        title: "Brand Starter — identité de cabinet",
        body: "Logo, charte, papeterie pro qui inspirent confiance. Cohérent du panneau extérieur à l'ordonnance.",
      },
    ],
    recommendedServices: ["site-premium-ia", "agent-ia-personnalise", "brand-starter"],
    faq: [
      {
        q: "Est-ce conforme au secret médical ?",
        a: "Oui. Tous les agents IA déployés en santé respectent strictement la confidentialité : aucune donnée patient n'est stockée hors de votre système.",
      },
      {
        q: "Cas client de référence ?",
        a: "MAVIZ-VISION (cabinet d'ophtalmologie) — site, prise de RDV en ligne, automatisation des rappels.",
      },
    ],
  },
  {
    slug: "pme-entrepreneurs",
    name: "PME & Entrepreneurs",
    tagline: "Digital starter",
    shortDescription:
      "Identité visuelle, sites vitrines, marketing digital — le pack starter pour TPE/PME qui veulent passer pro.",
    longDescription:
      "On accompagne entrepreneurs, indépendants, TPE et PME qui veulent une présence digitale crédible sans casser leur trésorerie. Identité, site vitrine, animation réseaux, le tout livré rapidement et à prix annoncé.",
    icon: Users,
    accent: "#F59E0B",
    image: "/photos/site-express.jpg",
    imageAlt: "Bureau de designer avec écran code et site web premium",
    problems: [
      "Pas de budget pour une grosse agence",
      "Pas le temps de gérer 5 prestataires différents",
      "Identité bricolée qui ne tient pas la route",
      "Concurrence locale qui prend la parole digitale",
    ],
    solutions: [
      {
        title: "Pack Identité Visuelle Complète",
        body: "Logo, charte, templates social — tout pour démarrer pro à partir de 150 000 FCFA.",
      },
      {
        title: "Site Vitrine Express",
        body: "One-pager ou multi-pages premium en 5 jours. Domaine et hébergement 1 an inclus.",
      },
      {
        title: "Pack Starter Digital",
        body: "Tout-inclus mensuel : site + animation social + pub + reporting. La clé en main.",
      },
    ],
    recommendedServices: ["brand-starter", "site-express", "pack-starter-digital"],
    faq: [
      {
        q: "Combien je dois budgéter pour démarrer pro ?",
        a: "Brand Starter (150k FCFA) + Site Express (99–250k) = à partir de 249 000 FCFA. Tu démarres avec une marque crédible et un site qui convertit.",
      },
      {
        q: "Et si je veux du suivi continu ?",
        a: "Le Pack Starter Digital à 300 000 FCFA / mois inclut tout : site, animation social, pub, reporting, formation.",
      },
    ],
  },
];

export const SECTOR_BY_SLUG = Object.fromEntries(
  SECTORS.map((s) => [s.slug, s]),
);
