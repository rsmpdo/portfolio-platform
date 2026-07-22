import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateComponentProps } from '../../store/layoutSlice';
import API from '../../services/api';
import { Upload, Image as ImageIcon, Sliders, Loader2 } from 'lucide-react';

export default function ComponentInspector() {
  const dispatch = useDispatch();
  const { activeLayout, selectedComponentId } = useSelector((state) => state.layout);
  const [uploading, setUploading] = useState(false);

  if (!activeLayout || !selectedComponentId) {
    return (
      <aside className="w-80 h-full bg-slate-900 border-l border-slate-800 p-6 flex flex-col items-center justify-center text-center">
        <Sliders className="w-8 h-8 text-slate-600 mb-2" />
        <h3 className="text-sm font-semibold text-slate-300">No Section Selected</h3>
        <p className="text-xs text-slate-500 mt-1">Click any section on the canvas or sidebar to customize its properties.</p>
      </aside>
    );
  }

  const selectedComp = activeLayout.components.find((c) => c.id === selectedComponentId);
  if (!selectedComp) return null;

  const props = selectedComp.props || {};

  const handlePropChange = (key, value) => {
    dispatch(
      updateComponentProps({
        id: selectedComp.id,
        props: { [key]: value }
      })
    );
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
    <aside className="w-80 h-full bg-slate-900 border-l border-slate-800 flex flex-col z-30">
      <div className="p-4 border-b border-slate-800 flex items-center gap-2">
        <Sliders className="w-4 h-4 text-indigo-400" />
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
          Edit {selectedComp.title || selectedComp.type}
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {selectedComp.type === 'HeroBanner' && (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Headline</label>
              <input
                type="text"
                value={props.headline || ''}
                onChange={(e) => handlePropChange('headline', e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-xs text-white rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Subheadline</label>
              <textarea
                rows={3}
                value={props.subheadline || ''}
                onChange={(e) => handlePropChange('subheadline', e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-xs text-white rounded-lg focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Avatar Image (Cloudinary CDN)</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={props.avatarUrl || ''}
                  onChange={(e) => handlePropChange('avatarUrl', e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 text-xs text-white rounded-lg focus:outline-none focus:border-indigo-500"
                  placeholder="https://..."
                />
                <label className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer transition">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, 'avatarUrl')}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">CTA Button Text</label>
              <input
                type="text"
                value={props.ctaText || ''}
                onChange={(e) => handlePropChange('ctaText', e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-xs text-white rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
          </>
        )}

        {selectedComp.type === 'AboutMe' && (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Section Heading</label>
              <input
                type="text"
                value={props.heading || ''}
                onChange={(e) => handlePropChange('heading', e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-xs text-white rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Bio Text</label>
              <textarea
                rows={5}
                value={props.bio || ''}
                onChange={(e) => handlePropChange('bio', e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-xs text-white rounded-lg focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>
          </>
        )}

        {selectedComp.type === 'ProjectsGrid' && (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Section Title</label>
              <input
                type="text"
                value={props.heading || ''}
                onChange={(e) => handlePropChange('heading', e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-xs text-white rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Projects List</h4>
              {props.items?.map((item, idx) => (
                <div key={idx} className="p-3 mb-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => {
                      const newItems = [...props.items];
                      newItems[idx] = { ...newItems[idx], title: e.target.value };
                      handlePropChange('items', newItems);
                    }}
                    placeholder="Project Title"
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 text-xs text-white rounded focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    value={item.description || ''}
                    onChange={(e) => {
                      const newItems = [...props.items];
                      newItems[idx] = { ...newItems[idx], description: e.target.value };
                      handlePropChange('items', newItems);
                    }}
                    placeholder="Project Description"
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 text-xs text-white rounded focus:outline-none resize-none"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {selectedComp.type === 'ContactSection' && (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Heading</label>
              <input
                type="text"
                value={props.heading || ''}
                onChange={(e) => handlePropChange('heading', e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-xs text-white rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Display Email</label>
              <input
                type="email"
                value={props.email || ''}
                onChange={(e) => handlePropChange('email', e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-xs text-white rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
