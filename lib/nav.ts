// Sidebar navigation for the handbook. Order = display order.

export interface NavItem {
  label: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const handbookNav: NavSection[] = [
  {
    title: "Start here",
    items: [
      { label: "Overview", href: "/handbook" },
      { label: "Philosophy", href: "/handbook/philosophy" },
    ],
  },
  {
    title: "The system",
    items: [
      { label: "Files", href: "/handbook/files" },
      { label: "Workflow", href: "/handbook/workflow" },
      { label: "Tools", href: "/handbook/tools" },
    ],
  },
  {
    title: "Recipes",
    items: [
      { label: "Achievements", href: "/handbook/recipes/achievements" },
      { label: "Flags", href: "/handbook/recipes/flags" },
    ],
  },
  {
    title: "Reference",
    items: [{ label: "Resources", href: "/handbook/resources" }],
  },
];

// Flat list — handy for "next/prev" and active-state checks.
export const handbookNavFlat: NavItem[] = handbookNav.flatMap((s) => s.items);
