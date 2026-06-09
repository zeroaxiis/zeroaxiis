import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { OpenSourceCard } from "@/components/cards";
import { openSourceTools } from "@/lib/data";

export function OpenSource() {
  return (
    <Section id="open-source" className="!py-0 relative">
      <Reveal className="flex items-end justify-between mb-16 gap-8 flex-wrap pb-6 border-b border-stroke">
        <h2 className="font-display text-[clamp(32px,4vw,56px)] tracking-[-0.025em] text-bone">
          Open source
        </h2>
        <span className="font-label-mono text-[10px] text-bone-mute uppercase tracking-[0.22em]">
          02 · {String(openSourceTools.length).padStart(2, "0")} repos
        </span>
      </Reveal>

      <div className="flex flex-col border border-stroke bg-surface-container-lowest">
        {openSourceTools.map((tool) => (
          <OpenSourceCard key={tool.name} {...tool} />
        ))}
      </div>
    </Section>
  );
}
