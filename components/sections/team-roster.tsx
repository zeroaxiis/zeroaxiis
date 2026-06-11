/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import type { TeamMember } from "@/types";
import { GithubProfileCard } from "@/components/cards/github-profile-card";

import Link from "next/link";

interface TeamRosterProps {
  members: TeamMember[];
}

export function TeamRoster({ members }: TeamRosterProps) {
  if (!members || members.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-8 text-bone font-label-mono mt-10">
      <div className="w-full flex flex-col min-w-0">
        
        {/* Header */}
        <div className="mb-10 px-2">
            <h2 className="font-display text-4xl md:text-5xl text-bone tracking-tight">
              Our Team.
            </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 md:gap-y-16 pb-8 w-full">
          {members.map((member, i) => (
            <GithubProfileCard key={i} member={member} />
          ))}
        </div>

      </div>
    </div>
  );
}
