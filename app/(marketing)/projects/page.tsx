import { Container, Section } from "@/components/layout";
import { ProjectsHero, SelectedWork, OpenSource } from "@/components/sections";
import { UnderConstruction } from "@/components/ui/under-construction";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { projects as fallbackProjects } from "@/lib/data";

export const metadata = {
  title: "Projects – Client Work | Zeroaxiis",
  description:
    "A collection of digital products and experiences crafted for ambitious teams and brands.",
};

async function fetchProjects() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/v1/zeroaxiis/project`, { cache: 'no-store' });
    if (!res.ok) throw new Error("API not ready");
    const data = await res.json();
    return data && data.length > 0 ? data : null;
  } catch (error) {
    return null;
  }
}

export default async function ProjectsPage() {
  const fetchedProjects = await fetchProjects();

  if (!fetchedProjects) {
    return (
      <main className="relative flex flex-col justify-center bg-surface-container-lowest min-h-[clamp(600px,100svh,1080px)] overflow-hidden">
        <BackgroundGrid maskImage="linear-gradient(to bottom, transparent, black 15%, black 100%)" opacity={50} />
        <Container className="relative z-10">
          <UnderConstruction moduleName="Projects Portfolio" />
        </Container>
      </main>
    );
  }

  // If data fetch succeeds, we render the full page as intended
  return (
    <main className="pb-32 relative bg-surface-container-lowest min-h-[clamp(600px,100svh,1080px)] overflow-hidden">
      {/* Background Grid Pattern from Vision */}
      <BackgroundGrid maskImage="linear-gradient(to bottom, transparent, black 15%, black 100%)" opacity={50} />

      <ProjectsHero />

      <Section className="!py-0 relative z-10 mt-16">
        <Container>
          <SelectedWork fetchedProjects={fetchedProjects} />
          <OpenSource />
        </Container>
      </Section>
    </main>
  );
}
