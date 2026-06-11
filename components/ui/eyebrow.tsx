import React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function Eyebrow({ children, className, ...props }: EyebrowProps) {
  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      <span className="font-label-mono text-[10px] uppercase tracking-[0.2em] text-bone flex items-center gap-3">
        {children}
        <span className="w-8 h-[1px] bg-accent" />
      </span>
    </div>
  );
}
