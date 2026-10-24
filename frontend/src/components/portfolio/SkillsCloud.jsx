import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

const ICONS = {
  Frontend: '🎨',
  Backend: '⚙️',
  'Database & Cloud': '☁️',
  Design: '✏️',
  Tools: '🔧',
  Languages: '💬'
};

export default function SkillsCloud({ props = {}, viewportMode }) {
  const {
    heading = 'Tools of the Trade',
    subheading = 'Technologies I use daily to turn ideas into products people love.',
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

  const isMobile = viewportMode === 'mobile';
  const isTablet = viewportMode === 'tablet';
  const isSmall = isMobile || isTablet;

  return (
    <section className={`${isSmall ? 'py-12 px-4' : 'py-20 px-6'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className={`text-center ${isSmall ? 'mb-10' : 'mb-16'}`}>
          <div className="badge badge-indigo inline-flex mb-4">
            <Cpu className="w-3 h-3" />
            <span>Tech Stack</span>
          </div>
          <h2 className={`font-heading font-black ${isMobile ? 'text-2xl' : 'text-3xl md:text-5xl'} text-white mb-3`}>{heading}</h2>
          {subheading && <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto">{subheading}</p>}
        </div>

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card gradient-border rounded-3xl p-7"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/[0.06]">
                <span className="text-2xl">{ICONS[cat.name] || '📦'}</span>
                <h3 className="font-heading font-bold text-lg text-white">{cat.name}</h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {cat.skills?.map((skill, sIdx) => (
                  <motion.span
                    key={sIdx}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-xl glass border border-white/[0.07] text-slate-200 text-sm font-medium hover:border-indigo-500/40 hover:text-white hover:bg-indigo-500/[0.06] transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
