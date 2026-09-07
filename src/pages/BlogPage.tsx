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

  const allTags = ['All', 'Web Development', 'Shopify Development', 'Digital Marketing', 'WebGL'];

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
    </div>
  );
};
