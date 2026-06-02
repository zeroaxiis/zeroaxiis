import { Post } from "@/types/post";

const posts: Post[] = [
  {
    id: "1",
    title: "Designing for the Future: A Guide to Spatial UI",
    excerpt: "Explore the principles of spatial design and how they apply to modern web interfaces, creating deeper immersion and better user experiences.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    category: "Design",
    type: "Article",
    author: "Elena Rodriguez",
    publishedAt: "2026-05-24T10:00:00Z",
    duration: "8 min read",
    featured: true,
    tags: ["UI/UX", "Spatial Design"],
    content: `
Welcome to the future of design! Spatial UI is revolutionizing how we interact with digital spaces.

## The Principles of Depth

By leveraging shadows, gradients, and subtle animations, we can create interfaces that feel tactile and real. This isn't just about aesthetics; it's about giving users a clear sense of hierarchy and spatial relationship.

## Beyond the Flat Web

For years, we've been confined to flat, 2D screens. But as mixed reality headsets and more powerful browsers emerge, the web is becoming a 3D canvas.

We are just at the beginning. Embrace the Z-axis.
    `.trim(),
  },
  {
    id: "2",
    title: "Building Scalable Design Systems with Tailwind CSS 4",
    excerpt: "Learn how to leverage the new @theme directive and CSS variable mapping in Tailwind v4 to build bulletproof design systems.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
    category: "Development",
    type: "Tutorial",
    author: "Marcus Chen",
    publishedAt: "2026-05-20T14:30:00Z",
    duration: "12 min read",
    tags: ["CSS", "Tailwind", "Architecture"],
    content: `
Tailwind CSS 4 is here, and it brings a whole new way to think about design systems.

## The @theme Directive

Gone are the days of a bloated tailwind.config.js. Now, you can define your entire theme directly in your CSS using the new @theme directive. This makes your design tokens feel like native CSS.

## CSS Variables are First-Class

Tailwind now embraces CSS variables fully. This means easier dynamic theming, better integration with third-party libraries, and a cleaner developer experience.

It's time to upgrade.
    `.trim(),
  },
  {
    id: "3",
    title: "The State of React Server Components in 2026",
    excerpt: "A deep dive into how Server Components have reshaped the frontend landscape and what it means for your architecture.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000&auto=format&fit=crop",
    category: "Engineering",
    type: "Podcast",
    author: "Sarah Drasner",
    publishedAt: "2026-05-18T09:00:00Z",
    duration: "45 min listen",
    tags: ["React", "Performance", "Architecture"],
    content: `
React Server Components (RSC) have completely changed how we build React applications.

## Shifting Work to the Server

By rendering components on the server, we send less JavaScript to the client. This leads to faster load times, better SEO, and a more resilient application.

## The Client/Server Boundary

Understanding where to draw the line between client and server is the new architectural challenge. It requires a mental shift, but the performance benefits are undeniable.

RSC is no longer an experiment; it's the standard.
    `.trim(),
  },
  {
    id: "4",
    title: "Minimalism in Motion: Micro-interactions that matter",
    excerpt: "Why less is more when it comes to animation, and how to use Framer Motion to create subtle, premium-feeling interfaces.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop",
    category: "UX",
    type: "Video",
    author: "David Kim",
    publishedAt: "2026-05-15T11:15:00Z",
    duration: "15 min watch",
    tags: ["Animation", "Framer Motion", "UX"],
    content: `
Animation should enhance the user experience, not distract from it.

## The Power of Subtlety

A slight scale on hover. A gentle fade on load. These micro-interactions make an interface feel alive and responsive. They tell the user that their actions have an effect.

## Framer Motion: The Tool of Choice

Framer Motion makes it incredibly easy to implement these subtle animations in React. Its declarative API and powerful physics engine allow you to create complex interactions with minimal code.

Keep it simple. Keep it smooth.
    `.trim(),
  }
];

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getPostById(id: string): Post | undefined {
  return posts.find((p) => p.id === id);
}
