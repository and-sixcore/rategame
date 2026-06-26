"use client";

import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { IoDesktopOutline, IoTabletPortraitOutline, IoPhonePortraitOutline } from "react-icons/io5";
import { app } from "@/lib/playground/appTheme";
import { DEFAULT_FLOW } from "@/lib/playground/flows";
import { WebApp, type Viewport } from "./web/WebApp";
import { FlowPicker } from "./FlowPicker";
import { FullscreenButton } from "./FullscreenButton";

const VIEWPORTS: Record<Viewport, { w: number; h: number; label: string; icon: IconType }> = {
  desktop: { w: 1280, h: 800, label: "Desktop", icon: IoDesktopOutline },
  tablet: { w: 834, h: 1000, label: "Tablet", icon: IoTabletPortraitOutline },
  mobile: { w: 390, h: 780, label: "Mobile", icon: IoPhonePortraitOutline },
};
const CHROME = 38;

export function WebShell() {
  const [vp, setVp] = useState<Viewport>("desktop");
  const [flow, setFlow] = useState(DEFAULT_FLOW);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [avail, setAvail] = useState(900);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setAvail(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = VIEWPORTS[vp];
  const totalH = h + CHROME;
  const scale = Math.min(1, avail / w);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
        <FlowPicker target="web" value={flow} onChange={setFlow} />

        <div role="tablist" aria-label="Viewport" style={{ display: "inline-flex", padding: 4, gap: 4, background: "var(--color-surface-1)", border: "1px solid var(--color-border)", borderRadius: 999 }}>
          {(Object.keys(VIEWPORTS) as Viewport[]).map((id) => {
            const on = id === vp;
            const Icon = VIEWPORTS[id].icon;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={on}
                onClick={() => setVp(id)}
                style={{ display: "inline-flex", alignItems: "center", gap: 7, border: "none", cursor: "pointer", borderRadius: 999, padding: "7px 16px", fontSize: 13.5, fontWeight: 600, color: on ? "#0D0D0D" : "var(--color-fg-muted)", background: on ? "var(--color-green)" : "transparent" }}
              >
                <Icon size={16} />
                {VIEWPORTS[id].label}
              </button>
            );
          })}
        </div>

        <FullscreenButton href={`/playground/preview?target=web&flow=${flow}&vp=${vp}`} />
      </div>

      <div ref={wrapRef} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ width: w * scale, height: totalH * scale, flex: "0 0 auto" }}>
          <div
            style={{
              width: w,
              height: totalH,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              borderRadius: 14,
              overflow: "hidden",
              border: `1px solid ${app.border}`,
              boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
              background: app.bg,
            }}
          >
            <div style={{ height: CHROME, display: "flex", alignItems: "center", gap: 8, padding: "0 14px", background: app.surface1, borderBottom: `1px solid ${app.border}` }}>
              <span style={{ display: "flex", gap: 7 }}>
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57" }} />
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e" }} />
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840" }} />
              </span>
              <span style={{ flex: 1, marginLeft: 8, height: 22, borderRadius: 999, background: app.surface2, display: "flex", alignItems: "center", padding: "0 12px", color: app.textMuted, fontSize: 12 }}>
                rategame.io
              </span>
            </div>
            <div style={{ width: "100%", height: h, overflow: "hidden" }}>
              <WebApp viewport={vp} flowId={flow} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ fontSize: 12.5, color: "var(--color-fg-subtle)" }}>
        {VIEWPORTS[vp].label} · {w}×{h}
      </div>
    </div>
  );
}
