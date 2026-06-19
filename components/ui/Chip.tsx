import * as React from "react";
import { cn } from "@/lib/utils";

/** Filter pill. surface-2 by default, surface-3 when selected. radius-full. */
export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export function Chip({
  selected = false,
  className,
  children,
  ...props
}: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      data-selected={selected}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-label font-medium transition-colors",
        selected
          ? "bg-surface-3 text-fg"
          : "bg-surface-2 text-fg-muted hover:bg-surface-3 hover:text-fg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
