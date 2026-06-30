import { IoHeartOutline, IoChatbubbleOutline } from "react-icons/io5";
import type { Player, Rating } from "@/lib/playground/types";
import type { PlaygroundTarget } from "@/lib/playground/flows";
import { app } from "@/lib/playground/appTheme";
import { Avatar } from "@/components/playground/ui/Avatar";
import { RatingCircle } from "@/components/playground/ui/RatingCircle";
import { Section } from "./PlayerSection";

function TakeRow({ take, web }: { take: Rating; web: boolean }) {
  return (
    <div style={{ display: "flex", gap: 12, padding: "14px 0", borderTop: `1px solid ${app.border}` }}>
      <div style={{ position: "relative", flex: "0 0 auto" }}>
        <Avatar user={take.user} size={40} />
        <div style={{ position: "absolute", bottom: -4, right: -5 }}>
          <RatingCircle value={take.score} size={24} glow={false} border />
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13.5, fontWeight: 700 }}>{take.user.username}</span>
          {take.user.badge && (
            <span style={{ fontSize: 11, color: app.textSubtle }}>{take.user.badge}</span>
          )}
          <span style={{ fontSize: 12, color: app.textSubtle, marginLeft: "auto" }}>{take.timeAgo}</span>
        </div>
        <p style={{ margin: "5px 0 0", fontSize: web ? 14 : 13.5, lineHeight: 1.5, color: app.textSecondary }}>
          {take.comment}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 9, flexWrap: "wrap" }}>
          {take.tags.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 11.5,
                color: app.textMuted,
                background: app.surface2,
                borderRadius: 999,
                padding: "3px 9px",
              }}
            >
              {t}
            </span>
          ))}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: app.textSubtle, marginLeft: take.tags.length ? 4 : 0 }}>
            <IoHeartOutline size={13} aria-hidden /> {take.likes}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: app.textSubtle }}>
            <IoChatbubbleOutline size={13} aria-hidden /> {take.replies}
          </span>
        </div>
      </div>
    </div>
  );
}

/** Community takes about the player — the RateGame-native layer on the profile. */
export function PlayerTakes({
  player,
  takes,
  target,
}: {
  player: Player;
  takes: Rating[];
  target: PlaygroundTarget;
}) {
  const web = target === "web";
  const action = (
    <span style={{ fontSize: 12.5, color: app.textMuted }}>{takes.length} takes</span>
  );
  return (
    <Section title="Fan takes" web={web} action={action}>
      {takes.length === 0 ? (
        <div style={{ fontSize: 13.5, color: app.textMuted }}>No takes yet. Be the first to rate {player.firstName}.</div>
      ) : (
        <div style={{ marginTop: -14 }}>
          {takes.map((t) => (
            <TakeRow key={t.id} take={t} web={web} />
          ))}
        </div>
      )}
    </Section>
  );
}
