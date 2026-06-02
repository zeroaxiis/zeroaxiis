import { Container } from "@/components/layout";
import { PostGrid } from "@/components/cards/PostGrid";
import { ContentSection } from "@/components/sections/ContentSection";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Container className="min-h-screen overflow-x-hidden bg-background pt-40 pb-32">
      <ContentSection
        title="Latest Releases"
        description="Explore our most recent articles, podcasts, and case studies."
        viewAllHref="/blog"
      >
        <PostGrid posts={posts} allowFeatured={true} />
      </ContentSection>
    </Container>
  );
}
