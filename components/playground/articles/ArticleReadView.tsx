"use client";

import { useState } from "react";
import { IoArrowBack, IoChatbubbleOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import type { Article } from "@/lib/playground/types";
import type { PlaygroundTarget } from "@/lib/playground/flows";
import { app } from "@/lib/playground/appTheme";
import { ArticleCover } from "./ArticleCover";
import { ArticleByline, Engagement, formatCount } from "./ArticleByline";

/**
 * The article reading screen. Closes the flow: open a card or row and land
 * here, read the piece, like it, or go back. Like is the one live affordance
 * (brand green when active, matching the real app).
 */
export function ArticleReadView({
  article,
  onBack,
  target,
}: {
  article: Article;
  onBack: () => void;
  target: PlaygroundTarget;
}) {
  const web = target === "web";
  const [liked, setLiked] = useState(false);
  const likeCount = article.likes + (liked ? 1 : 0);

  return (
    <div
      style={{
        padding: web ? "20px 28px 64px" : "12px 16px 40px",
        maxWidth: web ? 720 : undefined,
        margin: web ? "0 auto" : undefined,
      }}
    >
      <button
        type="button"
        onClick={onBack}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: app.surface1,
          border: `1px solid ${app.border}`,
          borderRadius: 999,
          padding: "7px 14px 7px 11px",
          color: app.textSecondary,
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          font: "inherit",
        }}
      >
        <IoArrowBack size={16} aria-hidden /> Back to articles
      </button>

      <div style={{ marginTop: 16 }}>
        <ArticleCover article={article} aspect={web ? 2 / 1 : 16 / 9} radius={14} />
      </div>

      <div style={{ fontSize: 12.5, color: app.textMuted, marginTop: 18 }}>{article.kicker}</div>
      <h1
        style={{
          fontSize: web ? 34 : 26,
          lineHeight: 1.12,
          fontWeight: 800,
          letterSpacing: -0.6,
          margin: "8px 0 0",
        }}
      >
        {article.title}
      </h1>
      <div style={{ fontSize: web ? 17 : 15, lineHeight: 1.5, color: app.textSecondary, marginTop: 12 }}>
        {article.excerpt}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          margin: "20px 0",
          paddingBottom: 18,
          borderBottom: `1px solid ${app.border}`,
        }}
      >
        <ArticleByline article={article} avatarSize={32} />
        <Engagement likes={likeCount} comments={article.comments} />
      </div>

      {article.body.map((paragraph, i) => (
        <p
          key={i}
          style={{
            fontSize: web ? 17 : 15.5,
            lineHeight: 1.7,
            color: app.textSecondary,
            margin: "0 0 18px",
          }}
        >
          {paragraph}
        </p>
      ))}

      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: app.surface1,
            border: `1px solid ${liked ? app.green : app.border}`,
            borderRadius: 999,
            padding: "9px 16px",
            color: liked ? app.green : app.textSecondary,
            fontSize: 13.5,
            fontWeight: 600,
            cursor: "pointer",
            font: "inherit",
            transition: "color .15s ease, border-color .15s ease",
          }}
        >
          {liked ? <IoHeart size={17} aria-hidden /> : <IoHeartOutline size={17} aria-hidden />}
          {formatCount(likeCount)}
        </button>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: app.surface1,
            border: `1px solid ${app.border}`,
            borderRadius: 999,
            padding: "9px 16px",
            color: app.textSecondary,
            fontSize: 13.5,
            fontWeight: 600,
          }}
        >
          <IoChatbubbleOutline size={16} aria-hidden /> {formatCount(article.comments)}
        </div>
      </div>
    </div>
  );
}
