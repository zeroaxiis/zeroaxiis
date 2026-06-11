"use client";

import React from "react";
import type { TeamMember } from "@/types";
import { Magnetic } from "@/components/ui/magnetic";

interface GithubProfileCardProps {
  member: TeamMember;
}

export function GithubProfileCard({ member }: GithubProfileCardProps) {
  return (
    <Magnetic strength={0.15} className="flex flex-col gap-4 w-full max-w-[250px] mx-auto">
      <a 
        href={member.socialLinks?.find(l => l.label === 'GitHub')?.href || '#'} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex flex-col group cursor-pointer"
      >
        <div className="relative w-full aspect-square mx-auto mb-2">
          <div className="w-full h-full overflow-hidden border border-stroke bg-[#0a0a0a] relative z-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02]" style={{ borderRadius: '50%' }}>
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-full object-cover"
              style={{ borderRadius: '50%' }}
            />
          </div>
        </div>
        
        <div 
          className="flex flex-col items-center text-center mt-3 px-2"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"' }}
        >
          <h3 className="text-[18px] sm:text-[20px] lg:text-[24px] font-semibold leading-[1.25] text-[#e6edf3]">
            {member.name}
          </h3>
          <span className="text-[14px] sm:text-[16px] lg:text-[20px] font-light leading-[1.2] lg:leading-[24px] text-[#848d97] block mt-1">
            {member.githubProfile?.username || member.name.toLowerCase().replace(' ', '-')}
            <span className="mx-1">·</span>
            <span>he/him</span>
          </span>
        </div>
      </a>
    </Magnetic>
  );
}
