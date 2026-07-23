"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@/components/icons";

interface BackButtonProps {
  "aria-label"?: string;
  className?: string;
}

export function BackButton({ "aria-label": ariaLabel = "Go back", className = "w-10 h-10" }: BackButtonProps) {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()}
      aria-label={ariaLabel}
      className={`shrink-0 border border-stroke text-bone-mute hover:bg-accent hover:text-[#0a0a0a] hover:scale-110 hover:border-accent hover:shadow-[0_0_20px_var(--color-accent-glow)] transition-all duration-300 ease-out flex items-center justify-center rounded-full ${className}`}
      style={{ borderRadius: '50%' }}
    >
      <ArrowLeftIcon width={16} height={16} strokeWidth={1.4} />
    </button>
  );
}
