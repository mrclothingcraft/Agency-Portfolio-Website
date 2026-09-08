import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageSquare, X } from 'lucide-react';
import { Robot3DCanvas } from './Robot3DCanvas';
import { WebsiteChatbot } from './WebsiteChatbot';
import { useCms } from '../../context/CmsContext';
import { useSound } from '../../context/SoundContext';
import { useCursor } from '../../context/CursorContext';
import { PageRoute } from '../../types';

interface FloatingRobotAssistantProps {
  onNavigate?: (route: PageRoute, slug?: string) => void;
}

export const FloatingRobotAssistant: React.FC<FloatingRobotAssistantProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showGreetingBubble, setShowGreetingBubble] = useState<boolean>(true);

  const cms = useCms();
  const { playClick, playHover } = useSound();
  const { setCursor, resetCursor } = useCursor();

  // Hide the initial speech bubble after 8 seconds or after user interacts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreetingBubble(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    playClick();
    setShowGreetingBubble(false);
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Floating 3D Robot Assistant Trigger Widget */}
      <div
        id="floating-robot-assistant-trigger"
        className="fixed z-40 bottom-5 right-5 sm:bottom-6 sm:right-6 flex flex-col items-end pointer-events-auto"
      >
        {/* Futuristic Speech Bubble Greeting (When closed) */}
        <AnimatePresence>
          {!isOpen && (showGreetingBubble || isHovered) && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={toggleChat}
              className="mb-2.5 max-w-[240px] px-3.5 py-2 rounded-2xl bg-[#101626]/95 backdrop-blur-md border border-[#3E7BFA]/40 shadow-[0_10px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(62,123,250,0.2)] text-left cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                <span className="text-[10px] font-bold text-[#17B4E0] uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Studio Assistant
                </span>
              </div>
              <p className="text-[11px] text-[#CBD5E1] font-medium leading-snug group-hover:text-white transition-colors">
                Hi! Ask me about our services, POS systems, projects, or team.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Robot Orb Launcher Button */}
        <div className="relative group">
          {/* Subtle Ambient Radial Pulse Ring */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#3E7BFA]/40 via-[#17B4E0]/30 to-[#7B4CF0]/40 blur-md opacity-70 group-hover:opacity-100 transition-opacity animate-pulse" />

          <button
            type="button"
            id="robot-assistant-toggle-btn"
            onClick={toggleChat}
            onMouseEnter={() => {
              setIsHovered(true);
              setCursor('pointer', isOpen ? 'Close' : 'Chat');
              playHover();
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              resetCursor();
            }}
            aria-label="Open Website Robot Assistant"
            className="relative w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full bg-[#0A0E1A] border-2 border-[#3E7BFA]/60 hover:border-[#17B4E0] shadow-[0_8px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(62,123,250,0.4)] flex items-center justify-center overflow-hidden transition-all duration-300 transform group-hover:scale-105 cursor-pointer"
          >
            {/* Inner 3D Three.js Robot Canvas */}
            <div className="w-full h-full flex items-center justify-center">
              <Robot3DCanvas
                size={64}
                isHovered={isHovered}
                isOpen={isOpen}
              />
            </div>

            {/* Overlay toggle icon indicator if open */}
            {isOpen && (
              <div className="absolute inset-0 bg-[#0A0E1A]/70 backdrop-blur-sm flex items-center justify-center text-white">
                <X className="w-6 h-6 text-[#17B4E0]" />
              </div>
            )}

            {/* Live Green Online Status Pip */}
            {!isOpen && (
              <span className="absolute bottom-1 right-2 w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#0A0E1A] shadow-[0_0_8px_#25D366]" />
            )}
          </button>
        </div>
      </div>

      {/* Website Chatbot Modal Window */}
      <WebsiteChatbot
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        knowledgeData={{
          siteConfig: cms.siteConfig,
          services: cms.services,
          projects: cms.projects,
          blogPosts: cms.blogPosts,
          aboutPageData: cms.aboutPageData,
          contactPageData: cms.contactPageData,
          testimonials: cms.testimonials,
          pricingPlans: cms.pricingPageData?.plans,
        }}
        onNavigate={onNavigate}
      />
    </>
  );
};
