import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/reveal";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { CircleButton } from "@/components/ui/circle-button";
import { ArrowLeftIcon } from "@/components/icons";
import { formatDate } from "@/lib/utils";
import { BackgroundGrid } from "@/components/ui/background-grid";
import type { BlogItem } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.zeroaxiis.tech";

async function getBlogItem(id: string): Promise<BlogItem | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/blog`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    const items = data.data || [];
    return items.find((item: BlogItem) => item.id === id) || null;
  } catch {
    return null;
  }
}

async function getAllBlogItems(): Promise<BlogItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/blog`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllBlogItems();
  return posts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getBlogItem(id);
  if (!post) return {};
  return {
    title: post.title,
    description: post.content.substring(0, 150) + "...",
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getBlogItem(id);

  if (!post) notFound();

  return (
    <main className="select-text pt-32 pb-32 relative bg-surface-container-lowest min-h-[100svh] overflow-hidden">
      <BackgroundGrid />

      <div className="relative w-full mx-auto px-5 md:px-8 max-w-5xl z-10 pt-8">
        <ReadingProgress />

        <div className="relative z-10">
          <Reveal>
            <CircleButton href="/blog" aria-label="Back to all field notes" className="mb-12">
              <ArrowLeftIcon width={18} height={18} strokeWidth={1.4} />
            </CircleButton>
          </Reveal>

          <article>
            {post.image_url && (
              <Reveal>
                <div className="relative w-full aspect-video md:aspect-[21/9] mb-12 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              </Reveal>
            )}
            
            <header className="mb-16 flex flex-col gap-6">
              <Reveal>
                <div className="flex flex-wrap items-center gap-3 font-label-mono text-[10px] uppercase tracking-[0.22em] text-bone-mute">
                  <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                  <span className="opacity-50">·</span>
                  <span>{post.author}</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="font-display text-[clamp(40px,6vw,88px)] leading-[0.96] tracking-[-0.03em] text-bone text-balance">
                  {post.title}
                </h1>
              </Reveal>
            </header>

            <div className="prose prose-invert max-w-none mt-8">
              {(post.content || "").split(/\r?\n\r?\n/).map((paragraph, i) => {
                const p = paragraph.trim();
                if (!p) return null;
                
                if (p.startsWith("## ") || /^\d+\.\s/.test(p)) {
                  return (
                    <h2
                      key={i}
                      className="font-display text-3xl md:text-4xl text-bone tracking-[-0.02em] mt-16 mb-6 leading-tight"
                    >
                      {p.replace(/^##\s*/, "")}
                    </h2>
                  );
                }
                
                if (p.startsWith("• ")) {
                  return (
                    <div key={i} className="flex gap-4 mb-4 font-body-md text-body-md leading-relaxed text-bone-dim">
                      <span className="text-accent flex-shrink-0">•</span>
                      <span>{p.substring(2)}</span>
                    </div>
                  );
                }
                
                return (
                  <p
                    key={i}
                    className="font-body-md text-body-md leading-relaxed text-bone-dim mb-6 whitespace-pre-wrap"
                  >
                    {p}
                  </p>
                );
              })}
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
