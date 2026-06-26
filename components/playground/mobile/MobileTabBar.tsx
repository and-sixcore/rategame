"use client";

import type { IconType } from "react-icons";
import {
  IoGlobeOutline,
  IoGlobe,
  IoPeopleOutline,
  IoPeople,
  IoBasketballOutline,
  IoBasketball,
  IoChatbubbleOutline,
  IoChatbubble,
  IoPersonOutline,
  IoPerson,
} from "react-icons/io5";
import { app } from "@/lib/playground/appTheme";
import { useMobileEnv, type TabKey } from "./env";

const TABS: {
  key: TabKey;
  label: string;
  icon: IconType;
  active: IconType;
  dot?: boolean;
}[] = [
  { key: "discover", label: "Discover", icon: IoGlobeOutline, active: IoGlobe },
  { key: "feed", label: "Feed", icon: IoPeopleOutline, active: IoPeople, dot: true },
  { key: "games", label: "Games", icon: IoBasketballOutline, active: IoBasketball },
  { key: "chat", label: "Chat", icon: IoChatbubbleOutline, active: IoChatbubble, dot: true },
  { key: "profile", label: "Profile", icon: IoPersonOutline, active: IoPerson },
];

export function MobileTabBar() {
  const { tab, setTab, tokens } = useMobileEnv();

  return (
    <div
      style={{
        position: "absolute",
        left: 10,
        right: 10,
        bottom: 6,
        height: tokens.tabBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 6px",
        borderRadius: 26,
        background: "rgba(26,26,26,0.72)",
        border: `1px solid rgba(255,255,255,0.08)`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
      }}
    >
      {TABS.map((t) => {
        const on = t.key === tab;
        const Icon = on ? t.active : t.icon;
        return (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              padding: "8px 0",
              margin: "0 2px",
              borderRadius: 18,
              border: "none",
              cursor: "pointer",
              background: on ? "rgba(255,255,255,0.10)" : "transparent",
              color: on ? app.text : app.textMuted,
              position: "relative",
              fontFamily: tokens.font,
            }}
          >
            <span style={{ position: "relative", display: "flex" }}>
              <Icon size={tokens.tabIconSize} />
              {t.dot && (
                <span
                  style={{
                    position: "absolute",
                    top: -1,
                    right: -3,
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: app.green,
                    border: `1.5px solid ${app.surface1}`,
                  }}
                />
              )}
            </span>
            <span
              style={{
                fontSize: tokens.tabLabelSize,
                fontWeight: on ? 600 : 500,
                letterSpacing: 0.1,
              }}
            >
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
