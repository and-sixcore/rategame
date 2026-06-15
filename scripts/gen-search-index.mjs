// Generates lib/search-index.json from the handbook MDX pages so the ⌘K
// search can match page content (headings + body), not just titles.
// Runs automatically via the predev / prebuild npm scripts.
import { readFileSync, writeFileSync } from "node:fs";

const PAGES = [
  { file: "app/handbook/page.mdx", href: "/handbook" },
  { file: "app/handbook/philosophy/page.mdx", href: "/handbook/philosophy" },
  { file: "app/handbook/workflow/page.mdx", href: "/handbook/workflow" },
  { file: "app/handbook/tools/page.mdx", href: "/handbook/tools" },
  { file: "app/handbook/recipes/page.mdx", href: "/handbook/recipes" },
  {
    file: "app/handbook/recipes/achievements/page.mdx",
    href: "/handbook/recipes/achievements",
  },
  { file: "app/handbook/recipes/flags/page.mdx", href: "/handbook/recipes/flags" },
];

// Matches rehype-slug / github-slugger output for our headings.
function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function toText(raw) {
  return raw
    .replace(/export const metadata = \{[\s\S]*?\};/, "")
    .replace(/^import .*$/gm, "")
    .replace(/<[^>]+>/g, " ") // JSX tags
    .replace(/`{1,3}/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links -> text
    .replace(/[*_#>]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const index = PAGES.map(({ file, href }) => {
  const raw = readFileSync(file, "utf8");
  const h1 = raw.match(/^#\s+(.+)$/m);
  const title = h1 ? h1[1].trim() : href;
  const headings = [...raw.matchAll(/^(#{2,3})\s+(.+)$/gm)].map((m) => ({
    text: m[2].trim(),
    slug: slugify(m[2].trim()),
  }));
  return { title, href, headings, body: toText(raw) };
});

writeFileSync("lib/search-index.json", JSON.stringify(index, null, 2) + "\n");
console.log(`search index: ${index.length} pages`);
