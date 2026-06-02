import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
  className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.id}`}
      className={cn(
        "group relative flex flex-col h-full overflow-hidden bg-[var(--color-surface-container-low)] border border-[var(--color-stroke)] transition-all duration-500 hover:border-[var(--color-stroke-hover)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.45)]",
        className
      )}
    >
      {/* Image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-[var(--color-canvas)] shrink-0">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient overlay on image bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-container-low)] via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Type pill */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center px-2.5 py-1 bg-[rgba(10,10,10,0.75)] backdrop-blur-md border border-[rgba(245,241,232,0.1)] text-[10px] font-mono text-[var(--color-bone-dim)] uppercase tracking-[0.18em]">
            {post.type}
          </span>
        </div>

        {/* Arrow CTA */}
        <div className="absolute bottom-4 right-4 z-10 w-8 h-8 bg-[rgba(10,10,10,0.7)] backdrop-blur-md border border-[rgba(245,241,232,0.12)] flex items-center justify-center text-[var(--color-bone-mute)] opacity-0 group-hover:opacity-100 group-hover:text-[var(--color-accent)] transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5 pt-4 gap-3">
        {/* Meta row */}
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em]">
          <span className="text-[var(--color-accent)] font-medium">{post.category}</span>
          <span className="text-[var(--color-bone-low)]">·</span>
          <span className="text-[var(--color-bone-mute)]">{formatDate(post.publishedAt)}</span>
        </div>

        {/* Title */}
        <h3 className="font-display text-[var(--color-bone)] text-[25px] leading-snug line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors duration-300">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-[var(--color-bone-mute)] text-sm leading-relaxed line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center gap-2 pt-4 mt-auto border-t border-[var(--color-stroke)]">
          {/* Author avatar */}
          <div className="w-6 h-6 bg-[var(--color-surface-container-high)] border border-[var(--color-stroke)] flex items-center justify-center text-[9px] font-mono text-[var(--color-bone-mute)] uppercase shrink-0">
            {post.author.charAt(0)}
          </div>
          <span className="text-xs text-[var(--color-bone-dim)] font-medium truncate">{post.author}</span>

          {/* READ CTA */}
          <div className="flex items-center gap-2 ml-auto shrink-0">
            {post.duration && (
              <span className="text-[11px] text-[var(--color-bone-mute)] font-mono">{post.duration}</span>
            )}
            <span className="text-xs font-mono uppercase tracking-[0.14em] text-[var(--color-bone-mute)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
              Read
            </span>
            <div className="w-8 h-8 border border-[var(--color-stroke)] flex items-center justify-center text-[var(--color-bone-mute)] group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)] group-hover:bg-[rgba(200,255,0,0.08)] transition-all duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
