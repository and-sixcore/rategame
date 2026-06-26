/**
 * Sections catalog — the component library for the playground.
 *
 * A "section" is a component to build, from atomic (button, chip) to advanced
 * (game details, advanced filters). This list was derived from a deep dive of
 * the real apps (rategame-web + rategame-mobile); `refs` point at where each
 * one lives there. Nothing here is built yet — they're `planned`; someone goes
 * through them one by one. When a flow is built, the components it produces get
 * registered here (status `built`) so they can be opened and edited.
 *
 * RULE: every section built MUST use the handbook's core design system and not
 * deviate — tokens in app/globals.css (@theme) + primitives in components/ui/
 * (ScorePill, RateButton, Chip) + the /system/foundations spec. No off-system
 * colors/spacing/type. Semaphore (green/yellow/red) appears ONLY on rating
 * values, never as decoration.
 */

export type SectionStatus = "planned" | "building" | "built";
export type SectionComplexity = "atomic" | "composite" | "advanced";
export type SectionSource = "web" | "mobile" | "both";
export type SectionCategory =
  | "Games"
  | "Ratings"
  | "Profile"
  | "Community & Posts"
  | "Articles"
  | "Navigation"
  | "Filters & Search"
  | "Stadiums"
  | "Common";

export interface Section {
  id: string;
  name: string;
  category: SectionCategory;
  complexity: SectionComplexity;
  source: SectionSource;
  description: string;
  variants?: string[];
  /** Where it lives in the real apps — reference for whoever builds it. */
  refs?: { web?: string; mobile?: string };
  status: SectionStatus;
  /** Future: id of the flow whose build produced this section. */
  flowId?: string;
}

export const CATEGORY_ORDER: SectionCategory[] = [
  "Games",
  "Ratings",
  "Profile",
  "Community & Posts",
  "Articles",
  "Navigation",
  "Filters & Search",
  "Stadiums",
  "Common",
];

const planned = "planned" as const;

export const sections: Section[] = [
  // ----------------------------------------------------------------- Games --
  { id: "game-card", name: "Game Card", category: "Games", complexity: "composite", source: "both", status: planned,
    description: "Primary game card — teams, score, average-rating circle, rate button.",
    variants: ["ready-to-rate", "finished", "upcoming", "live", "medium / compact", "carousel"],
    refs: { web: "components/game/FinishedGameCardWithRate.tsx", mobile: "src/components/game/FullWidthGameCard.tsx" } },
  { id: "live-game-card", name: "Live Game Card", category: "Games", complexity: "advanced", source: "both", status: planned,
    description: "Real-time game: live score, clock, field/runners state, team-pick percentages.",
    refs: { web: "components/game-details/UnifiedLiveGameCard/LiveGameCard.tsx" } },
  { id: "teams-frame", name: "Teams Frame", category: "Games", complexity: "composite", source: "both", status: planned,
    description: "Team logos, scores, seeds, winner indicator + rating circle — the matchup unit.",
    variants: ["small", "medium", "large", "grid", "no rating circle"],
    refs: { mobile: "src/components/game/TeamsFrame.tsx" } },
  { id: "game-details", name: "Game Details", category: "Games", complexity: "advanced", source: "both", status: planned,
    description: "Full game detail page/screen — header + tabs (Ratings / Takes / Stats) + sections.",
    refs: { web: "components/game-details/*", mobile: "src/views/Games/GameDetails.tsx" } },
  { id: "game-details-header", name: "Game Details Header", category: "Games", complexity: "composite", source: "both", status: planned,
    description: "Sticky detail header — teams, score, date, and favorite / share / rate actions.",
    refs: { mobile: "src/views/Games/components/game-details/GameDetailsHeader.tsx" } },
  { id: "featured-carousel", name: "Featured Games Carousel", category: "Games", complexity: "composite", source: "both", status: planned,
    description: "Horizontal carousel of featured games with pagination dots.",
    refs: { mobile: "src/components/game/FeaturedGamesCarousel.tsx" } },
  { id: "mini-game-card", name: "Mini Game Card", category: "Games", complexity: "composite", source: "both", status: planned,
    description: "Compact inline game card for lists and embeds.",
    refs: { web: "components/lists/MiniGameCard.tsx" } },
  { id: "score-prediction", name: "Score Prediction", category: "Games", complexity: "composite", source: "mobile", status: planned,
    description: "Sheet to submit / edit a game score prediction with per-team inputs.",
    refs: { mobile: "src/components/game/ScorePredictionBottomSheet.tsx" } },

  // --------------------------------------------------------------- Ratings --
  { id: "rating-circle", name: "Rating Circle", category: "Ratings", complexity: "atomic", source: "both", status: planned,
    description: "The score badge (0–10), color-coded green / yellow / red with a glow. THE signature primitive.",
    variants: ["sizes (mini → massive)", "SVG", "non-SVG"],
    refs: { web: "components/circle-rating/CircleRating.tsx", mobile: "src/components/game/CircleRatingNoSvg.tsx" } },
  { id: "rating-card", name: "Rating Card (Post)", category: "Ratings", complexity: "composite", source: "both", status: planned,
    description: "A user's rating / take — avatar, score badge, comment, tags, likes/reactions, menu. The core feed post.",
    variants: ["small", "large", "top take", "search result", "sharing"],
    refs: { web: "components/user/RatingCard.tsx", mobile: "src/components/rating-card/RatingCard.tsx" } },
  { id: "ratings-breakdown", name: "Ratings Breakdown", category: "Ratings", complexity: "composite", source: "both", status: planned,
    description: "Distribution histogram across score ranges + fan-group breakdown + expandable list.",
    refs: { web: "components/game-details/RatingsBreakdown.tsx", mobile: "src/views/Games/components/game-details/RatingsBreakdown.tsx" } },
  { id: "rate-game-flow", name: "Rate Game Flow", category: "Ratings", complexity: "advanced", source: "both", status: planned,
    description: "Rating submission — semicircle slider, category radios, comment, optional stadium rating.",
    variants: ["rate", "edit"],
    refs: { web: "components/RateDialog.tsx", mobile: "src/views/Games/components/game-details/RateGameSheet.tsx" } },
  { id: "user-rating-avatar", name: "User Rating Avatar", category: "Ratings", complexity: "atomic", source: "both", status: planned,
    description: "Avatar with the rating-score badge overlaid — used in summaries and breakdowns.",
    refs: { mobile: "src/components/rating-card/UserRatingAvatarCircle.tsx" } },
  { id: "experience-rating-card", name: "Experience Rating Card", category: "Ratings", complexity: "composite", source: "both", status: planned,
    description: "Game-experience rating with event chips, fans, and edit / delete options.",
    refs: { mobile: "src/components/rating-card/ExperienceRatingCard.tsx" } },

  // --------------------------------------------------------------- Profile --
  { id: "profile-header", name: "Profile Header", category: "Profile", complexity: "composite", source: "both", status: planned,
    description: "Avatar, name, badges, follow button, favorite teams, bio, location.",
    refs: { web: "components/user/ProfileUserInfo.tsx", mobile: "src/views/Profile/components/ProfileUserInfo.tsx" } },
  { id: "profile-stats", name: "Profile Stats", category: "Profile", complexity: "composite", source: "both", status: planned,
    description: "Metrics row — ratings count, league rank, streak, connections (stat circles).",
    refs: { web: "components/user/stats/ProfileStatsHeader.tsx", mobile: "src/views/Profile/components/StatCircle.tsx" } },
  { id: "profile-rating-circles", name: "Profile Rating Circles", category: "Profile", complexity: "composite", source: "web", status: planned,
    description: "Grid of per-league average-rating circles for a user.",
    refs: { web: "components/user/ProfileRatingCircles.tsx" } },
  { id: "profile-screen", name: "Profile Screen", category: "Profile", complexity: "advanced", source: "both", status: planned,
    description: "Full profile — header + tabs (activity / favorites / more) + sections.",
    refs: { mobile: "src/views/Profile/ProfileContainer.tsx" } },
  { id: "achievements", name: "Achievements", category: "Profile", complexity: "composite", source: "web", status: planned,
    description: "Unlocked achievements with progress indicators.",
    refs: { web: "components/user/ProfileAchievementsSidebar.tsx" } },
  { id: "streak-badge", name: "Streak Badge", category: "Profile", complexity: "atomic", source: "both", status: planned,
    description: "Current rating streak with a fire icon.",
    refs: { web: "components/user/UserStreak.tsx" } },

  // ----------------------------------------------------- Community & Posts --
  { id: "chat-message", name: "Chat Message", category: "Community & Posts", complexity: "composite", source: "both", status: planned,
    description: "Chat bubble — avatar, name, badge, timestamp, embedded items, reactions, thread.",
    refs: { web: "components/community/chat/SingleChatMessage.tsx", mobile: "src/views/Community/components/SingleCommunityChatMessage.tsx" } },
  { id: "message-reactions", name: "Message Reactions", category: "Community & Posts", complexity: "atomic", source: "both", status: planned,
    description: "Reaction emoji chips + add-reaction picker, with reactor list.",
    refs: { web: "components/community/chat/MessageReactions.tsx", mobile: "src/views/Community/components/MessageReactions.tsx" } },
  { id: "list-card", name: "List Card", category: "Community & Posts", complexity: "composite", source: "web", status: planned,
    description: "Curated-list post — cover image, creator, item previews, like / comment counts.",
    refs: { web: "components/lists/ListCard.tsx" } },
  { id: "leaderboard-card", name: "Leaderboard User Card", category: "Community & Posts", complexity: "composite", source: "web", status: planned,
    description: "Ranked-user entry — trophy, stats, league badge, pick streak.",
    refs: { web: "components/community/LeaderboardUserCard.tsx" } },
  { id: "community-feed", name: "Community Feed", category: "Community & Posts", complexity: "advanced", source: "both", status: planned,
    description: "The message / take feed screen — reactions, reply threads, media.",
    refs: { mobile: "src/views/Community/components/CommunityChatMessageList.tsx" } },

  // -------------------------------------------------------------- Articles --
  { id: "article-card", name: "Article Feed Card", category: "Articles", complexity: "composite", source: "both", status: planned,
    description: "Article preview — hero image, title, author info, like / comment counts.",
    refs: { web: "components/articles/ArticleFeedCard.tsx", mobile: "src/views/Community/Articles/components/ArticleFeedCard.tsx" } },

  // ------------------------------------------------------------ Navigation --
  { id: "top-nav", name: "Top Nav Bar", category: "Navigation", complexity: "composite", source: "web", status: planned,
    description: "Header — logo, nav links, search, user menu, notifications.",
    variants: ["desktop", "mobile"],
    refs: { web: "components/TopNavBarDesktop.tsx" } },
  { id: "sidebar-nav", name: "Navigation Sidebar", category: "Navigation", complexity: "composite", source: "web", status: planned,
    description: "Left sidebar — nav links, league filter, collapse toggle.",
    refs: { web: "components/NavigationSidebar.tsx" } },
  { id: "bottom-tab-bar", name: "Bottom Tab Bar", category: "Navigation", complexity: "composite", source: "mobile", status: planned,
    description: "Bottom navigation — 5 tabs with activity badges.",
    refs: { mobile: "src/components/tabs/CustomTabBar.tsx" } },
  { id: "create-fab", name: "Create FAB Menu", category: "Navigation", complexity: "composite", source: "mobile", status: planned,
    description: "Expandable floating action button — rate game, create list, trivia, article, stadium.",
    refs: { mobile: "src/components/tabs/FloatingCreateMenu.tsx" } },

  // -------------------------------------------------------- Filters & Search --
  { id: "search-bar", name: "Search Bar", category: "Filters & Search", complexity: "composite", source: "both", status: planned,
    description: "Search input with a game / user / list results dropdown.",
    refs: { web: "components/NavBarSearch.tsx" } },
  { id: "search-screen", name: "Search Screen", category: "Filters & Search", complexity: "advanced", source: "both", status: planned,
    description: "Full search — tabs (games / fans / ratings / teams), filter sheet, input.",
    refs: { mobile: "src/views/search/SearchScreen.tsx" } },
  { id: "advanced-filters", name: "Advanced Filters", category: "Filters & Search", complexity: "advanced", source: "both", status: planned,
    description: "Filter configuration — league, team, stadium, rating, time range, game type.",
    refs: { web: "components/filters/*", mobile: "src/views/search/components/SearchFilterSheet.tsx" } },
  { id: "filter-controls", name: "Sort & Filter Controls", category: "Filters & Search", complexity: "atomic", source: "both", status: planned,
    description: "Sort-games / filter-ratings / time-range dropdowns + filter chips.",
    refs: { web: "components/filters/GameSortDropdown.tsx", mobile: "src/views/Profile/components/ProfileRatingsFilter.tsx" } },

  // -------------------------------------------------------------- Stadiums --
  { id: "stadium-card", name: "Stadium Card", category: "Stadiums", complexity: "composite", source: "both", status: planned,
    description: "Stadium preview — photo, name, location, rating.",
    variants: ["directory", "medium", "mini"],
    refs: { web: "components/stadiums/directory/TopStadiumsCarousel.tsx", mobile: "src/components/stadium/MediumStadiumCard.tsx" } },
  { id: "stadium-rating-card", name: "Stadium Rating Card", category: "Stadiums", complexity: "composite", source: "both", status: planned,
    description: "Rating for a stadium experience — circle score, user, likes, photos, game context.",
    refs: { web: "components/stadiums/StadiumRatingCard.tsx", mobile: "src/components/rating-card/StadiumRatingCard.tsx" } },

  // ---------------------------------------------------------------- Common --
  { id: "button", name: "Button", category: "Common", complexity: "atomic", source: "both", status: planned,
    description: "Call-to-action button. Use the handbook's RateButton / design-system button — don't reinvent.",
    variants: ["primary", "secondary", "silver", "ternary", "outlined"],
    refs: { web: "components/ui/button.tsx", mobile: "src/components/buttons/index.tsx" } },
  { id: "chip", name: "Chip / Tag", category: "Common", complexity: "atomic", source: "both", status: planned,
    description: "Small label / tag (category, event, status). Handbook primitive: components/ui/Chip.tsx.",
    refs: { web: "components/ui/*", mobile: "src/components/*" } },
  { id: "score-pill", name: "Score Pill", category: "Common", complexity: "atomic", source: "both", status: planned,
    description: "The rating number on a neutral disc — the handbook's signature primitive (components/ui/ScorePill.tsx).",
    refs: { web: "components/circle-rating/*", mobile: "src/components/game/CircleRatingNoSvg.tsx" } },
  { id: "badge", name: "Badge", category: "Common", complexity: "atomic", source: "both", status: planned,
    description: "Achievement / award / league badge (Analyst, Pro, Creator, etc.).",
    refs: { web: "components/Badge.tsx", mobile: "src/components/Badge.tsx" } },
  { id: "avatar", name: "Avatar", category: "Common", complexity: "atomic", source: "both", status: planned,
    description: "User avatar with image fallback + optional badge overlay.",
    refs: { web: "components/ProfilePicture.tsx", mobile: "src/views/Profile/components/ProfilePicture.tsx" } },
  { id: "rating-slider", name: "Rating Slider", category: "Common", complexity: "atomic", source: "both", status: planned,
    description: "Interactive 0–10 range slider for rating input.",
    refs: { web: "components/ui/slider.tsx" } },
  { id: "tabs", name: "Tabs / Segmented", category: "Common", complexity: "atomic", source: "both", status: planned,
    description: "Section tabs / segmented control (Ratings / Takes / Stats).",
    refs: { web: "components/ui/tabs.tsx", mobile: "src/views/Games/components/game-details/sections/GameDetailsTabBar.tsx" } },
  { id: "sheet-modal", name: "Sheet / Modal", category: "Common", complexity: "composite", source: "both", status: planned,
    description: "Bottom-sheet / modal container with header, content, actions.",
    refs: { web: "components/ui/dialog.tsx" } },
  { id: "live-pill", name: "Live Indicator", category: "Common", complexity: "atomic", source: "both", status: planned,
    description: "\"LIVE\" pill with a pulsing dot for active games.",
    refs: { web: "components/LiveIndicator.tsx" } },
];

export function getSection(id: string): Section | undefined {
  return sections.find((s) => s.id === id);
}

export function sectionsByCategory(): { category: SectionCategory; items: Section[] }[] {
  return CATEGORY_ORDER.map((category) => ({
    category,
    items: sections.filter((s) => s.category === category),
  })).filter((g) => g.items.length > 0);
}
