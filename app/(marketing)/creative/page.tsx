import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { CreativeGallery } from "@/components/sections/creative-gallery";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { EmptyState } from "@/components/ui/empty-state";
import { API_BASE_URL } from "@/lib/config";
import type { CreativeItem } from "@/types";

export const metadata = {
  title: "Creative Media | ZeroAxiis",
  description: "Explore our most recent digital media. From founder conversations and in-depth tutorials to architectural deep dives.",
};

async function fetchCreative(): Promise<CreativeItem[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/creative`, { cache: 'no-store' });
    if (!res.ok) throw new Error("API not ready");
    const data = await res.json();
    return data.data && data.data.length > 0 ? data.data : null;
  } catch {
    return null;
  }
}

export default async function CreativePage() {
  const creativeItems = await fetchCreative();

  if (!creativeItems) {
    return (
      <main className="relative flex flex-col justify-center bg-surface-container-lowest min-h-[clamp(600px,100svh,1080px)] overflow-hidden">
        <BackgroundGrid maskImage="linear-gradient(to bottom, transparent, black 15%, black 100%)" opacity={50} />
        <Container className="relative z-10">
          <EmptyState title="nothing here!" message="The creative media signal is currently lost in the void." />
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
