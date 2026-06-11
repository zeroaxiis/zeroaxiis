import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Features } from "@/components/sections/features";
import { Testimonials } from "@/components/sections/testimonials";
import { ExecutionProtocol } from "@/components/sections/execution-protocol";
import { BackgroundGrid } from "@/components/ui/background-grid";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <div className="relative bg-surface-container-lowest overflow-hidden">
        <BackgroundGrid maskImage="linear-gradient(to bottom, black 0%, black 90%, transparent 100%)" />
        <Features />
        <ExecutionProtocol />
        <Testimonials />
      </div>
    </>
  );
}
