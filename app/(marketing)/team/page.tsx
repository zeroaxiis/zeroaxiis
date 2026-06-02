import { Container, Section } from "@/components/layout";
import { ContactForm, ContactInfo } from "@/components/forms";
import { Reveal } from "@/components/ui/reveal";
import { teamMembers, contactItems } from "@/lib/data";
import { TeamGrid } from "@/components/sections/team-grid";

export const metadata = {
  title: "Team & Contact",
};

export default function TeamPage() {
  return (
    <Container className="relative min-h-screen overflow-x-hidden pt-40 pb-40">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-lg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_60%)] pointer-events-none"
      />

      <Section className="!py-0 mb-32 relative">
        <Reveal>
          <p className="font-label-mono text-label-mono text-bone-mute uppercase tracking-[0.22em] mb-6 flex items-center gap-3">
            <span className="inline-block w-7 h-px bg-accent" />
            The Collective
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-[clamp(56px,9vw,140px)] leading-[0.92] text-bone tracking-[-0.04em] mb-10 text-balance">
            Small team.{" "}
            <span className="italic text-bone-dim">High frequency.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="font-body-md text-body-md text-bone-mute max-w-2xl leading-relaxed">
            Specialists engineering web infrastructure with precision and
            high-end craftsmanship. We don&apos;t scale headcount — we scale
            the surface area each person can hold.
          </p>
        </Reveal>
      </Section>

      <Section className="!py-0 mb-40 relative">
        <TeamGrid members={teamMembers} />
      </Section>

      <Section className="!py-0 relative">
        <div className="pt-24 border-t border-stroke grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <Reveal>
            <ContactInfo items={contactItems} />
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>
    </Container>
  );
}
