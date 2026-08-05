"use client";

import { motion } from "motion/react";
import { BlogCard } from "@/components/cards/blog-card";
import type { BlogItem } from "@/types";

interface BlogGalleryProps {
  items: BlogItem[];
}

export function BlogGallery({ items }: BlogGalleryProps) {
  return (
    <div className="flex flex-col gap-16 md:gap-24 min-h-[600px]">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
      >
        {items.map((item, index) => (
          <BlogCard 
            key={item.id} 
            {...item} 
            priority={index < 3} 
          />
        ))}
      </motion.div>
    </div>
  );
}
