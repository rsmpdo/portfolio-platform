import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateComponentProps } from '../../store/layoutSlice';
import API from '../../services/api';
import { Upload, Image as ImageIcon, Sliders, Loader2, Pencil, X, Plus, Trash2 } from 'lucide-react';

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{label}</label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, ...rest }) {
  return (
    <input
      type="text"
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      className="input-field w-full px-3 py-2.5 rounded-xl text-xs"
      {...rest}
    />
  );
}

function TextArea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      rows={rows}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      className="input-field w-full px-3 py-2.5 rounded-xl text-xs resize-none"
    />
  );
}

export default function ComponentInspector() {
  const dispatch = useDispatch();
  const { activeLayout, selectedComponentId } = useSelector((state) => state.layout);
  const [uploading, setUploading] = useState(false);

  if (!activeLayout || !selectedComponentId) {
    return (
      <aside className="w-80 h-full glass-dark border-l border-white/[0.06] p-6 flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mb-4">
          <Sliders className="w-6 h-6 text-slate-600" />
        </div>
        <h3 className="font-heading font-bold text-sm text-slate-300 mb-1">No Section Selected</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Click any section on the canvas to customize its content, images, and settings.
        </p>
      </aside>
    );
  }

  const selectedComp = activeLayout.components.find((c) => c.id === selectedComponentId);
  if (!selectedComp) return null;

  const props = selectedComp.props || {};

  const handlePropChange = (key, value) => {
    dispatch(updateComponentProps({ id: selectedComp.id, props: { [key]: value } }));
  };

  const handleFileUpload = async (e, targetPropKey) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const res = await API.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        handlePropChange(targetPropKey, res.data.url);
      }
    } catch (err) {
      console.error('File upload error:', err);
      alert('Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <aside className="w-80 h-full glass-dark border-l border-white/[0.06] flex flex-col z-30">
      {/* Header */}
      <div className="p-4 border-b border-white/[0.06] flex items-center gap-2">
        <Pencil className="w-4 h-4 text-indigo-400" />
        <h3 className="font-heading font-bold text-xs text-white uppercase tracking-wider">
          Edit: {selectedComp.title || selectedComp.type}
        </h3>
      </div>

      {/* Properties */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">

        {/* ─── HeroBanner ────────────────────────── */}
        {selectedComp.type === 'HeroBanner' && (
          <>
            <Field label="Headline">
              <TextInput
                value={props.headline}
                onChange={(e) => handlePropChange('headline', e.target.value)}
                placeholder="I Design & Build Things People Love"
              />
            </Field>

            <Field label="Subheadline">
              <TextArea
                value={props.subheadline}
                onChange={(e) => handlePropChange('subheadline', e.target.value)}
                placeholder="A compelling description of what you do..."
              />
            </Field>

            <Field label="Avatar Image">
              <div className="flex items-center gap-2">
                <TextInput
                  value={props.avatarUrl}
                  onChange={(e) => handlePropChange('avatarUrl', e.target.value)}
                  placeholder="https://..."
                />
                <label className="p-2.5 rounded-xl btn-primary text-white cursor-pointer shrink-0">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'avatarUrl')} />
                </label>
              </div>
            </Field>

            <Field label="CTA Button Text">
              <TextInput
                value={props.ctaText}
                onChange={(e) => handlePropChange('ctaText', e.target.value)}
                placeholder="See My Work"
              />
            </Field>

            <Field label="GitHub URL">
              <TextInput
                value={props.githubUrl}
                onChange={(e) => handlePropChange('githubUrl', e.target.value)}
                placeholder="https://github.com/..."
              />
            </Field>

            <Field label="LinkedIn URL">
              <TextInput
                value={props.linkedinUrl}
                onChange={(e) => handlePropChange('linkedinUrl', e.target.value)}
                placeholder="https://linkedin.com/in/..."
              />
            </Field>
          </>
        )}

        {/* ─── AboutMe ────────────────────────────── */}
        {selectedComp.type === 'AboutMe' && (
          <>
            <Field label="Section Heading">
              <TextInput
                value={props.heading}
                onChange={(e) => handlePropChange('heading', e.target.value)}
                placeholder="The Story Behind the Work"
              />
            </Field>
            <Field label="Bio">
              <TextArea
                rows={6}
                value={props.bio}
                onChange={(e) => handlePropChange('bio', e.target.value)}
                placeholder="Write your story in a way that connects with visitors..."
              />
            </Field>
          </>
        )}

        {/* ─── ProjectsGrid ──────────────────────── */}
        {selectedComp.type === 'ProjectsGrid' && (
          <>
            <Field label="Section Title">
              <TextInput
                value={props.heading}
                onChange={(e) => handlePropChange('heading', e.target.value)}
                placeholder="Work That Speaks for Itself"
              />
            </Field>
            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Projects</h4>
              {props.items?.map((item, idx) => (
                <div key={idx} className="p-3 mb-3 glass rounded-xl border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">Project {idx + 1}</span>
                    <button
                      onClick={() => {
                        const newItems = props.items.filter((_, i) => i !== idx);
                        handlePropChange('items', newItems);
                      }}
                      className="p-1 rounded hover:bg-red-500/10 text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <TextInput
                    value={item.title}
                    onChange={(e) => {
                      const newItems = [...props.items];
                      newItems[idx] = { ...newItems[idx], title: e.target.value };
                      handlePropChange('items', newItems);
                    }}
                    placeholder="Project Title"
                  />
                  <TextArea
                    rows={2}
                    value={item.description}
                    onChange={(e) => {
                      const newItems = [...props.items];
                      newItems[idx] = { ...newItems[idx], description: e.target.value };
                      handlePropChange('items', newItems);
                    }}
                    placeholder="What makes this project special?"
                  />
                  <TextInput
                    value={item.imageUrl}
                    onChange={(e) => {
                      const newItems = [...props.items];
                      newItems[idx] = { ...newItems[idx], imageUrl: e.target.value };
                      handlePropChange('items', newItems);
                    }}
                    placeholder="Image URL"
                  />
                  <TextInput
                    value={item.liveUrl}
                    onChange={(e) => {
                      const newItems = [...props.items];
                      newItems[idx] = { ...newItems[idx], liveUrl: e.target.value };
                      handlePropChange('items', newItems);
                    }}
                    placeholder="Live Demo URL"
                  />
                </div>
              ))}
              <button
                onClick={() => {
                  const newItems = [...(props.items || []), { id: `p${Date.now()}`, title: '', description: '', imageUrl: '', tags: [] }];
                  handlePropChange('items', newItems);
                }}
                className="w-full py-2.5 rounded-xl btn-ghost text-xs font-semibold flex items-center justify-center gap-1.5 text-slate-400 hover:text-white"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>
          </>
        )}

        {/* ─── ContactSection ────────────────────── */}
        {selectedComp.type === 'ContactSection' && (
          <>
            <Field label="Heading">
              <TextInput
                value={props.heading}
                onChange={(e) => handlePropChange('heading', e.target.value)}
                placeholder="Ready to Create Something Great?"
              />
            </Field>
            <Field label="Display Email">
              <TextInput
                type="email"
                value={props.email}
                onChange={(e) => handlePropChange('email', e.target.value)}
                placeholder="hello@yoursite.com"
              />
            </Field>
            <Field label="Location">
              <TextInput
                value={props.location}
                onChange={(e) => handlePropChange('location', e.target.value)}
                placeholder="Available Worldwide"
              />
            </Field>
          </>
        )}

        {/* ─── ExperienceTimeline ────────────────── */}
        {selectedComp.type === 'ExperienceTimeline' && (
          <>
            <Field label="Section Heading">
              <TextInput
                value={props.heading}
                onChange={(e) => handlePropChange('heading', e.target.value)}
                placeholder="Where I've Made an Impact"
              />
            </Field>
          </>
        )}

        {/* ─── SkillsCloud ───────────────────────── */}
        {selectedComp.type === 'SkillsCloud' && (
          <>
            <Field label="Section Heading">
              <TextInput
                value={props.heading}
                onChange={(e) => handlePropChange('heading', e.target.value)}
                placeholder="Tools of the Trade"
              />
            </Field>
          </>
        )}

        {/* ─── TestimonialsCarousel ───────────────── */}
        {selectedComp.type === 'TestimonialsCarousel' && (
          <>
            <Field label="Section Heading">
              <TextInput
                value={props.heading}
                onChange={(e) => handlePropChange('heading', e.target.value)}
                placeholder="Don't Take My Word For It"
              />
            </Field>
          </>
        )}

        {/* ─── MediaGallery ──────────────────────── */}
        {selectedComp.type === 'MediaGallery' && (
          <>
            <Field label="Section Heading">
              <TextInput
                value={props.heading}
                onChange={(e) => handlePropChange('heading', e.target.value)}
                placeholder="Visual Showcase"
              />
            </Field>
            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Media Tiles</h4>
              {props.items?.map((item, idx) => (
                <div key={idx} className="p-3 mb-3 glass rounded-xl border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">Tile {idx + 1}</span>
                    <button
                      onClick={() => {
                        const newItems = props.items.filter((_, i) => i !== idx);
                        handlePropChange('items', newItems);
                      }}
                      className="p-1 rounded hover:bg-red-500/10 text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <TextInput
                    value={item.title}
                    onChange={(e) => {
                      const newItems = [...props.items];
                      newItems[idx] = { ...newItems[idx], title: e.target.value };
                      handlePropChange('items', newItems);
                    }}
                    placeholder="Title (e.g., Brand Guidelines)"
                  />
                  <TextArea
                    rows={2}
                    value={item.description}
                    onChange={(e) => {
                      const newItems = [...props.items];
                      newItems[idx] = { ...newItems[idx], description: e.target.value };
                      handlePropChange('items', newItems);
                    }}
                    placeholder="Description"
                  />
                  <div className="flex items-center gap-2">
                    <TextInput
                      value={item.url}
                      onChange={(e) => {
                        const newItems = [...props.items];
                        newItems[idx] = { ...newItems[idx], url: e.target.value };
                        handlePropChange('items', newItems);
                      }}
                      placeholder="Image/Video URL"
                    />
                    <label className="p-2.5 rounded-xl btn-primary text-white cursor-pointer shrink-0">
                      <Upload className="w-4 h-4" />
                      <input type="file" accept="image/*,video/*" className="hidden" onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const formData = new FormData();
                        formData.append('file', file);
                        try {
                          setUploading(true);
                          const res = await API.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                          if (res.data.success) {
                            const newItems = [...props.items];
                            newItems[idx] = { ...newItems[idx], url: res.data.url };
                            handlePropChange('items', newItems);
                          }
                        } catch (err) {
                          alert('Upload failed');
                        } finally {
                          setUploading(false);
                        }
                      }} />
                    </label>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const newItems = [...(props.items || []), { id: `m${Date.now()}`, title: '', description: '', type: 'image', url: '' }];
                  handlePropChange('items', newItems);
                }}
                className="w-full py-2.5 rounded-xl btn-ghost text-xs font-semibold flex items-center justify-center gap-1.5 text-slate-400 hover:text-white"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Media</span>
              </button>
            </div>
          </>
        )}

      </div>
    </aside>
  );
}
