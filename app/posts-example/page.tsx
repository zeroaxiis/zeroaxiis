import { Post } from "@/types/post";
import { PostGrid } from "@/components/cards/PostGrid";
import { ContentSection } from "@/components/sections/ContentSection";

const SAMPLE_POSTS: Post[] = [
  {
    id: "1",
    title: "Designing for the Future: A Guide to Spatial UI",
    excerpt: "Explore the principles of spatial design and how they apply to modern web interfaces, creating deeper immersion and better user experiences.",
    slug: "designing-spatial-ui",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    category: "Design",
    type: "Article",
    author: "Elena Rodriguez",
    publishedAt: "2026-05-24T10:00:00Z",
    duration: "8 min read",
    featured: true,
  },
  {
    id: "2",
    title: "Building Scalable Design Systems with Tailwind CSS 4",
    excerpt: "Learn how to leverage the new @theme directive and CSS variable mapping in Tailwind v4 to build bulletproof design systems.",
    slug: "tailwind-4-design-systems",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
    category: "Development",
    type: "Tutorial",
    author: "Marcus Chen",
    publishedAt: "2026-05-20T14:30:00Z",
    duration: "12 min read",
  },
  {
    id: "3",
    title: "The State of React Server Components in 2026",
    excerpt: "A deep dive into how Server Components have reshaped the frontend landscape and what it means for your architecture.",
    slug: "react-server-components-2026",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000&auto=format&fit=crop",
    category: "Engineering",
    type: "Podcast",
    author: "Sarah Drasner",
    publishedAt: "2026-05-18T09:00:00Z",
    duration: "45 min listen",
  },
  {
    id: "4",
    title: "Minimalism in Motion: Micro-interactions that matter",
    excerpt: "Why less is more when it comes to animation, and how to use Framer Motion to create subtle, premium-feeling interfaces.",
    slug: "minimalism-in-motion",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop",
    category: "UX",
    type: "Video",
    author: "David Kim",
    publishedAt: "2026-05-15T11:15:00Z",
    duration: "15 min watch",
  },
  {
    id: "5",
    title: "Zero to One: Launching a Media Platform",
    excerpt: "A complete case study on building a highly scalable, content-rich platform using Next.js App Router and a modern headless CMS.",
    slug: "zero-to-one-media-platform",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    category: "Case Study",
    type: "Case Study",
    author: "Alex Johnson",
    publishedAt: "2026-05-10T16:45:00Z",
    duration: "20 min read",
  }
];

export default function PostsExamplePage() {
  return (
    <main className="min-h-screen bg-background">


      {/* Main Content Section using PostGrid */}
      <ContentSection 
        title="Latest Releases" 
        description="Explore our most recent articles, podcasts, and case studies."
        viewAllHref="/posts"
      >
        <PostGrid posts={SAMPLE_POSTS} allowFeatured={true} />
      </ContentSection>

    </main>
  );
}
