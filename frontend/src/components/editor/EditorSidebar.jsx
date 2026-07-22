import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectComponent,
  updateComponentVisibility,
  addComponent,
  removeComponent,
  reorderComponents,
  updateTheme,
  updateHandle,
  saveUserLayout
} from '../../store/layoutSlice';
import {
  Layers,
  Plus,
  Eye,
  EyeOff,
  Trash2,
  MoveUp,
  MoveDown,
  Palette,
  Globe,
  Save,
  Check,
  Sparkles,
  ExternalLink
} from 'lucide-react';

const AVAILABLE_COMPONENTS = [
  { type: 'HeroBanner', title: 'Hero Banner', icon: '✨' },
  { type: 'AboutMe', title: 'About Me', icon: '👤' },
  { type: 'ProjectsGrid', title: 'Projects Grid', icon: '🚀' },
  { type: 'ExperienceTimeline', title: 'Experience Timeline', icon: '💼' },
  { type: 'SkillsCloud', title: 'Skills Cloud', icon: '⚡' },
  { type: 'ContactSection', title: 'Contact Section', icon: '✉️' },
  { type: 'MediaGallery', title: 'Media Gallery', icon: '🖼️' }
];

export default function EditorSidebar() {
  const dispatch = useDispatch();
  const { activeLayout, selectedComponentId, isSaving, saveSuccess } = useSelector(
    (state) => state.layout
  );
  const [activeTab, setActiveTab] = useState('components'); // components | theme | settings

  if (!activeLayout) return null;

  const handleSave = () => {
    dispatch(saveUserLayout(activeLayout));
  };

  return (
    <aside className="w-80 h-full bg-slate-900 border-r border-slate-800 flex flex-col z-30">
      {/* Top Header & Save Button */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <span className="font-bold text-white text-sm">CMS Editor</span>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            saveSuccess
              ? 'bg-emerald-600 text-white'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
          }`}
        >
          {saveSuccess ? (
            <>
              <Check className="w-4 h-4" /> Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save & Publish'}
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950/50 p-1">
        <button
          onClick={() => setActiveTab('components')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
            activeTab === 'components'
              ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Structure</span>
        </button>
        <button
          onClick={() => setActiveTab('theme')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
            activeTab === 'theme'
              ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Theme</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
            activeTab === 'settings'
              ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Domain</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {activeTab === 'components' && (
          <>
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Active Sections
              </h3>
              <div className="space-y-2">
                {activeLayout.components?.map((comp, index) => {
                  const isSelected = comp.id === selectedComponentId;
                  return (
                    <div
                      key={comp.id}
                      onClick={() => dispatch(selectComponent(comp.id))}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition ${
                        isSelected
                          ? 'bg-indigo-950/40 border-indigo-500 text-white'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-sm">
                          {AVAILABLE_COMPONENTS.find((c) => c.type === comp.type)?.icon || '📌'}
                        </span>
                        <span className="text-xs font-semibold truncate">
                          {comp.title || comp.type}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        {/* Move Up */}
                        <button
                          disabled={index === 0}
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(reorderComponents({ sourceIndex: index, destinationIndex: index - 1 }));
                          }}
                          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white disabled:opacity-30"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        {/* Move Down */}
                        <button
                          disabled={index === activeLayout.components.length - 1}
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(reorderComponents({ sourceIndex: index, destinationIndex: index + 1 }));
                          }}
                          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white disabled:opacity-30"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                        {/* Toggle Visibility */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(updateComponentVisibility({ id: comp.id, isVisible: !comp.isVisible }));
                          }}
                          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                        >
                          {comp.isVisible ? (
                            <Eye className="w-3.5 h-3.5 text-indigo-400" />
                          ) : (
                            <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                          )}
                        </button>
                        {/* Delete Component */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(removeComponent(comp.id));
                          }}
                          className="p-1 hover:bg-red-500/20 rounded text-slate-400 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Add Section
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {AVAILABLE_COMPONENTS.map((item) => (
                  <button
                    key={item.type}
                    onClick={() => dispatch(addComponent({ type: item.type, title: item.title }))}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 flex items-center justify-between text-left transition group"
                  >
                    <span className="text-xs font-medium text-slate-300 group-hover:text-white">
                      {item.icon} {item.title}
                    </span>
                    <Plus className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'theme' && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Theme Colors</h3>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Primary Color</label>
              <input
                type="color"
                value={activeLayout.theme?.primaryColor || '#6366f1'}
                onChange={(e) => dispatch(updateTheme({ primaryColor: e.target.value }))}
                className="w-full h-10 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Secondary Color</label>
              <input
                type="color"
                value={activeLayout.theme?.secondaryColor || '#a855f7'}
                onChange={(e) => dispatch(updateTheme({ secondaryColor: e.target.value }))}
                className="w-full h-10 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer"
              />
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Custom Portfolio URL</h3>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Handle Slug</label>
              <div className="flex items-center">
                <span className="px-3 py-2 bg-slate-950 border border-r-0 border-slate-800 text-xs text-slate-500 rounded-l-lg">
                  /p/
                </span>
                <input
                  type="text"
                  value={activeLayout.handle || ''}
                  onChange={(e) => dispatch(updateHandle(e.target.value))}
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 text-xs text-white rounded-r-lg focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <a
                href={`/p/${activeLayout.handle}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <span>View Public Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
