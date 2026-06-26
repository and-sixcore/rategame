"use client";

import { useMemo, useState } from "react";
import { devices, platformTokens, type DeviceId } from "@/lib/playground/devices";
import { app } from "@/lib/playground/appTheme";
import { getFlow } from "@/lib/playground/flows";
import { MobileEnvProvider, type TabKey } from "./env";
import { MobileStatusBar } from "./MobileStatusBar";
import { MobileTabBar } from "./MobileTabBar";
import { EmptyHint } from "../EmptyHint";

/**
 * The mobile SHELL: status bar + tab bar + home indicator. The content area
 * renders the selected flow (or an empty state). The visual shell is a
 * placeholder pending the Figma reference.
 */
export function MobilePrototype({ device, flowId }: { device: DeviceId; flowId: string }) {
  const platform = devices[device].platform;
  const tokens = platformTokens[platform];
  const [tab, setTab] = useState<TabKey>("discover");

  const env = useMemo(() => ({ platform, tokens, tab, setTab }), [platform, tokens, tab]);
  const content = getFlow(flowId)?.render({ target: "mobile" });

  return (
    <MobileEnvProvider value={env}>
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: app.bg, color: app.text, fontFamily: tokens.font }}>
        <MobileStatusBar />

        <div style={{ position: "relative", flex: 1, minHeight: 0, overflow: "hidden" }}>
          <div className="pg-scroll" style={{ position: "absolute", inset: 0, overflowY: "auto" }}>
            {content ?? <EmptyHint />}
            <div style={{ height: 92 }} />
          </div>
          <MobileTabBar />
        </div>

        {/* home indicator / gesture pill */}
        <div style={{ height: tokens.homeIndicator, flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: platform === "ios" ? 130 : 108, height: platform === "ios" ? 5 : 4, borderRadius: 999, background: "rgba(255,255,255,0.55)" }} />
        </div>
      </div>
    </MobileEnvProvider>
  );
}
