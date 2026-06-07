import { Container } from "@/components/layout";
import { PostGrid } from "@/components/cards/PostGrid";
import { ContentSection } from "@/components/sections/ContentSection";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="pt-32 pb-32 relative bg-surface-container-lowest min-h-[100svh] overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-lg opacity-50 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_100%)]"
      />

      <Container className="relative z-10 pt-8">
        <ContentSection
          title="Latest Releases"
          description="Explore our most recent articles, podcasts, and case studies."
          viewAllHref="/blog"
        >
          <PostGrid posts={posts} allowFeatured={true} />
        </ContentSection>
      </Container>
    </main>
  );
}
