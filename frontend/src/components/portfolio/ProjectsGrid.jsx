import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, FolderGit2 } from 'lucide-react';

export default function ProjectsGrid({ props = {} }) {
  const {
    heading = 'Featured Projects',
    subheading = 'Here are a few selected applications and open source projects I have built.',
    items = [
      {
        id: 'p1',
        title: 'Portfolio Platform',
        description: 'Dynamic schema-less MERN stack platform featuring custom layouts, Passport JWT, and Cloudinary media uploads.',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
        tags: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
        githubUrl: 'https://github.com/rsmpdo/portfolio-platform',
        liveUrl: 'https://portfolio-platform.dev'
      },
      {
        id: 'p2',
        title: 'AI Code Assistant Dashboard',
        description: 'Interactive analytics dashboard for real-time monitoring of AI code suggestions and system metrics.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        tags: ['TypeScript', 'Next.js', 'Redux', 'Chart.js'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com'
      }
    ]
  } = props;

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            <FolderGit2 className="w-4 h-4" />
            <span>Portfolio Showcase</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">{heading}</h2>
          {subheading && <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">{subheading}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden group border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              {item.imageUrl && (
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                </div>
              )}

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80">
                  {item.githubUrl && (
                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition"
                    >
                      <Github className="w-4 h-4" />
                      <span>Repository</span>
                    </a>
                  )}
                  {item.liveUrl && (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 ml-auto transition"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
