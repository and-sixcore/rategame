import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Badge — an earned medallion shown next to a username. These are image assets
 * (the RateGame "R" seal in five finishes), mirroring the real apps' Badge.tsx
 * which renders icon assets rather than CSS shapes. Tiny by default; the only
 * styling is sizing — the medallion carries its own form and color.
 *
 * `variant` is finish-named and honest to the asset. Likely semantic mapping for
 * when this wires to real data: purple≈Fanalyst, gold≈Ironfan, green≈Athlete,
 * steel≈Early Adopter, silver≈Team / Creator.
 */
export type BadgeVariant = "purple" | "gold" | "green" | "steel" | "silver";

const BADGE_SRC: Record<BadgeVariant, string> = {
  purple: "/badges/purple.png",
  gold: "/badges/gold.png",
  green: "/badges/green.png",
  steel: "/badges/steel.png",
  silver: "/badges/silver.png",
};

const BADGE_LABEL: Record<BadgeVariant, string> = {
  purple: "Fanalyst",
  gold: "Ironfan",
  green: "Athlete",
  steel: "Early Adopter",
  silver: "Team",
};

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "title"> {
  variant: BadgeVariant;
  /** Rendered size in px (square). Tiny by default — it sits beside a name. */
  size?: number;
  /** Accessible name / tooltip. Defaults to the badge's label. */
  title?: string;
}

export function Badge({
  variant,
  size = 16,
  title,
  className,
  ...props
}: BadgeProps) {
  const label = title ?? BADGE_LABEL[variant];
  return (
    <span
      className={cn("inline-flex shrink-0", className)}
      style={{ width: size, height: size }}
      title={label}
      {...props}
    >
      <Image
        src={BADGE_SRC[variant]}
        alt={label}
        width={size}
        height={size}
        className="h-full w-full object-contain"
      />
    </span>
  );
}
