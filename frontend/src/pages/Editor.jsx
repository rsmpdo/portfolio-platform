import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserLayout, selectComponent } from '../store/layoutSlice';
import EditorSidebar from '../components/editor/EditorSidebar';
import ComponentInspector from '../components/editor/ComponentInspector';
import ComponentRenderer from '../components/portfolio/ComponentRenderer';
import Header from '../components/common/Header';
import { Monitor, Tablet, Smartphone, Eye, Loader2, ExternalLink, Sparkles } from 'lucide-react';

export default function Editor() {
  const dispatch = useDispatch();
  const { activeLayout, selectedComponentId, loading, error } = useSelector((state) => state.layout);
  const [viewportMode, setViewportMode] = useState('desktop');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    dispatch(fetchUserLayout());
  }, [dispatch]);

  const getViewportWidth = () => {
    if (viewportMode === 'mobile') return 'max-w-sm';
    if (viewportMode === 'tablet') return 'max-w-2xl';
    return 'w-full';
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      <Header />

      {/* ─── Editor Toolbar ────────────────────────── */}
      <div className="h-14 border-b border-white/[0.06] glass-dark px-6 flex items-center justify-between mt-[72px]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="font-heading font-bold text-sm text-white">Portfolio Editor</span>
          </div>
          <div className="h-5 w-px bg-white/10" />
          {/* Viewport Switcher */}
          <div className="flex items-center glass p-1 rounded-xl">
            {[
              { mode: 'desktop', icon: Monitor, label: 'Desktop' },
              { mode: 'tablet', icon: Tablet, label: 'Tablet' },
              { mode: 'mobile', icon: Smartphone, label: 'Mobile' }
            ].map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => setViewportMode(mode)}
                className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition ${
                  viewportMode === mode
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={label}
              >
                <Icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {activeLayout?.handle && (
            <a
              href={`/p/${activeLayout.handle}`}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live</span>
            </a>
          )}
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              isPreviewMode
                ? 'btn-primary text-white'
                : 'btn-ghost text-slate-300 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isPreviewMode ? 'Exit Preview' : 'Preview'}</span>
          </button>
        </div>
      </div>

      {/* ─── Main Workspace ────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        {!isPreviewMode && <EditorSidebar />}

        {/* Canvas */}
        <main className="flex-1 overflow-y-auto bg-[#070a10] p-6 flex flex-col items-center">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
              <p className="text-sm text-slate-500">Loading your portfolio...</p>
            </div>
          ) : error ? (
            <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm max-w-md text-center">
              {error}
            </div>
          ) : (
            <div className={`transition-all duration-300 mx-auto ${getViewportWidth()}`}>
              {activeLayout?.components?.length === 0 ? (
                <div className="py-20 text-center">
                  <div className="w-20 h-20 rounded-3xl glass flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-8 h-8 text-indigo-400" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white mb-2">Start Building Your Portfolio</h3>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto">
                    Use the sidebar to add sections like Hero, About, Projects, and more. Your portfolio will come to life as you build.
                  </p>
                </div>
              ) : (
                activeLayout?.components?.map((comp) => (
                  <ComponentRenderer
                    key={comp.id}
                    component={comp}
                    isEditing={!isPreviewMode}
                    isSelected={comp.id === selectedComponentId}
                    onClick={() => !isPreviewMode && dispatch(selectComponent(comp.id))}
                  />
                ))
              )}
            </div>
          )}
        </main>

        {/* Right Inspector */}
        {!isPreviewMode && <ComponentInspector />}
      </div>
    </div>
  );
}
