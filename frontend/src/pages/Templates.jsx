import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Sparkles, Eye, ArrowRight, LayoutTemplate, Lock, Crown, ShieldCheck, Check } from 'lucide-react';

const templates = [
  {
    id: "minimalist-editorial",
    name: "Minimalist Editorial",
    category: "Product & UI Designers",
    planAccess: "free",
    description: "Clean typography, ample whitespace, and focused grid case studies designed for senior designers.",
    previewImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    tags: ["Editorial", "Whitespace", "Minimalist"],
    badge: "Popular"
  },
  {
    id: "dark-cyber",
    name: "Dark Mode Cyber",
    category: "Full Stack Developers",
    planAccess: "free",
    description: "Sleek dark aesthetics, glow effects, live terminal badges, and tech stack showcases.",
    previewImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    tags: ["Dark Mode", "Developer", "Glow Effects"],
    badge: "Featured"
  },
  {
    id: "creative-director",
    name: "Creative Director",
    category: "Agencies & Directors",
    planAccess: "free",
    description: "Bold full-bleed visuals, masonry galleries, and client testimonial sliders for creative studios.",
    previewImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    tags: ["Agency", "Masonry", "Bold Visuals"],
    badge: "Trending"
  },
  {
    id: "interactive-showcase",
    name: "Interactive Showcase",
    category: "3D & Motion Artists",
    planAccess: "free",
    description: "High-impact video modal popups, lightbox galleries, and experience timelines.",
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    tags: ["Motion", "Lightbox", "Video"],
    badge: "New"
  },
  {
    id: "luxury-motion-pro",
    name: "Luxury Motion & Prototype",
    category: "Senior UI/UX Leads",
    planAccess: "pro",
    description: "High-resolution prototype embeds, interactive micro-interaction sliders, and video case studies.",
    previewImage: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
    tags: ["Interactive", "PRO Exclusive", "Figma Embeds"],
    badge: "PRO Exclusive ⭐"
  },
  {
    id: "fintech-saas-pro",
    name: "Fintech & SaaS Product Lead",
    category: "Product Managers & Engineers",
    planAccess: "pro",
    description: "Structured metric scorecards, ARR conversion charts, and enterprise architecture timelines.",
    previewImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    tags: ["Metrics", "PRO Exclusive", "SaaS Dashboards"],
    badge: "PRO Exclusive ⭐"
  },
  {
    id: "ai-neural-labs-pro",
    name: "AI Engineer & Neural Labs",
    category: "AI & Data Scientists",
    planAccess: "pro",
    description: "Dark matrix aesthetics, mathematical LaTeX rendering, model accuracy graphs, and PyTorch showcases.",
    previewImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    tags: ["AI/ML", "PRO Exclusive", "Data Science"],
    badge: "PRO Exclusive ⭐"
  },
  {
    id: "global-agency-studio",
    name: "Global Agency & Design Studio",
    category: "Agencies & Studios",
    planAccess: "studio",
    description: "Multi-portfolio switcher, white-label footer, custom CSS injection, and team member showcases.",
    previewImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    tags: ["Multi-Team", "STUDIO Exclusive 👑", "White Label"],
    badge: "STUDIO Exclusive 👑"
  },
  {
    id: "haute-couture-studio",
    name: "Haute Couture & Photography",
    category: "Fashion & Photographers",
    planAccess: "studio",
    description: "Ultra high-definition full-screen masonry lightboxes, client portal access, and raw photo galleries.",
    previewImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    tags: ["Full HD", "STUDIO Exclusive 👑", "Masonry Gallery"],
    badge: "STUDIO Exclusive 👑"
  },
  {
    id: "spatial-architect-studio",
    name: "Architectural & Spatial Experience",
    category: "Architects & 3D Designers",
    planAccess: "studio",
    description: "3D CAD model viewer, spatial floorplan lightboxes, and client project management integrations.",
    previewImage: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80",
    tags: ["3D Spatial", "STUDIO Exclusive 👑", "CAD Viewer"],
    badge: "STUDIO Exclusive 👑"
  }
];

const categories = ["All Templates", "Free Templates", "PRO Exclusive ⭐", "STUDIO Exclusive 👑"];

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState("All Templates");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const currentPlan = user?.plan || 'free';

  const filtered = templates.filter((t) => {
    if (selectedCategory === "Free Templates") return t.planAccess === "free";
    if (selectedCategory === "PRO Exclusive ⭐") return t.planAccess === "pro";
    if (selectedCategory === "STUDIO Exclusive 👑") return t.planAccess === "studio";
    return true;
  });

  const handleUseTemplate = (t) => {
    if (!user) {
      navigate('/register?redirect=templates');
      return;
    }

    if (t.planAccess === 'pro' && currentPlan === 'free') {
      navigate('/pricing?checkout=pro');
      return;
    }

    if (t.planAccess === 'studio' && (currentPlan === 'free' || currentPlan === 'pro')) {
      navigate('/pricing?checkout=studio');
      return;
    }

    navigate(`/editor?template=${t.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="badge badge-indigo inline-flex mb-4">
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span>10 Adobe Portfolio-Grade Templates</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-white mb-6">
            Choose Your Starting<br />
            <span className="gradient-text">Masterpiece</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Select from 10 handcrafted templates. Free, Pro, and Studio exclusive themes built for developers, designers, agencies, and creators.
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
          {filtered.map((t, idx) => {
            const isRestricted = (t.planAccess === 'pro' && currentPlan === 'free') ||
                                 (t.planAccess === 'studio' && (currentPlan === 'free' || currentPlan === 'pro'));

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className={`glass-card gradient-border rounded-3xl overflow-hidden flex flex-col justify-between group ${
                  t.planAccess === 'studio' ? 'border-emerald-500/40' : t.planAccess === 'pro' ? 'border-amber-500/40' : ''
                }`}
              >
                <div>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={t.previewImage}
                      alt={t.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-xl backdrop-blur-md ${
                        t.planAccess === 'studio' ? 'bg-emerald-950/90 text-emerald-400 border border-emerald-500/40' :
                        t.planAccess === 'pro' ? 'bg-amber-950/90 text-amber-400 border border-amber-500/40' :
                        'bg-slate-950/90 text-indigo-400 border border-indigo-500/40'
                      }`}>
                        {t.badge}
                      </span>
                    </div>

                    {isRestricted && (
                      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-6 text-center">
                        <div className="glass p-4 rounded-2xl border border-white/10 max-w-xs">
                          <Lock className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                          <div className="font-bold text-white text-sm mb-1">
                            {t.planAccess.toUpperCase()} Plan Required
                          </div>
                          <p className="text-slate-400 text-xs mb-3">Upgrade your account to unlock this high-end template.</p>
                          <button
                            onClick={() => handleUseTemplate(t)}
                            className="btn-primary w-full py-2 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1.5"
                          >
                            <span>Upgrade Plan</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
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
                    to={`/preview/${t.id}`}
                    className="btn-ghost flex-1 py-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview Demo</span>
                  </Link>
                  <button
                    onClick={() => handleUseTemplate(t)}
                    className="btn-primary flex-1 py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2"
                  >
                    <span>{isRestricted ? `Unlock ${t.planAccess.toUpperCase()}` : 'Use Template'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
