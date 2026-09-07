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

        <MagneticButton
          onClick={() => onNavigate('contact')}
          cursorLabel="Talk"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] text-xs font-bold uppercase tracking-wider shrink-0 shadow-[0_4px_20px_rgba(62,123,250,0.35)] border border-[#3E7BFA]/40"
        >
          Discuss Your Project
        </MagneticButton>
      </div>
    </div>
  );
};
