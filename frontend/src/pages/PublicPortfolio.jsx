import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPublicLayout } from '../store/layoutSlice';
import ComponentRenderer from '../components/portfolio/ComponentRenderer';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Loader2, AlertCircle } from 'lucide-react';

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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (error || !publicLayout) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6 text-center">
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 max-w-md">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Portfolio Not Found</h1>
            <p className="text-slate-400 text-sm">
              The requested portfolio handle <span className="text-indigo-400 font-mono">/p/{handle}</span> does not exist or has been set to private.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { title, components, theme } = publicLayout;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1">
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
