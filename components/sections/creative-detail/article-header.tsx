import React from "react";
import type { CreativeItem } from "@/types";

interface ArticleHeaderProps {
  item: CreativeItem;
}

export function ArticleHeader({ item }: ArticleHeaderProps) {
  return (
    <>
      <div className="flex items-center gap-4">
        <span className="bg-accent text-black px-3 py-1 font-label-mono text-[12px] uppercase tracking-wider font-bold">
          {item.type}
        </span>
        <span className="text-bone-mute font-label-mono text-[12px] uppercase tracking-wider">
          {item.publishDate}
        </span>
        {item.duration && (
          <span className="text-bone-mute font-label-mono text-[12px] uppercase tracking-wider border border-stroke px-2 py-0.5 rounded">
            {item.duration}
          </span>
        )}
      </div>

      <h1 className="font-display text-[32px] md:text-[48px] leading-[1.1] text-bone tracking-tight">
        {item.title}
      </h1>

      <div className="flex items-center gap-3 text-bone-mute font-body text-sm mt-2">
        <span>By {item.author}</span>
      </div>

      <div className="h-px w-full bg-stroke my-4"></div>
    </>
  );
}
