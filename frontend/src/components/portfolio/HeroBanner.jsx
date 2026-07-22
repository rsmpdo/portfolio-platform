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
  const isCyber = templateId === 'dark-cyber' || templateId === 'ai-neural-labs-pro' || templateId === 'fintech-saas-pro';
  const isLuxury = templateId === 'haute-couture-studio' || templateId === 'luxury-motion-pro' || templateId === 'minimalist-editorial' || templateId === 'spatial-architect-studio';

  const gridClass = isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2';

  if (isCyber) {
    return (
      <section className="relative min-h-[85vh] flex items-center pt-20 pb-16 px-6 overflow-hidden font-mono bg-black">
        {/* Cyber grid bg */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className={`grid ${gridClass} gap-12 items-center`}>
            <div>
              <div className="text-emerald-500 mb-6 uppercase tracking-widest text-xs">
                &gt; INITIALIZING_SYSTEM...
              </div>
              <h1 className="text-4xl md:text-6xl text-emerald-400 font-bold mb-6 tracking-tight uppercase">
                {headline}_
              </h1>
              <p className="text-slate-400 text-lg md:text-xl mb-10 leading-relaxed border-l-2 border-emerald-500/50 pl-4">
                {subheadline}
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <a href="#projects" className="bg-emerald-500 text-black px-6 py-3 font-bold uppercase tracking-wider hover:bg-emerald-400 transition">
                  [{ctaText}]
                </a>
                {(githubUrl || linkedinUrl) && (
                  <div className="flex gap-4 items-center">
                    {githubUrl && <a href={githubUrl} target="_blank" rel="noreferrer" className="text-emerald-500 hover:text-emerald-400 border border-emerald-500/30 p-3"><Github className="w-5 h-5" /></a>}
                    {linkedinUrl && <a href={linkedinUrl} target="_blank" rel="noreferrer" className="text-emerald-500 hover:text-emerald-400 border border-emerald-500/30 p-3"><Linkedin className="w-5 h-5" /></a>}
                  </div>
                )}
              </div>
            </div>
            {avatarUrl && (
              <div className="relative justify-self-center lg:justify-self-end">
                <div className="w-64 h-64 md:w-80 md:h-80 border-4 border-emerald-500/30 p-2 bg-emerald-950/20 relative">
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-emerald-500"></div>
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-emerald-500"></div>
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition duration-500" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (isLuxury) {
    return (
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-display font-medium text-5xl md:text-7xl text-white mb-6 leading-tight">
              {headline}
            </h1>
            <p className="text-slate-300 font-light text-xl md:text-2xl mb-12 max-w-2xl mx-auto">
              {subheadline}
            </p>
          </motion.div>

          {avatarUrl && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="mb-12 flex justify-center">
              <div className="w-48 h-64 md:w-64 md:h-80 overflow-hidden relative border border-white/10">
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }} className="flex justify-center items-center gap-6">
            <a href="#projects" className="border-b border-white text-white hover:text-slate-300 hover:border-slate-300 transition px-2 py-1 uppercase tracking-widest text-sm">
              {ctaText}
            </a>
            {(githubUrl || linkedinUrl) && (
              <div className="flex gap-4">
                {githubUrl && <a href={githubUrl} target="_blank" rel="noreferrer" className="text-white hover:text-slate-400"><Github className="w-5 h-5" /></a>}
                {linkedinUrl && <a href={linkedinUrl} target="_blank" rel="noreferrer" className="text-white hover:text-slate-400"><Linkedin className="w-5 h-5" /></a>}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[85vh] flex items-center pt-20 pb-16 px-6 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className={`grid ${gridClass} gap-12 items-center`}>
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Open to Work & Collaborations
            </div>
            
            <h1 className="font-heading font-black text-5xl md:text-7xl text-white mb-6 leading-[1.1] tracking-tight">
              {headline}
            </h1>
            
            <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
              {subheadline}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a href="#projects" className="btn-primary text-white px-8 py-3.5 rounded-xl font-semibold flex items-center gap-2 group">
                {ctaText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              
              {(githubUrl || linkedinUrl) && (
                <div className="flex items-center gap-2 ml-2">
                  {githubUrl && (
                    <a href={githubUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl glass flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {linkedinUrl && (
                    <a href={linkedinUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl glass flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className={`relative justify-self-center ${isMobile ? '' : 'lg:justify-self-end'}`}
          >
            <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full glass-dark border border-white/[0.08] relative p-4 flex items-center justify-center">
              {/* Spinning border effect */}
              <div className="absolute inset-0 rounded-full border border-dashed border-indigo-500/30 animate-[spin_20s_linear_infinite]" />
              
              {/* Image Container */}
              <div className="w-full h-full rounded-full overflow-hidden relative z-10 bg-slate-900 flex items-center justify-center">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <MonitorPlay className="w-12 h-12 text-slate-700" />
                )}
              </div>

              {/* Floating Badge */}
              <div className="absolute bottom-6 right-6 z-20 glass px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2 shadow-2xl animate-float">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-white text-sm font-semibold">Available Now</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
