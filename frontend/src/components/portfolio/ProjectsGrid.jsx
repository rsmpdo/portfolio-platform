import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, FolderGit2 } from 'lucide-react';

// Reusable Modal
function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black transition z-10">
              <X className="w-4 h-4" />
            </button>
            {project.imageUrl && (
              <div className="h-64 overflow-hidden">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-8">
              <h3 className="font-bold text-2xl text-white mb-4">{project.title}</h3>
              <p className="text-slate-300 leading-relaxed mb-6">{project.description}</p>
              {project.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-slate-300 text-xs font-medium rounded-full">{tag}</span>
                  ))}
                </div>
              )}
              <div className="flex gap-3">
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition">View Live</a>}
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="bg-slate-800 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-slate-700 transition border border-slate-700">Source Code</a>}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ProjectsGrid({ props = {}, templateId, viewportMode }) {
  const {
    heading = 'Work',
    items = []
  } = props;

  const [selectedProject, setSelectedProject] = useState(null);
  const isMobile = viewportMode === 'mobile';

  // ---------------------------------------------------------
  // CYBER & AI (Terminal Grid, Monospace)
  // ---------------------------------------------------------
  if (templateId === 'dark-cyber' || templateId === 'ai-neural-labs-pro') {
    return (
      <section className="py-20 px-6 font-mono border-t border-emerald-500/20 bg-slate-950 text-emerald-500">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl text-emerald-400 mb-12 uppercase tracking-widest border-b border-emerald-500/30 pb-4">
            // {heading}
          </h2>
          <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {items.map((project, idx) => (
              <div key={project.id || idx} className="border border-emerald-500/30 p-6 bg-black hover:border-emerald-400 transition relative group cursor-pointer" onClick={() => setSelectedProject(project)}>
                <div className="absolute top-0 right-0 p-2 text-[10px] text-emerald-500/50 uppercase">Sys.Obj.{idx}</div>
                <h3 className="text-xl text-emerald-400 font-bold mb-3 uppercase tracking-wider">{project.title}</h3>
                <p className="text-emerald-500/70 text-sm mb-6 h-10 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags?.map((tag, i) => (
                    <span key={i} className="text-[10px] text-emerald-500 border border-emerald-500/30 px-2 py-0.5">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </section>
    );
  }

  // ---------------------------------------------------------
  // EDITORIAL & COUTURE (Huge Typography, Minimal borders)
  // ---------------------------------------------------------
  if (templateId === 'minimalist-editorial' || templateId === 'haute-couture-studio') {
    return (
      <section className="py-24 px-6 bg-[#f8f9fa] border-t-2 border-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl md:text-6xl text-black mb-16 uppercase">{heading}</h2>
          <div className="flex flex-col gap-12">
            {items.map((project, idx) => (
              <div key={project.id || idx} className="border-t border-black pt-6 flex flex-col md:flex-row justify-between items-start md:items-center group cursor-pointer" onClick={() => setSelectedProject(project)}>
                <div className="md:w-1/2">
                  <h3 className="font-serif text-3xl md:text-4xl text-black group-hover:italic transition-all">{project.title}</h3>
                </div>
                <div className="md:w-1/3 mt-4 md:mt-0 text-slate-600 font-sans text-sm">
                  <p className="line-clamp-2">{project.description}</p>
                </div>
                <div className="md:w-1/6 mt-4 md:mt-0 flex justify-end">
                  <span className="border border-black px-4 py-2 text-xs uppercase tracking-widest group-hover:bg-black group-hover:text-white transition-colors">View</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </section>
    );
  }

  // ---------------------------------------------------------
  // LUXURY MOTION PRO (Cinematic, Dark, Gold)
  // ---------------------------------------------------------
  if (templateId === 'luxury-motion-pro') {
    return (
      <section className="py-24 px-6 bg-[#0a0908] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="font-serif italic text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#f3e5ab] via-[#d4af37] to-[#aa7c11] drop-shadow-sm tracking-wide mb-6">{heading}</h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
          </div>
          <div className={`grid gap-16 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {items.map((project, idx) => (
              <div key={project.id || idx} className="group cursor-pointer" onClick={() => setSelectedProject(project)}>
                <div className="relative aspect-video overflow-hidden mb-8 shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-[#d4af37]/20 rounded-xl">
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover filter contrast-110 sepia-[0.3] group-hover:sepia-0 transition duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full bg-[#0a0908] flex items-center justify-center text-[#d4af37]/50 font-serif">No Image</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908]/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-700"></div>
                </div>
                <h3 className="text-3xl text-[#f3e5ab] font-serif mb-3 group-hover:text-white transition-colors">{project.title}</h3>
                <p className="text-[#a8a29e] text-base font-light mb-6 line-clamp-2 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags?.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[10px] text-[#d4af37] uppercase tracking-[0.2em] border border-[#d4af37]/30 px-3 py-1.5 rounded-sm">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </section>
    );
  }

  // ---------------------------------------------------------
  // GLOBAL AGENCY STUDIO (Cinematic, Dark Slate)
  // ---------------------------------------------------------
  if (templateId === 'global-agency-studio') {
    return (
      <section className="py-24 px-6 bg-[#1a1816] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif italic text-4xl md:text-5xl text-white tracking-wide mb-4">{heading}</h2>
          </div>
          <div className={`grid gap-12 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {items.map((project, idx) => (
              <div key={project.id || idx} className="group cursor-pointer" onClick={() => setSelectedProject(project)}>
                <div className="relative aspect-video overflow-hidden mb-6 border border-white/10">
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover filter saturate-50 group-hover:saturate-100 transition duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full bg-black flex items-center justify-center text-slate-700 font-serif">No Image</div>
                  )}
                </div>
                <h3 className="text-2xl text-white font-serif mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm font-light mb-4 line-clamp-2">{project.description}</p>
                <div className="flex gap-2">
                  {project.tags?.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[10px] text-slate-300 uppercase tracking-widest border border-slate-600 px-2 py-1">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </section>
    );
  }

  // ---------------------------------------------------------
  // FALLBACK (Default SaaS / Showcase)
  // ---------------------------------------------------------
  return (
    <section id="projects" className="py-20 px-6 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <div className="badge badge-indigo inline-flex mb-4">
            <FolderGit2 className="w-3 h-3" />
            <span>Portfolio</span>
          </div>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white">{heading}</h2>
        </div>
        <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'}`}>
          {items.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="glass-card gradient-border rounded-3xl overflow-hidden group cursor-pointer bg-slate-950"
              onClick={() => setSelectedProject(item)}
            >
              {item.imageUrl && (
                <div className="h-48 overflow-hidden relative">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="glass px-4 py-2 rounded-full text-white text-sm font-semibold">View</span>
                  </div>
                </div>
              )}
              <div className="p-6">
                <h3 className="font-bold text-xl text-white mb-2 group-hover:text-indigo-400 transition-colors">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{item.description}</p>
                {item.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.07] text-slate-400 text-xs">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
