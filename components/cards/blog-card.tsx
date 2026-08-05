import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { BlogItem } from "@/types";

export type BlogCardProps = BlogItem & {
  className?: string;
  priority?: boolean;
};

export function BlogCard({
  id,
  title,
  content,
  author,
  image_url,
  created_at,
  className,
  priority = false,
}: BlogCardProps) {
  const formattedDate = new Date(created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  
  // Create a plain text description from content
  const description = content ? (content.length > 150 ? content.substring(0, 150) + "..." : content) : "";

  return (
    <Link
      href={`/blog/${id}`}
      className={cn(
        "group flex flex-col w-full bg-transparent hover:bg-[#1a1a1a] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 relative z-10 h-full overflow-hidden rounded-none",
        className
      )}
    >
      <div className="relative w-full aspect-video overflow-hidden flex-shrink-0">
        <Image
          src={image_url}
          alt={title}
          fill
          priority={priority}
          className="object-cover transition-all duration-300 ease-out group-hover:opacity-80"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="absolute top-3 left-3 bg-accent px-2 py-1 z-20">
          <span className="text-black text-[12px] font-label-mono leading-none flex items-center">
            Article
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-5 bg-transparent">
        <h3
          className="text-[18px] font-medium text-bone leading-[1.3] mb-4 line-clamp-2 min-h-[46px]"
          title={title}
        >
          {title}
        </h3>

        <div className="flex items-end justify-between gap-4 mt-auto">
          {description && (
            <p className="text-bone-mute font-body text-[12px] leading-[1.5] line-clamp-3 flex-grow max-w-[70%]">
              {description}
            </p>
          )}

          <span className="text-bone-mute font-body text-[12px] whitespace-nowrap flex-shrink-0">
            {formattedDate}
          </span>
        </div>
      </div>
    </Link>
  );
}
