/**
 * Mock data for the playground prototypes — shared by the web + mobile
 * reproductions. Content is invented but shaped like the real product
 * (sports games, community ratings, a user profile, a feed).
 */

import type {
  Article,
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

/* -------------------------------------------------------------- articles -- */
/**
 * Editorial articles for the Articles flow. A few carry real cover images
 * (in /public/playground/articles); the rest fall back to a gradient cover.
 * Bodies are short so the read view feels complete without a backend.
 */

export const articles: Article[] = [
  {
    id: "a1",
    slug: "cape-verde-versus-goliath",
    title: "Cape Verde Versus Goliath",
    excerpt:
      "The smallest nation left in the bracket keeps writing chapters nobody saw coming. Inside the run that has a continent watching.",
    kicker: "World Cup · Feature",
    author: users.santi,
    date: "Jun 24, 2026",
    readMins: 6,
    image: "/playground/articles/cover-cape-verde.jpg",
    likes: 312,
    comments: 41,
    body: [
      "Half a million people live on the islands of Cape Verde. On Tuesday night, what felt like all of them were awake, watching a team ranked outside the top sixty take the lead against one of the tournament favorites and refuse to give it back.",
      "There is no secret here, no tactical revolution. The plan is simple and the players believe in it completely: stay compact, win the second ball, and trust the two forwards to make something out of nothing on the break. For seventy minutes it looked naive. For the last twenty it looked like genius.",
      "What makes this run land differently is the joy of it. This is not a team grinding out results and apologizing for them. They celebrate every clearance like a goal and play every pass like it might be the last one they ever get to make at this level.",
      "The next opponent is bigger, deeper, and rested. None of that has mattered yet. Cape Verde have turned every prediction into a dare, and so far they keep collecting on it.",
    ],
  },
  {
    id: "a2",
    slug: "what-are-the-chances-of-this-usa-dream",
    title: "What Are the Chances of This USA Dream?",
    excerpt:
      "Home soil, a golden generation, and a draw that finally broke their way. We ran the numbers on how far this team can really go.",
    kicker: "World Cup · Analysis",
    author: users.ilco,
    date: "Jun 22, 2026",
    readMins: 8,
    image: "/playground/articles/cover-usa-26.jpg",
    likes: 288,
    comments: 63,
    body: [
      "For the first time in a generation, the optimism around this team is not borrowed from the calendar. It is built on a spine of players who start for serious clubs and a manager who, for once, looks like he has a plan B.",
      "The draw helped. A favorable group and a kind first knockout path mean the hard games arrive late, when home advantage means the most and a young team has had a month to settle into the noise.",
      "Our model gives them a real, if slim, shot at the semifinals. The ceiling is high. The floor, against a team this athletic and this comfortable on home turf, is higher than it has been in years.",
      "None of this guarantees anything. But the question has changed. It is no longer whether this team belongs. It is how far belonging can take them.",
    ],
  },
  {
    id: "a3",
    slug: "why-ancelotti-is-not-playing-endrick",
    title: "Why Ancelotti Is Not Playing Endrick",
    excerpt:
      "Brazil's most gifted teenager is glued to the bench, and the manager keeps dodging the question. Here is the case he is quietly making.",
    kicker: "Tactics · Opinion",
    author: users.deej,
    date: "Jun 20, 2026",
    readMins: 5,
    image: "/playground/articles/cover-ancelotti.webp",
    likes: 174,
    comments: 96,
    body: [
      "Every press conference ends the same way. A reporter asks about the kid, the manager smiles, says something about patience, and moves on. The smile is doing a lot of work.",
      "The tactical read is not complicated. This Brazil side is built to control games through midfield and strike on transition, and the current front line presses in a way the teenager has not yet learned to. Talent was never the question. Trust in the structure is.",
      "There is a longer game here too. Bring a nineteen-year-old in cold off the bench in a knockout match and you risk defining his tournament by one bad ten minutes. Hold him back, use him as the closer, and you protect the asset while keeping a weapon in your pocket.",
      "It is a defensible plan. It is also a gamble, and everyone in the building knows whose name will be in the headline if it does not pay off.",
    ],
  },
  {
    id: "a4",
    slug: "my-thoughts-on-the-giannis-trade",
    title: "My Thoughts on the Giannis Trade",
    excerpt:
      "The deal that reset the league still does not add up for me. Three reasons the trade looks worse the longer you sit with it.",
    kicker: "NBA · Opinion",
    league: "nba",
    author: users.mara,
    date: "Jun 18, 2026",
    readMins: 7,
    image: "/playground/articles/cover-giannis.webp",
    likes: 421,
    comments: 158,
    body: [
      "When the news broke, the instant reaction was that someone had finally won the offseason. A week later, I am not sure anyone did.",
      "Start with the fit. You do not trade a haul of picks and young talent for a superstar to watch him share the floor with a roster built around a completely different idea of how to play. The spacing math is ugly, and no amount of star power fixes geometry.",
      "Then there is the timeline. The team giving up the future is betting on a two-year window. The team receiving it gets the picks, the flexibility, and the patience to use them. History is not kind to the side in a hurry.",
      "I want to be wrong. A talent this rare bends seasons by himself. But trades are won in the years after the headline, and this one has a lot of those years left to go wrong.",
    ],
  },
  {
    id: "a5",
    slug: "group-in-review-the-ratings-are-in",
    title: "Group in Review: The Ratings Are In, How Did We Do?",
    excerpt:
      "We asked you to rate every group-stage match. Thousands of scores later, here are the games you loved, the duds, and the upsets nobody saw coming.",
    kicker: "World Cup · Recap",
    league: "epl",
    author: users.nova,
    date: "Jun 16, 2026",
    readMins: 9,
    likes: 207,
    comments: 88,
    body: [
      "The group stage is the most generous part of any tournament. Thirty-two teams, dozens of matches, and a community willing to rate every one of them. So we counted.",
      "The highest-rated match was the one you would expect if you were watching, and a surprise if you only read the result. A late comeback, a sending off, and a winner in stoppage time will do that to a score.",
      "The lowest? A goalless draw between two teams who had already qualified and played like it. Sometimes the wisdom of the crowd is just a shrug, recorded thousands of times.",
      "What stood out most was the agreement. The best games were nearly unanimous, and the upsets that thrilled neutrals split rooms right down the middle. The bracket is set. The ratings, as always, told a story the table could not.",
    ],
  },
  {
    id: "a6",
    slug: "can-anyone-stop-the-dodgers",
    title: "Can Anyone Stop the Dodgers?",
    excerpt:
      "A record payroll, a deep rotation, and a lineup that does not quit. Halfway through the season, the rest of the league is running out of answers.",
    kicker: "MLB · Feature",
    league: "mlb",
    author: users.kw,
    date: "Jun 14, 2026",
    readMins: 6,
    likes: 133,
    comments: 27,
    body: [
      "There is a version of dominance that gets boring, and then there is this. The Dodgers are not just winning. They are winning in a way that makes the rest of the standings feel like a formality.",
      "The lineup is the headline, but the rotation is the story. Depth was supposed to be the one place a team could expose them. Instead it has become the place they bury opponents, with a fourth starter who would anchor most other clubs.",
      "The counterargument is that October is its own sport, and a long season of cruising can leave a team a step slow when the games tighten. It has happened before, to teams that looked just as unstoppable in June.",
      "For now, the question is not whether anyone can beat them once. It is whether anyone can do it four times in a row. Nobody has shown they can.",
    ],
  },
  {
    id: "a7",
    slug: "the-history-of-the-greatest-tournament",
    title: "The History of the Greatest Tournament",
    excerpt:
      "From thirteen teams in Uruguay to a planet that stops every four years. A short history of how the World Cup became the biggest show on earth.",
    kicker: "World Cup · Long read",
    league: "epl",
    author: users.ilco,
    date: "Jun 12, 2026",
    readMins: 12,
    likes: 312,
    comments: 44,
    body: [
      "It started small. Thirteen teams, a long boat ride to Uruguay, and a trophy that fit in a suitcase. Nobody at the first tournament could have pictured what it would become.",
      "The growth tracked the century. Television turned a sporting event into a shared global moment, and the moments did the rest. A save, a goal, a single touch could now be witnessed by half the world at once.",
      "Each era left its fingerprint. The artistry of the seventies, the drama of penalty shootouts, the slow opening of the game to nations who had only ever watched. The tournament got bigger by getting more honest about who the game belonged to.",
      "Today it stops everything. For one month every four years, borders blur and strangers argue about the same ninety minutes. That is the real history here. Not the winners, but the watching.",
    ],
  },
  {
    id: "a8",
    slug: "reranking-europes-top-clubs",
    title: "Reranking Europe's Top Clubs by World Cup Form",
    excerpt:
      "Bayern, Real, and PSG sent the most players to the tournament. But whose stars actually delivered when it counted? Our updated board.",
    kicker: "Soccer · Rankings",
    league: "epl",
    author: users.deej,
    date: "Jun 10, 2026",
    readMins: 7,
    likes: 96,
    comments: 52,
    body: [
      "Club reputation is built over seasons. The World Cup rebuilds it in weeks. A summer of internationals is the closest thing the sport has to a stress test, and this one has shuffled the board.",
      "The clubs who sent the most players are not the clubs whose players did the most. Quantity got headlines in May. Quality is getting them now, and a couple of names near the top have quietly slipped on the strength of one quiet tournament from a key man.",
      "The risers are the interesting part. A club that exported two unheralded midfielders has watched both run tournaments, and the transfer value following them home is the kind of swing a good window cannot buy.",
      "None of this is final. Form is a loan, not a gift. But if you are ranking Europe today, the order looks different than it did a month ago, and that is the point.",
    ],
  },
];

export function getArticle(idOrSlug: string): Article | undefined {
  return articles.find((a) => a.id === idOrSlug || a.slug === idOrSlug);
}
