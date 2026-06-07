/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "motion/react";
import type { Project } from "@/types";
import { TechTag } from "@/components/ui";
import { ArrowDiagonalSmallIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export type ProjectCardProps = Project & { index?: number };

export function ProjectCard({
  title,
  description,
  tags,
  image,
  imageAlt,
  icon,
  index,
  href = "#",
}: ProjectCardProps) {
  return (
    <motion.a
      href={href}
      className={cn(
        "group flex flex-col lg:flex-row w-full bg-transparent hover:bg-surface-layer transition-all duration-500 py-8 lg:py-12 items-start lg:items-center relative z-10 overflow-hidden px-4 sm:px-8",
      )}
    >
      {/* Number and Title Column */}
      <div className="flex-1 w-full lg:w-[40%] flex items-start gap-6 lg:gap-8 mb-6 lg:mb-0 pr-8">
        <span className="font-label-mono text-[10px] sm:text-[12px] text-bone-mute mt-2 sm:mt-3 lg:mt-4 opacity-50 flex-shrink-0">
          {index ? String(index).padStart(2, "0") : "01"}
        </span>
        <h3 className="text-[36px] sm:text-[48px] lg:text-[56px] xl:text-[64px] font-display text-bone leading-[0.9] tracking-[-0.02em] group-hover:text-accent transition-colors duration-500">
          {title}
        </h3>
      </div>

      {/* Description and Tags Column */}
      <div className="flex-1 w-full lg:w-[35%] lg:pr-12 mb-8 lg:mb-0 flex flex-col justify-center">
        <p className="text-bone-mute font-body text-[14px] sm:text-[15px] leading-relaxed max-w-sm mb-6 lg:mb-8 group-hover:text-bone-dim transition-colors">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TechTag key={tag}>{tag}</TechTag>
          ))}
        </div>
      </div>

      {/* Media and Action Column */}
      <div className="w-full lg:w-[25%] flex items-center justify-between gap-6 lg:gap-8">
        <div className="w-full max-w-[280px] lg:max-w-none aspect-[16/9] lg:aspect-[4/3] xl:aspect-video rounded-[12px] overflow-hidden bg-surface-layer-raised border border-stroke flex-shrink-0 relative group-hover:border-accent/40 transition-colors duration-500 shadow-2xl shadow-black/20">
          {image ? (
            <img
              alt={imageAlt || title}
              className="w-full h-full object-cover transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105 group-hover:opacity-90 opacity-70 grayscale group-hover:grayscale-0"
              src={image}
            />
          ) : icon ? (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[48px] lg:text-[64px] text-bone-mute opacity-40 group-hover:text-accent group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                {icon}
              </span>
            </div>
          ) : null}
        </div>

        {/* Action Arrow */}
        <div className="hidden sm:flex flex-shrink-0">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-stroke text-bone-mute group-hover:border-accent group-hover:bg-accent/5 group-hover:text-accent group-hover:rotate-[-45deg] transition-all duration-500">
            <ArrowDiagonalSmallIcon />
          </span>
        </div>
      </div>
    </motion.a>
  );
}
