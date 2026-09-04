import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";

interface ArticleContentProps {
  summary: string;
}

export function ArticleContent({ summary }: ArticleContentProps) {
  return (
    <div className="prose prose-invert prose-lg max-w-none prose-p:text-bone prose-p:font-body prose-p:leading-relaxed prose-p:text-lg prose-headings:text-bone prose-a:text-accent">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>{summary}</ReactMarkdown>
    </div>
  );
}
