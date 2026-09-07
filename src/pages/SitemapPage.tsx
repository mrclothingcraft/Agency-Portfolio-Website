import React, { useState } from 'react';
import { PageRoute } from '../types';
import { useCms } from '../context/CmsContext';
import { useCursor } from '../context/CursorContext';
import { Network, Code, Copy, CheckCircle2, ArrowRight } from 'lucide-react';

interface SitemapPageProps {
  onNavigate: (route: PageRoute, slug?: string) => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate }) => {
  const { services, projects, blogPosts } = useCms();
  const { setCursor, resetCursor } = useCursor();
  const [viewXml, setViewXml] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate dynamic XML
  const baseUrl = 'https://aetherstudio.agency';
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Root Pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/services</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/work</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/pricing</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Service Sub-Pages -->
${services.map(s => `  <url>
    <loc>${baseUrl}/services/${s.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>`).join('\n')}

  <!-- Case Studies -->
${projects.map(p => `  <url>
    <loc>${baseUrl}/work/${p.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}

  <!-- Blog Posts -->
${blogPosts.map(b => `  <url>
    <loc>${baseUrl}/blog/${b.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(xmlContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div id="sitemap-page" className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#3E7BFA]/15 via-[#17B4E0]/15 to-transparent border border-[#3E7BFA]/35 text-xs font-semibold text-[#3E7BFA] mb-2">
            <Network className="h-3.5 w-3.5 text-[#17B4E0]" />
            SEO & Structural Index
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F3F5FA]">
            Dynamic XML & HTML Sitemap
          </h1>
          <p className="text-xs text-[#9AA3C2]">
            Auto-synchronized with all current published services, portfolio case studies, and blog articles.
          </p>
        </div>

        <button
          onClick={() => setViewXml(!viewXml)}
          className="px-5 py-2.5 rounded-full bg-[#101626] hover:bg-[#161F36] text-xs font-semibold text-[#3E7BFA] border border-[#3E7BFA]/30 flex items-center gap-2 self-start transition-all"
        >
          <Code className="h-4 w-4" />
          <span>{viewXml ? 'View Visual Tree' : 'View Raw XML'}</span>
        </button>
      </div>

      {viewXml ? (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 rounded-full bg-[#161F36] text-xs text-[#17B4E0] border border-[#17B4E0]/30 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied XML!' : 'Copy XML Code'}</span>
            </button>
          </div>
          <pre className="p-6 rounded-2xl bg-[#0A0E1A] border border-[#1E2945] text-xs text-[#9AA3C2] overflow-x-auto font-mono leading-relaxed">
            {xmlContent}
          </pre>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main Pages */}
          <div className="p-6 rounded-2xl bg-[#101626] border border-[#1E2945] space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#3E7BFA]">Core Pages</h2>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'Homepage (with 3D WebGL Canvas)', route: 'home' },
                { name: 'About Studio & Leadership', route: 'about' },
                { name: 'Services Hub', route: 'services' },
                { name: 'Work / Portfolio Gallery', route: 'work' },
                { name: 'Pricing & Scope Calculator', route: 'pricing' },
                { name: 'Blog & Insights', route: 'blog' },
                { name: 'Contact & Executive Scheduler', route: 'contact' },
                { name: 'Admin CMS Content Layer', route: 'admin' }
              ].map(item => (
                <li key={item.route}>
                  <button
                    onClick={() => onNavigate(item.route as PageRoute)}
                    className="text-[#F3F5FA] hover:text-[#3E7BFA] flex items-center gap-2 transition-colors text-left"
                    onMouseEnter={() => setCursor('link')}
                    onMouseLeave={resetCursor}
                  >
                    <ArrowRight className="h-3 w-3 text-[#17B4E0]" />
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Sub-Pages */}
          <div className="p-6 rounded-2xl bg-[#101626] border border-[#1E2945] space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#17B4E0]">{services.length} Service Hub Sub-Pages</h2>
            <ul className="space-y-2 text-xs">
              {services.map(s => (
                <li key={s.slug}>
                  <button
                    onClick={() => onNavigate('service-detail', s.slug)}
                    className="text-[#F3F5FA] hover:text-[#17B4E0] flex items-center gap-2 transition-colors text-left"
                    onMouseEnter={() => setCursor('link')}
                    onMouseLeave={resetCursor}
                  >
                    <ArrowRight className="h-3 w-3 text-[#3E7BFA]" />
                    <span>{s.title} ({s.slug})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Dynamic Case Studies */}
          <div className="p-6 rounded-2xl bg-[#101626] border border-[#1E2945] space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#3E7BFA]">
              Case Studies ({projects.length})
            </h2>
            <ul className="space-y-2 text-xs max-h-60 overflow-y-auto pr-2">
              {projects.map(p => (
                <li key={p.slug}>
                  <button
                    onClick={() => onNavigate('case-study', p.slug)}
                    className="text-[#F3F5FA] hover:text-[#3E7BFA] flex items-center gap-2 transition-colors text-left truncate"
                    onMouseEnter={() => setCursor('link')}
                    onMouseLeave={resetCursor}
                  >
                    <ArrowRight className="h-3 w-3 text-[#17B4E0] shrink-0" />
                    <span className="truncate">{p.title} <span className="text-[#9AA3C2]">({p.category})</span></span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Dynamic Blog Posts */}
          <div className="p-6 rounded-2xl bg-[#101626] border border-[#1E2945] space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#17B4E0]">
              Blog Insights ({blogPosts.length})
            </h2>
            <ul className="space-y-2 text-xs max-h-60 overflow-y-auto pr-2">
              {blogPosts.map(b => (
                <li key={b.slug}>
                  <button
                    onClick={() => onNavigate('blog-post', b.slug)}
                    className="text-[#F3F5FA] hover:text-[#17B4E0] flex items-center gap-2 transition-colors text-left truncate"
                    onMouseEnter={() => setCursor('link')}
                    onMouseLeave={resetCursor}
                  >
                    <ArrowRight className="h-3 w-3 text-[#3E7BFA] shrink-0" />
                    <span className="truncate">{b.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
