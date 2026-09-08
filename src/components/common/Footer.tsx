import React from 'react';
import { PageRoute } from '../../types';
import { useCursor } from '../../context/CursorContext';
import { useCms } from '../../context/CmsContext';
import { 
  ArrowUpRight
} from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute, slug?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { setCursor, resetCursor } = useCursor();
  const { services, footerData, siteConfig } = useCms();

  const brandName = siteConfig?.name || 'AETHER STUDIO';
  const tagline = footerData?.tagline || siteConfig?.description || 'We design and engineer bespoke digital experiences, high-performance web applications, and interactive 3D environments for forward-thinking brands.';
  const email = footerData?.contactEmail || siteConfig?.contactEmail || 'partners@aetherstudio.agency';
  const location = footerData?.location || 'San Francisco, California';
  const copyright = footerData?.copyright || `© ${new Date().getFullYear()} ${brandName} LLC. All rights reserved.`;

  return (
    <footer id="site-footer" className="bg-[#0A0E1A] border-t border-[#1E2945]/60 relative overflow-hidden pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1E2945]/50">
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              className="flex items-center gap-3 cursor-pointer select-none"
              onClick={() => onNavigate('home')}
            >
              <div className="h-8 w-8 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#161F36] to-[#101626] border border-[#3E7BFA]/30">
                <span className="text-sm font-extrabold text-[#3E7BFA]">Æ</span>
              </div>
              <span className="font-extrabold text-base tracking-wider text-[#F3F5FA]">
                {brandName}
              </span>
            </div>

            <p className="text-xs text-[#9AA3C2] leading-relaxed max-w-sm">
              {tagline}
            </p>

            <div className="pt-2 text-xs text-[#9AA3C2] space-y-1.5">
              <div>{location}</div>
              <div>
                <a href={`mailto:${email}`} className="text-[#3E7BFA] hover:underline">
                  {email}
                </a>
              </div>
              <div>
                <a 
                  href="https://wa.me/923101072246?text=Hi%2C%20I%20would%20like%20to%20discuss%20a%20new%20project." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#25D366] hover:text-white transition-colors flex items-center gap-1.5 font-medium"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span>WhatsApp: +92 310 1072246</span>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F3F5FA]">Explore</h4>
            <ul className="space-y-2 text-xs text-[#9AA3C2]">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-[#F3F5FA] transition-colors"
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={resetCursor}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')} 
                  className="hover:text-[#F3F5FA] transition-colors"
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={resetCursor}
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('work')} 
                  className="hover:text-[#F3F5FA] transition-colors"
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={resetCursor}
                >
                  Selected Work
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-[#F3F5FA] transition-colors"
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={resetCursor}
                >
                  About Studio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('pricing')} 
                  className="hover:text-[#F3F5FA] transition-colors"
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={resetCursor}
                >
                  Pricing & Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F3F5FA]">Disciplines</h4>
            <ul className="space-y-2 text-xs text-[#9AA3C2]">
              {services.map((srv) => (
                <li key={srv.slug}>
                  <button 
                    onClick={() => onNavigate('service-detail', srv.slug)} 
                    className="hover:text-[#F3F5FA] transition-colors text-left"
                    onMouseEnter={() => setCursor('link')}
                    onMouseLeave={resetCursor}
                  >
                    {srv.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F3F5FA]">Connect</h4>
            <ul className="space-y-2 text-xs text-[#9AA3C2]">
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="hover:text-[#F3F5FA] transition-colors flex items-center gap-1 text-[#3E7BFA]"
                >
                  <span>Initiate Project Brief</span>
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              </li>
              <li>
                <a 
                  href="https://wa.me/923101072246?text=Hi%2C%20I%20would%20like%20to%20discuss%20a%20new%20project." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] text-[#9AA3C2] transition-colors flex items-center gap-1.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                  <span>Chat on WhatsApp (+92 310 1072246)</span>
                </a>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('blog')} 
                  className="hover:text-[#F3F5FA] transition-colors"
                >
                  Insights & Essays
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('admin')} 
                  className="hover:text-[#F3F5FA] transition-colors"
                >
                  CMS Admin
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('sitemap')} 
                  className="hover:text-[#F3F5FA] transition-colors"
                >
                  Sitemap Index
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Minimal Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9AA3C2]">
          <div>
            {copyright}
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('sitemap')} className="hover:text-[#F3F5FA] transition-colors">
              Sitemap
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-[#F3F5FA] transition-colors">
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
