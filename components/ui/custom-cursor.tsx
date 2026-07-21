"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorVariant = "default" | "link" | "media";

const VARIANTS: Record<CursorVariant, { size: number; ring: number; opacity: number }> = {
  default: { size: 8, ring: 0, opacity: 1 },
  link: { size: 48, ring: 1, opacity: 0.18 },
  media: { size: 80, ring: 1, opacity: 0.12 },
};

function subscribeCursorMedia(callback: () => void) {
  const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  hover.addEventListener("change", callback);
  reduce.addEventListener("change", callback);
  return () => {
    hover.removeEventListener("change", callback);
    reduce.removeEventListener("change", callback);
  };
}

function getCursorEnabled() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function CustomCursor() {
  const enabled = useSyncExternalStore(
    subscribeCursorMedia,
    getCursorEnabled,
    () => false,
  );
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springConfig = { damping: 32, stiffness: 520, mass: 0.3 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const handleMove = (e: PointerEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
      });
    };

    const handleOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor]',
      );
      if (!interactive) {
        setVariant("default");
        setLabel(null);
        return;
      }
      const cursorAttr = interactive.getAttribute("data-cursor");
      const labelAttr = interactive.getAttribute("data-cursor-label");
      setVariant(cursorAttr === "media" ? "media" : "link");
      setLabel(labelAttr);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerover", handleOver, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerover", handleOver);
      document.documentElement.classList.remove("has-custom-cursor");
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const v = VARIANTS[variant];
  const isExpanded = variant !== "default";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: springX, y: springY }}
    >
      {/* Anneau qui s'étend au survol — toujours visible (background gold semi-transparent + bord or vif) */}
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{
          height: v.size,
          width: v.size,
          backgroundColor: isExpanded
            ? `rgba(245, 180, 0,${v.opacity})`
            : "rgb(212,175,55)",
          borderWidth: v.ring,
          borderStyle: "solid",
          borderColor: isExpanded ? "rgb(212,175,55)" : "transparent",
          boxShadow: isExpanded
            ? "0 0 24px rgba(245, 180, 0,0.35)"
            : "0 0 12px rgba(245, 180, 0,0.55), 0 0 0 1px rgba(0,0,0,0.4)",
        }}
        transition={{ type: "spring", damping: 28, stiffness: 350, mass: 0.4 }}
      />

      {/* Label : positionné sous le cercle */}
      <motion.span
        className="font-display block whitespace-nowrap rounded-full border border-primary/40 bg-black/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary backdrop-blur-md"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          transform: "translate(-50%, calc(-50% + 28px))",
        }}
        initial={false}
        animate={{
          opacity: label ? 1 : 0,
          y: label ? 12 : 4,
        }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        {label ?? ""}
      </motion.span>
    </motion.div>
  );
}
