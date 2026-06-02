import { cn } from "@/lib/utils";

interface PlayOverlayProps {
  className?: string;
  iconSize?: number;
}

export function PlayOverlay({ className, iconSize = 24 }: PlayOverlayProps) {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div 
        className={cn(
          "w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 ease-out group-hover:bg-accent group-hover:border-accent group-hover:scale-110",
          className
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={iconSize}
          height={iconSize}
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
