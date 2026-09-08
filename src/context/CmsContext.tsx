import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ServiceItem, 
  ProjectItem, 
  TestimonialItem, 
  BlogPostItem, 
  TeamMemberItem, 
  LeadInquiry,
  ServiceCategory,
  SiteConfig,
  HeroData,
  AboutPageData,
  ContactPageData,
  FooterData
} from '../types';
import { 
  initialServices, 
  initialProjects, 
  initialTestimonials, 
  initialBlogPosts, 
  initialTeam,
  siteConfig as defaultSiteConfig,
  heroData as defaultHeroData,
  homePageData as defaultHomePageData,
  aboutPageData as defaultAboutPageData,
  contactPageData as defaultContactPageData,
  pricingPageData as defaultPricingPageData,
  footerData as defaultFooterData,
  navigationData as defaultNavigationData,
  openingExperienceData as defaultOpeningExperienceData,
  agencyStats as defaultAgencyStats,
  clientLogos as defaultClientLogos
} from '../data/initialData';

interface CmsContextType {
  // Centralized Content Sources
  siteConfig: SiteConfig;
  heroData: HeroData;
  homePageData: typeof defaultHomePageData;
  aboutPageData: AboutPageData;
  contactPageData: ContactPageData;
  pricingPageData: typeof defaultPricingPageData;
  footerData: FooterData;
  navigationData: typeof defaultNavigationData;
  openingExperienceData: typeof defaultOpeningExperienceData;
  agencyStats: typeof defaultAgencyStats;
  clientLogos: typeof defaultClientLogos;

  // Dynamic Collections
  services: ServiceItem[];
  projects: ProjectItem[];
  testimonials: TestimonialItem[];
  blogPosts: BlogPostItem[];
  team: TeamMemberItem[];
  inquiries: LeadInquiry[];
  
  // Queries
  getProjectsByCategory: (category?: string) => ProjectItem[];
  getFeaturedProjects: () => ProjectItem[];
  getServiceBySlug: (slug: string) => ServiceItem | undefined;
  getProjectBySlug: (slug: string) => ProjectItem | undefined;
  getBlogPostBySlug: (slug: string) => BlogPostItem | undefined;
  getTestimonialsByCategory: (category?: string) => TestimonialItem[];

  // Mutations
  addProject: (project: Omit<ProjectItem, 'id'>) => ProjectItem;
  updateProject: (project: ProjectItem) => void;
  deleteProject: (id: string) => void;

  updateService: (service: ServiceItem) => void;

  addTestimonial: (testimonial: Omit<TestimonialItem, 'id'>) => TestimonialItem;
  updateTestimonial: (testimonial: TestimonialItem) => void;
  deleteTestimonial: (id: string) => void;

  addBlogPost: (post: Omit<BlogPostItem, 'id'>) => BlogPostItem;
  updateBlogPost: (post: BlogPostItem) => void;
  deleteBlogPost: (id: string) => void;

  addTeamMember: (member: Omit<TeamMemberItem, 'id'>) => TeamMemberItem;
  updateTeamMember: (member: TeamMemberItem) => void;
  deleteTeamMember: (id: string) => void;

  submitInquiry: (inquiry: Omit<LeadInquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: LeadInquiry['status']) => void;

  resetToDefaults: () => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'aether_cms_v8_';

const REMOVED_PROJECT_IDENTIFIERS = new Set([
  'proj-1',
  'proj-2',
  'proj-3',
  'proj-4',
  'proj-5',
  'proj-6',
  'proj-7',
  'proj-8',
  'blog-1',
  'blog-2',
  'blog-3',
  'blog-4',
  'blog-5',
  'future-of-interactive-webgl-performance',
  'scaling-shopify-plus-to-8-figures',
  'ai-driven-paid-acquisition-playbook',
  'architecting-offline-first-mobile-apps',
  'architecting-29-screen-retail-operating-system',
  'blog-mr-pos-retail-os',
  'blog-lumina-luxury-headless-shopify',
  'blog-apex-fitness-mobile-app',
  'blog-veloce-fintech-web-app',
  'blog-chrono-warehouse-custom-software',
  'blog-artisan-cafe-smart-pos',
  'mr-clothing-craft-pos-system-case-study',
  'lumina-luxury-headless-shopify-case-study',
  'apex-fitness-native-mobile-app-architecture',
  'veloce-fintech-web-application-case-study',
  'chrono-logistics-warehouse-software-case-study',
  'artisan-cafe-smart-pos-kiosk-engineering',
  'chronos-luxury-watches',
  'synapse-ai-platform',
  'lumina-brand-identity',
  'kinetic-hybrid-campaign',
  'solis-omnichannel-growth',
  'velox-logistics-portal',
  'pulsefit-athletic-telemetry',
  'nordic-atelier-commerce'
]);

// Helper to load and merge defaults and preserve newly introduced fields
function loadAndMerge<T extends { id: string; slug?: string }>(key: string, defaults: T[]): T[] {
  try {
    // Clear out any old legacy caches that might contain removed placeholders
    if (key === 'projects' || key === 'testimonials' || key === 'blogPosts') {
      ['aether_cms_v1_', 'aether_cms_v2_', 'aether_cms_v3_', 'aether_cms_v4_', 'aether_cms_v5_', 'aether_cms_v6_', 'aether_cms_v7_'].forEach(prefix => {
        try {
          localStorage.removeItem(`${prefix}${key}`);
        } catch (_) {}
      });
    }

    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}${key}`);
    if (saved) {
      const parsed: T[] = JSON.parse(saved);
      // Filter out any removed identifiers
      const sanitizedParsed = parsed.filter(
        (p) => !REMOVED_PROJECT_IDENTIFIERS.has(p.id) && (!p.slug || !REMOVED_PROJECT_IDENTIFIERS.has(p.slug))
      );

      // Ensure defaults carry the latest updated code schema while keeping user edits
      const mergedDefaults = defaults.map((def) => {
        const found = sanitizedParsed.find((p) => p.id === def.id || (def.slug && p.slug === def.slug));
        return found ? { ...def, ...found } : def;
      });
      // Plus any custom user-added items
      const userAdded = sanitizedParsed.filter(
        (p) => !defaults.some((def) => def.id === p.id || (def.slug && p.slug === def.slug))
      );
      return [...mergedDefaults, ...userAdded].filter(
        (p) => !REMOVED_PROJECT_IDENTIFIERS.has(p.id) && (!p.slug || !REMOVED_PROJECT_IDENTIFIERS.has(p.slug))
      );
    }
  } catch (err) {
    console.error(`Failed to load ${key} from storage`, err);
  }
  return defaults.filter(
    (p) => !REMOVED_PROJECT_IDENTIFIERS.has(p.id) && (!p.slug || !REMOVED_PROJECT_IDENTIFIERS.has(p.slug))
  );
}

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceItem[]>(() => 
    loadAndMerge<ServiceItem>('services', initialServices)
  );

  const [projects, setProjects] = useState<ProjectItem[]>(() => 
    loadAndMerge<ProjectItem>('projects', initialProjects)
  );

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => 
    loadAndMerge<TestimonialItem>('testimonials', initialTestimonials)
  );

  const [blogPosts, setBlogPosts] = useState<BlogPostItem[]>(() => 
    loadAndMerge<BlogPostItem>('blogPosts', initialBlogPosts)
  );

  const [team, setTeam] = useState<TeamMemberItem[]>(() => 
    loadAndMerge<TeamMemberItem>('team', initialTeam)
  );

  const [inquiries, setInquiries] = useState<LeadInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}inquiries`) || localStorage.getItem('aether_cms_v1_inquiries');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'inq-1',
        name: 'Alexander Wright',
        email: 'alex@wrightventures.co',
        phone: '+1 (415) 890-2341',
        company: 'Wright Ventures',
        service: 'Web Development',
        budget: '$15,000 - $30,000',
        timeline: '1-2 Months',
        message: 'Looking to overhaul our venture portfolio showcase with 3D elements and sub-second load times.',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        status: 'In Review'
      }
    ];
  });

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}services`, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}projects`, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}testimonials`, JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}blogPosts`, JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}team`, JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}inquiries`, JSON.stringify(inquiries));
  }, [inquiries]);

  // Query helpers
  const getProjectsByCategory = (category?: string) => {
    if (!category || category === 'All') return projects;
    return projects.filter(p => p.category.toLowerCase() === category.toLowerCase());
  };

  const getFeaturedProjects = () => {
    return projects.filter(p => p.featured);
  };

  const getServiceBySlug = (slug: string) => {
    return services.find(s => s.slug.toLowerCase() === slug.toLowerCase());
  };

  const getProjectBySlug = (slug: string) => {
    return projects.find(p => p.slug.toLowerCase() === slug.toLowerCase());
  };

  const getBlogPostBySlug = (slug: string) => {
    return blogPosts.find(b => b.slug.toLowerCase() === slug.toLowerCase());
  };

  const getTestimonialsByCategory = (category?: string) => {
    if (!category || category === 'All') return testimonials;
    return testimonials.filter(t => t.category === category || t.category === 'General');
  };

  // Mutation helpers
  const addProject = (projectData: Omit<ProjectItem, 'id'>) => {
    const newProject: ProjectItem = {
      ...projectData,
      id: `proj-${Date.now()}`
    };
    setProjects(prev => [newProject, ...prev]);
    return newProject;
  };

  const updateProject = (updated: ProjectItem) => {
    setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const updateService = (updated: ServiceItem) => {
    setServices(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  const addTestimonial = (item: Omit<TestimonialItem, 'id'>) => {
    const newItem: TestimonialItem = {
      ...item,
      id: `test-${Date.now()}`
    };
    setTestimonials(prev => [newItem, ...prev]);
    return newItem;
  };

  const updateTestimonial = (updated: TestimonialItem) => {
    setTestimonials(prev => prev.map(t => t.id === updated.id ? updated : t));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const addBlogPost = (item: Omit<BlogPostItem, 'id'>) => {
    const newItem: BlogPostItem = {
      ...item,
      id: `blog-${Date.now()}`
    };
    setBlogPosts(prev => [newItem, ...prev]);
    return newItem;
  };

  const updateBlogPost = (updated: BlogPostItem) => {
    setBlogPosts(prev => prev.map(b => b.id === updated.id ? updated : b));
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(b => b.id !== id));
  };

  const addTeamMember = (item: Omit<TeamMemberItem, 'id'>) => {
    const newItem: TeamMemberItem = {
      ...item,
      id: `team-${Date.now()}`
    };
    setTeam(prev => [...prev, newItem]);
    return newItem;
  };

  const updateTeamMember = (updated: TeamMemberItem) => {
    setTeam(prev => prev.map(m => m.id === updated.id ? updated : m));
  };

  const deleteTeamMember = (id: string) => {
    setTeam(prev => prev.filter(m => m.id !== id));
  };

  const submitInquiry = (inquiryData: Omit<LeadInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: LeadInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New'
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: LeadInquiry['status']) => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq));
  };

  const resetToDefaults = () => {
    setServices(initialServices);
    setProjects(initialProjects);
    setTestimonials(initialTestimonials);
    setBlogPosts(initialBlogPosts);
    setTeam(initialTeam);
    ['services', 'projects', 'testimonials', 'blogPosts', 'team', 'inquiries'].forEach((k) => {
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}${k}`);
      localStorage.removeItem(`aether_cms_v1_${k}`);
    });
  };

  return (
    <CmsContext.Provider
      value={{
        siteConfig: defaultSiteConfig,
        heroData: defaultHeroData,
        homePageData: defaultHomePageData,
        aboutPageData: defaultAboutPageData,
        contactPageData: defaultContactPageData,
        pricingPageData: defaultPricingPageData,
        footerData: defaultFooterData,
        navigationData: defaultNavigationData,
        openingExperienceData: defaultOpeningExperienceData,
        agencyStats: defaultAgencyStats,
        clientLogos: defaultClientLogos,
        services,
        projects,
        testimonials,
        blogPosts,
        team,
        inquiries,
        getProjectsByCategory,
        getFeaturedProjects,
        getServiceBySlug,
        getProjectBySlug,
        getBlogPostBySlug,
        getTestimonialsByCategory,
        addProject,
        updateProject,
        deleteProject,
        updateService,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        submitInquiry,
        updateInquiryStatus,
        resetToDefaults
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
