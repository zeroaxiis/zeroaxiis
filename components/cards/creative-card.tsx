import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PlayOverlay } from "@/components/ui/play-overlay";
import { DurationBadge } from "@/components/ui/duration-badge";
import type { CreativeItem } from "@/types";

export type CreativeCardProps = CreativeItem & {
  className?: string;
  priority?: boolean;
};



export function CreativeCard({
  title,
  description,
  type,
  thumbnail,
  duration,
  publishDate,
  author,
  href = "#",
  className,
  priority = false,
}: CreativeCardProps) {
  const isMedia = type === "Video" || type === "Podcast" || type === "Series" || type === "Interview";

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex flex-col w-full bg-transparent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 relative z-10 h-full",
        className
      )}
    >
      {/* 16:9 Thumbnail Container */}
      <div className="relative w-full aspect-video overflow-hidden bg-surface-layer mb-3 flex-shrink-0 rounded-xl">
        <Image
          src={thumbnail}
          alt={title}
          fill
          priority={priority}
          className="object-cover transition-all duration-500 ease-out group-hover:opacity-80"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Play Overlay */}
        {isMedia && <PlayOverlay iconSize={20} />}

        {/* Duration Badge */}
        <DurationBadge duration={duration} />
      </div>

      {/* YouTube-Style Content Section */}
      <div className="flex gap-3 w-full flex-grow">
        {/* Avatar */}
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-9 h-9 rounded-full bg-surface-layer flex items-center justify-center overflow-hidden">
            <span className="text-bone text-[14px] font-display uppercase">
              {author ? author.charAt(0) : type.charAt(0)}
            </span>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col w-full min-w-0">
          <h3 
            className="text-[16px] font-medium text-bone leading-[1.4] mb-1 line-clamp-2 min-h-[45px]"
            title={title}
          >
            {title}
          </h3>
          
          {/* Metadata Row */}
          <div className="flex flex-col text-[14px] text-bone-mute mt-0.5">
            <span>{author || "ZeroAxiis"}</span>
            <div className="flex items-center gap-x-1">
              <span>{publishDate}</span>
            </div>
          </div>

          {/* Description */}
          {description && (
            <p className="mt-2 text-bone-mute font-body text-[13px] leading-[1.4] line-clamp-2 min-h-[37px]">
              {description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
