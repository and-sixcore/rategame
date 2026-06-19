import * as React from "react";
import { cn } from "@/lib/utils";
import { ratingColor, ratingText } from "@/lib/rating";

/**
 * ScorePill — RateGame's signature primitive. A circular rating badge:
 * a neutral surface-2 disc (no border) with the score in the semaphore color,
 * weight 700, tabular figures. Color is chosen by the value thresholds.
 */
export type ScorePillSize = "xs" | "sm" | "md" | "lg" | "hero";

const SIZES: Record<ScorePillSize, { box: number; font: number }> = {
  xs: { box: 24, font: 9 },
  sm: { box: 32, font: 12 },
  md: { box: 48, font: 16 },
  lg: { box: 64, font: 22 },
  hero: { box: 96, font: 34 },
};

export interface ScorePillProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  /** 0–10 rating; drives the semaphore color via thresholds. */
  value: number;
  size?: ScorePillSize;
}

function formatScore(v: number) {
  if (v >= 10) return "10";
  if (v <= 0) return "0.0";
  return v.toFixed(1);
}

export function ScorePill({
  value,
  size = "md",
  className,
  style,
  ...props
}: ScorePillProps) {
  const color = ratingColor(value);
  const { box, font } = SIZES[size];

  return (
    <div
      role="img"
      aria-label={`Rating ${formatScore(value)} out of 10`}
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-full",
        className
      )}
      style={{
        width: box,
        height: box,
        background: "var(--color-surface-2)",
        ...style,
      }}
      {...props}
    >
      <span
        className={cn(
          "font-bold leading-none tabular-nums",
          ratingText[color]
        )}
        style={{ fontSize: font }}
      >
        {formatScore(value)}
      </span>
    </div>
  );
}
