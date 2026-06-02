import { cn } from "@/lib/utils";

interface DurationBadgeProps {
  duration: string;
  className?: string;
}

export function DurationBadge({ duration, className }: DurationBadgeProps) {
  if (!duration) return null;

  return (
    <div className={cn("absolute bottom-2 right-2 z-10", className)}>
      <span className="bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded-[4px] text-[12px] font-medium text-white tracking-wide">
        {duration}
      </span>
    </div>
  );
}
