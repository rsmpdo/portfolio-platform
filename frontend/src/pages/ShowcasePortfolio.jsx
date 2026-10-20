import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowLeft,
  ExternalLink,
  MapPin,
  Briefcase,
  CheckCircle2,
  Layers,
  Star,
  X,
  ArrowUpRight,
  Mail
} from 'lucide-react';
import Footer from '../components/common/Footer';
import { SHOWCASE_CREATORS, getShowcaseCreator } from '../data/showcaseData';

export default function ShowcasePortfolio({ overrideHandle = null }) {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeHandle = overrideHandle || params.handle || 'alex';
  const creator = getShowcaseCreator(activeHandle) || SHOWCASE_CREATORS[0];

  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${creator.name} — Showcase Portfolio | PortfolioCraft`;
  }, [creator]);

  // Support deep-linking to a specific project via ?project=id
  useEffect(() => {
    const projId = searchParams.get('project');
    if (projId && creator?.projects) {
      const found = creator.projects.find((p) => p.id === projId);
      if (found) {
        setSelectedProject(found);
      }
    } else {
      setSelectedProject(null);
    }
  }, [searchParams, creator]);

  const handleCloseProject = () => {
    setSelectedProject(null);
    if (searchParams.has('project')) {
      searchParams.delete('project');
      setSearchParams(searchParams, { replace: true });
    }
  };

  return (
    <div
      className="min-h-screen text-slate-100 flex flex-col transition-colors duration-300"
      style={{ backgroundColor: creator.bgColor || '#050811' }}
    >
      {/* Top Showcase Bar (Separate from Editor Templates) */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 md:mx-8 mt-4">
          <div className="glass-dark rounded-2xl px-4 md:px-6 h-14 flex items-center justify-between shadow-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <Link
                to="/showcase"
                className="text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Showcases</span>
              </Link>
              <div className="h-5 w-px bg-white/10 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: creator.accentColor }}
                />
                <span className="text-xs font-bold text-white">{creator.name}</span>
                <span className="text-[11px] text-slate-400">· Featured Creator Showcase</span>
              </div>
            </div>

            {/* Creator Switcher Pills */}
            <div className="hidden lg:flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-white/10">
              {SHOWCASE_CREATORS.map((c) => {
                const isActive = c.handle === creator.handle;
                return (
                  <Link
                    key={c.handle}
                    to={`/showcase/${c.handle}`}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                      isActive
                        ? 'text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    style={isActive ? { backgroundColor: creator.accentColor } : undefined}
                  >
                    {c.name.split(' ')[0]}
                  </Link>
                );
              })}
            </div>

            <Link
              to="/register"
              className="px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transition hover:opacity-95"
              style={{
                background: `linear-gradient(135deg, ${creator.accentColor}, ${creator.secondaryColor})`
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Build Yours Free</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Showcase Portfolio Content */}
      <main className="flex-1 pt-28 pb-20">
        {/* Hero Section */}
        <section className="relative px-6 py-16 md:py-24 overflow-hidden">
          <div
            className="absolute top-0 right-1/4 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none opacity-25"
            style={{ backgroundColor: creator.accentColor }}
          />
          <div
            className="absolute bottom-0 left-1/4 w-[450px] h-[450px] rounded-full blur-[120px] pointer-events-none opacity-15"
            style={{ backgroundColor: creator.secondaryColor }}
          />

          <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border"
                style={{
                  backgroundColor: `${creator.accentColor}18`,
                  borderColor: `${creator.accentColor}45`,
                  color: creator.accentColor
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{creator.role}</span>
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-white leading-[1.08] tracking-tight">
                {creator.headline}
              </h1>

              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
                {creator.bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" style={{ color: creator.accentColor }} />
                  {creator.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" style={{ color: creator.accentColor }} />
                  {creator.experience}
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  Verified Showcase Creator
                </span>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#showcase-projects"
                  className="px-6 py-3.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider shadow-lg transition hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(135deg, ${creator.accentColor}, ${creator.secondaryColor})`
                  }}
                >
                  Explore Featured Projects
                </a>
                <a
                  href="#showcase-contact"
                  className="px-6 py-3.5 rounded-xl glass border border-white/10 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider transition"
                >
                  Get in Touch
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5 flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div
                  className="w-64 h-64 sm:w-80 sm:h-80 rounded-[2.5rem] overflow-hidden border-2 shadow-2xl relative z-10"
                  style={{ borderColor: `${creator.accentColor}60` }}
                >
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className=" -bottom-5 -left-5 z-20 glass-dark p-4 rounded-2xl border border-white/10 shadow-xl max-w-[240px] mt-4"
                >
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-300 italic leading-snug">
                    "{creator.quote}"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Metrics Strip */}
        <section className="px-6 py-10 border-y border-white/[0.06] bg-white/[0.01]">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {creator.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl glass border border-white/[0.06] text-center"
              >
                <div
                  className="font-heading font-black text-3xl md:text-4xl mb-1"
                  style={{ color: creator.accentColor }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Showcase Projects (Interactive Case Studies) */}
        <section id="showcase-projects" className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: creator.accentColor }}
                >
                  <Layers className="w-4 h-4" />
                  <span>Showcase Case Studies</span>
                </div>
                <h2 className="font-heading font-black text-3xl md:text-5xl text-white">
                  Featured Projects
                </h2>
              </div>
              <p className="text-slate-400 text-sm max-w-md">
                Click any project below to inspect the full case study, architecture decisions, and measurable impact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {creator.projects.map((proj, idx) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedProject(proj)}
                  className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-white/25 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-56 overflow-hidden bg-slate-900">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/85 text-white border border-white/15 backdrop-blur-md">
                          {proj.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-heading font-bold text-xl text-white mb-2 group-hover:text-indigo-400 transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed mb-4">
                        {proj.summary}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {proj.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-white/[0.04] border border-white/[0.08] text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-white/[0.05] flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-400">
                      {proj.impact.split('·')[0]}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 text-xs font-bold"
                      style={{ color: creator.accentColor }}
                    >
                      <span>Read Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience & Skills Grid */}
        <section className="px-6 py-16 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Experience Timeline */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="font-heading font-bold text-2xl text-white">
                Experience & Leadership
              </h3>
              <div className="space-y-4">
                {creator.experienceTimeline.map((exp, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl glass border border-white/[0.08] space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-heading font-bold text-lg text-white">
                        {exp.role}
                      </h4>
                      <span
                        className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg"
                        style={{
                          backgroundColor: `${creator.accentColor}18`,
                          color: creator.accentColor
                        }}
                      >
                        {exp.period}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-400">
                      {exp.company}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Competencies */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="font-heading font-bold text-2xl text-white">
                Core Specialties & Stack
              </h3>
              <div className="p-6 rounded-2xl glass border border-white/[0.08] space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Primary technologies, tools, and methodologies used across production launches:
                </p>
                <div className="flex flex-wrap gap-2">
                  {creator.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold border"
                      style={{
                        backgroundColor: `${creator.accentColor}12`,
                        borderColor: `${creator.accentColor}35`,
                        color: '#f8fafc'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Box */}
              <div
                id="showcase-contact"
                className="p-6 rounded-2xl glass border border-white/10 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: creator.accentColor }}
                  >
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-white">
                      Work with {creator.name.split(' ')[0]}
                    </h4>
                    <p className="text-xs text-slate-400">
                      Available for advisory & select projects
                    </p>
                  </div>
                </div>
                <Link
                  to="/register"
                  className="w-full py-3 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition hover:opacity-95"
                  style={{
                    background: `linear-gradient(135deg, ${creator.accentColor}, ${creator.secondaryColor})`
                  }}
                >
                  <span>Create a Portfolio Like {creator.name.split(' ')[0]}'s</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Interactive Project Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseProject}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-dark border border-white/15 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl my-8"
            >
              <div className="relative h-64 sm:h-80 bg-slate-900">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <button
                  onClick={handleCloseProject}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/80 border border-white/15 text-white flex items-center justify-center hover:bg-slate-900 transition"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block mb-2"
                    style={{
                      backgroundColor: creator.accentColor,
                      color: '#fff'
                    }}
                  >
                    {selectedProject.category}
                  </span>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Measured Impact
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {selectedProject.impact}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      The Challenge
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {selectedProject.challenge}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      The Solution
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    Technologies & Deliverables
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 text-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                  <button
                    onClick={handleCloseProject}
                    className="px-5 py-2.5 rounded-xl glass text-xs font-bold text-slate-300 hover:text-white"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
