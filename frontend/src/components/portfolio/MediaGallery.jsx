import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Play, X, ZoomIn } from 'lucide-react';

export default function MediaGallery({ props = {} }) {
  const {
    heading = 'Visual Showcase',
    subheading = 'A glimpse into the craft — designs, mockups, and moments captured.',
    items = [
      {
        id: 'm1',
        title: 'System Architecture',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'm2',
        title: 'Mobile App Design',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80'
      }
    ]
  } = props;

  const [lightboxItem, setLightboxItem] = useState(null);

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="badge badge-indigo inline-flex mb-4">
            <ImageIcon className="w-3 h-3" />
            <span>Gallery</span>
          </div>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white mb-3">{heading}</h2>
          {subheading && <p className="text-slate-400 text-base max-w-lg mx-auto">{subheading}</p>}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {items.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass-card gradient-border rounded-2xl overflow-hidden group relative aspect-[4/3] cursor-pointer"
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
                  <img
                    src={item.url}
                    alt={item.title || `Media ${index}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
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
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
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
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-2xl">
                <p className="text-white text-sm font-semibold">{lightboxItem.title}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
