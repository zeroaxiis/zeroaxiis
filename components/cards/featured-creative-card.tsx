import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { CreativeItem } from "@/types";

export type FeaturedCreativeCardProps = CreativeItem & {
  className?: string;
};

// Play Button SVG Overlay
function PlayOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 ease-out group-hover:bg-accent group-hover:border-accent group-hover:scale-110">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
          className="ml-1 transition-colors duration-300 group-hover:fill-black"
        >
          <path d="M5 3l14 9-14 9V3z" />
        </svg>
      </div>
    </div>
  );
}

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
      className={cn(
        "group flex flex-col md:flex-row w-full bg-surface-container-lowest border border-stroke p-6 lg:p-8 transition-colors duration-300 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 relative z-10",
        className
      )}
    >
      {/* Massive 16:9 Image Section */}
      <div className="relative w-full md:w-3/5 lg:w-2/3 aspect-video overflow-hidden bg-surface-layer shadow-2xl mb-6 md:mb-0 md:mr-8 lg:mr-12">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 66vw"
          className="object-cover transition-all duration-500 ease-out group-hover:opacity-80"
          priority
        />
        
        {/* Play Overlay */}
        {isMedia && <PlayOverlay />}

        {/* Duration Badge */}
        {duration && (
          <div className="absolute bottom-4 right-4 z-10">
            <span className="bg-black/80 backdrop-blur-md px-3 py-1.5 text-[12px] font-label-mono text-bone tracking-wider">
              {duration}
            </span>
          </div>
        )}
      </div>

      {/* Brutalist Content Section */}
      <div className="flex flex-col justify-center w-full md:w-2/5 lg:w-1/3">
        <div className="flex justify-between items-center mb-6 md:mb-8 border-b border-stroke/50 pb-4">
          <div className="w-2 h-2 bg-accent" />
          <span className="text-[10px] font-label-mono uppercase tracking-[0.2em] text-accent">
            Featured {type}
          </span>
        </div>

        <h3 className="text-3xl lg:text-[40px] font-display text-bone mb-6 leading-[1.1] tracking-tight">
          {title}
        </h3>
        
        {/* Keeping description here since it's the featured item and has the space */}
        <p className="text-bone-mute font-body-sm md:font-body-md text-[15px] md:text-[16px] leading-[1.6] mb-8 line-clamp-4">
          {description}
        </p>

        <div className="mt-auto">
          <span className="text-[11px] font-label-mono uppercase tracking-[0.2em] text-bone-mute">
            {publishDate}
          </span>
        </div>
      </div>
    </Link>
  );
}
