import React from "react";
import Link from "next/link";

interface BackButtonProps {
  href: string;
}

export function BackButton({ href }: BackButtonProps) {
  return (
    <div className="w-full mb-6">
      <Link 
        href={href} 
        className="inline-flex items-center gap-2 text-bone-mute hover:text-accent font-label-mono text-[12px] uppercase tracking-wider transition-colors"
      >
        <span aria-hidden="true">←</span>
        Back
      </Link>
    </div>
  );
}
