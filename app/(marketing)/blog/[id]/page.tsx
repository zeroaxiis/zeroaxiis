import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/reveal";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { CircleButton } from "@/components/ui/circle-button";
import { ArrowLeftIcon } from "@/components/icons";
import { formatDate } from "@/lib/utils";
import { BackgroundGrid } from "@/components/ui/background-grid";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
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

            <div className="prose prose-invert max-w-none mt-8 prose-p:text-bone-dim prose-headings:text-bone prose-a:text-accent prose-li:text-bone-dim">
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>{post.content || ""}</ReactMarkdown>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
