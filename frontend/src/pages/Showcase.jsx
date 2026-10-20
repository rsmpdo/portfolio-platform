import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Sparkles, ExternalLink, Star, Layers, ArrowUpRight } from 'lucide-react';
import { SHOWCASE_CREATORS } from '../data/showcaseData';

export default function Showcase() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-6xl mx-auto w-full">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge badge-indigo inline-flex mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Showcase</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-white mb-6">
            Created with<br />
            <span className="gradient-text">PortfolioCraft</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Explore real-world interactive portfolios & case studies built by designers, developers, and creators getting hired worldwide.
          </p>
        </div>

        {/* Creator Cards with 3 Interactive Projects Inside */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {SHOWCASE_CREATORS.map((s, idx) => (
            <motion.div
              key={s.handle}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card gradient-border rounded-3xl p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Creator Header with real face portrait image */}
                <Link
                  to={`/showcase/${s.handle}`}
                  className="flex items-center gap-3 mb-5 pb-4 border-b border-white/[0.06] hover:opacity-90 transition"
                >
                  <div
                    className="w-12 h-12 rounded-full border-2 overflow-hidden flex-shrink-0 bg-slate-900"
                    style={{ borderColor: s.accentColor || '#6366f1' }}
                  >
                    <img src={s.avatar} alt={s.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading font-bold text-lg text-white group-hover:text-indigo-400 transition-colors truncate">
                      {s.name}
                    </h3>
                    <div className="text-xs text-indigo-400 font-semibold truncate">{s.role}</div>
                  </div>
                </Link>

                {/* 3 Featured Projects Inside Card (Clickable!) */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-400" />
                      <span>3 Featured Projects</span>
                    </div>
                    <span className="text-[10px] text-indigo-400/80 normal-case font-medium">Click to inspect</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {s.projects.map((proj) => (
                      <Link
                        key={proj.id}
                        to={`/showcase/${s.handle}?project=${proj.id}`}
                        className="group/proj relative aspect-square rounded-xl overflow-hidden glass border border-white/10 hover:border-indigo-500/60 transition-all block"
                        title={`View case study: ${proj.title}`}
                      >
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover/proj:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover/proj:opacity-100 transition-opacity flex flex-col items-center justify-center p-1.5 text-center">
                          <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400 mb-0.5 shrink-0" />
                          <span className="text-[10px] text-white font-semibold line-clamp-2 leading-tight">
                            {proj.title}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="mb-6 bg-white/[0.02] p-3.5 rounded-2xl border border-white/[0.04]">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-400 text-xs italic leading-relaxed">"{s.quote}"</p>
                </div>
              </div>

              {/* View Live Portfolio Button */}
              <div>
                <Link
                  to={`/showcase/${s.handle}`}
                  className="btn-primary w-full py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2"
                >
                  <span>View Live Portfolio</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
