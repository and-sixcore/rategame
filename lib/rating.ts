/**
 * Rating → semaphore color. The one place RateGame thresholds live.
 * design.md: value >= 7 → green · 4 <= value < 7 → yellow · value < 4 → red.
 */
export type RatingColor = "green" | "yellow" | "red";

export function ratingColor(value: number): RatingColor {
  if (value >= 7) return "green";
  if (value >= 4) return "yellow";
  return "red";
}

/** Tailwind text-color class for the rating number. */
export const ratingText: Record<RatingColor, string> = {
  green: "text-rg-green",
  yellow: "text-rg-yellow",
  red: "text-rg-red",
};

/** Dim tint var per color — for soft fills behind a number. */
export const ratingDimVar: Record<RatingColor, string> = {
  green: "var(--color-rg-green-dim)",
  yellow: "var(--color-rg-yellow-dim)",
  red: "var(--color-rg-red-dim)",
};
