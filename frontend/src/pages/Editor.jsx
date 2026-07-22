import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserLayout, selectComponent } from '../store/layoutSlice';
import EditorSidebar from '../components/editor/EditorSidebar';
import ComponentInspector from '../components/editor/ComponentInspector';
import ComponentRenderer from '../components/portfolio/ComponentRenderer';
import Header from '../components/common/Header';
import { Monitor, Tablet, Smartphone, Eye, Loader2 } from 'lucide-react';

export default function Editor() {
  const dispatch = useDispatch();
  const { activeLayout, selectedComponentId, loading, error } = useSelector((state) => state.layout);
  const [viewportMode, setViewportMode] = useState('desktop'); // desktop | tablet | mobile
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

      {/* Editor Sub-Header Toolbar */}
      <div className="h-12 border-b border-slate-800 bg-slate-900/60 px-6 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-300">Layout Preview Mode</span>
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewportMode('desktop')}
              className={`p-1 rounded ${viewportMode === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewportMode('tablet')}
              className={`p-1 rounded ${viewportMode === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Tablet View"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewportMode('mobile')}
              className={`p-1 rounded ${viewportMode === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Mobile View"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsPreviewMode(!isPreviewMode)}
          className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 font-semibold transition ${
            isPreviewMode
              ? 'bg-purple-600 border-purple-500 text-white'
              : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{isPreviewMode ? 'Exit Preview' : 'Interactive Preview'}</span>
        </button>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Structure Sidebar */}
        {!isPreviewMode && <EditorSidebar />}

        {/* Live Center Canvas */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-6 flex flex-col items-center">
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
          ) : error ? (
            <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          ) : (
            <div className={`transition-all duration-300 mx-auto ${getViewportWidth()}`}>
              {activeLayout?.components?.length === 0 ? (
                <div className="py-20 text-center text-slate-500">
                  <p>No components added yet. Use the sidebar to add your first portfolio section!</p>
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

        {/* Right Inspector Sidebar */}
        {!isPreviewMode && <ComponentInspector />}
      </div>
    </div>
  );
}
