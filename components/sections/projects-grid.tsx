"use client";

import { motion } from "motion/react";
import { ProjectCard } from "@/components/cards";
import { RevealStagger, revealItem } from "@/components/ui/reveal";
import type { Project } from "@/types";

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <RevealStagger
      className="grid grid-cols-1 md:grid-cols-12 gap-6"
      stagger={0.1}
    >
      {projects.map((project) => (
        <motion.div
          key={project.slug}
          variants={revealItem}
          className={project.colSpan ?? "md:col-span-12"}
        >
          <ProjectCard {...project} colSpan="" />
        </motion.div>
      ))}
    </RevealStagger>
  );
}
