import { Container } from "@/components/layout";
import { PostGrid } from "@/components/cards/PostGrid";
import { ContentSection } from "@/components/sections/ContentSection";
import { getAllPosts as getFallbackPosts } from "@/lib/blog";
import { UnderConstruction } from "@/components/ui/under-construction";
import { BackgroundGrid } from "@/components/ui/background-grid";

export const metadata = {
  title: "Blog – Insights & Updates | Zeroaxiis",
  description:
    "Thoughts, ideas, and case studies on engineering, design, and building the future.",
};

async function fetchBlogs() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/v1/zeroaxiis/blogs`, { cache: 'no-store' });
    if (!res.ok) throw new Error("API not ready");
    const data = await res.json();
    return data && data.length > 0 ? data : null;
  } catch {
    return null;
  }
}

export default async function BlogPage() {
  const fetchedPosts = await fetchBlogs();

  if (!fetchedPosts) {
    return (
      <main className="relative flex flex-col justify-center bg-surface-container-lowest min-h-[clamp(600px,100svh,1080px)] overflow-hidden">
        <BackgroundGrid maskImage="linear-gradient(to bottom, transparent, black 15%, black 100%)" opacity={50} />
        <Container className="relative z-10">
          <UnderConstruction moduleName="Blog" />
        </Container>
      </main>
    );
  }

  const displayPosts = Array.isArray(fetchedPosts) ? fetchedPosts : getFallbackPosts();

  return (
    <main className="pt-32 pb-32 relative bg-surface-container-lowest min-h-[clamp(600px,100svh,1080px)] overflow-hidden">
      <BackgroundGrid maskImage="linear-gradient(to bottom, transparent, black 15%, black 100%)" opacity={50} />

      <Container className="relative z-10 pt-8">
        <ContentSection
          title="Latest Releases"
          description="Explore our most recent articles, podcasts, and case studies."
          viewAllHref="/blog"
        >
          <PostGrid posts={displayPosts} allowFeatured={true} />
        </ContentSection>
      </Container>
    </main>
  );
}
