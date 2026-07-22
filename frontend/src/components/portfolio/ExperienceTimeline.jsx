import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Building2, ArrowUpRight } from 'lucide-react';

export default function ExperienceTimeline({ props = {} }) {
  const {
    heading = 'Where I\'ve Made an Impact',
    subheading = 'A track record of shipping great work at companies that push boundaries.',
    items = [
      {
        id: 'exp-1',
        role: 'Senior Full Stack Engineer',
        company: 'TechCorp Solutions',
        period: '2023 — Present',
        description: 'Led the architecture of a high-traffic platform serving 2M+ users. Mentored a team of 5 engineers and reduced deployment time by 60%.',
        highlights: ['Platform Architecture', 'Team Leadership', 'CI/CD Pipelines']
      },
      {
        id: 'exp-2',
        role: 'Frontend Developer',
        company: 'Creative Agency Inc',
        period: '2021 — 2023',
        description: 'Designed and shipped responsive web experiences for Fortune 500 clients, achieving a 94% client satisfaction rating across 20+ projects.',
        highlights: ['Client Projects', 'UI/UX Design', 'Performance Optimization']
      }
    ]
  } = props;

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="badge badge-indigo inline-flex mb-4">
            <Briefcase className="w-3 h-3" />
            <span>Experience</span>
          </div>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white mb-3">{heading}</h2>
          {subheading && <p className="text-slate-400 text-base max-w-lg mx-auto">{subheading}</p>}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/30 to-transparent" />

          <div className="space-y-8">
            {items.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative pl-20"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[22px] top-6 z-10">
                  <div className="w-[13px] h-[13px] rounded-full border-[3px] border-indigo-500 bg-slate-950 shadow-lg shadow-indigo-500/30" />
                </div>

                {/* Card */}
                <div className="glass-card gradient-border rounded-2xl p-7 group hover:bg-white/[0.04] transition-all">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-heading font-bold text-xl text-white group-hover:text-indigo-400 transition-colors mb-1">
                        {item.role}
                      </h3>
                      <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{item.company}</span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-white/[0.07] text-xs font-semibold text-slate-400 shrink-0">
                      <Calendar className="w-3 h-3 text-indigo-400" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-5">{item.description}</p>

                  {item.highlights?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.highlights.map((h, i) => (
                        <span key={i} className="px-3 py-1 rounded-lg bg-indigo-500/8 border border-indigo-500/15 text-indigo-300 text-xs font-medium">
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
