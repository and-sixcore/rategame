import type { ReactNode } from "react";
import { app } from "@/lib/playground/appTheme";

/** Titled card shell shared by the player detail sections, for visual consistency. */
export function Section({
  title,
  action,
  children,
  web,
  pad = true,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  web: boolean;
  /** Set false when the child owns its own padding (e.g. a full-bleed table). */
  pad?: boolean;
}) {
  return (
    <section
      style={{
        background: app.surface1,
        border: `1px solid ${app.border}`,
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: web ? "13px 18px" : "11px 14px",
          borderBottom: `1px solid ${app.border}`,
        }}
      >
        <h2 style={{ margin: 0, fontSize: web ? 15 : 14, fontWeight: 700, letterSpacing: -0.2, color: app.text }}>
          {title}
        </h2>
        {action}
      </div>
      <div style={{ padding: pad ? (web ? 18 : 14) : 0 }}>{children}</div>
    </section>
  );
}
