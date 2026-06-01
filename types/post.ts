export interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  image: string;
  category: string;
  type: string;
  author: string;
  publishedAt: string;
  duration?: string;
  tags?: string[];
  featured?: boolean;
  content?: string;
}

export type PostType = 
  | "Article"
  | "Podcast"
  | "Video"
  | "Tutorial"
  | "Case Study"
  | "Creative Project"
  | "Course"
  | (string & {}); // Supports future content types
