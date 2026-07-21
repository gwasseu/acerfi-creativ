"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";

const LANE_TOP = [
  "Agents IA",
  "Avatars virtuels",
  "Production Vidéo",
  "Identité de Marque",
  "Sites IA",
  "Caravane Marketing",
  "Bots WhatsApp",
  "Métavers",
];

const LANE_BOTTOM = [
  "Yaoundé · Douala",
  "Microsoft Gold Partner depuis 1993",
  "100+ clients",
  "30+ ans d'expertise",
  "IA générative industrialisée",
  "Groupe ACERFI",
];

export function MarqueeBand() {
  return (
    <motion.section
      aria-hidden
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full border-y border-primary/10 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent py-8"
    >
      <Marquee speed={50} pauseOnHover>
        {LANE_TOP.map((item, i) => (
          <Token key={`top-${item}-${i}`} label={item} />
        ))}
      </Marquee>

      <div className="h-3" />

      <Marquee speed={75} reverse pauseOnHover>
        {LANE_BOTTOM.map((item, i) => (
          <Token key={`bot-${item}-${i}`} label={item} muted />
        ))}
      </Marquee>
    </motion.section>
  );
}

function Token({ label, muted = false }: { label: string; muted?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-12">
      <span
        className={
          muted
            ? "font-display text-2xl italic text-foreground/30 md:text-3xl"
            : "font-display text-3xl italic text-foreground/55 transition-colors hover:text-primary md:text-5xl"
        }
      >
        {label}
      </span>
      <Star muted={muted} />
    </div>
  );
}

function Star({ muted }: { muted: boolean }) {
  const size = muted ? 10 : 14;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      className={
        muted
          ? "shrink-0 text-primary/25"
          : "shrink-0 text-primary/45 motion-safe:animate-[float_4s_ease-in-out_infinite]"
      }
      fill="currentColor"
      aria-hidden
    >
      <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" />
    </svg>
  );
}
