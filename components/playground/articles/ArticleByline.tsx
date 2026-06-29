import { IoChatbubbleOutline, IoHeartOutline } from "react-icons/io5";
import type { Article } from "@/lib/playground/types";
import { app } from "@/lib/playground/appTheme";
import { Avatar } from "@/components/playground/ui/Avatar";

/** 1240 → "1.2k", 421 → "421". */
export function formatCount(n: number): string {
  if (n >= 1000) {
    const k = n / 1000;
    return `${k >= 10 ? Math.round(k) : k.toFixed(1)}k`;
  }
  return String(n);
}

/** Author line: avatar + author · date (· read time). Shared by card + read view. */
export function ArticleByline({
  article,
  avatarSize = 22,
  showRead = true,
  color = app.textMuted,
}: {
  article: Article;
  avatarSize?: number;
  showRead?: boolean;
  color?: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
      <Avatar user={article.author} size={avatarSize} />
      <div
        style={{
          fontSize: 12.5,
          color,
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: app.textSecondary, fontWeight: 600 }}>{article.author.username}</span>
        {` · ${article.date}`}
        {showRead ? ` · ${article.readMins} min read` : ""}
      </div>
    </div>
  );
}

/** Like + comment counts, outline icons. */
export function Engagement({
  likes,
  comments,
  color = app.textMuted,
  size = 15,
}: {
  likes: number;
  comments: number;
  color?: string;
  size?: number;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, color, fontSize: 12.5, flex: "0 0 auto" }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
        <IoHeartOutline size={size} aria-hidden /> {formatCount(likes)}
      </span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
        <IoChatbubbleOutline size={size} aria-hidden /> {formatCount(comments)}
      </span>
    </div>
  );
}
