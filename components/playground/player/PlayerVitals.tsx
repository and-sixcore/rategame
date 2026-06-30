import type { Player } from "@/lib/playground/types";
import type { PlaygroundTarget } from "@/lib/playground/flows";
import { app } from "@/lib/playground/appTheme";
import { Section } from "./PlayerSection";

/** A single label / value pair in the vitals grid. */
function Vital({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 11.5, color: app.textSubtle, letterSpacing: 0.2 }}>{label}</div>
      <div style={{ marginTop: 3, fontSize: 14, color: app.text, fontWeight: 600 }}>{value}</div>
    </div>
  );
}

/**
 * Physical and biographical data card — the basketball-reference info block.
 * Leads with the physical trio (height, weight, eye colour), then bio + draft.
 */
export function PlayerVitals({ player, target }: { player: Player; target: PlaygroundTarget }) {
  const web = target === "web";
  const vitals: { label: string; value: string }[] = [
    { label: "Height", value: player.heightLabel },
    { label: "Weight", value: player.weightLabel },
    { label: "Eye color", value: player.eyeColor },
    { label: "Born", value: player.birthDate },
    { label: "Birthplace", value: player.birthPlace },
    { label: "Nationality", value: player.country },
    { label: "Draft", value: player.draft },
    { label: "Experience", value: `${player.experienceYears} years` },
    { label: "Status", value: player.status },
  ];

  return (
    <Section title="Physical and bio" web={web}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: web ? "1fr 1fr" : "1fr 1fr",
          rowGap: web ? 16 : 14,
          columnGap: 16,
        }}
      >
        {vitals.map((v) => (
          <Vital key={v.label} label={v.label} value={v.value} />
        ))}
      </div>
    </Section>
  );
}
