import React from "react";
import type { CreativeItem } from "@/types";

interface ArticleHeaderProps {
  item: CreativeItem;
}

export function ArticleHeader({ item }: ArticleHeaderProps) {
  return (
    <>
      <div className="flex items-center gap-4">
        <span className="bg-accent text-black px-3 py-1 font-label-mono text-label-mono uppercase tracking-[0.22em] font-bold">
          {item.category}
        </span>
      </div>

      <h1 className="font-display text-[32px] md:text-[48px] leading-[1.1] text-bone tracking-tight">
        {item.title}
      </h1>



      <div className="h-px w-full bg-stroke my-4"></div>
    </>
  );
}
