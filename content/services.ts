import {
  BookOpen,
  Bot,
  Brain,
  Building,
  Camera,
  Crown,
  Film,
  Globe,
  ImageIcon,
  Layers,
  Megaphone,
  MessageCircle,
  Mic,
  Package,
  Palette,
  Pen,
  PenTool,
  Rocket,
  Sparkles,
  Target,
  Trophy,
  Truck,
  Users,
  Wand2,
  Zap,
  type LucideIcon,
} from "lucide-react";

// ═════════════════════════════════════════════════════════════════════════
// PÔLES — 6 pôles + Packs Premium transversaux
// ═════════════════════════════════════════════════════════════════════════

export type Pole = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  accent: string;
};

export const POLES: Pole[] = [
  {
    slug: "ia",
    name: "Intelligence Artificielle",
    tagline: "Agents · Avatars · Automatisation",
    description:
      "Conception et déploiement d'agents IA, bots conversationnels, avatars virtuels et workflows automatisés pour vos opérations.",
    icon: Brain,
    accent: "#C9A84C",
  },
  {
    slug: "video-photo",
    name: "Vidéo & Photo",
    tagline: "Production éditoriale & cinématique",
    description:
      "Tournages, montages, photo événementielle, clips musicaux. Du standard au Premium, en passant par les avatars IA.",
    icon: Film,
    accent: "#EF4444",
  },
  {
    slug: "design",
    name: "Design Graphique",
    tagline: "Identité · Print · FlipBook Pro",
    description:
      "Identités visuelles complètes, supports imprimés, packaging, signalétique. Plus le FlipBook Pro — solution exclusive ACERFI Créativ.",
    icon: Palette,
    accent: "#8B5CF6",
  },
  {
    slug: "strategie",
    name: "Stratégie & Contenu",
    tagline: "Audit · Copywriting · Plan éditorial",
    description:
      "Stratégies de contenu, audits concurrentiels, copywriting SEO. La parole qui convertit.",
    icon: PenTool,
    accent: "#3B82F6",
  },
  {
    slug: "web",
    name: "Web & Digital",
    tagline: "Sites IA · E-commerce · Pack Starter",
    description:
      "Sites vitrines premium, e-commerce, refontes augmentées par l'IA. Plus le Pack Starter Digital tout-inclus.",
    icon: Globe,
    accent: "#10B981",
  },
  {
    slug: "terrain",
    name: "Terrain & Événementiel",
    tagline: "Caravane · Métavers · Spectacle",
    description:
      "Activations physiques (fourgonnette ou camion premium), événements métavers Web3, spectacles urbains immersifs.",
    icon: Truck,
    accent: "#FF9E2C",
  },
  {
    slug: "packs",
    name: "Packs Premium",
    tagline: "Solutions globales transversales",
    description:
      "Lancements coordonnés et campagnes multi-canaux. Du Rocket Start au Empire Builder — engagement de résultats.",
    icon: Crown,
    accent: "#FFD700",
  },
];

export const POLE_BY_SLUG = Object.fromEntries(POLES.map((p) => [p.slug, p]));

// ═════════════════════════════════════════════════════════════════════════
// SERVICES
// ═════════════════════════════════════════════════════════════════════════

export type ServiceFAQ = { q: string; a: string };
export type ServiceStep = { day: string; title: string; body: string };
export type ServiceShowcase = { title: string; body: string };

export type Service = {
  slug: string;
  pole: string;
  name: string;
  flagship?: boolean;
  badge: string;
  tagline: string;
  shortDescription: string;
  longDescription?: string;
  icon: LucideIcon;
  accent: string;
  image?: string;
  imageAlt?: string;
  delay: string;
  priceLabel: string;
  priceFcfa: number | null;
  priceSuffix?: string;
  problem?: string;
  solution?: string;
  deliverables?: string[];
  steps?: ServiceStep[];
  showcases?: ServiceShowcase[];
  faq?: ServiceFAQ[];
  related?: string[];
};

export const SERVICES: Service[] = [
  // ──────────────────────────────────────────────────────────────────────
  // PÔLE IA
  // ──────────────────────────────────────────────────────────────────────
  {
    slug: "agent-ia-personnalise",
    pole: "ia",
    name: "Agent IA Personnalisé",
    flagship: true,
    badge: "IA sur mesure",
    tagline: "Une intelligence artificielle entraînée sur votre métier",
    shortDescription:
      "Conception de la personnalité, formation sur vos données métier, déploiement multilingue (français, anglais, langues locales).",
    longDescription:
      "Un agent IA conçu spécifiquement pour votre activité : il connaît vos produits, parle votre ton, gère votre service client 24/7. Multilingue, escalade humaine sur demande.",
    icon: Bot,
    accent: "#C9A84C",
    delay: "10–14 jours",
    priceLabel: "200 000 FCFA",
    priceFcfa: 200000,
    priceSuffix: "forfait",
    problem:
      "Votre service client est saturé. Les questions répétitives bouffent votre équipe, les leads attendent des heures, vous perdez des opportunités la nuit.",
    solution:
      "Un agent IA entraîné sur votre métier prend le relais 24/7. Il répond, qualifie, oriente — et passe la main à l'humain quand c'est nécessaire.",
    deliverables: [
      "Conception de la personnalité de l'agent (ton, vocabulaire, valeurs)",
      "Formation sur vos données métier (produits, FAQ, processus)",
      "Déploiement multilingue : français, anglais, langues locales",
      "Intégration WhatsApp / web / tablette selon votre besoin",
      "Système d'escalade humaine intelligent",
      "Dashboard de monitoring + analytics",
      "1 mois de fine-tuning post-lancement inclus",
    ],
    related: ["receptionniste-ia", "bots-conversationnels", "pack-domination-ia"],
  },
  {
    slug: "receptionniste-ia",
    pole: "ia",
    name: "Réceptionniste IA",
    badge: "24h/24, 7j/7",
    tagline: "Un accueil intelligent qui ne dort jamais",
    shortDescription:
      "Agent IA déployé sur tablette en lobby, site web et WhatsApp. Accueil, orientation client, FAQ, pré check-in, escalade humaine.",
    icon: Users,
    accent: "#C9A84C",
    delay: "Sur devis",
    priceLabel: "Sur devis",
    priceFcfa: null,
    priceSuffix: "selon scope",
    related: ["agent-ia-personnalise", "bots-conversationnels"],
  },
  {
    slug: "bots-conversationnels",
    pole: "ia",
    name: "Bots Conversationnels",
    badge: "WhatsApp · Telegram · Web",
    tagline: "Service client automatisé multi-canaux",
    shortDescription:
      "Bots WhatsApp, Telegram et assistants web. Développement multi-canaux 300k FCFA + personnalisation IA 100k + maintenance 50k/mois.",
    icon: MessageCircle,
    accent: "#C9A84C",
    image: "/photos/whatsapp-catalog.jpg",
    imageAlt: "Vendeuse acceptant un paiement mobile au comptoir",
    delay: "7–14 jours",
    priceLabel: "À partir de 300 000 FCFA",
    priceFcfa: 300000,
    priceSuffix: "+ scénarios + maintenance",
    related: ["agent-ia-personnalise", "pack-domination-ia"],
  },
  {
    slug: "pack-domination-ia",
    pole: "ia",
    name: "Pack Domination IA",
    flagship: true,
    badge: "Automation marketing complète",
    tagline: "Votre marketing digital sur pilote automatique",
    shortDescription:
      "Génération de contenu, publication programmée, réponse aux commentaires, analytics IA. La machine tourne, vous validez.",
    longDescription:
      "Le pack qui automatise tout votre stack marketing digital : génération texte/visuels par IA, planning éditorial auto, modération communauté, reporting hebdomadaire.",
    icon: Zap,
    accent: "#C9A84C",
    delay: "21 jours",
    priceLabel: "450 000 FCFA",
    priceFcfa: 450000,
    priceSuffix: "forfait setup",
    problem:
      "Publier 3 posts par semaine sur 4 plateformes = 100h/mois pour une équipe humaine. Impossible à tenir, qualité qui dérive.",
    solution:
      "On automatise toute la chaîne : génération de contenu IA, planning, publication, réponses, analytics. Vous validez 1× par semaine. Votre équipe se concentre sur la stratégie.",
    deliverables: [
      "Génération de contenu IA (textes, visuels, légendes)",
      "Calendrier éditorial automatisé sur 90 jours",
      "Publication programmée multi-plateformes (Facebook, Instagram, LinkedIn, TikTok)",
      "Réponse automatique aux commentaires + escalade",
      "Analytics IA hebdomadaires avec recommandations",
      "Dashboard centralisé pour validation rapide",
      "Formation de votre équipe sur l'outil (3h)",
    ],
    related: ["agent-ia-personnalise", "campagne-ia-flash", "pack-conquest-totale"],
  },
  {
    slug: "campagne-ia-flash",
    pole: "ia",
    name: "Campagne IA Flash",
    badge: "Coup-de-poing 30 jours",
    tagline: "Automation marketing pour un lancement",
    shortDescription:
      "30 jours d'automatisation marketing pleine puissance. Parfait pour un lancement produit ou une opération coup-de-poing.",
    icon: Rocket,
    accent: "#C9A84C",
    delay: "30 jours d'activation",
    priceLabel: "250 000 FCFA",
    priceFcfa: 250000,
    priceSuffix: "campagne 30j",
    related: ["pack-domination-ia", "pack-rocket-start"],
  },

  // ──────────────────────────────────────────────────────────────────────
  // PÔLE VIDÉO & PHOTO
  // ──────────────────────────────────────────────────────────────────────
  {
    slug: "production-video-standard",
    pole: "video-photo",
    name: "Photo + Vidéo Standard",
    badge: "Shooting + montage pro",
    tagline: "Le pack starter pour votre contenu social",
    shortDescription:
      "Une journée de shooting + montage pro. Idéal pour réseaux sociaux, témoignages clients, vues produit.",
    icon: Camera,
    accent: "#EF4444",
    image: "/photos/story-reels.jpg",
    imageAlt: "Timeline d'un éditeur vidéo professionnel",
    delay: "7 jours",
    priceLabel: "80 000 FCFA",
    priceFcfa: 80000,
    priceSuffix: "shooting + montage",
    related: ["clip-video-creatif", "photo-evenementielle", "avatars-ia"],
  },
  {
    slug: "clip-video-creatif",
    pole: "video-photo",
    name: "Clip Vidéo Créatif",
    flagship: true,
    badge: "Direction artistique complète",
    tagline: "Votre film de marque, écrit, tourné, monté",
    shortDescription:
      "Concept, scénario, tournage, montage, étalonnage. De 500k à 1.5M FCFA selon ampleur.",
    longDescription:
      "Une vidéo de marque haut de gamme avec écriture, story-board, tournage multi-caméra, étalonnage cinéma, sound design. Le standard à exiger pour votre image.",
    icon: Film,
    accent: "#EF4444",
    image: "/photos/story-reels.jpg",
    imageAlt: "Studio de montage vidéo professionnel",
    delay: "14–21 jours",
    priceLabel: "500 000 – 1 500 000 FCFA",
    priceFcfa: 500000,
    priceSuffix: "selon ampleur",
    problem:
      "Vos vidéos actuelles ne reflètent pas votre standing. Mal cadrées, son médiocre, pas de direction artistique. Elles ne convertissent pas.",
    solution:
      "Une production cinéma : concept écrit, story-board, équipement broadcast, étalonnage, mixage. Le résultat est diffusable partout sans complexe.",
    deliverables: [
      "Concept créatif + story-board validé",
      "Tournage multi-caméra (1–2 jours selon ampleur)",
      "Montage HD/4K avec étalonnage cinéma",
      "Sound design + voix-off ou musique licenciée",
      "Déclinaisons formats (16:9, 9:16, 1:1)",
      "Sous-titrage FR/EN",
      "Master + 3 cycles de révisions",
    ],
    related: ["clip-premium", "avatars-ia", "pack-rocket-start"],
  },
  {
    slug: "clip-premium",
    pole: "video-photo",
    name: "Clip Premium",
    badge: "Production haut de gamme",
    tagline: "Quand le standard ne suffit pas",
    shortDescription:
      "Production avec figurants, plusieurs lieux, drone, étalonnage Hollywood. Le niveau au-dessus.",
    icon: Trophy,
    accent: "#EF4444",
    delay: "21–30 jours",
    priceLabel: "2 500 000 FCFA",
    priceFcfa: 2500000,
    priceSuffix: "forfait",
    related: ["clip-video-creatif", "clip-musical-pro"],
  },
  {
    slug: "clip-musical-pro",
    pole: "video-photo",
    name: "Clip Musical Pro",
    badge: "Industrie musicale",
    tagline: "Pour artistes et labels qui visent la diffusion télé",
    shortDescription:
      "Clip musical aux standards de l'industrie : régie, danseurs, post-production avancée, livraison master broadcast.",
    icon: Mic,
    accent: "#EF4444",
    delay: "30–45 jours",
    priceLabel: "4 500 000 FCFA",
    priceFcfa: 4500000,
    priceSuffix: "forfait",
    related: ["clip-premium", "clip-video-creatif"],
  },
  {
    slug: "photo-evenementielle",
    pole: "video-photo",
    name: "Photo Événementielle",
    badge: "Standard ou Premium",
    tagline: "Capturer votre événement avec la juste exigence",
    shortDescription:
      "Photo standard 50–200k FCFA · Premium 800k–1.2M FCFA. Mariages : 100–300k FCFA selon journée.",
    icon: Camera,
    accent: "#EF4444",
    delay: "Selon date",
    priceLabel: "50 000 – 1 200 000 FCFA",
    priceFcfa: 50000,
    priceSuffix: "selon formule",
    related: ["production-video-standard", "clip-video-creatif"],
  },
  {
    slug: "avatars-ia",
    pole: "video-photo",
    name: "Avatars IA & Vidéos Intelligentes",
    flagship: true,
    badge: "HeyGen · Synthesia · clonage vocal",
    tagline: "Vous n'avez plus besoin de vous filmer pour publier tous les jours",
    shortDescription:
      "Création d'avatars virtuels, vidéos générées par IA, clonage vocal multilingue, doublage automatisé.",
    longDescription:
      "Créez un avatar de marque qui parle pour vous 24/7 dans toutes les langues. Génération de vidéos en quelques minutes, sans tournage. Une industrialisation avancée de ces outils au Cameroun.",
    icon: Sparkles,
    accent: "#EF4444",
    delay: "7–14 jours",
    priceLabel: "Sur devis",
    priceFcfa: null,
    priceSuffix: "selon avatar et volume",
    problem:
      "Vous ne pouvez pas être devant la caméra tous les jours. Et engager un comédien pour chaque vidéo coûte cher et prend du temps.",
    solution:
      "On crée votre avatar IA (jumeau numérique ou personnage virtuel). Ensuite vous produisez des vidéos en quelques minutes, dans toutes les langues, à un coût marginal.",
    deliverables: [
      "Création de l'avatar virtuel (jumeau ou personnage)",
      "Clonage vocal multilingue (FR, EN, langues locales)",
      "Banque de scripts validés + générateur",
      "Plateforme de génération en self-service",
      "Formation de votre équipe (2h)",
      "Doublage automatisé pour vidéos existantes",
    ],
    related: ["agent-ia-personnalise", "pack-domination-ia", "clip-video-creatif"],
  },

  // ──────────────────────────────────────────────────────────────────────
  // PÔLE DESIGN
  // ──────────────────────────────────────────────────────────────────────
  {
    slug: "design-graphique-standard",
    pole: "design",
    name: "Design Graphique Standard",
    badge: "Visuels & posts sociaux",
    tagline: "Le design qu'il vous faut, à la demande",
    shortDescription:
      "Visuels, infographies, posts réseaux sociaux. Pour les besoins ponctuels et récurrents.",
    icon: ImageIcon,
    accent: "#8B5CF6",
    delay: "48–72h",
    priceLabel: "60 000 FCFA",
    priceFcfa: 60000,
    priceSuffix: "par lot",
    related: ["brand-starter", "supports-imprimes"],
  },
  {
    slug: "brand-starter",
    pole: "design",
    name: "Pack Identité Visuelle Complète",
    flagship: true,
    badge: "Identité de marque clé en main",
    tagline: "Logo, charte, papeterie, templates — tout pour démarrer pro",
    shortDescription:
      "Logo & déclinaisons, charte graphique, cartes de visite premium, templates réseaux sociaux, modèles documents.",
    longDescription:
      "Le pack qui transforme une idée en marque crédible. Logo travaillé, charte couleurs et typo, papeterie pro, templates Instagram/Facebook prêts à publier.",
    icon: Sparkles,
    accent: "#8B5CF6",
    image: "/photos/brand-starter.jpg",
    imageAlt: "Système de design avec palette de couleurs et templates UI",
    delay: "10–14 jours",
    priceLabel: "À partir de 150 000 FCFA",
    priceFcfa: 150000,
    priceSuffix: "forfait",
    problem:
      "Vous avez une activité mais pas de marque cohérente. Logo bricolé, couleurs aléatoires, papeterie générique. Vous perdez en crédibilité dès le premier contact.",
    solution:
      "Un pack complet, à prix fixe, livré en 2 semaines : logo signature + charte + papeterie + templates social media. Vous ressortez avec une vraie marque.",
    deliverables: [
      "3 propositions de logo + finalisation",
      "Logo livré en 6 formats (SVG, PNG, JPG · couleur, monochrome, blanc)",
      "Charte graphique : palette couleurs, typographie, règles d'usage",
      "Papeterie : carte de visite premium, en-tête lettre, signature email",
      "Templates posts Instagram, Facebook, LinkedIn (Canva éditable)",
      "Modèles documents (devis, factures, présentations)",
      "Brand book PDF de 12 pages",
    ],
    related: ["site-express", "supports-imprimes", "flipbook-pro"],
  },
  {
    slug: "supports-imprimes",
    pole: "design",
    name: "Supports Imprimés",
    badge: "Print · Packaging · Signalétique",
    tagline: "Votre image dans la matière",
    shortDescription:
      "Flyers, affiches, brochures, packaging, étiquetage, signalétique d'entreprise, roll-ups, bâches événementielles.",
    icon: Package,
    accent: "#8B5CF6",
    delay: "7–14 jours",
    priceLabel: "Sur devis",
    priceFcfa: null,
    priceSuffix: "selon volume",
    related: ["brand-starter", "design-graphique-standard"],
  },
  {
    slug: "flipbook-pro",
    pole: "design",
    name: "FlipBook Pro",
    flagship: true,
    badge: "Solution exclusive ACERFI Créativ",
    tagline: "Catalogue & menu numérique interactif",
    shortDescription:
      "Transformez votre catalogue/menu/brochure en flipbook numérique feuilletable, accessible via QR Code.",
    longDescription:
      "FlipBook Pro transforme votre PDF en magazine numérique haut de gamme : feuilletable, hébergé, partageable, mesurable. Mise à jour instantanée — finie l'impression coûteuse à chaque changement de prix.",
    icon: BookOpen,
    accent: "#C9A84C",
    delay: "5 jours",
    priceLabel: "À partir de 99 000 FCFA / an",
    priceFcfa: 99000,
    priceSuffix: "/ an",
    problem:
      "Imprimer un catalogue coûte cher, périme vite et ne se mesure pas. Vos clients ne le gardent pas, vos commerciaux le perdent, vos mises à jour vous obligent à tout réimprimer.",
    solution:
      "Un FlipBook Pro = un lien et un QR Code. Accessible partout, mis à jour en 5 minutes, partageable sur WhatsApp d'un clic. Et vous voyez exactement qui consulte quoi.",
    deliverables: [
      "Conversion PDF → flipbook HD avec animation de page réaliste",
      "QR Code vectoriel personnalisé aux couleurs de votre marque",
      "Lien court partageable + bouton WhatsApp intégré",
      "Hébergement sécurisé HTTPS inclus 12 mois",
      "Statistiques de consultation (vues, pages lues, durée)",
      "Mises à jour selon le plan choisi (1 à illimitées par trimestre)",
      "Support par email (Pro et Business : WhatsApp prioritaire)",
    ],
    steps: [
      { day: "J 0", title: "Brief & contenus", body: "Vous nous envoyez votre PDF (ou vos contenus bruts). On valide ensemble la cible, le ton, les pages." },
      { day: "J + 2", title: "Maquette", body: "On transforme votre contenu en flipbook premium. Maquette envoyée en 48 h." },
      { day: "J + 3", title: "Validation", body: "Aller-retours jusqu'à ce que ce soit parfait. Modifications illimitées avant la mise en ligne." },
      { day: "J + 5", title: "Live", body: "Lien et QR Code livrés. Vous pouvez scanner, partager et suivre les consultations." },
    ],
    faq: [
      { q: "Combien de pages puis-je avoir ?", a: "8 pages en Essentiel, 15 en Pro, 40 en Business. Pour plus, le plan Illimité est sur devis." },
      { q: "Je peux modifier après la mise en ligne ?", a: "Oui, selon votre plan : 1 modif/trimestre en Essentiel, 2 en Pro, 3 en Business, illimité en Illimité." },
      { q: "Faut-il un site web ?", a: "Non. Votre FlipBook a son propre lien. Vous pouvez aussi l'intégrer dans un site existant si vous en avez un." },
      { q: "Ça marche sur les téléphones bas de gamme ?", a: "Oui. Le rendu est optimisé pour 3G et tous les smartphones, y compris en lecture hors-ligne après chargement." },
    ],
    related: ["brand-starter", "site-express", "supports-imprimes"],
  },

  // ──────────────────────────────────────────────────────────────────────
  // PÔLE STRATÉGIE & CONTENU
  // ──────────────────────────────────────────────────────────────────────
  {
    slug: "strategie-contenu",
    pole: "strategie",
    name: "Stratégie de Contenu",
    badge: "Plan éditorial 3 mois",
    tagline: "La feuille de route de votre voix",
    shortDescription:
      "Audit communication + planning éditorial sur 3 mois. Vous savez quoi publier, quand, où et pourquoi.",
    icon: Target,
    accent: "#3B82F6",
    delay: "10 jours",
    priceLabel: "100 000 FCFA",
    priceFcfa: 100000,
    priceSuffix: "forfait",
    related: ["redaction-copywriting", "audit-domination", "pack-domination-ia"],
  },
  {
    slug: "redaction-copywriting",
    pole: "strategie",
    name: "Rédaction & Copywriting",
    badge: "SEO · Posts · Pubs",
    tagline: "Les mots qui vendent et qu'on retient",
    shortDescription:
      "Articles SEO, posts optimisés, accroches publicitaires. Sur commande ou en abonnement.",
    icon: Pen,
    accent: "#3B82F6",
    delay: "48–72h",
    priceLabel: "50 000 FCFA",
    priceFcfa: 50000,
    priceSuffix: "lot ou article",
    related: ["strategie-contenu", "audit-domination"],
  },
  {
    slug: "audit-domination",
    pole: "strategie",
    name: "Audit Domination Concurrentielle",
    badge: "Analyse + plan d'action",
    tagline: "Comprendre vos concurrents pour les dépasser",
    shortDescription:
      "Analyse complète du positionnement, des concurrents et de la stratégie marketing. Livrable actionnable.",
    icon: Trophy,
    accent: "#3B82F6",
    delay: "10–14 jours",
    priceLabel: "150 000 FCFA",
    priceFcfa: 150000,
    priceSuffix: "forfait",
    related: ["strategie-contenu", "pack-conquest-totale"],
  },

  // ──────────────────────────────────────────────────────────────────────
  // PÔLE WEB & DIGITAL
  // ──────────────────────────────────────────────────────────────────────
  {
    slug: "site-express",
    pole: "web",
    name: "Site Vitrine Express",
    flagship: true,
    badge: "Domaine + hébergement 1 an offerts",
    tagline: "Votre site vitrine premium, en ligne en 5 jours",
    shortDescription:
      "One-pager ou vitrine multi-pages premium. Domaine et hébergement 1 an inclus. Paiement unique.",
    longDescription:
      "Un site qui convertit, pas une usine à gaz. Design premium, formulaire, intégration WhatsApp, optimisation mobile. Domaine et hébergement inclus 12 mois.",
    icon: Globe,
    accent: "#10B981",
    image: "/photos/site-express.jpg",
    imageAlt: "Bureau de designer avec écran code et site web premium",
    delay: "5–7 jours",
    priceLabel: "99 000 – 250 000 FCFA",
    priceFcfa: 99000,
    priceSuffix: "paiement unique",
    problem:
      "Vous n'avez pas de site, ou vous avez un site WordPress qui plante, mal référencé, lent et pas mobile. Vos clients ne vous trouvent pas en ligne.",
    solution:
      "Un site one-pager ou vitrine premium : design pro, ultra rapide, mobile-first, avec WhatsApp intégré et formulaire qui marche. Domaine et hébergement inclus.",
    deliverables: [
      "Achat et configuration du nom de domaine .com ou .cm",
      "Hébergement haute performance inclus 12 mois",
      "Site one-pager ou multi-pages design premium responsive",
      "Bouton WhatsApp Business intégré",
      "Formulaire de contact avec emails reçus",
      "Optimisation SEO de base + Google Search Console",
      "Certificat SSL et sauvegardes automatiques",
    ],
    related: ["site-premium-ia", "site-ecommerce", "brand-starter"],
  },
  {
    slug: "site-premium-ia",
    pole: "web",
    name: "Site Premium IA",
    flagship: true,
    badge: "Jusqu'à 10 pages · Contenu IA",
    tagline: "Votre site multi-pages avec contenu généré par IA",
    shortDescription:
      "10 pages, contenu IA, SEO avancé. Pour les agences et marques qui ont des choses à raconter.",
    longDescription:
      "Au-delà de la vitrine express : un vrai site multi-pages avec contenu généré et optimisé par IA, animations Framer-Motion, SEO avancé, intégrations.",
    icon: Sparkles,
    accent: "#10B981",
    delay: "14–21 jours",
    priceLabel: "450 000 – 800 000 FCFA",
    priceFcfa: 450000,
    priceSuffix: "selon pages",
    related: ["site-express", "refonte-ia", "pack-starter-digital"],
  },
  {
    slug: "site-ecommerce",
    pole: "web",
    name: "Site E-commerce",
    badge: "Catalogue + paiement Mobile Money",
    tagline: "Vendre en ligne au Cameroun, sans friction",
    shortDescription:
      "Catalogue, panier, paiement Mobile Money + carte, livraison configurable. La boutique digitale qui marche au Cameroun.",
    icon: Building,
    accent: "#10B981",
    delay: "21–30 jours",
    priceLabel: "À partir de 800 000 FCFA",
    priceFcfa: 800000,
    priceSuffix: "selon catalogue",
    related: ["site-premium-ia", "pack-starter-digital", "bots-conversationnels"],
  },
  {
    slug: "refonte-ia",
    pole: "web",
    name: "Refonte IA",
    badge: "Migration + IA",
    tagline: "Votre site existant boosté à l'IA",
    shortDescription:
      "Refonte complète d'un site obsolète : design moderne + contenu IA + SEO. Sans repartir de zéro.",
    icon: Wand2,
    accent: "#10B981",
    delay: "14–21 jours",
    priceLabel: "300 000 – 600 000 FCFA",
    priceFcfa: 300000,
    priceSuffix: "selon ampleur",
    related: ["site-premium-ia", "site-express"],
  },
  {
    slug: "pack-starter-digital",
    pole: "web",
    name: "Pack Starter Digital",
    flagship: true,
    badge: "Tout-inclus · abonnement mensuel",
    tagline: "Le digital clé en main, avec accompagnement",
    shortDescription:
      "Site web + animation réseaux sociaux + publicité + reporting mensuel + formation équipe. Tout-en-un.",
    longDescription:
      "Le pack qui couvre tout votre digital : on construit, on anime, on achète de la pub, on forme votre équipe et on rend des comptes chaque mois.",
    icon: Rocket,
    accent: "#10B981",
    delay: "Récurrent",
    priceLabel: "300 000 FCFA / mois",
    priceFcfa: 300000,
    priceSuffix: "/ mois",
    deliverables: [
      "Site web premium avec maintenance incluse",
      "Animation réseaux sociaux (3–5 posts / semaine)",
      "Publicité Meta Ads + Google Ads (budget pub en sus)",
      "Reporting mensuel avec recommandations",
      "Formation continue de votre équipe",
      "Account manager dédié",
    ],
    related: ["site-premium-ia", "pack-domination-ia", "pack-rocket-start"],
  },

  // ──────────────────────────────────────────────────────────────────────
  // PÔLE TERRAIN & ÉVÉNEMENTIEL
  // ──────────────────────────────────────────────────────────────────────
  {
    slug: "caravane-mobile",
    pole: "terrain",
    name: "Caravane Marketing",
    flagship: true,
    badge: "Fourgonnette ou Camion Premium",
    tagline: "Le terrain, brandé à vos couleurs",
    shortDescription:
      "Fourgonnette 90k FCFA · Camion Premium avec sonorisation et écran LED 150k FCFA. Activation mobile + animations + flyers.",
    longDescription:
      "Notre caravane mobile va au contact de vos clients. Véhicule brandé, équipe formée, supports print, animation produit, captation photo/vidéo. Idéal pour lancement, ouverture, campagne.",
    icon: Truck,
    accent: "#FF9E2C",
    image: "/images/services/caravane.jpg",
    imageAlt: "Caravane brandée pour campagne d'activation marketing",
    delay: "Variable · 7j minimum",
    priceLabel: "90 000 – 150 000 FCFA",
    priceFcfa: 90000,
    priceSuffix: "/ jour selon véhicule",
    problem:
      "Vous lancez un produit ou ouvrez une boutique : il faut générer du buzz local, du contact direct. Les pubs digitales seules ne suffisent pas.",
    solution:
      "Caravane brandée + équipe sur le terrain + animations. On va dans les quartiers cibles, on parle aux gens, on distribue, on capte les réactions.",
    deliverables: [
      "Habillage complet du véhicule (covering)",
      "Équipe de 2 à 5 animateurs formés à votre marque",
      "Production des supports (flyers, samples, goodies)",
      "Sonorisation et animation micro (Camion Premium : écran LED)",
      "Captation photo & vidéo de l'activation",
      "Reporting détaillé : zones couvertes, contacts, photos, leads",
    ],
    related: ["pack-spectacle-urbain", "evenement-metavers", "pack-rocket-start"],
  },
  {
    slug: "evenement-metavers",
    pole: "terrain",
    name: "Événement Métavers",
    flagship: true,
    badge: "Web3 / VR immersif",
    tagline: "Lancement produit ou événement corporate dans le métavers",
    shortDescription:
      "Expérience immersive Web3 / VR pour le lancement de produit ou l'événement corporate. Avant-gardiste.",
    icon: Layers,
    accent: "#FF9E2C",
    delay: "21–30 jours",
    priceLabel: "400 000 FCFA",
    priceFcfa: 400000,
    priceSuffix: "événement",
    related: ["pack-metavers-pioneer", "caravane-mobile"],
  },
  {
    slug: "pack-spectacle-urbain",
    pole: "terrain",
    name: "Pack Spectacle Urbain",
    badge: "Caravane + animations + photo/vidéo",
    tagline: "Événementiel mobile complet",
    shortDescription:
      "Caravane + animations + photo/vidéo + activation sociale. Le pack festif qui marque.",
    icon: Megaphone,
    accent: "#FF9E2C",
    delay: "14 jours préparation",
    priceLabel: "750 000 FCFA",
    priceFcfa: 750000,
    priceSuffix: "événement clé en main",
    related: ["caravane-mobile", "evenement-metavers", "pack-rocket-start"],
  },

  // ──────────────────────────────────────────────────────────────────────
  // PACKS PREMIUM
  // ──────────────────────────────────────────────────────────────────────
  {
    slug: "pack-rocket-start",
    pole: "packs",
    name: "Pack Rocket Start",
    flagship: true,
    badge: "Lancement 30 jours",
    tagline: "Engagement de résultats sur 30 jours",
    shortDescription:
      "Lancement marketing 30 jours avec garantie de résultats. KPIs définis, prestations correctives offertes si non atteints.",
    longDescription:
      "Le pack qui vous lance fort : stratégie + production créative + campagne digitale + activation. 30 jours de pleine puissance avec garantie de résultats sur les KPIs convenus.",
    icon: Rocket,
    accent: "#FFD700",
    delay: "30 jours d'opération",
    priceLabel: "500 000 FCFA",
    priceFcfa: 500000,
    priceSuffix: "garantie résultats",
    related: ["pack-domination-ia", "campagne-ia-flash", "pack-conquest-totale"],
  },
  {
    slug: "pack-metavers-pioneer",
    pole: "packs",
    name: "Pack Métavers Pioneer",
    badge: "Web3 avant-gardiste",
    tagline: "Présence Web3 : avatars, espaces virtuels, NFT",
    shortDescription:
      "Présence Web3 complète : avatars de marque, espaces virtuels, NFT. Pour les marques qui prennent l'avenir au sérieux.",
    icon: Layers,
    accent: "#FFD700",
    delay: "30–45 jours",
    priceLabel: "750 000 FCFA",
    priceFcfa: 750000,
    priceSuffix: "forfait",
    related: ["evenement-metavers", "avatars-ia"],
  },
  {
    slug: "pack-conquest-totale",
    pole: "packs",
    name: "Pack Conquest Totale",
    flagship: true,
    badge: "Multi-canaux coordonné",
    tagline: "Digital + terrain + IA + événement, ensemble",
    shortDescription:
      "Campagne multi-canaux coordonnée. Tous les pôles activés sur une même cible. Synchronisation parfaite.",
    longDescription:
      "Quand vous voulez frapper fort sur tous les canaux à la fois : digital, terrain, IA, événement — tout coordonné par un account manager dédié, avec reporting unifié.",
    icon: Target,
    accent: "#FFD700",
    delay: "30–60 jours",
    priceLabel: "1 850 000 FCFA",
    priceFcfa: 1850000,
    priceSuffix: "campagne",
    related: ["pack-empire-builder", "pack-rocket-start"],
  },
  {
    slug: "pack-empire-builder",
    pole: "packs",
    name: "Pack Empire Builder",
    flagship: true,
    badge: "Domination 6 mois",
    tagline: "Tous les pôles activés, équipe dédiée, 6 mois",
    shortDescription:
      "Domination marketing totale sur 6 mois. Tous les pôles activés, équipe dédiée, KPIs mensuels.",
    icon: Crown,
    accent: "#FFD700",
    delay: "6 mois d'engagement",
    priceLabel: "3 500 000 FCFA",
    priceFcfa: 3500000,
    priceSuffix: "6 mois",
    related: ["pack-conquest-totale", "pack-domination-ia"],
  },
  {
    slug: "offre-challenger",
    pole: "packs",
    name: "Offre Challenger",
    badge: "Sur mesure aligné concurrence",
    tagline: "On bat la proposition concurrente, ou c'est gratuit",
    shortDescription:
      "Pack sur mesure aligné sur l'offre concurrente, avec engagement de surperformance.",
    icon: Trophy,
    accent: "#FFD700",
    delay: "Sur devis",
    priceLabel: "Selon concurrence",
    priceFcfa: null,
    priceSuffix: "+ engagement surperformance",
    related: ["pack-rocket-start", "pack-conquest-totale", "audit-domination"],
  },
];

export const SERVICE_BY_SLUG = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));

export function getRelatedServices(slug: string): Service[] {
  const service = SERVICE_BY_SLUG[slug];
  if (!service?.related) return [];
  return service.related
    .map((relatedSlug) => SERVICE_BY_SLUG[relatedSlug])
    .filter((s): s is Service => Boolean(s));
}

export function getServicesByPole(poleSlug: string): Service[] {
  return SERVICES.filter((s) => s.pole === poleSlug);
}

export function getFlagshipServices(): Service[] {
  return SERVICES.filter((s) => s.flagship);
}
