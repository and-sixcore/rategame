import type { Article } from "@/lib/playground/types";
import { app } from "@/lib/playground/appTheme";
import { leagueLabel } from "@/lib/playground/mockData";
import { GradientCover } from "./GradientCover";

/** The word shown on a gradient cover — league code, else the kicker's lead. */
function coverGlyph(a: Article): string {
  if (a.league) return leagueLabel[a.league];
  return a.kicker.split(" · ")[0];
}

/**
 * Article cover media. Renders the real image when present, otherwise an
 * on-brand gradient. Owns the aspect ratio + radius so cards and the read view
 * stay consistent.
 */
export function ArticleCover({
  article,
  aspect = 16 / 9,
  radius = 12,
}: {
  article: Article;
  /** width / height, e.g. 16/9 for grid, 1 for a square feed thumbnail. */
  aspect?: number;
  radius?: number;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: aspect,
        borderRadius: radius,
        overflow: "hidden",
        background: app.surface2,
        flex: "0 0 auto",
      }}
    >
      {article.image ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${article.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ) : (
        <GradientCover seed={article.id} glyph={coverGlyph(article)} />
      )}
    </div>
  );
}
