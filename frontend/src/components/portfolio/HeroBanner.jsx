import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, MonitorPlay, Sparkles } from 'lucide-react';

export default function HeroBanner({ props = {}, templateId, viewportMode }) {
  const {
    headline = "Hi, I'm Priyanath",
    subheadline = "Full Stack Developer & Creative Innovator",
    avatarUrl = "",
    ctaText = "View My Work",
    githubUrl = "",
    linkedinUrl = ""
  } = props;

  const isMobile = viewportMode === 'mobile';
  const gridClass = isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2';

  // ---------------------------------------------------------
  // 1. MINIMALIST EDITORIAL (Brutalist, Sharp, High Contrast)
  // ---------------------------------------------------------
  if (templateId === 'minimalist-editorial') {
    return (
      <section className="min-h-[80vh] flex flex-col justify-center px-6 pt-32 pb-16 bg-[#f8f9fa] text-slate-900 border-b-8 border-black">
        <div className="max-w-7xl mx-auto w-full">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            className="font-serif font-black text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] tracking-tighter mb-8 uppercase"
          >
            {headline}
          </motion.h1>
          <div className={`grid ${gridClass} gap-12 items-end border-t-2 border-black pt-8`}>
            <p className="text-xl md:text-3xl font-medium max-w-2xl font-sans tracking-tight leading-snug">
              {subheadline}
            </p>
            <div className="flex flex-col md:flex-row md:justify-end gap-4 font-sans font-bold uppercase text-sm tracking-widest">
              <a href="#projects" className="border-2 border-black px-8 py-4 hover:bg-black hover:text-white transition-colors text-center">
                {ctaText}
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------
  // 2. DARK CYBER (Terminal, Matrix, Glow)
  // ---------------------------------------------------------
  if (templateId === 'dark-cyber') {
    return (
      <section className="relative min-h-[85vh] flex items-center pt-20 pb-16 px-6 overflow-hidden font-mono bg-black text-emerald-500">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="max-w-5xl mx-auto w-full relative z-10 border border-emerald-500/30 p-8 bg-emerald-950/20 backdrop-blur-sm">
          <div className="text-emerald-500 mb-6 uppercase tracking-widest text-xs border-b border-emerald-500/30 pb-4">
            <span className="animate-pulse mr-2">█</span> SYSTEM.BOOT_SEQUENCE
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight uppercase glow-text text-white">
            {headline}_
          </h1>
          <p className="text-lg md:text-xl mb-10 leading-relaxed border-l-2 border-emerald-500 pl-4 text-emerald-400/80">
            {subheadline}
          </p>
          <div className="flex gap-4">
            <a href="#projects" className="bg-emerald-500 text-black px-6 py-3 font-bold uppercase hover:bg-emerald-400 transition">
              [{ctaText}]
            </a>
          </div>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------
  // 3. CREATIVE DIRECTOR (Full Bleed, Overlay, Bold)
  // ---------------------------------------------------------
  if (templateId === 'creative-director') {
    return (
      <section className="relative min-h-[100vh] flex items-center px-6 overflow-hidden bg-black">
        {avatarUrl && (
          <div className="absolute inset-0 z-0">
            <img src={avatarUrl} alt="Background" className="w-full h-full object-cover opacity-50 filter saturate-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>
        )}
        <div className="max-w-7xl mx-auto w-full relative z-10 text-center pt-32 pb-20">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
            <h1 className="font-heading font-black text-6xl md:text-[8rem] text-white leading-none tracking-tighter uppercase mix-blend-overlay">
              {headline}
            </h1>
            <p className="text-white text-xl md:text-3xl mt-8 font-medium max-w-3xl mx-auto">
              {subheadline}
            </p>
            <div className="mt-12">
              <a href="#projects" className="inline-flex items-center gap-4 text-white hover:text-rose-500 transition-colors uppercase tracking-widest font-bold text-lg">
                {ctaText} <ArrowRight className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------
  // 4. INTERACTIVE SHOWCASE (Floating Glass, Glow)
  // ---------------------------------------------------------
  if (templateId === 'interactive-showcase') {
    return (
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-16 px-6 overflow-hidden bg-slate-950">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="glass-card p-12 md:p-20 rounded-[3rem] border border-white/10 text-center shadow-2xl backdrop-blur-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 text-blue-400 text-sm font-semibold mb-8">
              <Sparkles className="w-4 h-4" /> Immersive Digital
            </div>
            <h1 className="font-heading font-black text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-6">
              {headline}
            </h1>
            <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              {subheadline}
            </p>
            <a href="#projects" className="btn-primary px-8 py-4 rounded-2xl font-bold text-white shadow-lg shadow-blue-500/25 hover:scale-105 transition-transform">
              {ctaText}
            </a>
          </div>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------
  // 5. LUXURY MOTION PRO (Serif, Elegant, Cinematic)
  // ---------------------------------------------------------
  if (templateId === 'luxury-motion-pro') {
    return (
      <section className="relative min-h-[100vh] flex items-center pt-32 pb-16 px-6 overflow-hidden bg-[#1a1816]">
        <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }}>
            <h1 className="font-serif italic text-6xl md:text-8xl text-[#d4af37] mb-8 leading-tight">
              {headline}
            </h1>
            <p className="text-[#a8a29e] font-light text-xl md:text-2xl mb-16 max-w-2xl mx-auto tracking-wide">
              {subheadline}
            </p>
          </motion.div>
          {avatarUrl && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, delay: 0.3 }} className="mb-16 flex justify-center">
              <div className="w-64 h-80 md:w-80 md:h-[28rem] overflow-hidden relative border-4 border-[#3f3b36] shadow-2xl">
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover sepia-[0.3]" />
              </div>
            </motion.div>
          )}
          <a href="#projects" className="border-b-2 border-[#d4af37] text-[#d4af37] hover:text-white transition-colors pb-2 uppercase tracking-[0.3em] text-sm font-semibold">
            {ctaText}
          </a>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------
  // 6. FINTECH SAAS PRO (Clean, Dashboard, Enterprise)
  // ---------------------------------------------------------
  if (templateId === 'fintech-saas-pro') {
    return (
      <section className="min-h-[80vh] pt-32 pb-16 px-6 bg-slate-50 border-b border-slate-200 overflow-hidden relative">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-4">Enterprise Product Lead</div>
              <h1 className="font-sans font-extrabold text-5xl md:text-6xl text-slate-900 mb-6 leading-tight tracking-tight">
                {headline}
              </h1>
              <p className="text-slate-600 text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
                {subheadline}
              </p>
              <a href="#projects" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 inline-block">
                {ctaText}
              </a>
            </div>
            {avatarUrl && (
              <div className="flex-1 flex justify-center md:justify-end">
                <div className="w-72 h-72 rounded-full overflow-hidden border-8 border-slate-100 shadow-2xl">
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------
  // 7. AI NEURAL LABS PRO (Dark, Code-like, Node Graph)
  // ---------------------------------------------------------
  if (templateId === 'ai-neural-labs-pro') {
    return (
      <section className="relative min-h-[85vh] flex items-center pt-32 pb-16 px-6 overflow-hidden bg-[#0a0a0f]">
        {/* Fake node graph background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8b5cf6" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <circle cx="20%" cy="30%" r="4" fill="#8b5cf6" />
            <circle cx="40%" cy="70%" r="6" fill="#8b5cf6" />
            <circle cx="80%" cy="40%" r="5" fill="#8b5cf6" />
            <line x1="20%" y1="30%" x2="40%" y2="70%" stroke="#8b5cf6" strokeWidth="1" />
            <line x1="40%" y1="70%" x2="80%" y2="40%" stroke="#8b5cf6" strokeWidth="1" />
          </svg>
        </div>
        <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
          <div className="px-4 py-1.5 rounded-md bg-purple-900/30 border border-purple-500/50 text-purple-400 font-mono text-sm mb-8 inline-block shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            import &#123; Future &#125; from 'ai/models';
          </div>
          <h1 className="font-mono font-bold text-5xl md:text-7xl text-slate-100 mb-6 tracking-tight">
            {headline}
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-3xl font-mono leading-relaxed">
            {subheadline}
          </p>
          <a href="#projects" className="bg-white text-black px-8 py-4 rounded-sm font-mono font-bold hover:bg-slate-200 transition shadow-[4px_4px_0_#8b5cf6]">
            {ctaText}
          </a>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------
  // 8. GLOBAL AGENCY STUDIO (Bold, Split Screen, Type heavy)
  // ---------------------------------------------------------
  if (templateId === 'global-agency-studio') {
    return (
      <section className="min-h-[90vh] flex flex-col md:flex-row bg-slate-900">
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 pt-32 pb-16">
          <h1 className="font-heading font-black text-6xl md:text-8xl text-white mb-6 uppercase leading-[0.9]">
            {headline}
          </h1>
          <p className="text-slate-400 text-xl md:text-2xl font-medium mb-10 max-w-xl">
            {subheadline}
          </p>
          <div>
            <a href="#projects" className="inline-block border-2 border-white text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition">
              {ctaText}
            </a>
          </div>
        </div>
        {avatarUrl && (
          <div className="flex-1 relative min-h-[40vh] md:min-h-full">
            <img src={avatarUrl} alt="Agency" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-900/20 mix-blend-multiply" />
          </div>
        )}
      </section>
    );
  }

  // ---------------------------------------------------------
  // 9. HAUTE COUTURE STUDIO (Fashion, Asymmetric, Minimal)
  // ---------------------------------------------------------
  if (templateId === 'haute-couture-studio') {
    return (
      <section className="min-h-[100vh] pt-24 pb-16 px-6 bg-[#fdfbf7] flex flex-col items-center text-center">
        <h2 className="text-[#be185d] font-serif italic text-2xl mb-4">Studio.</h2>
        <h1 className="font-serif text-6xl md:text-9xl text-slate-900 mb-8 uppercase tracking-widest">
          {headline}
        </h1>
        {avatarUrl && (
          <div className="w-full max-w-4xl h-[40vh] md:h-[60vh] overflow-hidden mb-12">
            <img src={avatarUrl} alt="Couture" className="w-full h-full object-cover object-top" />
          </div>
        )}
        <p className="text-slate-600 font-light text-xl md:text-3xl max-w-3xl mx-auto mb-10 leading-relaxed">
          {subheadline}
        </p>
        <a href="#projects" className="text-slate-900 border-b border-slate-900 pb-1 uppercase tracking-widest font-semibold hover:text-[#be185d] hover:border-[#be185d] transition">
          {ctaText}
        </a>
      </section>
    );
  }

  // ---------------------------------------------------------
  // 10. SPATIAL ARCHITECT STUDIO (Blueprint, Technical, Wide)
  // ---------------------------------------------------------
  if (templateId === 'spatial-architect-studio') {
    return (
      <section className="relative min-h-[90vh] flex items-center px-6 overflow-hidden bg-slate-800 text-slate-200">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-10 left-10 text-[10px] uppercase font-mono text-slate-400 tracking-widest border border-slate-500/30 p-2">
          Project: 001 // Scale: 1:100
        </div>
        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end pb-16 pt-32 border-b border-slate-600">
          <div className="md:col-span-8">
            <h1 className="font-sans font-bold text-5xl md:text-7xl mb-6 uppercase tracking-tight text-white">
              {headline}
            </h1>
            <p className="text-slate-300 text-xl font-light max-w-2xl">
              {subheadline}
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col md:items-end">
            <a href="#projects" className="border border-emerald-500 text-emerald-400 px-6 py-3 text-sm uppercase tracking-widest hover:bg-emerald-500/10 transition">
              {ctaText}
            </a>
          </div>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------
  // FALLBACK (Original Default)
  // ---------------------------------------------------------
  return (
    <section className="relative min-h-[85vh] flex items-center pt-20 pb-16 px-6 overflow-hidden bg-slate-950">
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className={`grid ${gridClass} gap-12 items-center`}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-heading font-black text-5xl md:text-7xl text-white mb-6 leading-[1.1] tracking-tight">
              {headline}
            </h1>
            <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
              {subheadline}
            </p>
            <a href="#projects" className="btn-primary text-white px-8 py-3.5 rounded-xl font-semibold flex items-center gap-2 group w-max">
              {ctaText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
          {avatarUrl && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }} className="relative justify-self-center lg:justify-self-end">
              <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full glass-dark border border-white/[0.08] relative overflow-hidden">
                <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
