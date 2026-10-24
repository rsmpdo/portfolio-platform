import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPublicLayout } from '../store/layoutSlice';
import ComponentRenderer from '../components/portfolio/ComponentRenderer';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import ShowcasePortfolio from './ShowcasePortfolio';
import { Loader2, Layers, Lock, Home } from 'lucide-react';

export default function PublicPortfolio() {
  const { handle } = useParams();
  const dispatch = useDispatch();
  const { publicLayout, loading } = useSelector((state) => state.layout);

  const lowerHandle = (handle || '').toLowerCase();
  const SYSTEM_SHOWCASE_HANDLES = ['alex', 'marcus', 'elena', 'demo', 'sample'];
  const isSystemShowcase = SYSTEM_SHOWCASE_HANDLES.includes(lowerHandle);

  useEffect(() => {
    if (handle && !isSystemShowcase) {
      dispatch(fetchPublicLayout(handle));
    }
  }, [handle, isSystemShowcase, dispatch]);

  useEffect(() => {
    if (!isSystemShowcase && publicLayout) {
      const { title, seo } = publicLayout;
      if (seo?.metaTitle || title) {
        document.title = seo?.metaTitle || `${title} | Portfolio`;
      }
    }
  }, [isSystemShowcase, publicLayout]);

  // System showcase handles render via the dedicated standalone ShowcasePortfolio viewer
  // (completely separate from Editor Templates / ComponentRenderer)
  if (isSystemShowcase) {
    return <ShowcasePortfolio overrideHandle={lowerHandle} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white gap-4">
        <div className="w-14 h-14 rounded-2xl btn-primary flex items-center justify-center glow-indigo animate-pulse">
          <Layers className="w-6 h-6 text-white" />
        </div>
        <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
        <p className="text-sm text-slate-500">Loading portfolio...</p>
      </div>
    );
  }

  // If user portfolio is not found / unpublished -> show Private lock screen
  if (!publicLayout) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
        <Header />
        <div className="max-w-md w-full glass gradient-border rounded-3xl p-8 relative shadow-2xl mt-20">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-white mb-2">Portfolio Unpublished</h2>
          <p className="text-sm text-slate-400 mb-6">
            The portfolio URL <span className="text-indigo-400 font-mono font-bold">/p/{handle}</span> is currently set to private / draft mode by its owner.
          </p>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 text-xs text-slate-400 mb-6 leading-relaxed">
            If you are the owner, open your <span className="text-white font-bold">Portfolio Editor</span> or <span className="text-white font-bold">Profile Settings</span> and click <span className="text-indigo-400 font-bold">"Publish Live"</span> to make this link publicly accessible.
          </div>
          <Link to="/" className="btn-primary w-full py-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2">
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  const { title, components, theme } = publicLayout;
  const hideBranding = theme?.hideBranding === true;

  return (
    <div 
      className="min-h-screen flex flex-col portfolio-theme-root transition-colors duration-300"
      style={{
        backgroundColor: theme?.backgroundColor || '#050811',
        color: theme?.textColor || '#f8fafc',
        fontFamily: theme?.fontFamily ? `'${theme.fontFamily}', sans-serif` : 'inherit',
        '--theme-primary': theme?.primaryColor || '#6366f1',
        '--theme-secondary': theme?.secondaryColor || '#a855f7',
        '--theme-bg': theme?.backgroundColor || '#050811',
        '--theme-surface': theme?.surfaceColor || '#111827',
        '--theme-text': theme?.textColor || '#f8fafc',
        '--theme-muted': theme?.textMutedColor || '#94a3b8',
        '--theme-font': theme?.fontFamily ? `'${theme.fontFamily}', sans-serif` : "'Plus Jakarta Sans', sans-serif"
      }}
    >
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 md:mx-8 mt-4">
          <div className="glass-dark rounded-2xl px-6 h-12 flex items-center justify-between shadow-xl shadow-black/20">
            {hideBranding ? (
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-sm text-white tracking-tight">
                  {title || 'Portfolio'}
                </span>
              </div>
            ) : (
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-7 h-7 rounded-lg btn-primary flex items-center justify-center">
                  <Layers className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-heading font-bold text-sm text-white tracking-tight">
                  Portfolio<span className="gradient-text">Craft</span>
                </span>
              </Link>
            )}

            <div className="flex items-center gap-3">
              {title && !hideBranding && (
                <span className="text-xs text-slate-400 font-semibold tracking-wide uppercase truncate max-w-[150px] sm:max-w-none">
                  {title}
                </span>
              )}
            </div>

            {!hideBranding && (
              <Link
                to="/register"
                className="btn-primary px-3 py-1.5 rounded-xl text-white text-xs font-bold"
              >
                Create Yours Free
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Components Stream */}
      <main className="flex-1 pt-20">
        {components
          ?.filter((comp) => comp.isVisible !== false)
          ?.sort((a, b) => (a.order || 0) - (b.order || 0))
          ?.map((comp) => (
            <ComponentRenderer 
              key={comp.id} 
              component={comp} 
              isEditing={false} 
              templateId={theme?.templateId} 
              accentColor={theme?.primaryColor || '#6366f1'}
              theme={theme || {}}
            />
          ))}
      </main>

      {hideBranding ? (
        <footer className="py-8 px-6 border-t border-white/5 text-center text-xs text-slate-500">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-heading font-semibold text-slate-400">{title || 'Portfolio'}</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>
        </footer>
      ) : (
        <Footer />
      )}
    </div>
  );
}
