"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, BookOpen, QrCode, Share2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACERFI } from "@/lib/acerfi";

const FlippingBook = dynamic(
  () => import("@/components/ui/flipping-book").then((m) => m.FlippingBook),
  {
    ssr: false,
    loading: () => <div className="h-[480px] w-[340px]" aria-hidden />,
  },
);

const HOOKS = [
  { icon: Sparkles, text: "Création" },
  { icon: BookOpen, text: "IA & Avatars" },
  { icon: QrCode, text: "Automatisation" },
  { icon: Share2, text: "Performance" },
];

// "L'Agence Créative Augmentée par l'IA"
const TITLE_LINE_1: Array<{ word: string; italic?: boolean; gold?: boolean }> = [
  { word: "L'Agence" },
  { word: "Créative" },
];
const TITLE_LINE_2: Array<{ word: string; italic?: boolean; gold?: boolean }> = [
  { word: "Augmentée", italic: true, gold: true },
  { word: "par" },
  { word: "l'IA.", italic: true, gold: true },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], reduce ? ["0%", "0%"] : ["0%", "20%"]);
  const bgScale = useTransform(scrollY, [0, 800], reduce ? [1, 1] : [1, 1.1]);
  const overlayOpacity = useTransform(scrollY, [0, 600], reduce ? [0.6, 0.6] : [0.6, 0.9]);
  const contentY = useTransform(scrollY, [0, 600], reduce ? ["0%", "0%"] : ["0%", "8%"]);
  const contentOpacity = useTransform(scrollY, [0, 500], reduce ? [1, 1] : [1, 0.6]);
  const scrollHintOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden pt-24"
    >
      {/* Image de fond + parallax */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-20"
      >
        <Image
          src="/images/services/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Couches d'overlay */}
      <motion.div
        aria-hidden
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/80 to-black/45"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(245, 180, 0,0.20), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(245, 180, 0,0.08) 1px, transparent 0)",
          backgroundSize: "32px 32px",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
        }}
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 px-6 py-12 lg:grid-cols-[1.4fr_1fr] lg:py-16"
      >
        {/* COL G : titre + texte */}
        <div className="text-left">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-primary"
          >
            <span aria-hidden className="h-px w-8 bg-primary/60 md:w-12" />
            <span>{ACERFI.creativ.name}</span>
            <span className="text-foreground/30">/</span>
            <span className="text-foreground/55">{ACERFI.creativ.positioning}</span>
          </motion.div>

          <h1 className="font-display font-light leading-[0.95] tracking-tighter">
            <span className="block">
              {TITLE_LINE_1.map((token, idx) => (
                <motion.span
                  key={`l1-${idx}`}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.3 + idx * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={cn(
                    "mr-[0.18em] inline-block text-[clamp(2.4rem,7.5vw,6.5rem)]",
                    token.italic && "italic",
                    token.gold && "gradient-gold",
                  )}
                >
                  {token.word}
                </motion.span>
              ))}
            </span>
            <span className="block">
              {TITLE_LINE_2.map((token, idx) => (
                <motion.span
                  key={`l2-${idx}`}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.3 + (idx + TITLE_LINE_1.length) * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={cn(
                    "mr-[0.18em] inline-block text-[clamp(2.4rem,7.5vw,6.5rem)]",
                    token.italic && "italic",
                    token.gold && "gradient-gold",
                  )}
                >
                  {token.word}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-8 max-w-lg text-balance text-base leading-relaxed text-foreground/70 md:text-lg"
          >
            Du design à l&apos;automatisation, nous transformons vos idées en
            performance digitale. Studio créatif et marketing IA basé à
            Yaoundé, au service des marques africaines ambitieuses.
          </motion.p>

          {/* Hooks */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-7 grid max-w-lg grid-cols-2 gap-2.5 sm:grid-cols-4"
          >
            {HOOKS.map((h) => {
              const Icon = h.icon;
              return (
                <div
                  key={h.text}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] font-medium text-foreground/70 backdrop-blur"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="truncate">{h.text}</span>
                </div>
              );
            })}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/contact"
              data-cursor="link"
              data-cursor-label="Démarrer →"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(245, 180, 0,0.35)] transition-all duration-300 hover:scale-105"
            >
              Démarrer mon projet
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/services"
              data-cursor="link"
              data-cursor-label="Services"
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/60 hover:bg-primary/[0.08]"
            >
              Découvrir nos services
            </Link>
          </motion.div>
        </div>

        {/* COL D : FlippingBook desktop only */}
        <motion.div
          initial={{ opacity: 0, x: 40, rotateY: -25 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1.1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:flex lg:justify-end motion-safe:animate-[float_6s_ease-in-out_infinite]"
        >
          <FlippingBook />
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        style={{ opacity: scrollHintOpacity }}
        className="pointer-events-none absolute bottom-8 right-6 z-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-foreground/50 md:right-10"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDownRight className="h-4 w-4 text-primary" />
        </motion.span>
      </motion.div>
    </section>
  );
}
