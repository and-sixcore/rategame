/**
 * Domain types for the playground prototypes. A trimmed, prototype-friendly
 * shape of the real `rategame-shared` model (Game, Rating, User, …) — enough to
 * drive faithful screens with mock data.
 */

export type League = "nba" | "nfl" | "mlb" | "nhl" | "epl";
export type GameStatus = "live" | "final" | "scheduled";
export type RatingCategory =
  | "Attended"
  | "Watched"
  | "Highlights"
  | "Listened"
  | "Partial";

export interface Team {
  id: string;
  city: string;
  name: string; // "Lakers"
  tricode: string; // "LAL"
  color: string; // primary brand color
  color2: string; // secondary
}

export interface Game {
  id: string;
  league: League;
  status: GameStatus;
  /** Display timestamp, e.g. "May 12, 2026". */
  date: string;
  /** Status pill text: "Final", "Q4 · 6:30", "Sun 7:30 PM". */
  statusLabel: string;
  home: Team;
  away: Team;
  homeScore: number | null;
  awayScore: number | null;
  /** Average community rating, 0–10, or null if unrated. */
  avgRating: number | null;
  ratingsCount: number;
  venue: string;
  /** One-line context shown under the matchup. */
  blurb: string;
}

export interface User {
  id: string;
  username: string;
  initials: string;
  color: string; // avatar background
  badge?: string; // "Analyst", "Pro", "Creator"
}

export interface Rating {
  id: string;
  user: User;
  /** 0–10. */
  score: number;
  comment: string;
  likes: number;
  replies: number;
  timeAgo: string; // "2h", "1d"
  category: RatingCategory;
  tags: string[];
  /** Which game this rating is about (for community/profile feeds). */
  gameId: string;
}

export interface Profile extends User {
  bio: string;
  followers: number;
  following: number;
  totalRatings: number;
  avgRating: number;
  streak: number;
  favoriteTeams: Team[];
}

export interface CommunityPost {
  id: string;
  user: User;
  /** "rated", "listed", "posted". */
  action: string;
  text: string;
  timeAgo: string;
  rating?: number;
  gameId?: string;
  likes: number;
  comments: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  /** One or two sentence dek shown under the title. */
  excerpt: string;
  /** Sentence-case kicker, e.g. "NBA · Match report". No all-caps, no em dashes. */
  kicker: string;
  /** Optional league, used to seed the gradient cover + label the kicker. */
  league?: League;
  author: User;
  /** Display date, e.g. "Jun 24, 2026". */
  date: string;
  readMins: number;
  /** Cover image path under /public. When omitted the cover renders a gradient. */
  image?: string;
  likes: number;
  comments: number;
  /** Body paragraphs for the read view. */
  body: string[];
}

/* ----------------------------------------------------------------- player -- */

/** A crowning achievement, e.g. { label: "MVP", count: 4, detail: "2009, 2010, …" }. */
export interface PlayerAchievement {
  id: string;
  label: string;
  /** Times won; renders as "4×" when > 1. */
  count?: number;
  /** Years / context shown under the label. */
  detail?: string;
}

/** One row of the stat table. A readable subset of the box-score columns. */
export interface PlayerStatLine {
  /** "2025-26", "2024-25", or "Career". */
  season: string;
  team?: string; // tricode for the season row
  games: number;
  pts: number;
  reb: number;
  ast: number;
  fgPct: number; // 51.5
  fg3Pct: number; // 31.7
  ftPct: number; // 73.7
}

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  /** "King James", "LBJ" — shown as a sub-line under the name. */
  nicknames: string[];
  /** Primary position, e.g. "Small Forward". */
  position: string;
  /** All listed positions, when the player is multi-positional. */
  positions?: string[];
  shoots: string; // "Right"
  league: League;
  team: Team;
  jerseyNumber: number;
  // Physical / bio
  heightLabel: string; // "6-9 (2.06 m)"
  weightLabel: string; // "250 lb (113 kg)"
  eyeColor: string; // "Brown"
  birthDate: string; // "December 30, 1984"
  birthPlace: string; // "Akron, Ohio"
  country: string; // "USA"
  experienceYears: number; // 23
  draft: string; // "2003 · Round 1, Pick 1 (CLE)"
  status: string; // "Active"
  /** Headshot under /public. Falls back to initials when omitted. */
  imageUrl?: string;
  // Community (RateGame)
  avgRating: number; // 0–10
  ratingsCount: number;
  // Headline averages (current season)
  ppg: number;
  rpg: number;
  apg: number;
  // Content
  story: string[];
  achievements: PlayerAchievement[];
  seasonStats: PlayerStatLine[];
  careerStats: PlayerStatLine;
}
