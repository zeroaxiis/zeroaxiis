import type { BlogPost } from "@/types";

const posts: BlogPost[] = [
  {
    slug: "hello-world",
    title: "Hello World",
    excerpt: "Welcome to the Zeroaxiis blog. This is where we share updates, insights, and stories.",
    date: "2026-05-13",
    author: "Zeroaxiis Team",
    tags: ["announcement"],
    content: `
Welcome to the Zeroaxiis blog!

We're excited to share our journey with you. Stay tuned for updates, product news, and behind-the-scenes content as we build something great.

## What to expect

- Product updates and new feature announcements
- Engineering deep-dives
- Company news and milestones

Thanks for being here at the beginning.
    `.trim(),
  },
  {
    slug: "why-we-started",
    title: "Why We Started Zeroaxiis",
    excerpt: "The story behind the idea and what we're trying to solve.",
    date: "2026-05-10",
    author: "Zeroaxiis Team",
    tags: ["story", "vision"],
    content: `
Every company starts with a problem worth solving.

For us, it was noticing a gap that nobody else was filling the right way. We set out to do it differently — with clarity, speed, and care for the people who use what we build.

## The beginning

It started with a frustration we kept running into. We looked for existing solutions, found them lacking, and decided to build our own.

## What comes next

We're still early. But we're moving fast and shipping often. Come along for the ride.
    `.trim(),
  },
];

export function getAllPosts(): BlogPost[] {
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
