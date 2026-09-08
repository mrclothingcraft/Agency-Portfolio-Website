import React from 'react';
import { PageRoute } from '../types';
import { useCms } from '../context/CmsContext';
import { useCursor } from '../context/CursorContext';
import { TiltCard } from '../components/common/TiltCard';
import { MagneticButton } from '../components/common/MagneticButton';
import { 
  Award, 
  Cpu, 
  Flame, 
  ShieldCheck, 
  Linkedin, 
  Twitter, 
  Github 
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: PageRoute, slug?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { team, aboutPageData, siteConfig } = useCms();
  const { setCursor, resetCursor } = useCursor();

  const iconMap: Record<string, React.ElementType> = {
    Award,
    Cpu,
    Flame,
    ShieldCheck
  };

  const values = aboutPageData?.values?.map(v => ({
    title: v.title,
    desc: v.desc,
    icon: iconMap[v.iconName] || Award
  })) || [
    {
      title: 'Craft Over Volume',
      desc: 'We purposefully cap active partner engagements to ensure undivided focus and uncompromising quality.',
      icon: Award
    },
    {
      title: 'Precision Performance',
      desc: 'Every millisecond matters. We write clean, semantic code that delivers sub-second page loads across every device.',
      icon: Cpu
    },
    {
      title: 'Commercial Impact',
      desc: 'Great design serves business outcomes. Every visual and architectural decision is rooted in conversion and growth.',
      icon: Flame
    },
    {
      title: 'Total Transparency',
      desc: 'No black-box markups or hidden fees. Clients retain 100% intellectual property and full repository access.',
      icon: ShieldCheck
    }
  ];

  const stats = aboutPageData?.stats || [
    { value: '10+', label: 'Years of Practice' },
    { value: '$45M+', label: 'Client Growth Driven' },
    { value: '50+', label: 'Flagship Launches' },
    { value: '99%', label: 'Client Satisfaction' }
  ];

  return (
    <div id="about-page" className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* 1. HERO */}
      <div className="max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101626] border border-[#1E2945] text-xs font-medium text-[#3E7BFA]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#17B4E0]" />
          <span>{aboutPageData?.heroBadge || `About ${siteConfig?.name || 'Aether Studio'}`}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F3F5FA] tracking-tight leading-tight">
          {aboutPageData?.title || 'Where Design Craft Meets Engineering Rigor.'}
        </h1>
        <p className="text-base sm:text-lg text-[#9AA3C2] leading-relaxed">
          {aboutPageData?.description || 'Founded in 2015, Aether was established to bridge the gap between creative visual artistry and robust software engineering. We collaborate directly with founders and product teams to build digital flagships that endure.'}
        </p>
      </div>

      {/* 2. STATS BAR */}
      <div className="p-8 rounded-2xl bg-[#101626] border border-[#1E2945]/70">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <div className={`text-3xl sm:text-4xl font-extrabold ${idx % 2 === 0 ? 'text-[#3E7BFA]' : 'text-[#17B4E0]'}`}>
                {s.value}
              </div>
              <div className="text-xs text-[#9AA3C2]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CORE VALUES */}
      <div className="space-y-10">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#3E7BFA]">Guiding Principles</span>
          <h2 className="text-3xl font-extrabold text-[#F3F5FA]">How We Work</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="p-8 rounded-2xl bg-[#101626] border border-[#1E2945]/70 space-y-4 hover:border-[#3E7BFA]/30 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-[#161F36] border border-[#1E2945] flex items-center justify-center text-[#3E7BFA]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-[#F3F5FA]">{v.title}</h3>
                <p className="text-xs sm:text-sm text-[#9AA3C2] leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. TEAM */}
      <div className="space-y-10">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#3E7BFA]">Leadership</span>
          <h2 className="text-3xl font-extrabold text-[#F3F5FA]">Studio Leadership</h2>
          <p className="text-xs text-[#9AA3C2]">Senior specialists directly guiding your technical and creative architecture.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <TiltCard
              key={member.id}
              className="rounded-2xl overflow-hidden bg-[#101626] border border-[#1E2945]/70 hover:border-[#3E7BFA]/30 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-[#0A0E1A]/85 text-[10px] text-[#3E7BFA] font-medium border border-[#1E2945]">
                    {member.experience}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-sm font-bold text-[#F3F5FA]">{member.name}</h3>
                  <div className="text-xs text-[#17B4E0] font-medium">{member.role}</div>
                  <p className="text-xs text-[#9AA3C2] leading-relaxed line-clamp-3">{member.bio}</p>

                  <div className="flex flex-wrap gap-1 pt-2">
                    {member.specialties.slice(0, 2).map(spec => (
                      <span key={spec} className="px-2 py-0.5 rounded-full bg-[#161F36] text-[10px] text-[#9AA3C2]">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center gap-3 text-[#9AA3C2]">
                {member.socials.linkedin && (
                  <a href="#" className="hover:text-[#3E7BFA] transition-colors"><Linkedin className="h-4 w-4" /></a>
                )}
                {member.socials.twitter && (
                  <a href="#" className="hover:text-[#17B4E0] transition-colors"><Twitter className="h-4 w-4" /></a>
                )}
                {member.socials.github && (
                  <a href="#" className="hover:text-[#F3F5FA] transition-colors"><Github className="h-4 w-4" /></a>
                )}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* 5. CALL TO ACTION */}
      <div className="p-10 rounded-3xl bg-[#101626] border border-[#1E2945]/70 text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F3F5FA]">
          Work Directly with Senior Specialists
        </h2>
        <p className="text-sm text-[#9AA3C2] max-w-md mx-auto">
          Schedule an introductory conversation to evaluate project alignment and technical scope.
        </p>
        <MagneticButton
          onClick={() => onNavigate('contact')}
          cursorLabel="Meet"
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] text-xs font-bold uppercase tracking-wider shadow-[0_4px_25px_rgba(62,123,250,0.35)] border border-[#3E7BFA]/40 transition-all"
        >
          Schedule Discovery Call
        </MagneticButton>
      </div>
    </div>
  );
};
