// Single source of truth for the RateGame Figma files.
// Used by the "Files" page (icon + name + description, grouped).

export type FileGroup =
  | "Work files"
  | "Foundations & components"
  | "Promo & social"
  | "Strategy & misc";

export interface FigmaFile {
  /** Display name */
  name: string;
  /** Short role label */
  role: string;
  /** A simple one-line description of what the file is for */
  description: string;
  /** Figma URL */
  href: string;
  /** Grouping used on the Files page */
  group: FileGroup;
}

export const PROJECT_URL =
  "https://www.figma.com/files/team/1335267013487810394/project/386881286";

export const files: FigmaFile[] = [
  {
    name: "Workboard",
    role: "Worktable",
    description:
      "Where the work gets done. A no judgement space to design and prototype before it goes to Review.",
    href: "https://www.figma.com/design/X62L9VZmk8cNl5bgHY40MQ/Workboard",
    group: "Work files",
  },
  {
    name: "Review",
    role: "Weekly review",
    description:
      "The weekly review board. Each page is dated, and the team reviews the past week's designs together.",
    href: "https://www.figma.com/design/0XRbaa6DcKJDFrhmGApWX2/Review",
    group: "Work files",
  },
  {
    name: "App",
    role: "Dev handoff",
    description:
      "The cleaned up, final version that goes to development, organized and annotated with dev notes.",
    href: "https://www.figma.com/design/P9cA98E4T9MgNx47ZyDKbI/App",
    group: "Work files",
  },
  {
    name: "Web",
    role: "Dev handoff",
    description: "Same as App, but for the final web deliverables.",
    href: "https://www.figma.com/design/fJDH7A9i6GupiVNCcsqeir/Web",
    group: "Work files",
  },
  {
    name: "Ideaboard",
    role: "Workboard 1",
    description:
      "The previous Workboard, archived once it filled up. New Workboards are numbered from here.",
    href: "https://www.figma.com/design/537g8eAgAfT7ozFHe8x8rr/Ideaboard",
    group: "Work files",
  },
  {
    name: "Foundations",
    role: "Published library",
    description:
      "The published library: colors, type, spacing, tokens, and base components like buttons, chips, and inputs.",
    href: "https://www.figma.com/design/J7feqjheSpFp59vTZXyok8/Foundations",
    group: "Foundations & components",
  },
  {
    name: "Components",
    role: "RG components",
    description:
      "RateGame specific components like the Game Card, the Post, and the Rating Bar.",
    href: "https://www.figma.com/design/YFsVKwuPVrypskpMDkCdF8/Components",
    group: "Foundations & components",
  },
  {
    name: "Flags",
    role: "Asset library",
    description: "The library of flags for the World Cup and the rest of RateGame.",
    href: "https://www.figma.com/design/zCI8oojccBatt0soNupz44/Flags",
    group: "Foundations & components",
  },
  {
    name: "Promotional",
    role: "Promo",
    description: "Socials and App Store screenshots.",
    href: "https://www.figma.com/design/fCwReyP0T6aCE0uwIEpqKb/Promotional",
    group: "Promo & social",
  },
  {
    name: "Socials",
    role: "Templates",
    description: "A Figma Buzz file with the social templates.",
    href: "https://www.figma.com/buzz/t22R7PbDK5zlujaWidb9Id/Socials",
    group: "Promo & social",
  },
  {
    name: "Archive",
    role: "Legacy",
    description:
      "Legacy designs and old systems, kept out of the way so the active files stay fast.",
    href: "https://www.figma.com/design/lPq88OLt4W4W7hYPUd0La9/Archive",
    group: "Strategy & misc",
  },
  {
    name: "Brandbook",
    role: "Brand",
    description: "A light, simple brand guideline deck.",
    href: "https://www.figma.com/slides/7q6GfwVZ82ro6HRrXD5D3Y/Brandbook",
    group: "Strategy & misc",
  },
  {
    name: "Product Strategy",
    role: "Brainstorm",
    description: "A brainstorm board for product and ideas.",
    href: "https://www.figma.com/board/K7J4JyMKqobqfGukOp4Nqi/Product-Strategy",
    group: "Strategy & misc",
  },
  {
    name: "Testing",
    role: "Annotations",
    description: "A board for testing, annotations, and issue communication.",
    href: "https://www.figma.com/design/Po36dWJvBrLDZNCsJgwLNh/Testing",
    group: "Strategy & misc",
  },
  {
    name: "Analytics",
    role: "Legacy log",
    description: "An old log of PostHog analytics. No longer in use.",
    href: "https://www.figma.com/design/NjQW4mcIO0EEZ84w8FBhE2/Analytics",
    group: "Strategy & misc",
  },
];

export const fileGroups: FileGroup[] = [
  "Work files",
  "Foundations & components",
  "Promo & social",
  "Strategy & misc",
];

export function filesByGroup(group: FileGroup): FigmaFile[] {
  return files.filter((f) => f.group === group);
}
