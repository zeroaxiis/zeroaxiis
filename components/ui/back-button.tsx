import React from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";

interface BackButtonProps {
  href: string;
  "aria-label"?: string;
  className?: string;
}

export function BackButton({ href, "aria-label": ariaLabel = "Go back", className = "" }: BackButtonProps) {
  return (
    <Link 
      href={href} 
      aria-label={ariaLabel}
      className={`shrink-0 w-12 h-12 border border-stroke text-bone-mute hover:bg-accent hover:text-[#0a0a0a] hover:scale-110 hover:border-accent hover:shadow-[0_0_20px_var(--color-accent-glow)] transition-all duration-300 ease-out flex items-center justify-center rounded-full ${className}`}
    >
      <ArrowLeftIcon width={18} height={18} strokeWidth={1.4} />
    </Link>
  );
}
