"use client";

import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import type { Player } from "@/lib/playground/types";
import type { PlaygroundTarget } from "@/lib/playground/flows";
import { app } from "@/lib/playground/appTheme";
import { takesForPlayer } from "@/lib/playground/mockData";
import { PlayerHero } from "./PlayerHero";
import { PlayerVitals } from "./PlayerVitals";
import { PlayerStory } from "./PlayerStory";
import { PlayerAchievements } from "./PlayerAchievements";
import { PlayerStats } from "./PlayerStats";
import { PlayerTakes } from "./PlayerTakes";

const TABS = ["Profile", "Stats", "Takes"] as const;
type Tab = (typeof TABS)[number];

function TabStrip({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 6,
        marginTop: 14,
        background: app.surface1,
        border: `1px solid ${app.border}`,
        borderRadius: 12,
        padding: 4,
      }}
    >
      {TABS.map((t) => {
        const active = t === tab;
        return (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: "8px 4px",
              borderRadius: 9,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              background: active ? app.surface3 : "transparent",
              color: active ? app.text : app.textMuted,
            }}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

/**
 * The full player detail page. Web stacks everything (main column + sticky
 * vitals sidebar, then stats and takes full width); mobile tabs between
 * Profile / Stats / Takes under a persistent hero.
 */
export function PlayerDetail({
  player,
  target,
  onBack,
}: {
  player: Player;
  target: PlaygroundTarget;
  onBack: () => void;
}) {
  const web = target === "web";
  const [tab, setTab] = useState<Tab>("Profile");
  const takes = takesForPlayer(player.id);

  return (
    <div
      style={{
        padding: web ? "20px 28px 48px" : "12px 14px 28px",
        maxWidth: web ? 1040 : undefined,
        margin: web ? "0 auto" : undefined,
      }}
    >
      <button
        type="button"
        onClick={onBack}
        className="pg-hover"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "transparent",
          border: "none",
          color: app.textMuted,
          cursor: "pointer",
          fontSize: 13.5,
          padding: "4px 2px",
          marginBottom: 12,
        }}
      >
        <IoArrowBack size={16} aria-hidden /> Players
      </button>

      <PlayerHero player={player} target={target} />

      {web ? (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginTop: 16, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <PlayerStory player={player} target={target} />
              <PlayerAchievements player={player} target={target} />
            </div>
            <div style={{ position: "sticky", top: 16 }}>
              <PlayerVitals player={player} target={target} />
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <PlayerStats player={player} target={target} />
          </div>
          <div style={{ marginTop: 16 }}>
            <PlayerTakes player={player} takes={takes} target={target} />
          </div>
        </>
      ) : (
        <>
          <TabStrip tab={tab} setTab={setTab} />
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
            {tab === "Profile" && (
              <>
                <PlayerVitals player={player} target={target} />
                <PlayerStory player={player} target={target} />
                <PlayerAchievements player={player} target={target} />
              </>
            )}
            {tab === "Stats" && <PlayerStats player={player} target={target} />}
            {tab === "Takes" && <PlayerTakes player={player} takes={takes} target={target} />}
          </div>
        </>
      )}
    </div>
  );
}
