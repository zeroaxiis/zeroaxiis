import type { ContactItem } from "@/types";

interface ContactInfoProps {
  items: ContactItem[];
}

export function ContactInfo({ items }: ContactInfoProps) {
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <h3 className="font-display text-[clamp(36px,5vw,56px)] text-bone leading-[1.1] tracking-[-0.02em] mb-6">
          Establish <br/>
          <span className="text-bone-mute">Connection.</span>
        </h3>
        
        <p className="font-label-mono text-[11px] text-bone-mute uppercase tracking-[0.15em] leading-[1.8] mb-12 max-w-sm">
          Awaiting input. All transmissions are encrypted end-to-end. Response time depends on signal latency.
        </p>
      </div>

      <div className="flex flex-col border-t border-stroke mt-10 w-full">
        {items.map((item) => (
          <div
            key={item.label}
            className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-b border-stroke last:border-b-0 hover:border-accent/60 transition-colors duration-500 w-full"
          >
            <span className="font-label-mono text-[10px] text-bone-mute uppercase tracking-[0.22em] shrink-0 group-hover:text-accent transition-colors duration-300">
              {item.label}
            </span>
            <span className="font-display text-[clamp(20px,2vw,28px)] text-bone tracking-[-0.015em] leading-none transition-[transform,color] duration-500 group-hover:text-accent md:group-hover:-translate-x-2 text-left md:text-right">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
