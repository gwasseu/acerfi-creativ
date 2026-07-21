import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-dark shadow-[0_0_30px_-8px_rgba(245,180,0,0.6)] hover:shadow-[0_0_40px_-6px_rgba(245,180,0,0.8)]",
        primary:
          "bg-primary text-primary-foreground hover:bg-primary-dark shadow-[0_0_30px_-8px_rgba(245,180,0,0.6)] hover:shadow-[0_0_40px_-6px_rgba(245,180,0,0.8)]",
        gradient:
          "bg-gradient-gold text-primary-foreground shadow-[0_4px_20px_rgba(245,180,0,0.35)] hover:shadow-[0_6px_28px_rgba(245,180,0,0.5)] hover:scale-[1.02]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline:
          "border border-primary/40 bg-transparent text-foreground hover:bg-primary/10 hover:border-primary/70",
        ghost: "hover:bg-primary/10 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
