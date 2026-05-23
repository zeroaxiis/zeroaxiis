import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts, updates, and stories from the Zeroaxiis team.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <div className="mb-12">
        <h1 className="mb-3 text-4xl font-bold tracking-tight">Blog</h1>
        <p className="text-[var(--color-muted-foreground)]">
          Thoughts, updates, and stories from the team.
        </p>
      </div>

      <ul className="flex flex-col gap-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <article className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <time
                    dateTime={post.date}
                    className="text-xs text-[var(--color-muted-foreground)]"
                  >
                    {formatDate(post.date)}
                  </time>
                  {post.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <h2 className="text-xl font-semibold group-hover:text-[var(--color-accent)] transition-colors">
                  {post.title}
                </h2>
                <p className="text-[var(--color-muted-foreground)]">
                  {post.excerpt}
                </p>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
