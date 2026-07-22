import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Sparkles, ExternalLink, Star, Layers } from 'lucide-react';

const showcases = [
  {
    name: "Alex Morgan",
    role: "Senior Product Designer",
    handle: "admin_1",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    quote: "Got 3 inbound job offers within 10 days of launching my portfolio here.",
    projects: [
      {
        title: "Fintech Mobile Dashboard",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "AI Canvas Creative Engine",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Luxury E-Commerce Site",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80"
      }
    ]
  },
  {
    name: "Marcus Vance",
    role: "Full Stack Engineer",
    handle: "demo",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    quote: "The visual editor saved me weeks of coding my site from scratch.",
    projects: [
      {
        title: "Cloud Infrastructure Portal",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Real-time Chat Protocol",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Developer CLI Analytics",
        image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=500&q=80"
      }
    ]
  },
  {
    name: "Elena Rostova",
    role: "Creative Director",
    handle: "sample",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    quote: "Clients constantly compliment the smooth micro-animations and typography.",
    projects: [
      {
        title: "Global Brand Identity System",
        image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Editorial Design Magazine",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Interactive 3D Art Exhibition",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=500&q=80"
      }
    ]
  }
];

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
            Explore portfolios built by designers, developers, and creators getting hired worldwide.
          </p>
        </div>

        {/* Creator Cards with 3 Projects Inside */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {showcases.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card gradient-border rounded-3xl p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Creator Header with real face portrait image */}
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/[0.06]">
                  <div className="w-12 h-12 rounded-full border-2 border-indigo-500 overflow-hidden flex-shrink-0 bg-slate-900">
                    <img src={s.avatar} alt={s.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white group-hover:text-indigo-400 transition-colors">{s.name}</h3>
                    <div className="text-xs text-indigo-400 font-semibold">{s.role}</div>
                  </div>
                </div>

                {/* 3 Projects Showcase Inside Card */}
                <div className="mb-5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    <span>3 Featured Projects</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {s.projects.map((proj, pIdx) => (
                      <div key={pIdx} className="group/proj relative aspect-square rounded-xl overflow-hidden glass border border-white/10" title={proj.title}>
                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover/proj:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover/proj:opacity-100 transition-opacity flex items-center justify-center p-1 text-center">
                          <span className="text-[10px] text-white font-medium line-clamp-2">{proj.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="mb-6 bg-white/[0.02] p-3.5 rounded-2xl border border-white/[0.04]">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-slate-400 text-xs italic leading-relaxed">"{s.quote}"</p>
                </div>
              </div>

              {/* View Live Portfolio Button */}
              <div>
                <Link
                  to={`/p/${s.handle}`}
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
