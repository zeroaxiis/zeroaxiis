import { ReactNode } from "react";
import { Container, Section } from "@/components/layout";
import { Reveal } from "@/components/ui/reveal";

export function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <main className="pt-32 pb-32 relative bg-surface-container-lowest min-h-[100svh] overflow-hidden">
      {/* Background Grid Pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-lg opacity-50 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_100%)]"
      />
      <Section className="!py-0 relative z-10">
        <Container>{children}</Container>
      </Section>
    </main>
  );
}

export function LegalHeader({
  title,
  highlight,
  date,
}: {
  title: string;
  highlight?: string;
  date: string;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-6 mb-16 pt-8">
      <Reveal>
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="font-label-mono text-[10px] text-accent uppercase tracking-[0.2em]">
              Legal
            </span>
          </div>
          <h1 className="font-display text-[40px] md:text-[56px] lg:text-[64px] leading-[1] text-bone tracking-tight">
            {title}
            {highlight && (
              <>
                {" "}
                <span className="font-serif italic text-accent font-light">
                  {highlight}
                </span>
              </>
            )}
          </h1>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="font-body-md text-body-md text-bone-mute max-w-2xl leading-relaxed mx-auto">
          Last updated: {date}
        </p>
      </Reveal>
    </div>
  );
}

export function LegalContent({ children }: { children: ReactNode }) {
  return (
    <Section className="!py-0 relative">
      <div className="text-bone-mute space-y-6 max-w-3xl mx-auto font-body-md text-justify">
        {children}
      </div>
    </Section>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Reveal className="mt-12" amount={0.1}>
      <h2 className="text-2xl text-bone font-display tracking-tight mb-6">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </Reveal>
  );
}

export function LegalParagraph({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={className}>{children}</p>;
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-none space-y-3">
      {items.map((item, index) => (
        <li key={index}>
          <span className="text-accent opacity-50 mr-2">•</span>
          {item}
        </li>
      ))}
    </ul>
  );
}
