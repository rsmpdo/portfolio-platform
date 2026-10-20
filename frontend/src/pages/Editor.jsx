import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchUserLayout, selectComponent, applyTemplate, fetchUserPortfolios, saveUserLayout } from '../store/layoutSlice';
import { templateLayouts } from '../data/templateLayouts';
import EditorSidebar from '../components/editor/EditorSidebar';
import ComponentInspector from '../components/editor/ComponentInspector';
import ComponentRenderer from '../components/portfolio/ComponentRenderer';
import Header from '../components/common/Header';
import { Monitor, Tablet, Smartphone, Eye, EyeOff, Loader2, ExternalLink, Sparkles, Layers, Save, Globe } from 'lucide-react';

export default function Editor() {
  const dispatch = useDispatch();
  const { activeLayout, userPortfolios, selectedComponentId, isSaving, saveSuccess, loading, error } = useSelector((state) => state.layout);
  const [viewportMode, setViewportMode] = useState('desktop');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch the user's layout and apply any requested ?template=
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const layoutId = params.get('id');
    const templateId = params.get('template');

    dispatch(fetchUserLayout({ layoutId, templateId })).then((res) => {
      // If a template was requested, auto-save it to MongoDB so it persists across reloads
      if (res.payload?.templateId && templateLayouts[res.payload.templateId]) {
        const { layout, templateId: tId } = res.payload;
        const template = templateLayouts[tId];
        if (template && layout) {
          const ts = Date.now();
          const persistedLayout = {
            ...layout,
            theme: {
              ...layout.theme,
              ...template.theme,
              templateId: tId
            },
            components: template.components.map((c, i) => ({
              id: `tpl_${ts}_${i}_${Math.random().toString(36).slice(2, 7)}`,
              type: c.type,
              title: c.title,
              order: i,
              isVisible: c.isVisible !== false,
              props: JSON.parse(JSON.stringify(c.props || {}))
            }))
          };
          dispatch(saveUserLayout(persistedLayout));
        }
        // Clean URL query silently without re-triggering React Router navigation
        window.history.replaceState(null, '', layoutId ? `/editor?id=${layoutId}` : '/editor');
      }
    });

    dispatch(fetchUserPortfolios());
  }, [dispatch, location.search]);

  const handleSaveDraft = () => {
    if (!activeLayout) return;
    dispatch(saveUserLayout({ ...activeLayout, isPublished: false }));
    dispatch(fetchUserPortfolios());
  };

  const handleTogglePublish = () => {
    if (!activeLayout) return;
    const newPublishState = !activeLayout.isPublished;
    dispatch(saveUserLayout({ ...activeLayout, isPublished: newPublishState }));
    dispatch(fetchUserPortfolios());
  };

  // Resolve editor theme from the active template and user custom colors
  const theme = activeLayout?.theme || {};
  const templateId = theme.templateId;
  const editorTheme = (templateId && templateLayouts[templateId]?.editorTheme) || null;
  const canvasBg = theme.backgroundColor || editorTheme?.canvasBg || '#070a10';
  const accentColor = theme.primaryColor || editorTheme?.accent || '#6366f1';
  const templateLabel = editorTheme?.label || null;

  const themeCssVariables = {
    '--theme-primary': theme.primaryColor || '#6366f1',
    '--theme-secondary': theme.secondaryColor || '#a855f7',
    '--theme-bg': theme.backgroundColor || '#070a10',
    '--theme-surface': theme.surfaceColor || '#111827',
    '--theme-text': theme.textColor || '#f8fafc',
    '--theme-muted': theme.textMutedColor || '#94a3b8',
    backgroundColor: theme.backgroundColor || '#070a10',
    color: theme.textColor || '#f8fafc'
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

          {/* Active Template Badge */}
          {templateLabel && (
            <div className="flex items-center gap-2">
              <div className="h-5 w-px bg-white/10" />
              <div
                className="flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-xs font-bold border"
                style={{
                  background: `${accentColor}22`,
                  borderColor: `${accentColor}55`,
                  color: accentColor
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: accentColor }}
                />
                {templateLabel}
              </div>
            </div>
          )}

          {userPortfolios?.length > 1 && (
            <div className="flex items-center gap-2">
              <div className="h-5 w-px bg-white/10" />
              <div className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-xl px-2.5 py-1 text-xs font-bold text-indigo-300">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <select
                  value={activeLayout?._id || ''}
                  onChange={(e) => {
                    dispatch(fetchUserLayout({ layoutId: e.target.value }));
                    navigate(`/editor?id=${e.target.value}`, { replace: true });
                  }}
                  className="bg-transparent text-indigo-300 font-bold text-xs border-none cursor-pointer focus:outline-none"
                >
                  {userPortfolios.map((p) => (
                    <option key={p._id} value={p._id} className="bg-slate-900 text-white font-medium">
                      {p.title} (/p/{p.handle})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Publication Status Badge */}
          {activeLayout && (
            <div className="flex items-center gap-2">
              <div className="h-5 w-px bg-white/10" />
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                activeLayout.isPublished
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${activeLayout.isPublished ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <span>{activeLayout.isPublished ? 'Live Published' : 'Draft Mode'}</span>
              </span>
            </div>
          )}

          <div className="h-5 w-px bg-white/10" />
          {/* Viewport Switcher */}
          <div className="flex items-center glass p-1 rounded-xl">
            {[
              { mode: 'desktop', icon: Monitor, label: 'Desktop' },
              { mode: 'tablet', icon: Tablet, label: 'Tablet (768px)' },
              { mode: 'mobile', icon: Smartphone, label: 'Mobile (390px)' }
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

        {/* Action Controls */}
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

          {/* Save Draft Button */}
          <button
            onClick={handleSaveDraft}
            disabled={isSaving}
            className="px-3.5 py-1.5 rounded-xl glass border border-white/10 hover:border-white/20 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 transition disabled:opacity-60"
            title="Save changes as unpublished draft"
          >
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5 text-indigo-400" />}
            <span>Save Draft</span>
          </button>

          {/* Publish / Unpublish Toggle */}
          <button
            onClick={handleTogglePublish}
            disabled={isSaving}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-lg ${
              activeLayout?.isPublished
                ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 shadow-amber-500/10'
                : 'btn-primary text-white shadow-indigo-500/20'
            }`}
          >
            {isSaving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : activeLayout?.isPublished ? (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                <span>Unpublish</span>
              </>
            ) : (
              <>
                <Globe className="w-3.5 h-3.5" />
                <span>Publish Live</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
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
        {!isPreviewMode && <EditorSidebar accentColor={accentColor} templateLabel={templateLabel} />}

        {/* Canvas — bg driven by active template */}
        <main
          className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col items-center transition-colors duration-500"
          style={{ background: canvasBg }}
        >
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
            <div className="w-full flex justify-center">
              {viewportMode === 'mobile' ? (
                /* ─── Mobile Phone Frame (390px) ─── */
                <div className="w-[390px] max-w-full my-4 bg-slate-950 rounded-[44px] border-[10px] border-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.85)] ring-1 ring-white/10 flex flex-col overflow-hidden transition-all duration-300">
                  {/* Phone Top Status Bar / Dynamic Island */}
                  <div className="h-8 bg-slate-900 border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0 select-none">
                    <span className="text-[11px] font-semibold text-slate-400">9:41</span>
                    <div className="w-20 h-4 bg-slate-950 rounded-full border border-slate-800 flex items-center justify-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-slate-900" />
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-950" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider">5G</span>
                  </div>

                  {/* Device Inner Content with isolated scrolling */}
                  <div 
                    className="w-full overflow-x-hidden overflow-y-auto max-h-[calc(100vh-240px)] portfolio-theme-root transition-colors duration-300"
                    style={themeCssVariables}
                  >
                    {activeLayout?.components?.length === 0 ? (
                      <div className="py-16 text-center px-4">
                        <Sparkles className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
                        <h3 className="font-heading font-bold text-base text-white mb-1">No Sections Added</h3>
                        <p className="text-slate-500 text-xs">Add sections using the sidebar.</p>
                      </div>
                    ) : (
                      activeLayout?.components?.map((comp) => (
                        <ComponentRenderer
                          key={comp.id}
                          component={comp}
                          isEditing={!isPreviewMode}
                          isSelected={comp.id === selectedComponentId}
                          onClick={() => !isPreviewMode && dispatch(selectComponent(comp.id))}
                          templateId={activeLayout?.theme?.templateId}
                          viewportMode={viewportMode}
                          accentColor={accentColor}
                          theme={theme}
                        />
                      ))
                    )}
                  </div>

                  {/* Phone Bottom Home Indicator */}
                  <div className="h-5 bg-slate-900 border-t border-white/5 flex items-center justify-center flex-shrink-0">
                    <div className="w-28 h-1 bg-slate-600 rounded-full" />
                  </div>
                </div>
              ) : viewportMode === 'tablet' ? (
                /* ─── Tablet Frame (768px) ─── */
                <div className="w-[768px] max-w-full my-4 bg-slate-950 rounded-[32px] border-[12px] border-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.85)] ring-1 ring-white/10 flex flex-col overflow-hidden transition-all duration-300">
                  {/* Tablet Top Camera Bezel */}
                  <div className="h-6 bg-slate-900 border-b border-white/5 flex items-center justify-center flex-shrink-0 select-none">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-700/60" />
                  </div>

                  {/* Device Inner Content with isolated scrolling */}
                  <div 
                    className="w-full overflow-x-hidden overflow-y-auto max-h-[calc(100vh-240px)] portfolio-theme-root transition-colors duration-300"
                    style={themeCssVariables}
                  >
                    {activeLayout?.components?.length === 0 ? (
                      <div className="py-20 text-center px-6">
                        <Sparkles className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
                        <h3 className="font-heading font-bold text-lg text-white mb-2">No Sections Added</h3>
                        <p className="text-slate-500 text-sm">Add sections using the sidebar.</p>
                      </div>
                    ) : (
                      activeLayout?.components?.map((comp) => (
                        <ComponentRenderer
                          key={comp.id}
                          component={comp}
                          isEditing={!isPreviewMode}
                          isSelected={comp.id === selectedComponentId}
                          onClick={() => !isPreviewMode && dispatch(selectComponent(comp.id))}
                          templateId={activeLayout?.theme?.templateId}
                          viewportMode={viewportMode}
                          accentColor={accentColor}
                          theme={theme}
                        />
                      ))
                    )}
                  </div>

                  {/* Tablet Bottom Home Indicator */}
                  <div className="h-4 bg-slate-900 border-t border-white/5 flex items-center justify-center flex-shrink-0">
                    <div className="w-36 h-1 bg-slate-600 rounded-full" />
                  </div>
                </div>
              ) : (
                /* ─── Desktop Standard View ─── */
                <div 
                  className="w-full max-w-6xl mx-auto portfolio-theme-root rounded-3xl p-4 md:p-8 transition-colors duration-300 shadow-2xl"
                  style={themeCssVariables}
                >
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
                        templateId={activeLayout?.theme?.templateId}
                        viewportMode={viewportMode}
                        accentColor={accentColor}
                        theme={theme}
                      />
                    ))
                  )}
                </div>
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
