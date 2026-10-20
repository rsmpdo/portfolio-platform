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
  Mail,
  Phone,
  Globe,
  Clock,
  Copy,
  Check,
  Send,
  Calendar,
  Users,
  Award,
  Quote,
  ChevronRight
} from 'lucide-react';
import Footer from '../components/common/Footer';
import { SHOWCASE_CREATORS, getShowcaseCreator } from '../data/showcaseData';

export default function ShowcasePortfolio({ overrideHandle = null }) {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeHandle = overrideHandle || params.handle || 'alex';
  const creator = getShowcaseCreator(activeHandle) || SHOWCASE_CREATORS[0];

  const [selectedProject, setSelectedProject] = useState(null);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [copiedField, setCopiedField] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    scope: 'Product / Architecture Sprint',
    budget: '$10k – $25k',
    message: ''
  });
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${creator.name} — Showcase Portfolio | PortfolioCraft`;
    setMessageSent(false);
  }, [creator]);

  // Support deep-linking to a specific project via ?project=id
  useEffect(() => {
    const projId = searchParams.get('project');
    if (projId && creator?.projects) {
      const found = creator.projects.find((p) => p.id === projId);
      if (found) {
        setSelectedProject(found);
        setActiveGalleryIdx(0);
      }
    } else {
      setSelectedProject(null);
    }
  }, [searchParams, creator]);

  const handleOpenProject = (proj) => {
    setSelectedProject(proj);
    setActiveGalleryIdx(0);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    if (searchParams.has('project')) {
      searchParams.delete('project');
      setSearchParams(searchParams, { replace: true });
    }
  };

  const handleCopy = (value, label) => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopiedField(label);
    setTimeout(() => setCopiedField(''), 2200);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setMessageSent(true);
    setContactForm({
      name: '',
      email: '',
      scope: 'Product / Architecture Sprint',
      budget: '$10k – $25k',
      message: ''
    });
  };

  const contactInfo = creator.contact || {};

  return (
    <div
      className="min-h-screen text-slate-100 flex flex-col transition-colors duration-300"
      style={{ backgroundColor: creator.bgColor || '#050811' }}
    >
      {/* Top Showcase Bar (Separate from Editor Templates) */}
      <nav className="fixed top-0 left-0 right-0 z-40">
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
                      isActive ? 'text-white shadow-md' : 'text-slate-400 hover:text-white'
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
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border"
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

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" style={{ color: creator.accentColor }} />
                  {creator.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" style={{ color: creator.accentColor }} />
                  {creator.experience}
                </span>
                {contactInfo.email && (
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-1.5 hover:text-white transition"
                  >
                    <Mail className="w-4 h-4" style={{ color: creator.accentColor }} />
                    {contactInfo.email}
                  </a>
                )}
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
                  Explore 3 Full Case Studies
                </a>
                <a
                  href="#showcase-contact"
                  className="px-6 py-3.5 rounded-xl glass border border-white/10 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider transition"
                >
                  Contact & Direct Inquiry
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
                <div className="z-20 glass-dark p-4 rounded-2xl border border-white/10 shadow-xl max-w-[260px] mt-4">
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

        {/* Featured Showcase Projects (Deep Production Case Studies) */}
        <section id="showcase-projects" className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: creator.accentColor }}
                >
                  <Layers className="w-4 h-4" />
                  <span>Production Case Studies</span>
                </div>
                <h2 className="font-heading font-black text-3xl md:text-5xl text-white">
                  Featured Projects & Architecture
                </h2>
              </div>
              <p className="text-slate-400 text-sm max-w-md">
                Click any project card below to open the complete multi-stage case study with KPI metrics, process breakdown, screen gallery, and client feedback.
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
                  onClick={() => handleOpenProject(proj)}
                  className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-56 overflow-hidden bg-slate-900">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/90 text-white border border-white/15 backdrop-blur-md">
                          {proj.category}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300 font-medium">
                        <span className="truncate">{proj.client}</span>
                        <span className="text-slate-400 shrink-0">{proj.timeline?.split(' ')[0]} {proj.timeline?.split(' ')[1]}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-heading font-bold text-xl text-white mb-2 group-hover:text-indigo-400 transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-slate-300 text-xs leading-relaxed mb-4">
                        {proj.summary}
                      </p>

                      {/* Mini KPI strip inside card */}
                      {proj.metrics && (
                        <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                          {proj.metrics.slice(0, 2).map((m, mIdx) => (
                            <div key={mIdx}>
                              <div
                                className="font-heading font-black text-base"
                                style={{ color: creator.accentColor }}
                              >
                                {m.value}
                              </div>
                              <div className="text-[10px] text-slate-400 font-semibold uppercase">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1.5">
                        {proj.tags.slice(0, 4).map((tag, tIdx) => (
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

                  <div className="px-6 pb-6 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-400">
                      {proj.process?.length || 4}-Phase Case Study
                    </span>
                    <span
                      className="inline-flex items-center gap-1 text-xs font-bold group-hover:translate-x-0.5 transition-transform"
                      style={{ color: creator.accentColor }}
                    >
                      <span>Read Full Case Study</span>
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

              {/* Availability & Advisory Rate Card */}
              <div className="p-6 rounded-2xl glass border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Current Availability
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Accepting Inquiries
                  </span>
                </div>
                <p className="text-sm font-semibold text-white">
                  {contactInfo.availability}
                </p>
                <p className="text-xs text-slate-400">
                  {contactInfo.hourlyRate} · {contactInfo.responseTime}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Full Dedicated Contact Section with Direct Contact Details & Form */}
        <section id="showcase-contact" className="px-6 py-20 border-t border-white/[0.08]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: creator.accentColor }}
              >
                <Mail className="w-4 h-4" />
                <span>Direct Contact & Booking</span>
              </div>
              <h2 className="font-heading font-black text-3xl md:text-5xl text-white mb-3">
                Get in Touch with {creator.name}
              </h2>
              <p className="text-slate-400 text-sm">
                Reach out directly via email, phone, or social channels below, or send a project brief for advisory and consulting engagements.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Complete Contact Information Cards */}
              <div className="lg:col-span-5 space-y-4">
                {/* Direct Email Card */}
                <div className="p-5 rounded-2xl glass border border-white/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0"
                      style={{ backgroundColor: `${creator.accentColor}25`, color: creator.accentColor }}
                    >
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Direct Email
                      </div>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-sm font-bold text-white hover:underline truncate block"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(contactInfo.email, 'email')}
                    className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 shrink-0 transition"
                    title="Copy Email Address"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Direct Phone / Studio Line Card */}
                <div className="p-5 rounded-2xl glass border border-white/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${creator.accentColor}25`, color: creator.accentColor }}
                    >
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Phone / WhatsApp Studio Line
                      </div>
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="text-sm font-bold text-white hover:underline block"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(contactInfo.phone, 'phone')}
                    className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 shrink-0 transition"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Location & Timezone Card */}
                <div className="p-5 rounded-2xl glass border border-white/10 flex items-center gap-3.5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${creator.accentColor}25`, color: creator.accentColor }}
                  >
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Studio Location & Timezone
                    </div>
                    <div className="text-sm font-bold text-white">{contactInfo.location}</div>
                    <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{contactInfo.timezone} · {contactInfo.responseTime}</span>
                    </div>
                  </div>
                </div>

                {/* Personal Website & Social Profiles */}
                <div className="p-5 rounded-2xl glass border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                      <Globe className="w-4 h-4" style={{ color: creator.accentColor }} />
                      <span>Verified Socials & Links</span>
                    </div>
                    <span className="text-xs font-mono text-slate-300">{contactInfo.website?.replace('https://', '')}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {contactInfo.socials?.map((soc, idx) => (
                      <a
                        key={idx}
                        href={soc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition flex items-center justify-between group"
                      >
                        <div className="min-w-0">
                          <div className="text-[10px] font-bold uppercase text-slate-400">
                            {soc.label}
                          </div>
                          <div className="text-xs font-semibold text-white truncate">
                            {soc.handle}
                          </div>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Direct Project Inquiry Form */}
              <div className="lg:col-span-7 glass-card gradient-border rounded-3xl p-6 sm:p-8 border border-white/10">
                <h3 className="font-heading font-bold text-2xl text-white mb-2">
                  Send a Direct Message to {creator.name.split(' ')[0]}
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Have a product, architecture, or brand initiative in mind? Fill out the brief below to connect directly with {creator.name}.
                </p>

                {messageSent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-heading font-bold text-xl text-white">
                      Inquiry Sent to {creator.name}!
                    </h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out. A copy of your project brief has been routed to{' '}
                      <span className="text-white font-semibold">{contactInfo.email}</span>. {creator.name.split(' ')[0]} typically responds within 4 hours.
                    </p>
                    <button
                      onClick={() => setMessageSent(false)}
                      className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="Sarah Jenkins"
                          className="input-field w-full px-4 py-3 rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="sarah@company.com"
                          className="input-field w-full px-4 py-3 rounded-xl text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          Engagement Type
                        </label>
                        <select
                          value={contactForm.scope}
                          onChange={(e) => setContactForm({ ...contactForm, scope: e.target.value })}
                          className="input-field w-full px-4 py-3 rounded-xl text-xs bg-slate-900"
                        >
                          <option value="Product / Architecture Sprint">Product / Architecture Sprint</option>
                          <option value="Full-Time / Executive Role">Full-Time / Executive Role</option>
                          <option value="Ongoing Advisory Retainer">Ongoing Advisory Retainer</option>
                          <option value="Design System / Brand Overhaul">Design System / Brand Overhaul</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          Estimated Budget
                        </label>
                        <select
                          value={contactForm.budget}
                          onChange={(e) => setContactForm({ ...contactForm, budget: e.target.value })}
                          className="input-field w-full px-4 py-3 rounded-xl text-xs bg-slate-900"
                        >
                          <option value="$5k – $10k">$5k – $10k</option>
                          <option value="$10k – $25k">$10k – $25k</option>
                          <option value="$25k – $50k">$25k – $50k</option>
                          <option value="$50k+ Enterprise">$50k+ Enterprise</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Project Details & Timeline *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder={`Hi ${creator.name.split(' ')[0]}, we loved your ${creator.projects[0]?.title} case study and would love to discuss an upcoming launch...`}
                        className="input-field w-full px-4 py-3 rounded-xl text-xs resize-none"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <span className="text-[11px] text-slate-400">
                        Direct recipient: <strong className="text-slate-200">{contactInfo.email}</strong>
                      </span>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition hover:opacity-95"
                        style={{
                          background: `linear-gradient(135deg, ${creator.accentColor}, ${creator.secondaryColor})`
                        }}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Direct Inquiry</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Comprehensive Multi-Section Production Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseProject}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-start justify-center p-3 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-dark border border-white/15 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl my-6"
            >
              {/* Hero Cover / Active Gallery Screen */}
              <div className="relative h-72 sm:h-96 bg-slate-900">
                <img
                  src={
                    selectedProject.gallery?.[activeGalleryIdx]?.url ||
                    selectedProject.image
                  }
                  alt={selectedProject.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />

                <button
                  onClick={handleCloseProject}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-950/85 border border-white/20 text-white flex items-center justify-center hover:bg-slate-900 transition"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-5 left-6 right-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: creator.accentColor,
                        color: '#fff'
                      }}
                    >
                      {selectedProject.category}
                    </span>
                    {selectedProject.client && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 border border-white/15 text-slate-200">
                        Client: {selectedProject.client}
                      </span>
                    )}
                  </div>
                  <h2 className="font-heading font-black text-2xl sm:text-4xl text-white">
                    {selectedProject.title}
                  </h2>
                  {selectedProject.gallery?.[activeGalleryIdx]?.caption && (
                    <p className="text-xs text-slate-300 mt-1">
                      Screen {activeGalleryIdx + 1} of {selectedProject.gallery.length}:{' '}
                      {selectedProject.gallery[activeGalleryIdx].caption}
                    </p>
                  )}
                </div>
              </div>

              {/* Interactive Gallery Thumbnails Strip */}
              {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                <div className="px-6 sm:px-8 py-4 bg-slate-950/80 border-b border-white/10 flex items-center gap-3 overflow-x-auto">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
                    Project Screens:
                  </span>
                  {selectedProject.gallery.map((shot, gIdx) => (
                    <button
                      key={gIdx}
                      onClick={() => setActiveGalleryIdx(gIdx)}
                      className={`relative h-14 w-24 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                        activeGalleryIdx === gIdx
                          ? 'scale-105 shadow-lg'
                          : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                      style={
                        activeGalleryIdx === gIdx
                          ? { borderColor: creator.accentColor }
                          : undefined
                      }
                    >
                      <img src={shot.url} alt={shot.caption} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Project Metadata Strip (Client, Role, Timeline, Team) */}
              <div className="px-6 sm:px-8 py-4 bg-white/[0.02] border-b border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Briefcase className="w-3 h-3" style={{ color: creator.accentColor }} />
                    <span>Role</span>
                  </div>
                  <div className="font-bold text-white mt-0.5">{selectedProject.role || creator.role}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Award className="w-3 h-3" style={{ color: creator.accentColor }} />
                    <span>Client / Org</span>
                  </div>
                  <div className="font-bold text-white mt-0.5">{selectedProject.client || 'Flagship Client'}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" style={{ color: creator.accentColor }} />
                    <span>Timeline</span>
                  </div>
                  <div className="font-bold text-white mt-0.5">{selectedProject.timeline || '16 Weeks'}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Users className="w-3 h-3" style={{ color: creator.accentColor }} />
                    <span>Project Team</span>
                  </div>
                  <div className="font-bold text-white mt-0.5">{selectedProject.team || 'Cross-Functional Squad'}</div>
                </div>
              </div>

              {/* Case Study Body */}
              <div className="p-6 sm:p-8 space-y-8">
                {/* 4 KPI Metric Cards */}
                {selectedProject.metrics && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verified Business & Engineering Outcomes</span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {selectedProject.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-4 rounded-2xl bg-white/[0.03] border border-white/10"
                        >
                          <div
                            className="font-heading font-black text-2xl sm:text-3xl mb-1"
                            style={{ color: creator.accentColor }}
                          >
                            {m.value}
                          </div>
                          <div className="text-xs font-bold text-white">{m.label}</div>
                          <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                            {m.detail}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Executive Overview */}
                {selectedProject.overview && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Executive Summary & Context
                    </h4>
                    <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-line bg-white/[0.02] p-5 rounded-2xl border border-white/[0.06]">
                      {selectedProject.overview}
                    </div>
                  </div>
                )}

                {/* The Challenge & The Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">
                      The Problem & Constraints
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {selectedProject.challenge}
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      The Architecture & Solution
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* 4-Step Architecture & Execution Process */}
                {selectedProject.process && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Architecture & Execution Process
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedProject.process.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-5 rounded-2xl glass border border-white/10 space-y-2"
                        >
                          <div
                            className="text-xs font-mono font-bold"
                            style={{ color: creator.accentColor }}
                          >
                            {step.phase}
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {step.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Deliverables */}
                {selectedProject.deliverables && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Key Production Deliverables
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProject.deliverables.map((item, dIdx) => (
                        <div
                          key={dIdx}
                          className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-2.5 text-xs font-semibold text-white"
                        >
                          <CheckCircle2
                            className="w-4 h-4 shrink-0"
                            style={{ color: creator.accentColor }}
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Client Testimonial Quote */}
                {selectedProject.testimonial && (
                  <div
                    className="p-6 rounded-2xl border relative overflow-hidden"
                    style={{
                      backgroundColor: `${creator.accentColor}10`,
                      borderColor: `${creator.accentColor}35`
                    }}
                  >
                    <Quote
                      className="w-8 h-8 mb-3 opacity-40"
                      style={{ color: creator.accentColor }}
                    />
                    <p className="text-sm sm:text-base text-white italic leading-relaxed mb-4">
                      "{selectedProject.testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-white">
                        {selectedProject.testimonial.author}
                      </span>
                      <span className="text-slate-400">·</span>
                      <span style={{ color: creator.accentColor }} className="font-semibold">
                        {selectedProject.testimonial.role}
                      </span>
                    </div>
                  </div>
                )}

                {/* Technologies & Stack */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    Technologies, Tools & Stack
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

                {/* Modal Footer: Switch to other projects or Close */}
                <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">More by {creator.name.split(' ')[0]}:</span>
                    {creator.projects
                      .filter((p) => p.id !== selectedProject.id)
                      .map((other) => (
                        <button
                          key={other.id}
                          onClick={() => handleOpenProject(other)}
                          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-1 transition"
                        >
                          <span className="truncate max-w-[140px]">{other.title}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href="#showcase-contact"
                      onClick={handleCloseProject}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition"
                      style={{
                        background: `linear-gradient(135deg, ${creator.accentColor}, ${creator.secondaryColor})`
                      }}
                    >
                      Inquire About Similar Project
                    </a>
                    <button
                      onClick={handleCloseProject}
                      className="px-5 py-2.5 rounded-xl glass text-xs font-bold text-slate-300 hover:text-white"
                    >
                      Close Case Study
                    </button>
                  </div>
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
