/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef } from "react";
import type { TeamMember } from "@/types";
import { cn } from "@/lib/utils";
import { CircleButton } from "@/components/ui/circle-button";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";

interface TeamRosterProps {
  members: TeamMember[];
}

export function TeamRoster({ members }: TeamRosterProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    if (scrollWidth <= clientWidth) {
      setScrollProgress(0);
      return;
    }
    const progress = scrollLeft / (scrollWidth - clientWidth);
    setScrollProgress(progress);
  };

  const handleScrollClick = (direction: "prev" | "next") => {
    if (!scrollRef.current) return;
    const scrollAmount = 324; // Approximate card width + gap
    scrollRef.current.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth"
    });
  };

  if (!members || members.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-8 text-bone font-label-mono">
      
      <div className="w-full flex flex-col min-w-0">
        
        {/* Member Cards Slider */}
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl uppercase tracking-widest">Our Team</h2>
            <div className="flex gap-3">
              <CircleButton onClick={() => handleScrollClick("prev")} aria-label="Previous team member">
                <ArrowLeftIcon width={18} height={18} strokeWidth={1.4} />
              </CircleButton>
              <CircleButton onClick={() => handleScrollClick("next")} aria-label="Next team member">
                <ArrowRightIcon width={18} height={18} strokeWidth={1.4} />
              </CircleButton>
            </div>
        </div>

        <div className="relative mb-8">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {members.map((member, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "group relative shrink-0 flex flex-col rounded-none overflow-hidden transition-all duration-500 text-left h-[420px] w-[260px] md:w-[300px] snap-center border",
                    isActive 
                      ? "border-accent bg-[#0e0e0e]" 
                      : "border-stroke/50 hover:border-stroke bg-transparent"
                  )}
                >
                  {/* Portrait Background */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className={cn(
                        "w-full h-full object-cover transition-all duration-700 ease-in-out mix-blend-luminosity grayscale",
                        isActive ? "opacity-100 scale-100" : "opacity-30 scale-100 group-hover:opacity-60"
                      )}
                    />
                    {/* Heavy bottom gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent opacity-90" />
                  </div>

                  {/* Header Row */}
                  <div className="flex justify-between items-center p-6 z-30 w-full relative">
                    <span className={cn("text-[20px] font-display", isActive ? "text-bone" : "text-bone-mute")}>
                      0{i + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-label-mono uppercase tracking-[0.25em] text-bone-mute">
                        {member.role.split(' ')[0]}
                      </span>
                      <div className={cn("w-[5px] h-[5px] rounded-none", isActive ? "bg-accent shadow-[0_0_8px_var(--color-accent)]" : "bg-stroke/80")} />
                    </div>
                  </div>

                  {/* HOVER INFO OVERLAY (Z-20) */}
                  <div className="absolute inset-0 bg-[#050505]/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-center px-6 pt-12 pb-24">
                    <div className="flex flex-col gap-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                      
                      {/* Expertise */}
                      <div>
                        <p className="text-[8px] text-accent uppercase tracking-[0.2em] mb-3">Expertise</p>
                        <ul className="flex flex-col gap-2">
                          {member.specializations?.slice(0, 3).map((spec, idx) => (
                            <li key={idx} className="text-[10px] text-bone-mute flex items-start gap-2">
                              <span className="text-accent mt-0.5 opacity-80">›</span>
                              <span className="leading-relaxed opacity-90">{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack */}
                      <div>
                        <p className="text-[8px] text-accent uppercase tracking-[0.2em] mb-3">Tech Stack</p>
                        <div className="flex flex-wrap gap-1.5">
                          {member.techStack?.slice(0, 4).map((tech, idx) => (
                            <div key={idx} className="px-1.5 py-1 border border-stroke rounded-none text-[8px] text-bone-mute uppercase tracking-widest">
                              {tech}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Social Links */}
                      <div className="flex items-center gap-4 mt-2">
                        {member.socialLinks.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.href}
                            className="text-[9px] uppercase tracking-widest text-bone-mute hover:text-bone transition-colors"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>

                    </div>
                  </div>

                  {/* Footer Info (Z-30 so it sits above hover overlay) */}
                  <div className="mt-auto p-6 z-30 w-full relative flex items-end justify-between pointer-events-none">
                    <div className="flex flex-col gap-3">
                      <h3 className="font-body-md text-[22px] font-bold uppercase tracking-wide text-bone leading-[1.1]">
                        {member.name.split(' ').map((n, idx) => (
                          <React.Fragment key={idx}>{n}<br/></React.Fragment>
                        ))}
                      </h3>
                      <p className="text-[10px] font-label-mono uppercase tracking-[0.25em] text-accent leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {member.role}
                      </p>
                      <p className="text-[10px] font-label-mono uppercase tracking-[0.25em] text-bone-mute leading-relaxed group-hover:hidden">
                        {member.role.split(' ').map((r, idx) => (
                          <React.Fragment key={idx}>{r}<br/></React.Fragment>
                        ))}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Aesthetic Yellow Scrollbar */}
          <div className="w-full h-[2px] bg-stroke/30 relative mt-2">
            <div 
              className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-accent transition-all duration-150 ease-out" 
              style={{ 
                width: '40px', 
                left: `calc(${scrollProgress * 100}% - ${scrollProgress * 40}px)` 
              }} 
            />
          </div>
        </div>

      </div>

      <div className="w-full mt-4 border border-stroke rounded-none flex flex-col md:flex-row overflow-hidden bg-[#0a0a0a]">
        <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-stroke">
          {[
            { val: `0${members.length}`, label: "ACTIVE COORDINATES" },
            { val: "12+", label: "PROJECTS DELIVERED" },
            { val: "</> 25K+", label: "LINES OF CODE" },
            { val: "05", label: "COUNTRIES SERVED" }
          ].map((m, i) => (
            <div key={i} className="p-6 lg:p-8 flex items-center gap-6 group hover:bg-[#111] transition-colors">
              <div className="flex flex-col">
                <h4 className="font-display text-3xl text-bone mb-2 tracking-wide group-hover:text-accent transition-colors">{m.val}</h4>
                <p className="text-[8px] uppercase tracking-[0.2em] text-bone-mute">{m.label}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 lg:p-8 border-t md:border-t-0 md:border-l border-stroke w-full lg:w-[380px] flex items-center shrink-0">
          <p className="text-[11px] text-bone-mute leading-relaxed italic border-l-2 border-accent pl-4">
            &quot;Great systems are not built by individuals. They are built by aligned minds.&quot;
          </p>
        </div>
      </div>

    </div>
  );
}
