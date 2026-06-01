"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CreativeCard, FeaturedCreativeCard } from "@/components/cards";
import { creativeItems } from "@/lib/data/creative";
import { Reveal } from "@/components/ui/reveal";

const FILTERS = ["All", "Video", "Podcast", "Interview", "Series"];

export default function CreativePage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const featuredItemIndex = creativeItems.findIndex(item => item.featured);
  const hasFeatured = featuredItemIndex !== -1;
  const featuredItem = hasFeatured ? creativeItems[featuredItemIndex] : null;
  
  const baseGridItems = hasFeatured 
    ? creativeItems.filter((_, idx) => idx !== featuredItemIndex)
    : creativeItems;

  const filteredItems = activeFilter === "All" 
    ? baseGridItems 
    : creativeItems.filter(item => item.type === activeFilter);

  return (
    <main className="pt-32 pb-32 relative bg-surface-container-lowest min-h-[100svh] overflow-hidden">
      {/* Background Grid Pattern from Vision */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-lg opacity-50 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_100%)]"
      />

      <Section className="!py-0 relative z-10">
        <Container>
          {/* Compact Header Layout */}
          <div className="flex flex-col gap-6 mb-12 pt-8">
            <Reveal>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-[2px] w-8 bg-accent" />
                  <span className="font-label-mono text-[10px] text-accent uppercase tracking-[0.2em]">
                    The Latest
                  </span>
                </div>

                <h1 className="font-display text-[40px] md:text-[56px] lg:text-[64px] leading-[1] text-bone tracking-tight">
                  Explore our most recent <span className="font-serif italic text-accent font-light">digital media.</span>
                </h1>
              </div>
            </Reveal>
          </div>

          {/* Minimalist Filter Bar */}
          <Reveal delay={0.3}>
            <div className="flex flex-wrap items-center gap-4 mb-16 border-b border-stroke/30 pb-6">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative px-1 pb-2 text-[12px] font-label-mono uppercase tracking-[0.1em] transition-colors duration-300 ${
                    activeFilter === filter 
                      ? "text-accent" 
                      : "text-bone-mute hover:text-bone"
                  }`}
                >
                  <span className="relative z-10">{filter}</span>
                  {activeFilter === filter && (
                    <motion.div
                      layoutId="active-filter-border"
                      className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-accent z-20"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="flex flex-col gap-16 md:gap-24">
            {/* Featured Brutalist Hero */}
            <AnimatePresence mode="popLayout">
              {featuredItem && activeFilter === "All" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full origin-top"
                >
                  <FeaturedCreativeCard {...featuredItem} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Brutalist Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CreativeCard {...item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            {/* Empty State */}
            {filteredItems.length === 0 && activeFilter !== "All" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 text-center border border-dashed border-stroke rounded-[24px]"
              >
                <p className="text-bone-mute font-body-md">
                  No {activeFilter.toLowerCase()}s found matching this criteria.
                </p>
              </motion.div>
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}
