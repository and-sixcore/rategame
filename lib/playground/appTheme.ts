/**
 * RateGame product palette — mirrored from the real apps so the playground
 * reproductions look like the shipping products, independent of the handbook's
 * own Tailwind tokens.
 *
 * Sources:
 *  - rategame-mobile/src/theme/palette.ts
 *  - rategame-web/theme/color-palette
 */

export const app = {
  // Canvas + surfaces (near-black, stepped)
  bg: "#0D0D0D",
  surface1: "#1A1A1A",
  surface2: "#262626",
  surface3: "#333333",
  surface4: "#404040",
  border: "#2A2A2A",
  borderStrong: "#3A3A3A",

  // Text
  text: "#FFFFFF",
  textSecondary: "#E6E6E6",
  textMuted: "#8C8C8C",
  textSubtle: "#666666",

  // Brand + rating semaphore (exact app values)
  green: "#1AFF97", // good   (6.6–10)
  yellow: "#FFE81A", // mixed  (3.3–6.6)
  red: "#FF1A1A", // poor   (0–3.3)
  accent: "#1AFF97",
} as const;

export type RatingTone = "green" | "yellow" | "red" | "none";

/** Matches the real apps: 0–3.3 red · 3.3–6.6 yellow · 6.6–10 green (0–10 scale). */
export function ratingTone(value?: number | null): RatingTone {
  if (value == null || Number.isNaN(value)) return "none";
  if (value <= 3.3) return "red";
  if (value <= 6.6) return "yellow";
  return "green";
}

export const toneColor: Record<RatingTone, string> = {
  green: app.green,
  yellow: app.yellow,
  red: app.red,
  none: "#FFFFFF",
};

export function ratingColor(value?: number | null): string {
  return toneColor[ratingTone(value)];
}

/** "8.5", "10", or "?" — the app shows one decimal, collapses 10.0 → 10. */
export function formatRating(value?: number | null): string {
  if (value == null || Number.isNaN(value)) return "?";
  const r = Math.round(value * 10) / 10;
  return r === 10 ? "10" : r.toFixed(1);
}
