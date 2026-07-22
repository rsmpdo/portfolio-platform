import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Figma, Youtube, Code, ShieldCheck } from 'lucide-react';

export default function PremiumEmbed({ props = {}, templateId, viewportMode }) {
  const {
    heading = 'Interactive Prototype',
    embedUrl = '', // E.g. figma embed, spline, youtube
    embedType = 'figma', // figma, spline, youtube, custom
    height = '600px',
    isProFeature = true // visual flag
  } = props;

  const isMobile = viewportMode === 'mobile';

  // Extract source from Figma iframe snippet if they pasted the whole iframe
  let finalUrl = embedUrl;
  if (finalUrl.includes('<iframe')) {
    const srcMatch = finalUrl.match(/src="([^"]+)"/);
    if (srcMatch) finalUrl = srcMatch[1];
  }

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl md:text-4xl text-white font-bold">{heading}</h2>
          {isProFeature && (
            <div className="badge badge-amber flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Premium Feature</span>
            </div>
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-dark rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative"
          style={{ height: isMobile ? '400px' : height }}
        >
          {finalUrl ? (
            <iframe 
              src={finalUrl} 
              allowFullScreen 
              title={heading}
              className="w-full h-full border-none bg-black/50"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-4">
              {embedType === 'figma' ? <Figma className="w-12 h-12 opacity-50" /> : <Monitor className="w-12 h-12 opacity-50" />}
              <p>Paste your {embedType} embed URL in the settings sidebar to render.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
