import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-slate-950 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-xl btn-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-bold text-white">PortfolioCraft</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              Where talent meets opportunity. Build an Adobe Portfolio-grade showcase that makes people stop scrolling and start reaching out.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-4">
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">Platform</h4>
              <ul className="space-y-2.5">
                {[
                  { name: 'Features', path: '/features' },
                  { name: 'Templates', path: '/templates' },
                  { name: 'Showcase', path: '/showcase' },
                  { name: 'Pricing', path: '/pricing' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-sm text-slate-500 hover:text-white transition underline-hover">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">Company</h4>
              <ul className="space-y-2.5">
                {[
                  { name: 'About', path: '/about' },
                  { name: 'Blog', path: '/blog' },
                  { name: 'Careers', path: '/careers' },
                  { name: 'Contact', path: '/contact' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-sm text-slate-500 hover:text-white transition underline-hover">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">Start Creating</h4>
            <Link
              to="/register"
              className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
            >
              <span>Create Free Portfolio</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">&copy; {new Date().getFullYear()} PortfolioCraft. All rights reserved.</p>
          <p className="text-xs text-slate-600">Designed for creators who mean business.</p>
        </div>
      </div>
    </footer>
  );
}
