"use client";

import { useMemo, useState } from "react";
import { app } from "@/lib/playground/appTheme";
import { getFlow } from "@/lib/playground/flows";
import { WebNavProvider, WEB_FONT, type WebSection } from "./env";
import { WebTopBar, WebSidebar, WebBottomNav } from "./chrome";
import { EmptyHint } from "../EmptyHint";

export type { Viewport } from "./env";

export function WebApp({ viewport, flowId }: { viewport: "desktop" | "tablet" | "mobile"; flowId: string }) {
  const compact = viewport === "mobile";
  const [section, setSection] = useState<WebSection>("discover");
  const [collapsed, setCollapsed] = useState(false);
  const [league, setLeague] = useState("All Leagues");

  const nav = useMemo(
    () => ({
      viewport,
      compact,
      section,
      go: setSection,
      collapsed,
      toggleCollapsed: () => setCollapsed((c) => !c),
      league,
      setLeague,
    }),
    [viewport, compact, section, collapsed, league],
  );

  const content = getFlow(flowId)?.render({ target: "web" });

  return (
    <WebNavProvider value={nav}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column", background: app.bg, color: app.text, fontFamily: WEB_FONT }}>
        <WebTopBar />
        <div style={{ flex: 1, minHeight: 0, display: "flex" }}>
          {!compact && <WebSidebar />}
          <div className="pg-scroll" style={{ flex: 1, minWidth: 0, overflowY: "auto" }}>
            {content ?? <EmptyHint />}
          </div>
        </div>
        {compact && <WebBottomNav />}
      </div>
    </WebNavProvider>
  );
}
