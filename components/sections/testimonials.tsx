"use client";

import { useRef } from "react";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { testimonials } from "@/lib/data/testimonials";

function ArrowLeft() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M19 12H5M12 19l-7-7 7-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h14M12 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Testimonials() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "prev" | "next") => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const gap = 24;
    const amount = (card?.offsetWidth ?? 340) + gap;
    el.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <Section id="testimonials" className="border-t border-outline-variant/20">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="font-label-mono text-label-mono text-secondary uppercase tracking-widest mb-4">
              Success Stories
            </p>
            <h2 className="font-headline-lg text-headline-lg text-primary">
              What Our{" "}
              <span className="text-on-surface-variant font-normal">
                Clients Say
              </span>
            </h2>
          </div>

          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => scroll("prev")}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary transition-colors duration-200 flex items-center justify-center"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={() => scroll("next")}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary transition-colors duration-200 flex items-center justify-center"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </Container>

      {/* Carousel */}
      <div className="max-w-container-max mx-auto px-gutter">
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              data-card
              className="glass-panel rounded-lg p-8 min-w-[320px] max-w-[360px] shrink-0 flex flex-col glow-hover transition-all duration-300 group"
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-6">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                  unoptimized
                />
                <span className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant border border-outline-variant/50 rounded-full px-3 py-1.5 group-hover:border-primary/50 transition-colors duration-200">
                  {t.tag}
                </span>
              </div>

              {/* Quote */}
              <p className="font-display text-4xl font-bold text-primary leading-none mb-3 select-none">
                &ldquo;
              </p>
              <p className="font-body-md text-body-md text-on-surface leading-relaxed mb-8 grow">
                {t.quote}
              </p>

              {/* Divider */}
              <div className="border-t border-outline-variant/30 mb-5" />

              {/* Author */}
              <div>
                <p className="font-body-sm font-semibold text-primary mb-1">
                  {t.name}
                </p>
                <p className="font-body-sm text-[13px] text-on-surface-variant leading-snug">
                  {t.title}
                  <br />
                  {t.company} &mdash; {t.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
