import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  gap?: string;
}

export function Marquee({
  children,
  className,
  reverse,
  pauseOnHover,
  gap = "4rem",
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex w-full overflow-hidden",
        pauseOnHover && "[&:hover_.marquee-track]:[animation-play-state:paused]",
        className,
      )}
    >
      <div
        className="marquee-track flex shrink-0 animate-marquee items-center"
        style={{
          gap,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        <div
          className="flex shrink-0 items-center"
          style={{ gap }}
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
