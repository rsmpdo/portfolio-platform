import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Building2 } from 'lucide-react';

export default function ExperienceTimeline({ props = {} }) {
  const {
    heading = 'Work Experience',
    items = [
      {
        id: 'exp-1',
        role: 'Senior Full Stack Engineer',
        company: 'TechCorp Solutions',
        period: '2023 - Present',
        description: 'Architected high-throughput microservices using Node.js, Express, and MongoDB. Led frontend team building React web apps.'
      },
      {
        id: 'exp-2',
        role: 'Frontend Developer',
        company: 'Creative Agency Inc',
        period: '2021 - 2023',
        description: 'Designed and deployed responsive web interfaces with React, Tailwind CSS, and Framer Motion for global enterprise clients.'
      }
    ]
  } = props;

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-12 justify-center">
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400">
            <Briefcase className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">{heading}</h2>
        </div>

        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-32 space-y-12">
          {items.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-10"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center text-indigo-400 shadow-md">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
              </div>

              {/* Period Pill for Large Screens */}
              <div className="hidden md:block absolute -left-36 top-1.5 text-xs font-semibold text-slate-400 text-right w-28">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
                  <Calendar className="w-3 h-3 text-indigo-400" />
                  <span>{item.period}</span>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white">{item.role}</h3>
                  <div className="md:hidden inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400">
                    <Calendar className="w-3 h-3 text-indigo-400" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 text-indigo-400 text-sm font-medium mb-4">
                  <Building2 className="w-4 h-4" />
                  <span>{item.company}</span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
