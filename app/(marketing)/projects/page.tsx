import { Container, Section } from "@/components/layout";
import { SectionHeader, GradientDivider } from "@/components/ui";
import { ProjectCard, OpenSourceCard } from "@/components/cards";
import { projects, openSourceTools } from "@/lib/data";

export const metadata = {
  title: "zeroaxiis - Projects & Open Source",
};

export default function ProjectsPage() {
  return (
    <main className="pt-30 pb-32">
      <Section className="mb-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-display text-display mb-6 text-primary">
              Engineered Systems.
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
              A curated selection of high-performance technical architectures
              and open-source tooling developed by our collective. Built for
              scale, precision, and longevity.
            </p>
          </div>
        </Container>
      </Section>

      <Container className="mb-20">
        <GradientDivider />
      </Container>

      <Section id="projects" className="mb-32">
        <Container>
          <SectionHeader
            title="Commercial Projects"
            label="01 // Selected Work"
            compact
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                {...project}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Container className="mb-32">
        <GradientDivider />
      </Container>

      <Section id="open-source" className="mb-20">
        <Container>
          <SectionHeader
            title="Open Source Tools"
            label="02 // Internal Libraries"
            compact
          />

          <div className="flex flex-col border border-stroke rounded-sm bg-canvas">
            {openSourceTools.map((tool) => (
              <OpenSourceCard key={tool.name} {...tool} />
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
