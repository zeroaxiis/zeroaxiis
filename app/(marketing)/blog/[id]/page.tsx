import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout";
import { Reveal } from "@/components/ui/reveal";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { ChevronLeftIcon } from "@/components/icons";
import { getAllPosts, getPostById } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = getPostById(id);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;
  const post = getPostById(id);

  if (!post) notFound();

  return (
    <main className="pt-32 pb-32 relative bg-surface-container-lowest min-h-[100svh] overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-lg opacity-50 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_100%)]"
      />

      <Container className="relative max-w-3xl z-10 pt-8">
        <ReadingProgress />

        <div className="relative z-10">
          <Reveal>
            <Link
              href="/blog"
              className="mb-12 inline-flex items-center gap-2 font-label-mono text-[10px] uppercase tracking-[0.22em] text-bone-mute hover:text-accent transition-colors"
            >
              <ChevronLeftIcon />
              All field notes
            </Link>
          </Reveal>

          <article>
            <header className="mb-16 flex flex-col gap-6">
              <Reveal>
                <div className="flex flex-wrap items-center gap-3 font-label-mono text-[10px] uppercase tracking-[0.22em] text-bone-mute">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  <span className="opacity-50">·</span>
                  <span>{post.author}</span>
                  <span className="opacity-50">·</span>
                  {(post.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="border border-stroke rounded-full px-3 py-1 normal-case tracking-[0.18em] text-[10px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="font-display text-[clamp(40px,6vw,88px)] leading-[0.96] tracking-[-0.03em] text-bone text-balance">
                  {post.title}
                </h1>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="font-body-md text-body-md text-bone-dim leading-relaxed max-w-2xl">
                  {post.excerpt}
                </p>
              </Reveal>
            </header>

            <Reveal delay={0.25}>
              <div className="prose prose-invert max-w-none">
                {(post.content || "").split("\n\n").map((paragraph, i) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2
                        key={i}
                        className="font-display text-3xl text-bone tracking-[-0.02em] mt-16 mb-6"
                      >
                        {paragraph.replace("## ", "")}
                      </h2>
                    );
                  }
                  return (
                    <p
                      key={i}
                      className="font-body-md text-body-md leading-relaxed text-bone-dim mb-6"
                    >
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </Reveal>
          </article>
        </div>
      </Container>
    </main>
  );
}
