import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { creativeItems } from "@/lib/data";
import { 
  VideoPlayer, 
  ArticleHeader, 
  ArticleContent
} from "@/components/sections/creative-detail";
import { CircleButton } from "@/components/ui/circle-button";
import { ArrowLeftIcon } from "@/components/icons";
import { BackgroundGrid } from "@/components/ui/background-grid";

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
      <BackgroundGrid />
      
      <Section className="!py-0 relative z-10">
        <Container>
          <div className="w-full mb-10 flex justify-start">
            <CircleButton href="/creative" aria-label="Go back">
              <ArrowLeftIcon width={18} height={18} strokeWidth={1.4} />
            </CircleButton>
          </div>
          <VideoPlayer videoId={videoId} title={item.title} />

          {/* Content Area */}
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            <ArticleHeader item={item} />
            <ArticleContent description={item.description} />
          </div>
        </Container>
      </Section>
    </main>
  );
}
