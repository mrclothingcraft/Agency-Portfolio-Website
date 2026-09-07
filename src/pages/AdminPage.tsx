import React, { useState } from 'react';
import { PageRoute, ServiceCategory } from '../types';
import { useCms } from '../context/CmsContext';
import { useCursor } from '../context/CursorContext';
import { 
  Plus, 
  Trash2, 
  RefreshCw, 
  Download, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  MessageSquare, 
  FileText, 
  Briefcase 
} from 'lucide-react';

interface AdminPageProps {
  onNavigate: (route: PageRoute, slug?: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const {
    projects,
    services,
    testimonials,
    blogPosts,
    team,
    inquiries,
    addProject,
    deleteProject,
    addBlogPost,
    deleteBlogPost,
    addTestimonial,
    deleteTestimonial,
    updateInquiryStatus,
    resetToDefaults
  } = useCms();

  const { setCursor, resetCursor } = useCursor();

  const [activeTab, setActiveTab] = useState<'projects' | 'services' | 'testimonials' | 'blog' | 'inquiries'>('projects');
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [successNotification, setSuccessNotification] = useState<string | null>(null);

  // New Project Form State
  const [newProject, setNewProject] = useState({
    title: '',
    client: '',
    category: 'Shopify Development' as ServiceCategory,
    featured: true,
    year: new Date().getFullYear().toString(),
    duration: '4 Weeks',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&auto=format&fit=crop&q=80',
    overview: '',
    problem: '',
    solution: '',
    metric1Val: '+280%',
    metric1Label: 'Revenue Expansion',
    metric2Val: '1.1s',
    metric2Label: 'Load Speed',
    quote: '',
    quoteAuthor: '',
    quoteRole: '',
    deliverables: 'Custom Architecture, Headless Setup, Speed Optimization'
  });

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.client) return;

    const slug = newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    addProject({
      slug: slug || `project-${Date.now()}`,
      title: newProject.title,
      client: newProject.client,
      category: newProject.category,
      featured: newProject.featured,
      year: newProject.year,
      duration: newProject.duration,
      thumbnail: newProject.thumbnail,
      heroImage: newProject.heroImage,
      overview: newProject.overview || `${newProject.title} was architected for ${newProject.client} to scale digital performance.`,
      problem: newProject.problem || 'Legacy architecture bottlenecked scalability and reduced organic conversion velocity.',
      solution: newProject.solution || 'Engineered high-performance custom infrastructure with sub-second response times.',
      results: [
        { metric: newProject.metric1Val, label: newProject.metric1Label },
        { metric: newProject.metric2Val, label: newProject.metric2Label }
      ],
      clientQuote: {
        quote: newProject.quote || 'Aether exceeded every benchmark and delivered on an impossible timeline.',
        author: newProject.quoteAuthor || 'Executive Director',
        role: newProject.quoteRole || `Leadership, ${newProject.client}`
      },
      deliverables: newProject.deliverables.split(',').map(d => d.trim())
    });

    setShowAddProjectModal(false);
    setSuccessNotification(`Project "${newProject.title}" published! It is now instantly visible on: Work Page, Service Hub ("${newProject.category}"), and Homepage (Featured = ${newProject.featured ? 'Yes' : 'No'}).`);
    setTimeout(() => setSuccessNotification(null), 8000);
  };

  const handleExportJson = () => {
    const backup = {
      services,
      projects,
      testimonials,
      blogPosts,
      team,
      inquiries,
      exportedAt: new Date().toISOString()
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `aether-agency-cms-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div id="admin-cms-page" className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl bg-[#101626] border border-[#3E7BFA]/30 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#161F36] text-xs font-semibold text-[#3E7BFA] border border-[#3E7BFA]/20">
            <Sparkles className="h-3.5 w-3.5 text-[#17B4E0]" />
            Unified CMS Layer · Section 11 Architecture
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F3F5FA]">
            Agency Content Dashboard
          </h1>
          <p className="text-xs text-[#9AA3C2] max-w-xl">
            Single control center: tag content once by category, and it automatically cascades across the Homepage, Work Gallery, and matching Service sub-pages.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportJson}
            className="px-5 py-2.5 rounded-full bg-[#0A0E1A] hover:bg-[#161F36] text-xs font-semibold text-[#17B4E0] border border-[#17B4E0]/30 flex items-center gap-2 transition-all"
            title="Download JSON Database"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset CMS database to factory defaults? All manual edits will revert.')) {
                resetToDefaults();
                setSuccessNotification('Database reset to defaults.');
                setTimeout(() => setSuccessNotification(null), 4000);
              }
            }}
            className="px-5 py-2.5 rounded-full bg-[#0A0E1A] hover:bg-[#161F36] text-xs font-semibold text-[#9AA3C2] hover:text-red-400 border border-[#1E2945] flex items-center gap-2 transition-all"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successNotification && (
        <div className="p-4 rounded-2xl bg-[#0A0E1A] border-2 border-[#3E7BFA] text-xs text-[#3E7BFA] flex items-start gap-3 shadow-lg animate-in fade-in">
          <CheckCircle2 className="h-5 w-5 text-[#17B4E0] shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{successNotification}</div>
          <button onClick={() => setSuccessNotification(null)} className="text-[#9AA3C2] hover:text-[#F3F5FA]">✕</button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#1E2945] pb-4">
        {[
          { id: 'projects', label: `Projects (${projects.length})`, icon: Briefcase },
          { id: 'services', label: `Services (${services.length})`, icon: Layers },
          { id: 'testimonials', label: `Testimonials (${testimonials.length})`, icon: MessageSquare },
          { id: 'blog', label: `Blog Posts (${blogPosts.length})`, icon: FileText },
          { id: 'inquiries', label: `Inquiries (${inquiries.length})`, icon: Sparkles }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] shadow-[0_2px_15px_rgba(62,123,250,0.4)] border border-[#3E7BFA]/40'
                  : 'bg-[#101626] text-[#9AA3C2] hover:text-[#F3F5FA] border border-[#1E2945]'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PROJECTS (PORTFOLIO) */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#F3F5FA]">Portfolio Projects Management</h2>
              <p className="text-xs text-[#9AA3C2]">
                Add or edit projects. The category tag automatically maps the project to its corresponding Service sub-page!
              </p>
            </div>

            <button
              id="admin-add-project-btn"
              onClick={() => setShowAddProjectModal(true)}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_4px_20px_rgba(62,123,250,0.35)] hover:scale-105 transition-transform self-start border border-[#3E7BFA]/40"
            >
              <Plus className="h-4 w-4 stroke-[3]" />
              <span>Add New Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-5 rounded-2xl bg-[#101626] border border-[#1E2945] space-y-4 shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="aspect-16/10 rounded-xl overflow-hidden relative border border-[#1E2945]">
                    <img src={proj.thumbnail} alt={proj.title} className="h-full w-full object-cover" />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#0A0E1A]/90 text-[10px] font-bold text-[#3E7BFA] border border-[#3E7BFA]/30">
                      {proj.category}
                    </div>
                    {proj.featured && (
                      <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#17B4E0] text-[10px] font-extrabold text-[#0A0E1A]">
                        Featured on Home
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#F3F5FA]">{proj.title}</h3>
                    <p className="text-xs text-[#9AA3C2]">{proj.client} · {proj.year}</p>
                  </div>

                  <p className="text-xs text-[#9AA3C2] line-clamp-2">{proj.overview}</p>
                </div>

                <div className="pt-4 border-t border-[#1E2945] flex items-center justify-between">
                  <button
                    onClick={() => onNavigate('case-study', proj.slug)}
                    className="text-xs text-[#17B4E0] hover:underline flex items-center gap-1"
                  >
                    View Page <ExternalLink className="h-3 w-3" />
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete project "${proj.title}"?`)) {
                        deleteProject(proj.id);
                      }
                    }}
                    className="p-2 rounded-full bg-[#161F36] hover:bg-red-500/20 text-[#9AA3C2] hover:text-red-400 transition-colors"
                    title="Delete project"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SERVICES */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#F3F5FA]">Core 5 Disciplines</h2>
            <p className="text-xs text-[#9AA3C2]">Configured service definitions, promises, and pricing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((srv) => (
              <div key={srv.id} className="p-6 rounded-2xl bg-[#101626] border border-[#1E2945] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#F3F5FA]">{srv.title}</h3>
                  <span className="text-xs text-[#3E7BFA] font-semibold">{srv.metricHighlight.value}</span>
                </div>
                <p className="text-xs text-[#9AA3C2]">{srv.oneLinePromise}</p>
                
                <div className="text-xs space-y-1">
                  <span className="font-bold text-[#F3F5FA] block">Deliverables ({srv.deliverables.length}):</span>
                  <ul className="list-disc list-inside text-[#9AA3C2] space-y-0.5">
                    {srv.deliverables.slice(0, 3).map((d, i) => (
                      <li key={i} className="truncate">{d}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-[#1E2945] flex items-center justify-between">
                  <button
                    onClick={() => onNavigate('service-detail', srv.slug)}
                    className="text-xs text-[#17B4E0] hover:underline flex items-center gap-1"
                  >
                    Open Live Service Hub <ExternalLink className="h-3 w-3" />
                  </button>
                  <span className="text-[11px] text-[#9AA3C2]">3 Pricing Tiers Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TESTIMONIALS */}
      {activeTab === 'testimonials' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#F3F5FA]">Client Quotes & Validation</h2>
              <p className="text-xs text-[#9AA3C2]">Featured on Homepage and Case Study pages.</p>
            </div>
            <button
              onClick={() => {
                const author = window.prompt('Client Name:');
                if (!author) return;
                const company = window.prompt('Client Company:') || 'Company';
                const content = window.prompt('Quote:') || 'Outstanding results.';
                addTestimonial({
                  name: author,
                  role: 'Executive',
                  company,
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
                  content,
                  rating: 5,
                  category: 'General',
                  metricAchieved: '+150% Uplift'
                });
              }}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-xs text-[#F3F5FA] font-bold uppercase transition-all shadow-[0_4px_15px_rgba(62,123,250,0.3)] border border-[#3E7BFA]/40"
            >
              + Add Testimonial
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="p-6 rounded-2xl bg-[#101626] border border-[#1E2945] space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <p className="text-xs text-[#F3F5FA] italic">"{t.content}"</p>
                  <div className="text-[11px] text-[#3E7BFA] font-semibold">Result: {t.metricAchieved}</div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#1E2945]">
                  <div>
                    <div className="text-xs font-bold text-[#F3F5FA]">{t.name}</div>
                    <div className="text-[10px] text-[#9AA3C2]">{t.role}, {t.company}</div>
                  </div>
                  <button
                    onClick={() => deleteTestimonial(t.id)}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: BLOG POSTS */}
      {activeTab === 'blog' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#F3F5FA]">Insights & Technical Articles</h2>
              <p className="text-xs text-[#9AA3C2]">Authority-building thought leadership posts.</p>
            </div>
            <button
              onClick={() => {
                const title = window.prompt('Article Title:');
                if (!title) return;
                const excerpt = window.prompt('Short Excerpt:') || 'Engineering notes on modern architecture.';
                const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                addBlogPost({
                  slug,
                  title,
                  excerpt,
                  content: 'Full essay content written from our studio leadership...',
                  author: {
                    name: 'Devon Vance',
                    role: 'Creative Technologist',
                    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'
                  },
                  date: 'Just now',
                  readTime: '4 min read',
                  category: 'Web Development',
                  coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
                  tags: ['Architecture', 'Engineering']
                });
              }}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-xs text-[#F3F5FA] font-bold uppercase transition-all shadow-[0_4px_15px_rgba(62,123,250,0.3)] border border-[#3E7BFA]/40"
            >
              + Publish Article
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <div key={post.id} className="p-6 rounded-2xl bg-[#101626] border border-[#1E2945] space-y-3">
                <span className="text-[10px] text-[#3E7BFA] font-bold uppercase">{post.category}</span>
                <h3 className="text-base font-bold text-[#F3F5FA]">{post.title}</h3>
                <p className="text-xs text-[#9AA3C2] line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-3 border-t border-[#1E2945]">
                  <button onClick={() => onNavigate('blog-post', post.slug)} className="text-xs text-[#17B4E0] hover:underline">
                    Read Article →
                  </button>
                  <button onClick={() => deleteBlogPost(post.id)} className="text-xs text-red-400">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: LEAD INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#F3F5FA]">Inbound Lead Inquiries</h2>
            <p className="text-xs text-[#9AA3C2]">Submissions captured via the Contact & Quote brief form.</p>
          </div>

          {inquiries.length > 0 ? (
            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-6 rounded-2xl bg-[#101626] border border-[#1E2945] space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm text-[#F3F5FA]">{inq.name}</span>
                      <span className="text-xs text-[#9AA3C2]">({inq.email})</span>
                      {inq.company && <span className="text-xs text-[#3E7BFA]">[{inq.company}]</span>}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#9AA3C2]">{new Date(inq.createdAt).toLocaleDateString()}</span>
                      <select
                        value={inq.status}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                        className="text-xs bg-[#0A0E1A] text-[#17B4E0] border border-[#1E2945] rounded-full px-3 py-1"
                      >
                        <option value="New">New</option>
                        <option value="In Review">In Review</option>
                        <option value="Contacted">Contacted</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-[#0A0E1A] p-3.5 rounded-xl border border-[#1E2945]/50">
                    <div><span className="text-[#9AA3C2]">Discipline:</span> <span className="font-semibold text-[#F3F5FA]">{inq.service}</span></div>
                    <div><span className="text-[#9AA3C2]">Budget:</span> <span className="font-semibold text-[#3E7BFA]">{inq.budget}</span></div>
                    <div><span className="text-[#9AA3C2]">Timeline:</span> <span className="font-semibold text-[#17B4E0]">{inq.timeline}</span></div>
                  </div>

                  {inq.message && (
                    <p className="text-xs text-[#9AA3C2] bg-[#0A0E1A]/50 p-3 rounded-xl italic">
                      "{inq.message}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-[#9AA3C2] bg-[#101626] rounded-2xl border border-[#1E2945]">
              No inquiries submitted yet. Use the Contact page to submit a project brief!
            </div>
          )}
        </div>
      )}

      {/* Modal: Add New Project */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#101626] border-2 border-[#3E7BFA] rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1E2945] pb-4">
              <div>
                <h3 className="text-xl font-bold text-[#F3F5FA]">Add Project to Single Database</h3>
                <p className="text-xs text-[#3E7BFA]">Will auto-cascade to Work Gallery, matching Service Hub, and Homepage.</p>
              </div>
              <button onClick={() => setShowAddProjectModal(false)} className="text-[#9AA3C2] hover:text-[#F3F5FA]">✕</button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#9AA3C2]">Project Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Global EV Portal"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0E1A] border border-[#1E2945] text-[#F3F5FA] focus:border-[#3E7BFA] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#9AA3C2]">Client Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Mobility Corp"
                    value={newProject.client}
                    onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0E1A] border border-[#1E2945] text-[#F3F5FA] focus:border-[#3E7BFA] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#3E7BFA] font-bold">Category Tag (Auto-Syncs with Matching Service Hub!)</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value as ServiceCategory })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0E1A] border border-[#3E7BFA]/50 text-[#F3F5FA] focus:border-[#3E7BFA] outline-none"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="E-commerce Complete Solution">E-commerce Complete Solution</option>
                    <option value="Shopify Development">Shopify Development</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#9AA3C2]">Feature on Homepage?</label>
                  <div className="flex items-center gap-4 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-[#F3F5FA]">
                      <input
                        type="checkbox"
                        checked={newProject.featured}
                        onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                        className="h-4 w-4 rounded accent-[#3E7BFA]"
                      />
                      <span>Show in Homepage 4-Card Grid</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#9AA3C2]">Thumbnail Image URL</label>
                <input
                  type="url"
                  value={newProject.thumbnail}
                  onChange={(e) => setNewProject({ ...newProject, thumbnail: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0A0E1A] border border-[#1E2945] text-[#F3F5FA] focus:border-[#3E7BFA] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#9AA3C2]">Key Result 1 (e.g. "+340%")</label>
                  <input
                    type="text"
                    value={newProject.metric1Val}
                    onChange={(e) => setNewProject({ ...newProject, metric1Val: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0E1A] border border-[#1E2945] text-[#F3F5FA] focus:border-[#3E7BFA] outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[#9AA3C2]">Metric 1 Label (e.g. "Conversion Rate")</label>
                  <input
                    type="text"
                    value={newProject.metric1Label}
                    onChange={(e) => setNewProject({ ...newProject, metric1Label: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0E1A] border border-[#1E2945] text-[#F3F5FA] focus:border-[#3E7BFA] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#9AA3C2]">Project Brief & Overview</label>
                <textarea
                  rows={2}
                  placeholder="Overview of the transformation..."
                  value={newProject.overview}
                  onChange={(e) => setNewProject({ ...newProject, overview: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0A0E1A] border border-[#1E2945] text-[#F3F5FA] focus:border-[#3E7BFA] outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-[#F3F5FA] font-bold uppercase tracking-wider text-xs shadow-[0_4px_20px_rgba(62,123,250,0.35)] border border-[#3E7BFA]/40"
                >
                  Publish & Auto-Propagate Across Site
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  className="px-5 py-3 rounded-full bg-[#161F36] text-[#9AA3C2] hover:text-[#F3F5FA] border border-[#1E2945]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
