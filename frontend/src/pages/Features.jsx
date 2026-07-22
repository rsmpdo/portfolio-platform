import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Sparkles, MousePointer2, Upload, ShieldCheck, Zap, Palette, Globe, Smartphone, BarChart3, ArrowRight } from 'lucide-react';

const featureCategories = [
  {
    title: "Visual CMS Editor",
    icon: MousePointer2,
    desc: "Drag, drop, reorder, and customize every section in real time. Zero code needed.",
    details: ["Real-time live preview", "Responsive viewport switcher (Desktop, Tablet, Mobile)", "Reorderable section hierarchy"]
  },
  {
    title: "Cloudinary CDN Media Uploads",
    icon: Upload,
    desc: "Upload project screenshots, high-res designs, and videos directly with automated Cloudinary optimization.",
    details: ["Instant asset optimization", "Video & image support", "Fast global CDN delivery"]
  },
  {
    title: "Curated Designer Themes",
    icon: Palette,
    desc: "Crafted by design experts. Choose from sleek dark modes, glassmorphic themes, and custom HSL color pickers.",
    details: ["Dark & Light mode support", "Custom primary & secondary color pickers", "Pre-built typography pairings"]
  },
  {
    title: "Custom Slugs & Instant Publishing",
    icon: Globe,
    desc: "Publish to your unique custom URL (`/p/username`) in a single click with fast serverless edge delivery.",
    details: ["Clean SEO-friendly URLs", "Instant updates with zero downtime", "Passkey & JWT authentication"]
  },
  {
    title: "100% Mobile Responsive",
    icon: Smartphone,
    desc: "Every component is engineered to look flawless across all screen sizes, from 4K monitors to smartphones.",
    details: ["Fluid typography scaling", "Touch-friendly carousel navigation", "Optimized mobile layouts"]
  },
  {
    title: "High Conversion Copy & Structure",
    icon: BarChart3,
    desc: "Structured sections designed specifically to convert portfolio visitors into interview requests and high-paying clients.",
    details: ["Call-to-action sections", "Client testimonial carousels", "Structured experience timelines"]
  }
];

export default function Features() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-6xl mx-auto w-full">
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="badge badge-indigo inline-flex mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Platform Features</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-white mb-6">
            Built for Creators Who<br />
            <span className="gradient-text">Demand Perfection</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Everything you need to showcase your work, attract premier clients, and land top-tier opportunities — all in one powerful platform.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {featureCategories.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="glass-card gradient-border rounded-3xl p-8 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{item.desc}</p>
              </div>
              <ul className="space-y-2 border-t border-white/[0.06] pt-4">
                {item.details.map((detail, dIdx) => (
                  <li key={dIdx} className="text-xs text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="glass gradient-border rounded-[2rem] p-12 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-heading font-black text-3xl md:text-4xl text-white mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="text-slate-400 text-base mb-8">
              Start building your portfolio for free in less than 5 minutes. No credit card required.
            </p>
            <Link
              to="/register"
              className="btn-primary inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-white font-bold text-base"
            >
              <span>Build Free Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
