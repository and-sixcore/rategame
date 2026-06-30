import type { Player } from "@/lib/playground/types";
import { app } from "@/lib/playground/appTheme";

/**
 * A player's headshot. Renders the real photo on a team-colour backdrop (so
 * cut-out / transparent shots sit on brand), with an initials fallback. Mirrors
 * the ArticleCover pattern: a background-image layer, no next/image, so it
 * transfers cleanly to rategame-web.
 */
export function PlayerHeadshot({
  player,
  size = 120,
  shape = "rounded",
  radius = 18,
  showBorder = true,
}: {
  player: Pick<Player, "imageUrl" | "firstName" | "lastName" | "team">;
  size?: number;
  shape?: "rounded" | "circle";
  radius?: number;
  showBorder?: boolean;
}) {
  const r = shape === "circle" ? size / 2 : radius;
  const initials = `${player.firstName[0] ?? ""}${player.lastName[0] ?? ""}`;
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: r,
        overflow: "hidden",
        flex: "0 0 auto",
        background: `linear-gradient(155deg, ${player.team.color} 0%, ${app.surface1} 92%)`,
        border: showBorder ? `1px solid ${app.border}` : undefined,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {player.imageUrl ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${player.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
      ) : (
        <span style={{ color: "#fff", fontWeight: 800, fontSize: Math.round(size * 0.3), letterSpacing: -0.5 }}>
          {initials}
        </span>
      )}
    </div>
  );
}
