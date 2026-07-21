import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

/**
 * Display — geometric sans-serif, mirrors the "ACERFI" wordmark of the
 * official logo (bold, all-caps, generous tracking, straight terminals).
 * Variable font, weights 100→900.
 */
export const fontDisplay = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

/**
 * Body — humanist geometric sans, harmonizes with Outfit at smaller sizes
 * without competing with display weights. Mirrors the "creativ" sub-mark
 * personality (lighter, regular weight).
 */
export const fontBody = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

/**
 * Mono — for technical captions, code, file references. Used sparingly.
 */
export const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

/**
 * Combined className string for the <html> root. Exposes all three fonts
 * as CSS variables (--font-display, --font-body, --font-mono) consumed by
 * Tailwind v4 @theme in globals.css.
 */
export const fontVariables = `${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`;
