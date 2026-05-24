/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "motion/react";
import type { Project } from "@/types";
import { TechTag } from "@/components/ui";
import { ArrowDiagonalSmallIcon } from "@/components/icons";

export type ProjectCardProps = Project;

export function ProjectCard({
  title,
  description,
  tags,
  image,
  imageAlt,
  icon,
  colSpan = "col-span-1",
  height = "h-card-image-lg",
  href = "#",
}: ProjectCardProps) {
  return (
    <motion.a
      href={href}
      className={`group relative block bg-surface-layer border border-stroke p-8 sm:p-10 flex flex-col justify-between min-h-card ${colSpan} hover:border-stroke-hover transition-colors duration-500 overflow-hidden`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-700"
      />

      <div className="flex justify-between items-start mb-10 relative z-10">
        <div className="max-w-2xl">
          <h3 className="font-display text-[clamp(28px,3.5vw,48px)] leading-[1] tracking-[-0.025em] text-bone mb-4 group-hover:text-bone transition-colors">
            {title}
          </h3>
          <p className="font-body-md text-body-md text-bone-mute max-w-md leading-relaxed">
            {description}
          </p>
        </div>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-stroke text-bone-mute group-hover:border-accent group-hover:text-accent group-hover:rotate-[-45deg] transition-all duration-500">
          <ArrowDiagonalSmallIcon />
        </span>
      </div>

      <div className="mt-auto relative z-10">
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <TechTag key={tag}>{tag}</TechTag>
          ))}
        </div>
        <div
          className={`${height} w-full bg-canvas border border-stroke relative overflow-hidden flex items-center justify-center group-hover:border-stroke-hover transition-colors duration-500`}
        >
          {image ? (
            <img
              alt={imageAlt || title}
              className="w-full h-full object-cover opacity-50 grayscale group-hover:opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              src={image}
            />
          ) : icon ? (
            <span className="material-symbols-outlined text-5xl text-bone-mute opacity-60 group-hover:text-accent group-hover:opacity-100 transition-all duration-500">
              {icon}
            </span>
          ) : null}
        </div>
      </div>
    </motion.a>
  );
}
