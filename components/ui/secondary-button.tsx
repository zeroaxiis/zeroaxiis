import React from "react";
import Link from "next/link";
import styles from "./secondary-button.module.css";
import { cn } from "@/lib/utils";

interface SecondaryButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
  isExternal?: boolean;
}

export function SecondaryButton({
  href,
  children,
  className,
  isExternal,
  ...props
}: SecondaryButtonProps) {
  const anchorClasses = cn(styles.ctaSecondary, className);

  if (isExternal) {
    return (
      <a href={href} className={anchorClasses} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={anchorClasses} {...props}>
      {children}
    </Link>
  );
}
