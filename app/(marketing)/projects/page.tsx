import { Container, Section } from "@/components/layout";
import { OpenSourceCard } from "@/components/cards";
import { Reveal } from "@/components/ui/reveal";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { projects, openSourceTools } from "@/lib/data";

export const metadata = {
  title: "Projects & Open Source",
};

export default function ProjectsPage() {
  return (
    <main className="pt-32 pb-32 relative bg-surface-container-lowest min-h-[100svh] overflow-hidden">
      {/* Background Grid Pattern from Vision */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-lg opacity-50 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_100%)]"
      />

      <Section className="!py-0 relative z-10">
        <Container>
          {/* Compact Header Layout */}
          <div className="flex flex-col gap-6 mb-12 pt-8">
            <Reveal>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-label-mono text-[10px] text-accent uppercase tracking-[0.2em]">
                    Selected Work
                  </span>
                </div>

                <h1 className="font-display text-[40px] md:text-[56px] lg:text-[64px] leading-[1] text-bone tracking-tight">
                  Engineered <span className="font-serif italic text-accent font-light">artefacts</span> that stand still.
                </h1>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-body-md text-body-md text-bone-mute max-w-2xl leading-relaxed">
                A curated selection of technical systems and open-source tooling
                shipped by the collective. Built for scale, precision, and
                longevity — not the news cycle.
              </p>
            </Reveal>
          </div>

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
