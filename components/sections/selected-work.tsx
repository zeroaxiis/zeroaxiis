import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { projects as fallbackProjects } from "@/lib/data";
import { ProjectsCarousel } from "@/components/sections/projects-carousel";

interface SelectedWorkProps {
  fetchedProjects?: {
    title: string;
    description: string;
    image: string;
    link: string;
    tags: string[];
    year: string;
    slug: string;
  }[];
}

export function SelectedWork({ fetchedProjects }: SelectedWorkProps = {}) {
  // Use fetched data if available, otherwise fallback to local mock data
  const displayProjects = Array.isArray(fetchedProjects) ? fetchedProjects : fallbackProjects;

  return (
    <Section id="projects" className="!py-0 mb-32 relative">
      <Reveal className="flex items-end justify-between mb-16 gap-8 flex-wrap pb-6 border-b border-stroke">
        <h2 className="font-display text-[clamp(32px,4vw,56px)] tracking-[-0.025em] text-bone">
          Selected work
        </h2>
        <span className="font-label-mono text-[10px] text-bone-mute uppercase tracking-[0.22em]">
          01 · {String(displayProjects.length).padStart(2, "0")} entries
        </span>
      </Reveal>

      <ProjectsCarousel projects={displayProjects} />
    </Section>
  );
}
