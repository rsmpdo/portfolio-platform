import React from 'react';
import { motion } from 'framer-motion';

export default function AboutMe({ props = {}, templateId, viewportMode }) {
  const {
    heading = 'The Story Behind the Work',
    bio = 'I believe great design is invisible — it just feels right. With years spent obsessing over the details that separate good from unforgettable, I bring that same obsession to every project I touch. Whether it\'s a product launch, a brand identity, or a complex web platform, my goal is always the same: make it exceptional.',
    skills = ['UI/UX Design', 'Full Stack Dev', 'Brand Identity', 'Motion Design', 'Product Strategy'],
    experienceYears = '5+',
    completedProjects = '40+',
    happyClients = '30+'
  } = props;

  const isMobile = viewportMode === 'mobile';
  const isCyber = templateId === 'dark-cyber' || templateId === 'ai-neural-labs-pro' || templateId === 'fintech-saas-pro';
  const isLuxury = templateId === 'haute-couture-studio' || templateId === 'luxury-motion-pro' || templateId === 'minimalist-editorial' || templateId === 'spatial-architect-studio';

  const gridClass = isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2';

  if (isLuxury) {
    return (
      <section className="py-24 px-6 border-y border-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-8 tracking-wide font-medium">{heading}</h2>
          <p className="text-slate-300 font-light text-xl leading-loose mb-12">
            {bio}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, i) => (
              <span key={i} className="px-5 py-2.5 rounded-full border border-white/10 text-slate-300 text-sm tracking-widest uppercase hover:bg-white/5 transition">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isCyber) {
    return (
      <section className="py-20 px-6 font-mono">
        <div className="max-w-6xl mx-auto">
          <div className={`grid gap-12 ${gridClass}`}>
            <div className="p-8 border border-emerald-500/30 bg-emerald-950/10 rounded-none relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-2 bg-emerald-500"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500"></div>
              <h2 className="text-2xl md:text-3xl text-emerald-400 mb-6 uppercase tracking-widest">
                &gt; {heading}_
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                {bio}
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs">
                    [{skill}]
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[ 
                { v: experienceYears, l: 'YEARS_EXP' },
                { v: completedProjects, l: 'PROJECTS_DONE' },
                { v: happyClients, l: 'CLIENTS' }
              ].map((stat, i) => (
                <div key={i} className="border border-white/10 p-6 flex flex-col items-start justify-center hover:border-emerald-500/50 transition">
                  <div className="text-3xl text-white mb-2">{stat.v}</div>
                  <div className="text-[10px] text-emerald-500 uppercase tracking-widest">{stat.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`grid gap-16 items-center ${gridClass}`}>
          {/* Left — Story */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="badge badge-indigo inline-flex mb-6">About</div>
            <h2 className="font-heading font-black text-4xl md:text-5xl text-white leading-tight mb-6">
              {heading}
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              {bio}
            </p>

            {/* Skill tags */}
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">What I Do</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-4 py-2 rounded-xl glass border border-white/[0.07] text-slate-200 text-sm font-medium hover:border-indigo-500/40 hover:text-white transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Stats */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-1 gap-4"
          >
            {[
              { value: experienceYears, label: 'Years of Experience', sub: 'Turning complex problems into elegant solutions' },
              { value: completedProjects, label: 'Projects Delivered', sub: 'From startups to Fortune 500 companies' },
              { value: happyClients, label: 'Happy Clients', sub: 'People who came back for more' }
            ].map((stat, i) => (
              <div key={i} className="glass-card gradient-border rounded-2xl p-6 flex items-center gap-6">
                <div className="font-heading font-black text-5xl gradient-text flex-shrink-0">
                  {stat.value}
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">{stat.label}</div>
                  <div className="text-sm text-slate-500">{stat.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
