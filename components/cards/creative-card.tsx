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
        "group flex flex-col w-full bg-transparent hover:bg-[#1a1a1a] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 relative z-10 h-full overflow-hidden rounded-none",
        className
      )}
    >
      {/* 16:9 Thumbnail Container */}
      <div className="relative w-full aspect-video overflow-hidden flex-shrink-0">
        <Image
          src={thumbnail}
          alt={title}
          fill
          priority={priority}
          className="object-cover transition-all duration-300 ease-out group-hover:opacity-80"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Content Type Badge */}
        <div className="absolute top-3 left-3 bg-accent px-2 py-1 z-20">
          <span className="text-black text-[12px] font-label-mono leading-none flex items-center">
            {type}
          </span>
        </div>

        {/* Play Overlay */}
        {isMedia && <PlayOverlay iconSize={20} />}

        {/* Duration Badge */}
        {duration && <DurationBadge duration={duration} />}
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
          {description && (
            <p className="text-bone-mute font-body text-[12px] leading-[1.5] line-clamp-3 flex-grow max-w-[70%]">
              {description}
            </p>
          )}

          {/* Date */}
          <span className="text-bone-mute font-body text-[12px] whitespace-nowrap flex-shrink-0">
            {publishDate}
          </span>
        </div>
      </div>
    </Link>
  );
}
