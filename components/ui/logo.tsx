import Image from "next/image";
import { cn } from "@/lib/utils";
import { brandAssets } from "@/lib/design-tokens";

type LogoVariant = "color" | "white" | "mono";
type LogoLayout = "monogram" | "horizontal";

type LogoProps = {
  size?: number;
  variant?: LogoVariant;
  layout?: LogoLayout;
  withWordmark?: boolean;
  className?: string;
  glow?: boolean;
  priority?: boolean;
};

/**
 * ACERFI Creativ logo. Maps the official logo kit (gold light-bulb monogram
 * + handwritten filament) to the right asset variant for the surrounding
 * surface. Use `variant="white"` on dark hero blocks, `variant="color"` on
 * light surfaces, `variant="mono"` for print/footer.
 *
 * `withWordmark` only applies to layout="monogram" — it adds the "ACERFI
 * Créativ" wordmark next to the bulb, reproducing the contrast bold/light
 * of the official horizontal lockup.
 */
export function Logo({
  size = 40,
  variant = "color",
  layout = "monogram",
  withWordmark = true,
  className,
  glow = false,
  priority = true,
}: LogoProps) {
  if (layout === "horizontal") {
    const src =
      variant === "white"
        ? brandAssets.logo.horizontalWhite
        : variant === "mono"
          ? brandAssets.logo.horizontalMono
          : brandAssets.logo.horizontalColor;

    return (
      <Image
        src={src}
        alt="ACERFI Créativ"
        width={size * 4}
        height={size}
        priority={priority}
        className={cn("h-auto w-auto object-contain", className)}
        style={{ height: size }}
      />
    );
  }

  const monogramSrc =
    variant === "white"
      ? brandAssets.logo.monogramWhite
      : variant === "mono"
        ? brandAssets.logo.monogramBlack
        : brandAssets.logo.monogramColor;

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center",
          glow && "drop-shadow-[0_0_20px_rgba(245,180,0,0.45)]",
        )}
        style={{ width: size, height: size }}
      >
        <Image
          src={monogramSrc}
          alt="ACERFI Créativ"
          width={size * 2}
          height={size * 2}
          priority={priority}
          className="h-full w-full object-contain"
        />
      </span>
      {withWordmark && (
        <span className="flex items-baseline gap-1.5 leading-none">
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            ACERFI
          </span>
          <span className="font-body text-lg font-light text-primary">
            creativ
          </span>
        </span>
      )}
    </span>
  );
}
