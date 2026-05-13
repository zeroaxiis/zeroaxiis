import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
      >
        ← Back to blog
      </Link>

      <article className="mt-6">
        <header className="mb-8 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <time
              dateTime={post.date}
              className="text-sm text-[var(--color-muted-foreground)]"
            >
              {formatDate(post.date)}
            </time>
            <span className="text-[var(--color-muted-foreground)]">·</span>
            <span className="text-sm text-[var(--color-muted-foreground)]">
              {post.author}
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </header>

        <div className="prose prose-neutral max-w-none text-[var(--color-foreground)]">
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="mb-4 mt-8 text-2xl font-bold tracking-tight"
                >
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            return (
              <p key={i} className="mb-4 leading-7 text-[var(--color-muted-foreground)]">
                {paragraph}
              </p>
            );
          })}
        </div>
      </article>
    </div>
  );
}
