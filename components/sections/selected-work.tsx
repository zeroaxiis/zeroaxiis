import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/lib/data";
import { ProjectsCarousel } from "@/components/sections/projects-carousel";

export function SelectedWork() {
  return (
    <Section id="projects" className="!py-0 mb-32 relative">
      <Reveal className="flex items-end justify-between mb-16 gap-8 flex-wrap pb-6 border-b border-stroke">
        <h2 className="font-display text-[clamp(32px,4vw,56px)] tracking-[-0.025em] text-bone">
          Selected work
        </h2>
        <span className="font-label-mono text-[10px] text-bone-mute uppercase tracking-[0.22em]">
          01 · {String(projects.length).padStart(2, "0")} entries
        </span>
      </Reveal>

      <ProjectsCarousel projects={projects} />
    </Section>
  );
}
