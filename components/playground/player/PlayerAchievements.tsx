import { IoTrophyOutline } from "react-icons/io5";
import type { Player } from "@/lib/playground/types";
import type { PlaygroundTarget } from "@/lib/playground/flows";
import { app } from "@/lib/playground/appTheme";
import { Section } from "./PlayerSection";

/**
 * Crowning achievements — a grid of neutral cards (count, label, years). The
 * trophy glyph stays neutral; semaphore colour is reserved for rating values.
 */
export function PlayerAchievements({ player, target }: { player: Player; target: PlaygroundTarget }) {
  const web = target === "web";
  return (
    <Section title="Crowning achievements" web={web}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: web ? "repeat(auto-fill, minmax(220px, 1fr))" : "1fr",
          gap: 10,
        }}
      >
        {player.achievements.map((a) => (
          <div
            key={a.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "11px 13px",
              background: app.surface2,
              border: `1px solid ${app.border}`,
              borderRadius: 12,
            }}
          >
            <IoTrophyOutline size={18} color={app.textMuted} style={{ flex: "0 0 auto" }} aria-hidden />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.2 }}>
                {a.count && a.count > 1 ? `${a.count}× ` : ""}
                {a.label}
              </div>
              {a.detail && (
                <div style={{ marginTop: 2, fontSize: 12, color: app.textMuted }}>{a.detail}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
