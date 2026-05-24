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
    <main className="pt-40 pb-40 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-lg opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_60%)]"
      />

      <Section className="!py-0 mb-32 relative">
        <Container>
          <Reveal>
            <p className="font-label-mono text-label-mono text-bone-mute uppercase tracking-[0.22em] mb-6 flex items-center gap-3">
              <span className="inline-block w-7 h-px bg-accent" />
              Index / Selected Work
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-[clamp(56px,9vw,140px)] leading-[0.92] text-bone tracking-[-0.04em] mb-10 text-balance">
              Engineered{" "}
              <span className="italic text-bone-dim">artefacts</span>
              <br />
              that stand still.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-body-md text-body-md text-bone-mute max-w-2xl leading-relaxed">
              A curated selection of technical systems and open-source tooling
              shipped by the collective. Built for scale, precision, and
              longevity — not the news cycle.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section id="projects" className="!py-0 mb-40 relative">
        <Container>
          <Reveal className="flex items-end justify-between mb-16 gap-8 flex-wrap pb-6 border-b border-stroke">
            <h2 className="font-display text-[clamp(32px,4vw,56px)] tracking-[-0.025em] text-bone">
              Commercial work
            </h2>
            <span className="font-label-mono text-[10px] text-bone-mute uppercase tracking-[0.22em]">
              01 · {String(projects.length).padStart(2, "0")} entries
            </span>
          </Reveal>

          <ProjectsGrid projects={projects} />
        </Container>
      </Section>

      <Section id="open-source" className="!py-0 relative">
        <Container>
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
        </Container>
      </Section>
    </main>
  );
}
