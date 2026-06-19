import * as React from "react";
import { IoCheckmark } from "react-icons/io5";
import { cn } from "@/lib/utils";

/**
 * The one non-flat element in the system: a brushed-silver metallic button.
 * Variants: default ("Rate" / "Rate Game"), rated (dark + green check), disabled.
 */
export type RateButtonVariant = "default" | "rated" | "disabled";

export interface RateButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: RateButtonVariant;
  /** compact → "Rate", otherwise "Rate Game" */
  compact?: boolean;
}

// Brushed silver: a clean top → bottom linear gradient (no diagonal).
// No token exists for this material.
const METALLIC =
  "linear-gradient(180deg, #ededed 0%, #d2d2d2 52%, #bdbdbd 100%)";
const METALLIC_SHADOW =
  "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.4)";

export function RateButton({
  variant = "default",
  compact = false,
  className,
  style,
  ...props
}: RateButtonProps) {
  if (variant === "rated") {
    return (
      <button
        type="button"
        className={cn(
          "inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-surface-2 px-4 py-2 text-label font-semibold text-green transition-colors hover:bg-surface-3",
          className
        )}
        {...props}
      >
        <IoCheckmark className="size-4" aria-hidden />
        Rated
      </button>
    );
  }

  const disabled = variant === "disabled";
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-label font-semibold text-black transition-[filter,transform]",
        disabled
          ? "cursor-not-allowed opacity-40 saturate-0"
          : "hover:brightness-105 active:scale-[0.98]",
        className
      )}
      style={{ backgroundImage: METALLIC, boxShadow: METALLIC_SHADOW, ...style }}
      {...props}
    >
      {compact ? "Rate" : "Rate Game"}
    </button>
  );
}
