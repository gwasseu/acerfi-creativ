"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Client = {
  name: string;
  logo: string;
  href?: string;
  width: number;
  height: number;
};

const CLIENTS: Client[] = [
  {
    name: "Orange",
    logo: "/clients/orange.svg",
    href: "https://orange.cm",
    width: 80,
    height: 80,
  },
  {
    name: "MTN",
    logo: "/clients/mtn.svg",
    href: "https://mtn.cm",
    width: 120,
    height: 60,
  },
  {
    name: "1xBet",
    logo: "/clients/1xbet.png",
    href: "https://1xbet.com",
    width: 140,
    height: 60,
  },
  {
    name: "BetMoMo",
    logo: "/clients/betmomo.webp",
    href: "https://betmomo.info",
    width: 70,
    height: 60,
  },
];

export function ClientsTrust() {
  return (
    <section className="relative w-full px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col items-center gap-3 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Ils nous ont fait confiance
          </span>
          <h2 className="font-display text-2xl font-bold leading-tight md:text-3xl">
            Des marques qui comptent, au Cameroun et au-delà
          </h2>
        </motion.div>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CLIENTS.map((client, idx) => (
            <motion.li
              key={client.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
            >
              <ClientCard client={client} />
            </motion.li>
          ))}
        </ul>

        <p className="mt-8 text-center text-xs text-muted-foreground/60">
          Sélection de références. Liste complète sur demande.
        </p>
      </div>
    </section>
  );
}

function ClientCard({ client }: { client: Client }) {
  const inner = (
    <div className="group relative flex h-24 items-center justify-center rounded-xl border border-white/[0.06] bg-card/40 px-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card/70">
      <Image
        src={client.logo}
        alt={`Logo ${client.name}`}
        width={client.width}
        height={client.height}
        className="max-h-12 w-auto object-contain opacity-70 transition-all duration-500 group-hover:opacity-100"
      />
      <span className="sr-only">{client.name}</span>
    </div>
  );

  if (!client.href) return inner;

  return (
    <a
      href={client.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Site officiel ${client.name}`}
    >
      {inner}
    </a>
  );
}
