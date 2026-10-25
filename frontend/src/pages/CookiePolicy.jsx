import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import {
  Cookie,
  ShieldCheck,
  CheckCircle2,
  Info,
  Sliders,
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function CookiePolicy() {
  const lastUpdated = 'October 25, 2026';

  const cookieInventory = [
    {
      name: 'portfolio_jwt_token',
      provider: 'PortfolioCraft (First-party)',
      type: 'Strictly Necessary (Auth)',
      storage: 'localStorage',
      duration: 'Until logout / Session expiry',
      description: 'Stores your cryptographic JWT authentication bearer token so you remain signed in across page transitions and editor sessions.'
    },
    {
      name: 'portfolio_recent_template',
      provider: 'PortfolioCraft (First-party)',
      type: 'Functional / Preference',
      storage: 'localStorage',
      duration: 'Persistent (Local)',
      description: 'Remembers the last active portfolio template ID chosen in the template browser for seamless editing continuity.'
    },
    {
      name: 'theme_view_mode',
      provider: 'PortfolioCraft (First-party)',
      type: 'User Interface',
      storage: 'sessionStorage',
      duration: 'Browser session',
      description: 'Retains your desktop / tablet / mobile viewport preview toggle state during active portfolio editing sessions.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header Banner */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-4">
              <Cookie className="w-3.5 h-3.5" />
              <span>Cookie Policy</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
              Cookie <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              We believe in honest, transparent technology. PortfolioCraft uses strictly essential local tokens to power your editor and authentication—never cross-site advertising trackers.
            </p>
            <p className="text-xs font-mono text-slate-500 mt-4">
              Last updated: {lastUpdated} • Cookie-minimal platform
            </p>
          </div>

          {/* Core Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="p-4 rounded-2xl glass border border-white/[0.08] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-sm text-white">No Ad Trackers</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We never place third-party marketing cookies, Facebook Pixels, or cross-site tracking beacons.
              </p>
            </div>

            <div className="p-4 rounded-2xl glass border border-white/[0.08] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-sm text-white">Essential Only</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cookies and local storage keys are used strictly for sign-in state, session security, and editor persistence.
              </p>
            </div>

            <div className="p-4 rounded-2xl glass border border-white/[0.08] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Sliders className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-sm text-white">User Controlled</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                You can inspect, block, or clear all browser cookies and local storage items at any time through your browser settings.
              </p>
            </div>
          </div>

          {/* Cookie & Local Storage Inventory Table */}
          <div className="p-6 sm:p-8 rounded-3xl glass border border-white/[0.08] mb-10 space-y-6">
            <div>
              <h2 className="font-heading font-bold text-xl text-white mb-2">Technical Storage Inventory</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                The following table outlines the complete list of first-party browser storage keys and cookies used across the PortfolioCraft application:
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider font-mono text-[10px]">
                    <th className="py-3 px-3">Storage Key</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Storage Type</th>
                    <th className="py-3 px-3">Duration</th>
                    <th className="py-3 px-3">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {cookieInventory.map((item) => (
                    <tr key={item.name} className="hover:bg-white/[0.02] transition">
                      <td className="py-3 px-3 font-mono font-bold text-indigo-400 whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="py-3 px-3 text-slate-300 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] text-indigo-300 font-semibold">
                          {item.type}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-400 whitespace-nowrap font-mono">{item.storage}</td>
                      <td className="py-3 px-3 text-slate-400 whitespace-nowrap">{item.duration}</td>
                      <td className="py-3 px-3 text-slate-300 leading-relaxed min-w-[220px]">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Browser Controls Section */}
          <div className="p-6 sm:p-8 rounded-3xl glass border border-white/[0.08] space-y-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Info className="w-4 h-4" />
              </div>
              <h2 className="font-heading font-bold text-lg sm:text-xl text-white">How to Control or Clear Cookies</h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Most web browsers allow you to control cookies and site data through their preferences or settings panes. Please note that clearing or blocking strictly necessary tokens (such as your login token) will sign you out and require you to log in again upon your next visit.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {['Google Chrome', 'Apple Safari', 'Mozilla Firefox', 'Microsoft Edge'].map((browser) => (
                <div key={browser} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <span className="text-xs font-semibold text-slate-300">{browser}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Settings &gt; Privacy</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Callout */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-transparent border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-bold text-base text-white">Want to learn more about our privacy safeguards?</h3>
              <p className="text-xs text-slate-400 mt-1">Read our comprehensive Privacy Policy or reach out to our team.</p>
            </div>
            <Link
              to="/privacy"
              className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shrink-0"
            >
              <span>View Privacy Policy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
