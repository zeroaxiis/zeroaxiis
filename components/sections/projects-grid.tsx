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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
      stagger={0.1}
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.title}
          variants={revealItem}
          className="w-full h-full"
        >
          <ProjectCard {...project} index={index + 1} priority={index < 3} />
        </motion.div>
      ))}
    </RevealStagger>
  );
}
