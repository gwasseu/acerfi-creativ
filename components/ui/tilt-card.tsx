"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
};

export function TiltCard({
  children,
  className,
  intensity = 8,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity]);
  const rotateXSpring = useSpring(rotateX, { stiffness: 220, damping: 18, mass: 0.5 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 220, damping: 18, mass: 0.5 });

  const glareX = useTransform(x, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["20%", "80%"]);
  const glareOpacity = useMotionValue(0);
  const glareOpacitySpring = useSpring(glareOpacity, { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    glareOpacity.set(0.18);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className={cn("relative h-full will-change-transform", className)}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          style={{
            opacity: glareOpacitySpring,
            background: `radial-gradient(circle at var(--gx) var(--gy), rgba(255,255,255,0.6), transparent 55%)`,
            ["--gx" as string]: glareX,
            ["--gy" as string]: glareY,
          }}
          className="pointer-events-none absolute inset-0 rounded-xl mix-blend-overlay"
        />
      )}
    </motion.div>
  );
}
