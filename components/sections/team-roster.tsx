/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import type { TeamMember } from "@/types";
import { TeamProfileCard } from "@/components/cards/team-profile-card";

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

        <div className="flex flex-wrap justify-center gap-x-12 sm:gap-x-16 md:gap-x-24 gap-y-10 md:gap-y-16 pb-8 w-full max-w-5xl mx-auto">
          {members.map((member, i) => (
            <div key={i} className="w-[45%] sm:w-[30%] w-full max-w-[250px] flex justify-center">
              <TeamProfileCard member={member} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
