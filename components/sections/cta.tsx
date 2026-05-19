import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { workflowSteps } from "@/lib/data/workflow";

export function CTA() {
  return (
    <Section id="workflow" className="border-t border-outline-variant/20">
      <Container>
        <div className="mb-20 text-center">
          <h2 className="font-label-mono text-label-mono text-secondary uppercase tracking-widest mb-4">
            The Methodology
          </h2>
          <h3 className="font-headline-lg text-headline-lg text-primary">
            Workflow
          </h3>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-outline-variant to-transparent z-0" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            {workflowSteps.map((step) => (
              <div
                key={step.number}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-6 ${
                    step.highlight
                      ? "border border-primary/50 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                      : "border border-outline-variant shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                  }`}
                >
                  <span className="font-label-mono text-label-mono text-primary">
                    {step.number}
                  </span>
                </div>
                <h4 className="font-body-md font-bold text-primary mb-2">
                  {step.title}
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
