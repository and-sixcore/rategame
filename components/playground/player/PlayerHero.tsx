"use client";

import type { Player } from "@/lib/playground/types";
import type { PlaygroundTarget } from "@/lib/playground/flows";
import { app } from "@/lib/playground/appTheme";
import { leagueLabel } from "@/lib/playground/mockData";
import { RatingCircle } from "@/components/playground/ui/RatingCircle";
import { PlayerHeadshot } from "./PlayerHeadshot";

/* Brushed-silver Rate control — mirrors the handbook RateButton material. */
const METALLIC = "linear-gradient(180deg, #ededed 0%, #d2d2d2 52%, #bdbdbd 100%)";
const METALLIC_SHADOW =
  "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.4)";

function RateButton({ small }: { small?: boolean }) {
  return (
    <button
      type="button"
      className="pg-hover"
      style={{
        backgroundImage: METALLIC,
        boxShadow: METALLIC_SHADOW,
        color: "#0D0D0D",
        border: "none",
        borderRadius: 12,
        padding: small ? "8px 16px" : "9px 18px",
        fontSize: small ? 13 : 14,
        fontWeight: 700,
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      Rate player
    </button>
  );
}

function HeadlineStat({ label, value, web }: { label: string; value: number; web: boolean }) {
  return (
    <div style={{ flex: 1, textAlign: "center", padding: web ? "10px 6px" : "8px 4px" }}>
      <div style={{ fontSize: web ? 24 : 20, fontWeight: 800, letterSpacing: -0.6, fontVariantNumeric: "tabular-nums" }}>
        {value.toFixed(1)}
      </div>
      <div style={{ marginTop: 2, fontSize: web ? 12 : 11, color: app.textMuted, letterSpacing: 0.2 }}>{label}</div>
    </div>
  );
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return `${n}`;
}

export function PlayerHero({ player, target }: { player: Player; target: PlaygroundTarget }) {
  const web = target === "web";
  const positions = player.positions?.join(" / ") ?? player.position;

  return (
    <div
      style={{
        borderRadius: 20,
        border: `1px solid ${app.border}`,
        overflow: "hidden",
        background: `linear-gradient(180deg, ${player.team.color} -30%, ${app.surface1} 42%, ${app.surface1} 100%)`,
      }}
    >
      <div style={{ padding: web ? 28 : 18 }}>
        {/* Headshot on top, name and details below — all centered. */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <PlayerHeadshot player={player} size={web ? 132 : 104} radius={18} />

          <div style={{ marginTop: web ? 16 : 12, fontSize: web ? 13 : 12, color: app.textSecondary, fontWeight: 600 }}>
            {player.team.city} {player.team.name} · #{player.jerseyNumber} · {leagueLabel[player.league]}
          </div>
          <h1
            style={{
              margin: "5px 0 0",
              fontSize: web ? 40 : 28,
              fontWeight: 800,
              letterSpacing: -1,
              lineHeight: 1.04,
            }}
          >
            {player.firstName} {player.lastName}
          </h1>
          <div style={{ marginTop: 7, fontSize: web ? 13.5 : 12.5, color: app.textMuted }}>
            {positions} · Shoots {player.shoots}
          </div>
          {player.nicknames.length > 0 && (
            <div style={{ marginTop: 4, fontSize: web ? 13 : 12, color: app.textSubtle, fontStyle: "italic" }}>
              {player.nicknames.join(" · ")}
            </div>
          )}

          {/* Community rating + Rate action, centered. */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: web ? 18 : 14 }}>
            <RatingCircle value={player.avgRating} size={web ? 56 : 50} />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: web ? 13 : 12.5, color: app.textSecondary, fontWeight: 600 }}>Community rating</div>
              <div style={{ fontSize: web ? 12.5 : 12, color: app.textMuted, marginTop: 1 }}>
                {formatCount(player.ratingsCount)} ratings
              </div>
            </div>
            <div style={{ marginLeft: 4 }}>
              <RateButton small={!web} />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: web ? 22 : 16,
            borderRadius: 14,
            border: `1px solid ${app.border}`,
            background: app.bg,
            overflow: "hidden",
          }}
        >
          <HeadlineStat label="PPG" value={player.ppg} web={web} />
          <div style={{ width: 1, background: app.border }} />
          <HeadlineStat label="RPG" value={player.rpg} web={web} />
          <div style={{ width: 1, background: app.border }} />
          <HeadlineStat label="APG" value={player.apg} web={web} />
        </div>
      </div>
    </div>
  );
}
