import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPublicLayout } from '../store/layoutSlice';
import ComponentRenderer from '../components/portfolio/ComponentRenderer';
import Footer from '../components/common/Footer';
import { Loader2, Sparkles, UserCheck } from 'lucide-react';
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

  // Determine appropriate sample portfolio fallback based on handle requested
  const lowerHandle = (handle || '').toLowerCase();
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
            <ComponentRenderer key={comp.id} component={comp} isEditing={false} />
          ))}
      </main>

      <Footer />
    </div>
  );
}
