import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block bg-[length:200%_200%] bg-clip-text text-transparent animate-[gradient_6s_linear_infinite]",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(110deg, #C9A84C 0%, #FF9E2C 25%, #FFE89A 50%, #FF9E2C 75%, #C9A84C 100%)",
      }}
    >
      {children}
    </span>
  );
}
