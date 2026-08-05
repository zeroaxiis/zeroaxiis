import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { ProjectGallery } from "@/components/sections/project-gallery";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { EmptyState } from "@/components/ui/empty-state";
import { API_BASE_URL } from "@/lib/config";
import type { ProjectItem } from "@/types";

export const metadata = {
  title: "Projects – Client Work | ZeroAxiis",
  description: "A collection of digital products and experiences crafted for ambitious teams and brands.",
};

async function fetchProjects(): Promise<ProjectItem[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/project`, { cache: 'no-store' });
    if (!res.ok) throw new Error("API not ready");
    const data = await res.json();
    return data.data && data.data.length > 0 ? data.data : null;
  } catch {
    return null;
  }
}

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  if (!projects) {
    return (
      <main className="relative flex flex-col justify-center bg-surface-container-lowest min-h-[clamp(600px,100svh,1080px)] overflow-hidden">
        <BackgroundGrid maskImage="linear-gradient(to bottom, transparent, black 15%, black 100%)" opacity={50} />
        <Container className="relative z-10">
          <EmptyState title="nothing here!" message="The projects database appears to be empty." />
        </Container>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-32 relative bg-surface-container-lowest min-h-[clamp(600px,100svh,1080px)] overflow-hidden">
      {/* Background Grid Pattern from Vision */}
      <BackgroundGrid />

      <Section className="!py-0 relative z-10">
        <Container>
          {/* Compact Header Layout */}
          <div className="flex flex-col gap-6 mb-12 pt-8">
            <Reveal>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-label-mono text-[10px] text-accent uppercase tracking-[0.2em]">
                    Our Work
                  </span>
                </div>

                <h1 className="font-display text-[40px] md:text-[56px] lg:text-[64px] leading-[1] text-bone tracking-tight">
                  A collection of <span className="font-serif italic text-accent font-light">digital products.</span>
                </h1>
              </div>
            </Reveal>
          </div>

          <ProjectGallery items={projects} />
        </Container>
      </Section>
    </main>
  );
}
