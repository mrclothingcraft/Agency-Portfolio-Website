import React, { useState } from 'react';
import { PageRoute } from '../types';
import { useCms } from '../context/CmsContext';
import { useCursor } from '../context/CursorContext';
import { TiltCard } from '../components/common/TiltCard';
import { ArrowRight, Clock, Calendar } from 'lucide-react';

interface BlogPageProps {
  onNavigate: (route: PageRoute, slug?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const { blogPosts } = useCms();
  const { setCursor, resetCursor } = useCursor();
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const allTags = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))];

  const filteredPosts = blogPosts.filter(post => {
    if (selectedTag === 'All') return true;
    return post.category === selectedTag || post.tags.includes(selectedTag);
  });

  return (
    <div id="blog-insights-page" className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101626] border border-[#1E2945] text-xs font-medium text-[#3E7BFA]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#17B4E0]" />
          <span>Studio Insights</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F3F5FA] tracking-tight">
          Articles & Engineering Notes
        </h1>
        <p className="text-base text-[#9AA3C2] leading-relaxed">
          Essays and case notes on interactive 3D WebGL, modern web platforms, brand architecture, and performance engineering.
        </p>
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#1E2945]/70">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              selectedTag === tag
                ? 'bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] shadow-[0_2px_15px_rgba(62,123,250,0.3)] border border-[#3E7BFA]/40'
                : 'bg-[#101626] text-[#9AA3C2] hover:text-[#F3F5FA] hover:bg-[#161F36] border border-[#1E2945]'
            }`}
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={resetCursor}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <TiltCard
            key={post.id}
            id={`blog-card-${post.slug}`}
            onClick={() => onNavigate('blog-post', post.slug)}
            className="group cursor-pointer rounded-2xl overflow-hidden bg-[#101626] border border-[#1E2945]/70 hover:border-[#3E7BFA]/40 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-16/10 overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0A0E1A]/85 backdrop-blur-md text-[10px] font-semibold uppercase tracking-wider text-[#3E7BFA] border border-[#1E2945]">
                  {post.category}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-[#9AA3C2]">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-[#17B4E0]" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-[#17B4E0]" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-[#F3F5FA] group-hover:text-[#3E7BFA] transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs text-[#9AA3C2] line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            {/* Author bar */}
            <div className="p-6 pt-0 border-t border-[#1E2945]/60 flex items-center justify-between mt-4">
              <div className="flex items-center gap-2 pt-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  referrerPolicy="no-referrer"
                  className="h-6 w-6 rounded-full object-cover border border-[#1E2945]"
                />
                <span className="text-xs text-[#9AA3C2]">{post.author.name}</span>
              </div>
              <span className="text-xs text-[#3E7BFA] group-hover:text-[#17B4E0] group-hover:translate-x-1 transition-all flex items-center gap-1 pt-4">
                <span>Read</span>
                <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Blog Hub Closing Consultation Band */}
      <div className="mt-12 p-8 rounded-3xl bg-[#101626] border border-[#1E2945]/70 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-[#F3F5FA]">
            Have Questions About These Architectures?
          </h3>
          <p className="text-xs text-[#9AA3C2]">
            Our engineering leads are available on WhatsApp for direct technical Q&A and scoping sessions.
          </p>
        </div>

        <a
          id="blog-hub-whatsapp-btn"
          href="https://wa.me/923101072246?text=Hi%2C%20I%20was%20reading%20your%20engineering%20insights%20and%20would%20like%20to%20chat%20with%20your%20team."
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#128C7E] hover:bg-[#25D366] text-white text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition-all shrink-0 shadow-[0_4px_18px_rgba(37,211,102,0.25)] cursor-pointer"
        >
          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true" className="shrink-0">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          <span>Chat on WhatsApp (+92 310 1072246)</span>
        </a>
      </div>
    </div>
  );
};
