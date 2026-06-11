/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import type { TeamMember } from "@/types";

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 pb-8 w-full">
          {members.map((member, i) => (
            <div key={i} className="group flex flex-col gap-5 w-full cursor-pointer">
              <div
                className="relative w-full h-full rounded-[14px] overflow-hidden"
              >
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent transition-colors duration-500 rounded-[14px] pointer-events-none z-10" />
                
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover block relative z-0 scale-[1.08]"
                />
              </div>
              
              <div className="flex items-center justify-center pt-2">
                <h3 className="font-display text-2xl md:text-3xl text-bone tracking-[-0.02em] transition-colors duration-500 group-hover:text-accent">
                  Team {member.name.split(' ')[0]}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
