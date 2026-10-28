import React from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Globe,
  Mail,
  MessageCircle,
  Send,
  Share2,
  ExternalLink,
  ArrowUpRight,
  Palette,
  BookOpen,
  Video,
  Code2
} from 'lucide-react';

const PLATFORM_META = {
  github: { label: 'GitHub', icon: Github, color: '#f8fafc' },
  linkedin: { label: 'LinkedIn', icon: Linkedin, color: '#38bdf8' },
  twitter: { label: 'X / Twitter', icon: Twitter, color: '#94a3b8' },
  instagram: { label: 'Instagram', icon: Instagram, color: '#f472b6' },
  youtube: { label: 'YouTube', icon: Youtube, color: '#f87171' },
  dribbble: { label: 'Dribbble', icon: Palette, color: '#ec4899' },
  behance: { label: 'Behance', icon: Palette, color: '#60a5fa' },
  medium: { label: 'Medium / Blog', icon: BookOpen, color: '#a7f3d0' },
  discord: { label: 'Discord', icon: MessageCircle, color: '#818cf8' },
  telegram: { label: 'Telegram', icon: Send, color: '#38bdf8' },
  whatsapp: { label: 'WhatsApp', icon: MessageCircle, color: '#34d399' },
  facebook: { label: 'Facebook', icon: Share2, color: '#60a5fa' },
  tiktok: { label: 'TikTok', icon: Video, color: '#f43f5e' },
  leetcode: { label: 'LeetCode / Code', icon: Code2, color: '#fbbf24' },
  email: { label: 'Email', icon: Mail, color: '#a5b4fc' },
  website: { label: 'Website', icon: Globe, color: '#818cf8' }
};

function formatHref(url = '', platform = '') {
  const trimmed = String(url || '').trim();
  if (!trimmed) return '#';
  if (platform === 'email' && !trimmed.startsWith('mailto:') && trimmed.includes('@')) {
    return `mailto:${trimmed}`;
  }
  if (/^(https?:\/\/|mailto:|tel:)/i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export default function SocialLinks({ props = {}, templateId, viewportMode, theme = {} }) {
  const {
    heading = 'Connect & Follow',
    subheading = 'Find me across platforms and social channels.',
    name = '',
    avatarUrl = '',
    links = []
  } = props;

  const isMobile = viewportMode === 'mobile';
  const isTablet = viewportMode === 'tablet';
  const isSmall = isMobile || isTablet;

  const primaryColor = theme.primaryColor || '#6366f1';
  const secondaryColor = theme.secondaryColor || '#a855f7';
  const textColor = theme.textColor;
  const textMutedColor = theme.textMutedColor;

  const activeLinks = Array.isArray(links) ? links.filter((l) => l && (l.url || l.label || l.platform)) : [];

  // ---------------------------------------------------------
  // CYBER & AI (Terminal Grid, Monospace)
  // ---------------------------------------------------------
  if (templateId === 'dark-cyber' || templateId === 'ai-neural-labs-pro') {
    return (
      <section className={`${isSmall ? 'py-12 px-4' : 'py-20 px-6'} font-mono bg-[#050505]`}>
        <div className="max-w-5xl mx-auto border border-emerald-500/30 p-6 md:p-10 bg-emerald-950/5">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8 border-b border-emerald-500/20 pb-6">
            {avatarUrl && (
              <div className="w-24 h-24 md:w-28 md:h-28 border-2 border-emerald-500/50 overflow-hidden shrink-0">
                <img src={avatarUrl} alt={name || heading} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="text-center md:text-left">
              <h2 className="text-xl md:text-2xl text-emerald-400 uppercase tracking-widest">
                &gt; {heading}_
              </h2>
              {name && <p className="text-white text-sm font-bold mt-1">{name}</p>}
              {subheading && <p className="text-emerald-500/70 text-xs md:text-sm mt-1">{subheading}</p>}
            </div>
          </div>

          <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`}>
            {activeLinks.map((item, idx) => {
              const meta = PLATFORM_META[item.platform] || PLATFORM_META.website;
              const Icon = meta.icon;
              return (
                <a
                  key={item.id || idx}
                  href={formatHref(item.url, item.platform)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 border border-emerald-500/30 bg-black/60 hover:border-emerald-400 hover:bg-emerald-500/10 transition group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs text-emerald-300 font-bold uppercase truncate">
                      {item.label || meta.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500/60 group-hover:text-emerald-300 shrink-0" />
                </a>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------
  // EDITORIAL & COUTURE (High Contrast Minimal)
  // ---------------------------------------------------------
  if (templateId === 'minimalist-editorial' || templateId === 'haute-couture-studio') {
    return (
      <section className="py-20 px-6 bg-white text-black border-b-4 border-black">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              {avatarUrl && (
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-black shrink-0">
                  <img src={avatarUrl} alt={name || heading} className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <h2 className="font-serif text-4xl md:text-6xl uppercase tracking-tighter text-black">
                  {heading}
                </h2>
                {name && <p className="font-bold text-base uppercase tracking-widest mt-1">{name}</p>}
                {subheading && <p className="text-slate-600 text-sm md:text-base mt-1 font-light">{subheading}</p>}
              </div>
            </div>
          </div>

          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`}>
            {activeLinks.map((item, idx) => {
              const meta = PLATFORM_META[item.platform] || PLATFORM_META.website;
              const Icon = meta.icon;
              return (
                <a
                  key={item.id || idx}
                  href={formatHref(item.url, item.platform)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border-2 border-black hover:bg-black hover:text-white transition group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="font-bold uppercase tracking-widest text-xs truncate">
                      {item.label || meta.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------
  // DEFAULT / MODERN GLASS (Adapts to custom theme colors)
  // ---------------------------------------------------------
  return (
    <section className={`${isSmall ? 'py-14 px-4' : 'py-20 px-6'} relative overflow-hidden`}>
      <div className="max-w-5xl mx-auto">
        <div className="glass-card gradient-border rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-10 text-center md:text-left">
            {avatarUrl && (
              <div
                className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 shrink-0 shadow-xl"
                style={{ borderColor: primaryColor }}
              >
                <img src={avatarUrl} alt={name || heading} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 border"
                style={{
                  backgroundColor: `${primaryColor}18`,
                  borderColor: `${primaryColor}40`,
                  color: primaryColor
                }}
              >
                <Share2 className="w-3 h-3" />
                <span>Social Profiles</span>
              </div>
              <h2
                className="font-heading font-black text-2xl md:text-4xl text-white"
                style={textColor ? { color: textColor } : undefined}
              >
                {heading}
              </h2>
              {name && (
                <p
                  className="text-sm font-bold mt-1"
                  style={{ color: primaryColor }}
                >
                  {name}
                </p>
              )}
              {subheading && (
                <p
                  className="text-slate-400 text-sm md:text-base mt-1.5 max-w-2xl"
                  style={textMutedColor ? { color: textMutedColor } : undefined}
                >
                  {subheading}
                </p>
              )}
            </div>
          </div>

          {activeLinks.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs border border-dashed border-white/10 rounded-2xl">
              No social links added yet. Select this section in the editor to add your social profiles.
            </div>
          ) : (
            <div className={`grid gap-3.5 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`}>
              {activeLinks.map((item, idx) => {
                const meta = PLATFORM_META[item.platform] || PLATFORM_META.website;
                const Icon = meta.icon;
                return (
                  <motion.a
                    key={item.id || idx}
                    href={formatHref(item.url, item.platform)}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-indigo-500/40 flex items-center justify-between gap-3 transition group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
                        style={{ backgroundColor: `${primaryColor}18`, color: primaryColor }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 text-left">
                        <div
                          className="font-bold text-sm text-white truncate"
                          style={textColor ? { color: textColor } : undefined}
                        >
                          {item.label || meta.label}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono truncate">
                          {meta.label}
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white shrink-0 transition" />
                  </motion.a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
