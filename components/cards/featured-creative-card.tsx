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
        "group flex flex-col md:flex-row w-full bg-transparent hover:bg-[#1a1a1a] p-4 md:p-6 lg:p-8 rounded-none transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 relative z-10",
        className
      )}
    >
      {/* 16:9 Image Section */}
      <div className="relative w-full md:w-1/2 lg:w-[55%] aspect-video overflow-hidden bg-black mb-6 md:mb-0 md:mr-8 lg:mr-12 rounded-none flex-shrink-0">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 55vw"
          className="object-cover transition-all duration-500 ease-out group-hover:opacity-80"
          priority
        />

        {/* Content Type Badge */}
        <div className="absolute top-4 left-4 bg-accent px-3 py-1.5 z-20">
          <span className="text-black text-[12px] font-label-mono leading-none flex items-center font-bold tracking-wider uppercase">
            {type}
          </span>
        </div>

        {/* Play Overlay */}
        {isMedia && <PlayOverlay className="w-16 h-16" iconSize={24} />}

        {/* Duration Badge */}
        {duration && <DurationBadge duration={duration} className="bottom-4 right-4" />}
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-center w-full md:w-1/2 lg:w-[45%] py-2 md:py-4">
        <div className="flex items-center gap-3 text-bone-mute font-label-mono text-[12px] uppercase tracking-wider mb-4">
          <span className="text-accent">Featured</span>
          <span className="w-1 h-1 rounded-full bg-stroke" />
          <span>{publishDate}</span>
        </div>

        <h3 className="text-2xl md:text-3xl lg:text-[32px] font-display text-bone mb-4 leading-[1.2] tracking-tight">
          {title}
        </h3>

        <p className="text-[#aaaaaa] font-body text-[14px] md:text-[15px] leading-[1.6] mb-8 max-w-lg">
          {description}
        </p>

        <div className="mt-auto flex items-center text-accent font-label-mono text-[13px] uppercase tracking-widest group-hover:underline underline-offset-4 decoration-accent/50 transition-all">
          Watch Now <span className="ml-2">→</span>
        </div>
      </div>
    </Link>
  );
}
