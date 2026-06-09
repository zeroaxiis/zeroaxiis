/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState } from "react";
import type { Project } from "@/types";
import { ArrowUpRightSmallIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface ProjectsCarouselProps {
  projects: Project[];
}

export function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate twice so the loop is seamless
  const doubled = [...projects, ...projects];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Fade edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10
          bg-gradient-to-r from-surface-container-lowest to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10
          bg-gradient-to-l from-surface-container-lowest to-transparent"
      />

      {/* Scrolling track */}
      <div
        ref={trackRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="flex gap-6 w-max"
        style={{
          animation: "projectsTicker 50s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {doubled.map((project, i) => (
          <ProjectCarouselCard
            key={`${project.title}-${i}`}
            project={project}
            index={i % projects.length}
          />
        ))}
      </div>

      {/* Keyframe injected via a style tag */}
      <style>{`
        @keyframes projectsTicker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

interface ProjectCarouselCardProps {
  project: Project;
  index: number;
}

function ProjectCarouselCard({ project, index }: ProjectCarouselCardProps) {
  const { title, description, tags, image, imageAlt, categoryLabel, href = "#" } = project;

  return (
    <a
      href={href}
      className="group shrink-0 w-[85vw] sm:w-[460px] lg:w-[500px] flex flex-col"
    >
      {/* Image */}
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-surface-layer border border-stroke/50 group-hover:border-accent/40 transition-colors duration-500">
        {image ? (
          <img
            src={image}
            alt={imageAlt || title}
            className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
        ) : (
          <div className="w-full h-full bg-surface-layer-raised" />
        )}
      </div>

      {/* Meta row */}
      <div className="flex items-center justify-between mt-5 mb-3">
        <div className="flex items-center gap-3">
          <span className="font-label-mono text-[10px] text-bone-mute uppercase tracking-[0.22em] opacity-50">
            {String(index + 1).padStart(2, "0")}
          </span>
          {categoryLabel && (
            <span className="font-label-mono text-[9px] uppercase tracking-[0.18em] border border-stroke rounded-full px-2.5 py-1 text-bone-mute">
              {categoryLabel}
            </span>
          )}
        </div>
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-stroke text-bone-mute group-hover:border-accent group-hover:text-accent group-hover:-rotate-12 transition-all duration-300">
          <ArrowUpRightSmallIcon width={12} height={12} strokeWidth={1.6} />
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display text-[26px] sm:text-[30px] leading-[1.1] tracking-[-0.02em] text-bone group-hover:text-accent transition-colors duration-300 mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="font-body-sm text-body-sm text-bone-mute leading-relaxed">
        {description}
      </p>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className={cn("flex flex-wrap gap-2 mt-4 pt-4 border-t border-stroke/60")}>
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-label-mono text-[9px] uppercase tracking-[0.16em] text-bone-mute border border-stroke rounded-full px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}
