import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Play, X, ZoomIn } from 'lucide-react';

export default function MediaGallery({ props = {}, templateId, viewportMode }) {
  const {
    heading = 'Visual Showcase',
    subheading = 'A glimpse into the craft.',
    items = []
  } = props;

  const [lightboxItem, setLightboxItem] = useState(null);
  const isMobile = viewportMode === 'mobile';

  // Helper to render Lightbox universally
  const renderLightbox = (themeClass = "") => (
    <AnimatePresence>
      {lightboxItem && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className={`fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 ${themeClass}`}
          onClick={() => setLightboxItem(null)}
        >
          <button className="absolute top-6 right-6 text-white hover:text-slate-400 font-bold tracking-widest uppercase text-sm">
            CLOSE
          </button>
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            src={lightboxItem.url} alt={lightboxItem.title}
            className="max-w-full max-h-[85vh] object-contain shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

  // ---------------------------------------------------------
  // CYBER & AI (Terminal Grid, Monospace)
  // ---------------------------------------------------------
  if (templateId === 'dark-cyber' || templateId === 'ai-neural-labs-pro') {
    return (
      <section className="py-20 px-6 font-mono bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl text-emerald-500 mb-8 uppercase tracking-widest border-b border-emerald-500/20 pb-4">
            &gt; {heading}_
          </h2>
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3'}`}>
            {items.map((item, index) => (
              <div key={item.id || index} className="border border-emerald-500/30 p-2 bg-emerald-950/10 hover:border-emerald-400 transition cursor-pointer" onClick={() => setLightboxItem(item)}>
                <div className="w-full h-48 bg-black relative overflow-hidden group">
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition duration-500" />
                </div>
                {item.title && <div className="mt-2 text-emerald-400 text-xs uppercase truncate">[{item.title}]</div>}
              </div>
            ))}
          </div>
        </div>
        {renderLightbox("border-4 border-emerald-500/50")}
      </section>
    );
  }

  // ---------------------------------------------------------
  // EDITORIAL & COUTURE (Masonry, High Fashion, Asymmetric)
  // ---------------------------------------------------------
  if (templateId === 'minimalist-editorial' || templateId === 'haute-couture-studio') {
    return (
      <section className="py-24 px-6 bg-white border-b-8 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl md:text-7xl text-black mb-4 uppercase tracking-tighter">{heading}</h2>
            <p className="text-slate-500 text-lg md:text-xl font-light italic">{subheading}</p>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {items.map((item, index) => (
              <div key={item.id || index} className="break-inside-avoid cursor-pointer group relative overflow-hidden" onClick={() => setLightboxItem(item)}>
                <img src={item.url} alt={item.title} className="w-full h-auto filter grayscale group-hover:grayscale-0 transition duration-700" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-serif uppercase tracking-widest text-sm border border-white px-4 py-2">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {renderLightbox()}
      </section>
    );
  }

  // ---------------------------------------------------------
  // SPATIAL ARCHITECT (Blueprint Horizontal Grid)
  // ---------------------------------------------------------
  if (templateId === 'spatial-architect-studio') {
    return (
      <section className="py-24 px-6 bg-slate-900 border-y border-slate-700">
        <div className="max-w-[90rem] mx-auto">
          <div className="flex items-end justify-between mb-12 border-b border-slate-700 pb-4">
            <h2 className="font-sans font-bold text-4xl text-slate-100 uppercase tracking-widest">{heading}</h2>
            <span className="text-slate-500 font-mono text-xs hidden md:block">DATASET_RENDER // {items.length} FILES</span>
          </div>
          <div className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory hide-scrollbar">
            {items.map((item, index) => (
              <div key={item.id || index} className="min-w-[85vw] md:min-w-[600px] snap-center cursor-pointer border border-slate-700 p-4" onClick={() => setLightboxItem(item)}>
                <div className="w-full aspect-video bg-black relative overflow-hidden">
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-slate-300 font-sans uppercase tracking-widest text-sm">{item.title}</span>
                  <span className="text-emerald-500 font-mono text-xs">V-1.0</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {renderLightbox()}
      </section>
    );
  }

  // ---------------------------------------------------------
  // LUXURY MOTION PRO (Cinematic Full Bleed, Gold Accents)
  // ---------------------------------------------------------
  if (templateId === 'luxury-motion-pro') {
    return (
      <section className="py-32 px-6 bg-[#0a0908] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="font-serif italic text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-[#f3e5ab] via-[#d4af37] to-[#aa7c11] mb-6 drop-shadow-sm">{heading}</h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
          </div>
          <div className={`grid gap-12 md:gap-24 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
            {items.map((item, index) => (
              <div key={item.id || index} className={`cursor-pointer group ${index % 2 !== 0 && !isMobile ? 'md:mt-32' : ''}`} onClick={() => setLightboxItem(item)}>
                <div className="relative aspect-[3/4] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#d4af37]/20 rounded-t-full">
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover filter contrast-125 sepia-[0.2] group-hover:sepia-0 group-hover:scale-110 transition duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-[#0a0908]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-12 text-center">
                    <h4 className="text-[#f3e5ab] font-serif text-4xl mb-3">{item.title}</h4>
                    <p className="text-[#d4af37] font-light text-xs tracking-[0.3em] uppercase">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {renderLightbox()}
      </section>
    );
  }

  // ---------------------------------------------------------
  // GLOBAL AGENCY STUDIO (Cinematic Full Bleed, Dark Slate)
  // ---------------------------------------------------------
  if (templateId === 'global-agency-studio') {
    return (
      <section className="py-32 px-6 bg-slate-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-serif italic text-4xl md:text-6xl text-white mb-6">{heading}</h2>
            <div className="w-24 h-px bg-white/20 mx-auto"></div>
          </div>
          <div className={`grid gap-12 md:gap-24 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
            {items.map((item, index) => (
              <div key={item.id || index} className={`cursor-pointer group ${index % 2 !== 0 && !isMobile ? 'md:mt-32' : ''}`} onClick={() => setLightboxItem(item)}>
                <div className="relative aspect-[3/4] overflow-hidden shadow-2xl">
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover filter saturate-50 group-hover:saturate-100 group-hover:scale-110 transition duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <div>
                      <h4 className="text-white font-serif text-2xl mb-2">{item.title}</h4>
                      <p className="text-slate-400 font-light text-sm tracking-widest uppercase">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {renderLightbox()}
      </section>
    );
  }

  // ---------------------------------------------------------
  // FALLBACK (Default SaaS / Showcase)
  // ---------------------------------------------------------
  return (
    <section className="py-20 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="badge badge-indigo inline-flex mb-4">
            <ImageIcon className="w-3 h-3" />
            <span>Gallery</span>
          </div>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white mb-3">{heading}</h2>
          {subheading && <p className="text-slate-400 text-base max-w-lg mx-auto">{subheading}</p>}
        </div>

        <div className={`grid gap-5 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`}>
          {items.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card gradient-border rounded-2xl overflow-hidden group relative aspect-[4/3] cursor-pointer"
              onClick={() => setLightboxItem(item)}
            >
              {item.url ? (
                <img src={item.url} alt={item.title || `Media ${index}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-700">Empty</div>
              )}
              {item.title && (
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                  <h4 className="text-sm font-semibold text-white truncate">{item.title}</h4>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      {renderLightbox()}
    </section>
  );
}
