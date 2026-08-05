import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Features } from "@/components/sections/features";
import { Testimonials } from "@/components/sections/testimonials";
import { ExecutionProtocol } from "@/components/sections/execution-protocol";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { API_BASE_URL } from "@/lib/config";
import type { Testimonial } from "@/lib/data/testimonials";

async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/testimonial`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const testimonials = await fetchTestimonials();

  return (
    <>
      <Hero />
      <About />
      <div className="relative bg-surface-container-lowest overflow-hidden">
        <BackgroundGrid maskImage="linear-gradient(to bottom, black 0%, black 90%, transparent 100%)" />
        <Features />
        <ExecutionProtocol />
        {testimonials.length > 0 && <Testimonials items={testimonials} />}
      </div>
    </>
  );
}
