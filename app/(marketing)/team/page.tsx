import { Container, Section } from "@/components/layout";
import { SectionHeader } from "@/components/ui";
import { TeamMemberCard } from "@/components/cards";
import { ContactForm, ContactInfo } from "@/components/forms";
import { teamMembers, contactItems } from "@/lib/data";

export const metadata = {
  title: "Team & Contact - zeroaxiis",
};

export default function TeamPage() {
  return (
    <main className="grow pt-26 pb-32">
      <Section>
        <Container>
          <SectionHeader
            title="The Team"
            description="A collective of specialists engineering the future of web infrastructure. We prioritize precision, high-end craftsmanship, and technical excellence."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
          </div>

          <div className="mb-32 gradient-divider" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <ContactInfo items={contactItems} />
            <ContactForm />
          </div>
        </Container>
      </Section>
    </main>
  );
}
