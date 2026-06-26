import { app } from "@/lib/playground/appTheme";

/** Shown in a shell's content area when the selected flow renders nothing. */
export function EmptyHint({ label = "Empty shell" }: { label?: string }) {
  return (
    <div style={{ height: "100%", minHeight: 220, display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ textAlign: "center", color: app.textSubtle }}>
        <div style={{ fontSize: 13.5, fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 12, marginTop: 4, opacity: 0.8 }}>Pick a flow from the selector above</div>
      </div>
    </div>
  );
}
