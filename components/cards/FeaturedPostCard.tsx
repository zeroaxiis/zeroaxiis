import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Post } from "@/types/post";

interface FeaturedPostCardProps {
  post: Post;
  className?: string;
}

export function FeaturedPostCard({ post, className }: FeaturedPostCardProps) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className={cn(
        "group flex flex-col lg:flex-row h-full card-surface rounded-xl overflow-hidden glow-hover relative transition-all duration-300",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative w-full lg:w-[55%] h-[16rem] lg:h-[28rem] overflow-hidden bg-canvas">
        <Image
          src={post.image}
          alt={post.title}
          width={0}
          height={0}
          className="absolute inset-0 w-full h-full object-cover [transition:var(--transition-image-hover)] group-hover:scale-105"
          sizes="(max-width: 1024px) 100%, 55%"
          priority
        />
        {/* Type Badge */}
        <div className="absolute top-6 left-6 z-10">
          <span className="glass-panel px-4 py-2 rounded-full text-label-mono font-mono text-on-surface uppercase tracking-wider shadow-sm">
            {post.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6 lg:p-10 justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[var(--color-surface-dim)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6 text-label-mono font-mono text-on-surface-variant uppercase tracking-wider">
            <span className="text-accent font-semibold">{post.category}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-stroke"></span>
            <span>{formatDate(post.publishedAt)}</span>
          </div>

          <h3 className="text-2xl lg:text-3xl font-display text-on-surface mb-5 group-hover:text-accent transition-colors duration-300 line-clamp-3">
            {post.title}
          </h3>
          
          <p className="text-on-surface-variant text-body-md mb-8 line-clamp-4 max-w-xl">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="mt-auto pt-6 border-t border-stroke/50 flex items-center justify-between max-w-xl">
            <div className="flex items-center gap-3 text-on-surface-variant text-body-sm">
              <span className="font-medium text-on-surface">{post.author}</span>
              {post.duration && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-stroke"></span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {post.duration}
                  </span>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-on-surface font-medium group-hover:text-accent transition-colors duration-300">
              <span className="text-sm tracking-wide">Read</span>
              <div className="w-10 h-10 rounded-full border border-stroke flex items-center justify-center text-on-surface group-hover:border-accent group-hover:text-accent group-hover:bg-accent/10 transition-all duration-300">
                <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
