"use client";

import { useState } from "react";
import { devices, type DeviceId } from "@/lib/playground/devices";
import { DEFAULT_FLOW } from "@/lib/playground/flows";
import { DeviceFrame } from "./DeviceFrame";
import { MobilePrototype } from "./mobile/MobilePrototype";
import { FlowPicker } from "./FlowPicker";
import { FullscreenButton } from "./FullscreenButton";

/** The mobile preview: flow selector + iOS/Android device switcher around the shell. */
export function MobileShell({ width = 360 }: { width?: number }) {
  const [device, setDevice] = useState<DeviceId>("iphone");
  const [flow, setFlow] = useState(DEFAULT_FLOW);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
        <FlowPicker target="mobile" value={flow} onChange={setFlow} />

        <div
          role="tablist"
          aria-label="Platform"
          style={{ display: "inline-flex", padding: 4, gap: 4, background: "var(--color-surface-1)", border: "1px solid var(--color-border)", borderRadius: 999 }}
        >
          {(Object.keys(devices) as DeviceId[]).map((id) => {
            const on = id === device;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={on}
                onClick={() => setDevice(id)}
                style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "7px 18px", fontSize: 13.5, fontWeight: 600, color: on ? "#0D0D0D" : "var(--color-fg-muted)", background: on ? "var(--color-green)" : "transparent" }}
              >
                {devices[id].short}
              </button>
            );
          })}
        </div>

        <FullscreenButton href={`/playground/preview?target=mobile&flow=${flow}&device=${device}`} />
      </div>

      <DeviceFrame device={device} width={width}>
        <MobilePrototype device={device} flowId={flow} />
      </DeviceFrame>

      <div style={{ fontSize: 12.5, color: "var(--color-fg-subtle)" }}>{devices[device].label}</div>
    </div>
  );
}
