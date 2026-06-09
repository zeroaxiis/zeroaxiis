/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import type { Project } from "@/types";
import { ArrowDiagonalSmallIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export type ProjectCardProps = Project & {
  index?: number;
  className?: string;
  priority?: boolean;
};

export function ProjectCard({
  title,
  description,
  image,
  imageAlt,
  icon,
  href = "#",
  className,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col w-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 h-full",
        className
      )}
    >
      {/* Compact thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-[#1a1c20]">
        {image ? (
          <img
            src={image}
            alt={imageAlt || title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : icon ? (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[40px] text-bone-mute opacity-40 group-hover:text-accent group-hover:opacity-100 transition-all duration-400">
              {icon}
            </span>
          </div>
        ) : null}
      </div>

      {/* Title + arrow */}
      <h3 className="text-[15px] font-medium text-bone leading-snug flex items-center gap-1 mt-3 mb-1 group-hover:text-accent transition-colors duration-300">
        {title}
        <ArrowDiagonalSmallIcon width={11} height={11} className="text-bone-mute group-hover:text-accent flex-shrink-0 transition-colors duration-300" />
      </h3>

      {/* Description */}
      <p className="text-bone-mute text-[12px] leading-[1.5] line-clamp-2">
        {description}
      </p>
    </Link>
  );
}
