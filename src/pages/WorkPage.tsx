import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageRoute } from '../types';
import { useCms } from '../context/CmsContext';
import { useCursor } from '../context/CursorContext';
import { useSound } from '../context/SoundContext';
import { TiltCard } from '../components/common/TiltCard';
import { MagneticButton } from '../components/common/MagneticButton';
import { 
  Search, 
  Sparkles, 
  ArrowUpRight, 
  SlidersHorizontal, 
  Layers, 
  TrendingUp, 
  Smartphone, 
  Globe, 
  ShoppingBag, 
  Calendar, 
  Check, 
  ExternalLink,
  Cpu,
  Server,
  Terminal
} from 'lucide-react';

interface WorkPageProps {
  onNavigate: (route: PageRoute, slug?: string) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ onNavigate }) => {
  const { projects } = useCms();
  const { setCursor, resetCursor } = useCursor();
  const { playHover, playClick, playSwitch } = useSound();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'name'>('featured');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Agency Portfolio Categories covering all requested client project types
  const portfolioCategories = [
    'All',
    'Mobile Apps',
    'Websites',
    'E-commerce',
    'Booking Platforms',
    'Web Applications',
    'Business Management Systems'
  ];

  // Helper to match project to selected portfolio category
  const matchesPortfolioCategory = (project: typeof projects[0], cat: string): boolean => {
    if (cat === 'All') return true;
    
    if (cat === 'Mobile Apps') {
      return (
        project.portfolioCategory === 'Mobile Apps' ||
        project.portfolioCategories?.includes('Mobile Apps') ||
        project.category.toLowerCase().includes('mobile') ||
        (project.platform ? project.platform.toLowerCase().includes('mobile') : false)
      );
    }
    if (cat === 'Websites') {
      return (
        project.portfolioCategory === 'Websites' ||
        project.portfolioCategories?.includes('Websites') ||
        (project.platform ? project.platform.toLowerCase().includes('website') : false)
      );
    }
    if (cat === 'E-commerce') {
      return (
        project.portfolioCategory === 'E-commerce' ||
        project.portfolioCategories?.includes('E-commerce') ||
        project.category.toLowerCase().includes('e-commerce') ||
        project.category.toLowerCase().includes('shopify')
      );
    }
    if (cat === 'Booking Platforms') {
      return (
        project.portfolioCategory === 'Booking Platforms' ||
        project.portfolioCategories?.includes('Booking Platforms') ||
        (project.platform ? project.platform.toLowerCase().includes('booking') : false)
      );
    }
    if (cat === 'Web Applications') {
      return (
        project.portfolioCategory === 'Web Applications' ||
        project.portfolioCategories?.includes('Web Applications') ||
        project.category.toLowerCase().includes('web')
      );
    }
    if (cat === 'Business Management Systems') {
      return (
        project.portfolioCategory === 'Business Management Systems' ||
        project.portfolioCategories?.includes('Business Management Systems') ||
        (project.platform ? project.platform.toLowerCase().includes('pos') || project.platform.toLowerCase().includes('management') : false)
      );
    }

    return (
      project.category.toLowerCase() === cat.toLowerCase() ||
      project.portfolioCategory?.toLowerCase() === cat.toLowerCase()
    );
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    portfolioCategories.slice(1).forEach((cat) => {
      counts[cat] = projects.filter((p) => matchesPortfolioCategory(p, cat)).length;
    });
    return counts;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const list = projects.filter((project) => {
      const matchesCategory = matchesPortfolioCategory(project, selectedCategory);
      
      const matchesSearch = 
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.platform?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.keyFeatures?.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.deliverables?.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });

    // Sorting
    return list.sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      }
      if (sortBy === 'newest') {
        return parseInt(b.year || '0', 10) - parseInt(a.year || '0', 10);
      }
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [projects, selectedCategory, searchQuery, sortBy]);

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Mobile Apps':
        return <Smartphone className="h-3.5 w-3.5 text-[#17B4E0]" />;
      case 'Websites':
        return <Globe className="h-3.5 w-3.5 text-[#3E7BFA]" />;
      case 'E-commerce':
        return <ShoppingBag className="h-3.5 w-3.5 text-amber-400" />;
      case 'Booking Platforms':
        return <Calendar className="h-3.5 w-3.5 text-emerald-400" />;
      case 'Web Applications':
        return <Cpu className="h-3.5 w-3.5 text-indigo-400" />;
      case 'Business Management Systems':
        return <Server className="h-3.5 w-3.5 text-rose-400" />;
      default:
        return <Layers className="h-3.5 w-3.5 text-[#3E7BFA]" />;
    }
  };

  return (
    <div id="work-portfolio-page" className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101626] border border-[#1E2945] text-xs font-medium text-[#3E7BFA]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#17B4E0] animate-pulse" />
          <span>Agency Portfolio & Completed Deployments</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F3F5FA] tracking-tight">
          Crafted for Impact. Engineered for Scale.
        </h1>
        <p className="text-base text-[#9AA3C2] leading-relaxed">
          Explore our experience across <strong>Mobile Apps, Websites, E-commerce, Booking Platforms, Web Applications, Dashboards, and Custom Business Management Systems.</strong>
        </p>
      </div>

      {/* Interactive Filter & Search Bar */}
      <div className="space-y-4 pt-4 border-t border-[#1E2945]/70">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Category Filter Pills with animated counts & micro-audio */}
          <div className="flex flex-wrap items-center gap-2">
            {portfolioCategories.map((cat) => {
              const isActive = selectedCategory === cat;
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  id={`filter-tab-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => {
                    playSwitch();
                    setSelectedCategory(cat);
                    setVisibleCount(12);
                  }}
                  onMouseEnter={() => {
                    setCursor('link');
                    playHover();
                  }}
                  onMouseLeave={resetCursor}
                  className={`group relative px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] shadow-[0_4px_20px_rgba(62,123,250,0.35)] border border-[#3E7BFA]/60 scale-[1.02]'
                      : 'bg-[#101626] text-[#9AA3C2] hover:text-[#F3F5FA] hover:bg-[#161F36] border border-[#1E2945]'
                  }`}
                >
                  <span className="shrink-0">{getCategoryIcon(cat)}</span>
                  <span>{cat === 'All' ? 'All Completed Projects' : cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white font-bold'
                        : 'bg-[#0A0E1A] text-[#9AA3C2] group-hover:text-[#F3F5FA]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Controls: Sort & Search */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* Sort Selector */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => {
                  playSwitch();
                  setSortBy(e.target.value as 'featured' | 'newest' | 'name');
                }}
                className="appearance-none pl-8 pr-8 py-2 rounded-full bg-[#101626] border border-[#1E2945] text-xs text-[#F3F5FA] focus:outline-none focus:border-[#3E7BFA] cursor-pointer"
                title="Sort Projects"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Latest Year</option>
                <option value="name">Alphabetical</option>
              </select>
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9AA3C2] pointer-events-none" />
            </div>

            {/* Search Input */}
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9AA3C2]" />
              <input
                type="text"
                placeholder="Search projects, technologies, features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full bg-[#101626] border border-[#1E2945] text-xs text-[#F3F5FA] placeholder-[#9AA3C2] focus:outline-none focus:border-[#3E7BFA]"
              />
            </div>
          </div>
        </div>

        {/* Results metadata */}
        <div className="flex items-center justify-between text-xs text-[#9AA3C2] pt-1">
          <div className="flex items-center gap-2">
            <Layers className="h-3.5 w-3.5 text-[#3E7BFA]" />
            <span>
              Showing <strong className="text-[#F3F5FA]">{displayedProjects.length}</strong> of{' '}
              <strong className="text-[#F3F5FA]">{filteredProjects.length}</strong> completed projects
            </span>
          </div>

          {selectedCategory !== 'All' && (
            <button
              onClick={() => {
                playSwitch();
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-[11px] text-[#3E7BFA] hover:text-[#17B4E0] hover:underline cursor-pointer"
            >
              Reset to All Projects
            </button>
          )}
        </div>
      </div>

      {/* Grid Gallery with Rich Showcase Cards */}
      {displayedProjects.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
              >
                <TiltCard
                  id={`portfolio-card-${project.slug}`}
                  onClick={() => {
                    playClick();
                    onNavigate('case-study', project.slug);
                  }}
                  className="group cursor-pointer rounded-2xl overflow-hidden bg-[#101626] border border-[#1E2945]/70 hover:border-[#3E7BFA]/50 transition-all flex flex-col justify-between h-full shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_45px_rgba(62,123,250,0.15)]"
                >
                  <div 
                    className="relative aspect-16/10 overflow-hidden bg-[#0A0E1A] flex items-center justify-center border-b border-[#1E2945]/50"
                    onMouseEnter={() => {
                      setCursor('project', 'View');
                      playHover();
                    }}
                    onMouseLeave={resetCursor}
                  >
                    {/* Atmospheric ambient glow backdrop */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-25 blur-2xl scale-125 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"
                      style={{ backgroundImage: `url(${project.thumbnail})` }}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(62,123,250,0.08)_0%,transparent_75%)] pointer-events-none" />

                    {/* High-definition centered asset - proper object-contain, no distortion or stretching */}
                    <div className="relative z-10 w-full h-full p-6 sm:p-7 flex items-center justify-center">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_25px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-out group-hover:scale-108"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback to local asset if external raw link is blocked or delayed
                          const fallbackMap: Record<string, string> = {
                            'proj-mr-store': '/projects/mrclothingcraft.png',
                            'proj-fixtman-web': '/projects/FixTman.png',
                            'proj-masjidi': '/projects/Masjidi.png',
                            'proj-yara-connect': '/projects/yara.png',
                            'proj-fixtman-android': '/projects/FixTman.png',
                            'proj-fixtman-ios': '/projects/FixTman.png',
                            'proj-gayemandi-android': '/projects/GayeMandi.png',
                            'proj-gayemandi-ios': '/projects/GayeMandi.png'
                          };
                          if (fallbackMap[project.id] && e.currentTarget.src !== window.location.origin + fallbackMap[project.id]) {
                            e.currentTarget.src = fallbackMap[project.id];
                          }
                        }}
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#101626] via-[#101626]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity pointer-events-none" />

                    {/* Top Left: Category & Platform Badges */}
                    <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-[#0A0E1A]/90 backdrop-blur-md border border-[#1E2945] text-[10px] font-semibold text-[#3E7BFA] uppercase tracking-wider">
                          {project.portfolioCategory || project.category}
                        </span>
                        {project.featured && (
                          <span className="px-2 py-0.8 rounded-full bg-[#3E7BFA]/20 border border-[#3E7BFA]/50 text-[9px] font-bold text-[#F3F5FA] flex items-center gap-1">
                            <Sparkles className="h-2.5 w-2.5 text-[#17B4E0]" />
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Metric Tag */}
                      {project.results && project.results[0] && (
                        <span className="px-2.5 py-0.8 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-[10px] font-bold text-emerald-400 flex items-center gap-1 shrink-0">
                          <TrendingUp className="h-3 w-3" />
                          <span>{project.results[0].metric}</span>
                        </span>
                      )}
                    </div>

                    {/* Platform Strip Overlay */}
                    {project.platform && (
                      <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-md bg-[#0A0E1A]/85 backdrop-blur-md border border-white/10 text-[11px] font-medium text-[#DCE4F5] flex items-center gap-1.5 shadow-md">
                          <Terminal className="h-3 w-3 text-[#17B4E0]" />
                          <span>{project.platform}</span>
                        </span>

                        <div className="h-7 w-7 rounded-full bg-[#3E7BFA] flex items-center justify-center text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Meta Content */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-[#9AA3C2]">
                        <span className="font-medium text-[#DCE4F5]">{project.client}</span>
                        <span className="font-mono">{project.year}</span>
                      </div>

                      <h3 className="text-lg font-bold text-[#F3F5FA] group-hover:text-[#3E7BFA] transition-colors leading-snug">
                        {project.title}
                      </h3>

                      <p className="text-xs text-[#9AA3C2] line-clamp-2 leading-relaxed">
                        {project.overview}
                      </p>

                      {/* Tech Stack Badges */}
                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.techStack.slice(0, 4).map((tech, tIdx) => (
                            <span 
                              key={tIdx}
                              className="px-2 py-0.5 rounded-md bg-[#161F36] text-[10px] text-[#DCE4F5] font-mono border border-[#1E2945]"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 4 && (
                            <span className="text-[10px] text-[#9AA3C2] self-center">
                              +{project.techStack.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Key Features Preview */}
                      {project.keyFeatures && project.keyFeatures.length > 0 && (
                        <div className="space-y-1.5 pt-2 border-t border-[#1E2945]/50">
                          {project.keyFeatures.slice(0, 2).map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-1.5 text-[11px] text-[#9AA3C2]">
                              <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Links Bar */}
                    <div className="pt-4 border-t border-[#1E2945]/60 flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[#3E7BFA] group-hover:text-[#17B4E0] flex items-center gap-1 transition-colors">
                        <span>View Project</span>
                        <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>

                      {/* Direct External Link / Store Buttons */}
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        {project.playStoreUrl && (
                          <a
                            href={project.playStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded-full bg-[#161F36] hover:bg-[#3E7BFA]/20 border border-[#1E2945] hover:border-[#3E7BFA] text-[10px] font-semibold text-[#F3F5FA] flex items-center gap-1 transition-colors"
                            title="Open Google Play Store"
                          >
                            <Smartphone className="h-3 w-3 text-emerald-400" />
                            <span>Play Store</span>
                          </a>
                        )}

                        {project.appStoreUrl && (
                          <a
                            href={project.appStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded-full bg-[#161F36] hover:bg-[#3E7BFA]/20 border border-[#1E2945] hover:border-[#3E7BFA] text-[10px] font-semibold text-[#F3F5FA] flex items-center gap-1 transition-colors"
                            title="Open Apple App Store"
                          >
                            <Smartphone className="h-3 w-3 text-sky-400" />
                            <span>App Store</span>
                          </a>
                        )}

                        {project.liveUrl && !project.playStoreUrl && !project.appStoreUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded-full bg-[#161F36] hover:bg-emerald-500/20 border border-[#1E2945] hover:border-emerald-500/50 text-[10px] font-semibold text-emerald-400 flex items-center gap-1 transition-colors"
                            title="Visit Live Experience"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Live Demo</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="p-16 rounded-3xl bg-[#101626] border border-[#1E2945] text-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-[#161F36] border border-[#1E2945] mx-auto flex items-center justify-center text-[#9AA3C2]">
            <Search className="h-5 w-5" />
          </div>
          <h4 className="text-base font-bold text-[#F3F5FA]">No Case Studies Found</h4>
          <p className="text-xs text-[#9AA3C2] max-w-sm mx-auto">
            No projects matched your active category filter and search query. Try resetting filters.
          </p>
          <button
            onClick={() => {
              playSwitch();
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-5 py-2 rounded-full bg-[#3E7BFA] text-xs font-semibold text-white hover:bg-[#1230C4] transition-all cursor-pointer shadow-lg shadow-[#3E7BFA]/20"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Pagination / Load more */}
      {hasMore && (
        <div className="flex justify-center pt-8">
          <MagneticButton
            id="work-load-more-btn"
            onClick={() => {
              playClick();
              setVisibleCount((prev) => prev + 6);
            }}
            cursorLabel="Load"
            className="px-8 py-3.5 rounded-full bg-[#101626] hover:bg-[#161F36] border border-[#1E2945] hover:border-[#3E7BFA]/40 text-xs font-bold uppercase tracking-wider text-[#F3F5FA] transition-all cursor-pointer"
          >
            Load More Completed Projects ({filteredProjects.length - visibleCount} Remaining)
          </MagneticButton>
        </div>
      )}

      {/* Portfolio Closing CTA Band */}
      <div className="mt-12 p-8 rounded-3xl bg-[#101626] border border-[#1E2945]/70 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-[#F3F5FA]">
            Ready to Build Your Next Milestone?
          </h3>
          <p className="text-xs text-[#9AA3C2]">
            Connect with our engineering team to estimate timelines, tech stack, and deliverables.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <MagneticButton
            onClick={() => onNavigate('contact')}
            cursorLabel="Start"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] text-xs font-bold uppercase tracking-wider shadow-[0_4px_20px_rgba(62,123,250,0.35)] border border-[#3E7BFA]/40 cursor-pointer"
          >
            Start a Project
          </MagneticButton>

          <a
            id="work-page-whatsapp-btn"
            href="https://wa.me/923101072246?text=Hi%2C%20I%20reviewed%20your%20projects%20and%20would%20like%20to%20discuss%20a%20new%20build."
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
