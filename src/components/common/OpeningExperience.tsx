import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  Globe, 
  ShoppingBag, 
  ShoppingCart, 
  LayoutGrid, 
  Cpu, 
  CreditCard,
  Volume2,
  VolumeX,
  Sparkles,
  Zap
} from 'lucide-react';
import { IntroRobotCanvas } from '../3d/IntroRobotCanvas';
import { useSound } from '../../context/SoundContext';

interface OpeningExperienceProps {
  onComplete: () => void;
}

interface ServiceBadge {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  delay: number;
  desktopPosition: string; // Tailwind positioning around central robot
  mobileOrder: number;
}

const SERVICES: ServiceBadge[] = [
  {
    id: 'mobile-apps',
    name: 'Mobile Apps',
    icon: Smartphone,
    color: '#17B4E0',
    delay: 1.8,
    desktopPosition: 'top-[22%] left-[10%] lg:left-[14%]',
    mobileOrder: 1,
  },
  {
    id: 'websites',
    name: 'Websites',
    icon: Globe,
    color: '#3E7BFA',
    delay: 2.0,
    desktopPosition: 'top-[36%] left-[6%] lg:left-[10%]',
    mobileOrder: 2,
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: ShoppingBag,
    color: '#7B4CF0',
    delay: 2.2,
    desktopPosition: 'top-[52%] left-[8%] lg:left-[12%]',
    mobileOrder: 3,
  },
  {
    id: 'shopify',
    name: 'Shopify',
    icon: ShoppingCart,
    color: '#00E676',
    delay: 2.4,
    desktopPosition: 'top-[22%] right-[10%] lg:right-[14%]',
    mobileOrder: 4,
  },
  {
    id: 'web-apps',
    name: 'Web Applications',
    icon: LayoutGrid,
    color: '#17B4E0',
    delay: 2.6,
    desktopPosition: 'top-[36%] right-[6%] lg:right-[10%]',
    mobileOrder: 5,
  },
  {
    id: 'custom-software',
    name: 'Custom Software',
    icon: Cpu,
    color: '#3E7BFA',
    delay: 2.8,
    desktopPosition: 'top-[52%] right-[8%] lg:right-[12%]',
    mobileOrder: 6,
  },
  {
    id: 'pos-systems',
    name: 'POS Systems',
    icon: CreditCard,
    color: '#FFB300',
    delay: 3.0,
    desktopPosition: 'bottom-[24%] left-1/2 -translate-x-1/2',
    mobileOrder: 7,
  },
];

export const OpeningExperience: React.FC<OpeningExperienceProps> = ({ onComplete }) => {
  const { soundEnabled, toggleSound, playClick, playSwitch, playSuccess } = useSound();
  
  const [progress, setProgress] = useState<number>(0);
  const [phase, setPhase] = useState<number>(0); // 0: Init, 1: Welcome 1, 2: Welcome 2 & Services, 3: Completed
  const [visibleServices, setVisibleServices] = useState<string[]>([]);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  const hasCompletedRef = useRef<boolean>(false);

  // Smooth loading progression (0 to 100% in ~3.8 seconds)
  useEffect(() => {
    const startTime = performance.now();
    const duration = 3800; // 3.8s total loading animation

    let animFrame: number;

    const updateLoader = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      
      // Natural cubic easing curve: fast start, thoughtful middle, crisp finish
      const eased = Math.floor(rawProgress * 100);
      setProgress(eased);

      // Phase 1: 0.6s - Welcome 1 ("Welcome to Our Digital World.")
      if (elapsed >= 600 && elapsed < 2000) {
        setPhase(1);
      } 
      // Phase 2: 2.0s - Welcome 2 ("We Build Digital Experiences.") & Services
      else if (elapsed >= 2000 && elapsed < 3700) {
        setPhase(2);
      } 
      // Phase 3: 3.7s - 100% Loading Complete
      else if (elapsed >= 3700) {
        setPhase(3);
      }

      // Staggered service appearances
      SERVICES.forEach((service) => {
        if (elapsed >= service.delay * 1000) {
          setVisibleServices((prev) => {
            if (!prev.includes(service.id)) {
              return [...prev, service.id];
            }
            return prev;
          });
        }
      });

      if (rawProgress < 1) {
        animFrame = requestAnimationFrame(updateLoader);
      } else {
        // Complete!
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          try {
            playSuccess();
          } catch (_) {}

          // Smooth exit delay after 100%
          setTimeout(() => {
            handleFinish();
          }, 650);
        }
      }
    };

    animFrame = requestAnimationFrame(updateLoader);

    // Escape key listener for immediate skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playSuccess]);

  const handleFinish = () => {
    if (isExiting) return;
    setIsExiting(true);
    try {
      sessionStorage.setItem('aether_intro_viewed_v1', 'true');
    } catch (_) {}

    // Wait for motion exit animation to complete before unmounting
    setTimeout(() => {
      onComplete();
    }, 700);
  };

  return (
    <motion.div
      id="intro-opening-experience"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 1.04 : 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[99999] bg-[#050811] text-[#F3F5FA] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Dynamic Ambient Background Illumination */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 48%, rgba(62, 123, 250, 0.16) 0%, rgba(23, 180, 224, 0.06) 40%, rgba(5, 8, 17, 0.95) 75%)',
        }}
      />

      {/* Cyber Grid Background Matrix */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3E7BFA 1px, transparent 1px),
            linear-gradient(to bottom, #3E7BFA 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Atmospheric Top Spotlight Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] max-w-3xl h-[280px] bg-gradient-to-b from-[#3E7BFA]/20 via-[#17B4E0]/5 to-transparent blur-3xl pointer-events-none" />

      {/* ========================================================
          1. TOP BAR (Telemetry, Sound Toggle, Skip Button)
      ======================================================== */}
      <header className="relative z-20 w-full px-6 py-5 flex items-center justify-between">
        {/* Left: Studio Brand & System Protocol */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#101626] border border-[#3E7BFA]/40 flex items-center justify-center shadow-[0_0_15px_rgba(62,123,250,0.3)]">
            <Zap className="h-4 w-4 text-[#17B4E0] animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#F3F5FA] block">
              Aether Studio
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#3E7BFA] flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#17B4E0] animate-ping" />
              SYSTEM PROTOCOL // ONLINE
            </span>
          </div>
        </div>

        {/* Right: Audio Toggle & Skip CTA */}
        <div className="flex items-center gap-3">
          <button
            id="intro-sound-toggle-btn"
            onClick={() => {
              playClick();
              toggleSound();
            }}
            className="px-3 py-1.5 rounded-full bg-[#101626]/80 border border-[#1E2945] hover:border-[#3E7BFA]/50 text-xs text-[#9AA3C2] hover:text-[#F3F5FA] transition-all flex items-center gap-2 backdrop-blur-md cursor-pointer"
            title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="h-3.5 w-3.5 text-[#17B4E0]" />
                <span className="hidden sm:inline text-[11px]">Audio On</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5 text-[#9AA3C2]" />
                <span className="hidden sm:inline text-[11px]">Audio Muted</span>
              </>
            )}
          </button>

          <button
            id="intro-skip-button"
            onClick={() => {
              playClick();
              handleFinish();
            }}
            className="px-4 py-1.5 rounded-full bg-[#101626]/90 border border-[#3E7BFA]/40 hover:border-[#3E7BFA] hover:bg-[#161F36] text-xs font-medium text-[#F3F5FA] transition-all duration-200 flex items-center gap-1.5 shadow-[0_0_15px_rgba(62,123,250,0.25)] hover:shadow-[0_0_22px_rgba(62,123,250,0.45)] backdrop-blur-md cursor-pointer"
          >
            <span>Skip Intro</span>
            <span className="text-[10px] text-[#9AA3C2] font-mono ml-1 hidden sm:inline">[ESC]</span>
          </button>
        </div>
      </header>

      {/* ========================================================
          2. CENTER STAGE: 3D ROBOT & FLOATING SERVICE BADGES
      ======================================================== */}
      <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
        {/* The Centerpiece: Interactive Three.js 3D Robot */}
        <div className="absolute inset-0 z-10">
          <IntroRobotCanvas progress={progress} phase={phase} />
        </div>

        {/* Dynamic Welcome Headlines (Phased) */}
        <div className="absolute top-[8%] sm:top-[10%] left-0 right-0 z-20 pointer-events-none text-center px-4">
          <AnimatePresence mode="wait">
            {phase < 2 ? (
              <motion.div
                key="welcome-1"
                initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col items-center"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101626]/80 border border-[#3E7BFA]/30 text-[11px] text-[#17B4E0] tracking-widest font-mono uppercase mb-2.5 backdrop-blur-md">
                  <Sparkles className="h-3 w-3 text-[#17B4E0]" />
                  AETHER CREATIVE LABS
                </div>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F3F5FA] drop-shadow-[0_2px_20px_rgba(62,123,250,0.4)]">
                  Welcome to Our Digital World.
                </h1>
              </motion.div>
            ) : (
              <motion.div
                key="welcome-2"
                initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col items-center"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101626]/80 border border-[#17B4E0]/30 text-[11px] text-[#3E7BFA] tracking-widest font-mono uppercase mb-2.5 backdrop-blur-md">
                  <Zap className="h-3 w-3 text-[#3E7BFA]" />
                  FLAGSHIP ARCHITECTURE
                </div>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F3F5FA] drop-shadow-[0_2px_20px_rgba(23,180,224,0.4)]">
                  We Build Digital Experiences.
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3D Floating Service Badges (Desktop Orbit around 3D Robot) */}
        <div className="hidden md:block absolute inset-0 z-20 pointer-events-none">
          {SERVICES.map((service) => {
            const isVisible = visibleServices.includes(service.id);
            const Icon = service.icon;

            return (
              <AnimatePresence key={service.id}>
                {isVisible && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: [0, -6, 0] 
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      opacity: { duration: 0.4 },
                      scale: { duration: 0.45, ease: [0.175, 0.885, 0.32, 1.275] },
                      y: { repeat: Infinity, duration: 3.2 + Math.random(), ease: 'easeInOut' }
                    }}
                    className={`absolute ${service.desktopPosition} pointer-events-auto`}
                  >
                    <div 
                      className="group px-3.5 py-2 rounded-2xl bg-[#0A0E1A]/85 border border-[#1E2945] hover:border-[#3E7BFA] shadow-[0_4px_25px_rgba(0,0,0,0.6)] backdrop-blur-xl flex items-center gap-2.5 transition-all duration-300 hover:scale-105"
                      style={{
                        boxShadow: `0 0 20px ${service.color}25`,
                      }}
                    >
                      <div 
                        className="h-7 w-7 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${service.color}18`,
                          border: `1px solid ${service.color}40`,
                        }}
                      >
                        <Icon className="h-4 w-4" style={{ color: service.color }} />
                      </div>
                      <span className="text-xs font-medium tracking-wide text-[#F3F5FA] whitespace-nowrap">
                        {service.name}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>

        {/* Mobile Horizontal Pill Carousel (Clean responsive layout for mobile screens) */}
        <div className="md:hidden absolute bottom-[18%] left-0 right-0 z-20 px-4 pointer-events-none">
          <div className="flex flex-wrap justify-center items-center gap-2 max-w-sm mx-auto">
            {SERVICES.map((service) => {
              const isVisible = visibleServices.includes(service.id);
              const Icon = service.icon;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="px-2.5 py-1.5 rounded-full bg-[#101626]/90 border border-[#1E2945] flex items-center gap-1.5 shadow-lg backdrop-blur-md"
                  style={{ borderColor: `${service.color}50` }}
                >
                  <Icon className="h-3.5 w-3.5" style={{ color: service.color }} />
                  <span className="text-[11px] font-medium text-[#F3F5FA]">
                    {service.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================
          3. BOTTOM BAR: LOADING PROGRESS & INITIALIZING STATUS
      ======================================================== */}
      <footer className="relative z-20 w-full px-6 pb-6 pt-3 flex flex-col items-center justify-center max-w-2xl mx-auto">
        {/* Telemetry Status Line */}
        <div className="w-full flex items-center justify-between text-xs font-mono mb-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#17B4E0] animate-pulse" />
            <span className="text-[#9AA3C2] tracking-wider uppercase">
              {progress < 100 ? 'INITIALIZING EXPERIENCE...' : 'EXPERIENCE READY'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-bold tracking-widest text-[#17B4E0]">
            <span>LOADING</span>
            <span className="text-[#F3F5FA]">{progress}%</span>
          </div>
        </div>

        {/* High-Tech Glowing Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-[#101626] border border-[#1E2945] overflow-hidden p-0.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#3E7BFA] via-[#17B4E0] to-[#7B4CF0] shadow-[0_0_12px_rgba(23,180,224,0.8)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.1 }}
          />
        </div>

        {/* Subtle Bottom Technical Info */}
        <div className="mt-3 flex items-center justify-between w-full text-[10px] font-mono text-[#55648A]">
          <span>WEBGL 3D KINEMATICS // 60FPS</span>
          <span>AETHER DIGITAL STUDIO // 2026</span>
        </div>
      </footer>
    </motion.div>
  );
};
