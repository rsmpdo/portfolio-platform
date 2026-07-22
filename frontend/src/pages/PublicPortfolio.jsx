import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPublicLayout } from '../store/layoutSlice';
import ComponentRenderer from '../components/portfolio/ComponentRenderer';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import { Loader2, Sparkles, UserCheck, Lock, Home } from 'lucide-react';
import { ALEX_PORTFOLIO, MARCUS_PORTFOLIO, ELENA_PORTFOLIO } from '../utils/sampleData';

export default function PublicPortfolio() {
  const { handle } = useParams();
  const dispatch = useDispatch();
  const { publicLayout, loading } = useSelector((state) => state.layout);

  useEffect(() => {
    if (handle) {
      dispatch(fetchPublicLayout(handle));
    }
  }, [handle, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white gap-4">
        <div className="w-14 h-14 rounded-2xl btn-primary flex items-center justify-center glow-indigo animate-pulse">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
        <p className="text-sm text-slate-500">Loading portfolio...</p>
      </div>
    );
  }

  const lowerHandle = (handle || '').toLowerCase();
  const SYSTEM_SAMPLE_HANDLES = ['alex', 'marcus', 'elena', 'demo', 'sample'];
  const isSystemSample = SYSTEM_SAMPLE_HANDLES.includes(lowerHandle);

  // If portfolio is not found / unpublished AND it is not a built-in demo handle -> show Private lock screen!
  if (!publicLayout && !isSystemSample) {
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

  let fallbackData = ALEX_PORTFOLIO;
  if (lowerHandle === 'demo' || lowerHandle === 'marcus') {
    fallbackData = MARCUS_PORTFOLIO;
  } else if (lowerHandle === 'sample' || lowerHandle === 'elena') {
    fallbackData = ELENA_PORTFOLIO;
  }

  const layoutToRender = publicLayout || fallbackData;
  const { title, components } = layoutToRender;
  const isSample = !publicLayout;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 md:mx-8 mt-4">
          <div className="glass-dark rounded-2xl px-6 h-12 flex items-center justify-between shadow-xl shadow-black/20">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg btn-primary flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-heading font-bold text-sm text-white tracking-tight">
                Portfolio<span className="gradient-text">Craft</span>
              </span>
            </Link>

            <div className="flex items-center gap-3">
              {isSample && (
                <div className="hidden sm:inline-flex items-center gap-1.5 badge badge-indigo text-xs">
                  <UserCheck className="w-3 h-3" />
                  <span>Sample Portfolio Demo</span>
                </div>
              )}
              {title && (
                <span className="text-xs text-slate-400 font-semibold tracking-wide uppercase truncate max-w-[150px] sm:max-w-none">
                  {title}
                </span>
              )}
            </div>

            <Link
              to="/register"
              className="btn-primary px-3 py-1.5 rounded-xl text-white text-xs font-bold"
            >
              Create Yours Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Components Stream */}
      <main className="flex-1 pt-20">
        {components
          ?.filter((comp) => comp.isVisible !== false)
          ?.sort((a, b) => (a.order || 0) - (b.order || 0))
          ?.map((comp) => (
            <ComponentRenderer key={comp.id} component={comp} isEditing={false} templateId={layoutToRender.theme?.templateId} />
          ))}
      </main>

      <Footer />
    </div>
  );
}
