import type { ContactItem } from "@/types";

interface ContactInfoProps {
  items: ContactItem[];
}

export function ContactInfo({ items }: ContactInfoProps) {
  return (
    <div>
      <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-8">
        Get in Touch
      </h3>
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.label}>
            <p className="font-label-mono text-label-mono text-secondary uppercase mb-2">
              {item.label}
            </p>
            <p className="font-body-md text-body-md text-primary">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
