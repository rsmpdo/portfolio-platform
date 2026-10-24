import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import {
  Users,
  Target,
  Heart,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Layers,
  Palette,
  Award,
  CheckCircle2,
  Code2,
  Compass
} from 'lucide-react';

const impactStats = [
  { value: '10,000+', label: 'Active Creators Worldwide' },
  { value: '140+', label: 'Countries Represented' },
  { value: '99.99%', label: 'Global Edge Uptime' },
  { value: '$45M+', label: 'Client Contracts Won by Users' }
];

const pillars = [
  {
    icon: Layers,
    title: 'Modular Visual Architecture',
    description:
      'Every section—from Hero Banners and Interactive Case Studies to Experience Timelines and Metric Cards—is engineered for total customization without touching a line of code.'
  },
  {
    icon: Palette,
    title: 'Dynamic Theme & Color Engine',
    description:
      'Switch effortlessly between curated dark and light palettes or fine-tune 6 granular CSS color tokens (Primary, Secondary, Canvas, Surface, Text, Muted) with live preview.'
  },
  {
    icon: Zap,
    title: 'Sub-Second Edge Performance',
    description:
      'Portfolios are optimized for instant first-contentful paint, smooth 60fps micro-animations, and responsive desktop, tablet, and mobile viewports.'
  },
  {
    icon: ShieldCheck,
    title: 'Privacy-First Inquiry Routing',
    description:
      'Built-in contact forms route leads directly to your inbox with intelligent spam protection and privacy-preserving analytics.'
  },
  {
    icon: Globe,
    title: 'Multi-Portfolio Studio Scaling',
    description:
      'Run up to 5 independent portfolios under a single account—ideal for multidisciplinary creators, consultants, and boutique agencies.'
  },
  {
    icon: Award,
    title: 'Hiring-Manager Validated Layouts',
    description:
      'Our template hierarchy was co-designed with design directors and engineering VPs from top tech companies to highlight measurable impact in the first 5 seconds.'
  }
];

const milestones = [
  {
    year: '2024',
    title: 'The Spark & Core Layout Engine',
    description:
      'Founded after interviewing 200+ designers and engineers who were tired of spending weeks coding custom portfolio sites or fighting bloated drag-and-drop page builders.'
  },
  {
    year: '2025',
    title: 'Premium Templates & Multi-Portfolio Tiers',
    description:
      'Launched 10 industry-specialized templates across Free, Pro, and Studio tiers with live device-responsive previews and interactive metric modules.'
  },
  {
    year: '2026',
    title: 'Global Creator Community & Live Showcases',
    description:
      'Surpassed 10,000 creators across 140+ countries, helping product designers, cloud architects, and creative directors land dream roles and high-ticket retainers.'
  }
];

const leadershipTeam = [
  {
    name: 'Alex Morgan',
    role: 'Co-Founder & Head of Design Systems',
    bio: 'Former Principal Designer in San Francisco with 7+ years crafting enterprise design systems and multi-brand tokens.',
    avatar:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Marcus Vance',
    role: 'Co-Founder & Chief Cloud Architect',
    bio: 'Distributed systems engineer specializing in ultra-low-latency edge infrastructure, Node.js, and zero-downtime cloud deployments.',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Elena Rostova',
    role: 'VP of Creative Direction & Brand',
    bio: 'Award-winning creative director leading editorial typography, motion choreography, and visual storytelling across London and Paris.',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-6xl mx-auto w-full space-y-24">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="badge badge-indigo inline-flex mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Our Mission & Story</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-white mb-6">
            Empowering Creators to<br />
            <span className="gradient-text">Stand Out & Get Hired</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            We believe your work deserves a stage that feels as premium as your craft. We built PortfolioCraft so designers, developers, and directors spend less time wrangling code and more time winning life-changing opportunities.
          </p>
        </div>

        {/* Impact Stats Strip */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {impactStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="glass-card gradient-border rounded-3xl p-6 text-center"
            >
              <div className="font-heading font-black text-3xl md:text-4xl gradient-text mb-1.5">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </section>

        {/* Core Vision Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card gradient-border rounded-3xl p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4 text-indigo-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-lg mb-2">Our Vision</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Democratize premium studio-grade web design and interactive case study storytelling for every digital creator globally.
            </p>
          </div>

          <div className="glass-card gradient-border rounded-3xl p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-4 text-purple-400">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-lg mb-2">Global Community</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Over 10,000+ product designers, full-stack engineers, architects, and creative directors trust our engine to represent their work.
            </p>
          </div>

          <div className="glass-card gradient-border rounded-3xl p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mx-auto mb-4 text-pink-400">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-lg mb-2">Craft & Speed</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Engineered with obsessive attention to typographic hierarchy, glassmorphic depth, and instant edge page loads.
            </p>
          </div>
        </section>

        {/* Deep Story & Why We Built PortfolioCraft */}
        <section className="glass gradient-border rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400">
              <Compass className="w-4 h-4" />
              <span>Why We Built PortfolioCraft</span>
            </div>
            <h2 className="font-heading font-black text-3xl md:text-4xl text-white leading-tight">
              Great Talent Shouldn’t Be Held Back by Generic Website Builders
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              When we spoke with hundreds of hiring managers, design leads, and engineering VPs, a clear pattern emerged: recruiters spend less than 15 seconds scanning a portfolio before deciding whether to schedule an interview.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Traditional website builders force creators to start from blank canvases or clunky restaurant templates, while coding a custom portfolio from scratch takes weeks away from actual project work. PortfolioCraft bridges that gap—combining the speed of a structured CMS with the visual polish of a bespoke creative studio site.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Built specifically for case studies & technical proof',
                'Live Desktop, Tablet & Mobile responsive editor',
                'Instant template switching without losing content',
                'Direct inquiry routing & SEO metadata control'
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
                alt="PortfolioCraft Studio Team"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 mb-1">
                <Code2 className="w-4 h-4" />
                <span>Our Engineering Standard</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every PortfolioCraft layout compiles down to semantic, accessible React components styled with zero-bloat CSS variables and hardware-accelerated motion.
              </p>
            </div>
          </div>
        </section>

        {/* 6 Platform Pillars */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading font-black text-3xl md:text-4xl text-white mb-3">
              What Sets Our Platform Apart
            </h2>
            <p className="text-slate-400 text-sm">
              Six core architectural pillars that power every portfolio published on PortfolioCraft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="glass-card rounded-3xl p-6 border border-white/[0.08] hover:border-indigo-500/30 transition space-y-3"
                >
                  <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white">{pillar.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Company Journey Timeline */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading font-black text-3xl md:text-4xl text-white mb-3">
              Our Journey & Milestones
            </h2>
            <p className="text-slate-400 text-sm">
              How we evolved from an internal design system tool into a global portfolio platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="glass rounded-3xl p-6 border border-white/[0.08] relative space-y-3"
              >
                <span className="inline-block px-3 py-1 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-mono font-black text-xs">
                  {m.year}
                </span>
                <h3 className="font-heading font-bold text-lg text-white">{m.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Team */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading font-black text-3xl md:text-4xl text-white mb-3">
              Built by Creators, for Creators
            </h2>
            <p className="text-slate-400 text-sm">
              Meet the founding design and engineering leads behind PortfolioCraft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadershipTeam.map((member, idx) => (
              <div
                key={idx}
                className="glass-card gradient-border rounded-3xl p-6 text-center space-y-4"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-2xl object-cover mx-auto border-2 border-indigo-500/40"
                />
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">{member.name}</h3>
                  <div className="text-xs font-semibold text-indigo-400 mt-0.5">{member.role}</div>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="glass-card gradient-border rounded-3xl p-8 md:p-12 text-center">
          <h2 className="font-heading font-black text-2xl md:text-4xl text-white mb-3">
            Ready to Launch Your Portfolio?
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-6">
            Join over 10,000+ creators building their personal brand on PortfolioCraft. Start free today or explore our open roles.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="btn-primary px-7 py-3.5 rounded-xl text-xs font-bold text-white flex items-center gap-2"
            >
              <span>Start Building Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/templates"
              className="px-7 py-3.5 rounded-xl glass border border-white/10 text-xs font-bold text-slate-200 hover:text-white transition"
            >
              Explore Premium Templates
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
