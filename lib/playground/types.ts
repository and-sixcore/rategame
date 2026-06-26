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
