import React from "react";

interface ArticleContentProps {
  summary: string;
}

export function ArticleContent({ summary }: ArticleContentProps) {
  return (
    <div className="prose prose-invert prose-lg max-w-none">
      <p className="text-bone font-body leading-relaxed text-lg">
        {summary}
      </p>
      

    </div>
  );
}
