"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { POLES, getFlagshipServices } from "@/content/services";
import { SECTORS } from "@/content/sectors";

type NavLink = {
  href: string;
  label: string;
  mega?: "services" | "secteurs";
};

const NAV_LINKS: NavLink[] = [
  { href: "/services", label: "Services", mega: "services" },
  { href: "/secteurs", label: "Secteurs", mega: "secteurs" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState<NavLink["mega"] | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setOpenMega(null);
    setMobileExpanded(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || openMega
          ? "border-b border-white/5 bg-background/80 backdrop-blur-xl"
          : "bg-transparent",
      )}
      onMouseLeave={() => setOpenMega(null)}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="inline-flex"
        >
          <Link href="/" aria-label="ACERFI Créativ — accueil" className="group inline-flex">
            <Logo size={40} />
          </Link>
        </motion.div>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            const hasMega = Boolean(link.mega);

            return (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => hasMega && setOpenMega(link.mega ?? null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300",
                    isActive
                      ? "text-foreground"
                      : "text-foreground/55 hover:text-foreground",
                  )}
                >
                  {link.label}
                  {hasMega && (
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-300",
                        openMega === link.mega && "rotate-180",
                      )}
                    />
                  )}
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "default" }),
              "bg-gradient-gold text-primary-foreground shadow-[0_4px_20px_rgba(245,180,0,0.35)] hover:scale-105 hover:bg-gradient-gold",
            )}
          >
            Demander une démo
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-lg p-2 text-foreground transition-colors hover:bg-white/5 lg:hidden"
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mega menu desktop */}
      <AnimatePresence>
        {openMega === "services" && (
          <MegaServices key="mega-services" />
        )}
        {openMega === "secteurs" && (
          <MegaSecteurs key="mega-secteurs" />
        )}
      </AnimatePresence>

      {/* Drawer mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b border-white/5 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="space-y-1 px-4 py-6">
              {NAV_LINKS.map((link, i) => {
                const isExpanded = mobileExpanded === link.href;
                const items = link.mega === "services" ? POLES : link.mega === "secteurs" ? SECTORS : null;

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <div className="flex items-center">
                      <Link
                        href={link.href}
                        className="flex-1 rounded-lg px-4 py-3 text-sm font-medium text-foreground/70 transition-colors hover:bg-white/5 hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                      {items && (
                        <button
                          type="button"
                          onClick={() =>
                            setMobileExpanded(isExpanded ? null : link.href)
                          }
                          className="rounded-lg p-3 text-foreground/55 hover:bg-white/5"
                          aria-label={isExpanded ? "Réduire" : "Étendre"}
                          aria-expanded={isExpanded}
                        >
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              isExpanded && "rotate-180",
                            )}
                          />
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {isExpanded && items && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pl-3"
                        >
                          {items.map((item) => {
                            const subHref =
                              link.mega === "services"
                                ? `/services#pole-${item.slug}`
                                : `/secteurs/${item.slug}`;
                            return (
                              <li key={item.slug}>
                                <Link
                                  href={subHref}
                                  className="block rounded-lg px-4 py-2 text-xs text-foreground/55 transition-colors hover:bg-white/5 hover:text-primary"
                                >
                                  {item.name}
                                </Link>
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "default" }),
                  "mt-4 w-full bg-gradient-gold text-primary-foreground hover:bg-gradient-gold",
                )}
              >
                Demander une démo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function MegaServices() {
  const flagships = getFlagshipServices().slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
      className="hidden border-t border-white/5 bg-background/95 backdrop-blur-xl lg:block"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[2fr_3fr] gap-10 px-6 py-8">
        {/* Colonne gauche : pôles */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              6 pôles · 30+ services
            </span>
            <Link
              href="/services"
              className="text-xs font-medium text-foreground/65 transition-colors hover:text-primary"
            >
              Tout voir →
            </Link>
          </div>
          <ul className="space-y-2">
            {POLES.map((p) => {
              const Icon = p.icon;
              return (
                <li key={p.slug}>
                  <Link
                    href={`/services#pole-${p.slug}`}
                    className="group flex items-start gap-3 rounded-xl border border-white/5 bg-card/50 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]/40 hover:bg-card"
                    style={{ ["--accent" as string]: p.accent } as React.CSSProperties}
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
                      style={{
                        background: `${p.accent}1f`,
                        borderColor: `${p.accent}35`,
                      }}
                    >
                      <Icon className="h-4 w-4" style={{ color: p.accent }} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2 font-display text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                        <span>{p.name}</span>
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                        {p.tagline}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Colonne droite : services phares */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Stars du catalogue
            </span>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {flagships.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex items-start gap-3 rounded-xl border border-white/5 bg-card/50 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]/40 hover:bg-card"
                    style={{ ["--accent" as string]: s.accent } as React.CSSProperties}
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
                      style={{
                        background: `${s.accent}1f`,
                        borderColor: `${s.accent}35`,
                      }}
                    >
                      <Icon className="h-4 w-4" style={{ color: s.accent }} />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-display text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                        {s.name}
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                        {s.priceLabel}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function MegaSecteurs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
      className="hidden border-t border-white/5 bg-background/95 backdrop-blur-xl lg:block"
    >
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Pour qui on travaille
          </span>
          <Link
            href="/secteurs"
            className="text-xs font-medium text-foreground/65 transition-colors hover:text-primary"
          >
            Voir tous les secteurs →
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {SECTORS.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.slug}>
                <Link
                  href={`/secteurs/${s.slug}`}
                  className="group flex items-start gap-3 rounded-xl border border-white/5 bg-card/50 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]/40 hover:bg-card"
                  style={{ ["--accent" as string]: s.accent } as React.CSSProperties}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
                    style={{
                      background: `${s.accent}1f`,
                      borderColor: `${s.accent}35`,
                    }}
                  >
                    <Icon className="h-4 w-4" style={{ color: s.accent }} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                      {s.name}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                      {s.tagline}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}
