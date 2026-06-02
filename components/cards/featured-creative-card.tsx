import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PlayOverlay } from "@/components/ui/play-overlay";
import { DurationBadge } from "@/components/ui/duration-badge";
import type { CreativeItem } from "@/types";

export type FeaturedCreativeCardProps = CreativeItem & {
  className?: string;
};



export function FeaturedCreativeCard({
  title,
  description,
  type,
  thumbnail,
  duration,
  publishDate,
  href = "#",
  className,
}: FeaturedCreativeCardProps) {
  const isMedia = type === "Video" || type === "Podcast" || type === "Series" || type === "Interview";

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex flex-col md:flex-row w-full bg-transparent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 relative z-10",
        className
      )}
    >
      {/* Massive 16:9 Image Section */}
      <div className="relative w-full md:w-3/5 lg:w-2/3 aspect-video overflow-hidden bg-surface-layer shadow-2xl mb-4 md:mb-0 md:mr-6 lg:mr-8 rounded-xl flex-shrink-0">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 66vw"
          className="object-cover transition-all duration-500 ease-out group-hover:opacity-80"
          priority
        />
        
        {/* Play Overlay */}
        {isMedia && <PlayOverlay className="w-16 h-16" iconSize={24} />}

        {/* Duration Badge */}
        <DurationBadge duration={duration} className="bottom-3 right-3" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-center w-full md:w-2/5 lg:w-1/3">
        <h3 className="text-2xl lg:text-[28px] font-medium text-[#f1f1f1] mb-2 leading-[1.3] tracking-tight line-clamp-3">
          {title}
        </h3>
        
        <div className="flex items-center gap-x-2 text-[14px] text-[#aaaaaa] mb-4">
          <span>ZeroAxiis</span>
          <span className="w-1 h-1 rounded-full bg-[#aaaaaa]" />
          <span>{publishDate}</span>
        </div>
        
        <p className="text-[#aaaaaa] font-body text-[14px] leading-[1.5] mb-8 line-clamp-4">
          {description}
        </p>
      </div>
    </Link>
  );
}
