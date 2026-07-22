import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Sparkles, Layout, Zap, Cloud, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Modern MERN Stack CMS Engine</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-8">
                Build & Customize Your <br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Developer Portfolio
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
                An intuitive, schema-less layout engine allowing developers to drag, customize, and publish unique, high-performance portfolios with Cloudinary CDN integration.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-base shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all flex items-center gap-2"
                >
                  <span>Create Your Portfolio</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/p/admin_1"
                  className="px-8 py-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-base transition"
                >
                  View Sample Portfolio
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-20 px-6 border-t border-slate-800/80 bg-slate-950/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">Engineered for Developers</h2>
              <p className="text-slate-400 mt-3 text-base">Everything you need to showcase your work with high speed and flexibility.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-indigo-500/40 transition">
                <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-400 w-fit mb-6">
                  <Layout className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Dynamic Schema-Less Layouts</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Powered by MongoDB Mixed ODM components. Arrange, reorder, and tweak sections to build a truly bespoke structure.
                </p>
              </div>

              <div className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-indigo-500/40 transition">
                <div className="p-3.5 rounded-2xl bg-purple-500/10 text-purple-400 w-fit mb-6">
                  <Cloud className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Cloudinary CDN Uploads</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Effortlessly stream media assets, images, and videos optimized across global edge nodes for sub-second load times.
                </p>
              </div>

              <div className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-indigo-500/40 transition">
                <div className="p-3.5 rounded-2xl bg-pink-500/10 text-pink-400 w-fit mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Passport JWT Auth & Verification</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Secure email-verified accounts backed by cryptographically signed tokens and state-of-the-art bcrypt password hashing.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
