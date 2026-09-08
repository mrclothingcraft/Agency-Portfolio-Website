import React, { useState } from 'react';
import { PageRoute } from '../types';
import { useCms } from '../context/CmsContext';
import { useCursor } from '../context/CursorContext';
import { IsometricServiceIcon } from '../components/3d/IsometricServiceIcon';
import { TiltCard } from '../components/common/TiltCard';
import { MagneticButton } from '../components/common/MagneticButton';
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft 
} from 'lucide-react';

interface ServiceDetailPageProps {
  slug: string;
  onNavigate: (route: PageRoute, slug?: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug, onNavigate }) => {
  const { getServiceBySlug, getProjectsByCategory, services } = useCms();
  const { setCursor, resetCursor } = useCursor();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const service = getServiceBySlug(slug) || services[0];
  const relatedProjects = getProjectsByCategory(service.title);

  return (
    <div id={`service-detail-page-${service.slug}`} className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Back to Hub Nav */}
      <div>
        <button
          onClick={() => onNavigate('services')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#9AA3C2] hover:text-[#3E7BFA] transition-colors"
          onMouseEnter={() => setCursor('link', 'Back')}
          onMouseLeave={resetCursor}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Disciplines</span>
        </button>
      </div>

      {/* 1. HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101626] border border-[#1E2945] text-xs font-medium text-[#3E7BFA]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#17B4E0]" />
            <span>Practice Overview</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F3F5FA] tracking-tight leading-tight">
            {service.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#3E7BFA] font-medium leading-relaxed">
            {service.oneLinePromise}
          </p>

          <p className="text-sm sm:text-base text-[#9AA3C2] leading-relaxed max-w-2xl">
            {service.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <MagneticButton
              id="service-hero-quote-btn"
              onClick={() => onNavigate('contact')}
              cursorLabel="Quote"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] text-xs font-bold uppercase tracking-wider shadow-[0_4px_25px_rgba(62,123,250,0.35)] border border-[#3E7BFA]/40 transition-all"
            >
              Request Proposal
            </MagneticButton>

            <a
              href="#pricing-section"
              className="px-6 py-3.5 rounded-full bg-[#101626] hover:bg-[#161F36] text-[#F3F5FA] border border-[#1E2945] hover:border-[#3E7BFA]/40 text-xs font-semibold uppercase tracking-wider transition-all"
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
            >
              View Tiers
            </a>
          </div>
        </div>

        {/* 3D Visual Representation */}
        <div className="lg:col-span-4 flex items-center justify-center">
          <div className="p-10 rounded-3xl bg-[#101626] border border-[#1E2945]/80 shadow-lg flex flex-col items-center justify-center text-center space-y-5 w-full">
            <IsometricServiceIcon type={service.iconType} size="lg" />
            
            <div className="space-y-1">
              <span className="text-[11px] uppercase font-semibold text-[#9AA3C2] tracking-wider">Benchmark Impact</span>
              <div className="text-3xl font-extrabold text-[#17B4E0]">{service.metricHighlight.value}</div>
              <div className="text-xs text-[#3E7BFA]">{service.metricHighlight.label}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT'S INCLUDED */}
      <section className="space-y-8 pt-8 border-t border-[#1E2945]/70">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#3E7BFA]">Deliverables</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F3F5FA]">Scope & Specifications</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.deliverables.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#101626] border border-[#1E2945]/70 flex items-start gap-3.5"
            >
              <CheckCircle2 className="h-4 w-4 text-[#17B4E0] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-[#F3F5FA]">{item}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Bar */}
        <div className="p-5 rounded-2xl bg-[#0A0E1A] border border-[#1E2945]/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-xs font-medium uppercase tracking-wider text-[#9AA3C2]">Technology Stack:</span>
          <div className="flex flex-wrap gap-2">
            {service.techStack.map(t => (
              <span key={t} className="px-3 py-1 rounded-full bg-[#101626] border border-[#1E2945] text-xs text-[#3E7BFA]">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROCESS */}
      <section className="space-y-8 pt-8 border-t border-[#1E2945]/70">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#3E7BFA]">Workflow</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F3F5FA]">Execution Phases</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.processSteps.map((step) => (
            <div
              key={step.step}
              className="p-6 rounded-2xl bg-[#101626] border border-[#1E2945]/70 space-y-3 hover:border-[#3E7BFA]/40 transition-colors"
            >
              <div className="text-xl font-extrabold text-[#3E7BFA]">{step.step}</div>
              <h3 className="text-sm font-bold text-[#F3F5FA]">{step.title}</h3>
              <p className="text-xs text-[#9AA3C2] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. RELEVANT PORTFOLIO SAMPLES */}
      {relatedProjects.length > 0 && (
        <section className="space-y-8 pt-8 border-t border-[#1E2945]/70">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#3E7BFA]">Case Studies</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F3F5FA]">
                Featured {service.title} Work
              </h2>
            </div>

            <button
              onClick={() => onNavigate('work')}
              className="text-xs text-[#3E7BFA] hover:text-[#17B4E0] flex items-center gap-1 transition-colors"
            >
              <span>View All Work</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProjects.map((project) => (
              <TiltCard
                key={project.id}
                id={`related-proj-${project.slug}`}
                onClick={() => onNavigate('case-study', project.slug)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-[#101626] border border-[#1E2945]/70 hover:border-[#3E7BFA]/40 shadow-sm"
              >
                <div 
                  className="relative aspect-16/9 overflow-hidden bg-[#0A0E1A] flex items-center justify-center border-b border-[#1E2945]/40"
                  onMouseEnter={() => setCursor('project', 'View')}
                  onMouseLeave={resetCursor}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-25 blur-2xl scale-125 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"
                    style={{ backgroundImage: `url(${project.thumbnail})` }}
                  />
                  <div className="relative z-10 w-full h-full p-6 flex items-center justify-center">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-108"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101626] via-transparent to-transparent pointer-events-none" />
                  {project.liveUrl && (
                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/25 backdrop-blur-md border border-emerald-500/50 text-[9px] font-bold text-emerald-300 flex items-center gap-1 shadow-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Live Demo
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#9AA3C2]">
                    <span>{project.client}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#F3F5FA] group-hover:text-[#3E7BFA] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#9AA3C2] line-clamp-2">{project.overview}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>
      )}

      {/* 5. PRICING TIERS */}
      <section id="pricing-section" className="space-y-8 pt-8 border-t border-[#1E2945]/70">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#3E7BFA]">Investment</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F3F5FA]">Packages & Scope</h2>
          <p className="text-xs text-[#9AA3C2]">Clear deliverables with guaranteed timeline commitments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-7 rounded-2xl flex flex-col justify-between space-y-6 transition-all ${
                tier.recommended 
                  ? 'bg-[#101626] border-2 border-[#3E7BFA] shadow-[0_0_30px_rgba(62,123,250,0.2)] relative' 
                  : 'bg-[#101626] border border-[#1E2945]/70'
              }`}
            >
              {tier.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] text-[10px] font-bold uppercase tracking-wider">
                  Recommended
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#F3F5FA]">{tier.tier}</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-extrabold text-[#F3F5FA]">{tier.price}</span>
                    {tier.period && <span className="text-xs text-[#9AA3C2]">{tier.period}</span>}
                  </div>
                </div>

                <ul className="space-y-2.5 pt-4 border-t border-[#1E2945]/70 text-xs text-[#F3F5FA]">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#17B4E0] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <MagneticButton
                onClick={() => onNavigate('contact')}
                cursorLabel="Select"
                className={`w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  tier.recommended
                    ? 'bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] shadow-[0_4px_20px_rgba(62,123,250,0.35)]'
                    : 'bg-[#161F36] hover:bg-[#1E2945] text-[#F3F5FA] border border-[#1E2945]'
                }`}
              >
                Select Tier
              </MagneticButton>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="space-y-8 pt-8 border-t border-[#1E2945]/70 max-w-3xl mx-auto">
        <div className="space-y-2 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#3E7BFA]">Clarity</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F3F5FA]">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {service.faq.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#101626] border border-[#1E2945]/70 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-[#F3F5FA] hover:text-[#3E7BFA]"
                >
                  <span>{item.q}</span>
                  {isOpen ? <ChevronUp className="h-4 w-4 text-[#3E7BFA]" /> : <ChevronDown className="h-4 w-4 text-[#9AA3C2]" />}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#9AA3C2] leading-relaxed border-t border-[#1E2945]/70 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. CTA */}
      <div className="p-10 rounded-3xl bg-[#101626] border border-[#1E2945]/70 text-center space-y-5">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F3F5FA]">
          Ready to Start Your {service.title} Project?
        </h3>
        <p className="text-xs sm:text-sm text-[#9AA3C2] max-w-md mx-auto">
          Schedule an introductory discovery call to discuss requirements, deadlines, and technical specifications.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <MagneticButton
            id="service-footer-cta-btn"
            onClick={() => onNavigate('contact')}
            cursorLabel="Start"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] text-xs font-bold uppercase tracking-wider shadow-[0_4px_25px_rgba(62,123,250,0.35)] border border-[#3E7BFA]/40 cursor-pointer"
          >
            Book Discovery Call
          </MagneticButton>

          <a
            id="service-whatsapp-cta-btn"
            href={`https://wa.me/923101072246?text=${encodeURIComponent(
              `Hi! I would like to discuss a project regarding ${service.title}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#161F36] hover:bg-[#1E2945] text-[#25D366] hover:text-white border border-[#25D366]/40 hover:border-[#25D366] text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-[0_2px_15px_rgba(37,211,102,0.15)] cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true" className="shrink-0">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>WhatsApp Us (+92 310 1072246)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
