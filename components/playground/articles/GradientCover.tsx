import { app } from "@/lib/playground/appTheme";

/**
 * On-brand fallback cover for articles without a real image. Stays inside the
 * monochrome system (no semaphore color, no decoration) — a stepped near-black
 * gradient with a soft light highlight and a faint glyph. Deterministic per
 * seed so a given article always renders the same cover.
 */
function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function GradientCover({ seed, glyph }: { seed: string; glyph?: string }) {
  const h = hash(seed);
  const angle = 115 + (h % 110);
  const gx = 18 + (h % 64);
  const gy = 22 + ((h >> 4) % 52);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: `radial-gradient(120% 95% at ${gx}% ${gy}%, rgba(255,255,255,0.08), rgba(255,255,255,0) 55%), linear-gradient(${angle}deg, ${app.surface3} 0%, ${app.surface1} 46%, ${app.bg} 100%)`,
      }}
    >
      {glyph ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 10%",
            textAlign: "center",
            fontSize: 56,
            fontWeight: 800,
            letterSpacing: -1,
            lineHeight: 1,
            color: "rgba(255,255,255,0.06)",
            userSelect: "none",
          }}
        >
          {glyph}
        </div>
      ) : null}
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }} />
    </div>
  );
}
