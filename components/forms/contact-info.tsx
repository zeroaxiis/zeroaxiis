import type { ContactItem } from "@/types";

interface ContactInfoProps {
  items: ContactItem[];
}

export function ContactInfo({ items }: ContactInfoProps) {
  return (
    <div>
      <p className="font-label-mono text-label-mono text-bone-mute uppercase tracking-[0.22em] mb-5 flex items-center gap-3">
        <span className="inline-block w-7 h-px bg-accent" />
        Coordinates
      </p>
      <h3 className="font-display text-[clamp(36px,5vw,64px)] text-bone leading-[0.95] tracking-[-0.025em] mb-10 text-balance">
        Send a signal —{" "}
        <span className="italic text-bone-dim">we&apos;ll listen.</span>
      </h3>
      <div className="space-y-8 pt-8 border-t border-stroke">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-baseline justify-between gap-6"
          >
            <p className="font-label-mono text-[10px] text-bone-mute uppercase tracking-[0.22em] shrink-0">
              {item.label}
            </p>
            <p className="font-body-md text-body-md text-bone text-right">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
