import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Play } from 'lucide-react';

export default function MediaGallery({ props = {} }) {
  const {
    heading = 'Media & Designs',
    items = [
      {
        id: 'm1',
        title: 'System Architecture Diagram',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'm2',
        title: 'Mobile App Mockup',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80'
      }
    ]
  } = props;

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-3">
            <ImageIcon className="w-4 h-4" />
            <span>Visual Showcase</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden group border border-slate-800 relative aspect-video"
            >
              {item.type === 'video' ? (
                <video
                  src={item.url}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={item.url}
                  alt={item.title || `Media ${index}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}

              {item.title && (
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent">
                  <h4 className="text-sm font-semibold text-white truncate">{item.title}</h4>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
