"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRightSmallIcon } from "@/components/icons";
import { Magnetic } from "@/components/ui/magnetic";
import styles from "./cta-button.module.css";
import { cn } from "@/lib/utils";

interface CtaButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
  isExternal?: boolean;
}

export function CtaButton({
  href,
  children,
  className,
  isExternal,
  ...props
}: CtaButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      <span className={styles.ctaArrow}>
        <ArrowUpRightSmallIcon />
      </span>
    </>
  );

  const anchorClasses = cn(styles.cta, className);

  return (
    <Magnetic>
      {isExternal || href.startsWith("#") ? (
        <a href={href} className={anchorClasses} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined} {...props}>
          {content}
        </a>
      ) : (
        <Link href={href} className={anchorClasses} {...props}>
          {content}
        </Link>
      )}
    </Magnetic>
  );
}

export function CtaButtonCluster({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn(styles.ctaCluster, className)}>{children}</div>;
}
