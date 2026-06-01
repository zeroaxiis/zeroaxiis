import { Post } from "@/types/post";
import { PostCard } from "./PostCard";
import { FeaturedPostCard } from "./FeaturedPostCard";
import { cn } from "@/lib/utils";

interface PostGridProps {
  posts: Post[];
  className?: string;
  allowFeatured?: boolean;
}

export function PostGrid({ posts, className, allowFeatured = true }: PostGridProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  // Find the first featured post if allowed
  const featuredPostIndex = allowFeatured ? posts.findIndex(p => p.featured) : -1;
  const hasFeatured = featuredPostIndex !== -1;
  
  const featuredPost = hasFeatured ? posts[featuredPostIndex] : null;
  
  // Get all other posts, maintaining their original order minus the featured one
  const gridPosts = hasFeatured 
    ? posts.filter((_, idx) => idx !== featuredPostIndex)
    : posts;

  return (
    <div className={cn("w-full flex flex-col gap-[var(--gap-grid)]", className)}>
      {/* Featured Post (Full Width) */}
      {featuredPost && (
        <div className="w-full mb-4">
          <FeaturedPostCard post={featuredPost} />
        </div>
      )}

      {/* Grid of standard posts */}
      {gridPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[var(--gap-grid)]">
          {gridPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
