/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "motion/react";
import type { TeamMember } from "@/types";

export type TeamMemberCardProps = TeamMember;

export function TeamMemberCard({
  name,
  role,
  description,
  image,
  imageAlt,
  socialLinks,
}: TeamMemberCardProps) {
  return (
    <motion.article
      className="group relative overflow-hidden bg-surface-layer border border-stroke hover:border-stroke-hover transition-colors duration-500"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative h-[360px] overflow-hidden bg-canvas">
        <img
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-105 opacity-75 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          src={image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <span
          aria-hidden="true"
          className="absolute top-6 left-6 font-label-mono text-[10px] uppercase tracking-[0.22em] text-bone-mute"
        >
          {role}
        </span>
        <span
          aria-hidden="true"
          className="absolute top-6 right-6 w-2 h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>

      <div className="p-8">
        <h3 className="font-display text-3xl text-bone mb-3 tracking-[-0.02em]">
          {name}
        </h3>
        <p className="font-body-sm text-body-sm text-bone-mute mb-6 leading-relaxed">
          {description}
        </p>
        <div className="flex items-center gap-6 pt-6 border-t border-stroke">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-label-mono text-[10px] uppercase tracking-[0.22em] text-bone-mute hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
