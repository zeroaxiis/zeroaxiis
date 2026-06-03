"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { CreativeCard, FeaturedCreativeCard } from "@/components/cards";
import { Reveal } from "@/components/ui/reveal";
import type { CreativeItem } from "@/types";

interface CreativeGalleryProps {
  items: CreativeItem[];
}

const FILTERS = ["All", "Video", "Podcast", "Interview", "Series"];

export function CreativeGallery({ items }: CreativeGalleryProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const { featuredItem, baseGridItems } = useMemo(() => {
    const featuredItemIndex = items.findIndex((item) => item.featured);
    const hasFeatured = featuredItemIndex !== -1;
    const featured = hasFeatured ? items[featuredItemIndex] : null;
    
    const baseGrid = hasFeatured 
      ? items.filter((_, idx) => idx !== featuredItemIndex)
      : items;

    return { featuredItem: featured, baseGridItems: baseGrid };
  }, [items]);

  const filteredItems = useMemo(() => {
    return activeFilter === "All" 
      ? baseGridItems 
      : items.filter((item) => item.type === activeFilter);
  }, [activeFilter, baseGridItems, items]);

  return (
    <>
      {/* Minimalist Filter Bar */}
      <Reveal delay={0.3}>
        <div className="flex flex-wrap items-center gap-3 mb-16">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "relative px-5 md:px-6 py-2 md:py-2.5 text-[10px] md:text-[11px] font-label-mono uppercase tracking-[0.15em] transition-all duration-300 rounded-none border",
                  isActive
                    ? "bg-accent text-black border-accent font-bold shadow-[0_0_15px_rgba(200,255,0,0.2)]"
                    : "bg-transparent text-bone-mute border-stroke hover:text-bone hover:border-bone-mute hover:bg-[#1a1a1a]"
                )}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="flex flex-col gap-16 md:gap-24 min-h-[600px]">
        {/* Featured Brutalist Hero */}
        <AnimatePresence mode="wait">
          {featuredItem && activeFilter === "All" && (
            <motion.div
              key="featured"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <FeaturedCreativeCard {...featuredItem} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Area - Fades as a single block based on activeFilter */}
        <AnimatePresence mode="wait">
          {filteredItems.length > 0 ? (
            <motion.div 
              key={`grid-${activeFilter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
            >
              {filteredItems.map((item, index) => (
                <CreativeCard 
                  key={item.id} 
                  {...item} 
                  priority={index < 3 && activeFilter === "All"} 
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key={`empty-${activeFilter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="py-24 text-center border border-dashed border-stroke rounded-[24px]"
            >
              <p className="text-bone-mute font-body-md">
                No {activeFilter} items found matching these criteria.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
