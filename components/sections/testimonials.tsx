"use client";

import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
import { motion, useMotionValue, useAnimationFrame, animate, useMotionValueEvent } from "motion/react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { testimonials } from "@/lib/data/testimonials";
import { Reveal } from "@/components/ui/reveal";
import { CircleButton } from "@/components/ui/circle-button";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";

// We need enough duplicates to fill the screen while scrolling continuously
const extendedTestimonials = [
  ...testimonials,
  ...testimonials,
  ...testimonials,
  ...testimonials,
];

export function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [itemWidth, setItemWidth] = useState(452); // fallback
  
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Measure card width dynamically on mount/resize
  useEffect(() => {
    const measure = () => {
      const card = containerRef.current?.querySelector<HTMLElement>("[data-card]");
      if (card) {
        setItemWidth(card.offsetWidth + 32); // 32px is the gap
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Fluid continuous GPU-accelerated marquee
  useAnimationFrame((time, delta) => {
    if (isHovered || isScrolling || !itemWidth) return;

    // Move left continuously at ~60px per second
    const moveBy = -60 * (delta / 1000);
    let newX = x.get() + moveBy;

    const totalWidth = itemWidth * testimonials.length;

    // Wrap around seamlessly
    if (newX <= -totalWidth) {
      newX += totalWidth;
    } else if (newX > 0) {
      newX -= totalWidth;
    }
    
    x.set(newX);
  });

  // Track active index
  useMotionValueEvent(x, "change", (latestX) => {
    if (!itemWidth) return;
    const totalWidth = itemWidth * testimonials.length;
    let normalizedX = latestX % totalWidth;
    if (normalizedX > 0) normalizedX -= totalWidth;
    
    let computedIdx = Math.round(Math.abs(normalizedX) / itemWidth);
    if (computedIdx >= testimonials.length) computedIdx = 0;
    
    if (computedIdx !== activeIdx) {
      setActiveIdx(computedIdx);
    }
  });

  // Fluid spring animation for manual controls
  const scrollBtn = (direction: "prev" | "next") => {
    if (isScrolling || !itemWidth) return;
    setIsScrolling(true);

    const currentX = x.get();
    const targetX = direction === "next" ? currentX - itemWidth : currentX + itemWidth;
    const totalWidth = itemWidth * testimonials.length;

    animate(x, targetX, {
      type: "spring",
      stiffness: 150,
      damping: 25,
      onComplete: () => {
        const finalX = x.get();
        if (finalX <= -totalWidth) {
          x.set(finalX + totalWidth);
        } else if (finalX > 0) {
          x.set(finalX - totalWidth);
        }
        setIsScrolling(false);
      }
    });
  };

  return (
    <Section
      id="testimonials"
      className="relative overflow-hidden"
    >
      <Container>
        <Reveal className="mb-20 flex flex-col sm:flex-row sm:items-end justify-between gap-10">
          <div className="max-w-none md:max-w-4xl">
            <div className="flex items-center gap-6 mb-5">
              <span className="font-label-mono text-[10px] md:text-[11px] text-accent uppercase tracking-[0.4em]">
                In Their Words
              </span>
            </div>
            <h2 className="font-display text-[clamp(40px,6vw,80px)] leading-[0.95] text-bone tracking-[-0.03em]">
              What our <span className="font-serif italic text-accent font-light">clients</span> say
            </h2>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <span className="font-label-mono text-[10px] text-bone-mute uppercase tracking-[0.22em]">
              {String(activeIdx + 1).padStart(2, "0")}{" "}
              <span className="opacity-50">/ {String(testimonials.length).padStart(2, "0")}</span>
            </span>
            <div className="flex gap-3">
              <CircleButton onClick={() => scrollBtn("prev")} aria-label="Previous testimonial">
                <ArrowLeftIcon width={18} height={18} strokeWidth={1.4} />
              </CircleButton>
              <CircleButton onClick={() => scrollBtn("next")} aria-label="Next testimonial">
                <ArrowRightIcon width={18} height={18} strokeWidth={1.4} />
              </CircleButton>
            </div>
          </div>
        </Reveal>
      </Container>

      <Container
        className="!px-0 sm:!px-[clamp(0.75rem,3vw,2rem)]"
      >
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="overflow-hidden"
        >
          <motion.div
            ref={containerRef}
            style={{ x }}
            className="flex gap-8 pb-6 cursor-grab active:cursor-grabbing w-max"
          >
            {extendedTestimonials.map((t, i) => (
              <article
                key={`${t.name}-${i}`}
                data-card
                className="shrink-0 w-[88vw] sm:w-[420px] flex flex-col p-6 sm:p-8 border border-stroke bg-[#040404] hover:bg-[#0a0a0a] transition-colors duration-300 rounded-[20px] overflow-hidden"
              >
                {/* Header */}
                <div className="flex flex-col justify-center mb-6">
                  <div className="flex items-center gap-1.5">
                    <span className="font-body-md font-bold text-[16px] text-bone">{t.name}</span>
                  </div>
                  <span className="font-body-sm text-[14px] text-bone-mute">
                    {t.title} <span className="text-accent mx-1">·</span> {t.company}
                  </span>
                </div>

                <p className="font-body-md text-[16px] sm:text-[18px] leading-[1.6] text-bone-dim tracking-wide grow">
                  {t.quote}
                </p>
              </article>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
