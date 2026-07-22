import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Phone, Mail, Github, Twitter, Linkedin, Dribbble } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-slate-950 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
          
          {/* Brand & Description */}
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-xl btn-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-bold text-white">PortfolioCraft</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Where talent meets opportunity. Build an Adobe Portfolio-grade showcase that makes people stop scrolling and start reaching out.
            </p>
            {/* Live System Operational Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Nav Columns */}
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

          {/* Contact Information Widget */}
          <div className="max-w-xs w-full">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">Get In Touch</h4>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-400 leading-relaxed">
                  Galle,<br />
                  Sri Lanka
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-indigo-400 shrink-0" />
                <p className="text-sm text-slate-400 hover:text-white transition cursor-pointer">
                  +94 123 456 789
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-400 shrink-0" />
                <p className="text-sm text-slate-400 hover:text-white transition cursor-pointer">
                  hello@portfoliocraft.com
                </p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-4 border-t border-white/[0.06]">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white transition">
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white transition">
                <Github className="w-3.5 h-3.5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white transition">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a href="https://dribbble.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white transition">
                <Dribbble className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">&copy; {new Date().getFullYear()} PortfolioCraft. All rights reserved.</p>
          <p className="text-xs text-slate-600">Designed for creators who mean business.</p>
        </div>
      </div>
    </footer>
  );
}
