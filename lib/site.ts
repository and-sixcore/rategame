// Canonical site URL. Override per environment with NEXT_PUBLIC_SITE_URL
// (set it in Vercel once the production domain is known).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://rategame.vercel.app";

// All routes for the sitemap.
export const ROUTES = [
  "/",
  "/handbook",
  "/handbook/philosophy",
  "/handbook/files",
  "/handbook/workflow",
  "/handbook/tools",
  "/handbook/recipes",
  "/handbook/recipes/achievements",
  "/handbook/recipes/flags",
  "/system",
  "/playground",
];
