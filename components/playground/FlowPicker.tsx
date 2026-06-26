"use client";

import { IoChevronDown } from "react-icons/io5";
import { flowsFor, type PlaygroundTarget } from "@/lib/playground/flows";

/** The flow selector — pick what renders in the shell. Grouped by `group`. */
export function FlowPicker({
  target,
  value,
  onChange,
}: {
  target: PlaygroundTarget;
  value: string;
  onChange: (id: string) => void;
}) {
  const list = flowsFor(target);
  const groups = Array.from(new Set(list.map((f) => f.group)));

  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--color-fg-subtle)" }}>Flow</span>
      <span style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            background: "var(--color-surface-1)",
            color: "var(--color-fg)",
            border: "1px solid var(--color-border)",
            borderRadius: 999,
            padding: "7px 32px 7px 14px",
            fontSize: 13.5,
            fontWeight: 600,
            fontFamily: "inherit",
            cursor: "pointer",
          }}
        >
          {groups.map((g) => {
            const items = list.filter((f) => f.group === g);
            return g === "—" ? (
              items.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))
            ) : (
              <optgroup key={g} label={g}>
                {items.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </optgroup>
            );
          })}
        </select>
        <IoChevronDown size={15} style={{ position: "absolute", right: 11, pointerEvents: "none", color: "var(--color-fg-muted)" }} />
      </span>
    </label>
  );
}
