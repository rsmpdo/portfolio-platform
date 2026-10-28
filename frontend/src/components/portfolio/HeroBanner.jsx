import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MonitorPlay } from 'lucide-react';

export default function HeroBanner({ props = {}, templateId, viewportMode, theme = {} }) {
  const {
    headline = "Hi, I'm Priyanath",
    subheadline = "Full Stack Developer & Creative Innovator",
    avatarUrl = "",
    ctaText = "View My Work",
    bgVideoUrl = ""
  } = props;

  const isMobile = viewportMode === 'mobile';
  const isTablet = viewportMode === 'tablet';
  const isSmall = isMobile || isTablet;
  const gridClass = isSmall ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2';

  const primaryColor = theme.primaryColor || '#6366f1';
  const secondaryColor = theme.secondaryColor || '#a855f7';
  const surfaceColor = theme.surfaceColor;
  const textColor = theme.textColor;
  const textMutedColor = theme.textMutedColor;

  // ---------------------------------------------------------
  // 1. MINIMALIST EDITORIAL (Brutalist, Sharp, High Contrast)
  // ---------------------------------------------------------
  if (templateId === 'minimalist-editorial') {
    return (
      <section className={`${isMobile ? 'min-h-[auto] px-4 pt-12 pb-8' : isTablet ? 'min-h-[auto] px-6 pt-16 pb-12' : 'min-h-[80vh] px-6 pt-32 pb-16'} flex flex-col justify-center border-b-8`} style={{ borderColor: primaryColor }}>
        <div className="max-w-7xl mx-auto w-full">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            className={`font-serif font-black ${isMobile ? 'text-4xl' : isTablet ? 'text-6xl' : 'text-6xl md:text-8xl lg:text-[10rem]'} leading-[0.9] tracking-tighter mb-6 uppercase`}
            style={textColor ? { color: textColor } : undefined}
          >
            {headline}
          </motion.h1>
          <div className={`grid ${isSmall ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} gap-8 items-end border-t-2 pt-6`} style={{ borderColor: primaryColor }}>
            <p className={`${isMobile ? 'text-base' : isTablet ? 'text-xl' : 'text-xl md:text-3xl'} font-medium max-w-2xl font-sans tracking-tight leading-snug`} style={textMutedColor ? { color: textMutedColor } : undefined}>
              {subheadline}
            </p>
            <div className={`flex ${isSmall ? 'flex-col sm:flex-row justify-start' : 'flex-col md:flex-row md:justify-end'} gap-4 font-sans font-bold uppercase text-sm tracking-widest`}>
              <a href="#projects" className="border-2 px-8 py-3.5 transition-colors text-center text-white" style={{ backgroundColor: primaryColor, borderColor: primaryColor }}>
                {ctaText}
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------
  // 2. DARK CYBER (Terminal, Matrix, Glow)
  // ---------------------------------------------------------
  if (templateId === 'dark-cyber') {
    return (
      <section className={`relative ${isSmall ? 'min-h-[auto] pt-12 pb-10 px-4' : 'min-h-[85vh] pt-20 pb-16 px-6'} flex items-center overflow-hidden font-mono`} style={{ color: primaryColor }}>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className={`max-w-5xl mx-auto w-full relative z-10 border ${isMobile ? 'p-4' : 'p-8'} backdrop-blur-sm`} style={{ borderColor: `${primaryColor}50`, backgroundColor: surfaceColor || `${primaryColor}10` }}>
          <div className="mb-4 uppercase tracking-widest text-xs border-b pb-3" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
            <span className="animate-pulse mr-2">█</span> SYSTEM.BOOT_SEQUENCE
          </div>
          <h1 className={`${isMobile ? 'text-2xl' : isTablet ? 'text-4xl' : 'text-4xl md:text-6xl'} font-bold mb-4 tracking-tight uppercase glow-text text-white`} style={textColor ? { color: textColor } : undefined}>
            {headline}_
          </h1>
          <p className={`${isMobile ? 'text-sm' : 'text-base md:text-xl'} mb-8 leading-relaxed border-l-2 pl-4`} style={{ borderColor: primaryColor, color: textMutedColor || primaryColor }}>
            {subheadline}
          </p>
          <div className="flex gap-4">
            <a href="#projects" className="text-black px-6 py-2.5 font-bold uppercase transition text-sm" style={{ backgroundColor: primaryColor, color: '#000' }}>
              [{ctaText}]
            </a>
          </div>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------
  // 3. CREATIVE DIRECTOR (Full Bleed, Overlay, Bold)
  // ---------------------------------------------------------
  if (templateId === 'creative-director') {
    return (
      <section className={`relative ${isSmall ? 'min-h-[auto] px-4 pt-16 pb-12' : 'min-h-[100vh] px-6 pt-32 pb-20'} flex items-center overflow-hidden`}>
        {avatarUrl && (
          <div className="absolute inset-0 z-0">
            <img src={avatarUrl} alt="Background" className="w-full h-full object-cover opacity-50 filter saturate-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>
        )}
        <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
            <h1 className={`font-heading font-black ${isMobile ? 'text-3xl' : isTablet ? 'text-5xl' : 'text-6xl md:text-[8rem]'} text-white leading-none tracking-tighter uppercase`} style={textColor ? { color: textColor } : undefined}>
              {headline}
            </h1>
            <p className={`text-white ${isMobile ? 'text-base mt-4' : isTablet ? 'text-xl mt-6' : 'text-xl md:text-3xl mt-8'} font-medium max-w-3xl mx-auto`} style={textMutedColor ? { color: textMutedColor } : undefined}>
              {subheadline}
            </p>
            <div className={`${isMobile ? 'mt-6' : 'mt-10'}`}>
              <a href="#projects" className="inline-flex items-center gap-3 px-6 py-3 rounded-full transition-colors uppercase tracking-widest font-bold text-sm" style={{ backgroundColor: primaryColor, color: '#fff' }}>
                {ctaText} <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------
  // 4. INTERACTIVE SHOWCASE (Floating Glass, Glow)
  // ---------------------------------------------------------
  if (templateId === 'interactive-showcase') {
    return (
      <section className={`relative ${isSmall ? 'min-h-[auto] pt-16 pb-12 px-4' : 'min-h-[90vh] pt-32 pb-16 px-6'} flex items-center overflow-hidden`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ backgroundColor: `${primaryColor}25` }} />
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className={`glass-card ${isMobile ? 'p-6 rounded-3xl' : isTablet ? 'p-10 rounded-[2.5rem]' : 'p-12 md:p-20 rounded-[3rem]'} border border-white/10 text-center shadow-2xl backdrop-blur-xl`} style={surfaceColor ? { backgroundColor: surfaceColor } : undefined}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border text-xs font-semibold mb-6" style={{ borderColor: `${primaryColor}40`, color: primaryColor }}>
              <MonitorPlay className="w-3.5 h-3.5" /> Immersive Digital
            </div>
            <h1 className={`font-heading font-black ${isMobile ? 'text-3xl' : isTablet ? 'text-5xl' : 'text-5xl md:text-7xl'} text-transparent bg-clip-text mb-4`} style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}>
              {headline}
            </h1>
            <p className={`text-slate-300 ${isMobile ? 'text-sm' : 'text-lg md:text-xl'} max-w-2xl mx-auto mb-8 leading-relaxed`} style={textMutedColor ? { color: textMutedColor } : undefined}>
              {subheadline}
            </p>
            <a href="#projects" className="btn-primary px-7 py-3 rounded-xl font-bold text-white shadow-lg hover:scale-105 transition-transform inline-block text-sm" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}>
              {ctaText}
            </a>
          </div>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------
  // 5. LUXURY MOTION PRO (Serif, Elegant, Cinematic)
  // ---------------------------------------------------------
  if (templateId === 'luxury-motion-pro') {
    return (
      <section className={`relative ${isSmall ? 'min-h-[auto] pt-16 pb-12 px-4' : 'min-h-[100vh] pt-32 pb-16 px-6'} flex items-center overflow-hidden`}>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: `${primaryColor}15` }} />
        
        <div className="max-w-6xl mx-auto text-center relative z-10 w-full flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }} className="w-full">
            <h1 className={`font-serif ${isMobile ? 'text-3xl' : isTablet ? 'text-5xl' : 'text-6xl md:text-8xl'} text-transparent bg-clip-text mb-6 leading-[1.1] tracking-tight drop-shadow-sm`} style={{ backgroundImage: `linear-gradient(180deg, ${textColor || '#f3e5ab'}, ${primaryColor}, ${secondaryColor})` }}>
              {headline}
            </h1>
            <p className={`text-[#a8a29e] font-light ${isMobile ? 'text-base mb-8' : isTablet ? 'text-xl mb-10' : 'text-xl md:text-3xl mb-16'} max-w-3xl mx-auto tracking-wide`} style={textMutedColor ? { color: textMutedColor } : undefined}>
              {subheadline}
            </p>
          </motion.div>
          {avatarUrl && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, delay: 0.3 }} className={`${isMobile ? 'mb-8' : 'mb-12'}`}>
              <div className={`${isMobile ? 'w-[200px] h-[260px]' : isTablet ? 'w-[260px] h-[340px]' : 'w-[300px] h-[400px] md:w-[400px] md:h-[500px]'} overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] border rounded-t-full`} style={{ borderColor: `${primaryColor}40` }}>
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover filter contrast-125 sepia-[0.2]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-transparent to-transparent opacity-80" />
              </div>
            </motion.div>
          )}
          <a href="#projects" className="border px-8 py-3.5 transition-all duration-500 uppercase tracking-[0.25em] text-xs font-semibold" style={{ borderColor: primaryColor, color: primaryColor }}>
            {ctaText}
          </a>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------
  // 6. FINTECH SAAS PRO (Clean, Dashboard, Enterprise)
  // ---------------------------------------------------------
  if (templateId === 'fintech-saas-pro') {
    return (
      <section className={`${isSmall ? 'min-h-[auto] pt-12 pb-10 px-4' : 'min-h-[80vh] pt-32 pb-16 px-6'} border-b border-white/10 overflow-hidden relative`}>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className={`rounded-3xl shadow-xl border border-white/10 ${isMobile ? 'p-6' : isTablet ? 'p-8' : 'p-8 md:p-16'} flex ${isSmall ? 'flex-col text-center' : 'flex-col md:flex-row text-left'} items-center gap-8`} style={{ backgroundColor: surfaceColor || 'rgba(255,255,255,0.04)' }}>
            <div className="flex-1">
              <div className="font-bold tracking-widest uppercase text-xs mb-3" style={{ color: primaryColor }}>Enterprise Product Lead</div>
              <h1 className={`font-sans font-extrabold ${isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl md:text-6xl'} mb-4 leading-tight tracking-tight`} style={textColor ? { color: textColor } : undefined}>
                {headline}
              </h1>
              <p className={`${isMobile ? 'text-sm' : 'text-base md:text-xl'} mb-6 leading-relaxed max-w-xl mx-auto`} style={textMutedColor ? { color: textMutedColor } : undefined}>
                {subheadline}
              </p>
              <a href="#projects" className="text-white px-6 py-2.5 rounded-lg font-semibold transition shadow-lg inline-block text-sm" style={{ backgroundColor: primaryColor }}>
                {ctaText}
              </a>
            </div>
            {avatarUrl && (
              <div className={`flex justify-center ${isSmall ? 'w-full' : 'flex-1 md:justify-end'}`}>
                <div className={`${isMobile ? 'w-44 h-44' : isTablet ? 'w-52 h-52' : 'w-72 h-72'} rounded-full overflow-hidden border-8 border-white/10 shadow-2xl`}>
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------
  // 7. AI NEURAL LABS PRO (Dark, Code-like, Node Graph)
  // ---------------------------------------------------------
  if (templateId === 'ai-neural-labs-pro') {
    return (
      <section className={`relative ${isSmall ? 'min-h-[auto] pt-14 pb-12 px-4' : 'min-h-[85vh] pt-32 pb-16 px-6'} flex items-center overflow-hidden`}>
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={primaryColor} strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <circle cx="20%" cy="30%" r="4" fill={primaryColor} />
            <circle cx="40%" cy="70%" r="6" fill={primaryColor} />
            <circle cx="80%" cy="40%" r="5" fill={primaryColor} />
            <line x1="20%" y1="30%" x2="40%" y2="70%" stroke={primaryColor} strokeWidth="1" />
            <line x1="40%" y1="70%" x2="80%" y2="40%" stroke={primaryColor} strokeWidth="1" />
          </svg>
        </div>
        <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
          <div className="px-3.5 py-1.5 rounded-md border font-mono text-xs mb-6 inline-block" style={{ backgroundColor: `${primaryColor}20`, borderColor: `${primaryColor}60`, color: primaryColor }}>
            import &#123; Future &#125; from 'ai/models';
          </div>
          <h1 className={`font-mono font-bold ${isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl md:text-7xl'} text-slate-100 mb-4 tracking-tight`} style={textColor ? { color: textColor } : undefined}>
            {headline}
          </h1>
          <p className={`text-slate-400 ${isMobile ? 'text-sm' : 'text-base md:text-xl'} mb-8 max-w-3xl font-mono leading-relaxed`} style={textMutedColor ? { color: textMutedColor } : undefined}>
            {subheadline}
          </p>
          <a href="#projects" className="text-white px-7 py-3 rounded-sm font-mono font-bold transition text-sm" style={{ backgroundColor: primaryColor, boxShadow: `4px 4px 0 ${secondaryColor}` }}>
            {ctaText}
          </a>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------
  // 8. GLOBAL AGENCY STUDIO (Bold, Split Screen, Type heavy)
  // ---------------------------------------------------------
  if (templateId === 'global-agency-studio') {
    return (
      <section className={`${isSmall ? 'min-h-[auto] flex-col' : 'min-h-[90vh] flex-col md:flex-row'} flex relative overflow-hidden`}>
        {bgVideoUrl && (
          <div className="absolute inset-0 z-0">
            <video src={bgVideoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30" />
          </div>
        )}
        <div className={`flex-1 flex flex-col justify-center ${isMobile ? 'px-6 pt-14 pb-10' : isTablet ? 'px-8 pt-16 pb-12' : 'px-8 md:px-16 pt-32 pb-16'} relative z-10`}>
          <h1 className={`font-heading font-black ${isMobile ? 'text-4xl' : isTablet ? 'text-5xl' : 'text-6xl md:text-8xl'} text-white mb-4 uppercase leading-[0.95]`} style={textColor ? { color: textColor } : undefined}>
            {headline}
          </h1>
          <p className={`text-slate-400 ${isMobile ? 'text-base' : 'text-xl md:text-2xl'} font-medium mb-8 max-w-xl`} style={textMutedColor ? { color: textMutedColor } : undefined}>
            {subheadline}
          </p>
          <div>
            <a href="#projects" className="inline-block border-2 px-7 py-3 font-bold uppercase tracking-widest transition text-sm" style={{ borderColor: primaryColor, backgroundColor: primaryColor, color: '#fff' }}>
              {ctaText}
            </a>
          </div>
        </div>
        {avatarUrl && (
          <div className={`flex-1 relative ${isMobile ? 'h-64' : isTablet ? 'h-80' : 'min-h-[40vh] md:min-h-full'} z-10`}>
            <img src={avatarUrl} alt="Agency" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-900/20 mix-blend-multiply" />
          </div>
        )}
      </section>
    );
  }

  // ---------------------------------------------------------
  // 9. HAUTE COUTURE STUDIO (Fashion, Asymmetric, Minimal)
  // ---------------------------------------------------------
  if (templateId === 'haute-couture-studio') {
    return (
      <section className={`relative ${isSmall ? 'min-h-[auto] pt-14 pb-12 px-4' : 'min-h-[100vh] pt-24 pb-16 px-6'} flex flex-col items-center text-center overflow-hidden`}>
        {bgVideoUrl && (
          <div className="absolute inset-0 z-0">
            <video src={bgVideoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-20 filter grayscale" />
          </div>
        )}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
          <h2 className="font-serif italic text-xl mb-3" style={{ color: primaryColor }}>Studio.</h2>
          <h1 className={`font-serif ${isMobile ? 'text-4xl' : isTablet ? 'text-6xl' : 'text-6xl md:text-9xl'} mb-6 uppercase tracking-widest`} style={textColor ? { color: textColor } : undefined}>
            {headline}
          </h1>
          {avatarUrl && (
            <div className={`w-full max-w-4xl ${isMobile ? 'h-52' : isTablet ? 'h-72' : 'h-[40vh] md:h-[60vh]'} overflow-hidden mb-8 shadow-2xl rounded-sm`}>
              <img src={avatarUrl} alt="Couture" className="w-full h-full object-cover object-top" />
            </div>
          )}
          <p className={`font-light ${isMobile ? 'text-base' : 'text-xl md:text-3xl'} max-w-3xl mx-auto mb-8 leading-relaxed`} style={textMutedColor ? { color: textMutedColor } : undefined}>
            {subheadline}
          </p>
          <a href="#projects" className="border-b-2 pb-1 uppercase tracking-widest font-semibold transition text-sm" style={{ color: primaryColor, borderColor: primaryColor }}>
            {ctaText}
          </a>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------
  // 10. SPATIAL ARCHITECT STUDIO (Blueprint, Technical, Wide)
  // ---------------------------------------------------------
  if (templateId === 'spatial-architect-studio') {
    return (
      <section className={`relative ${isSmall ? 'min-h-[auto] pt-14 pb-12 px-4' : 'min-h-[90vh] pt-32 pb-16 px-6'} flex items-center overflow-hidden`}>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-6 left-6 text-[10px] uppercase font-mono tracking-widest border p-1.5" style={{ color: primaryColor, borderColor: `${primaryColor}50` }}>
          Project: 001 // Scale: 1:100
        </div>
        <div className={`max-w-7xl mx-auto w-full relative z-10 grid ${isSmall ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-12 gap-8'} items-end pb-8 pt-12 border-b`} style={{ borderColor: `${primaryColor}40` }}>
          <div className={isSmall ? '' : 'md:col-span-8'}>
            <h1 className={`font-sans font-bold ${isMobile ? 'text-3xl' : isTablet ? 'text-5xl' : 'text-5xl md:text-7xl'} mb-4 uppercase tracking-tight text-white`} style={textColor ? { color: textColor } : undefined}>
              {headline}
            </h1>
            <p className={`text-slate-300 ${isMobile ? 'text-sm' : 'text-lg md:text-xl'} font-light max-w-2xl`} style={textMutedColor ? { color: textMutedColor } : undefined}>
              {subheadline}
            </p>
          </div>
          <div className={isSmall ? 'flex justify-start' : 'md:col-span-4 flex flex-col md:items-end'}>
            <a href="#projects" className="border px-6 py-2.5 text-xs uppercase tracking-widest transition" style={{ borderColor: primaryColor, backgroundColor: `${primaryColor}20`, color: primaryColor }}>
              {ctaText}
            </a>
          </div>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------
  // FALLBACK (Original Default)
  // ---------------------------------------------------------
  return (
    <section
      className={`relative flex items-center overflow-hidden ${
        isMobile ? 'pt-8 pb-10 px-4 min-h-[auto]' : isTablet ? 'pt-12 pb-14 px-6 min-h-[auto]' : 'pt-20 pb-16 px-6 min-h-[85vh]'
      }`}
      style={{ backgroundColor: theme.backgroundColor || undefined }}
    >
      {bgVideoUrl && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video src={bgVideoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>
      )}
      <div
        className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: `${theme.primaryColor || '#6366f1'}28` }}
      />
      <div
        className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: `${theme.secondaryColor || '#a855f7'}1a` }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className={`grid ${isSmall ? 'grid-cols-1 text-center' : 'grid-cols-1 lg:grid-cols-2 text-left'} gap-8 items-center`}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className={isSmall ? 'order-2' : ''}>
            <h1
              className={`font-heading font-black text-white mb-4 leading-[1.1] tracking-tight ${
                isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl md:text-7xl'
              }`}
              style={theme.textColor ? { color: theme.textColor } : undefined}
            >
              {headline}
            </h1>
            <p
              className={`text-slate-300 mb-6 leading-relaxed mx-auto ${
                isMobile ? 'text-sm max-w-sm' : isTablet ? 'text-base max-w-md' : 'text-lg md:text-xl max-w-xl'
              }`}
              style={theme.textMutedColor ? { color: theme.textMutedColor } : undefined}
            >
              {subheadline}
            </p>
            <div className={`flex ${isSmall ? 'justify-center' : 'justify-start'}`}>
              <a
                href="#projects"
                className="btn-primary text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 group w-max text-sm"
                style={{
                  background: `linear-gradient(135deg, ${theme.primaryColor || '#6366f1'} 0%, ${theme.secondaryColor || '#8b5cf6'} 100%)`
                }}
              >
                {ctaText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
          {avatarUrl && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }} className={`relative justify-self-center ${isSmall ? 'order-1 mb-2' : 'lg:justify-self-end'}`}>
              <div className={`rounded-full glass-dark border border-white/[0.08] relative overflow-hidden ${
                isMobile ? 'w-40 h-40' : isTablet ? 'w-52 h-52' : 'w-[300px] h-[300px] md:w-[450px] md:h-[450px]'
              }`}>
                <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
