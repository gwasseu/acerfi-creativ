import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 jours
  },
  allowedDevOrigins: ["creativ.acerfi.net"],
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // Container 2GB — le typecheck en fin de build tape l'OOM.
  // On vérifie via `pnpm exec tsc --noEmit` hors build.
  typescript: { ignoreBuildErrors: true },
  async redirects() {
    return [
      { source: "/secteurs/restaurants-hotels", destination: "/secteurs/restauration", permanent: true },
      { source: "/secteurs/boutiques-retail", destination: "/secteurs/commerce", permanent: true },
      { source: "/secteurs/ecoles-formations", destination: "/secteurs/education", permanent: true },
      { source: "/secteurs/pme-entrepreneurs", destination: "/secteurs/pme", permanent: true },
    ];
  },
};

export default nextConfig;
