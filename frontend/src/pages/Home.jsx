import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import {
  ArrowRight,
  Star,
  Zap,
  Eye,
  Award,
  MousePointer2,
  CheckCircle2,
  Layers,
  Palette,
  Globe,
  ShieldCheck,
  Monitor,
  Tablet,
  Smartphone,
  Upload,
  BarChart3,
  ExternalLink,
  Code2,
  Briefcase,
  Building2,
  Lock,
  Check,
  X,
  ChevronDown,
  HelpCircle,
  Share2,
  Cpu,
  Crown,
  CreditCard,
  Sparkles
} from 'lucide-react';

const HERO_PERSONAS = [
  {
    id: 'alex',
    label: 'Product Designer',
    name: 'Alex Morgan',
    role: 'Principal Product Designer · San Francisco',
    handle: 'portfoliocraft.io/p/alex',
    route: '/showcase/alex',
    accent: '#6366f1',
    secondary: '#a855f7',
    badge: 'Available for Q4 Advisory & Principal Roles',
    headline: 'Designing spatial interfaces & multi-brand design systems at scale.',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    metrics: [
      { value: '+34%', label: '30-Day Retention' },
      { value: '$1.4B', label: 'Assets Tracked' },
      { value: '4.9★', label: 'App Store Rating' }
    ],
    projects: [
      {
        title: 'Aura Spatial Banking OS',
        tag: 'Fintech · Design System',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
      },
      {
        title: 'Kinetix Generative Studio',
        tag: 'AI Workflow · WebGL',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'marcus',
    label: 'Full-Stack Architect',
    name: 'Marcus Vance',
    role: 'Staff Cloud & Distributed Systems Engineer · Austin',
    handle: 'portfoliocraft.io/p/marcus',
    route: '/showcase/marcus',
    accent: '#10b981',
    secondary: '#06b6d4',
    badge: 'Open to Principal Architecture Consulting',
    headline: 'Engineering sub-millisecond edge runtimes and zero-downtime cloud platforms.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    metrics: [
      { value: '99.99%', label: 'Edge SLA Uptime' },
      { value: '1.2M', label: 'Req / Sec Peak' },
      { value: '-62%', label: 'Cloud Infra Cost' }
    ],
    projects: [
      {
        title: 'Hyperion Mesh Telemetry',
        tag: 'Rust · Kubernetes · eBPF',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80'
      },
      {
        title: 'Nexus Distributed KV Store',
        tag: 'Go · Raft Consensus',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'elena',
    label: 'Creative Director',
    name: 'Elena Rostova',
    role: 'VP of Brand & Creative Direction · New York & London',
    handle: 'portfoliocraft.io/p/elena',
    route: '/showcase/elena',
    accent: '#f59e0b',
    secondary: '#ec4899',
    badge: 'Booking Global Brand Campaigns · 2027',
    headline: 'Crafting monumental editorial identities, luxury motion, and 3D digital exhibitions.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    metrics: [
      { value: '+65%', label: 'Brand Recall Lift' },
      { value: '28', label: 'Global Markets' },
      { value: '14x', label: 'Award Winner' }
    ],
    projects: [
      {
        title: 'Aethelgard Cultural Identity',
        tag: 'Variable Typography · 3D',
        image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=600&q=80'
      },
      {
        title: 'Maison Lumière Runway',
        tag: 'Haute Couture · Direction',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80'
      }
    ]
  }
];

const IMPACT_STATS = [
  { value: '10,000+', label: 'Active Creator Portfolios', sub: 'Across 140+ countries worldwide' },
  { value: '94%', label: 'Recruiter Response Lift', sub: 'Compared to static PDF resumes' },
  { value: '$45M+', label: 'Client Retainers Won', sub: 'Through direct portfolio inquiries' },
  { value: '< 5 min', label: 'Average Launch Time', sub: 'Zero coding or setup required' }
];

const FEATURED_TEMPLATES = [
  {
    id: 'minimalist-editorial',
    name: 'Minimalist Editorial',
    category: 'Product & UI Designers',
    tier: 'Free Tier',
    tierColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    desc: 'Architectural grid precision, bold editorial typography, and structured case study storytelling.'
  },
  {
    id: 'fintech-saas-pro',
    name: 'Fintech & SaaS Product Lead',
    category: 'Engineers & Product Leaders',
    tier: 'Pro Creator',
    tierColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    desc: 'Built-in ARR impact scorecards, interactive Figma embeds, and system architecture timelines.'
  },
  {
    id: 'global-agency-studio',
    name: 'Global Agency & Design Studio',
    category: 'Boutique Studios & Directors',
    tier: 'Studio Plan',
    tierColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    desc: 'Cinematic video headers, full white-label branding removal, and multi-portfolio management.'
  }
];

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Select an Industry-Validated Template',
    description:
      'Start with one of 10 handcrafted layouts co-designed with hiring managers and creative directors from top US tech companies. Switch templates anytime without losing your content.'
  },
  {
    step: '02',
    title: 'Customize Sections & Color Tokens Visually',
    description:
      'Reorder modular sections, upload 4K visuals via Cloudinary CDN, embed live Figma or Spline prototypes, and fine-tune 6 granular CSS color tokens with live Desktop, Tablet, and Mobile preview.'
  },
  {
    step: '03',
    title: 'Publish Instantly to Your Custom Handle',
    description:
      'Go live on your dedicated `/p/yourname` URL in one click. Capture recruiter messages and client briefs directly inside your privacy-protected inquiry inbox.'
  }
];

const TESTIMONIALS = [
  {
    quote:
      'I replaced my static PDF resume with my PortfolioCraft link and landed three Staff Product Designer interviews in a single week. Hiring managers specifically praised how clearly the KPI metrics stood out.',
    author: 'Jordan Kensington',
    role: 'Principal Product Designer · San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    metric: '3 Executive Offers in 7 Days'
  },
  {
    quote:
      'It looks like I hired a bespoke design agency for $15,000, yet I built and published my entire site on a Sunday afternoon. The dark cyberpunk theme and architecture timeline are unmatched.',
    author: 'Priya Madhavan',
    role: 'Senior Distributed Systems Engineer · New York, NY',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    metric: 'Published in 25 Minutes'
  },
  {
    quote:
      'Our boutique studio runs four tailored vertical portfolios under one Studio account with white-label branding enabled. Prospective enterprise clients message us directly from our case studies.',
    author: 'Carlos Rivera',
    role: 'Founding Partner, Rivera Digital Studio · Austin, TX',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    metric: '$180K+ New Client Retainers'
  }
];

const ECOSYSTEM_TOOLS = [
  {
    name: 'Figma & FigJam',
    category: 'Interactive Prototypes',
    color: '#a259ff',
    desc: 'Embed working UI flows and clickable design prototypes directly so design leads test UX in-context.'
  },
  {
    name: 'GitHub Repositories',
    category: 'Engineering Proof',
    color: '#10b981',
    desc: 'Surface real-time repository cards with primary languages, commit activity, stars, and direct links.'
  },
  {
    name: 'Spline 3D & WebGL',
    category: 'Spatial Motion',
    color: '#06b6d4',
    desc: 'Render interactive 3D objects with camera rotation, hover physics, and zero stutter on mobile.'
  },
  {
    name: 'CodePen & StackBlitz',
    category: 'Live Code Execution',
    color: '#f59e0b',
    desc: 'Run interactive frontend sandboxes where engineering directors can inspect clean source code.'
  },
  {
    name: 'YouTube & Loom Walkthroughs',
    category: 'Async Presentation',
    color: '#ef4444',
    desc: 'Deliver narrated video walkthroughs of complex system architectures and product launches.'
  },
  {
    name: 'Cloudinary 4K Media Pipeline',
    category: 'Edge Optimization',
    color: '#6366f1',
    desc: 'Auto-compress high-res PNG/JPG assets into modern WebP/AVIF with global edge caching.'
  }
];

const COMPARISON_ROWS = [
  {
    feature: 'Recruiter-Optimized KPI Cards',
    portfolioCraft: true,
    generic: 'Manual plugins required',
    pdf: false,
    detail: 'Structured metrics for ARR, conversion lift, performance, and impact.'
  },
  {
    feature: 'Live Interactive Prototypes & 3D Embeds',
    portfolioCraft: true,
    generic: 'Complex iframe workarounds',
    pdf: false,
    detail: 'Figma, Spline 3D, and CodePen interactive viewports natively supported.'
  },
  {
    feature: 'Switch Layouts Without Losing Content',
    portfolioCraft: true,
    generic: 'Rebuild entire page from scratch',
    pdf: false,
    detail: 'Content is cleanly separated from presentation templates and tokens.'
  },
  {
    feature: 'Instant Custom /p/ Handle on Global CDN',
    portfolioCraft: true,
    generic: 'DNS setup & hosting overhead',
    pdf: 'Requires static file downloads',
    detail: 'Instant edge publishing with automatic SSL certificates and clean URLs.'
  },
  {
    feature: 'Privacy-Protected Inbound Inbox',
    portfolioCraft: true,
    generic: 'Spam-prone mailto links',
    pdf: 'Personal phone/email fully exposed',
    detail: 'Capture client budgets and recruiter opportunities safely in your dashboard.'
  },
  {
    feature: 'Real-Time Desktop, Tablet & Mobile Preview',
    portfolioCraft: true,
    generic: 'Clunky or inaccurate previews',
    pdf: false,
    detail: 'Preview how your craft looks across all device viewports while editing.'
  }
];

const FAQS = [
  {
    q: 'Can I switch my portfolio template later without losing my content?',
    a: 'Yes, absolutely. PortfolioCraft separates your portfolio content (projects, experiences, case studies, and bio) from visual presentation styling. You can switch between any of our 10 handcrafted templates at any time with a single click, and all your existing work will automatically adapt to the new visual layout.'
  },
  {
    q: 'How does the custom /p/handle publishing work?',
    a: 'Every registered creator receives their own instant, clean handle URL such as portfoliocraft.io/p/yourname. Your page is immediately published through our global edge CDN with automated SSL certificates, responsive mobile caching, and search engine optimization (OpenGraph social cards) built in.'
  },
  {
    q: 'How do interactive Figma, 3D Spline, and CodePen embeds work?',
    a: 'Inside the visual editor, simply paste your public sharing or embed URL into the Embeds section. PortfolioCraft safely mounts a sandboxed viewport so hiring managers, clients, and recruiters can interactively click prototypes, orbit 3D models, or test frontend code without ever leaving your portfolio.'
  },
  {
    q: 'How does the privacy-first client inquiry inbox protect me?',
    a: 'Instead of forcing you to publish your personal email address or telephone number to scrapers and spammers, visitors submit structured inquiries directly through your portfolio contact form. Messages are securely routed into your authenticated dashboard inbox where you can review client budgets and recruiter offers before responding.'
  },
  {
    q: 'Is there a free plan available, and what is included?',
    a: 'Yes, our Free Forever plan includes full access to core templates, visual section management, Cloudinary image hosting, responsive mobile preview, and live edge publishing on your custom /p/ handle with zero expiration or trial periods.'
  },
  {
    q: 'Can studios or agencies manage multiple portfolios under one account?',
    a: 'Yes. Our Studio and Enterprise plans allow boutique creative agencies and multi-disciplinary teams to create and maintain multiple vertical portfolios with white-label branding, priority support, and multi-seat collaboration.'
  }
];


const HERO_BG_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1920&q=80',
    title: 'UI & Product System Design'
  },
  {
    url: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1920&q=80',
    title: 'Executive Design Strategy'
  },
  {
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=80',
    title: 'Distributed Systems & Code'
  },
  {
    url: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1920&q=80',
    title: 'Spatial Architecture & 3D'
  },
  {
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1920&q=80',
    title: 'Haute Editorial & Brand Direction'
  },
  {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80',
    title: 'Product Analytics & KPI Telemetry'
  }
];

export default function Home() {
  const [activePersonaIdx, setActivePersonaIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState(null);
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIdx((prev) => (prev + 1) % HERO_BG_IMAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);
  const activePersona = HERO_PERSONAS[activePersonaIdx];

  const toggleFaq = (idx) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <Header />

      <section className="relative pt-28 sm:pt-36 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Hero Dynamic Background: Cycling Portfolio Showcases */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute inset-0 transition-all duration-1000">
            <img
              key={currentSlideIdx}
              src={HERO_BG_IMAGES[currentSlideIdx].url}
              alt={HERO_BG_IMAGES[currentSlideIdx].title}
              className="w-full h-full object-cover opacity-30 scale-105 transition-all duration-1000 filter blur-[0.4px]"
            />
          </div>

          {/* Contrast & Depth Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/70 to-slate-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#020617_90%)]" />

          {/* Dynamic persona atmosphere glow */}
          <div
            className="absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[500px] rounded-full blur-[150px] transition-colors duration-700 opacity-20"
            style={{ backgroundColor: activePersona.accent }}
          />
          <div
            className="absolute top-1/3 right-1/4 w-[450px] h-[450px] rounded-full blur-[130px] transition-colors duration-700 opacity-15"
            style={{ backgroundColor: activePersona.secondary }}
          />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass border border-indigo-500/30 text-xs font-semibold text-indigo-300 mb-7 shadow-lg">
              <span className="px-2 py-0.5 rounded-full bg-indigo-500 text-white text-[10px] font-black uppercase tracking-wider">
                NEW
              </span>
              <span>PortfolioCraft · Visual CMS & Global Edge Publishing</span>
            </div>

            <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-white leading-[1.04] tracking-tight mb-6">
              Your Craft Is Extraordinary.
              <br />
              <span className="gradient-text">Give It the Stage It Deserves.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Build an executive-grade, interactive portfolio in minutes without writing a single line of code. Engineered with dynamic themes, custom showcase sections, and instant edge publishing to turn recruiters and high-ticket clients into inbound opportunities.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto group btn-primary inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-base shadow-xl"
              >
                <span>Build My Portfolio Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/showcase"
                className="w-full sm:w-auto btn-ghost inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-slate-200 hover:text-white font-semibold text-base border border-white/10"
              >
                <Eye className="w-4 h-4 text-indigo-400" />
                <span>Explore Live Showcases</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto max-w-5xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Interactive Live Preview - Click a Creator Persona:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl glass border border-white/10">
                {HERO_PERSONAS.map((p, idx) => {
                  const isActive = idx === activePersonaIdx;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActivePersonaIdx(idx)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                        isActive
                          ? 'text-white shadow-lg'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      style={
                        isActive
                          ? { background: `linear-gradient(135deg, ${p.accent}, ${p.secondary})` }
                          : undefined
                      }
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: isActive ? '#fff' : p.accent }}
                      />
                      <span>{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="glass gradient-border rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.75)] border border-white/15">
              <div className="bg-slate-900/90 border-b border-white/[0.08] px-4 py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>

                <div className="flex-1 max-w-md mx-auto px-3.5 py-1 rounded-xl bg-slate-950/90 border border-white/10 flex items-center justify-between text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2 truncate">
                    <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{activePersona.handle}</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-sans font-bold shrink-0">
                    SSL LIVE
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-slate-400">
                  <Monitor className="w-3.5 h-3.5 text-indigo-400" />
                  <Tablet className="w-3.5 h-3.5" />
                  <Smartphone className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="p-6 sm:p-10 bg-slate-950/95 relative overflow-hidden">
                <div
                  className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none transition-colors duration-500"
                  style={{ backgroundColor: activePersona.accent }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="lg:col-span-7 space-y-5">
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold border"
                      style={{
                        backgroundColor: `${activePersona.accent}18`,
                        borderColor: `${activePersona.accent}45`,
                        color: activePersona.accent
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: activePersona.accent }} />
                      <span>{activePersona.badge}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <img
                        src={activePersona.avatar}
                        alt={activePersona.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2"
                        style={{ borderColor: activePersona.accent }}
                      />
                      <div>
                        <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                          {activePersona.name}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold" style={{ color: activePersona.accent }}>
                          {activePersona.role}
                        </p>
                      </div>
                    </div>

                    <p className="text-slate-200 text-base sm:text-xl font-medium leading-snug">
                      {activePersona.headline}
                    </p>

                    <div className="grid grid-cols-3 gap-3 pt-1">
                      {activePersona.metrics.map((m, i) => (
                        <div
                          key={i}
                          className="p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
                        >
                          <div
                            className="font-heading font-black text-lg sm:text-2xl"
                            style={{ color: activePersona.accent }}
                          >
                            {m.value}
                          </div>
                          <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <Link
                        to={activePersona.route}
                        className="px-5 py-2.5 rounded-xl text-white text-xs font-bold inline-flex items-center gap-2 shadow-lg transition hover:opacity-95"
                        style={{
                          background: `linear-gradient(135deg, ${activePersona.accent}, ${activePersona.secondary})`
                        }}
                      >
                        <span>Open Full Interactive Showcase</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to="/templates"
                        className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-semibold text-slate-200 transition inline-flex items-center gap-1.5"
                      >
                        <span>Go to Templates</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-3.5">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider px-1">
                      <span>Featured Case Studies</span>
                      <span style={{ color: activePersona.accent }}>Interactive Proof</span>
                    </div>
                    {activePersona.projects.map((proj, pIdx) => (
                      <Link
                        key={pIdx}
                        to={activePersona.route}
                        className="group block p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition"
                      >
                        <div className="flex items-center gap-3.5">
                          <img
                            src={proj.image}
                            alt={proj.title}
                            className="w-20 h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                          />
                          <div className="min-w-0 flex-1">
                            <span
                              className="text-[10px] font-mono font-bold uppercase tracking-wider block mb-0.5"
                              style={{ color: activePersona.accent }}
                            >
                              {proj.tag}
                            </span>
                            <h4 className="font-heading font-bold text-sm text-white truncate group-hover:text-indigo-300 transition">
                              {proj.title}
                            </h4>
                            <span className="text-[11px] text-slate-400 inline-flex items-center gap-1 mt-1">
                              <span>Inspect KPI Case Study</span>
                              <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[
                    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=60&h=60&fit=crop',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop',
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop'
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Creator"
                      className="w-7 h-7 rounded-full border-2 border-slate-950 object-cover"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-slate-300 font-semibold">4.9/5</span>
                <span>from 10,000+ creators</span>
              </div>
              <span className="hidden sm:inline text-slate-700">•</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Free Forever Plan · No Credit Card Required</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] py-16 px-6 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-10">
            Trusted by Designers, Engineers & Creative Directors at World-Class Teams
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {IMPACT_STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-3xl p-6 text-center border border-white/[0.07]"
              >
                <div className="font-heading font-black text-3xl sm:text-4xl gradient-text mb-1.5">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-white mb-1">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="badge badge-indigo inline-flex mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>Engineered for Unfair Career Advantage</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white mb-5 leading-tight">
              Everything Your Portfolio Needs to{' '}
              <span className="gradient-text">Do the Heavy Lifting</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              Recruiters spend less than 15 seconds scanning a portfolio before deciding whether to schedule an interview. Every component in PortfolioCraft is architected to capture attention immediately and prove your impact.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 glass-card gradient-border rounded-3xl p-8 flex flex-col justify-between bg-gradient-to-br from-indigo-500/15 via-slate-900/40 to-purple-500/10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
                  <MousePointer2 className="w-3.5 h-3.5" />
                  <span>Zero-Code Visual CMS</span>
                </div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                  Real-Time Canvas Editor & 6-Token Theme Engine
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Reorder sections, toggle visibility, and preview your site inside interactive Desktop, Tablet, and Mobile frames. Switch between 8 curated color palettes - like <strong className="text-white">Emerald Matrix</strong>, <strong className="text-white">Obsidian Gold</strong>, or <strong className="text-white">Nordic Light</strong> - or fine-tune every CSS variable in real time.
                </p>
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-slate-950/80 border border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <Palette className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold text-slate-200">Live CSS Theme Tokens:</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { name: 'Indigo', color: '#6366f1' },
                    { name: 'Emerald', color: '#10b981' },
                    { name: 'Amber', color: '#f59e0b' },
                    { name: 'Cyan', color: '#06b6d4' },
                    { name: 'Rose', color: '#f43f5e' }
                  ].map((sw) => (
                    <span
                      key={sw.name}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border border-white/15 flex items-center gap-1.5 bg-white/[0.03]"
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sw.color }} />
                      <span className="text-slate-300">{sw.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 glass-card gradient-border rounded-3xl p-8 flex flex-col justify-between bg-gradient-to-br from-purple-500/15 via-slate-900/40 to-pink-500/10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Executive Impact Proof</span>
                </div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                  Built for Case Studies & Quantified KPIs
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Move beyond static image grids. Highlight revenue generated, latency reductions, and conversion lifts with dedicated Data Metrics cards and Experience Timelines.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/10">
                  <div className="font-heading font-black text-xl text-emerald-400">+42%</div>
                  <div className="text-[11px] text-slate-400">Checkout Conversion</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/10">
                  <div className="font-heading font-black text-xl text-indigo-400">99.99%</div>
                  <div className="text-[11px] text-slate-400">Global Uptime SLA</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 glass-card rounded-3xl p-7 border border-white/[0.08] space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Upload className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white">
                Cloudinary 4K Media & Video Pipeline
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Upload high-res screenshots, architectural renders, and looping MP4 video backgrounds with automatic edge compression and instant delivery.
              </p>
            </div>

            <div className="lg:col-span-4 glass-card rounded-3xl p-7 border border-white/[0.08] space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white">
                Live Figma, YouTube & 3D Spline Embeds
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Let visitors interact directly with your Figma prototypes, 3D WebGL Spline scenes, and product demos without ever leaving your portfolio page.
              </p>
            </div>

            <div className="lg:col-span-4 glass-card rounded-3xl p-7 border border-white/[0.08] space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white">
                Privacy-First Inquiry Inbox & SEO Control
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Receive recruiter messages and client briefs straight in your dashboard with custom `/p/handle` slugs, OpenGraph meta tags, and white-label options.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-white/[0.06] bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="badge badge-indigo inline-flex mb-3">
                <Palette className="w-3.5 h-3.5" />
                <span>10 Industry-Specialized Layouts</span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-5xl text-white">
                Start From a <span className="gradient-text">Masterpiece</span>
              </h2>
            </div>
            <Link
              to="/templates"
              className="btn-ghost px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-200 hover:text-white inline-flex items-center gap-2 self-start md:self-auto"
            >
              <span>Browse All 10 Templates</span>
              <ArrowRight className="w-4 h-4 text-indigo-400" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {FEATURED_TEMPLATES.map((tpl, idx) => (
              <motion.div
                key={tpl.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card gradient-border rounded-3xl overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={tpl.image}
                      alt={tpl.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3.5 left-3.5">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md ${tpl.tierColor}`}>
                        {tpl.tier}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-indigo-400 mb-1.5">
                      {tpl.category}
                    </div>
                    <h3 className="font-heading font-bold text-xl text-white mb-2">{tpl.name}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{tpl.desc}</p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2">
                  <Link
                    to="/templates"
                    className="btn-primary w-full py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2"
                  >
                    <span>Go to Templates</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="badge badge-indigo inline-flex mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Effortless Workflow</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white mb-4">
              From Blank Canvas to Live in <span className="gradient-text">3 Simple Steps</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Spend your time crafting great projects - not debugging CSS grids or configuring deployment pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WORKFLOW_STEPS.map((w, idx) => (
              <div
                key={idx}
                className="glass rounded-3xl p-8 border border-white/[0.08] relative space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-mono font-black text-xs">
                    STEP {w.step}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">0{idx + 1} / 03</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-white">{w.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{w.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-white/[0.06] bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="badge badge-indigo inline-flex mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Creator Outcomes</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white mb-4">
              Creators Got Hired.<br />
              <span className="gradient-text">Here Is What Happened.</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              See how designers, engineers, and studio founders use PortfolioCraft to win interviews and close retainers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="glass-card gradient-border rounded-3xl p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, si) => (
                        <Star key={si} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                      {t.metric}
                    </span>
                  </div>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover border border-indigo-500/40"
                  />
                  <div>
                    <div className="font-bold text-white text-xs sm:text-sm">{t.author}</div>
                    <div className="text-slate-400 text-[11px]">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="badge badge-indigo inline-flex mb-3">
              <Share2 className="w-3.5 h-3.5" />
              <span>Universal Embed Ecosystem</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white mb-4">
              Bring Your <span className="gradient-text">Living Work</span> to Life
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Don't ask hiring managers to imagine your designs or read static screenshots. Embed interactive canvases, working code, and real-time 3D objects with zero plugins.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ECOSYSTEM_TOOLS.map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                className="glass-card rounded-3xl p-7 border border-white/[0.08] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-xl"
                      style={{
                        backgroundColor: `${tool.color}15`,
                        color: tool.color,
                        border: `1px solid ${tool.color}35`
                      }}
                    >
                      {tool.category}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tool.color }} />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white mb-2.5">{tool.name}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{tool.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Zero-config integration</span>
                  <span className="text-emerald-400 font-bold">Native Edge Sandbox</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-white/[0.06] bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="badge badge-emerald inline-flex mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Clear Competitive Value</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white mb-4">
              Engineered for <span className="gradient-text">Inbound Offers</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              See why senior designers, staff engineers, and boutique creative studios pick PortfolioCraft over legacy generic website builders and static PDF resumes.
            </p>
          </div>

          <div className="glass gradient-border rounded-3xl overflow-x-auto border border-white/10 shadow-2xl">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-white/[0.08] bg-slate-900/60">
                  <th className="py-5 px-6 font-heading font-bold text-sm text-slate-200">
                    Core Capability
                  </th>
                  <th className="py-5 px-6 font-heading font-black text-base text-indigo-400 bg-indigo-500/10 border-x border-indigo-500/20 text-center">
                    PortfolioCraft
                  </th>
                  <th className="py-5 px-6 font-heading font-bold text-sm text-slate-400 text-center">
                    Generic Web Builders
                  </th>
                  <th className="py-5 px-6 font-heading font-bold text-sm text-slate-400 text-center">
                    Static PDF Resumes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05] text-xs sm:text-sm">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition">
                    <td className="py-4 px-6">
                      <div className="font-semibold text-white">{row.feature}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{row.detail}</div>
                    </td>
                    <td className="py-4 px-6 text-center bg-indigo-500/5 border-x border-indigo-500/20">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Included</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center text-slate-400 font-medium">
                      {row.generic}
                    </td>
                    <td className="py-4 px-6 text-center text-slate-500">
                      {row.pdf === false ? (
                        <span className="inline-flex items-center gap-1 text-rose-400">
                          <X className="w-3.5 h-3.5" />
                          <span>Unsupported</span>
                        </span>
                      ) : (
                        row.pdf
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="badge badge-indigo inline-flex mb-3">
              <Crown className="w-3.5 h-3.5" />
              <span>3 Flexible Creator Tiers</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white mb-4">
              Start Free Forever. <span className="gradient-text">Scale When Ready.</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Launch your first portfolio free with zero recurring fees, or unlock multi-portfolio publishing, interactive prototypes, and studio-grade telemetry with a simple one-time upgrade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 'free',
                name: 'Free Forever',
                badge: 'Starter Tier',
                badgeClass: 'text-indigo-300 bg-indigo-500/10 border-indigo-500/30',
                price: '$0',
                period: 'forever',
                desc: 'Everything you need to launch a clean, recruiter-ready portfolio today.',
                features: [
                  '1 Live Published Portfolio',
                  'Up to 5 Modular Portfolio Sections',
                  'Real-Time Visual CMS & Theme Editor',
                  'Cloudinary Image & Media Uploads',
                  'Custom Shareable Slug (/p/username)',
                  'Global Edge SSL & ATS Resume Export'
                ],
                ctaText: 'Start Building Free',
                ctaLink: '/register',
                popular: false
              },
              {
                id: 'pro',
                name: 'Pro Creator',
                badge: 'Most Popular',
                badgeClass: 'text-amber-300 bg-amber-500/15 border-amber-500/35',
                price: '$12',
                period: 'one-time lifetime',
                desc: 'For senior engineers, designers, and freelancers who want multiple portfolios and interactive embeds.',
                features: [
                  'Up to 3 Live Published Portfolios',
                  'Unlimited Portfolio Sections',
                  'Interactive Figma & YouTube Embeds',
                  'Pro Templates (Fintech, AI Labs, Cyber)',
                  'Real-Time Visitor Traffic Analytics',
                  'Custom Portfolio Handle per Layout'
                ],
                ctaText: 'Purchase Pro Creator',
                ctaLink: '/pricing',
                popular: true
              },
              {
                id: 'studio',
                name: 'Studio & Team',
                badge: 'Agency & Executive',
                badgeClass: 'text-emerald-300 bg-emerald-500/15 border-emerald-500/35',
                price: '$29',
                period: 'one-time lifetime',
                desc: 'Designed for creative directors, boutique studios, and founders running multiple tailored showcases.',
                features: [
                  'Up to 5 Live Published Portfolios',
                  'Everything in Pro Creator Included',
                  'Cinematic Looping Video Backgrounds',
                  'Executive KPI & Data Metrics Section',
                  'Interactive 3D Spline WebGL Scenes',
                  'Full White-Label Branding Removal'
                ],
                ctaText: 'Purchase Studio Plan',
                ctaLink: '/pricing',
                popular: false
              }
            ].map((tier, idx) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`glass-card gradient-border rounded-3xl p-8 flex flex-col justify-between relative ${
                  tier.popular ? 'border-indigo-500/50 glow-indigo' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 btn-primary px-4 py-1 rounded-full text-[11px] font-bold text-white uppercase tracking-wider shadow-lg">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <h3 className="font-heading font-bold text-2xl text-white">{tier.name}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${tier.badgeClass}`}>
                      {tier.badge}
                    </span>
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed mb-6">{tier.desc}</p>

                  <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-white/[0.06]">
                    <span className="font-heading font-black text-4xl text-white">{tier.price}</span>
                    <span className="text-xs text-slate-400 font-medium">/ {tier.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="text-xs text-slate-300 flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={tier.ctaLink}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                    tier.popular
                      ? 'btn-primary text-white shadow-lg'
                      : 'bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white'
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="badge badge-indigo inline-flex mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Got Questions?</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Everything you need to know about publishing, privacy, custom domains, and templates.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="glass rounded-2xl border border-white/[0.08] overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition"
                  >
                    <span className="font-heading font-bold text-base sm:text-lg text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-indigo-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-5 pb-5 sm:px-6 sm:pb-6 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/[0.05]"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28 px-6 border-t border-white/[0.06] bg-white/[0.01]">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass gradient-border rounded-[2.25rem] p-8 sm:p-14 relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-64 bg-indigo-600/20 blur-[100px] pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="badge badge-emerald inline-flex mb-6">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Free Forever Plan · Instant Setup</span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white mb-6 leading-tight">
                Your Next Big Opportunity<br />
                <span className="gradient-text">Starts With Your Portfolio.</span>
              </h2>
              <p className="text-slate-300 text-base sm:text-lg mb-10 leading-relaxed">
                Join over 10,000+ designers, engineers, and creative directors building their personal brand on PortfolioCraft. Launch free today or talk to our US Enterprise team for multi-seat studio licensing.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="w-full sm:w-auto group btn-primary inline-flex items-center justify-center gap-3 px-9 py-4 rounded-2xl text-white font-bold text-base shadow-xl"
                >
                  <span>Start Building Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact#enterprise-sales"
                  className="w-full sm:w-auto btn-ghost inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-slate-200 hover:text-white font-semibold text-sm border border-white/10"
                >
                  <Building2 className="w-4 h-4 text-indigo-400" />
                  <span>Contact Enterprise Sales</span>
                </Link>
              </div>
              <p className="text-slate-500 text-xs mt-5">
                No credit card required · Custom `/p/handle` included · Upgrade anytime
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
