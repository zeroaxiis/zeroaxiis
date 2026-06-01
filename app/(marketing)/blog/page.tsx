import { PostGrid } from "@/components/cards/PostGrid";
import { ContentSection } from "@/components/sections/ContentSection";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-background">


      {/* Main Content Section using PostGrid */}
      <ContentSection 
        title="Latest Releases" 
        description="Explore our most recent articles, podcasts, and case studies."
        viewAllHref="/blog"
      >
        <PostGrid posts={posts} allowFeatured={true} />
      </ContentSection>

    </main>
  );
}
