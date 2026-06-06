/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "motion/react";
import type { Project } from "@/types";
import { ArrowUpRightSmallIcon } from "@/components/icons";

export type ProjectCardV2Props = Project & {
  /** Optional className override for the outer wrapper */
  className?: string;
};

export function ProjectCardV2({
  title,
  description,
  image,
  imageAlt,
  icon,
  categoryLabel,
  href = "#",
  className = "",
}: ProjectCardV2Props) {
  return (
    <motion.a
      href={href}
      className={`group relative flex flex-col bg-surface-layer border border-stroke overflow-hidden hover:border-stroke-hover transition-colors duration-500 ${className}`}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top accent line on hover */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-700 z-10"
      />

      {/* Project image / preview */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-canvas">
        {image ? (
          <img
            src={image}
            alt={imageAlt || title}
            className="w-full h-full object-cover opacity-60 grayscale group-hover:opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
        ) : icon ? (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-bone-mute opacity-40 group-hover:text-accent group-hover:opacity-80 transition-all duration-500">
              {icon}
            </span>
          </div>
        ) : (
          <div className="w-full h-full bg-surface-container" />
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Category badge + icon */}
        <div className="flex items-center justify-between">
          {categoryLabel && (
            <span className="font-label-mono text-[9px] uppercase tracking-[0.2em] text-accent">
              {categoryLabel}
            </span>
          )}
          <span className="ml-auto inline-flex items-center justify-center w-7 h-7 border border-stroke rounded-sm text-bone-mute group-hover:border-accent group-hover:text-accent transition-all duration-400">
            <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" aria-hidden="true">
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
              <circle cx="8" cy="8" r="2" fill="currentColor"/>
            </svg>
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-[clamp(20px,2vw,26px)] leading-[1.05] tracking-[-0.02em] text-bone">
          {title}
        </h3>

        {/* Description */}
        <p className="font-body-sm text-body-sm text-bone-mute leading-relaxed flex-1 line-clamp-2">
          {description}
        </p>

        {/* VIEW PROJECT link */}
        <div className="flex items-center gap-2 mt-2 pt-3 border-t border-stroke group-hover:border-stroke-hover transition-colors duration-300">
          <span className="font-label-mono text-[10px] uppercase tracking-[0.2em] text-bone-mute group-hover:text-accent transition-colors duration-300">
            View Project
          </span>
          <ArrowUpRightSmallIcon
            width={10}
            height={10}
            strokeWidth={1.6}
            className="text-bone-mute group-hover:text-accent transition-colors duration-300"
          />
        </div>
      </div>
    </motion.a>
  );
}
