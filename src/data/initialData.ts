import { ServiceItem, ProjectItem, TestimonialItem, BlogPostItem, TeamMemberItem } from '../types';

export const initialServices: ServiceItem[] = [
  {
    id: 'srv-1',
    slug: 'web-development',
    title: 'Web Development',
    tagline: 'High-performance web architecture that turns speed into revenue',
    oneLinePromise: 'Lightning-fast, accessible, and scalable digital platforms built with modern stacks.',
    description: 'We build enterprise-grade web applications, marketing sites, and custom platforms engineered for speed, search visibility, and frictionless user flows. No bloatware or slow templates.',
    iconType: 'code',
    metricHighlight: { label: 'Average Lighthouse Speed Score', value: '99/100' },
    deliverables: [
      'Custom React / Next.js / TypeScript Architecture',
      'API Integrations, Microservices & Headless CMS',
      'Interactive 3D WebGL & Canvas Visuals',
      'Core Web Vitals & Technical SEO Optimization',
      'Continuous Integration & Enterprise Hosting Setup'
    ],
    techStack: ['Next.js', 'React 19', 'TypeScript', 'Node.js', 'Tailwind CSS', 'GraphQL', 'Three.js'],
    processSteps: [
      { step: '01', title: 'System Architecture & Schema', desc: 'Defining data flows, component boundaries, and performance budgets before writing code.' },
      { step: '02', title: 'Interactive Prototype & UI', desc: 'Building high-fidelity interactive components with motion and design system fidelity.' },
      { step: '03', title: 'Full-Stack Implementation', desc: 'Crafting semantic HTML, resilient backend endpoints, and sub-second caching layers.' },
      { step: '04', title: 'QA, Load-Testing & Launch', desc: 'Automated cross-device test suites, security checks, and zero-downtime deployment.' }
    ],
    pricingTiers: [
      {
        tier: 'Sprint Build',
        price: '$6,500',
        period: 'One-time',
        features: ['High-converting 5-page site', 'Modern Next.js / Tailwind stack', 'CMS integration & training', 'Core Web Vitals 95+', '2-week delivery']
      },
      {
        tier: 'Flagship Platform',
        price: '$14,500',
        period: 'One-time',
        recommended: true,
        features: ['Full custom web app or 15+ page site', 'Interactive 3D / motion effects', 'Custom headless CMS / database', 'Advanced analytics & conversion tracking', '30-day post-launch warranty']
      },
      {
        tier: 'Enterprise Retainer',
        price: '$4,800',
        period: '/month',
        features: ['Dedicated engineering squad', 'Bi-weekly sprint releases', 'Performance SLA monitoring', 'Continuous A/B testing', 'Priority 2-hour response time']
      }
    ],
    faq: [
      { q: 'How long does a typical web development build take?', a: 'Marketing and flagship corporate sites generally take 3 to 5 weeks. Complex web applications with authentication and multi-tier databases take 6 to 10 weeks.' },
      { q: 'Do you build on standard CMS platforms or custom code?', a: 'We specialize in headless architectures (Next.js with Sanity, Strapi, or custom API backends) which gives you the editing freedom of a CMS without compromising speed or security.' },
      { q: 'Will our internal marketing team be able to update content?', a: 'Yes! We configure a user-friendly CMS dashboard tailored to your exact schemas so non-technical team members can publish blog posts, case studies, and landing pages effortlessly.' }
    ]
  },
  {
    id: 'srv-2',
    slug: 'graphic-design',
    title: 'Graphic Design',
    tagline: 'Distinctive visual identities and brand collateral that command authority',
    oneLinePromise: 'Memorable brand systems, design tokens, and packaging that outshine competitors.',
    description: 'From complete brand identity overhauls to pitch decks, marketing collateral, and design systems, our designers build cohesive visual languages that resonate deeply with modern buyers.',
    iconType: 'palette',
    metricHighlight: { label: 'Brand Recognition Uplift', value: '+180%' },
    deliverables: [
      'Comprehensive Brand Strategy & Identity Systems',
      'Logo Suites, Typography & Palette Governance',
      'Component Design Systems & Figma Tokens',
      'High-Stakes Investor Pitch Decks & Sales Collateral',
      'Physical Packaging, Print & Merchandise Guidelines'
    ],
    techStack: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Blender 3D', 'After Effects'],
    processSteps: [
      { step: '01', title: 'Brand Discovery & Positioning', desc: 'Auditing competitive spaces, customer psychology, and brand archetypes.' },
      { step: '02', title: 'Concept Direction & Moodboards', desc: 'Exploring 3 distinct conceptual territories before locking in the core identity.' },
      { step: '03', title: 'Identity Refinement & Assets', desc: 'Vectorizing logos, building typography scales, and creating digital collateral.' },
      { step: '04', title: 'Brand Book & Token Handoff', desc: 'Delivering a 60+ page brand manual and organized asset repository.' }
    ],
    pricingTiers: [
      {
        tier: 'Identity Kickstart',
        price: '$4,500',
        period: 'One-time',
        features: ['Core logo mark & typography rules', 'Curated color palette & usage rules', 'Social media kit & stationary', 'Vector asset exports (SVG, PNG, EPS)', '2 rounds of revisions']
      },
      {
        tier: 'Full Brand System',
        price: '$9,800',
        period: 'One-time',
        recommended: true,
        features: ['Complete visual identity & brand manual', '3D brand assets & custom iconography', 'Figma UI design token library', 'Pitch deck & marketing templates', 'Full commercial licensing rights']
      },
      {
        tier: 'Creative Partner Retainer',
        price: '$3,900',
        period: '/month',
        features: ['Up to 40 hours monthly dedicated design', 'Fast 48-hour turnarounds on graphics', 'Ad creatives, banners & sales decks', 'Slack channel direct communication', 'Weekly syncs with Art Director']
      }
    ],
    faq: [
      { q: 'What do we receive at the end of a branding project?', a: 'You receive full ownership of all native source files (Figma, Illustrator), complete vector export packages in all formats, and a comprehensive Brand Guidelines PDF.' },
      { q: 'How many design concepts do you present initially?', a: 'We present 3 distinct visual directions, each grounded in strategic rationale, mockups in real-world contexts, and typography pairings.' }
    ]
  },
  {
    id: 'srv-3',
    slug: 'video-editing',
    title: 'Video Editing',
    tagline: 'Cinematic brand storytelling and high-retention commercial motion',
    oneLinePromise: 'Hook-first brand showreels, social cuts, and 3D product motion that stop the scroll.',
    description: 'We edit compelling brand documentaries, commercial showreels, YouTube series, and viral short-form assets with rhythm, dynamic sound design, and bespoke 3D motion graphics.',
    iconType: 'video',
    metricHighlight: { label: 'Average Watch-Through Rate', value: '78.4%' },
    deliverables: [
      'Commercial Brand Videos & Company Showreels',
      'High-Conversion UGC & Paid Social Video Ad Suites',
      '3D Product Renders & Kinetic Typography Animation',
      'Pro Sound Design, Foley, Mixing & Audio Mastering',
      'Color Grading & Film Grain Cinema Finishing'
    ],
    techStack: ['Premiere Pro', 'DaVinci Resolve Studio', 'After Effects', 'Cinema 4D', 'Ableton Live'],
    processSteps: [
      { step: '01', title: 'Storyboarding & Script Review', desc: 'Crafting the narrative arc, hook within the first 3 seconds, and pacing beats.' },
      { step: '02', title: 'Assembly & Rough Cut', desc: 'Selecting best takes, syncing multitrack audio, and establishing visual rhythm.' },
      { step: '03', title: 'Motion Graphics & Sound Design', desc: 'Layering custom sound effects, kinetic captions, and subtle 3D transitions.' },
      { step: '04', title: 'Color Grade & Multiformat Deliveries', desc: '16:9 4K mastering and 9:16 vertical exports with frame.io review links.' }
    ],
    pricingTiers: [
      {
        tier: 'Commercial Cut',
        price: '$3,200',
        period: 'Per video',
        features: ['Up to 90-second brand video', 'Custom sound design & licensed music', 'Motion graphics & color grading', '16:9 and 9:16 vertical cutdowns', '3 business day turnaround']
      },
      {
        tier: 'Growth Content Suite',
        price: '$6,800',
        period: '/month',
        recommended: true,
        features: ['8 high-impact short-form videos/mo', '2 long-form YouTube / podcast cuts', 'Scripting assistance & hook testing', 'Dedicated video editor & motion designer', 'Frame.io rapid feedback portal']
      },
      {
        tier: 'Cinematic 3D Showreel',
        price: '$12,000',
        period: 'One-time',
        features: ['Full 3D product modeling & staging', 'Custom orchestral sound composition', 'Broadcast-ready 4K 60fps renders', 'Teaser trailers & web video background loops', 'Full RAW assets handoff']
      }
    ],
    faq: [
      { q: 'What is your turnaround time for video edits?', a: 'Standard commercial cuts are delivered for first review within 72 hours. Revisions are completed within 24 hours via Frame.io.' },
      { q: 'Can you work with footage we already shot?', a: 'Absolutely. We regularly transform client raw footage, iPhone captures, or Zoom interviews into polished cinematic content.' }
    ]
  },
  {
    id: 'srv-4',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    tagline: 'Predictable growth engineering combining paid acquisition and technical SEO',
    oneLinePromise: 'Data-driven paid media, search dominance, and conversion rate optimization (CRO).',
    description: 'We do not sell vanity impressions. We architect full-funnel acquisition engines across Google Ads, Meta, LinkedIn, and programmatic search that demonstrably increase bottom-line revenue.',
    iconType: 'trending',
    metricHighlight: { label: 'Average Client ROAS Across Portfolios', value: '4.8x' },
    deliverables: [
      'Multi-Channel Paid Ads (Google, Meta, TikTok, LinkedIn)',
      'Programmatic & Technical SEO Architecture',
      'Full-Funnel Conversion Rate Optimization (CRO)',
      'Custom Multi-Touch Attribution Dashboards',
      'Retention Email Marketing & SMS Automation (Klaviyo)'
    ],
    techStack: ['Google Ads', 'Meta Ads Manager', 'GA4 & BigQuery', 'PostHog', 'Ahrefs', 'Klaviyo'],
    processSteps: [
      { step: '01', title: 'Funnel Audit & Tracking Verification', desc: 'Fixing server-side tracking, Conversion API, and identifying leakage points.' },
      { step: '02', title: 'Audience Strategy & Creative Testing', desc: 'Deploying dynamic creative tests to identify winning hooks and lowest CAC.' },
      { step: '03', title: 'Scaling Profitable Channels', desc: 'Reallocating spend into top performers with algorithmic budget rules.' },
      { step: '04', title: 'Retention & Lifetime Value (LTV)', desc: 'Maximizing repeat purchase rates and referral loops.' }
    ],
    pricingTiers: [
      {
        tier: 'SEO Foundation',
        price: '$3,500',
        period: '/month',
        features: ['Complete technical SEO overhaul', '4 high-ranking pillar articles/mo', 'Backlink acquisition campaign', 'Monthly organic growth reporting', 'Google Search Console optimization']
      },
      {
        tier: 'Performance Acquisition',
        price: '$5,500',
        period: '/month',
        recommended: true,
        features: ['Full management of Google & Meta ads', 'Up to $50k/mo ad spend managed', 'Weekly creative design & copy updates', 'Real-time Looker Studio dashboard', 'Dedicated Senior Growth Strategist']
      },
      {
        tier: 'Omnichannel Scale',
        price: '$9,500',
        period: '/month',
        features: ['Omnichannel: Search, Social, YouTube, Email', 'Unlimited ad creative production', 'Bi-weekly CRO multivariate tests', 'Custom server-side attribution modeling', 'Direct founder access & weekly sprints']
      }
    ],
    faq: [
      { q: 'How quickly do we see results from paid campaigns?', a: 'Initial campaign learning phase takes 7–14 days. Most clients achieve profitable unit economics and consistent ROAS scaling within the first 30 days.' },
      { q: 'Does your fee include the advertising budget?', a: 'No, ad spend is billed directly by Google or Meta to your corporate card. Our fee covers strategy, creative production, campaign management, and optimization.' }
    ]
  },
  {
    id: 'srv-5',
    slug: 'shopify-development',
    title: 'Shopify Development',
    tagline: 'High-converting custom Shopify Plus storefronts that scale to millions',
    oneLinePromise: 'Bespoke Liquid & Headless Shopify stores with sub-second speeds and maximum AOV.',
    description: 'We design and engineer tailored Shopify Plus stores with bespoke UX, custom checkout extensions, seamless ERP/inventory integrations, and speed-optimized architectures.',
    iconType: 'shopping-bag',
    metricHighlight: { label: 'Average Client Conversion Rate', value: '4.2%' },
    deliverables: [
      'Custom Shopify 2.0 & Shopify Plus Theme Engineering',
      'Headless Commerce with Hydrogen / Next.js',
      'Custom Checkout Extensibility & Upsell Flows',
      'ERP, WMS, CRM & Custom API Synchronization',
      'International Multi-Currency & Localization Setup'
    ],
    techStack: ['Shopify Plus', 'Liquid', 'Hydrogen', 'GraphQL Admin API', 'Klaviyo', 'Recharge'],
    processSteps: [
      { step: '01', title: 'E-Commerce UX & Cart Flow Audit', desc: 'Analyzing purchase journey drop-offs, catalog hierarchy, and mobile checkout.' },
      { step: '02', title: 'Custom Theme Design & UI Kit', desc: 'Crafting brand-aligned product pages, quick-views, and predictive cart drawers.' },
      { step: '03', title: 'Performant Liquid / Hydrogen Code', desc: 'Writing clean, zero-bloat code with conditional asset loading for speed.' },
      { step: '04', title: 'Integrations, Migration & Launch', desc: 'Zero data loss customer and order migration, QA tests, and launch checklist.' }
    ],
    pricingTiers: [
      {
        tier: 'Custom Storefront',
        price: '$8,500',
        period: 'One-time',
        features: ['Custom Shopify 2.0 theme design', 'Up to 25 catalog products setup', 'Mobile-first cart drawer & upsells', 'Klaviyo email flows integration', '3-week fast turnaround']
      },
      {
        tier: 'Shopify Plus Flagship',
        price: '$18,500',
        period: 'One-time',
        recommended: true,
        features: ['Enterprise Shopify Plus architecture', 'Custom Checkout Extensibility & bundles', 'ERP/WMS custom API connection', 'Multi-currency & multi-language localization', 'Speed guarantee: <1.8s load time']
      },
      {
        tier: 'E-Commerce Optimization Retainer',
        price: '$4,200',
        period: '/month',
        features: ['Continuous conversion rate testing', 'Monthly promotional banner drops', 'App stack audit & speed maintenance', 'Custom feature development', 'Dedicated Shopify tech lead']
      }
    ],
    faq: [
      { q: 'Can you migrate our store from WooCommerce or Magento without losing SEO rankings?', a: 'Yes. We run 1-to-1 URL redirect mappings, transfer customer passwords/data securely, and preserve Google organic indexing flawlessly.' },
      { q: 'Do you support custom B2B pricing and wholesale portals?', a: 'Yes, with Shopify Plus B2B or custom app extensions, we configure tiered wholesale pricing, Net-30 payment terms, and custom catalogs.' }
    ]
  },
  {
    id: 'srv-6',
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    tagline: 'Fluid, cross-platform iOS & Android mobile products with native 60fps performance',
    oneLinePromise: 'High-performance React Native & Flutter mobile apps engineered for speed, conversion, and global App Store scale.',
    description: 'We design and engineer enterprise-grade mobile applications built for high retention, frictionless onboarding, offline persistence, and seamless App Store approval. From biometric authentication to real-time telemetry, we bring craft to mobile devices.',
    iconType: 'smartphone',
    metricHighlight: { label: 'Average App Store Rating Across Launches', value: '4.9★' },
    deliverables: [
      'Cross-Platform React Native & Flutter Engineering',
      'Native Swift (iOS) and Kotlin (Android) Bridge Modules',
      'Offline-First Local SQLite / WatermelonDB Storage Engine',
      'In-App Purchases (StoreKit 2 & Google Play Billing)',
      'Real-Time WebSocket Sync & Push Notifications (FCM / APNs)',
      'Automated App Store Review & CI/CD Deployment Pipeline'
    ],
    techStack: ['React Native', 'Flutter', 'TypeScript', 'Swift', 'Kotlin', 'Firebase', 'GraphQL', 'Tailwind'],
    processSteps: [
      { step: '01', title: 'Mobile Architecture & Interaction UX', desc: 'Mapping ergonomic thumb zones, haptic feedback points, and resilient state flows.' },
      { step: '02', title: 'Modular Core & Navigation', desc: 'Building responsive layouts, smooth native gesture handlers, and navigation trees.' },
      { step: '03', title: 'Device Hardware & Offline Sync', desc: 'Wiring biometrics, camera, background tasks, and conflict-free data replication.' },
      { step: '04', title: 'Store Submission & Launch Monitoring', desc: 'Zero-rejection App Store submissions, privacy compliance, and crash diagnostics.' }
    ],
    pricingTiers: [
      {
        tier: 'Sprint MVP',
        price: '$9,500',
        period: 'One-time',
        features: ['Cross-platform iOS & Android MVP', 'Auth & secure onboarding flows', 'Offline sync & cloud database', 'Push notifications integration', '4-week delivery turnaround']
      },
      {
        tier: 'Flagship Mobile Product',
        price: '$21,000',
        period: 'One-time',
        recommended: true,
        features: ['Full bespoke iOS & Android app', 'In-app subscriptions & Apple/Google Pay', 'Real-time WebSockets & telemetry', 'Custom haptics & 60fps micro-motion', 'App Store & Play Store approval guarantee']
      },
      {
        tier: 'Mobile Squad Retainer',
        price: '$5,200',
        period: '/month',
        features: ['Dedicated mobile tech lead & QA squad', 'Bi-weekly App Store sprint releases', 'OS version updates & zero-crash SLA', 'A/B onboarding experiments', 'Priority 2-hour response time']
      }
    ],
    faq: [
      { q: 'Do you build native or cross-platform mobile apps?', a: 'We build with React Native and Flutter for unified 60fps performance across iOS and Android from one codebase, adding custom native Swift/Kotlin modules when low-level OS access is required.' },
      { q: 'Will you guarantee App Store and Google Play approval?', a: 'Yes. We manage all app certificates, compliance checklists, privacy nutrition labels, and Apple review guidelines until your application is officially approved and live.' },
      { q: 'How does offline data synchronization work?', a: 'We architect offline-first data stores with local caching and optimistic UI updates. When network connectivity restores, changes reconcile automatically without data loss.' }
    ]
  },
  {
    id: 'srv-7',
    slug: 'ecommerce-complete-solution',
    title: 'E-commerce Complete Solution',
    tagline: 'End-to-end digital commerce ecosystems uniting storefronts, ERPs, and retention funnels',
    oneLinePromise: 'Turnkey 360° commerce: headless storefronts, multi-warehouse sync, custom checkout, and automated marketing.',
    description: 'A complete end-to-end commerce solution for ambitious consumer brands. We build high-converting headless storefronts, integrate complex ERP/WMS supply chain networks, deploy 1-click checkout extensions, and engineer automated marketing funnels that accelerate customer lifetime value.',
    iconType: 'store',
    metricHighlight: { label: 'Average Client Year-1 GMV Growth', value: '+320%' },
    deliverables: [
      'Headless Storefront (Next.js Commerce / Hydrogen / Medusa)',
      'Automated ERP, WMS, CRM & Multi-Location Inventory Sync',
      'Frictionless 1-Page Checkout with Dynamic Post-Purchase Upsells',
      'Global Multi-Currency, Internationalization & Tax Compliance',
      'Automated Klaviyo Lifecycle Flows (Cart Recovery, VIP, Win-back)',
      'Predictive AI Search, Dynamic Bundling & Subscription Engines'
    ],
    techStack: ['Next.js Commerce', 'Shopify Plus', 'Medusa.js', 'Stripe', 'Algolia', 'Klaviyo', 'PostgreSQL', 'Tailwind'],
    processSteps: [
      { step: '01', title: 'Commerce Architecture & Stack Audit', desc: 'Evaluating catalog depth, supply chain APIs, fulfillment logistics, and revenue targets.' },
      { step: '02', title: 'High-Converting UX & Checkout Design', desc: 'Designing sub-second product pages, predictive search, and 1-click cart flows.' },
      { step: '03', title: 'Full-Stack Integration & Automation', desc: 'Connecting ERP inventory streams, automated taxation, custom carrier rates, and CRM.' },
      { step: '04', title: 'High-Concurrency Testing & Launch', desc: 'Simulating flash-sale traffic spikes, validating automated order routing, and going live.' }
    ],
    pricingTiers: [
      {
        tier: 'Commercial Turnkey',
        price: '$12,500',
        period: 'One-time',
        features: ['Full storefront architecture', 'Catalog setup up to 100 SKUs', 'Automated payment & shipping rules', 'Klaviyo lifecycle email setup', '4-week delivery turnaround']
      },
      {
        tier: 'Omnichannel Enterprise',
        price: '$28,000',
        period: 'One-time',
        recommended: true,
        features: ['Complete end-to-end commerce ecosystem', 'Custom real-time ERP / WMS synchronization', 'Multi-country & multi-currency rollout', 'Custom checkout extensibility & bundles', '90-day post-launch warranty & SLA']
      },
      {
        tier: 'Commerce Growth Partner',
        price: '$6,500',
        period: '/month',
        features: ['Dedicated commerce engineer & CRO strategist', 'Weekly multivariate checkout experiments', 'Continuous catalog expansion & drops', 'Speed & security SLA monitoring', 'Direct founder access & weekly sprints']
      }
    ],
    faq: [
      { q: 'How does E-commerce Complete Solution differ from standard Shopify development?', a: 'Standard Shopify development focuses on theme templates and front-end design. Our Complete Solution is an end-to-end operational engine: connecting your backend ERP/warehouse logistics, multi-channel inventory feeds, custom subscription infrastructure, automated email/SMS retention funnels, and checkout extensibility.' },
      { q: 'Can you migrate hundreds of thousands of customer and order records?', a: 'Yes. We build custom ETL migration scripts that transfer customer profiles, hashed passwords where supported, order histories, and SKU variants with zero downtime or lost customer data.' },
      { q: 'Does this solution support B2B wholesale and direct-to-consumer together?', a: 'Yes. We implement hybrid B2C/B2B catalogs featuring custom wholesale tiered pricing, Net-30 invoicing, minimum order quantities, and tax exemption workflows alongside your retail storefront.' }
    ]
  }
];

export const initialProjects: ProjectItem[] = [
  // 12. MR Clothing Craft — Retail POS System (Flagship Custom Business Management System)
  {
    id: 'proj-mr-pos',
    slug: 'mr-clothing-craft-pos-system',
    title: 'MR Clothing Craft — Retail POS & Enterprise Management System',
    client: 'MR Clothing Craft',
    category: 'E-commerce Complete Solution',
    portfolioCategory: 'Business Management Systems',
    portfolioCategories: ['Business Management Systems', 'Web Applications', 'E-commerce'],
    platform: 'Custom Web Application / Retail POS',
    featured: true,
    year: '2025',
    duration: '12 Weeks',
    thumbnail: 'https://portfolio-tawny-three-y7gnkz8y3r.vercel.app/POS%20REGISTER.png',
    heroImage: 'https://portfolio-tawny-three-y7gnkz8y3r.vercel.app/POS%20REGISTER.png',
    overview: 'Complete in-house Retail POS and Business Management System developed to manage and streamline end-to-end retail operations. Includes 29 specialized screens, 40+ production features, 159 API endpoints, and 28 database models.',
    problem: 'Managing high-velocity physical checkout counters alongside an active online Shopify store led to inventory discrepancies, manual billing delays, and disconnected customer order histories.',
    solution: 'Engineered a tailored Retail Operating System spanning 29 specialized screens, 40+ production features, 159 API endpoints, and 28 database models. Fully connected with Shopify for real-time synchronization of products, inventory, orders, and customers, backed by sub-second barcode billing, role-based access control, and WhatsApp automated notifications.',
    techStack: ['React', 'TypeScript', 'Node.js / Express', 'PostgreSQL', 'Shopify Bi-directional Webhooks', 'WhatsApp Cloud API'],
    keyFeatures: [
      'POS Billing & High-Speed Barcode Checkout',
      'Multi-Store Inventory & Real-Time Stock Management',
      'Product, Size & Color Variant Management',
      'Customer CRM & Purchase History',
      'Shopify Integration & Real-Time 2-Way Sync',
      'Staff & HR Management with Shift Logs',
      'Cash Management, Float Sessions & Expenses',
      'Sales Analytics & Comprehensive Business Reports',
      'Automated WhatsApp Notification Engine',
      'Embedded AI Assistant for Sales Intelligence',
      'Role-Based Access Control (RBAC) & Audit Logs',
      'Offline Queue Support & Instant Re-Sync'
    ],
    results: [
      { metric: '29', label: 'Production Screens' },
      { metric: '40+', label: 'Core Features' },
      { metric: '159', label: 'API Endpoints' },
      { metric: '28', label: 'Database Models' }
    ],
    clientQuote: {
      quote: 'Alhamdulillah, we have successfully completed our MR Clothing Craft POS System. With 29 screens, 40+ features, 159 API endpoints and 28 database models, this is much more than a basic POS — it is our complete Retail Operating System that keeps inventory, billing, Shopify, and WhatsApp in perfect sync.',
      author: 'MR Clothing Craft Team',
      role: 'Retail Operations & Brand Leadership',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
    },
    deliverables: [
      '29-Screen Cloud POS & Operations Management Suite',
      'Real-Time 2-Way Shopify Bi-Directional Sync Engine',
      'Sub-Second Barcode POS Billing & Cash Drawer Sessions',
      'Multi-Location Inventory Management & SKU Matrix',
      'Customer Management & Automated WhatsApp Notification Engine',
      'Staff, HR, Role-Based Access Control (RBAC) & Audit Logs',
      'Expense Tracking, Cash Float Management & Financial Reports',
      'Embedded AI Assistant for Sales Intelligence & Forecasting'
    ],
    liveUrl: 'https://portfolio-tawny-three-y7gnkz8y3r.vercel.app/'
  },

  // 11. MR Clothing Craft — Shopify E-Commerce Store
  {
    id: 'proj-mr-store',
    slug: 'mr-clothing-craft-ecommerce-shopify',
    title: 'MR Clothing Craft — Premium Men’s Fashion E-Commerce Store',
    client: 'MR Clothing Craft',
    category: 'Shopify Development',
    portfolioCategory: 'E-commerce',
    portfolioCategories: ['E-commerce', 'Websites'],
    platform: 'Shopify E-commerce Website',
    featured: true,
    year: '2025',
    duration: '6 Weeks',
    thumbnail: 'https://github.com/mrclothingcraft/img/blob/main/mrclothingcraft.png?raw=true',
    heroImage: 'https://github.com/mrclothingcraft/img/blob/main/mrclothingcraft.png?raw=true',
    overview: 'A premium men’s fashion e-commerce store built on Shopify with curated seasonal collections, variant sizing matrix, online ordering, promotional pricing, and mobile-first shopping experience.',
    problem: 'The brand required a luxury digital storefront capable of showcasing artisanal tailoring, fabric details, and complex size variants without sacrificing mobile page speeds.',
    solution: 'Designed and developed a bespoke Shopify storefront featuring high-resolution swatch switchers, 1-click checkout optimization, integrated customer reviews, and automated marketing lifecycle flows.',
    techStack: ['Shopify Plus', 'Liquid Engine', 'Tailwind CSS', 'JavaScript ES6+', 'Klaviyo Automation'],
    keyFeatures: [
      'Curated Seasonal Collections & Lookbooks',
      'Fabric, Fit & Size Variant Selector Matrix',
      'Frictionless 1-Click Fast Checkout & Express Payment Options',
      'Promotional Pricing, Volume Bundles & Discount Rules',
      'Mobile-First Responsive Design with Instant Cart Drawer'
    ],
    results: [
      { metric: '+215%', label: 'Mobile Conversion Rate' },
      { metric: '1.2s', label: 'Mobile Page Load Speed' },
      { metric: '3.8x', label: 'Average Order Value Increase' }
    ],
    clientQuote: {
      quote: 'Our online storefront reflects the exact craftsmanship and premium experience our customers feel in person. Conversions have more than doubled since launch.',
      author: 'MR Clothing Craft Team',
      role: 'E-Commerce Operations',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
    },
    deliverables: [
      'Bespoke Shopify Plus Theme Architecture',
      'Variant Matrix & Custom Size Selection Guides',
      'Fast Mobile Cart Drawer & Express Checkout',
      'Automated Inventory Synchronization with POS',
      'Customer Loyalty & Promotional Campaign Engine'
    ],
    liveUrl: 'https://www.mrclothingcraft.com/'
  },

  // 7. FixTman — Service Booking Platform (Web)
  {
    id: 'proj-fixtman-web',
    slug: 'fixtman-service-booking-platform',
    title: 'FixTman — Online Service Booking & Dispatch Platform',
    client: 'FixTman',
    category: 'Web Development',
    portfolioCategory: 'Booking Platforms',
    portfolioCategories: ['Booking Platforms', 'Websites', 'Web Applications'],
    platform: 'Website / Online Booking Platform',
    featured: true,
    year: '2024',
    duration: '8 Weeks',
    thumbnail: 'https://github.com/mrclothingcraft/img/blob/main/FixTman.png?raw=true',
    heroImage: 'https://github.com/mrclothingcraft/img/blob/main/FixTman.png?raw=true',
    overview: 'High-converting online web booking platform enabling customers to enter their ZIP code, select TV mounting specifications, customize hardware mounts, and reserve technician appointment slots in under 60 seconds.',
    problem: 'Customer drop-off was high on traditional phone-in booking funnels, and dispatchers spent hours calculating travel radiuses and parts inventory manually.',
    solution: 'Architected a frictionless 4-step progressive web booking engine with dynamic ZIP code geofencing, real-time technician calendar availability, bracket upsells, and Stripe checkout.',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Stripe Embedded Checkout', 'Google Geocoding API'],
    keyFeatures: [
      'Dynamic ZIP-Code Radius & Technician Availability Engine',
      'Custom TV Size, Wall Type & Mount Selection Matrix',
      'Real-Time Technician Calendar Slot Reservation',
      'Stripe Checkout with Instant SMS Confirmation',
      'Automated Upsell Funnel for Cables & Soundbars'
    ],
    results: [
      { metric: '+48%', label: 'Online Booking Conversion Rate' },
      { metric: '<60s', label: 'Average Booking Completion' },
      { metric: '$0', label: 'Manual Phone Dispatch Overhead' }
    ],
    clientQuote: {
      quote: 'FixTman’s online booking portal turned a chaotic scheduling process into our primary growth engine. Customers book complex TV mounting jobs effortlessly.',
      author: 'FixTman Leadership',
      role: 'Operations Director',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80'
    },
    deliverables: [
      'Interactive Multi-Step Booking Funnel',
      'Dynamic ZIP Code Geo-Verification Service',
      'Real-Time Technician Scheduling API',
      'Stripe Payment Gateway Integration',
      'Customer SMS & Email Automated Dispatch Confirmations'
    ],
    liveUrl: 'https://fixtman.com/booking/tv-wall-mounting?zip=78015'
  },

  // 8. Utak — Dashboard
  {
    id: 'proj-utak-dashboard',
    slug: 'utak-pos-analytics-dashboard',
    title: 'Utak — Cloud POS Back-Office & Business Analytics Dashboard',
    client: 'Utak POS',
    category: 'Web Development',
    portfolioCategory: 'Web Applications',
    portfolioCategories: ['Web Applications', 'Business Management Systems'],
    platform: 'Web Dashboard / Platform',
    featured: true,
    year: '2024',
    duration: '12 Weeks',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop&q=80',
    overview: 'Enterprise-grade web dashboard and cloud POS back-office powering multi-branch retail stores, restaurants, and hospitality businesses with real-time financial reporting, inventory tracking, and staff management.',
    problem: 'Multi-store franchise owners had fragmented data across physical counters with delayed end-of-day sales reporting and complex inventory reconciliations.',
    solution: 'Constructed a high-concurrency React dashboard with real-time WebSockets feed, interactive financial revenue visualizers, inventory depletion heatmaps, employee shift audits, and automated tax exports.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts & D3.js', 'Node.js', 'WebSockets'],
    keyFeatures: [
      'Live Multi-Outlet Sales & Gross Margin Metrics',
      'Real-Time Inventory Stock Depletion & Low-Stock Alerts',
      'Employee Attendance, Shift Audits & Role Permissions',
      'Automated Daily / Monthly Tax Reconciliation Reports',
      'Instant Menu & Price Publishing Across All Registers'
    ],
    results: [
      { metric: '10,000+', label: 'Active Retail Registers' },
      { metric: '<200ms', label: 'Live Data Refresh Latency' },
      { metric: '99.99%', label: 'Mission-Critical Cloud Uptime' }
    ],
    clientQuote: {
      quote: 'The Utak dashboard handles high transaction volumes across thousands of stores smoothly. Store owners love the clarity and live analytics.',
      author: 'Utak Product Team',
      role: 'Head of Engineering',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80'
    },
    deliverables: [
      'Multi-Tenant Cloud Analytics Web Dashboard',
      'Real-Time WebSockets Sales Telemetry Pipeline',
      'Multi-Location Inventory Management Console',
      'Staff Attendance & Role Permission Matrices',
      'Exportable Financial Accounting & Tax Reports'
    ],
    liveUrl: 'https://utak.io/dashboard'
  },

  // 9. PiggyRide — Kids Learning & Activity Discovery Web Platform
  {
    id: 'proj-piggyride',
    slug: 'piggyride-edtech-discovery-platform',
    title: 'PiggyRide — Kids Learning & Activity Discovery Web Platform',
    client: 'PiggyRide',
    category: 'Web Development',
    portfolioCategory: 'Websites',
    portfolioCategories: ['Websites', 'Booking Platforms', 'Web Applications'],
    platform: 'Web Platform',
    featured: true,
    year: '2024',
    duration: '12 Weeks',
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&auto=format&fit=crop&q=80',
    overview: 'Dynamic discovery and booking platform for extracurricular kids classes, live interactive workshops, sports coaching, and verified instructor academies.',
    problem: 'Parents struggled to find vetted extracurricular tutors, while instructors lacked an integrated platform for batch scheduling, demo bookings, and fee collections.',
    solution: 'Architected a responsive multi-category learning portal with course discovery filters, video tutor profiles, instant 1-click free trial demo scheduling, and multi-currency global payment gateways.',
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Razorpay & Stripe', 'AWS Microservices'],
    keyFeatures: [
      'Interactive Course Finder across Arts, Coding, Music & Languages',
      '1-Click Free Trial Demo Class Booking Funnel',
      'Parent Student Portal with Assignment & Attendance Tracking',
      'Instructor Dashboard with Batch Scheduling & Payouts',
      'Automated WhatsApp & Email Schedule Notifications'
    ],
    results: [
      { metric: '250K+', label: 'Students Enrolled' },
      { metric: '3,000+', label: 'Vetted Master Instructors' },
      { metric: '4.9★', label: 'Parent Satisfaction Score' }
    ],
    clientQuote: {
      quote: 'PiggyRide gives parents complete confidence when discovering and booking classes for their children. The user experience is vibrant, fast, and secure.',
      author: 'PiggyRide Founders',
      role: 'Product Leadership',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
    },
    deliverables: [
      'High-Traffic EdTech Discovery Marketplace',
      'Free Trial Demo Booking Flow with Instant Reminders',
      'Tutor Management Portal & Video Hosting Integration',
      'Multi-Currency Secure Online Payments',
      'Responsive Mobile-First Parent Web Portal'
    ],
    liveUrl: 'https://www.piggyride.com/3'
  },

  // 10. Visage Golf / VCC Connect — Golf Fleet Telematics & Course Operations
  {
    id: 'proj-visage-golf',
    slug: 'visage-golf-vcc-connect-platform',
    title: 'Visage Golf / VCC Connect — Golf Fleet Telematics & Operations',
    client: 'Visage Golf',
    category: 'Web Development',
    portfolioCategory: 'Web Applications',
    portfolioCategories: ['Web Applications', 'Business Management Systems'],
    platform: 'Web Application / Golf Platform',
    featured: true,
    year: '2024',
    duration: '14 Weeks',
    thumbnail: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1000&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1600&auto=format&fit=crop&q=80',
    overview: 'Connected golf fleet telematics, GPS vehicle management, and tournament scoring control web application engineered for premier golf course operators and clubhouses.',
    problem: 'Clubhouse marshals lacked visibility into golf cart fleet locations, leading to severe course bottlenecks, pace-of-play delays, and unauthorized fairway trespassing.',
    solution: 'Built a mission-critical web application providing real-time GPS cart tracking, interactive geofencing boundary controls, pace-of-play automated warnings, and clubhouse F&B ordering integrations.',
    techStack: ['React', 'TypeScript', 'Mapbox GL / Leaflet', 'WebSockets IoT Telemetry', 'Golang API'],
    keyFeatures: [
      'Real-Time GPS Fleet Cart Tracking on Interactive Course Maps',
      'Dynamic Geofencing with Remote Cart Speed Restrictors',
      'Pace-of-Play Bottleneck Telemetry & Marshal Alerts',
      'Tournament Leaderboards & Digital Hole Scorecards',
      'Clubhouse Food & Beverage On-Course Cart Ordering'
    ],
    results: [
      { metric: '100+', label: 'Championship Golf Courses' },
      { metric: '-28 min', label: 'Average Round Pace Reduction' },
      { metric: '10,000+', label: 'Connected Smart Golf Carts' }
    ],
    clientQuote: {
      quote: 'VCC Connect revolutionized our course operations. Marshals monitor pace of play in real time, and cart maintenance downtime dropped by 35%.',
      author: 'Visage Course Operations',
      role: 'Director of Golf Technology',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80'
    },
    deliverables: [
      'Live GPS Course Map Telematics Interface',
      'Dynamic Cart Geofencing & Exclusion Zone Engine',
      'Pace-of-Play Analytics & Automated Warning Dispatch',
      'Clubhouse F&B Cart Ordering Pipeline',
      'Cloud IoT Vehicle Health & Battery Telemetry'
    ],
    liveUrl: 'https://dev-vcc-connect.visage.golf/'
  },

  // 1. Masjidi (Mobile App — Android)
  {
    id: 'proj-masjidi',
    slug: 'masjidi-islamic-prayer-app',
    title: 'Masjidi — Islamic Prayer Times, Azan & Mosque Finder',
    client: 'Masjidi App',
    category: 'Mobile App Development',
    portfolioCategory: 'Mobile Apps',
    portfolioCategories: ['Mobile Apps'],
    platform: 'Mobile App — Android',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.masjidiapp',
    liveUrl: 'https://play.google.com/store/apps/details?id=com.masjidiapp',
    featured: true,
    year: '2024',
    duration: '8 Weeks',
    thumbnail: 'https://github.com/mrclothingcraft/img/blob/main/Masjidi.png?raw=true',
    heroImage: 'https://github.com/mrclothingcraft/img/blob/main/Masjidi.png?raw=true',
    overview: 'Comprehensive Islamic companion mobile application providing ultra-precise location-based prayer timings, Azan alerts, interactive Qibla compass, and nearby mosque GPS navigation.',
    problem: 'Muslims worldwide often struggle with inconsistent prayer time algorithms across international time zones and battery-draining background location updates.',
    solution: 'Engineered a battery-optimized Android application using high-precision astronomical calculation algorithms, background audio Azan notifications, offline SQLite cached schedules, and live Google Maps Mosque locator.',
    techStack: ['Android Native', 'Kotlin', 'SQLite Local DB', 'Google Maps SDK', 'Android AlarmManager'],
    keyFeatures: [
      'Ultra-Precise Astronomical Prayer Calculations',
      'Audio Azan Notifications with Custom Muezzin Tones',
      'Interactive 360° Real-Time Qibla Compass',
      'Nearby Mosque Finder with Turn-by-Turn GPS',
      'Offline Holy Quran Reader with Audio Recitations'
    ],
    results: [
      { metric: '500K+', label: 'Active Daily Users' },
      { metric: '4.8★', label: 'Google Play Store Rating' },
      { metric: '99.9%', label: 'Push Notification Reliability' }
    ],
    clientQuote: {
      quote: 'Masjidi combines spiritual reverence with modern, battery-efficient mobile engineering. The response on Google Play has been phenomenal.',
      author: 'Masjidi Product Team',
      role: 'Lead Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
    },
    deliverables: [
      'Native Android APK & Google Play Store Publishing',
      'Astronomical Calculation Engine with Offline Algorithms',
      'Background Audio Azan Alarm System',
      'Interactive Compass Sensor Qibla Direction',
      'Google Maps Proximity API Nearby Mosque Locator'
    ]
  },

  // 2. Yara Connect (Mobile App — Android)
  {
    id: 'proj-yara-connect',
    slug: 'yara-connect-retailer-loyalty',
    title: 'Yara Connect — Agriculture Retailer Loyalty & Rewards',
    client: 'Yara International',
    category: 'Mobile App Development',
    portfolioCategory: 'Mobile Apps',
    portfolioCategories: ['Mobile Apps', 'Business Management Systems'],
    platform: 'Mobile App — Android',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.yara.connect.prod',
    liveUrl: 'https://play.google.com/store/apps/details?id=com.yara.connect.prod',
    featured: true,
    year: '2024',
    duration: '14 Weeks',
    thumbnail: 'https://github.com/mrclothingcraft/img/blob/main/yara.png?raw=true',
    heroImage: 'https://github.com/mrclothingcraft/img/blob/main/yara.png?raw=true',
    overview: 'Enterprise mobile loyalty platform and distributor rewards application connecting agricultural retailers, farmers, and dealers across emerging markets.',
    problem: 'Distributors faced fraudulent voucher claims, slow paper rewards distribution, and lack of real-time sales visibility across rural dealer networks.',
    solution: 'Built a secure Android mobile ecosystem featuring tamper-proof QR code scanning for product authentication, instant digital rewards redemption, tiered incentive rankings, and multi-language agronomy advisory guides.',
    techStack: ['Flutter', 'Android SDK', 'High-Speed QR Scanner', 'Enterprise ERP API', 'Firebase Analytics'],
    keyFeatures: [
      'Instant QR Code Scan & Earn Rewards Engine',
      'Dealer Tier Progression & Milestone Bonuses',
      'Real-Time Digital Wallet & Gift Card Cashout',
      'Complete Agricultural Product Catalog & Dosages',
      'Multi-Lingual Localization for Regional Dialects'
    ],
    results: [
      { metric: '100K+', label: 'Verified Retailers' },
      { metric: '1.2M+', label: 'QR Fertilizer Bags Scanned' },
      { metric: '98.5%', label: 'Instant Payout Success' }
    ],
    clientQuote: {
      quote: 'Yara Connect brought complete transparency to our rural distribution supply chain. Retailers get rewarded instantly and sales velocity has skyrocketed.',
      author: 'Yara Digital Team',
      role: 'Head of Rural Distribution Tech',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
    },
    deliverables: [
      'Enterprise Flutter Android Application',
      'High-Speed Anti-Fraud QR Code Scanner Engine',
      'Rewards Points Ledger & Digital Wallet Engine',
      'Offline Sync Queue for Low-Connectivity Farming Hubs',
      'Multi-Lingual Localization & Agronomy Knowledgebase'
    ]
  },

  // 3. FixTman (Mobile App — Android)
  {
    id: 'proj-fixtman-android',
    slug: 'fixtman-android-home-services',
    title: 'FixTman — On-Demand Home Services & Technician App (Android)',
    client: 'FixTman',
    category: 'Mobile App Development',
    portfolioCategory: 'Mobile Apps',
    portfolioCategories: ['Mobile Apps', 'Booking Platforms'],
    platform: 'Mobile App — Android',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.fixtman&hl=en',
    liveUrl: 'https://play.google.com/store/apps/details?id=com.fixtman&hl=en',
    featured: true,
    year: '2024',
    duration: '10 Weeks',
    thumbnail: 'https://github.com/mrclothingcraft/img/blob/main/FixTman.png?raw=true',
    heroImage: 'https://github.com/mrclothingcraft/img/blob/main/FixTman.png?raw=true',
    overview: 'Full-featured consumer Android app for on-demand home installations, TV mounting, smart home setup, furniture assembly, and verified handyman dispatch.',
    problem: 'Homeowners suffered from unpredictable pricing, opaque technician arrival windows, and lack of verified background checks.',
    solution: 'Developed an intuitive booking flow with instant upfront quote calculator, live GPS technician dispatch tracking, integrated digital payment escrow, and verified service reviews.',
    techStack: ['React Native', 'Google Maps Live Tracking', 'Stripe Mobile Elements', 'WebSockets', 'AWS S3'],
    keyFeatures: [
      'Instant Upfront Pricing by Service & TV Size',
      'Real-Time Technician GPS Live Map Tracking',
      'Secure 1-Click Credit Card & In-App Payments',
      'Before/After Job Photo Verification & Signatures',
      '24/7 Automated Dispatch & Schedule Rescheduling'
    ],
    results: [
      { metric: '4.8★', label: 'Average Customer Rating' },
      { metric: '35 min', label: 'Average Dispatch Response' },
      { metric: '25K+', label: 'Completed Home Installs' }
    ],
    clientQuote: {
      quote: 'FixTman for Android gives our customers complete peace of mind. Watching their technician arrive on the live map removed all friction.',
      author: 'FixTman Product Team',
      role: 'Mobile Engineering Lead',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80'
    },
    deliverables: [
      'Production React Native Android Application',
      'Live GPS Technician Map Telemetry Driver',
      'Stripe In-App Card Processing & Escrow Payments',
      'Automated Push Notifications & Live Status Updates',
      'Before/After Work Photo Verification Suite'
    ]
  },

  // 5. FixTman (Mobile App — iOS)
  {
    id: 'proj-fixtman-ios',
    slug: 'fixtman-ios-home-services',
    title: 'FixTman — On-Demand Home Services & Smart Setup (iOS)',
    client: 'FixTman',
    category: 'Mobile App Development',
    portfolioCategory: 'Mobile Apps',
    portfolioCategories: ['Mobile Apps', 'Booking Platforms'],
    platform: 'Mobile App — iOS',
    appStoreUrl: 'https://apps.apple.com/us/app/fixtman/id6448877338',
    liveUrl: 'https://apps.apple.com/us/app/fixtman/id6448877338',
    featured: true,
    year: '2024',
    duration: '10 Weeks',
    thumbnail: 'https://github.com/mrclothingcraft/img/blob/main/FixTman.png?raw=true',
    heroImage: 'https://github.com/mrclothingcraft/img/blob/main/FixTman.png?raw=true',
    overview: 'Official Apple App Store edition of FixTman. Native iOS on-demand technician booking application featuring Apple Pay, interactive slot selection, and live dispatch tracking.',
    problem: 'Demanded a sleek, native iOS experience that matched Apple HIG standards, featuring zero checkout friction and robust background push notifications.',
    solution: 'Engineered a high-performance iOS app with Apple Pay integration, MapKit live technician en-route rendering, Dynamic Island / Live Activity alerts, and biometric faceID login.',
    techStack: ['Swift / React Native', 'Apple Pay SDK', 'MapKit GPS Routing', 'PushKit', 'CoreLocation'],
    keyFeatures: [
      '1-Touch Apple Pay Checkout & Express Booking',
      'Native MapKit Technician Route Tracking',
      'Live Activities on Lock Screen for Arrival Status',
      'Interactive Multi-Room TV Installation Estimator',
      'Automatic Calendar Sync & Reminders'
    ],
    results: [
      { metric: '4.9★', label: 'Apple App Store Rating' },
      { metric: '<15s', label: 'Apple Pay Booking Speed' },
      { metric: '94%', label: 'Same-Day Dispatch Fill Rate' }
    ],
    clientQuote: {
      quote: 'The iOS app achieved a 4.9 rating on the App Store almost immediately. Apple Pay makes booking so frictionless that conversion exceeded all expectations.',
      author: 'FixTman Executive Team',
      role: 'Co-Founder',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
    },
    deliverables: [
      'Apple App Store Native iOS Application',
      'Apple Pay 1-Click Fast Checkout Integration',
      'MapKit Live Route Guidance & Geofence Alerts',
      'Dynamic Island & iOS Live Activity Notifications',
      'Biometric Face ID / Touch ID Authentication'
    ]
  },

  // 4. GayeMandi (Mobile App — Android)
  {
    id: 'proj-gayemandi-android',
    slug: 'gayemandi-android-livestock-mandi',
    title: 'GayeMandi — Livestock Marketplace Mobile App (Android)',
    client: 'GayeMandi',
    category: 'Mobile App Development',
    portfolioCategory: 'Mobile Apps',
    portfolioCategories: ['Mobile Apps', 'E-commerce'],
    platform: 'Mobile App — Android',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.gayemandimobile',
    liveUrl: 'https://play.google.com/store/apps/details?id=com.gayemandimobile',
    featured: true,
    year: '2024',
    duration: '10 Weeks',
    thumbnail: 'https://github.com/mrclothingcraft/img/blob/main/GayeMandi.png?raw=true',
    heroImage: 'https://github.com/mrclothingcraft/img/blob/main/GayeMandi.png?raw=true',
    overview: 'Premier digital livestock trading marketplace connecting cattle breeders, dairy farmers, and retail buyers with verified video listings, health histories, and live trading.',
    problem: 'Traditional physical livestock trading involved high transportation overheads, animal distress, middleman commissions, and lack of verified animal health documentation.',
    solution: 'Architected a responsive mobile cattle exchange featuring high-definition video streaming of animal gait, breed tagging, weight estimation tools, and direct buyer-to-farmer communication.',
    techStack: ['React Native', 'Firebase Cloud Messaging', 'HLS Video Streaming', 'Node.js', 'PostgreSQL'],
    keyFeatures: [
      'High-Resolution Video Showcases & 360° Walkarounds',
      'Filter by Breed, Teeth, Weight, Milk Yield & Price',
      'Direct WhatsApp & In-App Call Integration',
      'Seller Verification Badge & Health Certification Uploads',
      'Real-Time Mandi Market Price Trend Tracker'
    ],
    results: [
      { metric: '200K+', label: 'Registered Livestock Traders' },
      { metric: '50K+', label: 'Verified Cattle Listed' },
      { metric: '0%', label: 'Intermediary Middleman Cut' }
    ],
    clientQuote: {
      quote: 'GayeMandi modernized livestock trading. Farmers now sell directly to buyers at fair market rates without losing money to predatory middlemen.',
      author: 'GayeMandi Founders',
      role: 'Marketplace Operations',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
    },
    deliverables: [
      'Android Marketplace App on Google Play Store',
      'Adaptive Bitrate Video Streaming for Livestock Showcase',
      'Direct Buyer-to-Seller Communication Engine',
      'Breed, Weight & Health Certification Tagging',
      'Regional Mandi Benchmark Price Analytics'
    ]
  },

  // 6. GayeMandi (Mobile App — iOS)
  {
    id: 'proj-gayemandi-ios',
    slug: 'gayemandi-ios-livestock-platform',
    title: 'GayeMandi — Livestock Trading & Cattle Mandi (iOS App Store)',
    client: 'GayeMandi',
    category: 'Mobile App Development',
    portfolioCategory: 'Mobile Apps',
    portfolioCategories: ['Mobile Apps', 'E-commerce'],
    platform: 'Mobile App — iOS',
    appStoreUrl: 'https://apps.apple.com/pk/app/gayemandi/id6782077708',
    liveUrl: 'https://apps.apple.com/pk/app/gayemandi/id6782077708',
    featured: false,
    year: '2025',
    duration: '8 Weeks',
    thumbnail: 'https://github.com/mrclothingcraft/img/blob/main/GayeMandi.png?raw=true',
    heroImage: 'https://github.com/mrclothingcraft/img/blob/main/GayeMandi.png?raw=true',
    overview: 'Native iOS release for GayeMandi, bringing high-resolution cattle video inspection, dairy yield verification, and verified livestock transactions to iOS users.',
    problem: 'iOS users needed smooth video loading and optimized image compression to view detailed cattle characteristics over varying cellular network speeds.',
    solution: 'Implemented adaptive bitrate video streaming, AVFoundation camera recording tools for farmers, and Apple Sign-In with end-to-end seller encryption.',
    techStack: ['Swift', 'AVFoundation', 'Cloudinary CDN', 'Apple Sign-In', 'RESTful API'],
    keyFeatures: [
      'Fluid 60fps Native iOS Media Feed',
      'Adaptive Bitrate Video Playback for Cellular Networks',
      'Farmer Direct Voice & WhatsApp Connection',
      'Cattle Breed Identification & Weight Metrics',
      'Secure Verified Trader Profiles'
    ],
    results: [
      { metric: '4.8★', label: 'iOS Store Rating' },
      { metric: '100%', label: 'Verified Breeder Integrity' },
      { metric: '3.2x', label: 'Faster Media Upload Speed' }
    ],
    clientQuote: {
      quote: 'The iOS app brings high-end smoothness to agricultural commerce. Cattle buyers can inspect livestock with crystal clarity.',
      author: 'GayeMandi Tech Team',
      role: 'Lead Mobile Developer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
    },
    deliverables: [
      'Native iOS Application on Apple App Store',
      'AVFoundation High-Def Cattle Video Capture',
      'Apple Sign-In & Verified Seller Security',
      'Cloudinary Dynamic Video Compression Pipeline',
      'Push Notification Broadcasts for New Cattle Listings'
    ]
  }
];

export const initialTestimonials: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Utak POS Product Team',
    role: 'Head of Engineering',
    company: 'Utak Cloud POS & Back-Office',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    content: 'The Utak dashboard handles high transaction volumes across thousands of retail registers smoothly. Store owners love the clarity, live inventory depletion tracking, and real-time business analytics.',
    rating: 5,
    category: 'Web Development',
    metricAchieved: '10,000+ Active Registers'
  },
  {
    id: 'test-2',
    name: 'FixTman Operations Team',
    role: 'Co-Founder & Product Lead',
    company: 'FixTman Home Services',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    content: 'FixTman’s online booking portal and companion mobile apps transformed a chaotic scheduling process into our primary growth engine. Customers book complex TV mounting jobs effortlessly with live technician tracking.',
    rating: 5,
    category: 'Mobile App Development',
    metricAchieved: '4.9★ App Store Rating'
  },
  {
    id: 'test-3',
    name: 'MR Clothing Craft Leadership',
    role: 'Retail Operations & Brand Team',
    company: 'MR Clothing Craft',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    content: 'Alhamdulillah, our Retail Management System is fully connected with Shopify — products, inventory, orders, and customers stay synchronized in real time. With 29 screens, 40+ features, and 159 API endpoints, our retail counters and online storefront operate as one unified machine.',
    rating: 5,
    category: 'E-commerce Complete Solution',
    metricAchieved: '29 Screens & 159 APIs'
  },
  {
    id: 'test-4',
    name: 'Masjidi Product Team',
    role: 'Lead Mobile Architect',
    company: 'Masjidi App',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    content: 'Masjidi combines spiritual reverence with battery-efficient mobile engineering. The astronomical calculations, Azan audio triggers, and mosque GPS locator have served over 500,000 daily users flawlessly.',
    rating: 5,
    category: 'Mobile App Development',
    metricAchieved: '500K+ Daily Active Users'
  },
  {
    id: 'test-5',
    name: 'Yara International Digital Team',
    role: 'Head of Rural Distribution Tech',
    company: 'Yara Connect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    content: 'Yara Connect brought complete transparency to our rural distribution supply chain. Retailers scan tamper-proof QR codes and get rewarded instantly, driving extraordinary distributor loyalty.',
    rating: 5,
    category: 'Mobile App Development',
    metricAchieved: '1.2M+ QR Codes Scanned'
  },
  {
    id: 'test-6',
    name: 'GayeMandi Marketplace Team',
    role: 'Operations & Engineering',
    company: 'GayeMandi Livestock Platform',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    content: 'GayeMandi modernized livestock trading across Android and iOS. Farmers can now stream high-definition cattle videos and sell directly to buyers at transparent market prices without intermediary fees.',
    rating: 5,
    category: 'Mobile App Development',
    metricAchieved: '200K+ Active Traders'
  },
  {
    id: 'test-7',
    name: 'PiggyRide Founders',
    role: 'Product Leadership',
    company: 'PiggyRide Learning & Discovery',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    content: 'PiggyRide gives parents complete confidence when discovering and booking classes for their children. The user experience is vibrant, fast, and secure with seamless multi-currency payments.',
    rating: 5,
    category: 'Web Development',
    metricAchieved: '250K+ Enrolled Students'
  }
];

export const initialBlogPosts: BlogPostItem[] = [
  {
    id: 'blog-1',
    slug: 'building-retail-pos-system-mr-clothing-craft',
    title: 'How We Built a Complete Retail POS System for MR Clothing Craft',
    excerpt:
      'A behind-the-scenes look at how we built a complete retail operating system covering POS billing, inventory, customers, staff, Shopify synchronization, reporting and AI-powered operations.',
    author: {
      name: 'Our Development Team',
      role: 'Product & Engineering Team',
      avatar:
        'https://github.com/mrclothingcraft/img/blob/main/mrclothingcraft.png?raw=true',
    },
    date: 'September 7, 2026',
    readTime: '8 min read',
    category: 'Custom Software',
    coverImage:
      'https://github.com/mrclothingcraft/img/blob/main/mrclothingcraft.png?raw=true',
    tags: [
      'Retail POS',
      'Custom Software',
      'Shopify',
      'Inventory',
      'AI',
      'Business Management',
    ],
    content: `
Modern retail businesses need more than a simple billing counter. They need a connected system that brings sales, inventory, customers, staff, cash management and online commerce together.

For MR Clothing Craft, we developed a complete Retail Operating System designed around the real requirements of a modern fashion retailer.

The platform includes 29 screens, 40+ features, 159 API endpoints and 28 database models.

### What the system handles

The POS manages the complete in-store sales process, including product selection, barcode-based billing, cart management, payments and order processing.

Inventory management was designed specifically for fashion retail. Products can be managed by size, color and quantity, allowing the team to know exactly what is available.

The platform also includes customer management, staff and HR functionality, cash management, expenses and business reporting.

### Connecting Shopify with physical retail

One of the most important parts of the system is the connection between the physical store and the Shopify e-commerce operation.

Instead of managing online and offline inventory separately, the system is designed to keep business data synchronized so that stock changes from one channel can be reflected across the connected ecosystem.

### AI-powered operations

We also introduced an AI assistant to make everyday operations easier.

Instead of navigating through multiple screens for simple questions, staff can interact with the system using natural-language requests for information such as inventory and product availability.

### Built for real business operations

The goal was not to create another generic POS.

The system was built around actual retail workflows, including size and color inventory, customer history, staff management, cash operations, reporting and online/offline synchronization.

This project demonstrates how custom software can turn a traditional retail operation into a connected digital business.

### Explore the project

You can explore the complete Retail POS project, its screens, architecture and capabilities through our project portfolio.
`,
  },

  {
    id: 'blog-2',
    slug: 'mr-clothing-craft-shopify-ecommerce-development',
    title: 'Building a Modern Shopify E-commerce Store for MR Clothing Craft',
    excerpt:
      'How we created a mobile-first Shopify shopping experience for a modern men’s fashion brand.',
    author: {
      name: 'Our Development Team',
      role: 'E-commerce Development Team',
      avatar:
        'https://github.com/mrclothingcraft/img/blob/main/mrclothingcraft.png?raw=true',
    },
    date: 'September 5, 2026',
    readTime: '6 min read',
    category: 'Shopify Development',
    coverImage:
      'https://github.com/mrclothingcraft/img/blob/main/mrclothingcraft.png?raw=true',
    tags: [
      'Shopify',
      'E-commerce',
      'MR Clothing Craft',
      'Fashion',
      'Online Store',
    ],
    content: `
A fashion e-commerce website needs to do more than display products. It needs to make discovering products, selecting variants and placing an order simple on every device.

For MR Clothing Craft, we developed a Shopify-based e-commerce experience focused on modern men's fashion and a smooth mobile-first customer journey.

### Product discovery

The store is organized around core fashion categories including shirts, polos, T-shirts, jeans, pants and accessories.

The objective is to make it easy for customers to move from browsing to product selection without unnecessary complexity.

### Size and color selection

Fashion e-commerce requires clear product variants.

The store supports product options such as sizes and colors so customers can select the right variant before adding an item to their cart.

### Mobile-first shopping

A large percentage of online customers browse from mobile devices.

The experience therefore focuses on responsive layouts, readable product information, clear calls to action and simple navigation across smaller screens.

### Connecting e-commerce with retail

The Shopify store is also part of a larger business ecosystem.

The custom MR Clothing Craft POS system was developed with Shopify integration in mind, allowing the physical retail operation and online store to work together instead of operating as isolated systems.

### The result

The project combines Shopify's e-commerce capabilities with a custom retail technology ecosystem designed around the actual needs of the brand.

Visit the live MR Clothing Craft store to explore the implementation.
`,
  },

  {
    id: 'blog-3',
    slug: 'fixtman-mobile-app-service-booking-platform',
    title: 'Building FixTman: A Mobile App and Service Booking Platform',
    excerpt:
      'A look at the development of FixTman across mobile and web, combining service discovery, location-based booking and customer workflows.',
    author: {
      name: 'Our Development Team',
      role: 'Mobile & Web Development Team',
      avatar:
        'https://github.com/mrclothingcraft/img/blob/main/FixTman.png?raw=true',
    },
    date: 'September 3, 2026',
    readTime: '6 min read',
    category: 'Mobile App Development',
    coverImage:
      'https://github.com/mrclothingcraft/img/blob/main/FixTman.png?raw=true',
    tags: [
      'FixTman',
      'Mobile App',
      'React Native',
      'Service Booking',
      'Web Development',
    ],
    content: `
Service businesses need digital experiences that make booking simple from the first interaction.

FixTman is a real-world project combining mobile applications with a web-based service booking experience.

### From service discovery to booking

The platform allows customers to select a service and continue through a structured booking process.

The booking experience can use location information such as ZIP code to determine the appropriate service flow.

### Mobile application

FixTman is available as a mobile application, giving customers another way to interact with the service.

Building a mobile application alongside a web booking platform requires consistency in user experience, business logic and data handling.

### Why the workflow matters

A service booking platform is more than a collection of pages.

The customer needs to understand what service they are booking, provide the required information and move through the process without unnecessary friction.

### Real project

FixTman demonstrates our experience in building connected digital products across web and mobile.

You can explore the live booking experience and the published mobile applications through the project links.
`,
  },

  {
    id: 'blog-4',
    slug: 'gayemandi-mobile-app-development',
    title: 'GayeMandi: Building a Production Mobile Application',
    excerpt:
      'Exploring the development approach behind the GayeMandi mobile experience across Android and iOS.',
    author: {
      name: 'Our Development Team',
      role: 'Mobile Development Team',
      avatar:
        'https://github.com/mrclothingcraft/img/blob/main/GayeMandi.png?raw=true',
    },
    date: 'August 30, 2026',
    readTime: '5 min read',
    category: 'Mobile App Development',
    coverImage:
      'https://github.com/mrclothingcraft/img/blob/main/GayeMandi.png?raw=true',
    tags: [
      'GayeMandi',
      'Mobile Development',
      'Android',
      'iOS',
      'App Development',
    ],
    content: `
Building a production mobile application requires much more than creating a set of screens.

GayeMandi is one of the mobile application projects in our portfolio, developed for real users and published across Android and iOS.

### Designing for mobile users

Mobile users expect applications to be fast, intuitive and easy to navigate.

Our approach focuses on clear navigation, responsive interactions and interfaces that keep important actions accessible.

### Android and iOS

Supporting multiple mobile platforms requires careful consideration of different screen sizes, operating-system behaviors and platform requirements.

The GayeMandi project demonstrates our experience delivering mobile applications across both Android and iOS ecosystems.

### From interface to production

A production application requires more than UI implementation.

The development process includes application logic, data handling, API communication, error handling, testing and deployment.

### Explore the project

GayeMandi is available through both Google Play and Apple's App Store, allowing visitors to see the real published product.
`,
  },

  {
    id: 'blog-5',
    slug: 'masjidi-mobile-application-development',
    title: 'Masjidi: Developing a Real-World Mobile Application',
    excerpt:
      'A look at our approach to designing and developing the Masjidi mobile application for a real-world digital experience.',
    author: {
      name: 'Our Development Team',
      role: 'Mobile Development Team',
      avatar:
        'https://github.com/mrclothingcraft/img/blob/main/Masjidi.png?raw=true',
    },
    date: 'August 27, 2026',
    readTime: '5 min read',
    category: 'Mobile App Development',
    coverImage:
      'https://github.com/mrclothingcraft/img/blob/main/Masjidi.png?raw=true',
    tags: [
      'Masjidi',
      'Mobile App',
      'Android',
      'UI/UX',
      'Application Development',
    ],
    content: `
Masjidi is one of the real mobile application projects in our portfolio.

The project required a mobile-first experience designed around usability, clear navigation and reliable application behavior.

### Building around the user

Good mobile applications begin with understanding how users interact with the product.

We focus on reducing unnecessary steps, keeping important information easy to access and creating interfaces that feel natural on mobile devices.

### Production-focused development

A production application needs to work beyond the development environment.

Application architecture, API integration, data handling, performance and testing all contribute to the final experience.

### Our development approach

For every mobile project, we aim to balance visual quality with functionality.

The result should not simply look good in screenshots. It should provide a dependable experience for real users.

Explore Masjidi on Google Play to see the published application.
`,
  },

  {
    id: 'blog-6',
    slug: 'yara-connect-mobile-app-development',
    title: 'Yara Connect: Building a Modern Mobile Application',
    excerpt:
      'A project story about developing Yara Connect with a focus on mobile usability, application architecture and production readiness.',
    author: {
      name: 'Our Development Team',
      role: 'Mobile Development Team',
      avatar:
        'https://github.com/mrclothingcraft/img/blob/main/yara.png?raw=true',
    },
    date: 'August 24, 2026',
    readTime: '5 min read',
    category: 'Mobile App Development',
    coverImage:
      'https://github.com/mrclothingcraft/img/blob/main/yara.png?raw=true',
    tags: [
      'Yara Connect',
      'Mobile App',
      'Android',
      'Application Development',
      'UI/UX',
    ],
    content: `
Yara Connect is another production mobile application in our development portfolio.

The project demonstrates our ability to take a digital product from application concept through interface development and production deployment.

### A mobile-first experience

Mobile applications need to communicate information quickly while keeping navigation simple.

Our development approach focuses on clean interfaces, predictable interactions and a consistent user experience.

### Application engineering

Behind the interface, production applications require reliable application logic, API communication, data management and error handling.

These technical foundations are what allow an application to move from a prototype into a product that users can actually rely on.

### Explore Yara Connect

The published Android application provides a direct way to experience the completed project.
`,
  },

  {
    id: 'blog-7',
    slug: 'custom-software-development-for-modern-businesses',
    title: 'Why Modern Businesses Choose Custom Software',
    excerpt:
      'How custom software can connect sales, inventory, customers, operations and reporting into one business ecosystem.',
    author: {
      name: 'Our Development Team',
      role: 'Product & Engineering Team',
      avatar:
        'https://github.com/mrclothingcraft/img/blob/main/mrclothingcraft.png?raw=true',
    },
    date: 'August 20, 2026',
    readTime: '7 min read',
    category: 'Custom Software',
    coverImage:
      'https://github.com/mrclothingcraft/img/blob/main/mrclothingcraft.png?raw=true',
    tags: [
      'Custom Software',
      'Business Automation',
      'POS',
      'APIs',
      'Digital Transformation',
    ],
    content: `
Many businesses begin by using separate tools for sales, inventory, customers, employees, communication and reporting.

As the business grows, those disconnected systems can become difficult to manage.

### The problem with disconnected tools

When information is spread across multiple systems, teams may have to enter the same information repeatedly.

This can create delays, inconsistencies and unnecessary manual work.

### Building one connected ecosystem

Custom software allows a business to design workflows around its actual operations.

The MR Clothing Craft Retail Operating System is an example of this approach.

Instead of relying only on a basic POS, the system brings together billing, inventory, customers, staff, cash management, reporting and e-commerce integration.

### APIs make systems work together

Modern business software often depends on APIs to connect different services.

A well-designed API layer allows the application to communicate with e-commerce platforms, communication tools and other business services.

### Custom software is about workflow

The real value of custom software is not simply having more features.

It is having the right features connected in the right workflow.

That is the approach we take when building custom digital products for businesses.
`,
  },

  {
    id: 'blog-8',
    slug: 'shopify-and-pos-integration',
    title: 'Connecting Shopify With a Custom POS System',
    excerpt:
      'How we approached the challenge of connecting physical retail operations with an online Shopify store.',
    author: {
      name: 'Our Development Team',
      role: 'E-commerce & Engineering Team',
      avatar:
        'https://github.com/mrclothingcraft/img/blob/main/mrclothingcraft.png?raw=true',
    },
    date: 'August 17, 2026',
    readTime: '6 min read',
    category: 'Shopify Development',
    coverImage:
      'https://github.com/mrclothingcraft/img/blob/main/mrclothingcraft.png?raw=true',
    tags: [
      'Shopify',
      'POS',
      'API Integration',
      'Inventory Sync',
      'Retail',
    ],
    content: `
Running a physical retail store and an online store creates an important technical challenge: keeping business data connected.

A customer can purchase an item in-store while another customer may purchase the same product online.

Without synchronization, inventory can quickly become inaccurate.

### Our approach

For MR Clothing Craft, we developed a custom POS system with Shopify integration.

The goal is to connect physical retail operations with the online e-commerce environment.

### Inventory synchronization

Products, variants, sizes, colors and quantities are important parts of fashion retail.

The integration is designed around keeping inventory information synchronized between the connected systems.

### Orders and customers

A connected ecosystem can also reduce the need to manage orders and customer information independently.

This creates a more unified view of the business.

### Why integration matters

Shopify is powerful for e-commerce, while a custom POS can be designed around the unique requirements of a physical retail operation.

Connecting the two allows a business to benefit from both.

### Explore the project

Our MR Clothing Craft POS project demonstrates how custom software and Shopify can work together as one retail technology ecosystem.
`,
  },

  {
    id: 'blog-9',
    slug: 'building-offline-ready-retail-pos',
    title: 'Building an Offline-Ready Retail POS System',
    excerpt:
      'Why retail applications need resilient workflows and how offline queues can help keep critical operations moving.',
    author: {
      name: 'Our Development Team',
      role: 'Software Engineering Team',
      avatar:
        'https://github.com/mrclothingcraft/img/blob/main/mrclothingcraft.png?raw=true',
    },
    date: 'August 14, 2026',
    readTime: '6 min read',
    category: 'Software Engineering',
    coverImage:
      'https://github.com/mrclothingcraft/img/blob/main/mrclothingcraft.png?raw=true',
    tags: [
      'Offline-First',
      'POS',
      'Retail Software',
      'Synchronization',
      'Reliability',
    ],
    content: `
A retail checkout system cannot simply stop working whenever connectivity becomes unreliable.

Sales happen at the physical counter, and critical operations need to remain responsive.

### Why offline capability matters

Retail environments can experience unstable internet connections, temporary network failures or interruptions between devices and cloud services.

A resilient POS should be designed with these conditions in mind.

### Offline queues

Our MR Clothing Craft Retail POS includes an offline queue approach that allows operations to be handled more reliably when connectivity is interrupted.

Once connectivity is restored, queued operations can be synchronized with the connected backend.

### Local state and synchronization

Offline-ready applications require careful state management.

The system needs to understand what has already been processed, what is waiting for synchronization and how to recover safely from interrupted operations.

### Designing for reliability

Offline capability is not simply a feature that can be added at the end of development.

It needs to be considered during architecture, data modeling and API design.

This is why we consider reliability and synchronization from the beginning when building business-critical applications.
`,
  },

  {
    id: 'blog-10',
    slug: 'our-process-for-building-digital-products',
    title: 'From Idea to Production: Our Digital Product Development Process',
    excerpt:
      'Our practical approach to transforming business ideas into production-ready websites, mobile apps and custom software.',
    author: {
      name: 'Our Development Team',
      role: 'Product & Engineering Team',
      avatar:
        'https://github.com/mrclothingcraft/img/blob/main/mrclothingcraft.png?raw=true',
    },
    date: 'August 10, 2026',
    readTime: '7 min read',
    category: 'Web Development',
    coverImage:
      'https://github.com/mrclothingcraft/img/blob/main/mrclothingcraft.png?raw=true',
    tags: [
      'Web Development',
      'Mobile Apps',
      'Product Development',
      'UI/UX',
      'Custom Software',
    ],
    content: `
A successful digital product starts long before the first line of code is written.

Our development process is designed to move from business requirements to a reliable production product.

### 1. Understanding the requirement

We begin by understanding the business problem, target users, required workflows and expected outcome.

### 2. Planning the architecture

Before development, we define the application's structure, data requirements, APIs, integrations and technical approach.

### 3. UI/UX design

The interface should make complex functionality feel simple.

We focus on clear navigation, responsive layouts and user journeys that match the actual product requirements.

### 4. Development

The product is then developed using the appropriate technologies and architecture for the project.

Depending on the requirement, this can include websites, mobile applications, APIs, databases, e-commerce integrations or custom business systems.

### 5. Testing

Real-world applications need to be tested across devices, screen sizes, workflows and error conditions.

### 6. Deployment

After testing, the application is prepared for production deployment.

### 7. Continuous improvement

Production is not the end of the process.

Digital products can continue to improve through new features, optimization, integrations and feedback from real users.

Our portfolio includes mobile applications, Shopify e-commerce, service booking platforms, dashboards and custom retail software built using this practical approach.
`,
  },
];
export const initialTeam: TeamMemberItem[] = [
  {
    id: 'team-1',
    name: 'Devon Vance',
    role: 'Founder & Executive Creative Director',
    bio: '14+ years pioneering digital experiences for Nike, Rimowa, and Silicon Valley unicorns. Obsessed with the intersection of typography, 3D motion, and code.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
    specialties: ['Creative Direction', 'WebGL Architecture', 'Brand Positioning'],
    experience: 'Ex-Pentagram, Cannes Lions Winner',
    socials: { linkedin: '#', twitter: '#' }
  },
  {
    id: 'team-2',
    name: 'Chloe Lin',
    role: 'Partner & Head of Engineering',
    bio: 'Former senior platform architect building high-frequency commerce systems. Leads our web and Shopify Plus engineering squad with military precision.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    specialties: ['Shopify Plus', 'Next.js & React 19', 'Performance Architecture'],
    experience: '10+ Years Full-Stack Engineering',
    socials: { linkedin: '#', github: '#' }
  },
  {
    id: 'team-3',
    name: 'Marcus Sterling',
    role: 'Head of Growth & Performance',
    bio: 'Has personally directed over $45M in paid media spend. Specializes in predictive CAC modeling, programmatic SEO, and full-funnel retention.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    specialties: ['Paid Media Scaling', 'Technical SEO', 'Attribution Data'],
    experience: 'Ex-Venture Backed CMO',
    socials: { linkedin: '#', twitter: '#' }
  },
  {
    id: 'team-4',
    name: 'Aria Thorne',
    role: 'Senior Motion & 3D Designer',
    bio: 'Blends cinematic visual effects, tactile 3D product staging, and editorial rhythm into scroll-stopping commercial showreels and brand assets.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    specialties: ['Cinema 4D', 'After Effects', 'Commercial Direction'],
    experience: '8+ Years Motion Design',
    socials: { linkedin: '#' }
  }
];

export const agencyStats = [
  { value: '50+', label: 'Flagship Projects Delivered' },
  { value: '7', label: 'Core Services Under One Roof' },
  { value: '99.4%', label: 'On-Time Project Delivery' },
  { value: '$45M+', label: 'Client Revenue Generated' }
];

export const clientLogos = [
  { name: 'Chronos Swiss', industry: 'Luxury Goods' },
  { name: 'Synapse AI', industry: 'Enterprise SaaS' },
  { name: 'Lumina Studio', industry: 'Architecture' },
  { name: 'Kinetic Automotive', industry: 'Electric Mobility' },
  { name: 'Solis Collective', industry: 'Sustainable DTC' },
  { name: 'Velox Global', industry: 'Supply Chain' }
];
