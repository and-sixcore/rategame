"use client";

import { useState } from "react";
import type { Article } from "@/lib/playground/types";
import type { PlaygroundTarget } from "@/lib/playground/flows";
import { app } from "@/lib/playground/appTheme";
import { Avatar } from "@/components/playground/ui/Avatar";
import { ArticleCover } from "./ArticleCover";
import { Engagement } from "./ArticleByline";

/**
 * Var B — the Medium / Substack feed row. Author line, big title, excerpt, and
 * a meta row on the left; a thumbnail on the right; a divider between rows and
 * no card border, so it reads as a continuous feed rather than a grid of tiles.
 */
export function ArticleFeedRow({
  article,
  onOpen,
  target,
}: {
  article: Article;
  onOpen: () => void;
  target: PlaygroundTarget;
}) {
  const web = target === "web";
  const thumb = web ? 150 : 92;
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        background: hover ? "rgba(255,255,255,0.02)" : "transparent",
        border: "none",
        borderBottom: `1px solid ${app.border}`,
        padding: web ? "22px 12px" : "16px 8px",
        cursor: "pointer",
        color: app.text,
        font: "inherit",
        transition: "background .15s ease",
      }}
    >
      <div style={{ display: "flex", gap: web ? 24 : 14, alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: web ? 8 : 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
            <Avatar user={article.author} size={20} />
            <span style={{ fontSize: 12.5, color: app.textSecondary, fontWeight: 600 }}>
              {article.author.username}
            </span>
            <span
              style={{
                fontSize: 12.5,
                color: app.textMuted,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {`· ${article.kicker}`}
            </span>
          </div>
          <div
            style={{
              fontSize: web ? 21 : 17,
              lineHeight: 1.22,
              fontWeight: 700,
              letterSpacing: -0.4,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {article.title}
          </div>
          <div
            style={{
              fontSize: web ? 15 : 13.5,
              lineHeight: 1.5,
              color: app.textMuted,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {article.excerpt}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 4,
              color: app.textSubtle,
              fontSize: 12.5,
              flexWrap: "wrap",
            }}
          >
            <span>{article.date}</span>
            {web ? <span>{article.readMins} min read</span> : null}
            <span style={{ marginLeft: web ? "auto" : 0 }}>
              <Engagement likes={article.likes} comments={article.comments} color={app.textSubtle} />
            </span>
          </div>
        </div>
        <div style={{ width: thumb, flex: "0 0 auto" }}>
          <ArticleCover article={article} aspect={web ? 4 / 3 : 1} radius={8} />
        </div>
      </div>
    </button>
  );
}
