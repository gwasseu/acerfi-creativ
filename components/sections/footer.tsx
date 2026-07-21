"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ACERFI } from "@/lib/acerfi";

const SocialIcon = ({
  type,
  className,
}: {
  type: "facebook" | "instagram" | "linkedin" | "tiktok";
  className?: string;
}) => {
  const props = {
    className,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
  };
  switch (type) {
    case "facebook":
      return (
        <svg {...props}>
          <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...props}>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98C.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...props}>
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...props}>
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.81 20.1a6.34 6.34 0 0 0 10.86-4.43V8.83a8.27 8.27 0 0 0 4.86 1.59V7a4.85 4.85 0 0 1-1.94-.31z" />
        </svg>
      );
  }
};

const linkClass =
  "group/link relative inline-flex items-center text-foreground/65 transition-colors hover:text-primary";

const underline =
  "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 group-hover/link:after:scale-x-100";

type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

const SECTIONS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Pôles",
    links: [
      { href: "/services?pole=ia", label: "Intelligence Artificielle" },
      { href: "/services?pole=video-photo", label: "Vidéo & Photo" },
      { href: "/services?pole=design", label: "Design Graphique" },
      { href: "/services?pole=web", label: "Web & Digital" },
      { href: "/services?pole=terrain", label: "Terrain & Événementiel" },
    ],
  },
  {
    title: "Stars",
    links: [
      { href: "/services/flipbook-pro", label: "FlipBook Pro" },
      { href: "/services/agent-ia-personnalise", label: "Agent IA Personnalisé" },
      { href: "/services/brand-starter", label: "Pack Identité Visuelle" },
      { href: "/services/site-express", label: "Site Vitrine Express" },
      { href: "/services/pack-rocket-start", label: "Pack Rocket Start" },
      { href: "/services", label: "Voir tout →" },
    ],
  },
  {
    title: "Agence",
    links: [
      { href: "/portfolio", label: "Portfolio" },
      { href: "/secteurs", label: "Secteurs" },
      { href: "/processus", label: "Notre processus" },
      { href: "/tarifs", label: "Tarifs" },
      { href: "/a-propos", label: "À propos" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
      { href: "https://formation.acerfi.net", label: "ACERFI Formation", external: true },
      { href: "https://maya.acerfi.net", label: "MAYA Enterprise", external: true },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full border-t border-primary/15 px-6 py-16"
      style={{ background: "#050505" }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Link href="/" className="flex items-center gap-3">
            <Logo size={44} withWordmark={false} />
            <span>
              <span className="font-display text-lg font-bold">ACERFI Créativ</span>
              <span className="ml-2 text-sm italic text-primary/80">
                Des idées qui rayonnent…
              </span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {ACERFI.creativ.subtitle}
          </p>

          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a
                href={`mailto:${ACERFI.contact.emails.primary}`}
                className={`${linkClass} ${underline}`}
              >
                {ACERFI.contact.emails.primary}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a
                href={`tel:${ACERFI.contact.phonePrimaryRaw}`}
                className={`${linkClass} ${underline}`}
              >
                {ACERFI.contact.phonePrimary}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="text-muted-foreground">
                {ACERFI.contact.addresses[0].line}
                <span className="block text-xs text-muted-foreground/70">
                  & Douala — sur RDV
                </span>
              </span>
            </li>
          </ul>

          <div className="mt-6 flex gap-3">
            {ACERFI.socials.map(({ type, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -2, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 350, damping: 16 }}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-muted-foreground transition-colors duration-300 hover:border-primary/40 hover:text-primary"
              >
                <SocialIcon type={type} className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {SECTIONS.map((section, sIdx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2 + sIdx * 0.08 }}
          >
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              {section.title}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {section.links.map((link) =>
                link.external ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${linkClass} ${underline}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`${linkClass} ${underline}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-primary/10 pt-6 text-xs text-muted-foreground/70 md:flex-row"
      >
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>© {year} ACERFI Créativ — Groupe ACERFI · Depuis {ACERFI.group.foundedYear}</span>
          <Link
            href="/mentions-legales"
            className="text-muted-foreground/60 transition-colors hover:text-primary"
          >
            Mentions légales
          </Link>
        </span>
        <a
          href="https://www.acerfi.net"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 transition-opacity hover:opacity-100"
          aria-label="Site du Groupe ACERFI"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground/60 transition-colors group-hover:text-primary/80">
            Filiale du Groupe
          </span>
          <Image
            src="/assets/logos/acerfi_main_logo.png"
            alt="ACERFI"
            width={88}
            height={34}
            className="h-6 w-auto opacity-60 transition-all duration-300 group-hover:opacity-95 group-hover:brightness-110"
            style={{
              filter: "grayscale(1) brightness(2.4) contrast(0.85)",
            }}
          />
        </a>
      </motion.div>
    </motion.footer>
  );
}
