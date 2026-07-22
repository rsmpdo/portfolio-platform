import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Github, Linkedin, Twitter, Download } from 'lucide-react';

export default function HeroBanner({ props = {} }) {
  const {
    headline = 'I Design & Build Things People Love to Use',
    subheadline = 'Creative technologist crafting digital experiences that feel like magic — and convert like crazy.',
    ctaText = 'See My Work',
    ctaLink = '#projects',
    avatarUrl = '',
    githubUrl = '',
    linkedinUrl = '',
    twitterUrl = '',
    availableForWork = true,
    resumeUrl = ''
  } = props;

  return (
    <section className="relative min-h-[90vh] flex items-center py-20 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/4 right-1/3 w-[300px] h-[300px] bg-purple-600/8 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16">

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-center lg:text-left"
          >
            {availableForWork && (
              <div className="inline-flex items-center gap-2 badge badge-emerald mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open to Work & Collaborations</span>
              </div>
            )}

            <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-[4.5rem] text-white leading-[1.05] tracking-tight mb-6">
              {headline}
            </h1>

            <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-10 max-w-xl lg:mx-0 mx-auto">
              {subheadline}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href={ctaLink}
                className="group btn-primary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-white font-bold"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl text-slate-300 font-semibold text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </a>
              )}
            </div>

            {/* Social icons */}
            {(githubUrl || linkedinUrl || twitterUrl) && (
              <div className="flex items-center gap-3 mt-8 justify-center lg:justify-start">
                <span className="text-xs text-slate-600 uppercase tracking-widest">Find me on</span>
                <div className="h-px flex-1 max-w-[40px] bg-white/10" />
                <div className="flex items-center gap-2">
                  {githubUrl && (
                    <a href={githubUrl} target="_blank" rel="noreferrer"
                      className="w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {linkedinUrl && (
                    <a href={linkedinUrl} target="_blank" rel="noreferrer"
                      className="w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white transition">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {twitterUrl && (
                    <a href={twitterUrl} target="_blank" rel="noreferrer"
                      className="w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white transition">
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* Avatar Side */}
          {avatarUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative flex-shrink-0 animate-float"
            >
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-indigo-500/30 via-purple-500/20 to-pink-500/10 blur-2xl" />
              <div className="avatar-ring relative w-52 h-52 md:w-72 md:h-72 glow-indigo rounded-full">
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-2 -right-2 glass rounded-2xl px-4 py-2.5 shadow-2xl border border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-white whitespace-nowrap">Available Now</span>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}
