export type ServiceCategory = 
  | 'Web Development' 
  | 'Graphic Design' 
  | 'Video Editing' 
  | 'Digital Marketing' 
  | 'Shopify Development'
  | 'Mobile App Development'
  | 'E-commerce Complete Solution';

export type PortfolioCategory =
  | 'Mobile Apps'
  | 'Websites'
  | 'E-commerce'
  | 'Booking Platforms'
  | 'Web Applications'
  | 'Business Management Systems';

export interface ServiceItem {
  id: string;
  slug: string;
  title: ServiceCategory;
  tagline: string;
  oneLinePromise: string;
  description: string;
  deliverables: string[];
  processSteps: { step: string; title: string; desc: string }[];
  techStack: string[];
  pricingTiers: {
    tier: string;
    price: string;
    period?: string;
    features: string[];
    recommended?: boolean;
  }[];
  faq: { q: string; a: string }[];
  metricHighlight: { label: string; value: string };
  iconType: 'code' | 'palette' | 'video' | 'trending' | 'shopping-bag' | 'smartphone' | 'store';
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: ServiceCategory | string;
  portfolioCategory?: PortfolioCategory;
  portfolioCategories?: PortfolioCategory[];
  platform?: string;
  techStack?: string[];
  keyFeatures?: string[];
  playStoreUrl?: string;
  appStoreUrl?: string;
  liveUrl?: string;
  featured: boolean; // Shows on homepage
  year: string;
  duration: string;
  thumbnail: string;
  heroImage: string;
  overview: string;
  problem: string;
  solution: string;
  results: { metric: string; label: string }[];
  clientQuote: {
    quote: string;
    author: string;
    role: string;
    avatar?: string;
  };
  deliverables: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  category: ServiceCategory | 'General';
  metricAchieved: string;
}

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  category: ServiceCategory | 'Strategy';
  coverImage: string;
  tags: string[];
}

export interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  specialties: string[];
  experience: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface LeadInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  createdAt: string;
  status: 'New' | 'In Review' | 'Contacted';
}

export type CursorVariant = 'default' | 'button' | 'link' | 'project' | 'drag' | 'hidden';

export type PageRoute = 
  | 'home'
  | 'about'
  | 'services'
  | 'service-detail'
  | 'work'
  | 'case-study'
  | 'pricing'
  | 'blog'
  | 'blog-post'
  | 'contact'
  | 'admin'
  | 'sitemap';
