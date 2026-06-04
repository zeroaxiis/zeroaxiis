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
      className="flex flex-col border-t border-stroke"
      stagger={0.1}
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.title}
          variants={revealItem}
          className="w-full border-b border-stroke last:border-b-0"
        >
          <ProjectCard {...project} index={index + 1} />
        </motion.div>
      ))}
    </RevealStagger>
  );
}
