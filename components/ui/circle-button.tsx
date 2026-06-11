import React, { ReactNode } from "react";
import Link from "next/link";

interface CircleButtonProps {
  href?: string;
  onClick?: () => void;
  "aria-label"?: string;
  className?: string;
  children: ReactNode;
}

export function CircleButton({ 
  href, 
  onClick, 
  "aria-label": ariaLabel, 
  className = "", 
  children 
}: CircleButtonProps) {
  const baseClasses = `shrink-0 w-12 h-12 border border-stroke text-bone-mute hover:bg-accent hover:text-[#0a0a0a] hover:scale-110 hover:border-accent hover:shadow-[0_0_20px_var(--color-accent-glow)] transition-all duration-300 ease-out flex items-center justify-center rounded-full ${className}`;

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className={baseClasses} onClick={onClick} style={{ borderRadius: '50%' }}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} aria-label={ariaLabel} className={baseClasses} style={{ borderRadius: '50%' }}>
      {children}
    </button>
  );
}
