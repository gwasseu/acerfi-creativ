"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ACERFI } from "@/lib/acerfi";
import { SERVICES } from "@/content/services";

type Props = {
  prefilledService?: string;
  prefilledPlan?: string;
};

const CHANNELS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: ACERFI.contact.phonePrimary,
    sub: ACERFI.contact.whatsappLabel,
    href: ACERFI.contact.whatsapp,
    accent: "#10B981",
  },
  {
    icon: Mail,
    label: "Email",
    value: ACERFI.contact.emails.primary,
    sub: ACERFI.contact.emails.info,
    href: `mailto:${ACERFI.contact.emails.primary}`,
    accent: "#C9A84C",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: ACERFI.contact.phones.join(" · "),
    sub: "Lun–Ven 8h–18h · Sam 9h–13h",
    href: `tel:${ACERFI.contact.phonePrimaryRaw}`,
    accent: "#3B82F6",
  },
];

export function ContactBlock({ prefilledService, prefilledPlan }: Props) {
  const initialSubject = useMemo(() => {
    if (prefilledService) {
      const service = SERVICES.find((s) => s.slug === prefilledService);
      if (service) return `Demande pour ${service.name}`;
    }
    if (prefilledPlan === "flipbook") return "Demande pour FlipBook Pro";
    if (prefilledPlan === "illimite")
      return "Demande pour FlipBook Illimité (sur devis)";
    return "";
  }, [prefilledService, prefilledPlan]);

  const initialMessage = useMemo(() => {
    if (prefilledService) {
      const service = SERVICES.find((s) => s.slug === prefilledService);
      if (service) {
        return `Bonjour, je suis intéressé par votre offre ${service.name} (${service.priceLabel}). Pourriez-vous m'en dire plus ?`;
      }
    }
    return "";
  }, [prefilledService]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: initialSubject,
    message: initialMessage,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject || "Demande de brief",
          message: form.message,
        }),
      });

      const data = await resp.json();

      if (data.ok) {
        setSubmitted(true);
      } else if (data.fallback === "mailto" && data.mailto) {
        // API non configurée côté serveur → on ouvre le client mail
        window.location.href = data.mailto;
        setSubmitted(true);
      } else {
        setErrorMsg(
          "Impossible d'envoyer pour l'instant. Tu peux nous contacter directement à " +
            ACERFI.contact.emails.primary,
        );
      }
    } catch {
      setErrorMsg(
        "Erreur réseau. Vérifie ta connexion et réessaie — ou écris-nous à " +
          ACERFI.contact.emails.primary,
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative w-full px-6 py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.2fr]">
        <motion.aside
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Nous joindre
            </h2>
            <ul className="mt-5 space-y-3">
              {CHANNELS.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-card/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]/40"
                      style={
                        { ["--accent" as string]: c.accent } as React.CSSProperties
                      }
                    >
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                        style={{
                          background: `${c.accent}1f`,
                          borderColor: `${c.accent}40`,
                        }}
                      >
                        <Icon className="h-5 w-5" style={{ color: c.accent }} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          {c.label}
                        </span>
                        <span className="mt-0.5 block truncate font-display text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                          {c.value}
                        </span>
                        {c.sub && (
                          <span className="mt-0.5 block text-[10px] text-muted-foreground/60">
                            {c.sub}
                          </span>
                        )}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Bureaux
            </h2>
            <ul className="mt-5 space-y-3">
              {ACERFI.contact.addresses.map((loc) => (
                <li
                  key={loc.city}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-card/50 p-4"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <span className="block font-display text-sm font-semibold text-foreground">
                      {loc.city}
                      {loc.primary && (
                        <span className="ml-2 align-middle text-[10px] font-medium uppercase tracking-[0.18em] text-primary/70">
                          Bureau principal
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {loc.line}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Horaires
            </h2>
            <ul className="mt-5 space-y-2 rounded-xl border border-white/[0.06] bg-card/50 p-4 text-xs">
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <span className="text-muted-foreground">{ACERFI.contact.hours.weekday}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <span className="text-muted-foreground">{ACERFI.contact.hours.saturday}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <span className="text-muted-foreground">{ACERFI.contact.hours.sunday}</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/[0.06] p-5">
            <p className="text-xs leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">
                {ACERFI.contact.quoteSLA}
              </span>{" "}
              Décrivez votre projet, recevez une proposition adaptée.
            </p>
          </div>
        </motion.aside>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-white/[0.06] bg-card/50 p-7 backdrop-blur md:p-10"
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
                <Mail className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold">Message reçu</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                On a bien reçu ton brief. Réponse sous 24 h en jours ouvrés —
                souvent plus vite. Si urgent, écris-nous sur WhatsApp :{" "}
                <a
                  href={ACERFI.contact.whatsapp}
                  className="font-semibold text-primary hover:underline"
                >
                  {ACERFI.contact.phonePrimary}
                </a>
                .
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                  });
                }}
                className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary hover:underline"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Décris ton projet
              </h2>
              <p className="text-sm text-muted-foreground">
                Plus tu donnes de contexte, plus le brief sera utile.
              </p>

              {errorMsg && (
                <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-3 text-xs text-red-300">
                  {errorMsg}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nom et prénom *">
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                    placeholder="Ex : Aïcha M."
                  />
                </Field>
                <Field label="Email *">
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                    placeholder="ex@email.com"
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Téléphone / WhatsApp">
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass}
                    placeholder="+237 6 ..."
                  />
                </Field>
                <Field label="Sujet *">
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Demande de brief — FlipBook Pro"
                  />
                </Field>
              </div>

              <Field label="Ton message *">
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={cn(inputClass, "resize-none")}
                  placeholder="Décris ton activité, ton besoin, ton délai..."
                />
              </Field>

              <button
                type="submit"
                disabled={submitting}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group w-full bg-gradient-gold text-black shadow-[0_8px_30px_rgba(245, 180, 0,0.4)] hover:bg-gradient-gold disabled:opacity-60",
                )}
              >
                {submitting ? "Envoi..." : "Envoyer le brief"}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <p className="text-center text-[11px] text-muted-foreground/70">
                En envoyant ce formulaire, tu acceptes qu&apos;on te recontacte
                par email ou WhatsApp.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors duration-200 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20";
