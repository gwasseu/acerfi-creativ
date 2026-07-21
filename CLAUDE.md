@AGENTS.md

# ACERFI Creativ — Charte graphique

Cette charte est **non-négociable**. Toute couleur, font ou rayon utilisé dans
le code doit provenir des design tokens. Pas de Tailwind `blue-500`, pas de
hex arbitraire dans les composants.

**Source de vérité** : `lib/design-tokens.ts` (TS) + `app/globals.css` (CSS variables).

---

## ADN visuel

Le logo ACERFI Creativ est une **ampoule stylisée** (métaphore de l'idée
créative qui s'allume) dont le bulbe contient le monogramme **AC** et se
termine par un **filament en zigzag manuscrit**. Tracé en **outline**, traité
en **dégradé doré linéaire** (jaune ambré → or chaud → or profond), wordmark
"ACERFI" en sans-serif géométrique gras anthracite + "creativ" en regular
doré.

**Mood** : lumineux · créatif · chaleureux. Référence : Mucho, Locomotive,
High Tide. Site **dark-mode-only** (or sur noir profond).

---

## Palette

| Token CSS              | Hex       | Usage                                          |
| ---------------------- | --------- | ---------------------------------------------- |
| `--primary`            | `#F5B400` | **Signature gold-500** — CTA, accents, ring    |
| `--primary-light`      | `#FFD93D` | Extrémité claire du dégradé, hover lumineux    |
| `--primary-dark`       | `#D9930B` | Extrémité sombre du dégradé, hover/active      |
| `--filament`           | `#FFD400` | Jaune saturé du squiggle — accents joueurs     |
| `--gold-50` → `--gold-900` | échelle | Pour utilities `bg-gold-300`, `text-gold-700` |
| `--background`         | `#0A0A0A` | Fond charbon ink-900                           |
| `--foreground`         | `#FAFAF7` | Texte principal (blanc cassé chaud)            |
| `--card`               | `#141414` | Surface card                                   |
| `--muted`              | `#1A1A1A` | Surface muted (charcoal du wordmark)           |
| `--muted-foreground`   | `#A8A29E` | Texte secondaire                               |
| `--border`             | `rgba(245,180,0,0.16)` | Bordures dorées subtiles            |
| `--success`            | `#16A34A` | États positifs                                 |
| `--warning`            | `#F59E0B` | Avertissements (distinct du primary)           |
| `--destructive`        | `#DC2626` | Erreurs, suppression                           |
| `--info`               | `#0EA5E9` | Info bleue                                     |

### Gradient signature
```css
linear-gradient(135deg, #FFD93D 0%, #F5B400 50%, #D9930B 100%)
```
Disponible via `.bg-gradient-gold` (background) et `.gradient-gold` (text).
**Ne pas inventer d'autres dégradés** — celui-ci doit rester la seule signature.

---

## Typographie

| Rôle        | Famille              | Variable CSS         | Tailwind     |
| ----------- | -------------------- | -------------------- | ------------ |
| **Display** | Outfit (Google)      | `--font-display`     | `font-display` |
| **Body**    | Plus Jakarta Sans    | `--font-body`        | `font-body`, `font-sans` |
| **Mono**    | JetBrains Mono       | `--font-mono`        | `font-mono`  |

Chargement via `next/font/google` dans `lib/fonts.ts` puis injecté sur `<html>`
par `app/layout.tsx`. Les `<h1>`–`<h6>` héritent automatiquement de
`font-display`. Pour une mise en avant en gold dégradé, combiner
`font-display` + `.gradient-gold`.

---

## Géométrie

- **Border-radius** : `--radius` = `0.75rem` (12px) par défaut. Pills `rounded-full` pour boutons primaires/badges. Sections lg : `rounded-xl` (16px).
- **Style** : flat + gradient linéaire. Pas de skeuomorphisme, pas d'ombres lourdes.
- **Outline > fill** : le logo est en outline, donc privilégier les bordures fines (`border` 1px) sur fond neutre plutôt que des cards très chargées.
- **Shadows** : warm gold-tinted (cf. `--shadow-sm/md/lg/xl/glow`). Le `shadow-glow` est réservé aux éléments brand-clés (CTA principaux, hero badges).

---

## Spacing & z-index

8px-baseline (4 → 128). Échelle Tailwind par défaut convient.

z-index : `--z-dropdown` 1000 → `--z-tooltip` 1700. Voir `lib/design-tokens.ts`.

---

## Assets logo

Tous dans `public/shared/images/Creativ/`. Constantes exportées par
`lib/design-tokens.ts` → `brandAssets.logo.*`.

| Variant     | Fichier                                               | Quand l'utiliser           |
| ----------- | ----------------------------------------------------- | -------------------------- |
| Monogram couleur | `LOGO AC FAVICON COULEUR.png`                    | Header, favicon, social    |
| Monogram blanc   | `LOGO AC FAVICON BLANC.png`                      | Hero sombre sans gradient  |
| Monogram noir    | `LOGO AC FAVICON NOIR.png`                       | Print, mono, sur fond clair |
| Horizontal couleur | `LOGO ACERFI HORIZONTAL  COULEUR NOIR SANS FOND.png` | Header sur fond clair |
| Horizontal blanc | `LOGO ACERFI HORIZONTAL COULEUR BLANC SANS FOND.png` | Header sur fond sombre |
| Horizontal mono  | `LOGO ACERFI HORIZONTAL MONOCHROME NOIR SANS FOND.png` | Footer, print     |
| SVG monochrome   | `Acerfi Creativ.svg`                             | Manipulation `currentColor` |

**Favicon Next 16** : `app/icon.png` + `app/apple-icon.png` + `app/favicon.ico`
(legacy). `theme-color` = `#F5B400`.

---

## Composants brand

- `<Logo />` (`components/ui/logo.tsx`) — props `variant: "color"|"white"|"mono"`, `layout: "monogram"|"horizontal"`, `withWordmark`, `glow`. Adapter la variante au contraste du fond.
- `<Button variant="primary"|"gradient"|"secondary"|"outline"|"ghost"|"link" />` — `gradient` pour les CTA brand-clés (hero, démo).
- `<Card />` — surface `bg-card/60` + `border-primary/15` + radius `xl`. Hérite des tokens, ne jamais override la couleur en dur.

---

## Règles d'utilisation

1. **JAMAIS** de couleur hex en dur dans les composants (sauf gradient signature dans utilities).
2. **JAMAIS** de Tailwind `blue-500`, `red-500`, etc. — seulement les utilities du @theme (`text-primary`, `bg-card`, `text-gold-300`, `text-success`).
3. **JAMAIS** d'autre famille de fonts. Si besoin d'une autre police pour un cas spécifique, l'ajouter à `lib/fonts.ts` et la déclarer ici.
4. Pour des accents par-pôle (ex. couleurs spécifiques de pôles services), utiliser la prop `accent` propagée comme custom property — ne pas créer de tokens globaux.
5. **Dark-mode-only** est volontaire. Ne pas ajouter de mode clair sans alignement préalable.

---

# Chatbot Maya + intégration MAYA Enterprise

**Maya** est l'assistante virtuelle du Groupe ACERFI, présentée comme la
**front-door conversationnelle de MAYA Enterprise** (l'ERP/agents IA
autonomes du groupe). Le même nom côté bot et côté plateforme est
intentionnel — c'est la même famille produit.

LLM : **Google Gemini** (`gemini-2.5-flash` par défaut), via le SDK
`@google/genai`. Knowledge complète (services, secteurs, processus, contact)
injectée dans le `systemInstruction` à chaque requête depuis
`lib/bot-knowledge.ts` — pas de RAG externe.

## Architecture

```
ChatWidget (client) ──► POST /api/chat ──► Google Gemini ────┐
                                                             │
                            ┌── tool: escalate_to_maya ◄─────┘
                            ▼
                     lib/maya-client.ts
                            │
                            ▼  (auth: JWT cache 50min)
                  POST https://maya.acerfi.net/api/tasks
```

## Fichiers

- `components/ui/chat-widget.tsx` — bulle UI (sessionStorage pour persister la conversation par tab — clé `acerfi-creativ:chat-messages:maya-v1`)
- `app/api/chat/route.ts` — boucle agentic Gemini (function calling) + exécution du tool d'escalade
- `lib/bot-knowledge.ts` — knowledge ACERFI (extraite de `content/*.ts` + `lib/acerfi.ts`) + system prompt persona "Maya"
- `lib/maya-client.ts` — client MAYA Enterprise avec auth JWT cachée + escalation `POST /api/tasks`

## Variables d'environnement requises

```
GEMINI_API_KEY           # obligatoire — sans, /api/chat retourne 503
GEMINI_MODEL             # optionnel, défaut gemini-2.5-flash
MAYA_API_BASE            # optionnel, défaut https://maya.acerfi.net
MAYA_SERVICE_EMAIL       # compte service à créer dans MAYA Enterprise
MAYA_SERVICE_PASSWORD    # idem
```

Si `MAYA_SERVICE_EMAIL` est vide : le bot continue à converser, l'escalade
échoue gracieusement et propose au visiteur le WhatsApp +237 695 08 08 08.

## Pourquoi Gemini ?

Choix Guy (2026-05-05) : clé Google déjà disponible côté groupe + tarification
Flash plus agressive que Haiku pour ce volume. Le SDK `@google/genai` gère
function calling de façon similaire à Anthropic (tools → functionCalls →
functionResponses). Migration depuis Anthropic faite proprement, voir
historique git si besoin de revenir.

**Note** : pas de prompt caching activé pour l'instant (Gemini propose le
context caching mais avec une API explicite plus lourde que `cache_control`
de Claude). Si le volume de requêtes justifie l'optim, créer un cache
explicite via `ai.caches.create()` sur le bloc knowledge et le passer en
`cachedContent`.

## API MAYA Enterprise — endpoints connus (auth JWT requise)

Découverts par probing — schémas exacts à confirmer avec la doc officielle :

- `POST /api/auth/login` → `{email, password}` → `{success, token}` (présumé)
- `GET /api/auth/me` → user profil
- `GET /api/users` · `/api/tasks` · `/api/contacts` · `/api/projects` · `/api/notifications` · `/api/dashboard` · `/api/support`
- Pas d'endpoint public d'intake (`/api/public/*` n'existe pas) → service account obligatoire pour escalader

**Quand tu auras le schéma exact de `POST /api/tasks`**, ajuste le payload
construit dans `lib/maya-client.ts > escalateToMaya()` (champs `title`,
`description`, `priority`, `type`, `source`, `contact`, `metadata`).

## Persona Maya

- Nom : **Maya** (assistante virtuelle du Groupe ACERFI / front-door MAYA Enterprise)
- Rôle : qualifier + orienter + créer une tâche dans MAYA Enterprise (pas de booking calendrier)
- Ton : chaleureux, concis, sans emojis sauf si l'utilisateur en utilise
- Multilingue : français par défaut, anglais si l'utilisateur écrit en anglais
- Règle d'or : **n'invente jamais** un prix/délai/service hors knowledge

Modifier la persona : `BOT_SYSTEM_PROMPT` dans `lib/bot-knowledge.ts`. La
knowledge en revanche est **régénérée à chaque requête** depuis les fichiers
content/* — pas de duplication, source de vérité unique.
