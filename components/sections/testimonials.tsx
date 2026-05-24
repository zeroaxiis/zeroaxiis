"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { testimonials } from "@/lib/data/testimonials";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";

export function Testimonials() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const scroll = (direction: "prev" | "next") => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const gap = 32;
    const amount = (card?.offsetWidth ?? 420) + gap;
    el.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
    setActiveIdx((prev) => {
      if (direction === "next") return Math.min(prev + 1, testimonials.length - 1);
      return Math.max(prev - 1, 0);
    });
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
            <span className="font-label-mono text-[10px] text-bone-mute uppercase tracking-[0.22em]">
              {String(activeIdx + 1).padStart(2, "0")}{" "}
              <span className="opacity-50">/ {String(testimonials.length).padStart(2, "0")}</span>
            </span>
            <div className="flex gap-3">
              <Magnetic strength={0.4}>
                <button
                  onClick={() => scroll("prev")}
                  aria-label="Previous testimonial"
                  className="w-12 h-12 rounded-full border border-stroke text-bone-mute hover:text-accent hover:border-accent transition-all duration-300 flex items-center justify-center"
                >
                  <ArrowLeftIcon width={18} height={18} strokeWidth={1.4} />
                </button>
              </Magnetic>
              <Magnetic strength={0.4}>
                <button
                  onClick={() => scroll("next")}
                  aria-label="Next testimonial"
                  className="w-12 h-12 rounded-full border border-stroke text-bone-mute hover:text-accent hover:border-accent transition-all duration-300 flex items-center justify-center"
                >
                  <ArrowRightIcon width={18} height={18} strokeWidth={1.4} />
                </button>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </Container>

      <div className="max-w-container-max mx-auto px-gutter">
        <div
          ref={carouselRef}
          className="flex gap-8 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              data-card
              className="snap-start shrink-0 w-[88vw] sm:w-[440px] flex flex-col"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-label-mono text-[10px] text-bone-mute uppercase tracking-[0.22em]">
                  {String(i + 1).padStart(2, "0")} / {t.tag}
                </span>
                <span className="font-label-mono text-[10px] text-bone-mute uppercase tracking-[0.18em] border border-stroke rounded-full px-3 py-1.5">
                  {t.location}
                </span>
              </div>

              <p className="font-display text-[28px] sm:text-[34px] leading-[1.2] text-bone tracking-[-0.015em] mb-10 grow">
                <span className="text-accent mr-1">&ldquo;</span>
                {t.quote}
                <span className="text-accent ml-0.5">&rdquo;</span>
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-stroke">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={44}
                  height={44}
                  className="rounded-full object-cover grayscale"
                  unoptimized
                />
                <div>
                  <p className="font-body-sm text-body-sm font-medium text-bone">
                    {t.name}
                  </p>
                  <p className="font-label-mono text-[10px] text-bone-mute uppercase tracking-[0.16em] mt-1">
                    {t.title} · {t.company}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}
