import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Play, X, ZoomIn } from 'lucide-react';

export default function MediaGallery({ props = {}, templateId, viewportMode }) {
  const {
    heading = 'Visual Showcase',
    subheading = 'A glimpse into the craft — designs, mockups, and moments captured.',
    items = [
      {
        id: 'm1',
        title: 'System Architecture',
        type: 'image',
        url: ''
      },
      {
        id: 'm2',
        title: 'Mobile App Design',
        type: 'image',
        url: ''
      }
    ]
  } = props;

  const [lightboxItem, setLightboxItem] = useState(null);
  const isMobile = viewportMode === 'mobile';
  
  const isCyber = templateId === 'dark-cyber' || templateId === 'ai-neural-labs-pro' || templateId === 'fintech-saas-pro';
  const isLuxury = templateId === 'haute-couture-studio' || templateId === 'luxury-motion-pro' || templateId === 'minimalist-editorial' || templateId === 'spatial-architect-studio';

  const gridClass = isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';

  if (isCyber) {
    return (
      <section className="py-20 px-6 font-mono">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-emerald-400 mb-8 uppercase tracking-widest">
            &gt; {heading}_
          </h2>
          <div className={`grid gap-4 ${gridClass}`}>
            {items.map((item, index) => (
              <div key={item.id || index} className="border border-emerald-500/30 p-2 bg-emerald-950/10 hover:border-emerald-400 transition cursor-pointer" onClick={() => item.type !== 'video' && setLightboxItem(item)}>
                {item.type === 'video' ? (
                  <video src={item.url} controls className="w-full h-48 object-cover grayscale hover:grayscale-0 transition duration-500" />
                ) : (
                  <div className="w-full h-48 bg-emerald-950/30 relative overflow-hidden">
                    {item.url ? (
                       <img src={item.url} alt={item.title} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition duration-500" />
                    ) : (
                       <div className="absolute inset-0 flex items-center justify-center text-emerald-500/50 text-xs uppercase">No Data</div>
                    )}
                  </div>
                )}
                {item.title && <div className="mt-2 text-emerald-400 text-xs uppercase">[{item.title}]</div>}
              </div>
            ))}
          </div>
        </div>
        {/* Lightbox remains the same for cyber but styled slightly differently if needed */}
        <AnimatePresence>
          {lightboxItem && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6 border-4 border-emerald-500/50" onClick={() => setLightboxItem(null)}>
              <button className="absolute top-6 right-6 text-emerald-500 hover:text-emerald-400 font-mono uppercase text-sm">[ Close ]</button>
              <img src={lightboxItem.url} alt={lightboxItem.title} className="max-w-full max-h-[85vh] object-contain border border-emerald-500/50" onClick={e => e.stopPropagation()} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    );
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="badge badge-indigo inline-flex mb-4">
            <ImageIcon className="w-3 h-3" />
            <span>Gallery</span>
          </div>
          <h2 className={`font-heading ${isLuxury ? 'font-medium font-display' : 'font-black'} text-3xl md:text-5xl text-white mb-3`}>{heading}</h2>
          {subheading && <p className="text-slate-400 text-base max-w-lg mx-auto">{subheading}</p>}
        </div>

        <div className={`grid gap-5 ${gridClass}`}>
          {items.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`glass-card ${isLuxury ? '' : 'gradient-border'} rounded-2xl overflow-hidden group relative aspect-[4/3] cursor-pointer`}
              onClick={() => item.type !== 'video' && setLightboxItem(item)}
            >
              {item.type === 'video' ? (
                <div className="relative w-full h-full">
                  <video src={item.url} controls className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 badge badge-indigo">
                    <Play className="w-3 h-3" />
                    <span>Video</span>
                  </div>
                </div>
              ) : (
                <>
                  {item.url ? (
                    <img src={item.url} alt={item.title || `Media ${index}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-700">Empty</div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-white transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </>
              )}
              {item.title && (
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                  <h4 className="text-sm font-semibold text-white truncate">{item.title}</h4>
                  {item.description && <p className="text-xs text-slate-300 truncate mt-1">{item.description}</p>}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-6"
            onClick={() => setLightboxItem(null)}
          >
            <button className="absolute top-6 right-6 w-10 h-10 rounded-xl glass flex items-center justify-center text-white hover:bg-white/10 transition">
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              src={lightboxItem.url}
              alt={lightboxItem.title}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            />
            {lightboxItem.title && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-2xl text-center">
                <p className="text-white text-sm font-semibold">{lightboxItem.title}</p>
                {lightboxItem.description && <p className="text-slate-300 text-xs mt-1 max-w-md">{lightboxItem.description}</p>}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
