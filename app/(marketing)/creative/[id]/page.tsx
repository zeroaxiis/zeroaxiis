import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { creativeItems } from "@/lib/data";

interface CreativeDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return creativeItems.map((item) => ({
    id: item.id,
  }));
}

export async function generateMetadata({ params }: CreativeDetailPageProps) {
  const resolvedParams = await params;
  const item = creativeItems.find((c) => c.id === resolvedParams.id);
  if (!item) {
    return {
      title: "Not Found | ZeroAxiis",
    };
  }
  return {
    title: `${item.title} | ZeroAxiis`,
    description: item.description,
  };
}

export default async function CreativeDetailPage({ params }: CreativeDetailPageProps) {
  const resolvedParams = await params;
  const item = creativeItems.find((c) => c.id === resolvedParams.id);

  if (!item) {
    notFound();
  }

  // Extract video ID from href. E.g. https://youtu.be/C842vFY5kRo -> C842vFY5kRo
  const videoId = item.href.split("/").pop()?.split("?")[0];

  return (
    <main className="pt-24 md:pt-28 pb-16 relative bg-surface-container-lowest min-h-[100svh] overflow-hidden">
      {/* Background Grid Pattern from Vision */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-lg opacity-50 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_100%)]"
      />
      
      <Section className="!py-0 relative z-10">
        <Container>
          {/* Back Button */}
          <div className="w-full mb-6">
            <Link 
              href="/creative" 
              className="inline-flex items-center gap-2 text-bone-mute hover:text-accent font-label-mono text-[12px] uppercase tracking-wider transition-colors"
            >
              <span aria-hidden="true">←</span>
              Back
            </Link>
          </div>

          {/* Video Player */}
          <div 
            className="mx-auto aspect-video bg-black mb-12 overflow-hidden rounded-none border border-stroke/50 shadow-2xl"
            style={{ width: "100%", maxWidth: "calc(82vh * 1.777)" }}
          >
            {videoId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-bone-mute">
                Video unavailable
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="bg-accent text-black px-3 py-1 font-label-mono text-[12px] uppercase tracking-wider font-bold">
                {item.type}
              </span>
              <span className="text-bone-mute font-label-mono text-[12px] uppercase tracking-wider">
                {item.publishDate}
              </span>
              {item.duration && (
                <span className="text-bone-mute font-label-mono text-[12px] uppercase tracking-wider border border-stroke px-2 py-0.5 rounded">
                  {item.duration}
                </span>
              )}
            </div>

            <h1 className="font-display text-[32px] md:text-[48px] leading-[1.1] text-bone tracking-tight">
              {item.title}
            </h1>

            <div className="flex items-center gap-3 text-bone-mute font-body text-sm mt-2">
              <span>By {item.author}</span>
            </div>

            <div className="h-px w-full bg-stroke my-4"></div>

            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-bone font-body leading-relaxed text-lg">
                {item.description}
              </p>
              
              {/* Placeholder for an extended article if needed */}
              <div className="mt-8 text-bone-mute font-body leading-relaxed space-y-4">
                <p>
                  This session delves deeply into the core principles of building robust and scalable systems. We cover practical patterns that teams can adopt immediately to improve their software architecture and developer experience.
                </p>
                <p>
                  As organizations grow, the complexity of maintaining codebases often scales exponentially. By embracing modern paradigms and carefully managing technical debt, teams can maintain velocity without sacrificing quality.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
