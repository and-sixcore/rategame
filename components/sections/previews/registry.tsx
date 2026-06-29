"use client";

/**
 * Live previews for BUILT sections. Each entry is a small, presentational demo
 * (mock data only) of a primitive from components/ui/. SectionDetail looks a
 * section's id up here; if found, it renders the preview in place of the
 * "Not built yet" placeholder. This is the wiring pattern for the library —
 * add a section's preview here and flip its status to "built" in lib/sections.ts.
 */
import * as React from "react";
import { IoFlame } from "react-icons/io5";

import { ScorePill } from "@/components/ui/ScorePill";
import { RateButton } from "@/components/ui/RateButton";
import { Chip } from "@/components/ui/Chip";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { RatingSlider } from "@/components/ui/RatingSlider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";

import { articles } from "@/lib/playground/mockData";
import { ArticleGridCard } from "@/components/playground/articles/ArticleGridCard";
import { ArticleFeedRow } from "@/components/playground/articles/ArticleFeedRow";
import { ArticleReadView } from "@/components/playground/articles/ArticleReadView";
import { ArticleCover } from "@/components/playground/articles/ArticleCover";
import { ArticleByline, Engagement } from "@/components/playground/articles/ArticleByline";

/** A labelled group inside a preview. */
function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-soft">{label}</div>
      <div className="flex flex-wrap items-end gap-4">{children}</div>
    </div>
  );
}

function ScorePillPreview() {
  return (
    <div className="flex flex-col gap-7">
      <Group label="Sizes">
        {(["xs", "sm", "md", "lg", "hero"] as const).map((s) => (
          <ScorePill key={s} value={8.2} size={s} />
        ))}
      </Group>
      <Group label="Semaphore (by value)">
        <ScorePill value={9.1} size="lg" />
        <ScorePill value={5.5} size="lg" />
        <ScorePill value={2.3} size="lg" />
      </Group>
    </div>
  );
}

function ButtonPreview() {
  return (
    <div className="flex flex-col gap-7">
      <Group label="Rate button">
        <RateButton />
        <RateButton compact />
      </Group>
      <Group label="States">
        <RateButton variant="rated" />
        <RateButton variant="disabled" />
      </Group>
    </div>
  );
}

function ChipPreview() {
  const [selected, setSelected] = React.useState("nba");
  const leagues = [
    { id: "nba", label: "NBA" },
    { id: "nfl", label: "NFL" },
    { id: "mlb", label: "MLB" },
  ];
  return (
    <div className="flex flex-col gap-7">
      <Group label="Filter chips (selectable)">
        {leagues.map((l) => (
          <Chip key={l.id} selected={selected === l.id} onClick={() => setSelected(l.id)}>
            {l.label}
          </Chip>
        ))}
      </Group>
      <Group label="With icon">
        <Chip>
          <IoFlame className="size-3.5" aria-hidden /> Trending
        </Chip>
        <Chip selected>
          <IoFlame className="size-3.5" aria-hidden /> Trending
        </Chip>
      </Group>
    </div>
  );
}

const BADGES: BadgeVariant[] = ["purple", "gold", "green", "steel", "silver"];

function BadgePreview() {
  return (
    <div className="flex flex-col gap-7">
      <Group label="Medallions">
        {BADGES.map((v) => (
          <Badge key={v} variant={v} size={28} />
        ))}
      </Group>
      <Group label="Next to a username">
        <span className="inline-flex items-center gap-1.5 text-body font-semibold text-fg">
          courtside_mike
          <Badge variant="gold" size={16} />
        </span>
        <span className="inline-flex items-center gap-1.5 text-body font-semibold text-fg">
          dana.h
          <Badge variant="purple" size={16} />
        </span>
      </Group>
    </div>
  );
}

function AvatarPreview() {
  const img =
    "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=160&h=160&fit=crop&crop=faces";
  return (
    <div className="flex flex-col gap-7">
      <Group label="Sizes (image)">
        {(["xs", "sm", "md", "lg"] as const).map((s) => (
          <Avatar key={s} src={img} name="Maria Sanchez" size={s} />
        ))}
      </Group>
      <Group label="Initials fallback">
        <Avatar name="Maria Sanchez" size="lg" />
        <Avatar name="courtside" size="lg" />
        <Avatar size="lg" />
      </Group>
      <Group label="With badge overlay">
        <Avatar src={img} name="Maria Sanchez" size="lg" badge="gold" />
        <Avatar name="Dana Hill" size="lg" badge="purple" />
      </Group>
    </div>
  );
}

function RatingSliderPreview() {
  const [value, setValue] = React.useState(7.4);
  return (
    <div className="flex max-w-md flex-col gap-7">
      <Group label="Interactive (0–10)">
        <div className="w-full">
          <RatingSlider value={value} onValueChange={setValue} />
        </div>
      </Group>
      <Group label="Disabled">
        <div className="w-full">
          <RatingSlider defaultValue={3.2} disabled />
        </div>
      </Group>
    </div>
  );
}

function TabsPreview() {
  return (
    <div className="max-w-md">
      <Tabs defaultValue="takes">
        <TabsList>
          <TabsTrigger value="takes" count={128}>
            Takes
          </TabsTrigger>
          <TabsTrigger value="ratings">Ratings</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>
        <TabsContent value="takes">
          <p className="text-body-sm text-muted">Fan takes and reactions for this game.</p>
        </TabsContent>
        <TabsContent value="ratings">
          <p className="text-body-sm text-muted">Score distribution and rating breakdown.</p>
        </TabsContent>
        <TabsContent value="stats">
          <p className="text-body-sm text-muted">Box score and play-by-play stats.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* --------------------------------------------------------------- articles -- */
/**
 * Article previews reuse the SAME components the playground Articles flow uses
 * (single source of truth). They render the playground (appTheme) components on
 * a dark product surface so they read correctly inside /system.
 */
const PG_FONT = "var(--font-sn-pro), ui-sans-serif, system-ui, sans-serif";
const A_IMG = articles.find((a) => a.image) ?? articles[0];
const A_GRAD = articles.find((a) => !a.image) ?? articles[0];

function PgSurface({ children, pad = 20 }: { children: React.ReactNode; pad?: number }) {
  return (
    <div style={{ background: "#0D0D0D", borderRadius: 16, padding: pad, color: "#fff", fontFamily: PG_FONT }}>
      {children}
    </div>
  );
}

function ArticleCardPreview() {
  return (
    <div className="flex flex-col gap-7">
      <Group label="Grid card (Var A)">
        <PgSurface>
          <div style={{ width: 320, maxWidth: "100%" }}>
            <ArticleGridCard article={A_IMG} target="web" onOpen={() => {}} />
          </div>
        </PgSurface>
      </Group>
      <Group label="Feed row (Var B)">
        <PgSurface>
          <div style={{ width: 640, maxWidth: "100%" }}>
            <ArticleFeedRow article={A_IMG} target="web" onOpen={() => {}} />
            <ArticleFeedRow article={A_GRAD} target="web" onOpen={() => {}} />
          </div>
        </PgSurface>
      </Group>
    </div>
  );
}

function ArticleReadViewPreview() {
  return (
    <PgSurface pad={0}>
      <div style={{ height: 460, overflow: "auto", borderRadius: 16 }}>
        <ArticleReadView article={A_IMG} target="web" onBack={() => {}} />
      </div>
    </PgSurface>
  );
}

function ArticleCoverPreview() {
  const grads = articles.filter((a) => !a.image).slice(0, 2);
  return (
    <Group label="Image · gradient fallback">
      <PgSurface>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <div style={{ width: 220 }}>
            <ArticleCover article={A_IMG} aspect={16 / 9} radius={12} />
          </div>
          {grads.map((a) => (
            <div key={a.id} style={{ width: 220 }}>
              <ArticleCover article={a} aspect={16 / 9} radius={12} />
            </div>
          ))}
        </div>
      </PgSurface>
    </Group>
  );
}

function ArticleBylinePreview() {
  return (
    <PgSurface>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <ArticleByline article={A_IMG} avatarSize={32} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, maxWidth: 440 }}>
          <ArticleByline article={A_GRAD} showRead={false} />
          <Engagement likes={A_GRAD.likes} comments={A_GRAD.comments} />
        </div>
      </div>
    </PgSurface>
  );
}

export const previewRegistry: Record<string, React.ComponentType> = {
  "score-pill": ScorePillPreview,
  button: ButtonPreview,
  chip: ChipPreview,
  badge: BadgePreview,
  avatar: AvatarPreview,
  "rating-slider": RatingSliderPreview,
  tabs: TabsPreview,
  "article-card": ArticleCardPreview,
  "article-read-view": ArticleReadViewPreview,
  "article-cover": ArticleCoverPreview,
  "article-byline": ArticleBylinePreview,
};
