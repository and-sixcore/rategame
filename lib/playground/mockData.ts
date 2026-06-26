/**
 * Mock data for the playground prototypes — shared by the web + mobile
 * reproductions. Content is invented but shaped like the real product
 * (sports games, community ratings, a user profile, a feed).
 */

import type {
  CommunityPost,
  Game,
  League,
  Profile,
  Rating,
  Team,
  User,
} from "./types";

/* ----------------------------------------------------------------- teams -- */

export const teams = {
  LAL: { id: "lal", city: "Los Angeles", name: "Lakers", tricode: "LAL", color: "#552583", color2: "#FDB927" },
  GSW: { id: "gsw", city: "Golden State", name: "Warriors", tricode: "GSW", color: "#1D428A", color2: "#FFC72C" },
  BOS: { id: "bos", city: "Boston", name: "Celtics", tricode: "BOS", color: "#007A33", color2: "#BA9653" },
  DEN: { id: "den", city: "Denver", name: "Nuggets", tricode: "DEN", color: "#0E2240", color2: "#FEC524" },
  MIL: { id: "mil", city: "Milwaukee", name: "Bucks", tricode: "MIL", color: "#00471B", color2: "#EEE1C6" },
  NYK: { id: "nyk", city: "New York", name: "Knicks", tricode: "NYK", color: "#006BB6", color2: "#F58426" },
  PHI: { id: "phi", city: "Philadelphia", name: "Eagles", tricode: "PHI", color: "#004C54", color2: "#A5ACAF" },
  KC: { id: "kc", city: "Kansas City", name: "Chiefs", tricode: "KC", color: "#E31837", color2: "#FFB81C" },
  LIV: { id: "liv", city: "Liverpool", name: "Liverpool", tricode: "LIV", color: "#C8102E", color2: "#00B2A9" },
  ARS: { id: "ars", city: "Arsenal", name: "Arsenal", tricode: "ARS", color: "#EF0107", color2: "#063672" },
} satisfies Record<string, Team>;

export const leagueLabel: Record<League, string> = {
  nba: "NBA",
  nfl: "NFL",
  mlb: "MLB",
  nhl: "NHL",
  epl: "Premier League",
};

/* ----------------------------------------------------------------- games -- */

export const games: Game[] = [
  {
    id: "g1",
    league: "nba",
    status: "final",
    date: "May 28, 2026",
    statusLabel: "Final",
    home: teams.BOS,
    away: teams.NYK,
    homeScore: 118,
    awayScore: 121,
    avgRating: 9.1,
    ratingsCount: 4820,
    venue: "TD Garden",
    blurb: "Brunson drops 48 to steal Game 5 on the road.",
  },
  {
    id: "g2",
    league: "nba",
    status: "live",
    date: "May 28, 2026",
    statusLabel: "Q4 · 6:30",
    home: teams.DEN,
    away: teams.LAL,
    homeScore: 92,
    awayScore: 95,
    avgRating: 8.4,
    ratingsCount: 2110,
    venue: "Ball Arena",
    blurb: "Instant classic — five lead changes in the final three minutes.",
  },
  {
    id: "g3",
    league: "nba",
    status: "final",
    date: "May 27, 2026",
    statusLabel: "Final · OT",
    home: teams.GSW,
    away: teams.MIL,
    homeScore: 134,
    awayScore: 130,
    avgRating: 7.2,
    ratingsCount: 1640,
    venue: "Chase Center",
    blurb: "Curry and Giannis trade 40-pieces into overtime.",
  },
  {
    id: "g4",
    league: "nfl",
    status: "final",
    date: "May 25, 2026",
    statusLabel: "Final",
    home: teams.KC,
    away: teams.PHI,
    homeScore: 17,
    awayScore: 34,
    avgRating: 3.0,
    ratingsCount: 980,
    venue: "Arrowhead Stadium",
    blurb: "Blowout in the rematch — Eagles' defense smothers the comeback.",
  },
  {
    id: "g5",
    league: "epl",
    status: "scheduled",
    date: "May 30, 2026",
    statusLabel: "Sat · 12:30 PM",
    home: teams.LIV,
    away: teams.ARS,
    homeScore: null,
    awayScore: null,
    avgRating: null,
    ratingsCount: 0,
    venue: "Anfield",
    blurb: "Title decider — winner lifts the trophy on the final day.",
  },
];

export function getGame(id: string): Game | undefined {
  return games.find((g) => g.id === id);
}

export function matchupLabel(g: Game): string {
  return `${g.away.name} vs ${g.home.name}`;
}

/* ----------------------------------------------------------------- users -- */

export const users = {
  ilco: { id: "u1", username: "ilco", initials: "IL", color: "#7C3AED", badge: "Analyst" },
  mara: { id: "u2", username: "mara.h", initials: "MH", color: "#0EA5E9" },
  deej: { id: "u3", username: "deej", initials: "DJ", color: "#F59E0B", badge: "Pro" },
  santi: { id: "u4", username: "santi_99", initials: "SA", color: "#EF4444" },
  kw: { id: "u5", username: "kwallace", initials: "KW", color: "#10B981" },
  nova: { id: "u6", username: "nova", initials: "NO", color: "#EC4899", badge: "Creator" },
} satisfies Record<string, User>;

/* --------------------------------------------------------------- ratings -- */

export const ratings: Rating[] = [
  {
    id: "r1",
    user: users.ilco,
    score: 9.5,
    comment: "Best game of the playoffs. Brunson was unconscious in the fourth — couldn't look away.",
    likes: 312,
    replies: 28,
    timeAgo: "2h",
    category: "Watched",
    tags: ["Clutch", "Instant classic"],
    gameId: "g1",
  },
  {
    id: "r2",
    user: users.mara,
    score: 8.8,
    comment: "Atmosphere in the Garden was electric even with the road loss. Worth every minute.",
    likes: 140,
    replies: 9,
    timeAgo: "3h",
    category: "Attended",
    tags: ["Atmosphere"],
    gameId: "g1",
  },
  {
    id: "r3",
    user: users.deej,
    score: 9.0,
    comment: "Two stars going blow for blow. This is why we watch.",
    likes: 96,
    replies: 4,
    timeAgo: "4h",
    category: "Watched",
    tags: [],
    gameId: "g1",
  },
  {
    id: "r4",
    user: users.santi,
    score: 8.2,
    comment: "Refs let them play. Physical, fast, no garbage time. Knocking a point off for the turnovers.",
    likes: 54,
    replies: 12,
    timeAgo: "5h",
    category: "Highlights",
    tags: ["Physical"],
    gameId: "g1",
  },
  {
    id: "r5",
    user: users.kw,
    score: 2.5,
    comment: "Over by halftime. Chiefs never showed up — one of the flattest finals rematches I can remember.",
    likes: 71,
    replies: 18,
    timeAgo: "1d",
    category: "Watched",
    tags: ["Blowout"],
    gameId: "g4",
  },
  {
    id: "r6",
    user: users.nova,
    score: 3.5,
    comment: "Defense was elite if you're into that. As a neutral though? Painful to sit through.",
    likes: 33,
    replies: 6,
    timeAgo: "1d",
    category: "Watched",
    tags: [],
    gameId: "g4",
  },
];

export function ratingsForGame(gameId: string): Rating[] {
  return ratings.filter((r) => r.gameId === gameId);
}

/* --------------------------------------------------------------- profile -- */

export const currentUser: Profile = {
  id: "me",
  username: "andrej",
  initials: "AA",
  color: "#1AFF97",
  badge: "Analyst",
  bio: "Rating every game I watch. Hoops first, but I'll show up for a good final anywhere.",
  followers: 1284,
  following: 312,
  totalRatings: 419,
  avgRating: 6.8,
  streak: 27,
  favoriteTeams: [teams.LAL, teams.GSW, teams.LIV],
};

/** This user's own ratings, newest first — drives the profile activity tab. */
export const myRatings: Rating[] = [
  {
    id: "m1",
    user: currentUser,
    score: 9.0,
    comment: "Game 5 lived up to the hype. Road win in a hostile building is the hardest thing in sports.",
    likes: 64,
    replies: 5,
    timeAgo: "2h",
    category: "Watched",
    tags: ["Clutch"],
    gameId: "g1",
  },
  {
    id: "m2",
    user: currentUser,
    score: 8.5,
    comment: "OT and two MVPs trading haymakers — sign me up every night.",
    likes: 41,
    replies: 2,
    timeAgo: "1d",
    category: "Watched",
    tags: [],
    gameId: "g3",
  },
  {
    id: "m3",
    user: currentUser,
    score: 3.0,
    comment: "Rematch hype, blowout reality. Couldn't get into it.",
    likes: 12,
    replies: 1,
    timeAgo: "3d",
    category: "Highlights",
    tags: ["Blowout"],
    gameId: "g4",
  },
];

/* ----------------------------------------------------------------- feed --- */

export const communityFeed: CommunityPost[] = [
  {
    id: "c1",
    user: users.ilco,
    action: "rated",
    text: "Best game of the playoffs. Brunson was unconscious.",
    timeAgo: "2h",
    rating: 9.5,
    gameId: "g1",
    likes: 312,
    comments: 28,
  },
  {
    id: "c2",
    user: users.nova,
    action: "posted a list",
    text: "Top 10 Game 7s of the decade — fight me in the replies.",
    timeAgo: "4h",
    likes: 188,
    comments: 54,
  },
  {
    id: "c3",
    user: users.deej,
    action: "rated",
    text: "Two stars going blow for blow. This is why we watch.",
    timeAgo: "4h",
    rating: 9.0,
    gameId: "g1",
    likes: 96,
    comments: 4,
  },
  {
    id: "c4",
    user: users.kw,
    action: "rated",
    text: "Chiefs never showed up — flattest rematch I can remember.",
    timeAgo: "1d",
    rating: 2.5,
    gameId: "g4",
    likes: 71,
    comments: 18,
  },
  {
    id: "c5",
    user: users.mara,
    action: "started a thread",
    text: "Is the road team actually favored in this series now? The numbers say yes.",
    timeAgo: "1d",
    likes: 45,
    comments: 31,
  },
];
