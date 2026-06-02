import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Post } from "@/types/post";

interface FeaturedPostCardProps {
  post: Post;
  className?: string;
}

export function FeaturedPostCard({ post, className }: FeaturedPostCardProps) {
  return (
    <Link
      href={`/blog/${post.id}`}
      className={cn(
        "group relative flex flex-col lg:flex-row overflow-hidden bg-[var(--color-surface-container-low)] border border-[var(--color-stroke)] transition-all duration-500 hover:border-[var(--color-stroke-hover)] hover:shadow-[0_16px_64px_rgba(0,0,0,0.55)]",
        className
      )}
    >
      {/* Image panel */}
      <div className="relative w-full lg:w-[52%] h-64 lg:h-[26rem] overflow-hidden bg-[var(--color-canvas)] shrink-0">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 52vw"
          priority
        />

        {/* Gradient — fades into content panel on desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--color-surface-container-low)] opacity-0 lg:opacity-80 pointer-events-none transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-container-low)] via-transparent to-transparent opacity-70 lg:opacity-0 pointer-events-none" />

        {/* Type + Featured pill row */}
        <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
          <span className="inline-flex items-center px-3 py-1.5 bg-[rgba(10,10,10,0.75)] backdrop-blur-md border border-[rgba(245,241,232,0.1)] text-[10px] font-mono text-[var(--color-bone-dim)] uppercase tracking-[0.18em]">
            {post.type}
          </span>
          <span className="inline-flex items-center px-3 py-1.5 bg-[var(--color-accent)] text-[10px] font-mono text-[var(--color-ink)] uppercase tracking-[0.18em] font-semibold">
            Featured
          </span>
        </div>
      </div>

      {/* Content panel */}
      <div className="relative flex flex-col flex-grow p-7 lg:p-10 justify-center gap-5">
        {/* Subtle background shimmer on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(200,255,0,0.02)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-5">

          {/* Meta */}
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
            <span className="text-[var(--color-accent)] font-semibold">{post.category}</span>
            <span className="text-[var(--color-bone-low)]">·</span>
            <time className="text-[var(--color-bone-mute)]">{formatDate(post.publishedAt)}</time>
          </div>

          {/* Title */}
          <h2 className="font-display text-[var(--color-bone)] text-3xl lg:text-[2rem] leading-[1.15] tracking-[-0.02em] line-clamp-3 group-hover:text-[var(--color-accent)] transition-colors duration-300">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-[var(--color-bone-mute)] text-sm leading-relaxed line-clamp-4 max-w-lg">
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-[var(--color-surface-container)] border border-[var(--color-stroke)] text-[10px] font-mono text-[var(--color-bone-mute)] uppercase tracking-[0.14em]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer row */}
          <div className="flex items-center justify-between pt-5 border-t border-[var(--color-stroke)] max-w-lg">
            <div className="flex items-center gap-3">
              {/* Author avatar */}
              <div className="w-8 h-8 bg-[var(--color-surface-container-high)] border border-[var(--color-stroke)] flex items-center justify-center text-[11px] font-mono text-[var(--color-bone-dim)] uppercase shrink-0">
                {post.author.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-[var(--color-bone)] font-medium leading-tight">{post.author}</span>
                {post.duration && (
                  <span className="text-[11px] text-[var(--color-bone-mute)] leading-tight mt-0.5">{post.duration}</span>
                )}
              </div>
            </div>

            {/* CTA button */}
            <div className="flex items-center gap-2 pl-4">
              <span className="text-xs font-mono uppercase tracking-[0.14em] text-[var(--color-bone-mute)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                Read
              </span>
              <div className="w-9 h-9 border border-[var(--color-stroke)] flex items-center justify-center text-[var(--color-bone-mute)] group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)] group-hover:bg-[rgba(200,255,0,0.08)] transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
