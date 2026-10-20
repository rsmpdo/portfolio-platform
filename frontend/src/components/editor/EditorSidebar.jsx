import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectComponent,
  updateComponentVisibility,
  addComponent,
  removeComponent,
  reorderComponents,
  updateTheme,
  updateSeo,
  updateHandle,
  saveUserLayout,
  applyTemplate
} from '../../store/layoutSlice';
import {
  Layers,
  Plus,
  Eye,
  EyeOff,
  Trash2,
  MoveUp,
  MoveDown,
  Palette,
  Globe,
  Save,
  Check,
  Sparkles,
  ExternalLink,
  GripVertical,
  Loader2,
  Crown,
  Lock,
  ArrowUpRight,
  ShieldCheck,
  Search,
  CheckCircle2,
  X
} from 'lucide-react';

const AVAILABLE_COMPONENTS = [
  { type: 'HeroBanner', title: 'Hero Banner', icon: '✨', tier: 'free' },
  { type: 'AboutMe', title: 'About Me', icon: '👤', tier: 'free' },
  { type: 'ProjectsGrid', title: 'Projects Grid', icon: '🚀', tier: 'free' },
  { type: 'ExperienceTimeline', title: 'Experience Timeline', icon: '💼', tier: 'free' },
  { type: 'SkillsCloud', title: 'Skills Cloud', icon: '⚡', tier: 'free' },
  { type: 'TestimonialsCarousel', title: 'Testimonials', icon: '⭐', tier: 'free' },
  { type: 'ContactSection', title: 'Contact Section', icon: '✉️', tier: 'free' },
  { type: 'MediaGallery', title: 'Media Gallery', icon: '🖼️', tier: 'free' },
  { type: 'PremiumEmbed', title: 'Interactive Embed', icon: '🔮', tier: 'pro', badge: 'Pro' },
  { type: 'AdvancedMetrics', title: 'Data Metrics & Impact', icon: '📈', tier: 'studio', badge: 'Studio' }
];

export default function EditorSidebar({ accentColor = '#6366f1', templateLabel = null }) {
  const dispatch = useDispatch();
  const { activeLayout, selectedComponentId, isSaving, saveSuccess } = useSelector(
    (state) => state.layout
  );
  const { user } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState('components');
  const [upgradeModalInfo, setUpgradeModalInfo] = useState(null);

  if (!activeLayout) return null;

  const currentPlan = (user?.plan || 'free').toLowerCase();
  const isFreePlan = currentPlan === 'free';
  const isStudioPlan = currentPlan === 'studio';
  const isProOrStudio = currentPlan === 'pro' || currentPlan === 'studio';
  const componentCount = activeLayout.components?.length || 0;

  const getDefaultPropsForType = (type) => {
    const ts = Date.now();
    switch (type) {
      case 'HeroBanner':
        return {
          badgeText: 'Available for Opportunities',
          headline: "Hi, I'm Alex Morgan",
          subheadline: 'Crafting high-impact digital experiences and modern web applications with precision.',
          avatarUrl: '',
          ctaText: 'Explore My Work',
          githubUrl: '',
          linkedinUrl: '',
          bgVideoUrl: ''
        };
      case 'AboutMe':
        return {
          heading: 'The Story Behind the Work',
          bio: 'I specialize in turning intricate concepts into elegant, performant digital reality. With over 5 years of experience across the stack, I combine product intuition with technical rigor.',
          skills: ['React', 'Node.js', 'System Architecture', 'UI/UX Design', 'Cloud Infrastructure'],
          experienceYears: '5+',
          completedProjects: '40+',
          happyClients: '30+'
        };
      case 'ProjectsGrid':
        return {
          heading: 'Featured Work & Case Studies',
          items: [
            {
              id: `p_${ts}_1`,
              title: 'Enterprise Analytics Engine',
              description: 'Real-time telemetry and metrics visualization processing 50K events/sec.',
              imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
              liveUrl: 'https://example.com',
              githubUrl: 'https://github.com',
              tags: ['React', 'TypeScript', 'D3.js']
            },
            {
              id: `p_${ts}_2`,
              title: 'Spatial Commerce Interface',
              description: 'Web-based 3D product visualizer with instant AR preview and seamless checkout.',
              imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
              liveUrl: 'https://example.com',
              githubUrl: 'https://github.com',
              tags: ['Three.js', 'WebGL', 'Tailwind']
            }
          ]
        };
      case 'ExperienceTimeline':
        return {
          heading: "Where I've Made an Impact",
          subheading: 'A track record of shipping great work at companies that push boundaries.',
          items: [
            {
              id: `exp_${ts}_1`,
              role: 'Lead Full Stack Architect',
              company: 'Veloce Labs',
              period: '2023 — Present',
              description: 'Spearheaded migration to micro-frontends, accelerating deployment cycles by 3.5x while leading a team of 8 engineers.',
              highlights: ['Architecture', 'Leadership', 'Performance']
            },
            {
              id: `exp_${ts}_2`,
              role: 'Senior Product Engineer',
              company: 'Apex Digital',
              period: '2021 — 2023',
              description: 'Engineered high-conversion user journeys for flagship SaaS products, generating $4.2M in annual recurring revenue.',
              highlights: ['Product Design', 'Next.js', 'GraphQL']
            }
          ]
        };
      case 'SkillsCloud':
        return {
          heading: 'Tools of the Trade',
          subheading: 'Technologies and platforms I use daily to turn ambitious visions into scalable reality.',
          categories: [
            {
              name: 'Frontend & UI',
              skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
            },
            {
              name: 'Backend & APIs',
              skills: ['Node.js', 'Express', 'Python', 'GraphQL', 'REST APIs', 'PostgreSQL']
            },
            {
              name: 'Cloud & Infrastructure',
              skills: ['Docker', 'AWS', 'Redis', 'Vercel', 'CI/CD Pipelines']
            }
          ]
        };
      case 'TestimonialsCarousel':
        return {
          heading: "Don't Take My Word For It",
          items: [
            {
              id: `t_${ts}_1`,
              quote: 'Delivered an extraordinary product on time and under budget. The visual polish and performance exceeded our highest expectations.',
              author: 'Elena Rostova',
              role: 'VP of Product, Aura Global',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
            },
            {
              id: `t_${ts}_2`,
              quote: 'One of the most talented engineers and designers I have worked with in 15 years in tech. Highly recommended.',
              author: 'Marcus Vance',
              role: 'Founder & CEO, Horizon Studio',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
            }
          ]
        };
      case 'ContactSection':
        return {
          heading: 'Ready to Create Something Great?',
          subheading: "Whether you have an upcoming project or just want to explore ideas — let's connect.",
          email: 'hello@example.com',
          location: 'San Francisco, CA (or Remote)',
          phone: '+1 (555) 234-5678',
          responseTime: 'Usually responds within 24 hours'
        };
      case 'MediaGallery':
        return {
          heading: 'Visual Showcase',
          subheading: 'A curated gallery of craft, motion, and design explorations.',
          items: [
            {
              id: `m_${ts}_1`,
              title: 'Brand System & Identity',
              description: 'Complete visual identity including typography and color system.',
              type: 'image',
              url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
            },
            {
              id: `m_${ts}_2`,
              title: 'Spatial Architecture Exploration',
              description: 'Spatial and material study in physical and digital space.',
              type: 'image',
              url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
            }
          ]
        };
      case 'PremiumEmbed':
        return {
          heading: 'Interactive Prototype',
          embedType: 'figma',
          embedUrl: 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/example',
          height: '600px',
          isProFeature: true
        };
      case 'AdvancedMetrics':
        return {
          heading: 'Impact & Scale',
          isStudioFeature: true,
          metrics: [
            { id: `m_${ts}_1`, label: 'Revenue Generated', value: '$12M+', icon: 'trending' },
            { id: `m_${ts}_2`, label: 'Active Daily Users', value: '3.4M', icon: 'users' },
            { id: `m_${ts}_3`, label: 'Global Design Awards', value: '18', icon: 'target' },
            { id: `m_${ts}_4`, label: 'Uptime SLA', value: '99.99%', icon: 'zap' }
          ]
        };
      default:
        return {};
    }
  };

  const handleAddComponent = (item) => {
    // Plan gates
    if (item.tier === 'studio' && !isStudioPlan) {
      setUpgradeModalInfo({
        title: 'Studio Plan Feature',
        message: 'The Data Metrics & Impact component is an exclusive Studio tier feature for agencies and teams.',
        targetPlan: 'studio'
      });
      return;
    }

    if (item.tier === 'pro' && isFreePlan) {
      setUpgradeModalInfo({
        title: 'Pro Creator Feature',
        message: 'Interactive Embeds (Figma, YouTube, 3D Spline) are available on Pro Creator and Studio plans.',
        targetPlan: 'pro'
      });
      return;
    }

    if (isFreePlan && componentCount >= 5) {
      setUpgradeModalInfo({
        title: 'Free Plan Section Limit',
        message: 'Free accounts include up to 5 portfolio sections. Upgrade to Pro Creator for unlimited sections, custom embeds, and advanced features.',
        targetPlan: 'pro'
      });
      return;
    }

    const defaultProps = getDefaultPropsForType(item.type);
    dispatch(addComponent({ type: item.type, title: item.title, defaultProps }));
  };

  const seo = activeLayout.seo || {};

  return (
    <aside className="w-80 h-full glass-dark border-r border-white/[0.06] flex flex-col z-30 relative">
      {/* Plan Badge Header */}
      <div className="p-3 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between px-4">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
          {currentPlan === 'studio' ? (
            <span className="badge badge-emerald flex items-center gap-1">
              <Crown className="w-3 h-3 text-emerald-400" />
              <span>Studio Plan</span>
            </span>
          ) : currentPlan === 'pro' ? (
            <span className="badge badge-indigo flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>Pro Plan</span>
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 text-[10px]">
              Free Plan ({componentCount}/5 Sections)
            </span>
          )}
        </div>

        {isFreePlan && (
          <Link
            to="/pricing"
            className="text-[11px] text-amber-400 font-bold hover:text-amber-300 flex items-center gap-0.5 underline-hover"
          >
            <span>Upgrade</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        )}
      </div>

      {/* Template Identity Strip */}
      {templateLabel && (
        <div
          className="px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.06]"
          style={{ background: `${accentColor}18`, borderLeft: `3px solid ${accentColor}` }}
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: accentColor }}
          />
          <div className="min-w-0">
            <p className="text-[9px] uppercase tracking-widest font-semibold text-slate-500">Active Template</p>
            <p className="text-xs font-bold text-white truncate" style={{ color: accentColor }}>{templateLabel}</p>
          </div>
        </div>
      )}

      {/* Top Header & Save Status Indicator */}
      <div className="p-4 border-b border-white/[0.06] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
          <span className="font-heading font-bold text-sm text-white">Sections</span>
        </div>
        <div className="flex items-center gap-1.5 select-none">
          {isSaving ? (
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold flex items-center gap-1.5">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
              <span>Saving...</span>
            </span>
          ) : saveSuccess ? (
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 animate-fadeIn">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Saved!</span>
            </span>
          ) : activeLayout?.isPublished ? (
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Published</span>
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5">
              <EyeOff className="w-3.5 h-3.5 text-amber-400" />
              <span>Draft</span>
            </span>
          )}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-white/[0.06] p-1.5 gap-1">
        {[
          { key: 'components', icon: Layers, label: 'Structure' },
          { key: 'theme', icon: Palette, label: 'Theme' },
          { key: 'settings', icon: Globe, label: 'SEO & URL' }
        ].map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition ${
              activeTab === key
                ? 'glass border border-indigo-500/30 text-indigo-400 font-bold'
                : 'text-slate-500 hover:text-white'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {activeTab === 'components' && (
          <>
            {/* Active Sections list */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Active Sections
                </h3>
                {isFreePlan && (
                  <span className="text-[10px] text-slate-500 font-semibold">{componentCount}/5</span>
                )}
              </div>
              <div className="space-y-2">
                {activeLayout.components?.map((comp, index) => {
                  const isSelected = comp.id === selectedComponentId;
                  const itemDef = AVAILABLE_COMPONENTS.find((c) => c.type === comp.type);
                  return (
                    <div
                      key={comp.id}
                      onClick={() => dispatch(selectComponent(comp.id))}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition group ${
                        isSelected
                          ? 'glass border-indigo-500/40 text-white shadow-lg shadow-indigo-500/5'
                          : 'bg-white/[0.02] border-white/[0.06] text-slate-300 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <GripVertical className="w-3.5 h-3.5 text-slate-600 opacity-0 group-hover:opacity-100 transition flex-shrink-0" />
                        <span className="text-sm">
                          {itemDef?.icon || '📌'}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold truncate">
                            {comp.title || comp.type}
                          </p>
                          {itemDef?.badge && (
                            <span className="text-[9px] font-mono font-bold text-amber-400">
                              {itemDef.badge}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5">
                        <button
                          disabled={index === 0}
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(reorderComponents({ sourceIndex: index, destinationIndex: index - 1 }));
                          }}
                          className="p-1.5 rounded-lg hover:bg-white/[0.06] text-slate-500 hover:text-white disabled:opacity-20 transition"
                          title="Move Up"
                        >
                          <MoveUp className="w-3 h-3" />
                        </button>
                        <button
                          disabled={index === activeLayout.components.length - 1}
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(reorderComponents({ sourceIndex: index, destinationIndex: index + 1 }));
                          }}
                          className="p-1.5 rounded-lg hover:bg-white/[0.06] text-slate-500 hover:text-white disabled:opacity-20 transition"
                          title="Move Down"
                        >
                          <MoveDown className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(updateComponentVisibility({ id: comp.id, isVisible: !comp.isVisible }));
                          }}
                          className="p-1.5 rounded-lg hover:bg-white/[0.06] text-slate-500 hover:text-white transition"
                          title={comp.isVisible ? "Hide" : "Show"}
                        >
                          {comp.isVisible ? (
                            <Eye className="w-3 h-3 text-indigo-400" />
                          ) : (
                            <EyeOff className="w-3 h-3 text-slate-600" />
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(removeComponent(comp.id));
                          }}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition"
                          title="Remove Section"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Add Section List */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                Add Section
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {AVAILABLE_COMPONENTS.map((item) => (
                  <button
                    key={item.type}
                    onClick={() => handleAddComponent(item)}
                    className="p-3 rounded-xl glass border border-white/[0.06] hover:border-indigo-500/30 flex items-center justify-between text-left transition group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{item.icon}</span>
                      <div>
                        <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition block">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] text-amber-400 font-mono font-bold">
                            {item.badge} Exclusive
                          </span>
                        )}
                      </div>
                    </div>
                    {item.tier === 'studio' && !isStudioPlan ? (
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                    ) : item.tier === 'pro' && isFreePlan ? (
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                    ) : (
                      <Plus className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'theme' && (
          <div className="space-y-6">
            {/* Active Template Card */}
            <div className="p-3.5 rounded-2xl glass border border-indigo-500/30 bg-indigo-500/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Active Template</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold">
                  {activeLayout.theme?.templateId || 'default'}
                </span>
              </div>
              <h4 className="font-heading font-bold text-sm text-white capitalize">
                {(activeLayout.theme?.templateId || 'custom').replace(/-/g, ' ')}
              </h4>
              <div className="pt-1 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">Switch preset:</span>
                <select
                  value={activeLayout.theme?.templateId || 'minimalist-editorial'}
                  onChange={(e) => dispatch(applyTemplate(e.target.value))}
                  className="bg-slate-900 text-xs font-semibold text-white border border-white/15 rounded-lg px-2 py-1 cursor-pointer focus:outline-none focus:border-indigo-500"
                >
                  <option value="minimalist-editorial">Minimalist Editorial</option>
                  <option value="dark-cyber">Dark Cyberpunk</option>
                  <option value="creative-director">Creative Director</option>
                  <option value="interactive-showcase">Interactive Showcase</option>
                  <option value="luxury-motion-pro">Luxury Motion Pro</option>
                  <option value="fintech-saas-pro">Fintech SaaS Pro</option>
                  <option value="ai-neural-labs-pro">AI Neural Labs Pro</option>
                  <option value="global-agency-studio">Global Agency Studio</option>
                  <option value="haute-couture-studio">Haute Couture Studio</option>
                  <option value="spatial-architect-studio">Spatial Architect Studio</option>
                </select>
              </div>
            </div>

            {/* White-Label Branding (Studio Feature) */}
            <div className="p-3.5 rounded-2xl glass border border-white/[0.08] space-y-3 bg-white/[0.01]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white">White-Label Branding</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Studio Plan
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Remove the "PortfolioCraft" floating navigation badge and platform footer on your live public site.
              </p>
              
              <div className="pt-1 flex items-center justify-between">
                <span className="text-xs text-slate-300 font-medium">Hide Platform Branding</span>
                {isStudioPlan ? (
                  <button
                    type="button"
                    onClick={() => dispatch(updateTheme({ hideBranding: !activeLayout.theme?.hideBranding }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      activeLayout.theme?.hideBranding ? 'bg-emerald-600' : 'bg-slate-800'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        activeLayout.theme?.hideBranding ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setUpgradeModalInfo({
                      title: 'White-Label Branding',
                      message: 'White-Label Branding is included in the Studio & Team plan. Upgrade to remove all platform badges and watermark footers.',
                      targetPlan: 'studio'
                    })}
                    className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-bold"
                  >
                    <Lock className="w-3 h-3" />
                    <span>Unlock with Studio</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Theme Palettes */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Color Schemes</h3>
                <span className="text-[10px] text-slate-500">1-Click Apply</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  {
                    name: 'Emerald Matrix',
                    primaryColor: '#10b981',
                    secondaryColor: '#059669',
                    backgroundColor: '#040d08',
                    surfaceColor: '#091f14',
                    textColor: '#e6fcf5',
                    textMutedColor: '#6ee7b7'
                  },
                  {
                    name: 'Obsidian Gold',
                    primaryColor: '#f59e0b',
                    secondaryColor: '#d97706',
                    backgroundColor: '#0a0907',
                    surfaceColor: '#1c170c',
                    textColor: '#fef3c7',
                    textMutedColor: '#d4b483'
                  },
                  {
                    name: 'Electric Violet',
                    primaryColor: '#8b5cf6',
                    secondaryColor: '#a855f7',
                    backgroundColor: '#080714',
                    surfaceColor: '#130f28',
                    textColor: '#ede9fe',
                    textMutedColor: '#a78bfa'
                  },
                  {
                    name: 'Cyberpunk Cyan',
                    primaryColor: '#06b6d4',
                    secondaryColor: '#3b82f6',
                    backgroundColor: '#040a14',
                    surfaceColor: '#0a1c30',
                    textColor: '#e0f2fe',
                    textMutedColor: '#7dd3fc'
                  },
                  {
                    name: 'Crimson Dusk',
                    primaryColor: '#f43f5e',
                    secondaryColor: '#e11d48',
                    backgroundColor: '#100508',
                    surfaceColor: '#240a12',
                    textColor: '#ffe4e6',
                    textMutedColor: '#fda4af'
                  },
                  {
                    name: 'OLED Pure Dark',
                    primaryColor: '#6366f1',
                    secondaryColor: '#a855f7',
                    backgroundColor: '#000000',
                    surfaceColor: '#0d0d12',
                    textColor: '#ffffff',
                    textMutedColor: '#94a3b8'
                  },
                  {
                    name: 'Nordic Light',
                    primaryColor: '#2563eb',
                    secondaryColor: '#4f46e5',
                    backgroundColor: '#f8fafc',
                    surfaceColor: '#ffffff',
                    textColor: '#0f172a',
                    textMutedColor: '#64748b'
                  },
                  {
                    name: 'Warm Paper',
                    primaryColor: '#18181b',
                    secondaryColor: '#44403c',
                    backgroundColor: '#faf8f5',
                    surfaceColor: '#f4efe6',
                    textColor: '#18181b',
                    textMutedColor: '#78716c'
                  }
                ].map((palette) => (
                  <button
                    key={palette.name}
                    type="button"
                    onClick={() =>
                      dispatch(
                        updateTheme({
                          primaryColor: palette.primaryColor,
                          secondaryColor: palette.secondaryColor,
                          backgroundColor: palette.backgroundColor,
                          surfaceColor: palette.surfaceColor,
                          textColor: palette.textColor,
                          textMutedColor: palette.textMutedColor
                        })
                      )
                    }
                    className="p-2.5 rounded-xl glass border border-white/[0.08] hover:border-indigo-500/40 flex flex-col gap-2 text-left transition group"
                  >
                    <div className="flex items-center gap-1">
                      <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: palette.backgroundColor }} />
                      <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: palette.primaryColor }} />
                      <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: palette.secondaryColor }} />
                      <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: palette.textColor }} />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-300 group-hover:text-white truncate">
                      {palette.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Granular Color Controls */}
            <div className="space-y-4 pt-2 border-t border-white/[0.06]">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Custom Colors</h3>
                <button
                  type="button"
                  onClick={() =>
                    dispatch(
                      updateTheme({
                        primaryColor: '#6366f1',
                        secondaryColor: '#a855f7',
                        backgroundColor: '#070a10',
                        surfaceColor: '#111827',
                        textColor: '#f8fafc',
                        textMutedColor: '#94a3b8'
                      })
                    )
                  }
                  className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  Reset Defaults
                </button>
              </div>
              {[
                { label: 'Primary Accent Color', desc: 'Buttons, active badges & highlights', key: 'primaryColor', default: '#6366f1' },
                { label: 'Secondary Accent Color', desc: 'Gradients, borders & subtle glows', key: 'secondaryColor', default: '#a855f7' },
                { label: 'Page Background Color', desc: 'Main canvas & section background', key: 'backgroundColor', default: '#070a10' },
                { label: 'Card & Surface Color', desc: 'Cards, project tiles & containers', key: 'surfaceColor', default: '#111827' },
                { label: 'Heading & Primary Text', desc: 'Main titles & headlines', key: 'textColor', default: '#f8fafc' },
                { label: 'Body & Muted Text', desc: 'Paragraphs, subtitles & labels', key: 'textMutedColor', default: '#94a3b8' }
              ].map(({ label, desc, key, default: def }) => {
                const currentVal = activeLayout.theme?.[key] || def;
                const safeHex = /^#[0-9A-Fa-f]{6}$/.test(currentVal) ? currentVal : def;
                return (
                  <div key={key} className="space-y-1.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300">{label}</label>
                      <p className="text-[10px] text-slate-500">{desc}</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="color"
                        value={safeHex}
                        onChange={(e) => dispatch(updateTheme({ [key]: e.target.value }))}
                        className="w-10 h-10 rounded-xl bg-transparent border-2 border-white/10 cursor-pointer shrink-0"
                      />
                      <input
                        type="text"
                        value={currentVal}
                        onChange={(e) => dispatch(updateTheme({ [key]: e.target.value }))}
                        placeholder={def}
                        className="flex-1 input-field px-3 py-2 rounded-xl text-xs font-mono"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Portfolio URL Handle */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Portfolio URL Handle</h3>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Custom Page Slug</label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 glass border border-white/[0.06] border-r-0 text-xs text-slate-500 rounded-l-xl font-mono">
                  /p/
                </span>
                <input
                  type="text"
                  value={activeLayout.handle || ''}
                  onChange={(e) => dispatch(updateHandle(e.target.value))}
                  className="input-field flex-1 px-3 py-2.5 rounded-r-xl text-xs font-mono"
                  placeholder="your-name"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Public URL: <span className="text-indigo-400 font-mono font-bold">/p/{activeLayout.handle || 'your-name'}</span>
              </p>
            </div>

            {/* SEO Meta Optimization (Pro & Studio) */}
            <div className="pt-4 border-t border-white/[0.06] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">SEO Meta Optimization</h3>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Pro / Studio
                </span>
              </div>

              {isFreePlan ? (
                <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3 text-center">
                  <Lock className="w-6 h-6 text-amber-400 mx-auto" />
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Custom meta titles, descriptions, and Google snippet controls are included with Pro Creator & Studio plans.
                  </p>
                  <Link
                    to="/pricing"
                    className="btn-primary inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white"
                  >
                    <span>Upgrade to Pro ($12)</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Meta Title</label>
                    <input
                      type="text"
                      value={seo.metaTitle || ''}
                      onChange={(e) => dispatch(updateSeo({ metaTitle: e.target.value }))}
                      placeholder={`${activeLayout.title || 'My Portfolio'} | Senior Designer & Developer`}
                      className="input-field w-full px-3 py-2 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Meta Description</label>
                    <textarea
                      rows={3}
                      value={seo.metaDescription || ''}
                      onChange={(e) => dispatch(updateSeo({ metaDescription: e.target.value }))}
                      placeholder="High-performance portfolios, creative engineering, and digital craft..."
                      className="input-field w-full px-3 py-2 rounded-xl text-xs resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Keywords</label>
                    <input
                      type="text"
                      value={seo.keywords || ''}
                      onChange={(e) => dispatch(updateSeo({ keywords: e.target.value }))}
                      placeholder="portfolio, web design, frontend developer, react"
                      className="input-field w-full px-3 py-2 rounded-xl text-xs"
                    />
                  </div>

                  {/* Google Search Card Preview */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                    <span className="text-[10px] font-mono text-slate-500">Google Search Preview</span>
                    <p className="text-xs text-blue-400 font-semibold truncate hover:underline cursor-pointer">
                      {seo.metaTitle || activeLayout.title || 'My Portfolio'}
                    </p>
                    <p className="text-[10px] text-emerald-400 font-mono truncate">
                      https://portfoliocraft.io/p/{activeLayout.handle || 'your-name'}
                    </p>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {seo.metaDescription || 'View featured projects, career timeline, and skills on my verified PortfolioCraft site.'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/[0.06]">
              <a
                href={`/p/${activeLayout.handle}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl btn-ghost text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-white/[0.06]"
              >
                <span>Open Public Portfolio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Plan Upgrade Limit Modal */}
      {upgradeModalInfo && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="glass gradient-border rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl relative">
            <button
              onClick={() => setUpgradeModalInfo(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto mb-4 text-amber-400">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl text-white mb-2">{upgradeModalInfo.title}</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              {upgradeModalInfo.message}
            </p>
            <div className="space-y-2">
              <Link
                to="/pricing"
                className="btn-primary w-full py-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <span>View Upgrade Plans</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setUpgradeModalInfo(null)}
                className="btn-ghost w-full py-2.5 rounded-xl text-slate-400 hover:text-white text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
