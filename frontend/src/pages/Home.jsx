import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { ArrowRight, Star, Zap, Eye, Award, MousePointer2, CheckCircle } from 'lucide-react';

const stats = [
  { value: '10K+', label: 'Portfolios Created' },
  { value: '94%', label: 'Interview Rate Boost' },
  { value: '3x', label: 'More Client Inquiries' },
  { value: '< 5min', label: 'Setup Time' }
];

const features = [
  {
    icon: Eye,
    title: 'Make a Lasting First Impression',
    description: 'Your work deserves more than a PDF. Create a visual story that keeps potential clients and employers glued to the screen.',
    gradient: 'from-indigo-500/20 to-purple-500/10'
  },
  {
    icon: MousePointer2,
    title: 'Click to Customize. No Code.',
    description: 'Drag sections. Swap images. Tweak colors. Publish. Your portfolio, your rules — all from a beautifully simple editor.',
    gradient: 'from-purple-500/20 to-pink-500/10'
  },
  {
    icon: Zap,
    title: 'Live in Under 5 Minutes',
    description: 'While others are still setting up templates, your portfolio is already live and getting views. Speed is your superpower.',
    gradient: 'from-amber-500/20 to-orange-500/10'
  },
  {
    icon: Award,
    title: 'Designed to Get You Hired',
    description: 'Every layout, font, and animation is crafted to signal one thing: you are the best person for the job.',
    gradient: 'from-emerald-500/20 to-teal-500/10'
  }
];

const testimonials = [
  {
    quote: "I sent my portfolio link instead of a resume. Got three offers in a week.",
    author: "Jordan K.",
    role: "Product Designer at Figma"
  },
  {
    quote: "It looks like I spent months designing it. I built it in an afternoon.",
    author: "Priya M.",
    role: "Senior Developer at Stripe"
  },
  {
    quote: "Clients message me directly from my portfolio. It's my best salesperson.",
    author: "Carlos R.",
    role: "Creative Director & Freelancer"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <Header />

      {/* ─── Hero Section ─────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-indigo-600/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/8 blur-[100px]" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-600/6 blur-[80px]" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 badge badge-indigo mb-8">
              <Star className="w-3 h-3 fill-current" />
              <span>The Portfolio Platform Creators Trust</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] tracking-tight mb-8">
              Your work is{' '}
              <span className="relative">
                <span className="gradient-text">extraordinary.</span>
              </span>
              <br />
              <span className="text-slate-400 font-light italic font-display">
                Does your portfolio say that?
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-normal">
              Stop losing opportunities to a boring portfolio. Build one that makes people lean forward — then reach out.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/register"
                className="group btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-base"
              >
                <span>Build My Portfolio Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/p/admin_1"
                className="btn-ghost inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-slate-300 font-semibold text-base"
              >
                <Eye className="w-4 h-4" />
                <span>See a Live Example</span>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-10 flex items-center justify-center gap-3">
              <div className="flex -space-x-2">
                {['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
                  'https://images.unsplash.com/photo-1494790108755-2616b612b1e2?w=40&h=40&fit=crop',
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop'
                ].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-slate-950 object-cover" />
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Loved by 10,000+ creators worldwide</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Stats Strip ──────────────────────────── */}
      <section className="border-y border-white/[0.06] py-14 px-6 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-heading font-black text-4xl gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Features Grid ────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="badge badge-indigo inline-flex mb-4">Why PortfolioCraft</p>
            <h2 className="font-heading font-black text-4xl md:text-5xl text-white mb-5">
              Everything your portfolio needs<br />
              <span className="gradient-text">to do the heavy lifting.</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              While you focus on great work, your portfolio works 24/7 turning visitors into opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`glass-card gradient-border rounded-3xl p-8 bg-gradient-to-br ${feat.gradient}`}
              >
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center mb-6">
                  <feat.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-white mb-3">{feat.title}</h3>
                <p className="text-slate-400 text-base leading-relaxed">{feat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="badge badge-indigo inline-flex mb-4">Real Results</p>
            <h2 className="font-heading font-black text-4xl md:text-5xl text-white">
              People got hired.<br />
              <span className="font-display italic text-slate-400 font-normal">Here's what they said.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card gradient-border rounded-3xl p-8"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, si) => <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-200 text-lg font-medium leading-relaxed mb-6">
                  "{t.quote}"
                </p>
                <div>
                  <div className="font-semibold text-white text-sm">{t.author}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass gradient-border rounded-[2rem] p-14 relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-indigo-600/15 blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <p className="badge badge-emerald inline-flex mb-6">
                <CheckCircle className="w-3 h-3" />
                <span>Free Forever Plan Available</span>
              </p>
              <h2 className="font-heading font-black text-4xl md:text-6xl text-white mb-6">
                Your next big opportunity<br />
                <span className="gradient-text">starts with a great portfolio.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
                Join thousands of creators who stopped blending in and started standing out.
              </p>
              <Link
                to="/register"
                className="group btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-white font-bold text-lg"
              >
                <span>Start Building Now — It's Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-slate-600 text-xs mt-5">No credit card required. Live in minutes.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
