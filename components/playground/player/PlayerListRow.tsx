"use client";

import type { Player } from "@/lib/playground/types";
import type { PlaygroundTarget } from "@/lib/playground/flows";
import { app } from "@/lib/playground/appTheme";
import { RatingCircle } from "@/components/playground/ui/RatingCircle";
import { PlayerHeadshot } from "./PlayerHeadshot";

/**
 * One row in the players roster — headshot (top-left), name, position and team,
 * jersey number, community rating circle. Clicking opens the detail page.
 */
export function PlayerListRow({
  player,
  target,
  onOpen,
}: {
  player: Player;
  target: PlaygroundTarget;
  onOpen: () => void;
}) {
  const web = target === "web";
  const avatar = web ? 48 : 44;
  return (
    <button
      type="button"
      onClick={onOpen}
      className="pg-hover"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: web ? 14 : 12,
        width: "100%",
        textAlign: "left",
        padding: web ? "12px 14px" : "10px 12px",
        background: app.surface1,
        border: `1px solid ${app.border}`,
        borderRadius: 16,
        cursor: "pointer",
        color: app.text,
      }}
    >
      <PlayerHeadshot player={player} size={avatar} shape="circle" showBorder={false} />

      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "block", fontSize: web ? 14 : 13, fontWeight: 700, letterSpacing: -0.2 }}>
          {player.firstName} {player.lastName}
        </span>
        <span style={{ display: "block", marginTop: 2, fontSize: web ? 12 : 11.5, color: app.textMuted }}>
          {player.position} · {player.team.city} {player.team.name}
        </span>
      </span>

      <span style={{ flex: "0 0 auto", alignSelf: "center", fontSize: 11.5, color: app.textSubtle, marginRight: 2 }}>
        #{player.jerseyNumber}
      </span>
      <span style={{ flex: "0 0 auto", alignSelf: "center" }}>
        <RatingCircle value={player.avgRating} size={web ? 38 : 34} glow={false} border />
      </span>
    </button>
  );
}
