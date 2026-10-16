import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, Zap, ShieldCheck } from 'lucide-react';

export default function AdvancedMetrics({ props = {}, templateId, viewportMode }) {
  const {
    heading = 'Impact & Scale',
    metrics = [
      { id: 'm1', label: 'Revenue Generated', value: '$10M+', icon: 'trending' },
      { id: 'm2', label: 'Active Users', value: '2.5M', icon: 'users' },
      { id: 'm3', label: 'Global Awards', value: '14', icon: 'target' }
    ],
    isStudioFeature = true
  } = props;

  const isMobile = viewportMode === 'mobile';
  const isTablet = viewportMode === 'tablet';
  const isSmall = isMobile || isTablet;

  const getIcon = (iconStr) => {
    switch (iconStr) {
      case 'trending': return <TrendingUp className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8 md:w-12 md:h-12'} opacity-50`} />;
      case 'users': return <Users className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8 md:w-12 md:h-12'} opacity-50`} />;
      case 'target': return <Target className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8 md:w-12 md:h-12'} opacity-50`} />;
      default: return <Zap className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8 md:w-12 md:h-12'} opacity-50`} />;
    }
  };

  // ---------------------------------------------------------
  // AGENCY & COUTURE (Studio Tier)
  // ---------------------------------------------------------
  if (templateId === 'global-agency-studio' || templateId === 'haute-couture-studio') {
    return (
      <section className={`${isSmall ? 'py-14 px-4' : 'py-24 px-6'} bg-slate-900 border-y border-white/5 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] bg-slate-500/10 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`flex items-center gap-4 ${isSmall ? 'mb-8' : 'mb-16'}`}>
            <h2 className={`font-heading font-black ${isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl md:text-7xl'} text-white uppercase tracking-tighter`}>{heading}</h2>
            {isStudioFeature && (
              <div className="badge badge-amber hidden sm:flex items-center gap-1.5 ml-auto text-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Studio Exclusive</span>
              </div>
            )}
          </div>
          
          <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-3 md:gap-12'}`}>
            {metrics.map((metric, idx) => (
              <motion.div 
                key={metric.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="border-l-4 border-white pl-6 py-3"
              >
                <div className="text-slate-500 mb-4">{getIcon(metric.icon)}</div>
                <h3 className={`${isMobile ? 'text-4xl' : isTablet ? 'text-4xl' : 'text-5xl md:text-7xl'} font-bold text-white mb-2`}>{metric.value}</h3>
                <p className="text-sm md:text-base text-slate-400 font-medium tracking-wide uppercase">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------
  // ARCHITECT & LABS (Studio Tier)
  // ---------------------------------------------------------
  return (
    <section className={`${isSmall ? 'py-12 px-4' : 'py-20 px-6'} font-mono bg-black text-emerald-500 border-t border-emerald-500/30 relative`}>
      <div className="max-w-6xl mx-auto">
        <div className={`flex items-center justify-between ${isSmall ? 'mb-8 pb-4' : 'mb-16 pb-6'} border-b border-emerald-500/30`}>
          <h2 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} text-emerald-400 uppercase tracking-widest`}>{heading}_</h2>
          {isStudioFeature && <span className="text-[10px] uppercase bg-emerald-950 px-2.5 py-0.5 border border-emerald-500/50">{templateId.includes('pro') ? 'Pro.Tier' : 'Studio.Tier'}</span>}
        </div>
        
        <div className={`grid gap-5 ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`}>
          {metrics.map((metric, idx) => (
            <motion.div 
              key={metric.id || idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`border border-emerald-500/30 ${isMobile ? 'p-5' : 'p-8'} bg-emerald-950/10 hover:bg-emerald-900/20 transition group`}
            >
              <div className="text-emerald-500/50 mb-4 group-hover:text-emerald-400 transition-colors">{getIcon(metric.icon)}</div>
              <div className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-black text-white mb-3 glow-text`}>{metric.value}</div>
              <div className="text-xs uppercase tracking-widest text-emerald-400/80">[{metric.label}]</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
