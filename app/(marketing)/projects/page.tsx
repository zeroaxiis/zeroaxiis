import { Container, Section } from "@/components/layout";
import { ProjectsHero, SelectedWork, OpenSource } from "@/components/sections";

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
          <SelectedWork />
          <OpenSource />
        </Container>
      </Section>
    </main>
  );
}
