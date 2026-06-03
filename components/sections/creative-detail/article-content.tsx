import React from "react";

interface ArticleContentProps {
  description: string;
}

export function ArticleContent({ description }: ArticleContentProps) {
  return (
    <div className="prose prose-invert prose-lg max-w-none">
      <p className="text-bone font-body leading-relaxed text-lg">
        {description}
      </p>
      
      {/* Placeholder for an extended article if needed */}
      <div className="mt-8 text-bone-mute font-body leading-relaxed space-y-4">
        <p>
          This session delves deeply into the core principles of building robust and scalable systems. We cover practical patterns that teams can adopt immediately to improve their software architecture and developer experience.
        </p>
        <p>
          As organizations grow, the complexity of maintaining codebases often scales exponentially. By embracing modern paradigms and carefully managing technical debt, teams can maintain velocity without sacrificing quality.
        </p>
      </div>
    </div>
  );
}
