"use client";

import { motion } from "motion/react";
import { TeamMemberCard } from "@/components/cards";
import { RevealStagger, revealItem } from "@/components/ui/reveal";
import type { TeamMember } from "@/types";

interface TeamGridProps {
  members: TeamMember[];
}

export function TeamGrid({ members }: TeamGridProps) {
  return (
    <RevealStagger
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      stagger={0.1}
    >
      {members.map((member) => (
        <motion.div key={member.name} variants={revealItem}>
          <TeamMemberCard {...member} />
        </motion.div>
      ))}
    </RevealStagger>
  );
}
