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
  ExternalLink,
  GripVertical,
  Loader2
} from 'lucide-react';

const AVAILABLE_COMPONENTS = [
  { type: 'HeroBanner', title: 'Hero Banner', icon: '✨' },
  { type: 'AboutMe', title: 'About Me', icon: '👤' },
  { type: 'ProjectsGrid', title: 'Projects Grid', icon: '🚀' },
  { type: 'ExperienceTimeline', title: 'Experience Timeline', icon: '💼' },
  { type: 'SkillsCloud', title: 'Skills Cloud', icon: '⚡' },
  { type: 'TestimonialsCarousel', title: 'Testimonials', icon: '⭐' },
  { type: 'ContactSection', title: 'Contact Section', icon: '✉️' },
  { type: 'MediaGallery', title: 'Media Gallery', icon: '🖼️' }
];

export default function EditorSidebar() {
  const dispatch = useDispatch();
  const { activeLayout, selectedComponentId, isSaving, saveSuccess } = useSelector(
    (state) => state.layout
  );
  const [activeTab, setActiveTab] = useState('components');

  if (!activeLayout) return null;

  const handleSave = () => {
    dispatch(saveUserLayout(activeLayout));
  };

  return (
    <aside className="w-80 h-full glass-dark border-r border-white/[0.06] flex flex-col z-30">
      {/* Top Header & Save Button */}
      <div className="p-4 border-b border-white/[0.06] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="font-heading font-bold text-sm text-white">Sections</span>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            saveSuccess
              ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
              : 'btn-primary text-white'
          } disabled:opacity-60`}
        >
          {saveSuccess ? (
            <>
              <Check className="w-3.5 h-3.5" /> Saved!
            </>
          ) : isSaving ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" /> Publish
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/[0.06] p-1.5 gap-1">
        {[
          { key: 'components', icon: Layers, label: 'Structure' },
          { key: 'theme', icon: Palette, label: 'Theme' },
          { key: 'settings', icon: Globe, label: 'Domain' }
        ].map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition ${
              activeTab === key
                ? 'glass border border-indigo-500/30 text-indigo-400'
                : 'text-slate-500 hover:text-white'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {activeTab === 'components' && (
          <>
            {/* Active Sections */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                Active Sections
              </h3>
              <div className="space-y-2">
                {activeLayout.components?.map((comp, index) => {
                  const isSelected = comp.id === selectedComponentId;
                  return (
                    <div
                      key={comp.id}
                      onClick={() => dispatch(selectComponent(comp.id))}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition group ${
                        isSelected
                          ? 'glass border-indigo-500/40 text-white shadow-lg shadow-indigo-500/5'
                          : 'bg-white/[0.02] border-white/[0.06] text-slate-300 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <GripVertical className="w-3.5 h-3.5 text-slate-600 opacity-0 group-hover:opacity-100 transition flex-shrink-0" />
                        <span className="text-sm">
                          {AVAILABLE_COMPONENTS.find((c) => c.type === comp.type)?.icon || '📌'}
                        </span>
                        <span className="text-xs font-semibold truncate">
                          {comp.title || comp.type}
                        </span>
                      </div>

                      <div className="flex items-center gap-0.5">
                        <button
                          disabled={index === 0}
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(reorderComponents({ sourceIndex: index, destinationIndex: index - 1 }));
                          }}
                          className="p-1.5 rounded-lg hover:bg-white/[0.06] text-slate-500 hover:text-white disabled:opacity-20 transition"
                        >
                          <MoveUp className="w-3 h-3" />
                        </button>
                        <button
                          disabled={index === activeLayout.components.length - 1}
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(reorderComponents({ sourceIndex: index, destinationIndex: index + 1 }));
                          }}
                          className="p-1.5 rounded-lg hover:bg-white/[0.06] text-slate-500 hover:text-white disabled:opacity-20 transition"
                        >
                          <MoveDown className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(updateComponentVisibility({ id: comp.id, isVisible: !comp.isVisible }));
                          }}
                          className="p-1.5 rounded-lg hover:bg-white/[0.06] text-slate-500 hover:text-white transition"
                        >
                          {comp.isVisible ? (
                            <Eye className="w-3 h-3 text-indigo-400" />
                          ) : (
                            <EyeOff className="w-3 h-3 text-slate-600" />
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(removeComponent(comp.id));
                          }}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Add Section */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                Add Section
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {AVAILABLE_COMPONENTS.map((item) => (
                  <button
                    key={item.type}
                    onClick={() => dispatch(addComponent({ type: item.type, title: item.title }))}
                    className="p-3 rounded-xl glass border border-white/[0.06] hover:border-indigo-500/30 flex items-center justify-between text-left transition group"
                  >
                    <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition flex items-center gap-2.5">
                      <span className="text-base">{item.icon}</span>
                      {item.title}
                    </span>
                    <Plus className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition" />
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'theme' && (
          <div className="space-y-5">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Theme Colors</h3>
            {[
              { label: 'Primary Accent', key: 'primaryColor', default: '#6366f1' },
              { label: 'Secondary Accent', key: 'secondaryColor', default: '#a855f7' }
            ].map(({ label, key, default: def }) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-slate-400 mb-2">{label}</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={activeLayout.theme?.[key] || def}
                    onChange={(e) => dispatch(updateTheme({ [key]: e.target.value }))}
                    className="w-10 h-10 rounded-xl bg-transparent border-2 border-white/10 cursor-pointer"
                  />
                  <div className="flex-1 input-field px-3 py-2 rounded-xl text-xs">
                    {activeLayout.theme?.[key] || def}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-5">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Portfolio URL</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Handle (slug)</label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 glass border border-white/[0.06] border-r-0 text-xs text-slate-500 rounded-l-xl font-mono">
                  /p/
                </span>
                <input
                  type="text"
                  value={activeLayout.handle || ''}
                  onChange={(e) => dispatch(updateHandle(e.target.value))}
                  className="input-field flex-1 px-3 py-2.5 rounded-r-xl text-xs"
                  placeholder="your-name"
                />
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Your public portfolio URL will be{' '}
                <span className="text-indigo-400 font-mono">/p/{activeLayout.handle || 'your-name'}</span>
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06]">
              <a
                href={`/p/${activeLayout.handle}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl btn-ghost text-white text-xs font-bold flex items-center justify-center gap-2"
              >
                <span>Open Public Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
