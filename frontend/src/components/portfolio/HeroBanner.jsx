import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Github, Linkedin, Twitter } from 'lucide-react';

export default function HeroBanner({ props = {} }) {
  const {
    headline = 'Hi, I\'m Alex Morgan',
    subheadline = 'Full Stack Engineer & UI Architect',
    ctaText = 'View My Work',
    ctaLink = '#projects',
    avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
    githubUrl = 'https://github.com',
    linkedinUrl = 'https://linkedin.com',
    twitterUrl = 'https://twitter.com'
  } = props;

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Dynamic Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Available for Hire & Projects</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              {headline}
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl font-normal leading-relaxed">
              {subheadline}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <a
                href={ctaLink}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="flex items-center gap-3 ml-2">
                {githubUrl && (
                  <a href={githubUrl} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {linkedinUrl && (
                  <a href={linkedinUrl} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {twitterUrl && (
                  <a href={twitterUrl} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition">
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {avatarUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-2xl">
                <img
                  src={avatarUrl}
                  alt="Profile Avatar"
                  className="w-full h-full object-cover rounded-full bg-slate-900"
                />
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}
