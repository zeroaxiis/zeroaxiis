import { Hero } from "@/components/sections/hero";
import { Vision } from "@/components/sections/vision";
import { Features } from "@/components/sections/features";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Vision />
      <Features />
      <Testimonials />
      <CTA />
    </>
  );
}
