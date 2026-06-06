"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { testimonials } from "@/lib/data/testimonials";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const extendedTestimonials = [
  ...testimonials,
  ...testimonials,
  ...testimonials,
];

export function Testimonials() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [focusedIdx, setFocusedIdx] = useState(testimonials.length);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Animation and interaction refs to maintain reference in requestAnimationFrame
  const isHoveredRef = useRef(false);
  const isTransitioningRef = useRef(false);
  const isUserInteractingRef = useRef(false);
  const lastInteractionTimeRef = useRef(0);
  const currentSpeedRef = useRef(0.65);
  const activeIdxRef = useRef(0);

  // Sync state to ref
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;

    const card = el.querySelector<HTMLElement>("[data-card]");
    if (!card) return;

    const gap = 32;
    const cardWidth = card.offsetWidth;
    const amount = cardWidth + gap;
    const scrollLeft = el.scrollLeft;
    const loopWidth = amount * testimonials.length;

    // Boundary snap points
    const minScroll = loopWidth;
    const maxScroll = loopWidth * 2;

    // Seamless boundary wrapping (only wrap when not actively animating via GSAP)
    if (!isTransitioningRef.current) {
      if (scrollLeft < minScroll - 10) {
        el.scrollLeft += loopWidth;
      } else if (scrollLeft >= maxScroll - 10) {
        el.scrollLeft -= loopWidth;
      }
    }

    // Identify card closest to container center
    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    let minDistance = Infinity;
    let closestIdx = testimonials.length;
    const containerCenter = el.scrollLeft + el.offsetWidth / 2;

    cards.forEach((c, index) => {
      const cardCenter = c.offsetLeft + c.offsetWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = index;
      }
    });

    const relativeIdx = closestIdx % testimonials.length;

    if (relativeIdx !== activeIdxRef.current) {
      activeIdxRef.current = relativeIdx;
      setActiveIdx(relativeIdx);
    }

    setFocusedIdx(closestIdx);
  };

  // Initialize scroll position in the center segment on mount / resize
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const initializeScroll = () => {
      const card = el.querySelector<HTMLElement>("[data-card]");
      const gap = 32;
      const cardWidth = card?.offsetWidth || 420;
      const amount = cardWidth + gap;
      el.scrollLeft = amount * testimonials.length;
      handleScroll();
    };

    initializeScroll();
    const timer = setTimeout(initializeScroll, 50);

    window.addEventListener("resize", initializeScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", initializeScroll);
    };
  }, []);

  // requestAnimationFrame continuous auto-scroll loop
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let rAF: number;

    const update = () => {
      const now = performance.now();
      const timeSinceInteraction = now - lastInteractionTimeRef.current;

      // Autoplay target speed (pixels per frame)
      let targetSpeed = 0.65;

      if (
        isHoveredRef.current ||
        isTransitioningRef.current ||
        isUserInteractingRef.current ||
        timeSinceInteraction < 4000
      ) {
        targetSpeed = 0;
      }

      // Lerp speed for smooth deceleration/acceleration
      currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * 0.08;

      if (currentSpeedRef.current > 0.01) {
        el.scrollLeft += currentSpeedRef.current;
        handleScroll();
      }

      rAF = requestAnimationFrame(update);
    };

    rAF = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rAF);
    };
  }, []);

  const handleInteractionStart = () => {
    isUserInteractingRef.current = true;
    lastInteractionTimeRef.current = performance.now();
  };

  const handleInteractionEnd = () => {
    isUserInteractingRef.current = false;
    lastInteractionTimeRef.current = performance.now();
  };

  // Snapping using GSAP
  const scrollGSAP = (direction: "prev" | "next") => {
    const el = carouselRef.current;
    if (!el || isTransitioningRef.current) return;

    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    if (cards.length === 0) return;

    const gap = 32;
    const card = cards[0];
    const amount = card.offsetWidth + gap;
    const loopWidth = amount * testimonials.length;

    // Reset interaction timestamp
    lastInteractionTimeRef.current = performance.now();

    // Find the current scroll target index
    let targetIdx = focusedIdx + (direction === "next" ? 1 : -1);

    // Silent seamless wrap before beginning the GSAP transition
    if (targetIdx < testimonials.length) {
      el.scrollLeft += loopWidth;
      targetIdx += testimonials.length;
    } else if (targetIdx >= testimonials.length * 2) {
      el.scrollLeft -= loopWidth;
      targetIdx -= testimonials.length;
    }

    const targetCard = cards[targetIdx];
    if (!targetCard) return;

    isTransitioningRef.current = true;

    gsap.to(el, {
      scrollLeft: targetCard.offsetLeft,
      duration: 0.85,
      ease: "power3.out",
      overwrite: "auto",
      onUpdate: () => {
        handleScroll();
      },
      onComplete: () => {
        isTransitioningRef.current = false;
        handleScroll();
      },
    });
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeaveCard = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredCardIdx(null);
    const card = e.currentTarget;
    card.style.setProperty("--mouse-x", "50%");
    card.style.setProperty("--mouse-y", "0px");
  };

  return (
    <Section
      id="testimonials"
      className="border-t border-stroke bg-surface-container-lowest relative overflow-hidden"
    >
      <Container>
        <Reveal className="mb-20 flex flex-col sm:flex-row sm:items-end justify-between gap-10">
          <div className="max-w-3xl">
            <p className="font-label-mono text-label-mono text-bone-mute uppercase tracking-[0.22em] mb-5 flex items-center gap-3">
              <span className="inline-block w-7 h-px bg-accent" />
              In Their Words / 03
            </p>
            <h2 className="font-display text-[clamp(40px,6vw,80px)] leading-[0.95] text-bone tracking-[-0.03em] text-balance">
              Quiet partners.{" "}
              <span className="italic text-bone-dim">Loud results.</span>
            </h2>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            {/* Premium Progress Bar Indicator */}
            <div className="flex items-center gap-4">
              <span className="font-label-mono text-[10px] text-bone-mute uppercase tracking-[0.22em]">
                {String(activeIdx + 1).padStart(2, "0")}
              </span>
              <div className="relative w-16 h-[2px] bg-stroke overflow-hidden rounded-full">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-accent"
                  initial={{ width: "33.33%" }}
                  animate={{ width: `${((activeIdx + 1) / testimonials.length) * 100}%` }}
                  transition={{
                    type: "spring",
                    stiffness: 60,
                    damping: 15,
                    mass: 0.5,
                  }}
                />
              </div>
              <span className="font-label-mono text-[10px] text-bone-mute/50 uppercase tracking-[0.22em]">
                {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>

            <div className="flex gap-3">
              <Magnetic strength={0.25}>
                <button
                  onClick={() => scrollGSAP("prev")}
                  aria-label="Previous testimonial"
                  className="group w-12 h-12 rounded-[50%] border border-stroke hover:border-accent hover:shadow-[0_0_12px_var(--color-accent-glow)] transition-[border-color,box-shadow] duration-500 ease-[0.16,1,0.3,1] flex items-center justify-center cursor-pointer relative overflow-hidden bg-transparent"
                >
                  {/* Diagonal Sweep Background Overlay */}
                  <div className="absolute inset-y-0 -right-[15%] w-[130%] bg-accent translate-x-full skew-x-12 group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0" />
                  
                  {/* Arrow Icon */}
                  <div className="relative z-10 flex items-center justify-center">
                    <ArrowLeftIcon 
                      width={18} 
                      height={18} 
                      strokeWidth={1.4} 
                      className="transition-[transform,colors] duration-500 ease-[0.16,1,0.3,1] group-hover:-translate-x-[1.5px] text-bone-mute group-hover:text-ink"
                    />
                  </div>
                </button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <button
                  onClick={() => scrollGSAP("next")}
                  aria-label="Next testimonial"
                  className="group w-12 h-12 rounded-[50%] border border-stroke hover:border-accent hover:shadow-[0_0_12px_var(--color-accent-glow)] transition-[border-color,box-shadow] duration-500 ease-[0.16,1,0.3,1] flex items-center justify-center cursor-pointer relative overflow-hidden bg-transparent"
                >
                  {/* Diagonal Sweep Background Overlay */}
                  <div className="absolute inset-y-0 -left-[15%] w-[130%] bg-accent -translate-x-full skew-x-12 group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0" />
                  
                  {/* Arrow Icon */}
                  <div className="relative z-10 flex items-center justify-center">
                    <ArrowRightIcon 
                      width={18} 
                      height={18} 
                      strokeWidth={1.4} 
                      className="transition-[transform,colors] duration-500 ease-[0.16,1,0.3,1] group-hover:translate-x-[1.5px] text-bone-mute group-hover:text-ink"
                    />
                  </div>
                </button>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </Container>

      <Container className="!px-0 sm:!px-[clamp(0.75rem,3vw,2rem)]">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleInteractionStart}
          onTouchEnd={handleInteractionEnd}
          onMouseDown={handleInteractionStart}
          onMouseUp={handleInteractionEnd}
          className="relative"
        >
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-8 overflow-x-auto pb-6 scrollbar-none cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: "none" }}
          >
            {extendedTestimonials.map((t, i) => {
              const isActive = i === focusedIdx;
              const isHoveringAnyCard = hoveredCardIdx !== null;
              const isCardHighlighted = isHoveringAnyCard
                ? i === hoveredCardIdx
                : isActive;
              return (
                <motion.article
                  key={`${t.name}-${i}`}
                  data-card
                  className="shrink-0 w-[88vw] sm:w-[440px] flex flex-col p-8 border border-stroke rounded-none relative overflow-hidden will-change-transform cursor-pointer bg-[#121110]/35"
                  onMouseEnter={() => setHoveredCardIdx(i)}
                  onMouseLeave={handleMouseLeaveCard}
                  onMouseMove={handleMouseMove}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  animate={{
                    opacity: isCardHighlighted ? 1 : 0.8,
                    borderColor: isCardHighlighted ? "rgba(200, 255, 0, 0.35)" : "var(--color-stroke)",
                    boxShadow: isCardHighlighted 
                      ? "inset 0 1.5px 0 0 rgba(200, 255, 0, 0.25)" 
                      : "inset 0 1px 0 0 rgba(245, 241, 232, 0.03)",
                  }}
                  transition={{
                    opacity: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                    borderColor: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                    boxShadow: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                  }}
                >
                  {/* Subtle card illumination spotlight overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 pointer-events-none transition-opacity duration-500 ease-[0.16,1,0.3,1] z-0",
                      isCardHighlighted ? "opacity-100" : "opacity-0"
                    )}
                    style={{
                      background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 0px), rgba(200, 255, 0, 0.05) 0%, transparent 100%)"
                    }}
                  />

                  <div className="relative z-10 flex items-center justify-between mb-10">
                    <span className={cn(
                      "font-label-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-500",
                      isCardHighlighted ? "text-accent" : "text-bone-mute"
                    )}>
                      {String((i % testimonials.length) + 1).padStart(2, "0")} / {t.tag}
                    </span>
                    <span className={cn(
                      "font-label-mono text-[10px] uppercase tracking-[0.18em] border rounded-full px-3 py-1.5 transition-all duration-500",
                      isCardHighlighted ? "border-accent/40 text-bone" : "border-stroke text-bone-mute"
                    )}>
                      {t.location}
                    </span>
                  </div>

                  <p className={cn(
                    "relative z-10 font-display text-[28px] sm:text-[34px] leading-[1.2] tracking-[-0.015em] mb-10 grow transition-colors duration-500",
                    isCardHighlighted ? "text-bone" : "text-bone-mute"
                  )}>
                    <span className="text-accent mr-1">&ldquo;</span>
                    {t.quote}
                    <span className="text-accent ml-0.5">&rdquo;</span>
                  </p>

                  <div className="relative z-10 flex items-center gap-4 pt-6 border-t border-stroke">
                    <div
                      className={cn(
                        "relative w-[44px] h-[44px] rounded-full overflow-hidden border transition-all duration-500 p-[2px] shrink-0",
                        isCardHighlighted ? "border-accent shadow-[0_0_8px_var(--color-accent-glow)] bg-accent/10" : "border-stroke/30 bg-transparent"
                      )}
                    >
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover grayscale w-full h-full"
                        unoptimized
                      />
                    </div>
                    <div>
                      <p className={cn(
                        "font-body-sm text-body-sm font-medium transition-colors duration-500",
                        isCardHighlighted ? "text-bone" : "text-bone-dim"
                      )}>
                        {t.name}
                      </p>
                      <p className={cn(
                        "font-label-mono text-[10px] uppercase tracking-[0.16em] mt-1 transition-colors duration-500",
                        isCardHighlighted ? "text-bone-dim" : "text-bone-mute"
                      )}>
                        {t.title} · {t.company}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}

