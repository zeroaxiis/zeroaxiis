export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  content: string;
};

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
};

export type Contributor = {
  initials: string;
};

export type OpenSourceTool = {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: string;
  forks: string;
  updated: string;
  href?: string;
  visibility?: "Public" | "Private";
  contributors?: Contributor[];
};

export type SocialLink = {
  label: string;
  href: string;
};

export type TeamMember = {
  name: string;
  role: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: string;
  socialLinks: SocialLink[];
};

export type ContactItem = {
  label: string;
  value: string;
};
