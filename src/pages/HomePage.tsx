import React from 'react';
import { PageRoute } from '../types';
import { useCms } from '../context/CmsContext';
import { useCursor } from '../context/CursorContext';
import { HeroCanvas } from '../components/3d/HeroCanvas';
import { TiltCard } from '../components/common/TiltCard';
import { MagneticButton } from '../components/common/MagneticButton';
import { IsometricServiceIcon } from '../components/3d/IsometricServiceIcon';
import { 
  ArrowRight, 
  Star, 
  MessageSquare, 
  Layers, 
  Compass, 
  PenTool, 
  Code2, 
  Rocket 
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: PageRoute, slug?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { 
    services, 
    getFeaturedProjects, 
    testimonials, 
    heroData, 
    homePageData, 
    agencyStats, 
    clientLogos: cmsClientLogos 
  } = useCms();
  const { setCursor, resetCursor } = useCursor();
  const featuredProjects = getFeaturedProjects().slice(0, 4);
  const featuredTestimonials = testimonials.slice(0, 3);

  const trustBadges = heroData?.trustBadges || agencyStats || [
    { value: '10+', label: 'Years Active' },
    { value: '50+', label: 'Projects Completed' },
    { value: '120+', label: 'Clients Worldwide' },
    { value: '99%', label: 'Client Retention' }
  ];

  const clientLogos = heroData?.clientLogos || cmsClientLogos || [
    'CHRONOS SWISS',
    'SYNAPSE AI',
    'LUMINA STUDIO',
    'KINETIC MOTORS',
    'SOLIS APPAREL',
    'VELOX GLOBAL'
  ];

  const iconMap: Record<string, React.ElementType> = {
    Compass,
    PenTool,
    Code2,
    Rocket
  };

  const processSteps = homePageData?.processSteps?.map((step) => ({
    step: step.step,
    title: step.title,
    desc: step.desc,
    icon: iconMap[step.iconName] || Compass
  })) || [
    {
      step: '01',
      title: 'Discovery & Strategy',
      desc: 'We analyze your market position, business objectives, and audience to establish a definitive project roadmap.',
      icon: Compass
    },
    {
      step: '02',
      title: 'Design & Motion',
      desc: 'Crafting bespoke 3D assets, design systems, and fluid interactive prototypes tailored to your brand identity.',
      icon: PenTool
    },
    {
      step: '03',
      title: 'Precision Engineering',
      desc: 'Building responsive, ultra-fast web architectures with clean TypeScript, modern frameworks, and headless CMS.',
      icon: Code2
    },
    {
      step: '04',
      title: 'Launch & Growth',
      desc: 'Rigorous cross-browser QA, Core Web Vitals optimization, and seamless deployment with continuous support.',
      icon: Rocket
    }
  ];

  return (
    <div id="home-page" className="min-h-screen pt-20">
      {/* 1. HERO SECTION */}
      <section 
        id="hero-section" 
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 border-b border-[#1E2945]/60"
      >
        {/* Subtle Ambient Glows */}
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-[#3E7BFA]/10 blur-[130px] -z-10" />
        <div className="pointer-events-none absolute bottom-10 right-10 h-[300px] w-[300px] rounded-full bg-[#17B4E0]/10 blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 lg:py-20">
          {/* Left Column: Bold Headline & Content */}
          <div className="lg:col-span-7 space-y-8 z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101626] border border-[#1E2945] text-xs font-medium text-[#3E7BFA]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#17B4E0]" />
              <span>{heroData?.badgeText || 'Digital Design & Engineering Studio'}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F3F5FA] leading-[1.12]">
              {heroData?.headline || 'Architecting Digital Experiences That Command'}{' '}
              <span className="bg-gradient-to-r from-[#3E7BFA] via-[#17B4E0] to-[#7B4CF0] bg-clip-text text-transparent">
                {heroData?.headlineHighlight || 'Prestige'}
              </span>{' '}
              & Scale.
            </h1>

            <p className="text-base sm:text-lg text-[#9AA3C2] leading-relaxed max-w-xl mx-auto lg:mx-0">
              {heroData?.subheadline || 'We merge interactive 3D WebGL, high-velocity engineering, and brand strategy to transform ambitious brands into category leaders.'}
            </p>

            {/* Clean CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <MagneticButton
                id="hero-primary-cta"
                onClick={() => onNavigate('contact')}
                cursorLabel="Quote"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] text-xs font-bold tracking-wider uppercase shadow-[0_4px_25px_rgba(62,123,250,0.35)] hover:shadow-[0_6px_35px_rgba(62,123,250,0.55)] border border-[#3E7BFA]/40 active:scale-95 transition-all"
              >
                <span className="flex items-center justify-center gap-2">
                  <span>Start a Project</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </span>
              </MagneticButton>

              <MagneticButton
                id="hero-secondary-work"
                onClick={() => onNavigate('work')}
                cursorLabel="Work"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#101626] hover:bg-[#161F36] text-[#F3F5FA] border border-[#1E2945] hover:border-[#3E7BFA]/40 text-xs font-semibold tracking-wider transition-all"
              >
                <span className="flex items-center justify-center gap-2">
                  <span>View Selected Work</span>
                  <Layers className="h-3.5 w-3.5 text-[#17B4E0]" />
                </span>
              </MagneticButton>

              <a
                id="hero-whatsapp-cta"
                href="https://wa.me/923101072246?text=Hi%2C%20I%20would%20like%20to%20discuss%20a%20new%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#101626] hover:bg-[#161F36] text-[#25D366] hover:text-white border border-[#25D366]/40 hover:border-[#25D366] text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_2px_15px_rgba(37,211,102,0.15)] cursor-pointer"
                onMouseEnter={() => setCursor('link', 'WhatsApp')}
                onMouseLeave={resetCursor}
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true" className="shrink-0">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Clean Trust Metrics */}
            <div 
              id="hero-trust-badges-row" 
              className="pt-6 border-t border-[#1E2945]/60 grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              {trustBadges.map((badge, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#F3F5FA] tracking-tight">
                    {badge.value}
                  </div>
                  <div className="text-xs text-[#9AA3C2]">
                    {badge.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Three.js Interactive 3D Digital Character & Floating Services */}
          <div className="lg:col-span-5 h-[400px] sm:h-[480px] lg:h-[530px] relative flex items-center justify-center">
            <HeroCanvas onNavigate={onNavigate} />
          </div>
        </div>
      </section>

      {/* 2. CLIENT LOGOS STRIP */}
      <section 
        id="trust-strip-section" 
        className="bg-[#101626]/60 border-b border-[#1E2945]/60 py-10 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#9AA3C2]">
            Selected Client Collaborations
          </span>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {clientLogos.map((client, idx) => (
              <span
                key={idx}
                className="text-xs font-bold tracking-widest text-[#9AA3C2]/70 hover:text-[#F3F5FA] transition-colors cursor-default select-none"
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES OVERVIEW */}
      <section 
        id="services-overview-section" 
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#3E7BFA]">
              Disciplines
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F3F5FA] tracking-tight">
              Specialized Capabilities. Engineered Together.
            </h2>
            <p className="text-sm text-[#9AA3C2] leading-relaxed">
              We operate as a cohesive digital partner, ensuring unified craft across strategy, design, and code.
            </p>
          </div>

          <MagneticButton
            id="view-all-services-btn"
            onClick={() => onNavigate('services')}
            cursorLabel="View"
            className="self-start md:self-auto px-5 py-2.5 rounded-full bg-[#101626] hover:bg-[#161F36] border border-[#1E2945] hover:border-[#3E7BFA]/40 text-xs font-semibold text-[#F3F5FA] tracking-wider transition-all"
          >
            <span className="flex items-center gap-2">
              <span>All Services</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#3E7BFA]" />
            </span>
          </MagneticButton>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <TiltCard
              key={service.id}
              id={`service-card-${service.slug}`}
              onClick={() => onNavigate('service-detail', service.slug)}
              className={`rounded-2xl p-7 bg-[#101626] border border-[#1E2945]/70 hover:border-[#3E7BFA]/40 shadow-sm transition-colors group flex flex-col justify-between cursor-pointer ${
                idx === services.length - 1 && services.length % 2 !== 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="space-y-4">
                <IsometricServiceIcon type={service.iconType} size="md" />

                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-[#F3F5FA] group-hover:text-[#3E7BFA] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#9AA3C2] leading-relaxed line-clamp-2">
                    {service.oneLinePromise}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-[#1E2945]/60 flex items-center justify-between">
                <span className="text-xs font-medium text-[#3E7BFA] group-hover:text-[#17B4E0] flex items-center gap-1.5 transition-colors">
                  <span>Learn more</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[11px] text-[#9AA3C2]">{service.metricHighlight.value}</span>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 4. FEATURED WORK */}
      <section 
        id="featured-work-section" 
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1E2945]/60"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#3E7BFA]">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F3F5FA] tracking-tight">
              Selected Flagship Projects
            </h2>
            <p className="text-sm text-[#9AA3C2]">
              A glimpse into how we solve complex digital challenges for modern businesses.
            </p>
          </div>

          <MagneticButton
            id="view-all-work-btn"
            onClick={() => onNavigate('work')}
            cursorLabel="Gallery"
            className="self-start md:self-auto px-5 py-2.5 rounded-full bg-[#101626] hover:bg-[#161F36] border border-[#1E2945] hover:border-[#3E7BFA]/40 text-xs font-semibold text-[#F3F5FA] tracking-wider transition-all"
          >
            <span className="flex items-center gap-2">
              <span>View All Work</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#3E7BFA]" />
            </span>
          </MagneticButton>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <TiltCard
              key={project.id}
              id={`featured-proj-${project.slug}`}
              onClick={() => onNavigate('case-study', project.slug)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-[#101626] border border-[#1E2945]/70 hover:border-[#3E7BFA]/40 transition-colors"
            >
              <div 
                className="relative aspect-16/10 overflow-hidden bg-[#0A0E1A] flex items-center justify-center border-b border-[#1E2945]/50"
                onMouseEnter={() => setCursor('project', 'View Project')}
                onMouseLeave={resetCursor}
              >
                {/* Atmospheric ambient glow backdrop */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-25 blur-2xl scale-125 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"
                  style={{ backgroundImage: `url(${project.thumbnail})` }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(62,123,250,0.08)_0%,transparent_75%)] pointer-events-none" />

                {/* High-definition centered asset - proper object-contain, no distortion or stretching */}
                <div className="relative z-10 w-full h-full p-6 sm:p-7 flex items-center justify-center">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_25px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                    onError={(e) => {
                      const fallbackMap: Record<string, string> = {
                        'proj-mr-store': '/projects/mrclothingcraft.png',
                        'proj-fixtman-web': '/projects/FixTman.png',
                        'proj-masjidi': '/projects/Masjidi.png',
                        'proj-yara-connect': '/projects/yara.png',
                        'proj-fixtman-android': '/projects/FixTman.png',
                        'proj-fixtman-ios': '/projects/FixTman.png',
                        'proj-gayemandi-android': '/projects/GayeMandi.png',
                        'proj-gayemandi-ios': '/projects/GayeMandi.png'
                      };
                      if (fallbackMap[project.id] && e.currentTarget.src !== window.location.origin + fallbackMap[project.id]) {
                        e.currentTarget.src = fallbackMap[project.id];
                      }
                    }}
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#101626] via-transparent to-transparent opacity-70 pointer-events-none" />

                {/* Category Pill */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#0A0E1A]/80 backdrop-blur-md border border-[#1E2945] text-[10px] font-semibold text-[#3E7BFA] uppercase tracking-wider">
                    {project.category}
                  </span>
                  {project.liveUrl && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/25 backdrop-blur-md border border-emerald-500/50 text-[10px] font-bold text-emerald-300 flex items-center gap-1.5 shadow-lg">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Live Demo
                    </span>
                  )}
                </div>
              </div>

              <div className="p-7 space-y-2">
                <div className="text-xs text-[#9AA3C2]">
                  {project.client} · {project.year}
                </div>
                <h3 className="text-xl font-bold text-[#F3F5FA] group-hover:text-[#3E7BFA] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-[#9AA3C2] line-clamp-2 leading-relaxed">
                  {project.overview}
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-[#1E2945]/60 text-xs">
                  <span className="font-semibold text-[#3E7BFA] group-hover:text-[#17B4E0] flex items-center gap-1 transition-colors">
                    Read Case Study <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[#9AA3C2]">{project.duration}</span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 5. PROCESS */}
      <section 
        id="process-timeline-section" 
        className="py-24 px-4 sm:px-6 lg:px-8 bg-[#101626]/40 border-y border-[#1E2945]/60"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#3E7BFA]">
              Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F3F5FA] tracking-tight">
              Our Process
            </h2>
            <p className="text-sm text-[#9AA3C2]">
              A disciplined four-phase approach ensuring on-time delivery and uncompromising craft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div 
                  key={step.step}
                  id={`process-step-${idx + 1}`}
                  className="p-6 rounded-2xl bg-[#0A0E1A] border border-[#1E2945]/70 hover:border-[#3E7BFA]/30 transition-all space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#1E2945]">
                      {step.step}
                    </span>
                    <div className="h-9 w-9 rounded-xl bg-[#101626] border border-[#1E2945] flex items-center justify-center text-[#3E7BFA]">
                      <IconComponent className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#F3F5FA]">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#9AA3C2] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section 
        id="testimonials-section" 
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#3E7BFA]">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F3F5FA] tracking-tight">
            Client Perspectives
          </h2>
          <p className="text-sm text-[#9AA3C2]">
            Feedback from founders and leaders we partner with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTestimonials.map((t) => (
            <div
              key={t.id}
              className="p-7 rounded-2xl bg-[#101626] border border-[#1E2945]/70 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#3E7BFA]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current text-[#3E7BFA]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#F3F5FA] leading-relaxed">
                  "{t.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#1E2945]/60">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-9 w-9 rounded-full object-cover border border-[#1E2945]"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-xs font-semibold text-[#F3F5FA]">{t.name}</h4>
                  <p className="text-[11px] text-[#9AA3C2]">{t.role}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FINAL CTA BAND */}
      <section 
        id="final-cta-band" 
        className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#1E2945]/60 bg-[#101626]/50"
      >
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F3F5FA] tracking-tight">
            Ready to elevate your digital presence?
          </h2>

          <p className="text-sm text-[#9AA3C2] max-w-lg mx-auto leading-relaxed">
            Let's discuss how we can partner on your next web application, digital brand, or 3D interactive experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <MagneticButton
              id="cta-band-book-btn"
              onClick={() => onNavigate('contact')}
              cursorLabel="Start"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] text-xs font-bold tracking-wider uppercase shadow-[0_4px_25px_rgba(62,123,250,0.35)] hover:shadow-[0_6px_35px_rgba(62,123,250,0.55)] border border-[#3E7BFA]/40 transition-all"
            >
              <span className="flex items-center justify-center gap-2">
                <span>Start Your Project Brief</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </span>
            </MagneticButton>

            <a
              id="cta-band-whatsapp-btn"
              href="https://wa.me/923101072246?text=Hi%2C%20I%20would%20like%20to%20discuss%20a%20new%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#0A0E1A] hover:bg-[#161F36] text-[#25D366] hover:text-white border border-[#25D366]/40 hover:border-[#25D366] text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_2px_15px_rgba(37,211,102,0.15)] cursor-pointer"
              onMouseEnter={() => setCursor('link', 'WhatsApp')}
              onMouseLeave={resetCursor}
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true" className="shrink-0">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>Chat on WhatsApp (+92 310 1072246)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
