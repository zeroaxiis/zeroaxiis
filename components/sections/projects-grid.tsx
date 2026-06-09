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
      className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12"
      stagger={0.1}
    >
      {projects.map((project, index) => (
        <motion.div key={project.title} variants={revealItem}>
          <ProjectCard {...project} index={index + 1} />
        </motion.div>
      ))}
    </RevealStagger>
  );
}
