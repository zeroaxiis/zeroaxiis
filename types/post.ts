export interface Post {
  id: string;
  title: string;
  excerpt: string;
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

