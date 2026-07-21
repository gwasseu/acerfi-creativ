"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  Eye,
  FileText,
  Palette,
  Rocket,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    icon: FileText,
    day: "J 0",
    title: "Brief express",
    body: "Vous remplissez un mini-brief en 5 minutes. Vous nous envoyez votre PDF (ou vos contenus, vos photos). On valide ensemble la cible et le ton.",
    accent: "Vous posez les bases",
  },
  {
    icon: Palette,
    day: "J + 2",
    title: "Design sur mesure",
    body: "Notre studio transforme votre contenu en magazine numérique haut de gamme. Maquette envoyée en 48 heures.",
    accent: "On donne vie",
  },
  {
    icon: Eye,
    day: "J + 3",
    title: "Vous validez, on ajuste",
    body: "Aller-retours jusqu'à ce que ce soit parfait. Modifications illimitées avant la mise en ligne.",
    accent: "Vous voyez, vous décidez",
  },
  {
    icon: Rocket,
    day: "J + 5",
    title: "Live & partagé",
    body: "Votre FlipBook est en ligne, scannable depuis n'importe quel téléphone. QR Code fourni, lien WhatsApp, statistiques activées.",
    accent: "Ça décolle",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 30%"],
  });
  const lineHeight = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative w-full px-6 py-24 md:py-32"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent"
      />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
            <Rocket className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Process · 5 jours, montre en main
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            De votre PDF à un{" "}
            <span className="gradient-gold">catalogue qui cartonne</span>
          </h2>
          <p className="mt-5 text-balance text-base text-muted-foreground md:text-lg">
            Nous avons designé un process rapide, transparent et sans surprise.
            Vous savez exactement ce qu&apos;il se passe — à chaque étape.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Ligne de fond */}
          <div
            aria-hidden
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/15 to-transparent md:block"
          />
          {/* Ligne dorée animée au scroll */}
          <motion.div
            aria-hidden
            style={{ scaleY: lineHeight }}
            className="absolute left-1/2 top-0 hidden h-full w-[2px] origin-top -translate-x-1/2 bg-gradient-to-b from-[#f5b400] via-[#ffd93d] to-[#f5b400] md:block"
          />
          {/* Mobile : ligne verticale gauche */}
          <div
            aria-hidden
            className="absolute left-[27px] top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/15 to-transparent md:hidden"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: lineHeight }}
            className="absolute left-[26px] top-0 h-full w-[2px] origin-top bg-gradient-to-b from-[#f5b400] via-[#ffd93d] to-[#f5b400] md:hidden"
          />

          <ul className="space-y-12 md:space-y-20">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isRight = idx % 2 === 1;
              return (
                <Step
                  key={step.title}
                  step={step}
                  Icon={Icon}
                  index={idx}
                  isRight={isRight}
                />
              );
            })}
          </ul>
        </div>

        {/* CTA bas */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Prêt à voir votre premier FlipBook en moins d&apos;une semaine ?
          </p>
          <a
            href="#pricing"
            className={cn(
              buttonVariants({ size: "lg" }),
              "group bg-gradient-gold text-black shadow-[0_8px_30px_rgba(245, 180, 0,0.35)] hover:scale-105 hover:bg-gradient-gold",
            )}
          >
            Voir les tarifs
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

type StepProps = {
  step: (typeof STEPS)[number];
  Icon: typeof FileText;
  index: number;
  isRight: boolean;
};

function Step({ step, Icon, index, isRight }: StepProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-12"
    >
      {/* Checkpoint central (desktop) / gauche (mobile) */}
      <CheckpointDot index={index} />

      {/* Card de gauche (desktop) ou unique (mobile) */}
      <div
        className={cn(
          "pl-16 md:pl-0",
          isRight ? "md:order-2" : "md:order-1",
          isRight ? "md:pr-0 md:pl-12" : "md:pr-12",
        )}
      >
        <ContentCard step={step} Icon={Icon} alignRight={!isRight} />
      </div>

      {/* Spacer côté opposé desktop */}
      <div
        aria-hidden
        className={cn(
          "hidden md:block",
          isRight ? "md:order-1" : "md:order-2",
        )}
      />
    </motion.li>
  );
}

function CheckpointDot({ index }: { index: number }) {
  return (
    <motion.div
      aria-hidden
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay: 0.2 + index * 0.04,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className="absolute left-[19px] top-1 z-10 flex h-4 w-4 items-center justify-center md:left-1/2 md:-translate-x-1/2"
    >
      <span className="absolute inset-0 rounded-full bg-gradient-gold opacity-60 blur-[6px]" />
      <span className="relative h-3 w-3 rounded-full bg-gradient-gold ring-4 ring-background" />
    </motion.div>
  );
}

function ContentCard({
  step,
  Icon,
  alignRight,
}: {
  step: (typeof STEPS)[number];
  Icon: typeof FileText;
  alignRight: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-primary/15 bg-card/40 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/70 hover:shadow-[0_20px_60px_-20px_rgba(245, 180, 0,0.35)] md:p-7",
        alignRight && "md:text-right",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-4",
          alignRight && "md:flex-row-reverse",
        )}
      >
        <motion.div
          initial={{ rotate: -10, scale: 0.7, opacity: 0 }}
          whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.5,
            delay: 0.25,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:border-primary/55"
        >
          <Icon className="h-5 w-5 text-primary" />
        </motion.div>
        <div>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/80">
            {step.day} · {step.accent}
          </span>
          <h3 className="mt-1 font-display text-xl font-semibold md:text-2xl">
            {step.title}
          </h3>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        {step.body}
      </p>
    </div>
  );
}
