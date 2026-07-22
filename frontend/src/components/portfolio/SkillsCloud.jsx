import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

export default function SkillsCloud({ props = {} }) {
  const {
    heading = 'Skills & Technologies',
    categories = [
      {
        name: 'Frontend',
        skills: ['React', 'Next.js', 'Redux Toolkit', 'Tailwind CSS', 'TypeScript', 'HTML5/CSS3']
      },
      {
        name: 'Backend',
        skills: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'Passport.js', 'JWT']
      },
      {
        name: 'Database & Cloud',
        skills: ['MongoDB', 'Mongoose', 'Cloudinary', 'Redis', 'AWS S3', 'Docker']
      }
    ]
  } = props;

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-3">
            <Cpu className="w-4 h-4" />
            <span>Tech Stack & Expertise</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-6 rounded-2xl border border-slate-800"
            >
              <h3 className="text-lg font-bold text-indigo-400 mb-4 pb-2 border-b border-slate-800">
                {cat.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills && cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm font-medium hover:border-indigo-500/40 hover:text-white transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
