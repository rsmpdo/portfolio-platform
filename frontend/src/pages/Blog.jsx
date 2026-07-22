import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Sparkles, BookOpen, Clock, ArrowRight } from 'lucide-react';

const posts = [
  {
    title: "How to Structure a Product Design Portfolio That Gets You Hired at Tech Unicorns",
    excerpt: "Learn the exact section hierarchy and case study layout hiring managers look for in top 1% candidates.",
    category: "Career & Portfolio",
    date: "July 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "10 Portfolio Copywriting Mistakes That Are Costing You Inbound Clients",
    excerpt: "Stop listing frameworks and start telling stories that turn casual visitors into high-paying clients.",
    category: "Copywriting",
    date: "July 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Why Modern Dark Mode & Glassmorphism Win Attention in 2026",
    excerpt: "Deep dive into visual aesthetics, contrast ratios, and modern CSS tokens for high-impact web portfolios.",
    category: "Design Systems",
    date: "June 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-6xl mx-auto w-full">
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
            Actionable advice on portfolio design, personal branding, and winning client work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {posts.map((post, idx) => (
            <div key={idx} className="glass-card gradient-border rounded-3xl overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-indigo-400 font-semibold mb-3">
                    <span>{post.category}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white mb-3 group-hover:text-indigo-400 transition-colors leading-snug">{post.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">{post.excerpt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
