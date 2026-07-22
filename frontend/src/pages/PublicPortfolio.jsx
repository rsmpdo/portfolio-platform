import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPublicLayout } from '../store/layoutSlice';
import ComponentRenderer from '../components/portfolio/ComponentRenderer';
import Footer from '../components/common/Footer';
import { Loader2, AlertCircle, ArrowLeft, Sparkles } from 'lucide-react';

export default function PublicPortfolio() {
  const { handle } = useParams();
  const dispatch = useDispatch();
  const { publicLayout, loading, error } = useSelector((state) => state.layout);

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

  if (error || !publicLayout) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="glass gradient-border rounded-3xl p-10 max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="font-heading font-bold text-2xl text-white mb-3">Portfolio Not Found</h1>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            The portfolio at <span className="text-indigo-400 font-mono">/p/{handle}</span> doesn't exist yet or has been set to private.
          </p>
          <Link
            to="/"
            className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  const { title, components, theme } = publicLayout;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Minimal top bar for public portfolio */}
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
            {title && (
              <span className="text-xs text-slate-500 font-semibold tracking-wide uppercase">
                {title}
              </span>
            )}
            <Link
              to="/register"
              className="btn-primary px-3 py-1.5 rounded-lg text-white text-xs font-bold"
            >
              Create Yours Free
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-20">
        {components
          ?.filter((comp) => comp.isVisible !== false)
          ?.sort((a, b) => (a.order || 0) - (b.order || 0))
          ?.map((comp) => (
            <ComponentRenderer key={comp.id} component={comp} isEditing={false} />
          ))}
      </main>

      <Footer />
    </div>
  );
}
