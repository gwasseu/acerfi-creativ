/**
 * Knowledge base used by the Maya chatbot. Aggregates the structured
 * content already present in the codebase (services, sectors, corporate
 * identity) into a flat plain-text representation injected into the
 * Gemini systemInstruction at each request.
 *
 * Content here is a snapshot at request time — `buildKnowledgeBase()` is
 * pure and synchronous, so the result is stable across requests with the
 * same code (necessary if we ever wire Gemini context caching).
 */

import { ACERFI } from "@/lib/acerfi";
import { POLES, SERVICES } from "@/content/services";
import { SECTORS } from "@/content/sectors";

function fmtPrice(s: {
  priceLabel?: string | null;
  priceFcfa?: number | null;
}): string {
  if (s.priceLabel) return s.priceLabel;
  if (s.priceFcfa) return `${s.priceFcfa.toLocaleString("fr-FR")} FCFA`;
  return "sur devis";
}

export function buildKnowledgeBase(): string {
  const a = ACERFI;
  const sections: string[] = [];

  // ── 1. IDENTITÉ ─────────────────────────────────────────────────────
  sections.push(`# ACERFI Créativ — Identité

**Nom officiel** : ${a.creativ.name}
**Tagline** : ${a.creativ.tagline}
**Positionnement** : ${a.creativ.positioning}
**Description** : ${a.creativ.description}

**Mission** : ${a.creativ.mission}
**Vision** : ${a.creativ.vision}

**Groupe** : ${a.group.legalName} — ${a.group.positioning}, fondé en ${a.group.foundedYear}, ${a.group.yearsExperience} d'expérience.
**Maison-mère** : ${a.group.parentCompany.name} (${a.group.parentCompany.certification} depuis ${a.group.parentCompany.since}).
**Clients** : ${a.group.clientsCount} accompagnés au ${a.group.clientsArea}.

## Piliers
${a.creativ.pillars.map((p) => `- **${p.title}** : ${p.body}`).join("\n")}

## Valeurs
${a.creativ.values.map((v) => `- **${v.title}** : ${v.body}`).join("\n")}`);

  // ── 2. CONTACT ─────────────────────────────────────────────────────
  sections.push(`# Contact

- **Téléphones** : ${a.contact.phones.join(" / ")}
- **WhatsApp** : ${a.contact.whatsapp} (${a.contact.whatsappLabel})
- **Email principal** : ${a.contact.emails.primary}
- **Horaires** : ${a.contact.hours.weekday} · ${a.contact.hours.saturday} · ${a.contact.hours.sunday}
- **SLA devis** : ${a.contact.quoteSLA}
- **Adresses** :
${a.contact.addresses.map((ad) => `  - ${ad.city} : ${ad.line}${ad.primary ? " (siège)" : ""}`).join("\n")}
- **Réseaux** : ${a.socials.map((s) => `${s.label} (${s.href})`).join(", ")}`);

  // ── 3. ÉCOSYSTÈME ──────────────────────────────────────────────────
  sections.push(`# Écosystème ACERFI

${a.ecosystem
  .map(
    (e) =>
      `- **${e.name}** (${e.url}) — ${e.description}${e.current ? " ← *vous êtes ici*" : ""}`,
  )
  .join("\n")}`);

  // ── 4. PÔLES ───────────────────────────────────────────────────────
  sections.push(`# Pôles

ACERFI Créativ est organisé en 6 pôles complémentaires :

${POLES.map(
  (p) => `## ${p.name} (slug: \`${p.slug}\`)
**Tagline** : ${p.tagline}
${p.description}`,
).join("\n\n")}`);

  // ── 5. SERVICES ────────────────────────────────────────────────────
  sections.push(`# Catalogue services (${SERVICES.length} services)

${SERVICES.map((s) => {
  const flag = s.flagship ? " [FLAGSHIP]" : "";
  const pole = POLES.find((p) => p.slug === s.pole)?.name ?? s.pole;
  return `## ${s.name}${flag}
- **Slug** : \`${s.slug}\` (URL : /services/${s.slug})
- **Pôle** : ${pole}
- **Tagline** : ${s.tagline}
- **Description** : ${s.shortDescription}
- **Prix** : ${fmtPrice(s)}
- **Délai** : ${s.delay ?? "à confirmer selon scope"}`;
}).join("\n\n")}`);

  // ── 6. SECTEURS ────────────────────────────────────────────────────
  sections.push(`# Secteurs accompagnés (${SECTORS.length})

${SECTORS.map(
  (s) => `## ${s.name} (slug: \`${s.slug}\`)
**Tagline** : ${s.tagline}
${s.shortDescription}`,
).join("\n\n")}`);

  // ── 7. PROCESSUS ───────────────────────────────────────────────────
  sections.push(`# Processus de travail

${a.process
  .map(
    (st) =>
      `**Étape ${st.step} — ${st.title}** (${st.window})
${st.body}`,
  )
  .join("\n\n")}`);

  // ── 8. TRUST BADGES ────────────────────────────────────────────────
  sections.push(`# Chiffres-clés
${a.trustBadges.map((b) => `- **${b.value}** ${b.label}`).join("\n")}`);

  return sections.join("\n\n---\n\n");
}

/**
 * Bot persona + behavior rules. Kept separate from the knowledge block so we
 * can tune the persona independently of the (larger, more stable) catalogue.
 */
export const BOT_SYSTEM_PROMPT = `Tu es **Maya**, l'assistante virtuelle du Groupe ACERFI. Tu vis sur le site ACERFI Créativ pour aider les visiteurs, et tu es la **front-door conversationnelle de MAYA Enterprise** — la plateforme d'agents IA autonomes du groupe (CRM, ventes, support, comptabilité, social media). Tu n'es donc pas seulement un bot d'info : tu peux **créer une tâche dans MAYA Enterprise** pour qu'un membre de l'équipe ou un agent IA autonome reprenne la conversation.

# Ton rôle
Aider les visiteurs du site à :
1. Comprendre ce qu'ACERFI Créativ propose (services, secteurs, tarifs, processus)
2. Identifier le service ou pack adapté à leur besoin
3. Donner une fourchette de prix et un délai indicatif
4. **Créer une tâche dans MAYA Enterprise** quand la demande dépasse la simple info (devis sur mesure, démo, brief projet, urgence, demande VIP) — via l'outil \`escalate_to_maya\`

# Ton ton
- **Chaleureux et concis** — tu représentes une agence créative premium, pas un call-center
- **Tutoie ou vouvoie selon l'utilisateur** — adapte-toi à son registre
- **Phrases courtes**, listes à puces si plusieurs points
- **Français par défaut**, anglais si l'utilisateur écrit en anglais
- Évite le jargon corporate — parle comme un humain qui connaît son métier
- **Pas d'emojis du tout** dans tes réponses, sauf si l'utilisateur en a déjà mis dans le message en cours. Cite les pôles uniquement par leur nom (ex: "Intelligence Artificielle", "Vidéo & Photo")

# Règles strictes
- Ne **jamais inventer** un prix, un délai ou un service. Si l'info n'est pas dans ta knowledge, dis-le et propose de créer une tâche pour qu'un humain confirme.
- Pour tout devis sur mesure, projet complexe, ou demande de démo : **utilise l'outil escalate_to_maya** après avoir collecté nom + email + résumé du besoin (téléphone et secteur sont un plus).
- Ne **demande pas plus d'infos que nécessaire** — collecte le minimum pour qualifier (besoin + contact), puis crée la tâche.
- Si l'utilisateur pose une question sur **MAYA Enterprise lui-même** (la plateforme d'agents IA autonomes), tu peux y répondre directement (tu *en fais partie*) — décris-la comme la suite ERP/CRM/agents IA du groupe, et redirige vers https://maya.acerfi.net pour s'inscrire ou voir les démos. Pour un projet d'intégration MAYA Enterprise concret, escalade.
- Si la demande concerne **ACERFI Formation**, redirige vers https://formation.acerfi.net.
- Si l'utilisateur veut juste discuter ou tester le bot, tu peux jouer le jeu mais reste poli et garde le focus business.

# Quand utiliser \`escalate_to_maya\`
Tu **dois** appeler l'outil dans ces cas :
- Demande de devis chiffré sur mesure
- Demande de démo personnalisée
- Brief de projet (logo, site, campagne, vidéo, intégration MAYA Enterprise)
- Question sur la disponibilité de l'équipe / planning
- Plainte ou demande sensible
- Toute demande où l'utilisateur fournit son contact pour être recontacté

Tu peux **éviter** l'escalade si :
- C'est une question FAQ que tu peux répondre directement (tarifs des packs standards, délais, périmètre d'un service)
- L'utilisateur explore juste / pose une question d'orientation
- L'utilisateur demande à parler humain immédiatement → propose le WhatsApp directement (+237 695 08 08 08, https://wa.me/237695080808) plutôt qu'une tâche asynchrone

# Knowledge base
Toutes les informations dont tu as besoin se trouvent dans le bloc "ACERFI Créativ — Knowledge" qui suit. **Ne sors jamais de cette knowledge** pour inventer des faits.`;
