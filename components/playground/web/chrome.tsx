"use client";

import type { IconType } from "react-icons";
import {
  IoGlobeOutline, IoGlobe,
  IoSearchOutline, IoSearch,
  IoPeopleOutline, IoPeople,
  IoFootballOutline, IoFootball,
  IoNewspaperOutline, IoNewspaper,
  IoChatbubbleOutline, IoChatbubble,
  IoChevronBack, IoChevronForward, IoChevronUp,
  IoMenu,
} from "react-icons/io5";
import { app } from "@/lib/playground/appTheme";
import { useWebNav, type WebSection } from "./env";

const NAV: { key: WebSection; label: string; icon: IconType; active: IconType }[] = [
  { key: "discover", label: "Discover", icon: IoGlobeOutline, active: IoGlobe },
  { key: "search", label: "Search", icon: IoSearchOutline, active: IoSearch },
  { key: "community", label: "Community", icon: IoPeopleOutline, active: IoPeople },
  { key: "games", label: "Games", icon: IoFootballOutline, active: IoFootball },
  { key: "articles", label: "Articles", icon: IoNewspaperOutline, active: IoNewspaper },
  { key: "chat", label: "Chat", icon: IoChatbubbleOutline, active: IoChatbubble },
];

const LEAGUES: { name: string; img?: string; globe?: boolean }[] = [
  { name: "All Leagues", globe: true },
  { name: "FIFA", img: "/playground/leagues/fifa.png" },
  { name: "NBA", img: "/playground/leagues/nba.png" },
  { name: "NHL", img: "/playground/leagues/nhl.png" },
  { name: "MLB", img: "/playground/leagues/mlb.png" },
  { name: "WNBA", img: "/playground/leagues/wnba.png" },
  { name: "MLS", img: "/playground/leagues/mls.png" },
  { name: "NFL", img: "/playground/leagues/nfl.png" },
];

function Logo({ wordmark = true }: { wordmark?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/rategame-logo.png" alt="RateGame" width={32} height={32} style={{ borderRadius: 8, display: "block", flex: "0 0 auto" }} />
      {wordmark && <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: -0.4 }}>RateGame</span>}
    </div>
  );
}

export function WebTopBar() {
  const { compact } = useWebNav();
  return (
    <div style={{ height: 60, flex: "0 0 auto", display: "flex", alignItems: "center", gap: 14, padding: "0 20px", borderBottom: `1px solid ${app.border}`, background: app.bg }}>
      {compact && <IoMenu size={24} color={app.text} />}
      <Logo wordmark={!compact} />
      {!compact ? (
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 440, display: "flex", alignItems: "center", gap: 10, height: 40, padding: "0 16px", borderRadius: 12, background: app.surface1, border: `1px solid ${app.border}`, color: app.textMuted, fontSize: 14 }}>
            <IoSearch size={17} />
            Search RateGame…
          </div>
        </div>
      ) : (
        <div style={{ flex: 1 }} />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {compact && <IoSearch size={21} color={app.text} />}
        <button style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "9px 20px", fontWeight: 700, fontSize: 14, color: "#0D0D0D", background: "#fff" }}>Log In</button>
      </div>
    </div>
  );
}

function Item({ active, icon, label, onClick, collapsed }: { active?: boolean; icon: ReactIcon; label: string; onClick?: () => void; collapsed: boolean }) {
  return (
    <button
      onClick={onClick}
      title={label}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        width: "100%",
        justifyContent: collapsed ? "center" : "flex-start",
        textAlign: "left",
        border: "none",
        cursor: "pointer",
        padding: collapsed ? "11px 0" : "11px 14px",
        borderRadius: 12,
        background: active ? app.surface2 : "transparent",
        color: active ? app.text : app.textSecondary,
        fontSize: 15,
        fontWeight: active ? 700 : 500,
      }}
    >
      {icon}
      {!collapsed && label}
    </button>
  );
}

type ReactIcon = React.ReactNode;

export function WebSidebar() {
  const { section, go, collapsed, toggleCollapsed, league, setLeague } = useWebNav();
  const width = collapsed ? 68 : 232;
  return (
    <div style={{ width, flex: "0 0 auto", position: "relative", borderRight: `1px solid ${app.border}`, background: app.bg }}>
      <div className="pg-scroll" style={{ height: "100%", overflowY: "auto", padding: collapsed ? "14px 10px" : 14, display: "flex", flexDirection: "column", gap: 4 }}>
        {NAV.map((n) => {
          const on = section === n.key;
          const Icon = on ? n.active : n.icon;
          return <Item key={n.key} active={on} icon={<Icon size={21} />} label={n.label} collapsed={collapsed} onClick={() => go(n.key)} />;
        })}

        <div style={{ height: 1, background: app.border, margin: "12px 6px" }} />

        {!collapsed && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "2px 12px 8px" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: app.textMuted }}>Leagues</span>
            <IoChevronUp size={16} color={app.textMuted} />
          </div>
        )}

        {LEAGUES.map((l) => {
          const on = league === l.name;
          return (
            <button
              key={l.name}
              onClick={() => setLeague(l.name)}
              title={l.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                justifyContent: collapsed ? "center" : "flex-start",
                border: "none",
                cursor: "pointer",
                padding: collapsed ? "8px 0" : "9px 14px",
                borderRadius: 12,
                background: on ? app.surface2 : "transparent",
                color: on ? app.text : app.textSecondary,
                fontSize: 14.5,
                fontWeight: on ? 700 : 500,
              }}
            >
              {l.globe ? (
                <IoGlobeOutline size={20} color={on ? app.text : app.textSecondary} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={l.img} alt="" width={20} height={20} style={{ display: "block", objectFit: "contain", flex: "0 0 auto" }} />
              )}
              {!collapsed && l.name}
            </button>
          );
        })}
      </div>

      {/* collapse toggle */}
      <button
        onClick={toggleCollapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        style={{
          position: "absolute",
          top: "50%",
          right: -13,
          transform: "translateY(-50%)",
          width: 26,
          height: 26,
          borderRadius: "50%",
          border: `1px solid ${app.borderStrong}`,
          background: app.surface2,
          color: app.text,
          display: "grid",
          placeItems: "center",
          cursor: "pointer",
          zIndex: 2,
        }}
      >
        {collapsed ? <IoChevronForward size={15} /> : <IoChevronBack size={15} />}
      </button>
    </div>
  );
}

export function WebBottomNav() {
  const { section, go } = useWebNav();
  const items = NAV.filter((n) => n.key !== "articles");
  return (
    <div style={{ height: 58, flex: "0 0 auto", display: "flex", borderTop: `1px solid ${app.border}`, background: app.bg }}>
      {items.map((n) => {
        const on = section === n.key;
        const Icon = on ? n.active : n.icon;
        return (
          <button key={n.key} onClick={() => go(n.key)} style={{ flex: 1, border: "none", background: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, color: on ? app.text : app.textMuted }}>
            <Icon size={21} />
            <span style={{ fontSize: 10.5, fontWeight: on ? 700 : 500 }}>{n.label}</span>
          </button>
        );
      })}
    </div>
  );
}
