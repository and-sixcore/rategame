import type { Team } from "@/lib/playground/types";

/**
 * Stand-in team crest — a colored disc with the team tricode. (The real apps use
 * fetched logo art; tricodes keep the prototype self-contained with no assets.)
 */
export function TeamLogo({ team, size = 40 }: { team: Team; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: team.color,
        color: "#fff",
        border: `2px solid ${team.color2}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: Math.round(size * 0.3),
        letterSpacing: 0.3,
        lineHeight: 1,
        flex: "0 0 auto",
        userSelect: "none",
      }}
    >
      {team.tricode}
    </div>
  );
}
