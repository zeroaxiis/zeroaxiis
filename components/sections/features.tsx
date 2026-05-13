import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { services } from "@/lib/data/services";

export function Features() {
  return (
    <Section id="services" className="relative bg-surface-container-lowest">
      <Container>
        <div className="mb-16">
          <h2 className="font-label-mono text-label-mono text-secondary uppercase tracking-widest mb-4">
            Core Competencies
          </h2>
          <h3 className="font-headline-lg text-headline-lg text-primary">
            Services
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-surface-container border border-outline-variant/30 rounded-lg p-8 glow-top hover:bg-surface-layer-raised hover:border-outline-variant transition-all duration-300 flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded bg-surface border border-outline-variant/50 flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors">
                <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors">
                  {service.icon}
                </span>
              </div>
              <h4 className="font-body-md font-bold text-primary mb-3">
                {service.title}
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-auto">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
