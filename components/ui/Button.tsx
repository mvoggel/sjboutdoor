"use client";

import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-[var(--rich-warm)] text-[var(--bg-pure)] hover:brightness-110 focus-visible:ring-[var(--rich-warm)]",
  secondary:
    "bg-transparent text-[var(--bg-pure)] border border-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.1)] focus-visible:ring-white",
  ghost:
    "bg-transparent text-[var(--ink-primary)] hover:text-[var(--rich-deep)] focus-visible:ring-[var(--rich-deep)]",
};

const sizeStyles: Record<string, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={[
          "inline-flex items-center justify-center gap-2",
          "rounded-none font-medium tracking-wide",
          "transition-all duration-200 cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className,
        ].join(" ")}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
