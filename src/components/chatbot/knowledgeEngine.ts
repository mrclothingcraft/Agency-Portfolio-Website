import { 
  ServiceItem, 
  ProjectItem, 
  BlogPostItem, 
  SiteConfig, 
  AboutPageData, 
  ContactPageData,
  TestimonialItem
} from '../../types';

export interface ChatbotAnswerAction {
  label: string;
  type: 'whatsapp' | 'navigate';
  route?: string;
  slug?: string;
  url?: string;
  isWhatsApp?: boolean;
}

export interface ChatbotResponse {
  message: string;
  bulletPoints?: string[];
  actions?: ChatbotAnswerAction[];
  isFallback?: boolean;
  suggestedPrompts?: string[];
}

export interface KnowledgeEngineContext {
  siteConfig: SiteConfig;
  services: ServiceItem[];
  projects: ProjectItem[];
  blogPosts: BlogPostItem[];
  aboutPageData?: AboutPageData;
  contactPageData?: ContactPageData;
  testimonials?: TestimonialItem[];
  pricingPlans?: any[];
}

const WHATSAPP_NUMBER_RAW = '03101072246';
const WHATSAPP_INTL = '923101072246';

/**
 * Helper to build a WhatsApp direct chat URL with pre-filled context text
 */
export const buildWhatsAppUrl = (prefillMessage: string): string => {
  return `https://wa.me/${WHATSAPP_INTL}?text=${encodeURIComponent(prefillMessage)}`;
};

/**
 * Standard fallback response when a user's question cannot be found in the website data
 */
export const getFallbackResponse = (userQuery: string): ChatbotResponse => {
  return {
    message:
      "I don't have that information available right now. You can contact our team directly on WhatsApp and we'll be happy to help.",
    actions: [
      {
        label: `Chat on WhatsApp (+92 310 1072246)`,
        type: 'whatsapp',
        url: buildWhatsAppUrl(
          `Hi! I was on your website and had a question: "${userQuery}". Could you provide more details?`
        ),
        isWhatsApp: true,
      },
      {
        label: 'Submit Inquiry Form',
        type: 'navigate',
        route: 'contact',
      },
    ],
    isFallback: true,
    suggestedPrompts: [
      'What services do you offer?',
      'Show me your projects',
      'Tell me about your POS system',
      'Do you build mobile apps?',
    ],
  };
};

/**
 * Core search & answering engine that matches user inquiries against centralized website data
 */
export function queryWebsiteKnowledge(
  rawQuery: string,
  data: KnowledgeEngineContext
): ChatbotResponse {
  const query = rawQuery.trim().toLowerCase();

  if (!query) {
    return {
      message: 'How can I assist you today? You can ask me about our services, projects, POS systems, mobile apps, or contact details.',
      suggestedPrompts: [
        'What services do you offer?',
        'Show me your projects',
        'Tell me about your POS system',
      ],
    };
  }

  // -------------------------------------------------------------
  // 1. GREETINGS & CASUAL INTRODUCTIONS
  // -------------------------------------------------------------
  if (
    /^(hi|hello|hey|greetings|hola|assalam|salam|good\s*(morning|afternoon|evening)|howdy|sup)\b/.test(
      query
    )
  ) {
    return {
      message: `Hello! I am ${data.siteConfig.shortName || 'Aether'}'s digital studio assistant. I'm connected directly to our website knowledge base. How can I help you today?`,
      suggestedPrompts: [
        'What services do you offer?',
        'Show me your projects',
        'Tell me about your POS system',
        'Do you build mobile apps?',
        'How can I contact you?',
      ],
    };
  }

  // -------------------------------------------------------------
  // 2. WHO WE ARE / ABOUT US / COMPANY OVERVIEW
  // -------------------------------------------------------------
  if (
    query.includes('who are you') ||
    query.includes('who we are') ||
    query.includes('about you') ||
    query.includes('about aether') ||
    query.includes('about us') ||
    query.includes('tell me about your company') ||
    query.includes('what is aether') ||
    query.includes('agency overview') ||
    query.includes('history') ||
    query.includes('founded')
  ) {
    const founded = data.siteConfig.foundedYear || '2015';
    return {
      message: `${data.siteConfig.name} is an elite digital design & engineering studio founded in ${founded}. ${data.siteConfig.description}`,
      bulletPoints: [
        `Founded: ${founded} with a global client presence.`,
        'Focus: High-performance web applications, cloud POS systems, iOS/Android mobile apps, and headless e-commerce.',
        'Architecture: Enterprise-grade engineering, bespoke UI/UX, and scalable cloud deployments.',
      ],
      actions: [
        {
          label: 'Learn More About Us',
          type: 'navigate',
          route: 'about',
        },
        {
          label: 'Chat on WhatsApp',
          type: 'whatsapp',
          url: buildWhatsAppUrl('Hi! I would like to learn more about Aether Digital Studio.'),
          isWhatsApp: true,
        },
      ],
      suggestedPrompts: [
        'What services do you offer?',
        'Show me your projects',
        'How can I contact you?',
      ],
    };
  }

  // -------------------------------------------------------------
  // 3. POS SYSTEM SPECIFIC INQUIRIES (Requirement #5 & #10)
  // -------------------------------------------------------------
  if (
    query.includes('pos') ||
    query.includes('point of sale') ||
    query.includes('cash register') ||
    query.includes('billing system') ||
    query.includes('retail system') ||
    query.includes('clothing craft pos')
  ) {
    const posService = data.services.find(
      (s) =>
        s.title.toLowerCase().includes('pos') ||
        s.slug.toLowerCase().includes('pos') ||
        s.description.toLowerCase().includes('point of sale')
    );
    const posProject = data.projects.find(
      (p) =>
        p.title.toLowerCase().includes('pos') ||
        p.overview.toLowerCase().includes('pos') ||
        p.category.toLowerCase().includes('pos')
    );

    const desc = posService
      ? posService.description
      : 'We build enterprise cloud Point of Sale (POS) software with real-time multi-branch synchronization, offline resilience, and fast barcode scanning.';

    return {
      message: `Yes! We specialize in custom Point of Sale (POS) engineering. ${desc}`,
      bulletPoints: [
        'Real-time multi-store inventory synchronization and low-stock alerts.',
        'Zero-downtime offline transaction mode with automatic background sync.',
        'High-speed barcode scanning, receipt printing, and hardware integrations.',
        'Granular cashier shifts, manager overrides, and tax compliance reporting.',
        posProject ? `Flagship Build: ${posProject.title} (${posProject.overview.slice(0, 90)}...)` : 'Flagship: Custom multi-branch retail POS architectures.',
      ],
      actions: [
        ...(posService
          ? [
              {
                label: 'View POS Service Page',
                type: 'navigate' as const,
                route: 'service-detail',
                slug: posService.slug,
              },
            ]
          : []),
        ...(posProject
          ? [
              {
                label: `View ${posProject.title} Case Study`,
                type: 'navigate' as const,
                route: 'case-study',
                slug: posProject.slug,
              },
            ]
          : []),
        {
          label: 'Request POS Demo on WhatsApp',
          type: 'whatsapp' as const,
          url: buildWhatsAppUrl('Hi! I would like to schedule a demo and get pricing for your POS system.'),
          isWhatsApp: true,
        },
      ],
      suggestedPrompts: [
        'What technologies do you use for POS?',
        'Do you build mobile apps?',
        'What are your pricing plans?',
      ],
    };
  }

  // -------------------------------------------------------------
  // 4. MOBILE APP DEVELOPMENT (Requirement #5 & #10)
  // -------------------------------------------------------------
  if (
    query.includes('mobile app') ||
    query.includes('mobile') ||
    query.includes('ios') ||
    query.includes('android') ||
    query.includes('react native') ||
    query.includes('flutter') ||
    query.includes('app development')
  ) {
    const mobileService = data.services.find(
      (s) =>
        s.title.toLowerCase().includes('mobile') ||
        s.slug.includes('mobile')
    );

    const mobileProjects = data.projects.filter(
      (p) =>
        p.category.toLowerCase().includes('mobile') ||
        (p.platform && p.platform.toLowerCase().includes('mobile')) ||
        (p.portfolioCategory && p.portfolioCategory.toLowerCase().includes('mobile'))
    );

    return {
      message:
        mobileService?.description ||
        "Yes, we engineer native and cross-platform mobile applications for iOS and Android. Our apps feature fluid 60/120fps gesture-driven interfaces, offline SQLite caching, biometric security, and scalable backend synchronization.",
      bulletPoints: [
        'Platforms: Native iOS (Swift), Native Android (Kotlin), and Cross-Platform (React Native / Flutter).',
        'Features: Offline-first storage, push notification campaigns, biometric authentication, and in-app subscriptions.',
        mobileProjects.length > 0
          ? `Featured Mobile Apps: ${mobileProjects.slice(0, 3).map((p) => p.title).join(', ')}.`
          : 'Featured Builds: FixTman On-Demand Services, Masjidi Community, Yara Connect Logistics.',
      ],
      actions: [
        ...(mobileService
          ? [
              {
                label: 'Explore Mobile App Service',
                type: 'navigate' as const,
                route: 'service-detail',
                slug: mobileService.slug,
              },
            ]
          : []),
        {
          label: 'Discuss Mobile App on WhatsApp',
          type: 'whatsapp' as const,
          url: buildWhatsAppUrl('Hi! I am interested in building an iOS/Android mobile application with Aether.'),
          isWhatsApp: true,
        },
      ],
      suggestedPrompts: [
        'Tell me about FixTman',
        'Show me your projects',
        'Do you build Shopify stores?',
      ],
    };
  }

  // -------------------------------------------------------------
  // 5. SHOPIFY & E-COMMERCE (Requirement #5 & #10)
  // -------------------------------------------------------------
  if (
    query.includes('shopify') ||
    query.includes('ecommerce') ||
    query.includes('e-commerce') ||
    query.includes('online store') ||
    query.includes('shopping cart') ||
    query.includes('modest elegance')
  ) {
    const ecomService = data.services.find(
      (s) =>
        s.title.toLowerCase().includes('shopify') ||
        s.title.toLowerCase().includes('e-commerce') ||
        s.slug.includes('shopify')
    );

    const shopifyProjects = data.projects.filter(
      (p) =>
        p.title.toLowerCase().includes('shopify') ||
        p.category.toLowerCase().includes('shopify') ||
        p.category.toLowerCase().includes('e-commerce')
    );

    return {
      message:
        ecomService?.description ||
        'Yes! We build high-converting e-commerce experiences and bespoke Shopify Plus storefronts. From custom Liquid theme engineering to headless Next.js Commerce with the Shopify Storefront API.',
      bulletPoints: [
        'Shopify Plus custom theme development, custom Liquid sections, and checkout extensions.',
        'Headless e-commerce utilizing Next.js, Hydrogen, and Storefront GraphQL API.',
        'High-speed conversion optimization, cart upsells, and payment gateway integrations.',
        shopifyProjects.length > 0
          ? `Featured E-commerce Build: ${shopifyProjects[0].title} (${shopifyProjects[0].overview.slice(0, 90)}...)`
          : 'Featured Build: Modest Elegance Apparel (Custom Shopify Storefront).',
      ],
      actions: [
        ...(ecomService
          ? [
              {
                label: 'View E-Commerce Service',
                type: 'navigate' as const,
                route: 'service-detail',
                slug: ecomService.slug,
              },
            ]
          : []),
        ...(shopifyProjects.length > 0
          ? [
              {
                label: `View ${shopifyProjects[0].title} Store`,
                type: 'navigate' as const,
                route: 'case-study',
                slug: shopifyProjects[0].slug,
              },
            ]
          : []),
        {
          label: 'Talk to Shopify Lead on WhatsApp',
          type: 'whatsapp' as const,
          url: buildWhatsAppUrl('Hi! I would like to discuss an e-commerce / Shopify store development project.'),
          isWhatsApp: true,
        },
      ],
      suggestedPrompts: [
        'What services do you offer?',
        'Tell me about your POS system',
        'How can I contact you?',
      ],
    };
  }

  // -------------------------------------------------------------
  // 6. WEBSITE & WEB DEVELOPMENT
  // -------------------------------------------------------------
  if (
    query.includes('website development') ||
    query.includes('web development') ||
    query.includes('web app') ||
    query.includes('build website') ||
    query.includes('next.js') ||
    query.includes('react') ||
    query.includes('frontend')
  ) {
    const webService = data.services.find(
      (s) =>
        s.title.toLowerCase().includes('web') ||
        s.slug.includes('web')
    );

    return {
      message:
        webService?.description ||
        'We design and engineer bespoke, lightning-fast web applications, corporate websites, and interactive 3D digital experiences powered by modern stacks like React 19, Next.js, TypeScript, and Three.js.',
      bulletPoints: [
        'Server-Side Rendered (SSR) & Static Next.js architectures with perfect Core Web Vitals.',
        'Interactive 3D WebGL / Three.js animations and motion experiences.',
        'Robust custom CMS integrations and enterprise admin dashboards.',
      ],
      actions: [
        {
          label: 'View Web Development Details',
          type: 'navigate',
          route: 'service-detail',
          slug: webService ? webService.slug : 'web-development',
        },
        {
          label: 'Consult on WhatsApp',
          type: 'whatsapp',
          url: buildWhatsAppUrl('Hi! I need a high-performance website or web application developed.'),
          isWhatsApp: true,
        },
      ],
      suggestedPrompts: [
        'Show me your projects',
        'Do you build mobile apps?',
        'What are your pricing plans?',
      ],
    };
  }

  // -------------------------------------------------------------
  // 7. CUSTOM SOFTWARE ENGINEERING & CLOUD
  // -------------------------------------------------------------
  if (
    query.includes('custom software') ||
    query.includes('software development') ||
    query.includes('erp') ||
    query.includes('crm') ||
    query.includes('api') ||
    query.includes('cloud') ||
    query.includes('devops') ||
    query.includes('microservices')
  ) {
    return {
      message:
        'We engineer tailor-made enterprise software systems, custom ERPs, internal operations dashboards, microservices, and secure cloud infrastructures configured for high availability.',
      bulletPoints: [
        'Scalable backend systems built with Node.js, TypeScript, Go, or Python.',
        'Multi-tenant database architectures (PostgreSQL, Redis, Firestore).',
        'Automated CI/CD pipelines, containerized Docker deployments, and cloud infrastructure on AWS and Google Cloud.',
      ],
      actions: [
        {
          label: 'Explore Services',
          type: 'navigate',
          route: 'services',
        },
        {
          label: 'Discuss Architecture on WhatsApp',
          type: 'whatsapp',
          url: buildWhatsAppUrl('Hi! I would like to discuss custom software and cloud infrastructure development.'),
          isWhatsApp: true,
        },
      ],
      suggestedPrompts: [
        'Tell me about your POS system',
        'What services do you offer?',
        'How can I contact you?',
      ],
    };
  }

  // -------------------------------------------------------------
  // 8. ALL SERVICES GENERAL OVERVIEW (Requirement #10)
  // -------------------------------------------------------------
  if (
    query.includes('service') ||
    query.includes('what do you offer') ||
    query.includes('what do you do') ||
    query.includes('capabilities') ||
    query.includes('what can you do')
  ) {
    return {
      message: `We offer end-to-end digital engineering and product design services. Here is an overview of our core capabilities:`,
      bulletPoints: data.services.map((item) => `${item.title}: ${item.tagline || item.oneLinePromise}`),
      actions: [
        {
          label: 'Browse All Services',
          type: 'navigate',
          route: 'services',
        },
        {
          label: 'Discuss on WhatsApp',
          type: 'whatsapp',
          url: buildWhatsAppUrl('Hi! I would like to consult on your studio services.'),
          isWhatsApp: true,
        },
      ],
      suggestedPrompts: [
        'Do you build mobile apps?',
        'Tell me about your POS system',
        'Do you build Shopify stores?',
        'Show me your projects',
      ],
    };
  }

  // -------------------------------------------------------------
  // 9. PORTFOLIO & PROJECTS (Requirement #5 & #10)
  // -------------------------------------------------------------
  // Check if user is asking about a specific project by name
  for (const project of data.projects) {
    const pTitle = project.title.toLowerCase();
    const pSlug = project.slug.toLowerCase();
    if (
      query.includes(pTitle) ||
      query.includes(pSlug) ||
      (project.client && query.includes(project.client.toLowerCase()))
    ) {
      return {
        message: `${project.title} (${project.category.toUpperCase()} • ${project.year}): ${project.overview} Developed for ${project.client}.`,
        bulletPoints: [
          `Category: ${project.category} | Year: ${project.year}`,
          project.techStack ? `Tech Stack: ${project.techStack.join(', ')}` : '',
          `Problem Solved: ${project.problem.slice(0, 140)}...`,
          `Key Results: ${project.results.slice(0, 2).map((r) => `${r.metric}: ${r.label}`).join(' | ')}`,
        ].filter(Boolean),
        actions: [
          {
            label: `View Case Study`,
            type: 'navigate',
            route: 'case-study',
            slug: project.slug,
          },
          {
            label: 'Discuss Similar Project on WhatsApp',
            type: 'whatsapp',
            url: buildWhatsAppUrl(`Hi! I reviewed your project "${project.title}" and would like to build something similar.`),
            isWhatsApp: true,
          },
        ],
        suggestedPrompts: [
          'Show me other projects',
          'What services do you offer?',
          'How can I contact you?',
        ],
      };
    }
  }

  // General projects inquiry
  if (
    query.includes('project') ||
    query.includes('portfolio') ||
    query.includes('work') ||
    query.includes('case stud') ||
    query.includes('show me what you made') ||
    query.includes('what have you built')
  ) {
    return {
      message: `We have engineered flagship digital products spanning retail POS, e-commerce, mobile applications, and enterprise platforms:`,
      bulletPoints: data.projects.slice(0, 5).map((p) => `${p.title} (${p.category}): ${p.overview.slice(0, 90)}...`),
      actions: [
        {
          label: 'View Complete Portfolio',
          type: 'navigate',
          route: 'work',
        },
        {
          label: 'Inquire on WhatsApp',
          type: 'whatsapp',
          url: buildWhatsAppUrl('Hi! I reviewed your portfolio and would like to discuss our project.'),
          isWhatsApp: true,
        },
      ],
      suggestedPrompts: [
        'Tell me about your POS system',
        'Do you build mobile apps?',
        'Do you build Shopify stores?',
      ],
    };
  }

  // -------------------------------------------------------------
  // 10. CONTACT INFORMATION & WHATSAPP (Requirement #5, #8, #10)
  // -------------------------------------------------------------
  if (
    query.includes('contact') ||
    query.includes('phone') ||
    query.includes('call') ||
    query.includes('whatsapp') ||
    query.includes('number') ||
    query.includes('email') ||
    query.includes('address') ||
    query.includes('location') ||
    query.includes('office') ||
    query.includes('hours') ||
    query.includes('reach out') ||
    query.includes('touch')
  ) {
    const contact = data.siteConfig.contact;
    return {
      message: `You can reach our engineering & client success team through multiple direct channels:`,
      bulletPoints: [
        `Direct WhatsApp: ${WHATSAPP_NUMBER_RAW} (+${WHATSAPP_INTL})`,
        `Studio Phone: ${contact.phone}`,
        `Email: ${contact.email} / ${contact.formSubmitEmail}`,
        `Studio Address: ${contact.address}, ${contact.cityState}`,
        `Working Hours: ${contact.workingHours}`,
      ],
      actions: [
        {
          label: `Chat on WhatsApp (+${WHATSAPP_INTL})`,
          type: 'whatsapp',
          url: buildWhatsAppUrl('Hi! I would like to speak directly with an Aether technical representative.'),
          isWhatsApp: true,
        },
        {
          label: 'Go to Contact Page',
          type: 'navigate',
          route: 'contact',
        },
      ],
      suggestedPrompts: [
        'What services do you offer?',
        'What are your pricing plans?',
        'Show me your projects',
      ],
    };
  }

  // -------------------------------------------------------------
  // 11. PRICING, ESTIMATES & BUDGETS
  // -------------------------------------------------------------
  if (
    query.includes('price') ||
    query.includes('pricing') ||
    query.includes('cost') ||
    query.includes('rate') ||
    query.includes('how much') ||
    query.includes('budget') ||
    query.includes('quote') ||
    query.includes('estimate')
  ) {
    return {
      message:
        'We offer transparent pricing models tailored to project scope, including sprint-based delivery, fixed-scope milestones, and dedicated engineering retainers.',
      bulletPoints: [
        'Starter / Sprint Tier: Ideal for MVPs, landing experiences, and focused modules.',
        'Growth / Flagship Tier: Multi-platform web & mobile applications, custom POS builds, and complete Shopify stores.',
        'Enterprise Tier: Scalable microservices, multi-store retail sync, dedicated SLA, and 24/7 coverage.',
        'Interactive Estimator: Use our on-site Project Scope Estimator to calculate a tailored cost in seconds.',
      ],
      actions: [
        {
          label: 'Open Pricing & Scope Estimator',
          type: 'navigate',
          route: 'pricing',
        },
        {
          label: 'Get Instant WhatsApp Quote',
          type: 'whatsapp',
          url: buildWhatsAppUrl('Hi! I would like to get a formal quote and timeline estimate for my project.'),
          isWhatsApp: true,
        },
      ],
      suggestedPrompts: [
        'What services do you offer?',
        'Tell me about your POS system',
        'How can I contact you?',
      ],
    };
  }

  // -------------------------------------------------------------
  // 12. SOCIAL MEDIA & EXTERNAL LINKS
  // -------------------------------------------------------------
  if (
    query.includes('social') ||
    query.includes('linkedin') ||
    query.includes('github') ||
    query.includes('twitter') ||
    query.includes('instagram') ||
    query.includes('dribbble')
  ) {
    const socials = data.siteConfig.socials;
    return {
      message: 'You can follow our work and engineering updates across our official social profiles:',
      bulletPoints: socials.map((s) => `${s.name}: ${s.url}`),
      actions: [
        {
          label: 'Chat on WhatsApp',
          type: 'whatsapp',
          url: buildWhatsAppUrl('Hi! I would like to connect with Aether Studio.'),
          isWhatsApp: true,
        },
        {
          label: 'View Contact & Coordinates',
          type: 'navigate',
          route: 'contact',
        },
      ],
      suggestedPrompts: [
        'What services do you offer?',
        'Show me your projects',
      ],
    };
  }

  // -------------------------------------------------------------
  // 13. BLOG & ARTICLES & TECHNICAL INSIGHTS
  // -------------------------------------------------------------
  if (
    query.includes('blog') ||
    query.includes('article') ||
    query.includes('insights') ||
    query.includes('read') ||
    query.includes('technical writing')
  ) {
    const recentPosts = data.blogPosts.slice(0, 3);
    return {
      message: 'Our engineering and design leaders publish technical case studies, architectural blueprints, and performance benchmarks:',
      bulletPoints: recentPosts.map((p) => `"${p.title}" - ${p.category}`),
      actions: [
        {
          label: 'Browse Blog Articles',
          type: 'navigate',
          route: 'blog',
        },
        {
          label: 'Discuss Architecture on WhatsApp',
          type: 'whatsapp',
          url: buildWhatsAppUrl('Hi! I read your engineering articles and would like to discuss technical consulting.'),
          isWhatsApp: true,
        },
      ],
      suggestedPrompts: [
        'Show me your projects',
        'What services do you offer?',
      ],
    };
  }

  // -------------------------------------------------------------
  // 14. DYNAMIC FUZZY / KEYWORD MATCH ACROSS SERVICES & PROJECTS
  // -------------------------------------------------------------
  const matchedService = data.services.find((s) => {
    const text = `${s.title} ${s.description} ${s.tagline} ${s.deliverables.join(' ')} ${s.techStack.join(' ')}`.toLowerCase();
    return query.split(/\s+/).some((word) => word.length > 3 && text.includes(word));
  });

  if (matchedService) {
    return {
      message: `Here is information on ${matchedService.title} from our service catalog: ${matchedService.description}`,
      bulletPoints: [
        `Deliverables: ${matchedService.deliverables.slice(0, 4).join(', ')}`,
        `Tech Stack: ${matchedService.techStack.join(', ')}`,
      ],
      actions: [
        {
          label: `View ${matchedService.title} Details`,
          type: 'navigate',
          route: 'service-detail',
          slug: matchedService.slug,
        },
        {
          label: 'Chat on WhatsApp',
          type: 'whatsapp',
          url: buildWhatsAppUrl(`Hi! I have a question regarding ${matchedService.title}.`),
          isWhatsApp: true,
        },
      ],
      suggestedPrompts: [
        'What other services do you offer?',
        'Show me your projects',
        'How can I contact you?',
      ],
    };
  }

  const matchedProject = data.projects.find((p) => {
    const text = `${p.title} ${p.overview} ${p.problem} ${p.solution} ${p.category} ${p.techStack ? p.techStack.join(' ') : ''}`.toLowerCase();
    return query.split(/\s+/).some((word) => word.length > 3 && text.includes(word));
  });

  if (matchedProject) {
    return {
      message: `Here is information regarding our build "${matchedProject.title}": ${matchedProject.overview}`,
      bulletPoints: [
        `Client: ${matchedProject.client} | Category: ${matchedProject.category}`,
        matchedProject.techStack ? `Technologies: ${matchedProject.techStack.join(', ')}` : '',
      ].filter(Boolean),
      actions: [
        {
          label: `View Case Study`,
          type: 'navigate',
          route: 'case-study',
          slug: matchedProject.slug,
        },
        {
          label: 'Chat on WhatsApp',
          type: 'whatsapp',
          url: buildWhatsAppUrl(`Hi! I would like to discuss a project similar to ${matchedProject.title}.`),
          isWhatsApp: true,
        },
      ],
      suggestedPrompts: [
        'Show me other projects',
        'What services do you offer?',
      ],
    };
  }

  // -------------------------------------------------------------
  // 15. FALLBACK WHEN NOT FOUND (Requirement #7 & #8)
  // "I don't have that information available right now. You can contact our team directly on WhatsApp and we'll be happy to help."
  // "Chat on WhatsApp" -> 923101072246
  // -------------------------------------------------------------
  return getFallbackResponse(rawQuery);
}
