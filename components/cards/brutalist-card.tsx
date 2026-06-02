import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BrutalistCardProps {
  title: string;
  description: string;
  className?: string;
  icon?: ReactNode;
}

export function BrutalistCard({ title, description, className, icon }: BrutalistCardProps) {
  return (
    <div
      className={cn(
        "border border-stroke p-5 md:p-6 transition-all duration-300 hover:-translate-y-2 hover:-translate-x-2 hover:[box-shadow:8px_8px_0_theme(colors.accent.DEFAULT)]",
        className
      )}
    >
      <div className="flex justify-between items-center mb-6 border-b border-stroke/30 pb-3">
        {icon || <div className="w-1.5 h-1.5 bg-accent" />}
      </div>
      <h3 className="font-display text-xl md:text-2xl text-bone uppercase leading-[1.1] mb-3">
        {title}
      </h3>
      <p className="font-body-sm text-bone-mute text-[13px] md:text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
