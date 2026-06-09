/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "motion/react";
import type { Project } from "@/types";
import { ArrowUpRightSmallIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export type ProjectCardProps = Project & { index?: number };

export function ProjectCard({
  title,
  description,
  image,
  imageAlt,
  href = "#",
}: ProjectCardProps) {
  return (
    <motion.a
      href={href}
      className="group flex flex-col gap-4"
      whileHover="hover"
    >
      {/* Image Thumbnail */}
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-surface-layer border border-stroke/60">
        {image ? (
          <img
            src={image}
            alt={imageAlt || title}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-surface-layer-raised" />
        )}
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>

      {/* Title + Arrow */}
      <div className="flex items-center gap-2">
        <h3 className="font-display text-[18px] sm:text-[20px] tracking-[-0.02em] text-bone group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        <span
          className={cn(
            "inline-flex items-center justify-center w-5 h-5 rounded-full border border-bone/30 text-bone/50",
            "group-hover:border-accent group-hover:text-accent group-hover:rotate-0 transition-all duration-300",
            "-rotate-45"
          )}
        >
          <ArrowUpRightSmallIcon width={10} height={10} strokeWidth={1.8} />
        </span>
      </div>

      {/* Description */}
      <p className="font-body text-[13px] sm:text-[14px] text-bone-mute leading-relaxed -mt-1">
        {description}
      </p>
    </motion.a>
  );
}
