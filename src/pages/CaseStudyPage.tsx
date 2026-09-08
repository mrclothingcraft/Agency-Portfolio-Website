import React from 'react';
import { PageRoute } from '../types';
import { useCms } from '../context/CmsContext';
import { useCursor } from '../context/CursorContext';
import { MagneticButton } from '../components/common/MagneticButton';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink, 
  Quote, 
  Calendar, 
  Clock,
  Smartphone,
  Globe,
  Check,
  Terminal,
  Layers,
  Sparkles
} from 'lucide-react';

interface CaseStudyPageProps {
  slug: string;
  onNavigate: (route: PageRoute, slug?: string) => void;
}

export const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ slug, onNavigate }) => {
  const { getProjectBySlug, projects } = useCms();
  const { setCursor, resetCursor } = useCursor();

  const project = getProjectBySlug(slug) || projects[0];

  const currentIndex = projects.findIndex(p => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div id={`case-study-${project.slug}`} className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      {/* Back button */}
      <div>
        <button
          onClick={() => onNavigate('work')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#9AA3C2] hover:text-[#3E7BFA] transition-colors cursor-pointer"
          onMouseEnter={() => setCursor('link', 'Back')}
          onMouseLeave={resetCursor}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Projects</span>
        </button>
      </div>

      {/* Header */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded-full bg-[#101626] border border-[#1E2945] text-xs font-semibold text-[#3E7BFA]">
            {project.portfolioCategory || project.category}
          </span>
          {project.platform && (
            <span className="px-3 py-1 rounded-full bg-[#161F36] border border-[#1E2945] text-xs font-medium text-[#DCE4F5] flex items-center gap-1.5">
              <Terminal className="h-3 w-3 text-[#17B4E0]" />
              {project.platform}
            </span>
          )}
          <span className="text-xs text-[#9AA3C2] flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-[#17B4E0]" />
            {project.year}
          </span>
          <span className="text-xs text-[#9AA3C2] flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[#17B4E0]" />
            {project.duration}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F3F5FA] tracking-tight leading-tight">
          {project.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E2945]/70">
          <div className="text-sm text-[#9AA3C2]">
            Client / Brand: <span className="font-semibold text-[#F3F5FA]">{project.client}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {project.playStoreUrl && (
              <a
                href={project.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101626] hover:bg-[#161F36] border border-[#1E2945] hover:border-[#3E7BFA] text-xs font-semibold text-[#F3F5FA] transition-colors"
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
              >
                <Smartphone className="h-3.5 w-3.5 text-emerald-400" />
                <span>Google Play</span>
                <ExternalLink className="h-3 w-3 text-[#9AA3C2]" />
              </a>
            )}

            {project.appStoreUrl && (
              <a
                href={project.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101626] hover:bg-[#161F36] border border-[#1E2945] hover:border-[#3E7BFA] text-xs font-semibold text-[#F3F5FA] transition-colors"
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
              >
                <Smartphone className="h-3.5 w-3.5 text-sky-400" />
                <span>App Store</span>
                <ExternalLink className="h-3 w-3 text-[#9AA3C2]" />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-xs font-bold text-emerald-400 transition-colors"
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Visit Live Platform</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Hero Image Showcase */}
      <div className="rounded-2xl overflow-hidden border border-[#1E2945]/70 shadow-2xl relative aspect-16/9 bg-[#0A0E1A] flex items-center justify-center group">
        {/* Ambient Blur Backdrop */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 blur-3xl scale-125 pointer-events-none transition-opacity duration-700 group-hover:opacity-40"
          style={{ backgroundImage: `url(${project.heroImage || project.thumbnail})` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(62,123,250,0.12)_0%,transparent_75%)] pointer-events-none" />
        
        {/* Center High-Definition Asset */}
        <div className="relative z-10 w-full h-full p-8 sm:p-14 flex items-center justify-center">
          <img
            src={project.heroImage || project.thumbnail}
            alt={project.title}
            className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.7)] transition-transform duration-700 ease-out hover:scale-105"
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

        {/* Ambient Bottom Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A]/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Key Results Strip */}
      <div className="p-8 rounded-2xl bg-[#101626] border border-[#1E2945]/70">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {project.results.map((res, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#3E7BFA]">
                {res.metric}
              </div>
              <div className="text-xs text-[#9AA3C2]">
                {res.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Interactive Access Strip */}
      {(project.liveUrl || project.playStoreUrl || project.appStoreUrl) && (
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#101626] via-[#161F36] to-[#101626] border border-[#3E7BFA]/40 shadow-[0_12px_40px_rgba(62,123,250,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3E7BFA]/20 text-[#17B4E0] border border-[#3E7BFA]/40 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#17B4E0] animate-ping" />
              <span>Interactive Deployment Access</span>
            </div>
            <h3 className="text-xl font-bold text-[#F3F5FA]">
              Experience {project.title} Live
            </h3>
            <p className="text-xs sm:text-sm text-[#9AA3C2] max-w-2xl leading-relaxed">
              Explore the deployed build, interactive customer journeys, and real-time workflows in production.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {project.playStoreUrl && (
              <a
                href={project.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-[#161F36] hover:bg-[#1E2945] border border-emerald-500/50 hover:border-emerald-400 text-xs font-bold text-white flex items-center gap-2 transition-all shrink-0"
              >
                <Smartphone className="h-4 w-4 text-emerald-400" />
                <span>Get on Google Play</span>
              </a>
            )}

            {project.appStoreUrl && (
              <a
                href={project.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-[#161F36] hover:bg-[#1E2945] border border-sky-500/50 hover:border-sky-400 text-xs font-bold text-white flex items-center gap-2 transition-all shrink-0"
              >
                <Smartphone className="h-4 w-4 text-sky-400" />
                <span>Download on App Store</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] hover:shadow-[0_4px_25px_rgba(62,123,250,0.45)] text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2.5 transition-all transform hover:scale-[1.02] shrink-0"
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
              >
                <span>Launch Live System</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Tech Stack & Key Features */}
      {((project.techStack && project.techStack.length > 0) || (project.keyFeatures && project.keyFeatures.length > 0)) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.techStack && project.techStack.length > 0 && (
            <div className="p-8 rounded-2xl bg-[#101626] border border-[#1E2945]/70 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#3E7BFA] flex items-center gap-2">
                <Layers className="h-3.5 w-3.5" />
                <span>Engineered Tech Stack</span>
              </span>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-[#161F36] border border-[#1E2945] text-xs font-mono text-[#DCE4F5]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="p-8 rounded-2xl bg-[#101626] border border-[#1E2945]/70 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#17B4E0] flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Key Platform Features</span>
              </span>
              <div className="space-y-2.5 pt-2">
                {project.keyFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#DCE4F5]">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Overview */}
      <div className="p-8 rounded-2xl bg-[#101626] border border-[#1E2945]/70 space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#3E7BFA]">Executive Overview</span>
        <p className="text-sm text-[#DCE4F5] leading-relaxed">
          {project.overview}
        </p>
      </div>

      {/* Narrative: Challenge & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
        <div className="p-8 rounded-2xl bg-[#101626] border border-[#1E2945]/70 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#3E7BFA]">The Challenge</span>
          <p className="text-sm text-[#9AA3C2] leading-relaxed">
            {project.problem}
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-[#101626] border border-[#1E2945]/70 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#17B4E0]">The Solution</span>
          <p className="text-sm text-[#9AA3C2] leading-relaxed">
            {project.solution}
          </p>
        </div>
      </div>

      {/* Deliverables */}
      <div className="space-y-4 pt-2">
        <h2 className="text-xl font-bold text-[#F3F5FA]">Shipped Deliverables</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {project.deliverables.map((d, i) => (
            <div key={i} className="p-4 rounded-xl bg-[#101626] border border-[#1E2945]/70 flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-[#17B4E0] shrink-0" />
              <span className="text-xs font-medium text-[#F3F5FA]">{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Client Quote */}
      {project.clientQuote && (
        <div className="p-8 sm:p-10 rounded-2xl bg-[#101626] border border-[#1E2945]/70 space-y-6">
          <Quote className="h-7 w-7 text-[#3E7BFA]" />
          <blockquote className="text-base sm:text-lg font-medium text-[#F3F5FA] italic leading-relaxed">
            "{project.clientQuote.quote}"
          </blockquote>

          <div className="flex items-center gap-4 pt-2">
            {project.clientQuote.avatar ? (
              <img
                src={project.clientQuote.avatar}
                alt={project.clientQuote.author}
                className="h-10 w-10 rounded-full object-cover border border-[#1E2945]"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-[#161F36] border border-[#1E2945] flex items-center justify-center text-[#3E7BFA] font-bold">
                {project.clientQuote.author[0]}
              </div>
            )}
            <div>
              <div className="text-sm font-bold text-[#F3F5FA]">{project.clientQuote.author}</div>
              <div className="text-xs text-[#9AA3C2]">{project.clientQuote.role}</div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav & CTA */}
      <div className="pt-8 border-t border-[#1E2945]/70 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-left">
          <span className="text-xs text-[#9AA3C2] block">Next Project</span>
          <button
            onClick={() => onNavigate('case-study', nextProject.slug)}
            className="text-base font-bold text-[#F3F5FA] hover:text-[#3E7BFA] flex items-center gap-2 transition-colors mt-0.5 cursor-pointer"
          >
            <span>{nextProject.title}</span>
            <ArrowRight className="h-4 w-4 text-[#3E7BFA]" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <MagneticButton
            onClick={() => onNavigate('contact')}
            cursorLabel="Discuss"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] text-xs font-bold uppercase tracking-wider shadow-[0_4px_25px_rgba(62,123,250,0.35)] border border-[#3E7BFA]/40 cursor-pointer"
          >
            Discuss Your Project
          </MagneticButton>

          <a
            id="case-study-whatsapp-cta"
            href={`https://wa.me/923101072246?text=${encodeURIComponent(
              `Hi! I just reviewed the ${project.title} case study and would like to discuss a similar project.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#161F36] hover:bg-[#1E2945] text-[#25D366] hover:text-white border border-[#25D366]/40 hover:border-[#25D366] text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-[0_2px_15px_rgba(37,211,102,0.15)] cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true" className="shrink-0">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>
    </div>
  );
};
