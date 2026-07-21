/**
 * ACERFI CREATIV — Design Tokens
 *
 * Source of truth for the visual identity, extracted from the official
 * ACERFI Creativ logo (light bulb monogram with gold gradient + handwritten
 * filament). Every color, radius, shadow and font in the codebase MUST come
 * from these tokens — no arbitrary Tailwind colors (blue-500, etc.).
 *
 * Tokens are mirrored as CSS variables in app/globals.css (@theme block) so
 * Tailwind v4 utilities map onto them. Importing from this file is for
 * TypeScript consumers (component logic, framer-motion props, canvas,
 * dynamic gradients, OG image generators, etc.).
 *
 * Logo asset path: /shared/images/Creativ/
 */

export const colors = {
  // ── GOLD (signature, extracted from the logo gradient) ──────────────
  gold: {
    50: "#FFF8DC",
    100: "#FFEFA8",
    200: "#FFE066",
    300: "#FFD93D", // light end of the logo gradient
    400: "#FFCC1A",
    500: "#F5B400", // PRIMARY — dominant tone of the logo gradient
    600: "#D9930B", // dark end of the logo gradient + hover state
    700: "#A66E08",
    800: "#7A4F05",
    900: "#4D3103",
  },

  // ── FILAMENT (the saturated yellow of the squiggle, joyful accent) ──
  filament: "#FFD400",

  // ── INK (charcoal of the "ACERFI" wordmark + warm-tinted neutrals) ──
  ink: {
    50: "#FAFAF7", // paper — slightly warm white, harmonizes with gold
    100: "#E7E5E0",
    200: "#D6D3CD",
    300: "#A8A29E", // muted-foreground
    400: "#78716C",
    500: "#3A3A3A",
    600: "#262626",
    700: "#1A1A1A", // exact charcoal of the wordmark
    800: "#141414", // card surface
    900: "#0A0A0A", // background
    950: "#050505", // deep wells (footer)
  },

  // ── SEMANTIC (state colors, kept distinct from the gold) ────────────
  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#DC2626",
  info: "#0EA5E9",
} as const;

/**
 * Signature gradient — the diagonal gold sweep of the logo bulb.
 * Use for hero CTAs, premium badges, brand moments. Do not invent gradient
 * variations; always reuse this exact stop sequence to stay on-brand.
 */
export const gradients = {
  signature:
    "linear-gradient(135deg, #FFD93D 0%, #F5B400 50%, #D9930B 100%)",
  signatureSubtle:
    "linear-gradient(135deg, rgba(255,217,61,0.15) 0%, rgba(245,180,0,0.15) 50%, rgba(217,147,11,0.15) 100%)",
  text: "linear-gradient(135deg, #FFD93D 0%, #F5B400 50%, #FFE066 100%)",
} as const;

/**
 * 8px-baseline spacing scale. All paddings, margins and gaps should come
 * from here so vertical rhythm stays consistent.
 */
export const spacing = {
  0: "0",
  1: "0.25rem", // 4
  2: "0.5rem", // 8
  3: "0.75rem", // 12
  4: "1rem", // 16
  5: "1.25rem", // 20
  6: "1.5rem", // 24
  8: "2rem", // 32
  10: "2.5rem", // 40
  12: "3rem", // 48
  16: "4rem", // 64
  20: "5rem", // 80
  24: "6rem", // 96
  32: "8rem", // 128
} as const;

/**
 * Border-radius scale. The logo bulb is a perfect circle, so we lean into
 * generous rounding — pill (full) for buttons/badges, lg for sections.
 */
export const radii = {
  none: "0",
  sm: "0.375rem", // 6  — inputs
  md: "0.5rem", // 8   — small surfaces
  lg: "0.75rem", // 12 — DEFAULT for cards, panels
  xl: "1rem", // 16    — large blocks, modals
  "2xl": "1.5rem", // 24
  full: "9999px", // pills, avatars
} as const;

/**
 * Warm gold-tinted shadows. The standard neutral grey drop-shadow feels
 * cold against this palette, so all elevation tokens carry a faint amber
 * tint. Use sparingly — flat is the brand default.
 */
export const shadows = {
  sm: "0 1px 2px 0 rgba(245, 180, 0, 0.08)",
  md: "0 4px 12px -2px rgba(245, 180, 0, 0.12), 0 2px 4px -2px rgba(0, 0, 0, 0.18)",
  lg: "0 10px 30px -8px rgba(245, 180, 0, 0.20), 0 4px 8px -4px rgba(0, 0, 0, 0.24)",
  xl: "0 24px 60px -16px rgba(245, 180, 0, 0.28), 0 8px 16px -8px rgba(0, 0, 0, 0.32)",
  glow: "0 0 40px rgba(245, 180, 0, 0.28)",
  glowStrong:
    "0 0 64px rgba(245, 180, 0, 0.42), 0 0 0 1px rgba(245, 180, 0, 0.32)",
} as const;

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  header: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  toast: 1600,
  tooltip: 1700,
  cursor: 9999,
} as const;

/**
 * Asset paths. Use these constants instead of inline string paths so that
 * if the logo directory is ever migrated, only this file needs to change.
 */
export const brandAssets = {
  logo: {
    horizontalColor:
      "/shared/images/Creativ/LOGO ACERFI HORIZONTAL  COULEUR NOIR SANS FOND.png",
    horizontalWhite:
      "/shared/images/Creativ/LOGO ACERFI HORIZONTAL COULEUR BLANC SANS FOND.png",
    horizontalMono:
      "/shared/images/Creativ/LOGO ACERFI HORIZONTAL MONOCHROME NOIR SANS FOND.png",
    monogramColor: "/shared/images/Creativ/LOGO AC FAVICON COULEUR.png",
    monogramWhite: "/shared/images/Creativ/LOGO AC FAVICON BLANC.png",
    monogramBlack: "/shared/images/Creativ/LOGO AC FAVICON NOIR.png",
    svgMono: "/shared/images/Creativ/Acerfi Creativ.svg",
  },
} as const;

export type ColorToken = keyof typeof colors.gold | keyof typeof colors.ink;
