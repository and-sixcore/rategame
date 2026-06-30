import type { Player } from "@/lib/playground/types";
import type { PlaygroundTarget } from "@/lib/playground/flows";
import { app } from "@/lib/playground/appTheme";
import { Section } from "./PlayerSection";

/** The narrative bio — a few paragraphs of player story. */
export function PlayerStory({ player, target }: { player: Player; target: PlaygroundTarget }) {
  const web = target === "web";
  return (
    <Section title="The story" web={web}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {player.story.map((para, i) => (
          <p
            key={i}
            style={{
              margin: 0,
              fontSize: web ? 15 : 14,
              lineHeight: 1.65,
              color: app.textSecondary,
            }}
          >
            {para}
          </p>
        ))}
      </div>
    </Section>
  );
}
