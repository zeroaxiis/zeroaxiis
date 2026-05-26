// Server-only module. Uses Node's `fs` to auto-discover routes from `app/`.
// Do NOT import from a Client Component — only from Server Components / layouts.
import { readdirSync, existsSync } from "fs";
import { join } from "path";

export interface PageEntry {
  label: string;
  href: string;
}

// Optional label overrides + priority ordering.
// Any route discovered via filesystem but NOT listed here still appears,
// labelled from its slug and ordered alphabetically after the priority list.
const LABELS: Record<string, string> = {
  "/": "Home",
  "/projects": "Projects",
  "/team": "Team",
  "/blog": "Blog",
};

const PRIORITY: string[] = ["/", "/projects", "/team", "/blog"];

// Routes to never show in the nav (e.g. legal pages, dashboards, drafts).
const HIDDEN: ReadonlySet<string> = new Set<string>([
  "/privacy",
  "/terms",
]);

const APP_DIR = join(process.cwd(), "app");
const PAGE_FILES: ReadonlySet<string> = new Set([
  "page.tsx",
  "page.ts",
  "page.jsx",
  "page.js",
]);

function isRouteGroup(name: string) {
  return name.startsWith("(") && name.endsWith(")");
}

function isDynamic(name: string) {
  return name.startsWith("[");
}

function walk(absDir: string, segments: string[], acc: string[]) {
  let entries;
  try {
    entries = readdirSync(absDir, { withFileTypes: true });
  } catch {
    return;
  }

  const hasPage = entries.some((e) => e.isFile() && PAGE_FILES.has(e.name));
  if (hasPage) {
    const route =
      segments.length === 0 ? "/" : "/" + segments.join("/");
    acc.push(route);
  }

  for (const e of entries) {
    if (!e.isDirectory()) continue;
    if (isDynamic(e.name)) continue;
    if (e.name.startsWith("_")) continue;
    if (e.name === "api") continue;
    const nextSegments = isRouteGroup(e.name)
      ? segments
      : [...segments, e.name];
    walk(join(absDir, e.name), nextSegments, acc);
  }
}

function slugToLabel(href: string): string {
  if (href === "/") return "Home";
  const last = href.split("/").filter(Boolean).pop() ?? "";
  return last
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export function getPages(): PageEntry[] {
  if (!existsSync(APP_DIR)) return [];

  const routes: string[] = [];
  walk(APP_DIR, [], routes);

  const unique = Array.from(new Set(routes)).filter((r) => !HIDDEN.has(r));

  const priorityList = PRIORITY.filter((r) => unique.includes(r));
  const extras = unique
    .filter((r) => !PRIORITY.includes(r))
    .sort((a, b) => a.localeCompare(b));

  return [...priorityList, ...extras].map((href) => ({
    href,
    label: LABELS[href] ?? slugToLabel(href),
  }));
}
