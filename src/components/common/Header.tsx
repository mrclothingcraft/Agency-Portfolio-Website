import React, { useState, useEffect } from 'react';
import { PageRoute } from '../../types';
import { useCursor } from '../../context/CursorContext';
import { useSound } from '../../context/SoundContext';
import { useCms } from '../../context/CmsContext';
import { MagneticButton } from './MagneticButton';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  Volume2,
  VolumeX,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  currentRoute: PageRoute;
  currentSlug?: string;
  onNavigate: (route: PageRoute, slug?: string) => void;
  onReplayIntro?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, currentSlug, onNavigate, onReplayIntro }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const { setCursor, resetCursor } = useCursor();
  const { soundEnabled, toggleSound, playHover, playClick } = useSound();
  const { services } = useCms();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceSubPages = services.map(s => ({
    name: s.title,
    slug: s.slug
  }));

  const navLinks: { label: string; route: PageRoute; hasDropdown?: boolean }[] = [
    { label: 'Services', route: 'services', hasDropdown: true },
    { label: 'Work', route: 'work' },
    { label: 'About', route: 'about' },
    { label: 'Pricing', route: 'pricing' },
    { label: 'Blog', route: 'blog' },
    { label: 'Contact', route: 'contact' },
  ];

  return (
    <header 
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0A0E1A]/90 backdrop-blur-md border-b border-[#1E2945]/70 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Minimalist Agency Logo */}
          <div 
            id="brand-logo"
            className="flex items-center gap-3 cursor-pointer select-none group"
            onClick={() => onNavigate('home')}
            onMouseEnter={() => setCursor('link', 'Home')}
            onMouseLeave={resetCursor}
          >
            <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#161F36] to-[#101626] border border-[#3E7BFA]/30 group-hover:border-[#3E7BFA] transition-colors">
              <span className="text-sm font-extrabold text-[#3E7BFA] tracking-tight">Æ</span>
            </div>
            <span className="font-extrabold text-base tracking-wider text-[#F3F5FA] group-hover:text-white transition-colors">
              AETHER
            </span>
          </div>

          {/* Clean Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                const isActive = currentRoute === 'services' || currentRoute === 'service-detail';
                return (
                  <div 
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => {
                      setServicesDropdownOpen(true);
                      setCursor('link');
                    }}
                    onMouseLeave={() => {
                      setServicesDropdownOpen(false);
                      resetCursor();
                    }}
                  >
                    <button
                      onClick={() => onNavigate('services')}
                      className={`px-3.5 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-1 ${
                        isActive 
                          ? 'text-[#F3F5FA] bg-[#161F36]' 
                          : 'text-[#9AA3C2] hover:text-[#F3F5FA] hover:bg-[#101626]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="h-3 w-3 opacity-60" />
                    </button>

                    {/* Services Dropdown */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 w-64 pt-2 z-50">
                        <div className="bg-[#101626]/95 backdrop-blur-md border border-[#1E2945] rounded-2xl p-2 shadow-2xl space-y-1">
                          {serviceSubPages.map((sub) => (
                            <button
                              key={sub.slug}
                              onClick={() => {
                                onNavigate('service-detail', sub.slug);
                                setServicesDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between ${
                                currentSlug === sub.slug 
                                  ? 'bg-[#161F36] text-[#3E7BFA] font-semibold' 
                                  : 'text-[#9AA3C2] hover:text-[#F3F5FA] hover:bg-[#0A0E1A]'
                              }`}
                            >
                              <span>{sub.name}</span>
                              <ArrowRight className="h-3 w-3 opacity-40" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.label}
                  onClick={() => onNavigate(link.route)}
                  className={`px-3.5 py-2 rounded-full text-xs font-medium transition-colors ${
                    isActive 
                      ? 'text-[#F3F5FA] bg-[#161F36]' 
                      : 'text-[#9AA3C2] hover:text-[#F3F5FA] hover:bg-[#101626]'
                  }`}
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={resetCursor}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Clean CTA Button & Sound Toggle */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Replay 3D Intro Button */}
            {onReplayIntro && (
              <button
                id="header-replay-intro-btn"
                onClick={() => {
                  playClick();
                  onReplayIntro();
                }}
                onMouseEnter={() => {
                  setCursor('link');
                  playHover();
                }}
                onMouseLeave={resetCursor}
                className="h-9 px-3 rounded-full border border-[#1E2945] bg-[#101626]/60 hover:bg-[#101626] hover:border-[#3E7BFA]/50 text-[#9AA3C2] hover:text-[#17B4E0] transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                title="Replay 3D Intro Experience"
                aria-label="Replay 3D Opening Experience"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#17B4E0]" />
                <span className="hidden xl:inline text-[11px]">3D Intro</span>
              </button>
            )}

            {/* Ultra-Premium Micro-Audio Toggle Button */}
            <button
              id="sound-fx-toggle-btn"
              onClick={() => {
                toggleSound();
              }}
              onMouseEnter={() => {
                setCursor('link');
                playHover();
              }}
              onMouseLeave={resetCursor}
              className={`h-9 px-3.5 rounded-full border transition-all duration-200 flex items-center gap-2 text-xs font-medium cursor-pointer ${
                soundEnabled
                  ? 'bg-[#101626] border-[#3E7BFA]/40 text-[#F3F5FA] hover:border-[#3E7BFA]'
                  : 'bg-[#101626]/60 border-[#1E2945] text-[#9AA3C2] hover:text-[#F3F5FA]'
              }`}
              title={soundEnabled ? 'Micro-Audio Enabled (Click to Mute)' : 'Micro-Audio Muted (Click to Enable)'}
              aria-label={soundEnabled ? 'Mute micro-audio' : 'Enable micro-audio'}
            >
              {soundEnabled ? (
                <>
                  {/* Equalizer Wave Bars */}
                  <div className="flex items-end gap-0.5 h-3 w-3.5">
                    <span className="w-0.5 bg-[#3E7BFA] rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2.5" />
                    <span className="w-0.5 bg-[#17B4E0] rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.2s] h-3.5" />
                    <span className="w-0.5 bg-[#3E7BFA] rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-1.5" />
                  </div>
                  <span className="text-[11px] text-[#9AA3C2]">SFX</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-3.5 w-3.5 text-[#9AA3C2]" />
                  <span className="text-[11px] text-[#9AA3C2]">Muted</span>
                </>
              )}
            </button>

            <MagneticButton
              id="header-cta-btn"
              onClick={() => {
                playClick();
                onNavigate('contact');
              }}
              cursorLabel="Contact"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] text-xs font-semibold tracking-wide shadow-[0_2px_15px_rgba(62,123,250,0.3)] hover:shadow-[0_4px_20px_rgba(62,123,250,0.5)] border border-[#3E7BFA]/40 transition-all"
            >
              Start a Project
            </MagneticButton>
          </div>

          {/* Mobile Actions (Sound + Menu) */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-sound-toggle-btn"
              onClick={() => toggleSound()}
              className={`p-2 rounded-full border transition-all duration-200 cursor-pointer ${
                soundEnabled
                  ? 'bg-[#101626] border-[#3E7BFA]/50 text-[#3E7BFA] shadow-[0_0_12px_rgba(62,123,250,0.25)]'
                  : 'bg-[#101626]/70 border-[#1E2945] text-[#9AA3C2]'
              }`}
              aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              title={soundEnabled ? 'SFX Enabled (Tap to mute)' : 'SFX Muted (Tap to enable)'}
            >
              {soundEnabled ? (
                <Volume2 className="h-4 w-4 text-[#3E7BFA]" />
              ) : (
                <VolumeX className="h-4 w-4 text-[#9AA3C2]" />
              )}
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => {
                playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-full bg-[#101626] border border-[#1E2945] text-[#9AA3C2] hover:text-[#F3F5FA] cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[73px] bg-[#0A0E1A]/95 backdrop-blur-xl border-b border-[#1E2945] p-6 space-y-4 shadow-2xl">
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-[#F3F5FA] hover:bg-[#101626]"
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('services');
                setMobileMenuOpen(false);
              }}
              className="text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-[#F3F5FA] hover:bg-[#101626]"
            >
              Services
            </button>
            <button
              onClick={() => {
                onNavigate('work');
                setMobileMenuOpen(false);
              }}
              className="text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-[#F3F5FA] hover:bg-[#101626]"
            >
              Work
            </button>
            <button
              onClick={() => {
                onNavigate('about');
                setMobileMenuOpen(false);
              }}
              className="text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-[#F3F5FA] hover:bg-[#101626]"
            >
              About
            </button>
            <button
              onClick={() => {
                onNavigate('pricing');
                setMobileMenuOpen(false);
              }}
              className="text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-[#F3F5FA] hover:bg-[#101626]"
            >
              Pricing
            </button>
            <button
              onClick={() => {
                onNavigate('blog');
                setMobileMenuOpen(false);
              }}
              className="text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-[#F3F5FA] hover:bg-[#101626]"
            >
              Blog
            </button>
            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className="text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-[#F3F5FA] hover:bg-[#101626]"
            >
              Contact
            </button>
          </nav>

          <div className="pt-2">
            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] text-xs font-semibold tracking-wide text-center cursor-pointer"
            >
              Start a Project
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
