"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Crown,
  Infinity as InfinityIcon,
  Star,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/ui/tilt-card";
import { CountUp } from "@/components/ui/count-up";
import { cn } from "@/lib/utils";

type Plan = {
  name: string;
  tagline: string;
  priceFcfa: number | null;
  priceLabel?: string;
  icon: typeof Zap;
  features: string[];
  cta: string;
  highlight?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Essentiel",
    tagline: "TPE & Indépendants",
    priceFcfa: 99000,
    icon: Zap,
    features: [
      "8 pages",
      "1 mise à jour / trimestre",
      "QR Code dédié",
      "Design professionnel",
      "Lien partageable",
      "Support email",
      "Livraison en 5 jours",
    ],
    cta: "Choisir Essentiel",
  },
  {
    name: "Pro",
    tagline: "PME & Commerces",
    priceFcfa: 199000,
    icon: Star,
    features: [
      "15 pages",
      "2 mises à jour / trimestre",
      "QR Code dédié",
      "Design premium sur mesure",
      "Statistiques de consultation",
      "Partage WhatsApp optimisé",
      "Support prioritaire",
      "Livraison en 5 jours",
    ],
    cta: "Choisir Pro",
    highlight: true,
  },
  {
    name: "Business",
    tagline: "Agences & Grands comptes",
    priceFcfa: 350000,
    icon: Crown,
    features: [
      "40 pages",
      "3 mises à jour / trimestre",
      "Multi-catalogues possibles",
      "Design haut de gamme",
      "Analytics avancés",
      "Intégration site web",
      "Account manager dédié",
      "Livraison en 5 jours",
    ],
    cta: "Choisir Business",
  },
];

const formatFcfa = (n: number) =>
  new Intl.NumberFormat("fr-FR")
    .format(Math.round(n))
    .replace(/[ \s]/g, " ");

export function Pricing() {
  return (
    <section id="pricing" className="relative w-full px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <Badge variant="default" className="mb-6">
            FlipBook Pro · Tarifs annuels FCFA
          </Badge>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Des prix{" "}
            <span className="gradient-gold">accessibles</span>
          </h2>
          <p className="mt-6 text-balance text-base text-muted-foreground md:text-lg">
            Moins cher qu&apos;une impression papier. Et infiniment plus
            puissant. Mise en ligne en moins de 5 jours après réception
            de vos contenus.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PLANS.map((plan, idx) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(plan.highlight && "md:-translate-y-4")}
              >
                <TiltCard
                  intensity={plan.highlight ? 7 : 5}
                  glare={plan.highlight}
                >
                  <Card
                    className={cn(
                      "relative h-full overflow-hidden transition-all duration-500 hover:border-primary/40",
                      plan.highlight &&
                        "border-primary/55 bg-gradient-to-b from-primary/[0.08] to-transparent glow-pulse",
                    )}
                  >
                    {plan.highlight && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{
                          duration: 0.5,
                          delay: 0.4,
                          ease: [0.34, 1.56, 0.64, 1],
                        }}
                        className="absolute -top-3 left-1/2 -translate-x-1/2"
                      >
                        <span className="rounded-full bg-gradient-gold px-4 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-black shadow-[0_4px_20px_rgba(245, 180, 0,0.45)]">
                          Le plus populaire
                        </span>
                      </motion.div>
                    )}
                    <CardHeader className="pb-4 pt-7">
                      <motion.div
                        initial={{ rotate: -8, scale: 0.7, opacity: 0 }}
                        whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{
                          duration: 0.6,
                          delay: idx * 0.1 + 0.15,
                          ease: [0.34, 1.56, 0.64, 1],
                        }}
                        className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 transition-transform duration-300 hover:scale-110 hover:rotate-6"
                      >
                        <Icon className="h-5 w-5 text-primary" />
                      </motion.div>
                      <CardTitle className="font-display text-2xl">
                        {plan.name}
                      </CardTitle>
                      <CardDescription>{plan.tagline}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="mb-6 flex items-baseline gap-2">
                        <span className="font-display text-5xl font-bold tracking-tight text-foreground">
                          <CountUp
                            value={plan.priceFcfa ?? 0}
                            format={formatFcfa}
                          />
                        </span>
                        <span className="text-sm text-muted-foreground">
                          FCFA / an
                        </span>
                      </div>
                      {plan.priceFcfa && (
                        <p className="-mt-4 mb-6 text-xs text-muted-foreground/70">
                          Soit{" "}
                          {Math.round(plan.priceFcfa / 365).toLocaleString(
                            "fr-FR",
                          )}{" "}
                          FCFA / jour
                        </p>
                      )}
                      <ul className="space-y-3 text-sm">
                        {plan.features.map((feat, fIdx) => (
                          <motion.li
                            key={feat}
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{
                              duration: 0.35,
                              delay: idx * 0.1 + 0.3 + fIdx * 0.04,
                            }}
                            className="flex items-start gap-2.5"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span className="text-muted-foreground">
                              {feat}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Link
                        href="/contact?plan=flipbook"
                        className={cn(
                          buttonVariants({
                            variant: plan.highlight ? "default" : "outline",
                          }),
                          "w-full",
                          plan.highlight &&
                            "bg-gradient-gold text-black hover:bg-gradient-gold hover:scale-[1.02]",
                        )}
                      >
                        {plan.cta}
                      </Link>
                    </CardFooter>
                  </Card>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Plan Illimité — sur devis */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-10 max-w-3xl"
        >
          <div className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-primary/20 bg-card/40 p-7 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:bg-card/60 md:flex-row md:gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
              <InfinityIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="font-display text-xl font-semibold">
                Illimité <span className="text-muted-foreground">— Sur devis</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Catalogues illimités, MAJ illimitées, pour entreprises et
                groupes. SLA et formation sur site.
              </p>
            </div>
            <Link
              href="/contact?plan=illimite"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "group/btn shrink-0",
              )}
            >
              Demander un devis
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        <p className="mt-10 text-center text-xs text-muted-foreground/70">
          Paiement par Mobile Money, virement bancaire ou carte. TVA non
          applicable, art. 293B.
        </p>
      </div>
    </section>
  );
}
