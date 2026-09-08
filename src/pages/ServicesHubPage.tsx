import React from 'react';
import { PageRoute } from '../types';
import { useCms } from '../context/CmsContext';
import { useCursor } from '../context/CursorContext';
import { TiltCard } from '../components/common/TiltCard';
import { IsometricServiceIcon } from '../components/3d/IsometricServiceIcon';
import { MagneticButton } from '../components/common/MagneticButton';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ServicesHubPageProps {
  onNavigate: (route: PageRoute, slug?: string) => void;
}

export const ServicesHubPage: React.FC<ServicesHubPageProps> = ({ onNavigate }) => {
  const { services } = useCms();
  const { setCursor, resetCursor } = useCursor();

  return (
    <div id="services-hub-page" className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101626] border border-[#1E2945] text-xs font-medium text-[#3E7BFA]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#17B4E0]" />
          <span>Agency Disciplines</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F3F5FA] tracking-tight">
          Specialized Disciplines. Unified Craft.
        </h1>
        <p className="text-base text-[#9AA3C2] leading-relaxed">
          Each practice is led by senior discipline directors collaborating under a single architectural framework.
        </p>
      </div>

      {/* 5 Service Detailed Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {services.map((service) => (
          <TiltCard
            key={service.id}
            id={`service-hub-card-${service.slug}`}
            className="rounded-2xl p-8 bg-[#101626] border border-[#1E2945]/70 hover:border-[#3E7BFA]/40 shadow-sm flex flex-col justify-between group space-y-6"
          >
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <IsometricServiceIcon type={service.iconType} size="lg" />
                  <div>
                    <h2 className="text-2xl font-bold text-[#F3F5FA] group-hover:text-[#3E7BFA] transition-colors">
                      {service.title}
                    </h2>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#0A0E1A] border border-[#1E2945] text-xs font-semibold text-[#17B4E0]">
                  {service.metricHighlight.value}
                </span>
              </div>

              <p className="text-sm text-[#9AA3C2] leading-relaxed">
                {service.description}
              </p>

              {/* What's Included Preview */}
              <div className="space-y-2 pt-2 border-t border-[#1E2945]/60">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9AA3C2]">Key Deliverables</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#F3F5FA]">
                  {service.deliverables.slice(0, 4).map((d, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#17B4E0] shrink-0" />
                      <span className="truncate">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {service.techStack.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded-full bg-[#0A0E1A] text-[11px] text-[#9AA3C2] border border-[#1E2945]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-[#1E2945]/60 flex items-center justify-between">
              <div className="text-xs text-[#9AA3C2]">
                From <span className="font-semibold text-[#F3F5FA]">{service.pricingTiers[0]?.price}</span>
              </div>

              <button
                id={`explore-service-${service.slug}`}
                onClick={() => onNavigate('service-detail', service.slug)}
                className="px-5 py-2.5 rounded-full bg-[#161F36] hover:bg-[#1E2945] text-[#F3F5FA] text-xs font-semibold tracking-wide flex items-center gap-2 border border-[#1E2945] hover:border-[#3E7BFA]/40 transition-all"
                onMouseEnter={() => setCursor('button', 'Explore')}
                onMouseLeave={resetCursor}
              >
                <span>View Practice</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#3E7BFA]" />
              </button>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Trust Guarantee Band */}
      <div className="p-8 rounded-2xl bg-[#101626] border border-[#1E2945]/70 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-[#F3F5FA]">
            Need a Multi-Disciplinary Squad?
          </h3>
          <p className="text-xs text-[#9AA3C2]">
            Bundle web engineering with brand design or motion for synchronized delivery and continuous execution.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <MagneticButton
            onClick={() => onNavigate('contact')}
            cursorLabel="Talk"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] text-xs font-bold uppercase tracking-wider shadow-[0_4px_20px_rgba(62,123,250,0.35)] border border-[#3E7BFA]/40 cursor-pointer"
          >
            Discuss Your Project
          </MagneticButton>

          <a
            id="services-hub-whatsapp-btn"
            href="https://wa.me/923101072246?text=Hi%2C%20I%20would%20like%20to%20discuss%20our%20service%20requirements%20with%20Aether."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#161F36] hover:bg-[#1E2945] text-[#25D366] hover:text-white border border-[#25D366]/40 hover:border-[#25D366] text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-[0_2px_15px_rgba(37,211,102,0.15)] cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true" className="shrink-0">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>
    </div>
  );
};
