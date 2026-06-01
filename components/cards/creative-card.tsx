import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { CreativeItem } from "@/types";

export type CreativeCardProps = CreativeItem & {
  className?: string;
};

// Play Button SVG Overlay - Kept minimal and static
function PlayOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 ease-out group-hover:bg-accent group-hover:border-accent group-hover:scale-110">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="white"
          className="ml-0.5 transition-colors duration-300 group-hover:fill-black"
        >
          <path d="M5 3l14 9-14 9V3z" />
        </svg>
      </div>
    </div>
  );
}

export function CreativeCard({
  title,
  type,
  thumbnail,
  duration,
  publishDate,
  href = "#",
  className,
}: CreativeCardProps) {
  const isMedia = type === "Video" || type === "Podcast" || type === "Series" || type === "Interview";

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col w-full outline-none bg-background border border-stroke p-4 md:p-5 transition-colors duration-300 hover:border-white/20 relative z-10",
        className
      )}
    >
      {/* 16:9 Thumbnail Container */}
      <div className="relative w-full aspect-video overflow-hidden bg-surface-layer mb-5">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-all duration-500 ease-out group-hover:opacity-80"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Play Overlay */}
        {isMedia && <PlayOverlay />}

        {/* Duration Badge */}
        {duration && (
          <div className="absolute bottom-2 right-2 z-10">
            <span className="bg-black/80 backdrop-blur-md px-2 py-1 text-[11px] font-label-mono text-bone tracking-wider">
              {duration}
            </span>
          </div>
        )}
      </div>

      {/* Brutalist Content Section */}
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-4 border-b border-stroke/50 pb-3">
          <div className="w-1.5 h-1.5 bg-accent" />
          <span className="text-[10px] font-label-mono uppercase tracking-[0.2em] text-accent">
            {type}
          </span>
        </div>

        <h3 className="text-[18px] md:text-[20px] font-display text-bone leading-[1.2] mb-4">
          {title}
        </h3>
        
        <div className="mt-auto">
          <span className="text-[10px] font-label-mono uppercase tracking-[0.2em] text-bone-mute">
            {publishDate}
          </span>
        </div>
      </div>
    </Link>
  );
}
