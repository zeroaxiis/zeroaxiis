import { Container, Section } from "@/components/layout";
import { OpenSourceCard } from "@/components/cards";
import { Reveal } from "@/components/ui/reveal";
import { projects, openSourceTools } from "@/lib/data";
import { ProjectsHero } from "@/components/sections/projects-hero";

import { ProjectsCarousel } from "@/components/sections/projects-carousel";

export const metadata = {
  title: "Projects – Client Work | Zeroaxiis",
  description:
    "A collection of digital products and experiences crafted for ambitious teams and brands.",
};

export default function ProjectsPage() {
  return (
    <>
      {/* ── Hero: "Work that creates impact." + orbit diagram ── */}
      <ProjectsHero />

      {/* ── Projects grid with filter tabs ── */}
      <Container className="relative py-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid-pattern-lg opacity-20 [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_70%)] pointer-events-none"
        />
        <ProjectsCarousel projects={projects} />
      </Container>

      {/* ── Open source section (untouched) ── */}
      <Container className="relative pt-24 pb-40">
        <Section id="open-source" className="!py-0 relative">
          <Reveal className="flex items-end justify-between mb-16 gap-8 flex-wrap pb-6 border-b border-stroke">
            <h2 className="font-display text-[clamp(32px,4vw,56px)] tracking-[-0.025em] text-bone">
              Open source
            </h2>
            <span className="font-label-mono text-[10px] text-bone-mute uppercase tracking-[0.22em]">
              02 · {String(openSourceTools.length).padStart(2, "0")} repos
            </span>
          </Reveal>

          <div className="flex flex-col border border-stroke bg-surface-container-lowest">
            {openSourceTools.map((tool) => (
              <OpenSourceCard key={tool.name} {...tool} />
            ))}
          </div>
        </Section>
      </Container>
    </>
  );
}
