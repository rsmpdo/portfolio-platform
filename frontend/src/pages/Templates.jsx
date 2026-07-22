import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Sparkles, Eye, ArrowRight, LayoutTemplate, CheckCircle2 } from 'lucide-react';

const templates = [
  {
    id: "minimalist-editorial",
    name: "Minimalist Editorial",
    category: "Product & UI Designers",
    description: "Clean typography, ample whitespace, and focused grid case studies designed for senior designers.",
    previewImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    tags: ["Editorial", "Whitespace", "Minimalist"],
    badge: "Popular"
  },
  {
    id: "dark-cyber",
    name: "Dark Mode Cyber",
    category: "Full Stack Developers",
    description: "Sleek dark aesthetics, glow effects, live terminal badges, and tech stack showcases.",
    previewImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    tags: ["Dark Mode", "Developer", "Glow Effects"],
    badge: "Featured"
  },
  {
    id: "creative-director",
    name: "Creative Director",
    category: "Agencies & Directors",
    description: "Bold full-bleed visuals, masonry galleries, and client testimonial sliders for creative studios.",
    previewImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    tags: ["Agency", "Masonry", "Bold Visuals"],
    badge: "Trending"
  },
  {
    id: "interactive-showcase",
    name: "Interactive Showcase",
    category: "3D & Motion Artists",
    description: "High-impact video modal popups, lightbox galleries, and experience timelines.",
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    tags: ["Motion", "Lightbox", "Video"],
    badge: "New"
  }
];

const categories = ["All Templates", "Product & UI Designers", "Full Stack Developers", "Agencies & Directors", "3D & Motion Artists"];

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState("All Templates");
  const navigate = useNavigate();

  const filtered = selectedCategory === "All Templates" 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="badge badge-indigo inline-flex mb-4">
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span>Adobe Portfolio-Grade Templates</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-white mb-6">
            Choose Your Starting<br />
            <span className="gradient-text">Masterpiece</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Every template is fully customizable. Swap components, reorder sections, adjust colors, and make it uniquely yours.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'btn-primary text-white'
                  : 'glass text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {filtered.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card gradient-border rounded-3xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={t.previewImage}
                    alt={t.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 badge badge-indigo">
                    <span>{t.badge}</span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">{t.category}</div>
                  <h3 className="font-heading font-bold text-2xl text-white mb-3">{t.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{t.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {t.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg glass text-slate-300 text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 pt-0 flex gap-3">
                <Link
                  to="/p/admin_1"
                  className="btn-ghost flex-1 py-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview Demo</span>
                </Link>
                <button
                  onClick={() => navigate('/register')}
                  className="btn-primary flex-1 py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2"
                >
                  <span>Use Template</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
