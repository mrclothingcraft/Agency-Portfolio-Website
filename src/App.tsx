import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { PageRoute } from './types';
import { CmsProvider } from './context/CmsContext';
import { CursorProvider } from './context/CursorContext';
import { SoundProvider } from './context/SoundContext';
import { useLenis } from './hooks/useLenis';
import { CustomCursor } from './components/common/CustomCursor';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { OpeningExperience } from './components/common/OpeningExperience';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesHubPage } from './pages/ServicesHubPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { WorkPage } from './pages/WorkPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { PricingPage } from './pages/PricingPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { SitemapPage } from './pages/SitemapPage';

export default function App() {
  // Initialize buttery smooth inertial scrolling (Awwwards/Agency feel)
  useLenis();

  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [currentSlug, setCurrentSlug] = useState<string | undefined>(undefined);

  // Full-screen 3D Opening / Loading Experience (Shown on first visit per session, with replay option)
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('aether_intro_viewed_v1') !== 'true';
    } catch {
      return true;
    }
  });

  // Sync with browser history state / URL hash for realistic multi-page feel & direct navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const parts = hash.split('/');
        const route = parts[0] as PageRoute;
        const slug = parts[1];
        if (route) {
          setCurrentRoute(route);
          setCurrentSlug(slug);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (route: PageRoute, slug?: string) => {
    setCurrentRoute(route);
    setCurrentSlug(slug);
    
    // Update hash for deep linking
    const newHash = slug ? `#${route}/${slug}` : `#${route}`;
    if (window.location.hash !== newHash) {
      window.history.pushState(null, '', newHash);
    }

    // Smooth scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesHubPage onNavigate={handleNavigate} />;
      case 'service-detail':
        return <ServiceDetailPage slug={currentSlug || 'web-development'} onNavigate={handleNavigate} />;
      case 'work':
        return <WorkPage onNavigate={handleNavigate} />;
      case 'case-study':
        return <CaseStudyPage slug={currentSlug || 'mr-clothing-craft-pos-system'} onNavigate={handleNavigate} />;
      case 'pricing':
        return <PricingPage onNavigate={handleNavigate} />;
      case 'blog':
        return <BlogPage onNavigate={handleNavigate} />;
      case 'blog-post':
        return <BlogPostPage slug={currentSlug || 'mastering-webgl-in-react'} onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminPage onNavigate={handleNavigate} />;
      case 'sitemap':
        return <SitemapPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <CmsProvider>
      <CursorProvider>
        <SoundProvider>
          {/* Full-Screen 3D Robot Opening / Loading Experience */}
          <AnimatePresence mode="wait">
            {showIntro && (
              <OpeningExperience
                key="aether-opening-experience"
                onComplete={() => setShowIntro(false)}
              />
            )}
          </AnimatePresence>

          {/* Custom cursor with morphing states, magnetic pull, and mobile auto-disable */}
          <CustomCursor />

          <div className="min-h-screen bg-[#0A0E1A] text-[#F3F5FA] font-sans selection:bg-[#3E7BFA]/30 selection:text-[#F3F5FA] flex flex-col justify-between relative overflow-x-hidden">
            {/* Header */}
            <Header 
              currentRoute={currentRoute} 
              currentSlug={currentSlug} 
              onNavigate={handleNavigate}
              onReplayIntro={() => setShowIntro(true)}
            />

            {/* Main Page Body */}
            <main className="flex-1">
              {renderPage()}
            </main>

            {/* Footer */}
            <Footer 
              onNavigate={handleNavigate} 
              onReplayIntro={() => setShowIntro(true)}
            />
          </div>
        </SoundProvider>
      </CursorProvider>
    </CmsProvider>
  );
}
