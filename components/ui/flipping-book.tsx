"use client";

import { motion, useReducedMotion } from "framer-motion";

const PAGES = [
  {
    eyebrow: "Catalogue",
    title: "FlipBook\nPro",
    sub: "Édition 2026",
    bgFront:
      "linear-gradient(135deg, #0e0e0e 0%, #1c1a14 60%, #2a2415 100%)",
    bgBack:
      "linear-gradient(135deg, #fef7e6 0%, #f6e8c2 100%)",
    accent: "#c9a84c",
  },
  {
    eyebrow: "Restaurants",
    title: "Cartes\nvivantes",
    sub: "Menus interactifs",
    bgFront:
      "linear-gradient(135deg, #1a1208 0%, #2d1f0c 60%, #3a2a10 100%)",
    bgBack:
      "linear-gradient(135deg, #fff5d8 0%, #ffd687 100%)",
    accent: "#ff9e2c",
  },
  {
    eyebrow: "Boutiques",
    title: "Vitrines\ndigitales",
    sub: "Achat direct",
    bgFront:
      "linear-gradient(135deg, #0a0a0a 0%, #18130a 60%, #221a0d 100%)",
    bgBack:
      "linear-gradient(135deg, #ffe89a 0%, #c9a84c 100%)",
    accent: "#ffe89a",
  },
];

type Side = "front" | "back";

function PageContent({
  data,
  side,
}: {
  data: (typeof PAGES)[number];
  side: Side;
}) {
  const isFront = side === "front";
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-r-md"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        background: isFront ? data.bgFront : data.bgBack,
        transform: isFront ? undefined : "rotateY(180deg)",
        boxShadow: isFront
          ? "inset 0 0 60px rgba(0,0,0,0.5)"
          : "inset 0 0 80px rgba(255,200,100,0.15)",
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(245, 180, 0,0.35) 1px, transparent 0)",
          backgroundSize: "14px 14px",
        }}
      />
      <div className="relative flex h-full flex-col p-7">
        <span
          className="text-[10px] uppercase tracking-[0.32em]"
          style={{ color: isFront ? data.accent : "#0a0a0a" }}
        >
          {data.eyebrow}
        </span>
        <h3
          className="mt-6 whitespace-pre-line font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight"
          style={{ color: isFront ? "#fff" : "#0a0a0a" }}
        >
          {data.title}
        </h3>
        <div className="mt-auto">
          <div
            className="mb-3 h-px w-12"
            style={{
              background: isFront
                ? `linear-gradient(to right, ${data.accent}, transparent)`
                : "linear-gradient(to right, #0a0a0a, transparent)",
            }}
          />
          <span
            className="text-[10px] uppercase tracking-[0.28em]"
            style={{
              color: isFront ? "rgba(255,255,255,0.55)" : "rgba(10,10,10,0.65)",
            }}
          >
            {data.sub}
          </span>
        </div>
      </div>
    </div>
  );
}

export function FlippingBook() {
  const reduce = useReducedMotion();
  const cycle = 9;

  return (
    <div
      aria-hidden
      className="relative h-[440px] w-[320px]"
      style={{ perspective: "2200px" }}
    >
      {/* Halo doré derrière */}
      <div
        className="absolute -inset-12 -z-10 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(245, 180, 0,0.35) 0%, rgba(255,158,44,0.12) 35%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={
          reduce
            ? undefined
            : {
                rotateY: [-14, -10, -14],
                rotateX: [4, 2, 4],
                y: [0, -8, 0],
              }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Couverture de fond stable (toujours visible quand toutes les pages sont passées) */}
        <div
          className="absolute inset-0 rounded-r-md border border-primary/25 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
          style={{
            background:
              "linear-gradient(135deg, #050505 0%, #131008 60%, #1d1709 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(245, 180, 0,0.35) 1px, transparent 0)",
              backgroundSize: "14px 14px",
            }}
          />
          <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
            <span className="font-display text-5xl font-bold leading-none tracking-tight text-white">
              ACERFI
            </span>
            <span className="mt-3 text-[10px] uppercase tracking-[0.4em] text-primary/70">
              Creativ Studio
            </span>
          </div>
        </div>

        {/* Tranche dorée (effet pages empilées) */}
        <div
          className="absolute left-0 top-1 bottom-1 w-[6px] rounded-l-sm"
          style={{
            background:
              "linear-gradient(to right, rgba(245, 180, 0,0.85), rgba(245, 180, 0,0.15))",
            transform: "translateZ(2px)",
          }}
        />
        <div
          className="absolute right-0 top-2 bottom-2 w-[3px]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)",
          }}
        />

        {/* Pages qui flippent en séquence */}
        {PAGES.map((page, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-r-md"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "left center",
              animation: reduce
                ? undefined
                : `pageflip ${cycle * PAGES.length}s ease-in-out ${i * cycle}s infinite`,
              zIndex: PAGES.length - i,
            }}
          >
            <PageContent data={page} side="front" />
            <PageContent
              data={PAGES[(i + 1) % PAGES.length]!}
              side="back"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
