import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Sparkles, BookOpen, Clock, ArrowRight, X, User, Calendar, CheckCircle2 } from 'lucide-react';

const posts = [
  {
    id: "product-design-structure",
    title: "How to Structure a Product Design Portfolio That Gets You Hired at Tech Unicorns",
    category: "Career & Portfolio",
    date: "July 20, 2026",
    author: "Alex Morgan",
    authorRole: "Staff Designer & Mentor",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    excerpt: "Learn the exact section hierarchy and case study layout hiring managers look for in top 1% candidates.",
    content: [
      {
        heading: "1. The 5-Second Impression Rule",
        text: "Hiring managers and Design Directors evaluate dozens of portfolios every day. If your hero section doesn't clearly articulate your role, your focus area, and your level of craft within 5 seconds, you risk losing their attention immediately."
      },
      {
        heading: "2. Structuring Case Studies for Maximum Retention",
        text: "Avoid dumping 30 screenshots into a single page. Instead, structure your case studies around problem statement, research insight, iteration trade-offs, and measurable impact (e.g., '+34% user retention'). Focus on decision-making, not just final mockups."
      },
      {
        heading: "3. The Optimal Section Hierarchy",
        text: "Top portfolios follow a proven narrative flow: (1) High-Impact Hero Banner, (2) Selected Projects Grid with Tags & Impact, (3) Story/Bio & Core Competencies, (4) Social Proof & Client Praise, (5) Frictionless Contact Call-to-Action."
      }
    ],
    takeaways: [
      "Keep your hero section concise, outcome-driven, and uncluttered.",
      "Highlight metrics alongside visual artifacts in every case study.",
      "Provide clear links to live demos and GitHub repositories."
    ]
  },
  {
    id: "copywriting-mistakes",
    title: "10 Portfolio Copywriting Mistakes That Are Costing You Inbound Clients",
    category: "Copywriting & Sales",
    date: "July 18, 2026",
    author: "Marcus Vance",
    authorRole: "Full Stack Engineer & Tech Lead",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    excerpt: "Stop listing frameworks and start telling stories that turn casual visitors into high-paying clients.",
    content: [
      {
        heading: "1. Feature Dumping vs. Value Positioning",
        text: "Listing 'HTML, CSS, JavaScript, Node.js' tells a potential client what tools you use, but it doesn't explain what business problems you solve. Frame your skills around outcome: 'I engineer fast, scalable web apps that drive revenue.'"
      },
      {
        heading: "2. The Vague Bio Syndrome",
        text: "Phrases like 'Passionate technologist eager for opportunities' sound generic. Instead, be specific: 'Senior Full Stack Engineer with 6+ years specializing in real-time Node.js architecture and React design systems.'"
      },
      {
        heading: "3. Missing Direct Call-to-Actions",
        text: "Every section of your portfolio should lead to a clear next step. Include a friction-free contact form and response time expectation ('Responds within 24 hours')."
      }
    ],
    takeaways: [
      "Speak directly to client business outcomes, not just internal tooling.",
      "Be specific about your years of experience and domain expertise.",
      "Always provide an unambiguous CTA at the bottom of every page."
    ]
  },
  {
    id: "dark-mode-glassmorphism",
    title: "Why Modern Dark Mode & Glassmorphism Win Attention in 2026",
    category: "Visual Design & CSS",
    date: "June 30, 2026",
    author: "Elena Rostova",
    authorRole: "Creative Director & Brand Strategist",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    excerpt: "Deep dive into visual aesthetics, contrast ratios, and modern CSS tokens for high-impact web portfolios.",
    content: [
      {
        heading: "1. The Psychology of Dark Interfaces",
        text: "Dark mode reduces visual noise, draws immediate focus to vibrant product screenshots, and signals a premium, modern aesthetic when paired with curated typography and ambient lighting."
      },
      {
        heading: "2. Master Backdrop-Filter Glassmorphism",
        text: "Using `backdrop-filter: blur(20px)` paired with subtle 1px semi-transparent borders creates visual depth without cluttering the user interface."
      },
      {
        heading: "3. Micro-Animations That Delight",
        text: "Subtle hover transforms, glow effects, and spring-based transitions elevate a portfolio from static document to dynamic interactive masterpiece."
      }
    ],
    takeaways: [
      "Use high contrast ratios (#f1f5f9 text on #080c14 background).",
      "Pair backdrop-filter blur with subtle linear gradient borders.",
      "Keep animations performant by transforming opacity and scale."
    ]
  }
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-6xl mx-auto w-full">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge badge-indigo inline-flex mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Insights & Strategy</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-white mb-6">
            The PortfolioCraft<br />
            <span className="gradient-text">Blog & Guides</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Actionable advice on portfolio design, personal branding, and winning client work. Click any post to read in full.
          </p>
        </div>

        {/* 3 Full Readable Articles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card gradient-border rounded-3xl overflow-hidden flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 badge badge-indigo">
                    <span>{post.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{post.date}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white mb-3 group-hover:text-indigo-400 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-6">{post.excerpt}</p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPost(post);
                  }}
                  className="btn-primary w-full py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Full Interactive Article Reader Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 overflow-y-auto"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="glass gradient-border rounded-3xl max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto p-6 md:p-10 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 p-2 rounded-xl glass text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Category & Date */}
              <div className="flex items-center gap-3 mb-4">
                <span className="badge badge-indigo">{selectedPost.category}</span>
                <span className="text-xs text-slate-500">{selectedPost.date}</span>
                <span className="text-xs text-slate-500">• {selectedPost.readTime}</span>
              </div>

              {/* Title */}
              <h2 className="font-heading font-black text-2xl md:text-4xl text-white leading-tight mb-6">
                {selectedPost.title}
              </h2>

              {/* Author Header */}
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/[0.06]">
                <img
                  src={selectedPost.authorAvatar}
                  alt={selectedPost.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
                />
                <div>
                  <div className="font-bold text-white text-sm">{selectedPost.author}</div>
                  <div className="text-xs text-indigo-400">{selectedPost.authorRole}</div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
              </div>

              {/* Article Content Sections */}
              <div className="space-y-8 mb-10 text-slate-300 leading-relaxed">
                {selectedPost.content.map((sec, i) => (
                  <div key={i}>
                    <h3 className="font-heading font-bold text-xl text-white mb-3">{sec.heading}</h3>
                    <p className="text-sm md:text-base leading-relaxed text-slate-300">{sec.text}</p>
                  </div>
                ))}
              </div>

              {/* Key Takeaways */}
              <div className="glass rounded-2xl p-6 border border-indigo-500/20 bg-indigo-500/5 mb-8">
                <h4 className="font-heading font-bold text-lg text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                  <span>Key Takeaways</span>
                </h4>
                <ul className="space-y-2">
                  {selectedPost.takeaways.map((item, idx) => (
                    <li key={idx} className="text-xs md:text-sm text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Close Footer CTA */}
              <div className="text-center pt-4 border-t border-white/[0.06]">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="btn-ghost px-6 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white"
                >
                  Close Article Reader
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
