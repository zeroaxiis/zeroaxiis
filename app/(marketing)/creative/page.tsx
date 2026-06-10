import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { CreativeGallery } from "@/components/sections/creative-gallery";
import { creativeItems } from "@/lib/data";

export const metadata = {
  title: "Creative Media | ZeroAxiis",
  description: "Explore our most recent digital media. From founder conversations and in-depth tutorials to architectural deep dives.",
};

export default function CreativePage() {
  return (
    <main className="pt-32 pb-32 relative bg-surface-container-lowest min-h-[clamp(600px,100svh,1080px)] overflow-hidden">
      {/* Background Grid Pattern from Vision */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-lg opacity-50 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_100%)]"
      />

      <Section className="!py-0 relative z-10">
        <Container>
          {/* Compact Header Layout */}
          <div className="flex flex-col gap-6 mb-12 pt-8">
            <Reveal>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-label-mono text-[10px] text-accent uppercase tracking-[0.2em]">
                    The Latest
                  </span>
                </div>

                <h1 className="font-display text-[40px] md:text-[56px] lg:text-[64px] leading-[1] text-bone tracking-tight">
                  Explore our most recent <span className="font-serif italic text-accent font-light">digital media.</span>
                </h1>
              </div>
            </Reveal>
          </div>

          <CreativeGallery items={creativeItems} />
        </Container>
      </Section>
    </main>
  );
}
