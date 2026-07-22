import React from 'react';
import { motion } from 'framer-motion';
import { User, Code2, Award } from 'lucide-react';

export default function AboutMe({ props = {} }) {
  const {
    heading = 'About Me',
    bio = 'I am a passionate software engineer specializing in scalable full-stack applications, cloud architecture, and intuitive user experiences.',
    skills = ['React', 'Node.js', 'TypeScript', 'MongoDB', 'GraphQL', 'Docker', 'AWS'],
    experienceYears = '5+',
    completedProjects = '30+'
  } = props;

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400">
              <User className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-white">{heading}</h2>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            {bio}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-4">
              <Code2 className="w-8 h-8 text-indigo-400" />
              <div>
                <div className="text-2xl font-bold text-white">{experienceYears}</div>
                <div className="text-sm text-slate-400">Years Experience</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-4">
              <Award className="w-8 h-8 text-purple-400" />
              <div>
                <div className="text-2xl font-bold text-white">{completedProjects}</div>
                <div className="text-sm text-slate-400">Projects Shipped</div>
              </div>
            </div>
          </div>

          {skills && skills.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Core Stack</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3.5 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
