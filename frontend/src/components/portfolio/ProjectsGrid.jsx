import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ChevronLeft, ChevronRight, FolderGit2 } from 'lucide-react';

function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3 }}
          className="glass gradient-border rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          {project.imageUrl && (
            <div className="h-64 overflow-hidden">
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-heading font-bold text-2xl text-white">{project.title}</h3>
              <button onClick={onClose} className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white transition">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">{project.description}</p>
            {project.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium">{tag}</span>
                ))}
              </div>
            )}
            <div className="flex gap-3">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer"
                  className="btn-ghost inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-300 text-sm font-semibold">
                  <Github className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer"
                  className="btn-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold">
                  <span>View Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProjectsGrid({ props = {} }) {
  const {
    heading = 'Work That Speaks for Itself',
    subheading = 'A curated selection of projects that solve real problems and create real impact.',
    viewMode = 'grid',
    items = [
      {
        id: 'p1',
        title: 'Portfolio Platform',
        description: 'A beautiful, customizable portfolio engine that\'s helped hundreds of creators land their dream roles.',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
        tags: ['Full Stack', 'React', 'Node.js', 'MongoDB'],
        githubUrl: 'https://github.com/rsmpdo/portfolio-platform',
        liveUrl: 'https://portfolio-platform-pearl.vercel.app'
      },
      {
        id: 'p2',
        title: 'Analytics Dashboard',
        description: 'Real-time business intelligence made beautiful — complex data made simple for decision makers.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        tags: ['React', 'TypeScript', 'Data Viz'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com'
      }
    ]
  } = props;

  const [selectedProject, setSelectedProject] = useState(null);
  const [layout, setLayout] = useState(viewMode);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="badge badge-indigo inline-flex mb-4">
              <FolderGit2 className="w-3 h-3" />
              <span>Selected Work</span>
            </div>
            <h2 className="font-heading font-black text-3xl md:text-5xl text-white">{heading}</h2>
            {subheading && <p className="text-slate-400 mt-3 text-base max-w-lg">{subheading}</p>}
          </div>
          {/* View toggle */}
          <div className="flex items-center gap-1 glass p-1 rounded-xl">
            <button
              onClick={() => setLayout('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${layout === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >Grid</button>
            <button
              onClick={() => setLayout('masonry')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${layout === 'masonry' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >Masonry</button>
          </div>
        </div>

        {/* Grid */}
        <div className={layout === 'masonry' ? 'masonry-grid' : 'grid grid-cols-1 md:grid-cols-2 gap-8'}>
          {items.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card gradient-border rounded-3xl overflow-hidden group cursor-pointer"
              onClick={() => setSelectedProject(item)}
            >
              {item.imageUrl && (
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="glass px-4 py-2 rounded-full text-white text-sm font-semibold">View Project</span>
                  </div>
                </div>
              )}
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                  {item.description}
                </p>
                {item.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.07] text-slate-400 text-xs">{tag}</span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  {item.githubUrl && (
                    <a href={item.githubUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition">
                      <Github className="w-3.5 h-3.5" /><span>Code</span>
                    </a>
                  )}
                  {item.liveUrl && (
                    <a href={item.liveUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 ml-auto transition">
                      <span>Live Demo</span><ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
