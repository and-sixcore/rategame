"use client";

import { createContext, useContext } from "react";

export type Viewport = "desktop" | "tablet" | "mobile";
export type WebSection = "discover" | "search" | "community" | "games" | "articles" | "chat";

export interface WebNav {
  viewport: Viewport;
  /** mobile layout (sidebar → bottom nav). */
  compact: boolean;
  section: WebSection;
  go: (s: WebSection) => void;
  collapsed: boolean;
  toggleCollapsed: () => void;
  league: string;
  setLeague: (l: string) => void;
}

const Ctx = createContext<WebNav | null>(null);

export const WebNavProvider = Ctx.Provider;

export function useWebNav(): WebNav {
  const v = useContext(Ctx);
  if (!v) throw new Error("useWebNav used outside WebNavProvider");
  return v;
}

/** Web app font — prototypes use the handbook's SN Pro per design direction. */
export const WEB_FONT = "var(--font-sn-pro), ui-sans-serif, system-ui, sans-serif";
