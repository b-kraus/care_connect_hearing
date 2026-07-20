import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-semibold",
    "transition-colors",
    "focus-visible:outline-2",
    "focus-visible:outline-offset-2",
    "focus-visible:outline-primary",
    "disabled:pointer-events-none",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-black hover:bg-primary/90 active:bg-primary/80",

        secondary:
          "border border-white/30 bg-transparent text-white hover:bg-white/10",

        destructive:
          "bg-error text-white hover:bg-error/90 active:bg-error/80",

        ghost:
          "bg-transparent text-white hover:bg-white/10",
      },

      size: {
        sm: "min-h-10 rounded-sm px-4 py-2 text-sm",
        md: "min-h-12 rounded-md px-5 py-3 text-base",
        lg: "min-h-14 rounded-lg px-6 py-4 text-lg",
      },

      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  };

function Button({
  className,
  variant,
  size,
  fullWidth,
  loading = false,
  disabled,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={cn(
        buttonVariants({
          variant,
          size,
          fullWidth,
        }),
        className,
      )}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

export { Button, buttonVariants };