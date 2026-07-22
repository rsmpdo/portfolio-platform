import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Sparkles, Users, Target, Heart, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-5xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge badge-indigo inline-flex mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Mission</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-white mb-6">
            Empowering Creators to<br />
            <span className="gradient-text">Stand Out & Get Hired</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            We believe your work deserves a stage that feels as premium as your craft. We built PortfolioCraft so creators spend less time wrangling code and more time winning opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="glass-card gradient-border rounded-3xl p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4 text-indigo-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-lg mb-2">Our Vision</h3>
            <p className="text-slate-400 text-xs leading-relaxed">Democratize Adobe Portfolio-grade web design for every digital creator globally.</p>
          </div>

          <div className="glass-card gradient-border rounded-3xl p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-4 text-purple-400">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-lg mb-2">Global Community</h3>
            <p className="text-slate-400 text-xs leading-relaxed">Over 10,000+ designers, developers, and artists trust our engine.</p>
          </div>

          <div className="glass-card gradient-border rounded-3xl p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mx-auto mb-4 text-pink-400">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-lg mb-2">Craft & Speed</h3>
            <p className="text-slate-400 text-xs leading-relaxed">Built with extreme attention to aesthetic detail, typography, and edge speed.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
