"use client";

import { useState } from "react";
import type { PlaygroundTarget } from "@/lib/playground/flows";
import { app } from "@/lib/playground/appTheme";
import { players } from "@/lib/playground/mockData";
import { PlayerListRow } from "./PlayerListRow";
import { PlayerDetail } from "./PlayerDetail";

/**
 * Player Details flow controller. Holds the open-player state so the whole thing
 * is a clickable prototype: roster list (ranked by community rating) → tap →
 * full detail page → back. Mirrors the Articles flow.
 */
export function PlayerDetailsFlow({ target }: { target: PlaygroundTarget }) {
  const web = target === "web";
  const [openId, setOpenId] = useState<string | null>(null);
  const open = openId ? players.find((p) => p.id === openId) ?? null : null;

  if (open) {
    return <PlayerDetail player={open} target={target} onBack={() => setOpenId(null)} />;
  }

  const ranked = [...players].sort((a, b) => b.avgRating - a.avgRating);

  return (
    <div
      style={{
        padding: web ? "24px 28px 40px" : "16px 16px 24px",
        maxWidth: web ? 760 : undefined,
        margin: web ? "0 auto" : undefined,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: web ? 18 : 14 }}>
        <h1 style={{ fontSize: web ? 30 : 23, fontWeight: 800, letterSpacing: -0.6, margin: 0 }}>Players</h1>
        <span style={{ fontSize: 12.5, color: app.textMuted, flex: "0 0 auto" }}>Top rated</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {ranked.map((p) => (
          <PlayerListRow key={p.id} player={p} target={target} onOpen={() => setOpenId(p.id)} />
        ))}
      </div>
    </div>
  );
}
