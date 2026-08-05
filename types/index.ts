
export type Service = {
  icon: string;
  title: string;
  description: string;
};

export type WorkflowStep = {
  number: string;
  title: string;
  description: string;
  /** Material Symbols Outlined icon name */
  icon: string;
  highlight?: boolean;
};

export type ProjectCategory =
  | "all"
  | "web-applications"
  | "mobile-apps"
  | "platforms"
  | "tools-systems"
  | "others";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  icon?: string;
  colSpan?: string;
  height?: string;
  href?: string;
  category?: ProjectCategory;
  categoryLabel?: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type ContactItem = {
  label: string;
  value: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  description: string;
  image_url: string;
  created_at?: string;
  slug?: string;
  // Fallbacks for UI if necessary
  socialLinks?: SocialLink[];
  icon?: string;
  githubProfile?: {
    username: string;
    followers: string;
    following: string;
    repos: number;
  };
  specializations?: string[];
  techStack?: string[];
  focus?: string;
  since?: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  project_url: string;
  organization: string;
  created_at: string;
};

export type BlogItem = {
  id: string;
  title: string;
  content: string;
  author: string;
  image_url: string;
  created_at: string;
};

export type CreativeItem = {
  id: string;
  title: string;
  description?: string;
  thumbnail_url: string;
  video_url: string;
  category: string;
  duration: string;
  published_at: string;
  summary: string;
  featured?: boolean;
  author?: string;
  channel_title?: string;
};
