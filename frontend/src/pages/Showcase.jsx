import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import {
  Award,
  ExternalLink,
  Star,
  Layers,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Code2,
  ShieldCheck,
  Zap,
  Globe,
  Sparkles,
  Palette
} from 'lucide-react';
import { SHOWCASE_CREATORS } from '../data/showcaseData';

export default function Showcase() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24 px-6 max-w-6xl mx-auto w-full">
        {/* ─── 1. PAGE HEADER & CURATORIAL MANIFESTO ──────────────────────── */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="badge badge-indigo inline-flex mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Curated Excellence & Outcomes</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white mb-6 leading-tight">
            Created with<br />
            <span className="gradient-text">PortfolioCraft</span>
          </h1>

          <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed text-left sm:text-center max-w-3xl mx-auto">
            <p>
              In high-stakes hiring loops and executive agency pitches, hiring directors spend less than 45 seconds scanning a candidate's portfolio before deciding whether to advance them or pass. Traditional static portfolios—burdened by uncompressed screenshots, passive lists of programming languages, and vague descriptions—fail because they treat the portfolio as a digital archive rather than a persuasive product demonstration.
            </p>
            <p className="text-slate-400 text-sm sm:text-base">
              The portfolios featured below represent the top 1% of independent creators, senior product designers, distributed systems engineers, and creative directors worldwide. Every layout has been engineered with real-time CSS theme tokens, quantified KPI case studies, and live sandboxed prototypes that turn passive visitors into immediate interview invitations and multi-thousand-dollar retainers.
            </p>
          </div>
        </div>

        {/* ─── 2. CREATOR CARDS WITH INTERACTIVE PROJECTS ─────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {SHOWCASE_CREATORS.map((s, idx) => (
            <motion.div
              key={s.handle}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card gradient-border rounded-3xl p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Creator Header with Avatar & Details */}
                <Link
                  to={`/showcase/${s.handle}`}
                  className="flex items-center gap-3 mb-5 pb-4 border-b border-white/[0.06] hover:opacity-90 transition"
                >
                  <div
                    className="w-12 h-12 rounded-full border-2 overflow-hidden flex-shrink-0 bg-slate-900"
                    style={{ borderColor: s.accentColor || '#6366f1' }}
                  >
                    <img src={s.avatar} alt={s.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading font-bold text-lg text-white group-hover:text-indigo-400 transition-colors truncate">
                      {s.name}
                    </h3>
                    <div className="text-xs text-indigo-400 font-semibold truncate">{s.role}</div>
                  </div>
                </Link>

                {/* 3 Featured Projects Inside Card */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-400" />
                      <span>3 Featured Projects</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {s.projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="group/proj relative aspect-square rounded-xl overflow-hidden glass border border-white/10 transition-all"
                        title={proj.title}
                      >
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover/proj:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover/proj:opacity-100 transition-opacity flex flex-col items-center justify-center p-1.5 text-center">
                          <span className="text-[10px] text-white font-semibold line-clamp-2 leading-tight">
                            {proj.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="mb-6 bg-white/[0.02] p-3.5 rounded-2xl border border-white/[0.04]">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-400 text-xs italic leading-relaxed">"{s.quote}"</p>
                </div>
              </div>

              {/* View Live Portfolio Button */}
              <div>
                <Link
                  to={`/showcase/${s.handle}`}
                  className="btn-primary w-full py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2"
                >
                  <span>View Live Portfolio</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── 3. THE 4 EVALUATION STANDARDS (IN-DEPTH PARAGRAPHS) ─────────── */}
        <section className="mb-24 border-t border-white/[0.07] pt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="badge badge-emerald inline-flex mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Curation Benchmarks</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white mb-5">
              The 4 Pillars of a <span className="gradient-text">Top 1% Portfolio</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Every portfolio selected for our community showcase is evaluated across four rigorous dimensions by our editorial board. Here is the architectural criteria we look for:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pillar 1 */}
            <div className="glass-card gradient-border rounded-3xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                1. Quantified Business Outcomes over Subjective Vanity
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Hiring managers and founders don't evaluate portfolios in an aesthetic vacuum; they evaluate them against operational risk and return on investment. The strongest case studies lead with a dedicated impact strip highlighting quantifiable outcomes: conversion rate lifts, latency reductions, operational savings, or app store sentiment.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Even when proprietary revenue metrics cannot be shared publicly, top creators quantify their craft through ergonomic metrics—such as cutting multi-step verification from 14 clicks down to 3, or decreasing customer support inquiry volume by 48% through clearer contextual onboarding.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="glass-card gradient-border rounded-3xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                2. Live Sandboxed Prototypes vs. Static Screenshots
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                A static image can conceal flaws, lag, and poor ergonomics; an interactive prototype proves production mastery. Portfolios in our showcase feature native, sandboxed embeds from Figma, Spline 3D, CodePen, and Loom that allow hiring directors to click, drag, orbit, and experience real micro-interactions directly inside the browser.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                By presenting fully working flows rather than flat mockups, creators demonstrate that their designs withstand real-world touch interaction, edge-case states, and responsive breakpoint shifts without requiring reviewers to jump through external third-party links.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="glass-card gradient-border rounded-3xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                3. Architectural Decision Rationale & Documented Trade-Offs
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                What separates a mid-level practitioner from an executive leader is the ability to navigate trade-offs under real business, performance, and timeline constraints. Exceptional portfolios articulate the exact paths that were rejected and the reasons why.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Showing how a technical bottleneck was mitigated, why an initial design hypothesis failed usability benchmarks, or how a modular token system kept multi-brand codebases synchronous across 6 squads proves mature systems-level thinking that commands senior and staff compensation.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="glass-card gradient-border rounded-3xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                4. Privacy-Protected Inbound Routing & Frictionless Ergonomics
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Once a hiring executive or enterprise client decides they want to work with you, any friction in the outreach flow degrades conversion. Top portfolios provide clear booking availability, expected response turnaround windows, and structured inquiry forms directly on the page.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Through PortfolioCraft's built-in inquiry inbox, creators capture validated inquiries, client budgets, and project timelines directly inside their dashboard—protecting their private phone numbers and personal email addresses from web scrapers while ensuring no high-ticket lead gets lost.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 4. CREATOR STRATEGY DEEP-DIVES (PARAGRAPH SPOTLIGHTS) ──────── */}
        <section className="mb-24 border-t border-white/[0.07] pt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="badge badge-indigo inline-flex mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Behind the Case Studies</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white mb-5">
              Creator Strategy <span className="gradient-text">Deep-Dives</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Explore how each featured creator customized their layout, structured their case study narrative, and positioned their expertise to stand out in their respective disciplines.
            </p>
          </div>

          <div className="space-y-8">
            {/* Deep-Dive 1: Alex Morgan */}
            <div className="glass rounded-3xl p-8 sm:p-10 border border-white/[0.08] relative overflow-hidden">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80"
                  alt="Alex Morgan"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500 shrink-0"
                />
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="font-heading font-black text-2xl text-white">
                        Alex Morgan · Staff Product Designer
                      </h3>
                      <p className="text-xs font-semibold text-indigo-400">
                        Focus: High-Frequency Fintech Telemetry & Multi-Brand Token Systems
                      </p>
                    </div>
                    <Link
                      to="/showcase/alex"
                      className="btn-ghost px-4 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white inline-flex items-center gap-1.5"
                    >
                      <span>Inspect Portfolio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Alex structured his portfolio to address a primary pain point in fintech hiring: proving that a designer can handle high-density, real-time data visualization without overwhelming retail investors. Rather than simply posting static Figma frames, Alex embedded interactive trade execution flows and documented his 120-token design system hierarchy.
                  </p>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    By placing three quantified metrics (+34% 30-day retention, 1.8-second order execution time, and $1.4B in assets managed) directly in his project overview cards, hiring leads at high-growth financial technology companies were able to validate his impact within 15 seconds of opening his link.
                  </p>
                </div>
              </div>
            </div>

            {/* Deep-Dive 2: Marcus Vance */}
            <div className="glass rounded-3xl p-8 sm:p-10 border border-white/[0.08] relative overflow-hidden">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                  alt="Marcus Vance"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500 shrink-0"
                />
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="font-heading font-black text-2xl text-white">
                        Marcus Vance · Principal Cloud & Distributed Systems Architect
                      </h3>
                      <p className="text-xs font-semibold text-emerald-400">
                        Focus: Sub-Millisecond Edge Telemetry, Rust/Go Microservices & Cost Reduction
                      </p>
                    </div>
                    <Link
                      to="/showcase/marcus"
                      className="btn-ghost px-4 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white inline-flex items-center gap-1.5"
                    >
                      <span>Inspect Portfolio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Marcus avoided the common engineering trap of writing a passive grocery list of languages and cloud tools. Instead, each of his featured projects is formatted around an expensive enterprise bottleneck: high multi-region cloud infrastructure costs, slow incident triage times, and distributed consensus latency.
                  </p>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    His portfolio showcases verifiable benchmark telemetry: 99.99% uptime SLAs across 50M+ daily events, 75ms query response times via ClickHouse columnar engines, and a 62% reduction in cloud infrastructure expenses. CTOs and engineering directors immediately recognize his ability to solve six-figure system bottlenecks.
                  </p>
                </div>
              </div>
            </div>

            {/* Deep-Dive 3: Elena Rostova */}
            <div className="glass rounded-3xl p-8 sm:p-10 border border-white/[0.08] relative overflow-hidden">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
                  alt="Elena Rostova"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-500 shrink-0"
                />
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="font-heading font-black text-2xl text-white">
                        Elena Rostova · Executive Creative Director
                      </h3>
                      <p className="text-xs font-semibold text-amber-400">
                        Focus: High-Fashion Digital Flagships, Variable Editorial Typography & 3D Motion
                      </p>
                    </div>
                    <Link
                      to="/showcase/elena"
                      className="btn-ghost px-4 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white inline-flex items-center gap-1.5"
                    >
                      <span>Inspect Portfolio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    For luxury brand campaigns and global cultural exhibitions, visual atmosphere is everything. Elena customized her PortfolioCraft site with rich obsidian glassmorphism, responsive editorial typography, and looping WebGL background shaders that create an immediate sense of prestige and museum-grade curation.
                  </p>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Her portfolio narrative pairs monumental visual storytelling with concrete agency outcomes: 28 global markets deployed, a +65% lift in brand recall, and 14 international industry design awards. Prospective enterprise brand partners can book high-ticket creative direction retainers directly through her integrated inquiry panel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5. HOW TO SUBMIT YOUR PORTFOLIO (PARAGRAPH SECTION) ────────── */}
        <section className="glass gradient-border rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto border border-white/10">
          <div className="badge badge-indigo inline-flex mb-4">
            <Globe className="w-3.5 h-3.5" />
            <span>Community Nomination</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-white mb-4">
            Want Your Portfolio Featured in the Global Showcase?
          </h2>
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8 text-left sm:text-center">
            <p>
              We continuously review community portfolios published through PortfolioCraft. If your portfolio features thorough case study narratives, verified project telemetry, clean design token execution, and an active inquiry channel, you can submit your handle for feature consideration by our curatorial committee.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm">
              Featured creators receive thousands of qualified monthly impressions from hiring leads at Fortune 500 enterprises, prominent venture capital funds, and top-tier tech startups. Submissions are reviewed every Friday, and selected portfolios are highlighted across our global homepage and community newsletters.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-bold text-white inline-flex items-center justify-center gap-2"
            >
              <span>Build Your Portfolio Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="btn-ghost w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white border border-white/10 inline-flex items-center justify-center gap-2"
            >
              <span>Submit Handle for Review</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
