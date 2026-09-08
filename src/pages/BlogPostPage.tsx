import React, { useState } from 'react';
import { PageRoute } from '../types';
import { useCms } from '../context/CmsContext';
import { useCursor } from '../context/CursorContext';
import { ArrowLeft, Calendar, Clock, Share2, Tag, Check } from 'lucide-react';

interface BlogPostPageProps {
  slug: string;
  onNavigate: (route: PageRoute, slug?: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, onNavigate }) => {
  const { getBlogPostBySlug, blogPosts } = useCms();
  const { setCursor, resetCursor } = useCursor();
  const [copied, setCopied] = useState(false);

  const post = getBlogPostBySlug(slug) || blogPosts[0];

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div id={`blog-post-${post.slug}`} className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      {/* Back button */}
      <div>
        <button
          onClick={() => onNavigate('blog')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#9AA3C2] hover:text-[#3E7BFA] transition-colors"
          onMouseEnter={() => setCursor('link', 'Back')}
          onMouseLeave={resetCursor}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Articles</span>
        </button>
      </div>

      {/* Header */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-[#101626] border border-[#1E2945] text-xs font-semibold text-[#3E7BFA]">
            {post.category}
          </span>
          <span className="text-xs text-[#9AA3C2] flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-[#17B4E0]" />
            {post.date}
          </span>
          <span className="text-xs text-[#9AA3C2] flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[#17B4E0]" />
            {post.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F3F5FA] tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base text-[#9AA3C2] leading-relaxed">
          {post.excerpt}
        </p>

        {/* Author bar */}
        <div className="flex items-center justify-between py-4 border-y border-[#1E2945]/70">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              referrerPolicy="no-referrer"
              className="h-9 w-9 rounded-full object-cover border border-[#1E2945]"
            />
            <div>
              <div className="text-xs font-semibold text-[#F3F5FA]">{post.author.name}</div>
              <div className="text-[11px] text-[#9AA3C2]">{post.author.role}</div>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 rounded-full bg-[#101626] hover:bg-[#161F36] text-xs text-[#9AA3C2] hover:text-[#F3F5FA] border border-[#1E2945] flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="h-3 w-3 text-[#17B4E0]" /> : <Share2 className="h-3 w-3 text-[#3E7BFA]" />}
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Hero Cover */}
      <div className="rounded-2xl overflow-hidden aspect-16/9 border border-[#1E2945]/70">
        <img
          src={post.coverImage}
          alt={post.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <article className="max-w-none space-y-6 text-[#F3F5FA] leading-relaxed text-sm sm:text-base">
        <div className="whitespace-pre-line text-[#9AA3C2] font-normal leading-loose">
          {post.content}
        </div>
      </article>

      {/* Tags */}
      <div className="pt-6 border-t border-[#1E2945]/70 flex items-center gap-2">
        <Tag className="h-3.5 w-3.5 text-[#3E7BFA]" />
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-full bg-[#101626] text-[11px] text-[#9AA3C2] border border-[#1E2945]">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Author Bio */}
      <div className="p-6 rounded-2xl bg-[#101626] border border-[#1E2945]/70 flex items-start gap-4">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          referrerPolicy="no-referrer"
          className="h-12 w-12 rounded-full object-cover border border-[#1E2945] shrink-0"
        />
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-semibold text-[#3E7BFA] tracking-wider">Author</span>
          <h4 className="text-sm font-bold text-[#F3F5FA]">{post.author.name}</h4>
          <p className="text-xs text-[#9AA3C2]">
            {post.author.role} at Aether Studio.
          </p>
        </div>
      </div>
    </div>
  );
};
