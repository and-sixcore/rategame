"use client";

import type { ReactNode } from "react";
import { app } from "./appTheme";
import { ratings } from "./mockData";
import { Avatar } from "@/components/playground/ui/Avatar";
import { RatingCircle } from "@/components/playground/ui/RatingCircle";
import { ArticlesFlow } from "@/components/playground/articles/ArticlesFlow";
import { PlayerDetailsFlow } from "@/components/playground/player/PlayerDetailsFlow";

/**
 * The playground is a prototype zone. A "flow" is a piece of UI (a flow, a
 * screen, or a single component) that renders inside the mobile and/or web
 * shell with mock data. Add yours to the `flows` array below — that's the only
 * place you touch to make it selectable in the playground.
 *
 * PORTABILITY — flow components get transferred into rategame-web (React 18 /
 * Tailwind v3) and wired to the backend there, so keep them transfer-ready:
 *   • Presentational: take data via props. The flow feeds mock data here; the
 *     web app passes real (backend) data to the same component.
 *   • Use the handbook's CORE DESIGN SYSTEM — globals.css @theme tokens +
 *     components/ui primitives (ScorePill/RateButton/Chip) + /system/foundations.
 *     No off-system colors/spacing/type; semaphore only on rating values. (On
 *     transfer these map to rategame-web's Tailwind v3 tokens — same design.)
 *   • React-18-safe: no use(), useActionState, useOptimistic, useFormStatus
 *     (lint blocks these); use forwardRef (not ref-as-a-prop) and
 *     <Context.Provider> (not the <Context> provider shorthand).
 */

export type PlaygroundTarget = "mobile" | "web";

export interface Flow {
  id: string;
  label: string;
  /** Grouping in the selector, e.g. "Flows" | "Components" | "Samples". "—" = ungrouped. */
  group: string;
  /** Which shells this can render in. */
  platforms: PlaygroundTarget[];
  render: (ctx: { target: PlaygroundTarget }) => ReactNode;
}

/* ---------------------------------------------------------------- sample -- */
/* A throwaway demo so the canvas isn't blank — delete or replace freely. */
function SampleRatings({ target }: { target: PlaygroundTarget }) {
  const web = target === "web";
  return (
    <div style={{ padding: web ? 28 : 16, maxWidth: web ? 640 : undefined, margin: web ? "0 auto" : undefined }}>
      <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4 }}>Sample flow</div>
      <div style={{ fontSize: 13.5, color: app.textMuted, margin: "4px 0 16px" }}>
        Demo of mock-data content rendering inside the shell. Swap this for a real flow.
      </div>
      {ratings.slice(0, 4).map((r) => (
        <div key={r.id} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: `1px solid ${app.border}` }}>
          <div style={{ position: "relative", flex: "0 0 auto" }}>
            <Avatar user={r.user} size={38} />
            <div style={{ position: "absolute", bottom: -4, right: -5 }}>
              <RatingCircle value={r.score} size={22} glow={false} border />
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700 }}>{r.user.username}</div>
            <div style={{ fontSize: 13, color: app.textSecondary, marginTop: 3, lineHeight: 1.4 }}>{r.comment}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------- registry -- */
export const flows: Flow[] = [
  { id: "empty", label: "Empty shell", group: "—", platforms: ["mobile", "web"], render: () => null },
  { id: "articles-grid", label: "Articles · Var A (grid)", group: "Articles", platforms: ["mobile", "web"], render: (c) => <ArticlesFlow target={c.target} variant="grid" /> },
  { id: "articles-feed", label: "Articles · Var B (feed)", group: "Articles", platforms: ["mobile", "web"], render: (c) => <ArticlesFlow target={c.target} variant="feed" /> },
  { id: "player-details", label: "Player · details", group: "Players", platforms: ["mobile", "web"], render: (c) => <PlayerDetailsFlow target={c.target} /> },
  { id: "sample-ratings", label: "Sample · ratings", group: "Samples", platforms: ["mobile", "web"], render: (c) => <SampleRatings target={c.target} /> },
];

export const DEFAULT_FLOW = "empty";

export function flowsFor(target: PlaygroundTarget): Flow[] {
  return flows.filter((f) => f.platforms.includes(target));
}

export function getFlow(id: string): Flow | undefined {
  return flows.find((f) => f.id === id);
}
