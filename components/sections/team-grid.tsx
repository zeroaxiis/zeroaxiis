"use client";

import { motion } from "motion/react";
import { TeamCard } from "@/components/cards";
import { RevealStagger, revealItem } from "@/components/ui/reveal";
import type { TeamMember } from "@/types";

interface TeamGridProps {
  members: TeamMember[];
}

export function TeamGrid({ members }: TeamGridProps) {
  return (
    <RevealStagger
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16"
      stagger={0.1}
    >
      {members.map((member, idx) => (
        <motion.div key={member.name} variants={revealItem}>
          <TeamCard {...member} priority={idx < 3} />
        </motion.div>
      ))}
    </RevealStagger>
  );
}
