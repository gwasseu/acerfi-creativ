"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ChapterProps = {
  index: string; // ex "001"
  label: string; // ex "Services"
  className?: string;
  align?: "left" | "center";
};

export function Chapter({
  index,
  label,
  className,
  align = "left",
}: ChapterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex items-baseline gap-4 md:gap-6",
        align === "center" && "justify-center",
        className,
      )}
    >
      <span
        className="font-display text-[clamp(3rem,8vw,7rem)] font-light leading-none tracking-tighter"
        style={{
          color: "transparent",
          WebkitTextStroke: "1px rgba(245, 180, 0,0.5)",
        }}
      >
        {index}
      </span>
      <span className="flex items-center gap-3">
        <span
          aria-hidden
          className="h-px w-10 bg-gradient-to-r from-primary/60 to-transparent md:w-16"
        />
        <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-primary md:text-xs">
          {label}
        </span>
      </span>
    </motion.div>
  );
}
