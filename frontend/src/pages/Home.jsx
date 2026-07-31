import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import {
  ArrowRight, Star, Zap, Eye, Award, MousePointer2, CheckCircle,
  Sparkles, Layers, ShieldCheck, Cpu, Smartphone, Globe, Code2,
  Play, ExternalLink, RefreshCw, CheckCircle2, ChevronRight, Lock
} from 'lucide-react';

const stats = [
  { value: '10K+', label: 'Portfolios Created', icon: Layers },
  { value: '94%', label: 'Interview Rate Boost', icon: Award },
  { value: '3.4x', label: 'More Client Inquiries', icon: Zap },
  { value: '< 3min', label: 'Average Setup Time', icon: Cpu }
];

const PREVIEW_TEMPLATES = [
  {
    id: 'alex',
    name: 'Alex Morgan',
    role: 'Senior Product Designer',
    handle: 'alex',
    tag: 'Minimalist Editorial',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    heroTitle: 'Designing products that redefine digital experiences.',
    skills: ['Figma', 'Design Systems', 'React', 'Prototyping'],
    accentBg: 'from-indigo-600/20 via-purple-600/10 to-slate-950'
  },
  {
    id: 'marcus',
    name: 'Marcus Vance',
    role: 'Full Stack Engineer & AI Architect',
    handle: 'marcus',
    tag: 'Cyberpunk Dark Mode',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    heroTitle: 'Architecting high-scale distributed MERN & AI systems.',
    skills: ['Node.js', 'Python', 'Docker', 'GraphQL'],
    accentBg: 'from-purple-600/20 via-pink-600/10 to-slate-950'
  },
  {
    id: 'elena',
    name: 'Elena Rostova',
    role: 'Creative Director & Visual Strategist',
    handle: 'elena',
    tag: 'Haute Couture Studio',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    heroTitle: 'Crafting luxury brand narratives for global fashion houses.',
    skills: ['Brand Strategy', 'Art Direction', '3D Motion', 'WebGL'],
    accentBg: 'from-emerald-600/20 via-teal-600/10 to-slate-950'
  }
];

const BENTO_FEATURES = [
  {
    span: 'md:col-span-2 md:row-span-2',
    icon: Layers,
    badge: 'Visual CMS Engine',
    title: 'Drag, Drop, and Fine-Tune Every Pixel.',
    description: 'No rigid templates. Choose from 10+ modular layout blocks — Hero Banners, Experience Timelines, Project Grids, Skills Clouds, and Media Galleries.',
    gradient: 'from-indigo-500/15 via-purple-500/10 to-transparent',
    borderColor: 'border-indigo-500/30',
    customContent: (
      <div className="mt-6 p-4 rounded-2xl bg-slate-950/80 border border-white/10 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-slate-400">
          <span className="flex items-center gap-2 text-indigo-400 font-bold"><Layers className="w-3.5 h-3.5" /> Component Canvas</span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">● Live Syncing</span>
        </div>
        <div className="space-y-2">
          {['HeroBanner (Headline & CTA)', 'ProjectsGrid (Interactive Showcase)', 'SkillsCloud (Interactive Tags)', 'ContactForm (Instant Inquiries)'].map((comp, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between hover:border-indigo-500/40 transition">
              <span className="text-slate-300 font-semibold">{comp}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Active</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    span: 'md:col-span-1',
    icon: Zap,
    badge: 'Performance First',
    title: 'Lightning Fast 99/100 Lighthouse Speed',
    description: 'Built on React Vite and Edge CDN networks. Pages load in under 300ms anywhere in the world.',
    gradient: 'from-emerald-500/15 via-teal-500/5 to-transparent',
    borderColor: 'border-emerald-500/30'
  },
  {
    span: 'md:col-span-1',
    icon: Globe,
    badge: 'Global CDN Uploads',
    title: 'Retina-Quality Cloudinary Media CDN',
    description: 'Upload 4K photos and video clips with zero compression loss. Optimized automatically for high-DPI screens.',
    gradient: 'from-purple-500/15 via-pink-500/5 to-transparent',
    borderColor: 'border-purple-500/30'
  },
  {
    span: 'md:col-span-3',
    icon: Award,
    badge: 'Adobe-Grade Aesthetics',
    title: 'Designed to Command Attention and Close Opportunities',
    description: 'Whether you send your link to recruiters, clients, or agency leads, your portfolio signals instant senior-level craftsmanship.',
    gradient: 'from-amber-500/15 via-indigo-500/10 to-transparent',
    borderColor: 'border-amber-500/30'
  }
];

const TESTIMONIALS = [
  {
    quote: "I sent my portfolio handle /p/alex instead of a PDF resume. I received 3 interview requests within 48 hours.",
    author: "Alex Morgan",
    role: "Senior Product Designer at Figma",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=60&h=60&fit=crop"
  },
  {
    quote: "The visual quality is insane. Clients tell me my website looks like a $20,000 custom agency build.",
    author: "Marcus Vance",
    role: "Creative Technologist & AI Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop"
  },
  {
    quote: "I set up my entire portfolio in 10 minutes before an investor meeting. Closed the contract the next morning.",
    author: "Elena Rostova",
    role: "Founder & Creative Director",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop"
  }
];

export default function Home() {
  const [activeTemplateIdx, setActiveTemplateIdx] = useState(0);
  const activeTpl = PREVIEW_TEMPLATES[activeTemplateIdx];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <Header />

      {/* ─── Apple / Adobe Hero Section ─────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Cinematic Ambient Backdrop Lighting Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-pink-600/10 blur-[140px]" />
          <div className="absolute top-[40%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute top-[30%] left-[-5%] w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[110px]" />
        </div>

        {/* Subtle Precision Grid Backdrop */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Main Hero Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-8 shadow-lg shadow-indigo-500/10">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                <span>Next-Gen Adobe Portfolio Engine</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.04] tracking-tight mb-8">
                Craft Portfolios That<br />
                <span className="gradient-text">Command Attention.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
                Stop losing opportunities to outdated resumes. Build an Apple & Adobe-grade visual portfolio that makes employers and clients stop scrolling.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="group btn-primary inline-flex items-center gap-3 px-9 py-4 rounded-2xl text-white font-bold text-base shadow-2xl shadow-indigo-500/25"
                >
                  <span>Build My Portfolio Free</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/p/alex"
                  className="btn-ghost inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-slate-300 hover:text-white font-semibold text-base"
                >
                  <Eye className="w-4 h-4 text-indigo-400" />
                  <span>See Live Showcase</span>
                </Link>
              </div>

              {/* Social Proof Stack */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                <div className="flex -space-x-2.5">
                  {['https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=48&h=48&fit=crop',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop',
                    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=48&h=48&fit=crop',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=48&h=48&fit=crop'
                  ].map((src, i) => (
                    <img key={i} src={src} alt="" className="w-9 h-9 rounded-full border-2 border-slate-950 object-cover shadow-md" />
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                    <span className="text-xs font-bold text-white ml-1">5.0 / 5.0</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">Trusted by 10,000+ top designers & developers</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ─── Floating 3D Device Studio Preview Mockup ───────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto max-w-5xl"
          >
            <div className="glass gradient-border rounded-3xl p-3 md:p-6 shadow-2xl bg-slate-950/80 backdrop-blur-2xl relative overflow-hidden">
              {/* Studio Browser Header */}
              <div className="flex items-center justify-between mb-4 px-2 pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="px-4 py-1 rounded-xl bg-slate-900/90 border border-white/10 text-[11px] font-mono text-indigo-300 flex items-center gap-2">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>portfoliocraft.io/p/{activeTpl.handle}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">● Published Live</span>
                </div>
              </div>

              {/* Mock Portfolio View Canvas */}
              <div className={`rounded-2xl p-6 md:p-10 bg-gradient-to-b ${activeTpl.accentBg} border border-white/10 min-h-[380px] transition-all duration-500 relative overflow-hidden`}>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <img src={activeTpl.avatar} alt={activeTpl.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/40 shadow-xl" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-heading font-black text-2xl text-white">{activeTpl.name}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${activeTpl.badgeColor}`}>{activeTpl.tag}</span>
                      </div>
                      <p className="text-slate-400 text-xs font-semibold">{activeTpl.role}</p>
                    </div>
                  </div>
                  <Link to={`/p/${activeTpl.handle}`} target="_blank" className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shrink-0">
                    <span>Open Live Demo</span> <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <h4 className="font-heading font-bold text-xl md:text-2xl text-slate-100 max-w-xl mb-6 leading-snug">
                  "{activeTpl.heroTitle}"
                </h4>

                <div className="flex flex-wrap gap-2 mb-8">
                  {activeTpl.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 rounded-xl bg-white/[0.06] border border-white/10 text-slate-300 text-xs font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Live Template Switcher Tabs */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Switch Showcase Preset:</span>
                  <div className="flex items-center gap-2">
                    {PREVIEW_TEMPLATES.map((tpl, i) => (
                      <button
                        key={tpl.id}
                        onClick={() => setActiveTemplateIdx(i)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          i === activeTemplateIdx
                            ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                            : 'bg-white/[0.04] text-slate-400 hover:text-white'
                        }`}
                      >
                        {tpl.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Stats Bar ──────────────────────────────────────────────── */}
      <section className="border-y border-white/[0.08] py-12 px-6 bg-slate-950/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center flex flex-col items-center"
            >
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-3 text-indigo-400">
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="font-heading font-black text-3xl md:text-4xl gradient-text mb-1">{stat.value}</div>
              <div className="text-xs font-semibold text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Bento Grid Features Section ───────────────────────────── */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="badge badge-indigo inline-flex mb-4">Precision Engineering</span>
            <h2 className="font-heading font-black text-4xl md:text-6xl text-white mb-6">
              Designed for Perfection.<br />
              <span className="gradient-text">Engineered for Speed.</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Everything you need to turn your raw work into an irresistible portfolio that converts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BENTO_FEATURES.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`glass-card gradient-border rounded-3xl p-8 flex flex-col justify-between ${feat.span} bg-gradient-to-br ${feat.gradient} ${feat.borderColor}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl glass border border-white/10 flex items-center justify-center text-indigo-400 shadow-lg">
                      <feat.icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-bold text-slate-300 uppercase tracking-widest">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-white mb-3 leading-snug">{feat.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feat.description}</p>
                </div>
                {feat.customContent}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials Wall of Love ───────────────────────────────── */}
      <section className="py-28 px-6 border-t border-white/[0.08] bg-slate-950/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="badge badge-indigo inline-flex mb-4">Wall of Love</span>
            <h2 className="font-heading font-black text-4xl md:text-5xl text-white mb-4">
              Loved by Top Creators Worldwide
            </h2>
            <p className="text-slate-400 text-sm">See how designers, developers, and agency leads use PortfolioCraft to win deals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card gradient-border rounded-3xl p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, si) => <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-slate-200 text-base font-medium leading-relaxed mb-8">
                    "{t.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/10" />
                  <div>
                    <div className="font-bold text-white text-sm">{t.author}</div>
                    <div className="text-slate-400 text-xs">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA Spotlight ─────────────────────────────────────── */}
      <section className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass gradient-border rounded-[2.5rem] p-12 md:p-16 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-b from-indigo-600/20 to-purple-600/10 blur-[100px] pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 badge badge-emerald mb-6">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Free Plan Available · Setup in 3 Minutes</span>
              </div>
              <h2 className="font-heading font-black text-4xl md:text-6xl text-white mb-6 leading-tight">
                Your Next Opportunity<br />
                <span className="gradient-text">Starts Right Here.</span>
              </h2>
              <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Join thousands of designers, developers, and creators who built Adobe-grade portfolios with PortfolioCraft.
              </p>
              <Link
                to="/register"
                className="group btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-indigo-500/30"
              >
                <span>Start Building Now — It's Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-slate-500 text-xs mt-6 font-semibold">No credit card required · Instant access · One-click publish</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
