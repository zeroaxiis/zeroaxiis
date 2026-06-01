import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
  className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col h-full card-surface rounded-xl overflow-hidden glow-hover relative",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative w-full h-[var(--height-card-image-md)] overflow-hidden bg-canvas">
        <Image
          src={post.image}
          alt={post.title}
          width={0}
          height={0}
          className="absolute inset-0 w-full h-full object-cover [transition:var(--transition-image-hover)] group-hover:scale-105"
          sizes="(max-width: 768px) 100%, (max-width: 1200px) 50%, 33%"
        />
        {/* Type Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="glass-panel px-3 py-1.5 rounded-full text-label-mono font-mono text-on-surface uppercase tracking-wider shadow-sm">
            {post.type}
          </span>
        </div>
        
        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-accent text-on-tertiary px-3 py-1.5 rounded-full text-label-mono font-mono uppercase tracking-wider font-semibold shadow-md">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center gap-3 mb-4 text-label-mono font-mono text-on-surface-variant uppercase tracking-wider">
          <span className="text-accent">{post.category}</span>
          <span className="w-1 h-1 rounded-full bg-stroke"></span>
          <span>{formatDate(post.publishedAt)}</span>
        </div>

        <h3 className="text-xl font-headline-lg text-on-surface mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-on-surface-variant text-body-sm mb-6 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-stroke/50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-on-surface-variant text-body-sm">
            <span className="font-medium text-on-surface">{post.author}</span>
            {post.duration && (
              <>
                <span className="w-1 h-1 rounded-full bg-stroke"></span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.duration}
                </span>
              </>
            )}
          </div>
          <div className="w-8 h-8 rounded-full border border-stroke flex items-center justify-center text-on-surface group-hover:border-accent group-hover:text-accent group-hover:bg-accent/10 transition-all duration-300">
            <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}
