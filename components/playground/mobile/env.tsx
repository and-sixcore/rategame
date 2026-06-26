"use client";

import { createContext, useContext } from "react";
import type { Platform, PlatformTokens } from "@/lib/playground/devices";

export type TabKey = "discover" | "feed" | "games" | "chat" | "profile";

/** Shell-level context: platform + tokens for the chrome, and the (decorative) active tab. */
export interface MobileEnv {
  platform: Platform;
  tokens: PlatformTokens;
  tab: TabKey;
  setTab: (t: TabKey) => void;
}

const Ctx = createContext<MobileEnv | null>(null);

export const MobileEnvProvider = Ctx.Provider;

export function useMobileEnv(): MobileEnv {
  const v = useContext(Ctx);
  if (!v) throw new Error("useMobileEnv used outside MobileEnvProvider");
  return v;
}
