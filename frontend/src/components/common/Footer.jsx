import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm text-white">PortfolioCraft MERN Platform</span>
        </div>

        <p className="text-xs text-slate-500 flex items-center gap-1">
          Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> using React, Node.js, Express & MongoDB Atlas.
        </p>

        <div className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
