import { Container, Section } from "@/components/layout";
import { OpenSourceCard } from "@/components/cards";
import { Reveal } from "@/components/ui/reveal";
import { projects, openSourceTools } from "@/lib/data";
import { ProjectsHero } from "@/components/sections/projects-hero";

import { ProjectsGrid } from "@/components/sections/projects-grid";

export const metadata = {
  title: "Projects – Client Work | Zeroaxiis",
  description:
    "A collection of digital products and experiences crafted for ambitious teams and brands.",
};

export default function ProjectsPage() {
  return (
    <main className="pb-32 relative bg-surface-container-lowest min-h-[100svh] overflow-hidden">
      {/* Background Grid Pattern from Vision */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-lg opacity-50 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_100%)]"
      />

      <ProjectsHero />

      <Section className="!py-0 relative z-10 mt-16">
        <Container>

          <Section id="projects" className="!py-0 mb-32 relative">
            <Reveal className="flex items-end justify-between mb-16 gap-8 flex-wrap pb-6 border-b border-stroke">
              <h2 className="font-display text-[clamp(32px,4vw,56px)] tracking-[-0.025em] text-bone">
                Commercial work
              </h2>
              <span className="font-label-mono text-[10px] text-bone-mute uppercase tracking-[0.22em]">
                01 · {String(projects.length).padStart(2, "0")} entries
              </span>
            </Reveal>

            <ProjectsGrid projects={projects} />
          </Section>

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
      </Section>
    </main>
  );
}
