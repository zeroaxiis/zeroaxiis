import React from "react";
import Link from "next/link";

interface BackButtonProps {
  href: string;
}

export function BackButton({ href }: BackButtonProps) {
  return (
    <div className="w-full mb-10 flex justify-start">
      <Link 
        href={href} 
        aria-label="Go back"
        className="w-12 h-12 border border-stroke text-bone-mute hover:bg-accent hover:text-[#0a0a0a] hover:scale-110 hover:border-accent hover:shadow-[0_0_20px_var(--color-accent-glow)] transition-all duration-300 ease-out flex items-center justify-center rounded-full"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </Link>
    </div>
  );
}
