import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { cn } from "@/lib/utils";
import { PlayOverlay } from "@/components/ui/play-overlay";

import type { CreativeItem } from "@/types";

export type CreativeCardProps = CreativeItem & {
  className?: string;
  priority?: boolean;
};

export function CreativeCard({
  id,
  title,
  summary,
  category,
  thumbnail_url,
  className,
  priority = false,
}: CreativeCardProps) {
  const isMedia = category === "Video" || category === "Podcast" || category === "Series" || category === "Interview";

  return (
    <Link
      href={`/creative/${id}`}
      className={cn(
        "group flex flex-col w-full bg-transparent hover:bg-[#1a1a1a] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 relative z-10 h-full overflow-hidden rounded-none",
        className
      )}
    >
      {/* 16:9 Thumbnail Container */}
      <div className="relative w-full aspect-video overflow-hidden flex-shrink-0">
        <Image
          src={thumbnail_url}
          alt={title}
          fill
          priority={priority}
          className="object-cover transition-all duration-300 ease-out group-hover:opacity-80"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Content Type Badge */}
        <div className="absolute top-3 left-3 bg-accent px-2 py-1 z-20">
          <span className="text-black text-[12px] font-label-mono leading-none flex items-center">
            {category}
          </span>
        </div>

        {/* Play Overlay */}
        {isMedia && <PlayOverlay iconSize={20} />}

      </div>

      {/* Content Section (Redesigned) */}
      <div className="flex flex-col flex-grow p-5 bg-transparent">
        <h3
          className="text-[18px] font-medium text-bone leading-[1.3] mb-4 line-clamp-2 min-h-[46px]"
          title={title}
        >
          {title}
        </h3>

        <div className="flex items-end justify-between gap-4 mt-auto">
          {/* Description */}
          {summary && (
            <div className="text-bone-mute font-body text-[12px] leading-[1.5] line-clamp-3 flex-grow prose prose-invert prose-sm prose-p:my-0 prose-headings:my-0 prose-headings:text-[14px] prose-a:text-accent prose-p:text-[12px] prose-p:text-bone-mute prose-p:font-body">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm, remarkBreaks]} 
                rehypePlugins={[rehypeRaw]} 
                components={{ p: 'span' }}
                allowedElements={['p', 'span', 'strong', 'em', 'br', 'a', 'text']}
                unwrapDisallowed={true}
              >
                {summary}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
