import React, { useState } from 'react';
import { PageRoute } from '../types';
import { useCursor } from '../context/CursorContext';
import { MagneticButton } from '../components/common/MagneticButton';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Calculator,
  Sparkles
} from 'lucide-react';

interface PricingPageProps {
  onNavigate: (route: PageRoute, slug?: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const { setCursor, resetCursor } = useCursor();
  const [billingCycle, setBillingCycle] = useState<'project' | 'retainer'>('project');

  // Interactive Scope Estimator State
  const [scopeType, setScopeType] = useState<'marketing-site' | 'custom-webapp' | 'mobile-app' | 'ecommerce-solution' | 'shopify-plus' | 'brand-system'>('custom-webapp');
  const [timelineSpeed, setTimelineSpeed] = useState<'normal' | 'rush'>('normal');
  const [include3D, setInclude3D] = useState<boolean>(true);
  const [includeMarketing, setIncludeMarketing] = useState<boolean>(false);

  // Calculate dynamic estimate
  const calculateEstimate = () => {
    let base = 8500;
    if (scopeType === 'marketing-site') base = 6500;
    if (scopeType === 'custom-webapp') base = 14500;
    if (scopeType === 'mobile-app') base = 16000;
    if (scopeType === 'ecommerce-solution') base = 19500;
    if (scopeType === 'shopify-plus') base = 12500;
    if (scopeType === 'brand-system') base = 9500;

    if (include3D) base += 3500;
    if (includeMarketing) base += 4500;
    if (timelineSpeed === 'rush') base *= 1.25;

    return Math.round(base);
  };

  const projectPackages = [
    {
      name: 'Launch Accelerator',
      tagline: 'For high-impact product releases needing speed and conversion',
      price: '$6,500',
      period: 'Fixed investment',
      timeline: '2–3 Weeks',
      features: [
        'Bespoke Next.js & Tailwind marketing web application',
        'Interactive 3D particle or hero canvas integration',
        'Headless CMS for seamless content updates',
        'Top-tier Core Web Vitals optimization & technical SEO',
        '30-day post-launch warranty support'
      ]
    },
    {
      name: 'Flagship Platform',
      tagline: 'Our standard for high-growth tech companies and category leaders',
      price: '$14,500',
      period: 'Fixed investment',
      timeline: '4–6 Weeks',
      recommended: true,
      features: [
        'Comprehensive bespoke interactive web application',
        'Custom 3D WebGL hero geometry with mouse physics',
        'Integrated CMS architecture with dynamic databases',
        'Custom interactive cursor & smooth scroll kinematics',
        'CRM, analytics, and server-side webhook integrations',
        '60-day post-launch warranty & SLA guarantee'
      ]
    },
    {
      name: 'Enterprise Architecture',
      tagline: 'Tailored platforms, headless commerce, and custom applications',
      price: '$26,000+',
      period: 'Custom scope',
      timeline: '8–12 Weeks',
      features: [
        'Global headless commerce or enterprise web application',
        'Custom backend microservices & third-party API sync',
        'Complete brand identity design token library',
        'Dedicated senior engineering squad and art director',
        '90-day warranty & priority support SLA'
      ]
    }
  ];

  const retainerPackages = [
    {
      name: 'Design & Code Retainer',
      tagline: 'Continuous sprint execution for evolving digital products',
      price: '$4,800',
      period: '/month',
      timeline: 'Monthly Rolling',
      features: [
        'Dedicated 40 hours monthly engineering & design capacity',
        'Fast 48-hour SLA turnaround on discrete feature requests',
        'Weekly video sprint sync with senior engineering lead',
        'Continuous performance & Core Web Vitals maintenance'
      ]
    },
    {
      name: 'Dedicated Studio Squad',
      tagline: 'Your complete external digital innovation team',
      price: '$8,900',
      period: '/month',
      timeline: 'Monthly Rolling',
      recommended: true,
      features: [
        'Full 80 hours cross-functional design and code execution',
        'Web development, 3D motion, and creative art direction',
        'Prioritized 2-hour response time SLA for critical items',
        'Bi-weekly roadmap planning & technical advisory'
      ]
    }
  ];

  return (
    <div id="pricing-page" className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101626] border border-[#1E2945] text-xs font-medium text-[#3E7BFA]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#17B4E0]" />
          <span>Transparent Pricing</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F3F5FA] tracking-tight">
          Clear, Predictable Investment.
        </h1>
        <p className="text-base text-[#9AA3C2] max-w-xl mx-auto leading-relaxed">
          No hidden fees or unexpected billing. Every engagement includes fixed scope commitments and 100% intellectual property ownership.
        </p>

        {/* Toggle Switch */}
        <div className="pt-6 flex justify-center">
          <div className="p-1 rounded-full bg-[#101626] border border-[#1E2945] inline-flex">
            <button
              onClick={() => setBillingCycle('project')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                billingCycle === 'project'
                  ? 'bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] shadow-sm'
                  : 'text-[#9AA3C2] hover:text-[#F3F5FA]'
              }`}
            >
              Fixed Project
            </button>
            <button
              onClick={() => setBillingCycle('retainer')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                billingCycle === 'retainer'
                  ? 'bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] shadow-sm'
                  : 'text-[#9AA3C2] hover:text-[#F3F5FA]'
              }`}
            >
              Monthly Retainer
            </button>
          </div>
        </div>
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(billingCycle === 'project' ? projectPackages : retainerPackages).map((pkg, idx) => (
          <div
            key={idx}
            className={`p-8 rounded-3xl flex flex-col justify-between space-y-8 transition-all ${
              pkg.recommended
                ? 'bg-[#101626] border-2 border-[#3E7BFA] shadow-[0_0_30px_rgba(62,123,250,0.2)] relative'
                : 'bg-[#101626] border border-[#1E2945]/70'
            }`}
          >
            {pkg.recommended && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] text-[10px] font-bold uppercase tracking-wider">
                Popular Choice
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#F3F5FA]">{pkg.name}</h3>
                  <span className="text-[10px] text-[#17B4E0] px-2.5 py-0.5 rounded-full bg-[#0A0E1A] border border-[#1E2945]">
                    {pkg.timeline}
                  </span>
                </div>
                <p className="text-xs text-[#9AA3C2] leading-relaxed">{pkg.tagline}</p>
              </div>

              <div className="flex items-baseline gap-1.5 pt-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#F3F5FA]">{pkg.price}</span>
                <span className="text-xs text-[#9AA3C2]">{pkg.period}</span>
              </div>

              <ul className="space-y-3 pt-6 border-t border-[#1E2945]/70 text-xs text-[#F3F5FA]">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#17B4E0] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <MagneticButton
              onClick={() => onNavigate('contact')}
              cursorLabel="Select"
              className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                pkg.recommended
                  ? 'bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] shadow-[0_4px_20px_rgba(62,123,250,0.35)] border border-[#3E7BFA]/40'
                  : 'bg-[#161F36] hover:bg-[#1E2945] text-[#F3F5FA] border border-[#1E2945]'
              }`}
            >
              Select Tier
            </MagneticButton>
          </div>
        ))}
      </div>

      {/* Interactive Scope & Pricing Calculator */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#101626] border border-[#1E2945]/80 space-y-8">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-[#161F36] border border-[#1E2945] flex items-center justify-center text-[#3E7BFA]">
            <Calculator className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#F3F5FA]">Project Scope Estimator</h3>
            <p className="text-xs text-[#9AA3C2]">Customize requirements to compute an instant baseline estimate.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          {/* Controls */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#9AA3C2]">
                Deliverable Format
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'marketing-site', label: 'Marketing Site' },
                  { id: 'custom-webapp', label: 'Custom Webapp' },
                  { id: 'mobile-app', label: 'Mobile App' },
                  { id: 'ecommerce-solution', label: 'E-commerce Solution' },
                  { id: 'shopify-plus', label: 'Shopify Plus' },
                  { id: 'brand-system', label: 'Brand System' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setScopeType(item.id as any)}
                    className={`py-2 px-3 rounded-full text-xs font-medium border text-center transition-all ${
                      scopeType === item.id
                        ? 'bg-[#161F36] text-[#3E7BFA] border-[#3E7BFA]'
                        : 'bg-[#0A0E1A] text-[#9AA3C2] border-[#1E2945] hover:text-[#F3F5FA]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="p-4 rounded-xl bg-[#0A0E1A] border border-[#1E2945] flex items-center justify-between cursor-pointer">
                <div>
                  <div className="text-xs font-semibold text-[#F3F5FA]">Interactive 3D WebGL</div>
                  <div className="text-[11px] text-[#9AA3C2]">Custom 3D canvas and shaders</div>
                </div>
                <input
                  type="checkbox"
                  checked={include3D}
                  onChange={(e) => setInclude3D(e.target.checked)}
                  className="h-4 w-4 rounded accent-[#3E7BFA]"
                />
              </label>

              <label className="p-4 rounded-xl bg-[#0A0E1A] border border-[#1E2945] flex items-center justify-between cursor-pointer">
                <div>
                  <div className="text-xs font-semibold text-[#F3F5FA]">Launch Motion Asset</div>
                  <div className="text-[11px] text-[#9AA3C2]">Video showreel and teaser cut</div>
                </div>
                <input
                  type="checkbox"
                  checked={includeMarketing}
                  onChange={(e) => setIncludeMarketing(e.target.checked)}
                  className="h-4 w-4 rounded accent-[#3E7BFA]"
                />
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#9AA3C2]">
                Delivery Speed
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setTimelineSpeed('normal')}
                  className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                    timelineSpeed === 'normal'
                      ? 'bg-[#161F36] text-[#17B4E0] border-[#17B4E0]'
                      : 'bg-[#0A0E1A] text-[#9AA3C2] border-[#1E2945]'
                  }`}
                >
                  Standard Delivery (3–5 Weeks)
                </button>
                <button
                  onClick={() => setTimelineSpeed('rush')}
                  className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                    timelineSpeed === 'rush'
                      ? 'bg-[#161F36] text-[#3E7BFA] border-[#3E7BFA]'
                      : 'bg-[#0A0E1A] text-[#9AA3C2] border-[#1E2945]'
                  }`}
                >
                  Priority Sprint (14 Days)
                </button>
              </div>
            </div>
          </div>

          {/* Estimate Display Box */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0A0E1A] border border-[#1E2945] text-center space-y-4 shadow-xl">
            <span className="text-[11px] uppercase font-semibold tracking-wider text-[#9AA3C2]">Estimated Range</span>
            <div className="text-4xl font-extrabold text-[#3E7BFA]">
              ${calculateEstimate().toLocaleString()}
            </div>
            <p className="text-[11px] text-[#9AA3C2] leading-relaxed">
              Includes full source code ownership, QA testing, and warranty coverage.
            </p>
            <div className="space-y-2 pt-1">
              <MagneticButton
                onClick={() => onNavigate('contact')}
                cursorLabel="Brief"
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] text-xs font-bold uppercase tracking-wider shadow-[0_4px_20px_rgba(62,123,250,0.35)] border border-[#3E7BFA]/40 cursor-pointer"
              >
                Discuss This Estimate
              </MagneticButton>

              <a
                id="pricing-whatsapp-btn"
                href={`https://wa.me/923101072246?text=${encodeURIComponent(
                  `Hi! I used your Project Scope Estimator and calculated an estimate of $${calculateEstimate().toLocaleString()}. I would like to discuss details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-[#101626] hover:bg-[#25D366]/15 border border-[#25D366]/40 hover:border-[#25D366] text-[#25D366] hover:text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_2px_12px_rgba(37,211,102,0.15)]"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true" className="shrink-0">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>WhatsApp Instant Quote</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Guarantee Strip */}
      <div className="p-8 rounded-2xl bg-[#101626] border border-[#1E2945]/70 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#9AA3C2]">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-[#3E7BFA] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#F3F5FA] block mb-0.5">Fixed Price Commitment</span>
            Clear deliverables with zero unexpected fees.
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-[#17B4E0] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#F3F5FA] block mb-0.5">Post-Launch Warranty</span>
            All identified defects remediated promptly at no additional cost.
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-[#3E7BFA] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#F3F5FA] block mb-0.5">Full IP Ownership</span>
            You own 100% of all code, design tokens, and assets upon completion.
          </div>
        </div>
      </div>
    </div>
  );
};
