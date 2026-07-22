import React from 'react';
import { motion } from 'framer-motion';

export default function AboutMe({ props = {} }) {
  const {
    heading = 'The Story Behind the Work',
    bio = 'I believe great design is invisible — it just feels right. With years spent obsessing over the details that separate good from unforgettable, I bring that same obsession to every project I touch. Whether it\'s a product launch, a brand identity, or a complex web platform, my goal is always the same: make it exceptional.',
    skills = ['UI/UX Design', 'Full Stack Dev', 'Brand Identity', 'Motion Design', 'Product Strategy'],
    experienceYears = '5+',
    completedProjects = '40+',
    happyClients = '30+'
  } = props;

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
