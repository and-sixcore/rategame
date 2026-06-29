"use client";

import { useState } from "react";
import type { Article } from "@/lib/playground/types";
import type { PlaygroundTarget } from "@/lib/playground/flows";
import { app } from "@/lib/playground/appTheme";
import { ArticleCover } from "./ArticleCover";
import { ArticleByline, Engagement } from "./ArticleByline";

/**
 * Var A — the editorial grid card. Cover on top (image or gradient), kicker,
 * title, optional excerpt, then a byline + like/comment footer. Deliberately
 * distinct from the Did You Know card: no overlaid chips, no vignette, text
 * sits below the media.
 */
export function ArticleGridCard({
  article,
  onOpen,
  target,
}: {
  article: Article;
  onOpen: () => void;
  target: PlaygroundTarget;
}) {
  const web = target === "web";
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        width: "100%",
        padding: 10,
        background: app.surface1,
        border: `1px solid ${hover ? app.borderStrong : app.border}`,
        borderRadius: 16,
        cursor: "pointer",
        color: app.text,
        font: "inherit",
        boxShadow: hover ? "0 10px 28px rgba(0,0,0,0.45)" : "none",
        transform: hover ? "translateY(-2px)" : "none",
        transition: "border-color .15s ease, transform .15s ease, box-shadow .15s ease",
      }}
    >
      <ArticleCover article={article} aspect={16 / 9} radius={10} />
      <div style={{ display: "flex", flexDirection: "column", gap: 7, padding: "12px 4px 4px" }}>
        <div style={{ fontSize: 12, color: app.textMuted }}>{article.kicker}</div>
        <div
          style={{
            fontSize: web ? 18 : 16.5,
            lineHeight: 1.25,
            fontWeight: 700,
            letterSpacing: -0.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.title}
        </div>
        {web ? (
          <div
            style={{
              fontSize: 13.5,
              lineHeight: 1.45,
              color: app.textMuted,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {article.excerpt}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            marginTop: 6,
          }}
        >
          <ArticleByline article={article} showRead={false} />
          <Engagement likes={article.likes} comments={article.comments} />
        </div>
      </div>
    </button>
  );
}
