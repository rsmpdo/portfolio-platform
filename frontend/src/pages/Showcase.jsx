import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Sparkles, ExternalLink, Star } from 'lucide-react';

const showcases = [
  {
    name: "Alex Morgan",
    role: "Senior Product Designer",
    handle: "admin_1",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    quote: "Got 3 inbound job offers within 10 days of launching my portfolio here."
  },
  {
    name: "Marcus Vance",
    role: "Full Stack Engineer",
    handle: "demo",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    quote: "The visual editor saved me weeks of coding my site from scratch."
  },
  {
    name: "Elena Rostova",
    role: "Creative Director",
    handle: "sample",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e2?auto=format&fit=crop&w=400&q=80",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    quote: "Clients constantly compliment the smooth micro-animations and typography."
  }
];

export default function Showcase() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-6xl mx-auto w-full">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {showcases.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card gradient-border rounded-3xl overflow-hidden group flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img src={s.cover} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                </div>
                <div className="p-6 relative">
                  <div className="w-16 h-16 rounded-full border-2 border-indigo-500 overflow-hidden absolute -top-8 left-6">
                    <img src={s.avatar} alt={s.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="pt-8">
                    <h3 className="font-heading font-bold text-xl text-white mb-1">{s.name}</h3>
                    <div className="text-xs text-indigo-400 font-semibold mb-4">{s.role}</div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-slate-400 text-xs italic leading-relaxed mb-6">"{s.quote}"</p>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
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
