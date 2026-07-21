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
};

export default nextConfig;
