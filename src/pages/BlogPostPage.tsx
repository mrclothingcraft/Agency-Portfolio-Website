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

      {/* Direct WhatsApp Call to Action for Blog Readers */}
      <div className="p-8 rounded-2xl bg-[#101626] border border-[#25D366]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base font-bold text-[#F3F5FA]">
            Need a similar system built for your company?
          </h4>
          <p className="text-xs text-[#9AA3C2]">
            Chat directly with our development lead on WhatsApp to discuss specifications and quotes.
          </p>
        </div>

        <a
          id="blog-post-whatsapp-cta"
          href={`https://wa.me/923101072246?text=${encodeURIComponent(
            `Hi! I read your article "${post.title}" and would like to consult on a similar project.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#128C7E] hover:bg-[#25D366] text-white text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition-all shrink-0 shadow-[0_4px_18px_rgba(37,211,102,0.3)] cursor-pointer"
        >
          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true" className="shrink-0">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          <span>WhatsApp Us (+92 310 1072246)</span>
        </a>
      </div>
    </div>
  );
};
