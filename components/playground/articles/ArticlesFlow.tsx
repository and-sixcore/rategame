"use client";

import { useState } from "react";
import type { PlaygroundTarget } from "@/lib/playground/flows";
import { app } from "@/lib/playground/appTheme";
import { articles } from "@/lib/playground/mockData";
import { ArticleGridCard } from "./ArticleGridCard";
import { ArticleFeedRow } from "./ArticleFeedRow";
import { ArticleReadView } from "./ArticleReadView";

/**
 * The Articles flow controller. Holds the open-article state so the whole thing
 * is a clickable prototype: list (grid or feed) → open → read view → back. One
 * component drives both variants, switching layout on `variant` and sizing on
 * `target`.
 */
export function ArticlesFlow({
  target,
  variant,
}: {
  target: PlaygroundTarget;
  variant: "grid" | "feed";
}) {
  const web = target === "web";
  const [openId, setOpenId] = useState<string | null>(null);
  const open = openId ? articles.find((a) => a.id === openId) ?? null : null;

  if (open) {
    return <ArticleReadView article={open} target={target} onBack={() => setOpenId(null)} />;
  }

  return (
    <div
      style={{
        padding: web ? "24px 28px 40px" : "16px 16px 24px",
        maxWidth: web ? (variant === "feed" ? 720 : 1140) : undefined,
        margin: web ? "0 auto" : undefined,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: web ? 20 : 14,
        }}
      >
        <h1 style={{ fontSize: web ? 30 : 23, fontWeight: 800, letterSpacing: -0.6, margin: 0 }}>
          Articles
        </h1>
        <span style={{ fontSize: 12.5, color: app.textMuted, flex: "0 0 auto" }}>
          {variant === "grid" ? "Var A · grid" : "Var B · feed"}
        </span>
      </div>

      {variant === "grid" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: web ? 16 : 12,
          }}
        >
          {articles.map((a) => (
            <ArticleGridCard key={a.id} article={a} target={target} onOpen={() => setOpenId(a.id)} />
          ))}
        </div>
      ) : (
        <div>
          {articles.map((a) => (
            <ArticleFeedRow key={a.id} article={a} target={target} onOpen={() => setOpenId(a.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
