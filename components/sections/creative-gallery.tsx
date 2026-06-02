"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
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
        <div className="flex flex-wrap items-center gap-4 mb-16 border-b border-stroke/30 pb-6">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={activeFilter === filter}
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
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <CreativeCard {...item} priority={index < 3 && activeFilter === "All"} />
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
              No {activeFilter} items found matching this criteria.
            </p>
          </motion.div>
        )}
      </div>
    </>
  );
}
