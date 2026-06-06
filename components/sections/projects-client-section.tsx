"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Project, ProjectCategory } from "@/types";
import { ProjectCardV2 } from "@/components/cards/project-card-v2";

const FILTERS: { label: string; value: ProjectCategory }[] = [
  { label: "All Projects", value: "all" },
  { label: "Web Applications", value: "web-applications" },
  { label: "Mobile Apps", value: "mobile-apps" },
  { label: "Platforms", value: "platforms" },
  { label: "Tools & Systems", value: "tools-systems" },
  { label: "Others", value: "others" },
];

interface ProjectsClientSectionProps {
  projects: Project[];
}

export function ProjectsClientSection({ projects }: ProjectsClientSectionProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="relative">
      {/* ── Filter bar ── */}
      <div className="flex items-center justify-between gap-4 mb-8 overflow-x-auto pb-4 custom-scrollbar">
        {/* Tabs */}
        <nav className="flex items-center gap-2 shrink-0" aria-label="Project filters">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              id={`filter-${f.value}`}
              aria-pressed={activeFilter === f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`relative px-6 py-3 font-label-mono text-[11px] uppercase tracking-[0.18em] whitespace-nowrap transition-all duration-300 border ${
                activeFilter === f.value
                  ? "bg-accent text-ink border-accent font-semibold"
                  : "bg-transparent text-bone-mute border-stroke hover:border-stroke-hover hover:text-bone"
              }`}
            >
              {f.label}
            </button>
          ))}
        </nav>

        {/* View toggle */}
        <div className="flex items-center gap-1 shrink-0 pr-1">
          <span className="font-label-mono text-[9px] uppercase tracking-[0.18em] text-bone-mute mr-2">
            View As
          </span>
          <button
            id="view-grid"
            aria-label="Grid view"
            aria-pressed={viewMode === "grid"}
            onClick={() => setViewMode("grid")}
            className={`p-2 border transition-colors duration-200 ${
              viewMode === "grid"
                ? "border-accent text-accent bg-accent/10"
                : "border-stroke text-bone-mute hover:border-stroke-hover"
            }`}
          >
            <GridIcon />
          </button>
          <button
            id="view-list"
            aria-label="List view"
            aria-pressed={viewMode === "list"}
            onClick={() => setViewMode("list")}
            className={`p-2 border transition-colors duration-200 ${
              viewMode === "list"
                ? "border-accent text-accent bg-accent/10"
                : "border-stroke text-bone-mute hover:border-stroke-hover"
            }`}
          >
            <ListIcon />
          </button>
        </div>
      </div>

      {/* ── Cards ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter + viewMode}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
              : "flex flex-col gap-3"
          }
        >
          {filtered.length === 0 ? (
            <div className="col-span-full py-24 text-center font-label-mono text-label-mono text-bone-mute uppercase tracking-[0.2em]">
              No projects in this category
            </div>
          ) : (
            filtered.map((project, i) =>
              viewMode === "grid" ? (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectCardV2 {...project} />
                </motion.div>
              ) : (
                <ProjectListRow key={project.title} project={project} index={i} />
              )
            )
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Compact list-view row */
function ProjectListRow({ project, index }: { project: Project; index: number }) {
  return (
    <motion.a
      href={project.href ?? "#"}
      className="group flex items-center gap-6 px-5 py-4 border border-stroke hover:border-stroke-hover bg-surface-layer hover:bg-surface-layer-raised transition-all duration-300"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      {/* Index */}
      <span className="font-label-mono text-[10px] text-bone-mute w-6 shrink-0">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Category */}
      {project.categoryLabel && (
        <span className="font-label-mono text-[9px] uppercase tracking-[0.18em] text-accent w-36 shrink-0 hidden sm:block">
          {project.categoryLabel}
        </span>
      )}

      {/* Title + desc */}
      <div className="flex-1 min-w-0">
        <span className="font-display text-[clamp(16px,1.8vw,20px)] tracking-[-0.02em] text-bone group-hover:text-bone transition-colors block">
          {project.title}
        </span>
        <span className="font-body-sm text-body-sm text-bone-mute line-clamp-1 mt-0.5 hidden sm:block">
          {project.description}
        </span>
      </div>

      {/* CTA */}
      <span className="font-label-mono text-[10px] uppercase tracking-[0.18em] text-bone-mute group-hover:text-accent transition-colors duration-200 shrink-0 hidden md:flex items-center gap-1.5">
        View Project
        <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5" aria-hidden="true">
          <path d="M2.5 9.5l7-7M4 2.5h5.5V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </motion.a>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
      <rect x="1" y="1" width="6" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9" y="1" width="6" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="1" y="9" width="6" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9" y="9" width="6" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
      <line x1="1" y1="4" x2="15" y2="4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="1" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
