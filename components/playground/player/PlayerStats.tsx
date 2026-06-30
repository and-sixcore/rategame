import type { Player, PlayerStatLine } from "@/lib/playground/types";
import type { PlaygroundTarget } from "@/lib/playground/flows";
import { app } from "@/lib/playground/appTheme";
import { Section } from "./PlayerSection";

type Col = { key: keyof PlayerStatLine; label: string; kind: "text" | "int" | "dec" };

const COLS: Col[] = [
  { key: "season", label: "Season", kind: "text" },
  { key: "team", label: "Team", kind: "text" },
  { key: "games", label: "G", kind: "int" },
  { key: "pts", label: "PTS", kind: "dec" },
  { key: "reb", label: "REB", kind: "dec" },
  { key: "ast", label: "AST", kind: "dec" },
  { key: "fgPct", label: "FG%", kind: "dec" },
  { key: "fg3Pct", label: "3P%", kind: "dec" },
  { key: "ftPct", label: "FT%", kind: "dec" },
];

function cell(line: PlayerStatLine, col: Col): string {
  const v = line[col.key];
  if (col.kind === "text") return (v as string | undefined) ?? "—";
  if (v == null) return "—";
  return col.kind === "int" ? String(v) : (v as number).toFixed(1);
}

/** Season-by-season + career stat table. Scrolls horizontally on narrow shells. */
export function PlayerStats({ player, target }: { player: Player; target: PlaygroundTarget }) {
  const web = target === "web";
  const rows: { line: PlayerStatLine; isCareer: boolean }[] = [
    ...player.seasonStats.map((line) => ({ line, isCareer: false })),
    { line: player.careerStats, isCareer: true },
  ];

  return (
    <Section title="Stats" web={web} pad={false}>
      <div className="pg-scroll" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", minWidth: 540, borderCollapse: "collapse", fontVariantNumeric: "tabular-nums" }}>
          <thead>
            <tr>
              {COLS.map((c, i) => (
                <th
                  key={c.key}
                  style={{
                    textAlign: i < 2 ? "left" : "right",
                    padding: "10px 14px",
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: app.textSubtle,
                    background: app.surface2,
                    borderBottom: `1px solid ${app.border}`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ line, isCareer }) => (
              <tr key={line.season}>
                {COLS.map((c, i) => (
                  <td
                    key={c.key}
                    style={{
                      textAlign: i < 2 ? "left" : "right",
                      padding: "11px 14px",
                      fontSize: 13.5,
                      whiteSpace: "nowrap",
                      color: i === 0 ? app.text : app.textSecondary,
                      fontWeight: isCareer ? 700 : i === 0 ? 600 : 400,
                      borderTop: isCareer ? `1px solid ${app.borderStrong}` : `1px solid ${app.border}`,
                    }}
                  >
                    {cell(line, c)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
