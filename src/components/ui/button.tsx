import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[transform,background-color,border-color,color,box-shadow] duration-200 [transition-timing-function:var(--ease-out-strong)] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100",
  {
    variants: {
      variant: {
        primary:
          "bg-burgundy-500 text-cream-50 shadow-[0_10px_30px_-10px_rgba(139,46,78,0.55)] hover:bg-burgundy-600",
        gold: "bg-gold-400 text-ink-900 shadow-[0_10px_30px_-12px_rgba(148,114,42,0.55)] hover:bg-gold-500",
        outline:
          "border border-burgundy-300 text-burgundy-600 hover:bg-burgundy-500/5",
        ghost: "text-burgundy-600 hover:bg-burgundy-500/10",
        whatsapp: "bg-[#25D366] text-white hover:bg-[#1fbf5c]",
        link: "text-burgundy-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-14 px-9 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { Button, buttonVariants };
