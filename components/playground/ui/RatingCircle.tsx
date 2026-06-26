import { app, ratingColor, formatRating } from "@/lib/playground/appTheme";

/**
 * The RateGame score badge — a dark disc with the score in the semaphore color,
 * with a soft glow. Mirrors mobile `CircleRatingNoSvg` / web `CircleRatingNoSvg`.
 */
export function RatingCircle({
  value,
  size = 44,
  font,
  glow = true,
  border = false,
}: {
  value: number | null;
  size?: number;
  font?: string;
  glow?: boolean;
  border?: boolean;
}) {
  const color = ratingColor(value);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        background: app.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color,
        fontFamily: font,
        fontWeight: 700,
        fontSize: Math.round(size * 0.4),
        lineHeight: 1,
        letterSpacing: -0.5,
        flex: "0 0 auto",
        boxShadow: glow ? `0 0 ${Math.round(size * 0.16)}px ${color}5c` : undefined,
        border: border ? `1px solid ${app.borderStrong}` : undefined,
      }}
    >
      {formatRating(value)}
    </div>
  );
}
