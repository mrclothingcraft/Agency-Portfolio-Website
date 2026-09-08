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
  Zap,
  ArrowRight
} from 'lucide-react';
import { IntroRobotCanvas } from '../3d/IntroRobotCanvas';
import { useSound } from '../../context/SoundContext';

interface OpeningExperienceProps {
  onComplete: () => void;
}

interface ServiceItemConfig {
  id: string;
  name: string;
  shortTag: string;
  icon: React.ElementType;
  color: string;
}

const SERVICES: ServiceItemConfig[] = [
  {
    id: 'mobile-apps',
    name: 'Mobile Apps',
    shortTag: 'iOS & Android',
    icon: Smartphone,
    color: '#17B4E0',
  },
  {
    id: 'websites',
    name: 'Websites',
    shortTag: 'Next.js & WebGL',
    icon: Globe,
    color: '#3E7BFA',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    shortTag: 'Global Scale',
    icon: ShoppingBag,
    color: '#17B4E0',
  },
  {
    id: 'shopify',
    name: 'Shopify',
    shortTag: 'Shopify Plus',
    icon: ShoppingCart,
    color: '#3E7BFA',
  },
  {
    id: 'web-apps',
    name: 'Web Applications',
    shortTag: 'High-Velocity SaaS',
    icon: LayoutGrid,
    color: '#17B4E0',
  },
  {
    id: 'custom-software',
    name: 'Custom Software',
    shortTag: 'Cloud Architecture',
    icon: Cpu,
    color: '#3E7BFA',
  },
  {
    id: 'pos-systems',
    name: 'POS Systems',
    shortTag: 'Omnichannel Retail',
    icon: CreditCard,
    color: '#17B4E0',
  },
];

export const OpeningExperience: React.FC<OpeningExperienceProps> = ({ onComplete }) => {
  const { soundEnabled, toggleSound, playClick, playSuccess } = useSound();
  
  const [progress, setProgress] = useState<number>(0);
  const [phase, setPhase] = useState<number>(0); // 0: Init, 1: Welcome 1, 2: Welcome 2 & Services
  const [activeServiceIndex, setActiveServiceIndex] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  const hasCompletedRef = useRef<boolean>(false);

  // Automatically cycle through services every 340ms to showcase all 7 services smoothly
  useEffect(() => {
    const serviceInterval = setInterval(() => {
      setActiveServiceIndex((prev) => (prev + 1) % SERVICES.length);
    }, 340);

    return () => clearInterval(serviceInterval);
  }, []);

  // Strict 3.0-Second Lifecycle matching website branding
  useEffect(() => {
    const startTime = performance.now();
    const duration = 2650; // Progress reaches 100% at ~2.65s, smooth exit transition starts at 2.95s (total 3.0s)

    let animFrame: number;

    const updateLoader = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      
      // Easing curve for realistic, high-speed telemetry
      const eased = Math.floor(rawProgress * 100);
      setProgress(eased);

      // Phase 1 (0.0s – 1.1s): Welcome 1
      if (elapsed < 1100) {
        setPhase(1);
      } 
      // Phase 2 (1.1s – 2.6s): Welcome 2 & Animated Services
      else if (elapsed < 2600) {
        setPhase(2);
      } 
      // Phase 3 (2.6s+): 100% Ready
      else {
        setPhase(3);
      }

      if (rawProgress < 1) {
        animFrame = requestAnimationFrame(updateLoader);
      } else {
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          try {
            playSuccess();
          } catch (_) {}

          // Auto-trigger smooth reveal at exactly 3.0 seconds
          setTimeout(() => {
            handleFinish();
          }, 320);
        }
      }
    };

    animFrame = requestAnimationFrame(updateLoader);

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

    setTimeout(() => {
      onComplete();
    }, 450);
  };

  const currentService = SERVICES[activeServiceIndex];
  const CurrentIcon = currentService.icon;

  return (
    <motion.div
      id="intro-opening-experience"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 1.03 : 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[99999] bg-[#0A0E1A] text-[#F3F5FA] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Dynamic Ambient Background Illumination using exact website theme */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(62, 123, 250, 0.14) 0%, rgba(23, 180, 224, 0.05) 45%, rgba(10, 14, 26, 0.98) 78%)',
        }}
      />

      {/* Cyber Grid Matrix */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3E7BFA 1px, transparent 1px),
            linear-gradient(to bottom, #3E7BFA 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Soft Radial Ambient Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-[#3E7BFA]/15 via-[#17B4E0]/5 to-transparent blur-3xl pointer-events-none" />

      {/* ========================================================
          1. TOP BAR: Studio Brand, Sound Toggle, Skip CTA
      ======================================================== */}
      <header className="relative z-30 w-full px-6 py-4 sm:py-5 flex items-center justify-between">
        {/* Left: Studio Brand */}
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

        {/* Right: Sound Toggle & Skip */}
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
          2. CENTER STAGE: 3D ROBOT + DYNAMIC SERVICE ANIMATIONS
      ======================================================== */}
      <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
        {/* 3D Robot Canvas in Center */}
        <div className="absolute inset-0 z-10">
          <IntroRobotCanvas progress={progress} phase={phase} />
        </div>

        {/* Dynamic Welcome Headlines */}
        <div className="absolute top-[6%] sm:top-[8%] left-0 right-0 z-20 pointer-events-none text-center px-4">
          <AnimatePresence mode="wait">
            {phase <= 1 ? (
              <motion.div
                key="welcome-1"
                initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex flex-col items-center"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101626]/85 border border-[#3E7BFA]/30 text-[11px] text-[#17B4E0] tracking-widest font-mono uppercase mb-2 backdrop-blur-md">
                  <Sparkles className="h-3 w-3 text-[#17B4E0]" />
                  AETHER DIGITAL STUDIO
                </div>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F3F5FA] drop-shadow-[0_2px_20px_rgba(62,123,250,0.35)]">
                  Welcome to Our Digital World.
                </h1>
              </motion.div>
            ) : (
              <motion.div
                key="welcome-2"
                initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex flex-col items-center"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101626]/85 border border-[#17B4E0]/30 text-[11px] text-[#3E7BFA] tracking-widest font-mono uppercase mb-2 backdrop-blur-md">
                  <Zap className="h-3 w-3 text-[#3E7BFA]" />
                  FLAGSHIP ARCHITECTURE
                </div>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F3F5FA] drop-shadow-[0_2px_20px_rgba(23,180,224,0.35)]">
                  We Build Digital Experiences.
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ========================================================
            DYNAMIC AUTOMATICALLY CHANGING SERVICE SHOWCASE
            Directly highlights: Mobile Apps, Websites, E-commerce, Shopify,
            Web Applications, Custom Software, and POS Systems
        ======================================================== */}
        <div className="absolute bottom-[8%] sm:bottom-[10%] left-0 right-0 z-20 flex flex-col items-center px-4 pointer-events-none">
          {/* Main Glowing Service Switcher Pill */}
          <div className="relative pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentService.id}
                initial={{ opacity: 0, y: 10, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.94 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="px-5 py-2.5 rounded-2xl bg-[#101626]/95 border border-[#1E2945] shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl flex items-center gap-3.5"
                style={{
                  boxShadow: `0 0 25px ${currentService.color}25, 0 4px 20px rgba(0,0,0,0.5)`,
                  borderColor: `${currentService.color}40`,
                }}
              >
                {/* Animated Rotating Icon Container */}
                <motion.div 
                  className="h-9 w-9 rounded-xl flex items-center justify-center shadow-inner"
                  style={{
                    backgroundColor: `${currentService.color}20`,
                    border: `1px solid ${currentService.color}60`,
                  }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.35 }}
                >
                  <CurrentIcon className="h-5 w-5" style={{ color: currentService.color }} />
                </motion.div>

                {/* Service Details */}
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold tracking-wide text-[#F3F5FA]">
                      {currentService.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#161F36] text-[#9AA3C2] border border-[#1E2945]">
                      0{activeServiceIndex + 1}/0{SERVICES.length}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-[#17B4E0] tracking-wider font-mono block">
                    {currentService.shortTag}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Synchronized Service Ticker Chips */}
          <div className="mt-3 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap max-w-xl mx-auto">
            {SERVICES.map((srv, idx) => {
              const isActive = idx === activeServiceIndex;
              const Icon = srv.icon;

              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveServiceIndex(idx)}
                  className={`pointer-events-auto transition-all duration-300 rounded-lg flex items-center gap-1.5 px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-medium ${
                    isActive
                      ? 'bg-[#161F36] text-[#F3F5FA] border border-[#17B4E0] shadow-[0_0_12px_rgba(23,180,224,0.3)] scale-105'
                      : 'bg-[#101626]/70 text-[#9AA3C2] border border-[#1E2945]/60 hover:text-[#F3F5FA] hover:border-[#1E2945]'
                  }`}
                >
                  <Icon 
                    className={`h-3 w-3 ${isActive ? 'text-[#17B4E0]' : 'text-[#55648A]'}`} 
                  />
                  <span className="hidden xs:inline sm:inline whitespace-nowrap">
                    {srv.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================
          3. BOTTOM BAR: LOADING PROGRESS & INITIALIZING STATUS
      ======================================================== */}
      <footer className="relative z-30 w-full px-6 pb-5 pt-2 flex flex-col items-center justify-center max-w-2xl mx-auto">
        {/* Telemetry Status Line */}
        <div className="w-full flex items-center justify-between text-xs font-mono mb-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#17B4E0] animate-pulse" />
            <span className="text-[#9AA3C2] tracking-wider uppercase text-[11px]">
              {progress < 100 ? 'INITIALIZING EXPERIENCE...' : 'EXPERIENCE READY'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-bold tracking-widest text-[#17B4E0] text-xs">
            <span>LOADING</span>
            <span className="text-[#F3F5FA] font-mono">{progress}%</span>
          </div>
        </div>

        {/* High-Tech Glowing Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-[#101626] border border-[#1E2945] overflow-hidden p-0.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#3E7BFA] via-[#17B4E0] to-[#7B4CF0] shadow-[0_0_12px_rgba(23,180,224,0.8)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.08 }}
          />
        </div>

        {/* Technical Subtext */}
        <div className="mt-2.5 flex items-center justify-between w-full text-[10px] font-mono text-[#55648A]">
          <span>WEBGL 3D KINEMATICS // 60FPS</span>
          <span>AETHER DIGITAL STUDIO // 2026</span>
        </div>
      </footer>
    </motion.div>
  );
};
