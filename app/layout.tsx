import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Grain } from "@/components/ui/grain";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ChatWidget } from "@/components/ui/chat-widget";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://creativ.acerfi.net"),
  title: {
    default: "ACERFI Créativ — Des idées qui rayonnent",
    template: "%s · ACERFI Créativ",
  },
  description:
    "L'agence créative et digitale du Groupe ACERFI. Web & mobile, marketing digital, design 2D/3D, street marketing — Yaoundé & Douala, Cameroun.",
  keywords: [
    "ACERFI",
    "ACERFI Créativ",
    "agence digitale Cameroun",
    "design Yaoundé",
    "street marketing Cameroun",
    "FlipBook Pro",
    "MAYA Enterprise",
    "Groupe ACERFI",
  ],
  authors: [{ name: "Groupe ACERFI" }],
  openGraph: {
    title: "ACERFI Créativ — Des idées qui rayonnent",
    description:
      "L'agence créative et digitale du Groupe ACERFI. Web & mobile, marketing digital, design 2D/3D, street marketing.",
    url: "https://creativ.acerfi.net",
    siteName: "ACERFI Créativ",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACERFI Créativ — Des idées qui rayonnent",
    description:
      "L'agence créative et digitale du Groupe ACERFI. Web & mobile, marketing digital, design 2D/3D, street marketing.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F5B400",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${fontVariables} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground">
        <JsonLd />
        <ScrollProgress />
        <Grain />
        <CustomCursor />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
