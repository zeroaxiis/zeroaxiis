import { Container, Section } from "@/components/layout";
import { ContactForm, ContactInfo } from "@/components/forms";
import { Reveal } from "@/components/ui/reveal";
import { teamMembers, contactItems } from "@/lib/data";
import { TeamRoster } from "@/components/sections/team-roster";
import { BackgroundGrid } from "@/components/ui/background-grid";

export const metadata = {
  title: "Team & Contact",
};

export default function TeamPage() {
  return (
    <Container className="relative min-h-screen overflow-x-hidden pt-40 pb-40">
      <BackgroundGrid maskImage="radial-gradient(ellipse at top, black 10%, transparent 60%)" opacity={30} />

      <Section className="!py-0 relative z-10">
        <div className="flex flex-col gap-6 mb-12 pt-8">
          <Reveal>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="font-label-mono text-[10px] text-accent uppercase tracking-[0.2em]">
                  Coordinates
                </span>
              </div>

              <h1 className="font-display text-[40px] md:text-[56px] lg:text-[64px] leading-[1] text-bone tracking-tight">
                Every point contributes to the <span className="font-serif italic text-accent font-light">trajectory.</span>
              </h1>
            </div>
          </Reveal>
        </div>
      </Section>

      <div className="w-full mb-40 relative z-10">
        <Reveal delay={0.1}>
          <TeamRoster members={teamMembers} />
        </Reveal>
      </div>

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
