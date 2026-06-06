import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Features } from "@/components/sections/features";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <div className="relative bg-surface-container-lowest overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid-pattern-lg opacity-50 pointer-events-none [mask-image:linear-gradient(to_bottom,black_0%,black_90%,transparent_100%)]"
        />
        <Features />
        <CTA />
      </div>
      <Testimonials />
    </>
  );
}
