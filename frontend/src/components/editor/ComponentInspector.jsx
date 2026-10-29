import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateComponentProps } from '../../store/layoutSlice';
import API from '../../services/api';
import { 
  Upload, 
  Image as ImageIcon, 
  Sliders, 
  Loader2, 
  Pencil, 
  X, 
  Plus, 
  Trash2, 
  Crown, 
  Layers, 
  ExternalLink,
  Video,
  Eye,
  FileCode,
  Tag
} from 'lucide-react';

function Field({ label, badge, tip, children }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</label>
        {badge && (
          <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            {badge}
          </span>
        )}
      </div>
      {children}
      {tip && <p className="text-[11px] text-slate-500">{tip}</p>}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, ...rest }) {
  return (
    <input
      type="text"
      value={value ?? ''}
      onChange={onChange}
      placeholder={placeholder}
      className="input-field w-full px-3 py-2 rounded-xl text-xs bg-slate-900/60 border border-white/10 text-slate-200 placeholder-slate-600 focus:border-indigo-500 transition"
      {...rest}
    />
  );
}

function TextArea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      rows={rows}
      value={value ?? ''}
      onChange={onChange}
      placeholder={placeholder}
      className="input-field w-full px-3 py-2 rounded-xl text-xs bg-slate-900/60 border border-white/10 text-slate-200 placeholder-slate-600 focus:border-indigo-500 transition resize-none"
    />
  );
}

function SelectInput({ value, onChange, options = [] }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="input-field w-full px-3 py-2 rounded-xl text-xs bg-slate-900 border border-white/10 text-slate-200 focus:border-indigo-500 cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-200">
          {opt.label}
        </option>
      ))}
    </select>
  );
}

// Reusable tag/skills chip editor
function TagEditor({ tags = [], onChange, placeholder = "Add tag & press Enter..." }) {
  const [inputVal, setInputVal] = useState('');

  const handleAdd = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    const itemsToAdd = trimmed.split(',').map(s => s.trim()).filter(Boolean);
    const updated = [...tags, ...itemsToAdd.filter(item => !tags.includes(item))];
    onChange(updated);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (index) => {
    const updated = tags.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1.5 rounded-xl bg-slate-900/50 border border-white/5">
        {tags && tags.length > 0 ? (
          tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-medium"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="hover:text-red-400 p-0.5 rounded transition"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          ))
        ) : (
          <span className="text-[11px] text-slate-600 italic px-2 py-0.5">No tags added yet</span>
        )}
      </div>
      <div className="flex items-center gap-1.5">
        <TextInput
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shrink-0 text-xs font-semibold"
          title="Add Tag"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// Fast client-side image optimizer to shrink multi-MB photos before upload
async function optimizeImageFile(file) {
  if (!file || !file.type.startsWith('image/') || file.type === 'image/gif' || file.size < 350 * 1024) {
    return file;
  }
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const maxDim = 1920;
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (blob && blob.size < file.size) {
            const optimizedFile = new File(
              [blob],
              file.name.replace(/\.[^.]+$/, '.webp'),
              { type: 'image/webp' }
            );
            resolve(optimizedFile);
          } else {
            resolve(file);
          }
        },
        'image/webp',
        0.84
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file);
    };
    img.src = objectUrl;
  });
}

// Reusable Image & Media Uploader field with isolated per-field upload state, direct CDN upload, and preview
function MediaUploadField({ value, onChange, accept = "image/*", placeholder = "https://...", onUploadComplete }) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const isVideoUrl = Boolean(
    value && (/\.(mp4|webm|mov)(\?.*)?$/i.test(value) || value.includes('/video/upload/'))
  );

  const handleLocalFileSelect = async (e) => {
    const rawFile = e.target.files?.[0];
    e.target.value = '';
    if (!rawFile) return;

    try {
      setIsUploading(true);
      setProgress(5);

      const file = await optimizeImageFile(rawFile);
      let uploadedUrl = '';
      let resourceType = file.type.startsWith('video/') ? 'video' : 'image';

      // 1. Try direct browser-to-Cloudinary upload (single network hop, much faster)
      try {
        const sigRes = await API.get('/upload/signature');
        if (sigRes.data?.success && sigRes.data.cloudName && sigRes.data.apiKey) {
          const { signature, timestamp, folder, cloudName, apiKey } = sigRes.data;
          const directForm = new FormData();
          directForm.append('file', file);
          directForm.append('api_key', apiKey);
          directForm.append('timestamp', timestamp);
          directForm.append('signature', signature);
          directForm.append('folder', folder);

          uploadedUrl = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`);
            xhr.upload.onprogress = (evt) => {
              if (evt.lengthComputable) {
                setProgress(Math.min(95, Math.round((evt.loaded / evt.total) * 100)));
              }
            };
            xhr.onload = () => {
              if (xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(xhr.responseText);
                resourceType = data.resource_type || resourceType;
                resolve(data.secure_url || data.url);
              } else {
                reject(new Error('Direct upload fallback'));
              }
            };
            xhr.onerror = () => reject(new Error('Direct upload network error'));
            xhr.send(directForm);
          });
        }
      } catch {
        // Fallback to backend proxy upload if direct upload is blocked
      }

      // 2. Fallback to backend /api/upload if direct upload wasn't used
      if (!uploadedUrl) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await API.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (evt) => {
            if (evt.total) {
              setProgress(Math.min(95, Math.round((evt.loaded / evt.total) * 100)));
            }
          }
        });
        if (res.data?.success) {
          uploadedUrl = res.data.url;
          resourceType = res.data.resource_type || resourceType;
        }
      }

      if (uploadedUrl) {
        setProgress(100);
        if (onUploadComplete) {
          onUploadComplete(uploadedUrl, resourceType);
        } else if (onChange) {
          onChange({ target: { value: uploadedUrl } });
        }
      }
    } catch (err) {
      console.error('File upload error:', err);
      alert('Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <TextInput
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <label
          className={`p-2 rounded-xl text-white shrink-0 transition flex items-center justify-center ${
            isUploading
              ? 'bg-indigo-600/50 cursor-wait'
              : 'bg-indigo-600/80 hover:bg-indigo-600 cursor-pointer'
          }`}
          title={isUploading ? `Uploading (${progress}%)` : 'Upload File'}
        >
          {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          <input
            type="file"
            accept={accept}
            disabled={isUploading}
            className="hidden"
            onChange={handleLocalFileSelect}
          />
        </label>
      </div>
      {isUploading && (
        <div className="space-y-1">
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all duration-200"
              style={{ width: `${Math.max(8, progress)}%` }}
            />
          </div>
          <p className="text-[10px] font-mono text-indigo-400">Uploading asset... {progress}%</p>
        </div>
      )}
      {value && (accept.includes('image') || accept.includes('video')) && (
        <div className="w-full h-20 rounded-xl overflow-hidden border border-white/10 bg-slate-900/80 relative group">
          {isVideoUrl ? (
            <video src={value} className="w-full h-full object-cover" muted playsInline preload="metadata" />
          ) : (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          )}
          <button
            type="button"
            onClick={() => onChange({ target: { value: '' } })}
            className="absolute top-1.5 right-1.5 p-1 rounded-md bg-black/70 text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
            title="Clear Media"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function ComponentInspector() {
  const dispatch = useDispatch();
  const { activeLayout, selectedComponentId } = useSelector((state) => state.layout);

  if (!activeLayout || !selectedComponentId) {
    return (
      <aside className="w-80 h-full glass-dark border-l border-white/[0.06] p-6 flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mb-4">
          <Sliders className="w-6 h-6 text-slate-600" />
        </div>
        <h3 className="font-heading font-bold text-sm text-slate-300 mb-1">No Section Selected</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Click any section on the canvas or in the structure sidebar to customize its content, images, and options.
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

  const templateId = activeLayout.theme?.templateId || 'default';

  return (
    <aside className="w-80 h-full glass-dark border-l border-white/[0.06] flex flex-col z-30">
      <div className="p-4 border-b border-white/[0.06] flex flex-col gap-1.5 bg-white/[0.01]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pencil className="w-4 h-4 text-indigo-400" />
            <h3 className="font-heading font-bold text-xs text-white uppercase tracking-wider">
              Edit: {selectedComp.title || selectedComp.type}
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 text-[10px] font-mono font-bold capitalize">
            {templateId.split('-')[0]}
          </span>
        </div>
        <p className="text-[11px] text-slate-500 font-medium">
          Customizing <span className="text-slate-300 font-semibold">{selectedComp.type}</span> under <span className="text-slate-300 capitalize">{templateId.replace(/-/g, ' ')}</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">

        {selectedComp.type === 'HeroBanner' && (
          <>
            <Field label="Template Tagline / Badge" tip="Small highlight pill displayed above the headline">
              <TextInput
                value={props.badgeText}
                onChange={(e) => handlePropChange('badgeText', e.target.value)}
                placeholder="e.g. Full Stack Engineer / Available for Q3"
              />
            </Field>

            <Field label="Headline">
              <TextInput
                value={props.headline}
                onChange={(e) => handlePropChange('headline', e.target.value)}
                placeholder="Hi, I'm Alex Morgan"
              />
            </Field>

            <Field label="Subheadline / Bio summary">
              <TextArea
                rows={4}
                value={props.subheadline}
                onChange={(e) => handlePropChange('subheadline', e.target.value)}
                placeholder="A compelling summary of what you do..."
              />
            </Field>

            <Field label="Profile Avatar Image">
              <MediaUploadField
                value={props.avatarUrl}
                onChange={(e) => handlePropChange('avatarUrl', e.target.value)}
                onUploadComplete={(url) => handlePropChange('avatarUrl', url)}
              />
            </Field>

            <Field label="Cinematic Video Background" badge="Studio Plan" tip="Looping background MP4 video for high-end studio aesthetic (50 MB max)">
              <MediaUploadField
                accept="video/*,image/*"
                value={props.bgVideoUrl}
                onChange={(e) => handlePropChange('bgVideoUrl', e.target.value)}
                placeholder="https://assets.example.com/ambient.mp4"
                onUploadComplete={(url) => handlePropChange('bgVideoUrl', url)}
              />
            </Field>

            <Field label="Call to Action (CTA) Text">
              <TextInput
                value={props.ctaText}
                onChange={(e) => handlePropChange('ctaText', e.target.value)}
                placeholder="Explore My Work"
              />
            </Field>
          </>
        )}

        {selectedComp.type === 'SocialLinks' && (
          <>
            <Field label="Section Heading">
              <TextInput
                value={props.heading}
                onChange={(e) => handlePropChange('heading', e.target.value)}
                placeholder="Connect & Follow"
              />
            </Field>

            <Field label="Subheading / Description">
              <TextArea
                rows={2}
                value={props.subheading}
                onChange={(e) => handlePropChange('subheading', e.target.value)}
                placeholder="Find me across platforms and social channels."
              />
            </Field>

            <Field label="Display Name (Optional)">
              <TextInput
                value={props.name}
                onChange={(e) => handlePropChange('name', e.target.value)}
                placeholder="e.g. Alex Morgan"
              />
            </Field>

            <Field label="User Photo / Profile Image">
              <MediaUploadField
                value={props.avatarUrl}
                onChange={(e) => handlePropChange('avatarUrl', e.target.value)}
                placeholder="https://images.unsplash.com/..."
                onUploadComplete={(url) => handlePropChange('avatarUrl', url)}
              />
            </Field>

            <div className="pt-2 border-t border-white/5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Selected Social Links ({(props.links || []).length})
                </h4>
              </div>

              {/* Quick-add buttons for popular social platforms */}
              <div className="mb-3 p-2.5 rounded-xl glass border border-white/[0.08] bg-white/[0.01]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Quick Add Platform
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { platform: 'github', label: 'GitHub', placeholderUrl: 'https://github.com/' },
                    { platform: 'linkedin', label: 'LinkedIn', placeholderUrl: 'https://linkedin.com/in/' },
                    { platform: 'twitter', label: 'X / Twitter', placeholderUrl: 'https://x.com/' },
                    { platform: 'instagram', label: 'Instagram', placeholderUrl: 'https://instagram.com/' },
                    { platform: 'youtube', label: 'YouTube', placeholderUrl: 'https://youtube.com/@' },
                    { platform: 'dribbble', label: 'Dribbble', placeholderUrl: 'https://dribbble.com/' },
                    { platform: 'behance', label: 'Behance', placeholderUrl: 'https://behance.net/' },
                    { platform: 'website', label: 'Website', placeholderUrl: 'https://' }
                  ].map((preset) => (
                    <button
                      key={preset.platform}
                      type="button"
                      onClick={() => {
                        const newLinks = [
                          ...(props.links || []),
                          {
                            id: `s_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
                            platform: preset.platform,
                            label: preset.label,
                            url: preset.placeholderUrl
                          }
                        ];
                        handlePropChange('links', newLinks);
                      }}
                      className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-white/5 hover:bg-indigo-500/20 text-slate-300 hover:text-indigo-300 border border-white/10 transition"
                    >
                      + {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {(props.links || []).map((link, idx) => (
                  <div
                    key={link.id || idx}
                    className="p-3.5 glass rounded-2xl border border-white/[0.08] space-y-2.5 bg-white/[0.01]"
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-xs font-bold text-indigo-400">
                        Social Link #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const newLinks = (props.links || []).filter((_, i) => i !== idx);
                          handlePropChange('links', newLinks);
                        }}
                        className="p-1 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-500 font-semibold block mb-1">
                          Platform
                        </label>
                        <SelectInput
                          value={link.platform || 'website'}
                          onChange={(e) => {
                            const selectedPlatform = e.target.value;
                            const defaultLabels = {
                              github: 'GitHub',
                              linkedin: 'LinkedIn',
                              twitter: 'X / Twitter',
                              instagram: 'Instagram',
                              youtube: 'YouTube',
                              facebook: 'Facebook',
                              dribbble: 'Dribbble',
                              behance: 'Behance',
                              medium: 'Medium',
                              discord: 'Discord',
                              telegram: 'Telegram',
                              whatsapp: 'WhatsApp',
                              tiktok: 'TikTok',
                              leetcode: 'LeetCode',
                              email: 'Email',
                              website: 'Website'
                            };
                            const newLinks = [...(props.links || [])];
                            newLinks[idx] = {
                              ...newLinks[idx],
                              platform: selectedPlatform,
                              label: defaultLabels[selectedPlatform] || newLinks[idx].label
                            };
                            handlePropChange('links', newLinks);
                          }}
                          options={[
                            { value: 'github', label: 'GitHub' },
                            { value: 'linkedin', label: 'LinkedIn' },
                            { value: 'twitter', label: 'X / Twitter' },
                            { value: 'instagram', label: 'Instagram' },
                            { value: 'youtube', label: 'YouTube' },
                            { value: 'dribbble', label: 'Dribbble' },
                            { value: 'behance', label: 'Behance' },
                            { value: 'medium', label: 'Medium' },
                            { value: 'discord', label: 'Discord' },
                            { value: 'telegram', label: 'Telegram' },
                            { value: 'whatsapp', label: 'WhatsApp' },
                            { value: 'facebook', label: 'Facebook' },
                            { value: 'tiktok', label: 'TikTok' },
                            { value: 'leetcode', label: 'LeetCode' },
                            { value: 'email', label: 'Email' },
                            { value: 'website', label: 'Website / Custom' }
                          ]}
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-500 font-semibold block mb-1">
                          Display Label
                        </label>
                        <TextInput
                          value={link.label}
                          onChange={(e) => {
                            const newLinks = [...(props.links || [])];
                            newLinks[idx] = { ...newLinks[idx], label: e.target.value };
                            handlePropChange('links', newLinks);
                          }}
                          placeholder="e.g. GitHub"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold block mb-1">
                        Profile URL
                      </label>
                      <TextInput
                        value={link.url}
                        onChange={(e) => {
                          const newLinks = [...(props.links || [])];
                          newLinks[idx] = { ...newLinks[idx], url: e.target.value };
                          handlePropChange('links', newLinks);
                        }}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const newLinks = [
                      ...(props.links || []),
                      {
                        id: `s_${Date.now()}`,
                        platform: 'website',
                        label: 'Website',
                        url: 'https://'
                      }
                    ];
                    handlePropChange('links', newLinks);
                  }}
                  className="w-full py-2.5 rounded-xl border border-dashed border-white/20 hover:border-indigo-500/50 hover:bg-indigo-500/5 text-xs font-semibold flex items-center justify-center gap-1.5 text-slate-400 hover:text-white transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Social Link</span>
                </button>
              </div>
            </div>
          </>
        )}

        {selectedComp.type === 'AboutMe' && (
          <>
            <Field label="Section Heading">
              <TextInput
                value={props.heading}
                onChange={(e) => handlePropChange('heading', e.target.value)}
                placeholder="The Story Behind the Work"
              />
            </Field>

            <Field label="Full Narrative / Bio">
              <TextArea
                rows={6}
                value={props.bio}
                onChange={(e) => handlePropChange('bio', e.target.value)}
                placeholder="Write your story in a way that connects with visitors and recruiters..."
              />
            </Field>

            <div className="pt-2 border-t border-white/5 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Metrics & Experience Stats</h4>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500 font-semibold block mb-1">Years Exp.</label>
                  <TextInput
                    value={props.experienceYears}
                    onChange={(e) => handlePropChange('experienceYears', e.target.value)}
                    placeholder="5+"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-semibold block mb-1">Projects</label>
                  <TextInput
                    value={props.completedProjects}
                    onChange={(e) => handlePropChange('completedProjects', e.target.value)}
                    placeholder="40+"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-semibold block mb-1">Clients</label>
                  <TextInput
                    value={props.happyClients}
                    onChange={(e) => handlePropChange('happyClients', e.target.value)}
                    placeholder="30+"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5">
              <Field label="Key Skills & Specializations" tip="Press Enter or comma to add each skill badge">
                <TagEditor
                  tags={props.skills || ['UI/UX Design', 'Full Stack Dev', 'Brand Identity', 'Product Strategy']}
                  onChange={(newSkills) => handlePropChange('skills', newSkills)}
                  placeholder="e.g. Next.js, TypeScript..."
                />
              </Field>
            </div>
          </>
        )}

        {selectedComp.type === 'ProjectsGrid' && (
          <>
            <Field label="Section Title">
              <TextInput
                value={props.heading}
                onChange={(e) => handlePropChange('heading', e.target.value)}
                placeholder="Work That Speaks for Itself"
              />
            </Field>

            <div className="pt-2 border-t border-white/5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Projects ({(props.items || []).length})
                </h4>
              </div>

              <div className="space-y-4">
                {(props.items || []).map((item, idx) => (
                  <div key={item.id || idx} className="p-3.5 glass rounded-2xl border border-white/[0.08] space-y-3 bg-white/[0.01]">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-xs font-bold text-indigo-400">Project #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newItems = props.items.filter((_, i) => i !== idx);
                          handlePropChange('items', newItems);
                        }}
                        className="p-1 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold block mb-1">Project Title</label>
                      <TextInput
                        value={item.title}
                        onChange={(e) => {
                          const newItems = [...props.items];
                          newItems[idx] = { ...newItems[idx], title: e.target.value };
                          handlePropChange('items', newItems);
                        }}
                        placeholder="e.g. Real-Time Telemetry Dashboard"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold block mb-1">Description</label>
                      <TextArea
                        rows={2}
                        value={item.description}
                        onChange={(e) => {
                          const newItems = [...props.items];
                          newItems[idx] = { ...newItems[idx], description: e.target.value };
                          handlePropChange('items', newItems);
                        }}
                        placeholder="Describe the problem, your solution, and impact..."
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold block mb-1">Project Image Cover</label>
                      <MediaUploadField
                        value={item.imageUrl}
                        onChange={(e) => {
                          const newItems = [...props.items];
                          newItems[idx] = { ...newItems[idx], imageUrl: e.target.value };
                          handlePropChange('items', newItems);
                        }}
                        onUploadComplete={(url) => {
                          const newItems = [...props.items];
                          newItems[idx] = { ...newItems[idx], imageUrl: url };
                          handlePropChange('items', newItems);
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-500 font-semibold block mb-1">Live URL</label>
                        <TextInput
                          value={item.liveUrl}
                          onChange={(e) => {
                            const newItems = [...props.items];
                            newItems[idx] = { ...newItems[idx], liveUrl: e.target.value };
                            handlePropChange('items', newItems);
                          }}
                          placeholder="https://..."
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 font-semibold block mb-1">GitHub / Code</label>
                        <TextInput
                          value={item.githubUrl}
                          onChange={(e) => {
                            const newItems = [...props.items];
                            newItems[idx] = { ...newItems[idx], githubUrl: e.target.value };
                            handlePropChange('items', newItems);
                          }}
                          placeholder="https://github..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold block mb-1">Tech Stack Tags</label>
                      <TagEditor
                        tags={item.tags || []}
                        onChange={(newTags) => {
                          const newItems = [...props.items];
                          newItems[idx] = { ...newItems[idx], tags: newTags };
                          handlePropChange('items', newItems);
                        }}
                        placeholder="e.g. React, Three.js..."
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const newItems = [
                      ...(props.items || []),
                      {
                        id: `p_${Date.now()}`,
                        title: 'New Project',
                        description: 'Detailed description of this featured work...',
                        imageUrl: '',
                        liveUrl: '',
                        githubUrl: '',
                        tags: ['React', 'Node.js']
                      }
                    ];
                    handlePropChange('items', newItems);
                  }}
                  className="w-full py-2.5 rounded-xl border border-dashed border-white/20 hover:border-indigo-500/50 hover:bg-indigo-500/5 text-xs font-semibold flex items-center justify-center gap-1.5 text-slate-400 hover:text-white transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>
            </div>
          </>
        )}

        {selectedComp.type === 'ExperienceTimeline' && (
          <>
            <Field label="Section Heading">
              <TextInput
                value={props.heading}
                onChange={(e) => handlePropChange('heading', e.target.value)}
                placeholder="Where I've Made an Impact"
              />
            </Field>

            <Field label="Subheading">
              <TextInput
                value={props.subheading}
                onChange={(e) => handlePropChange('subheading', e.target.value)}
                placeholder="A track record of shipping great work..."
              />
            </Field>

            <div className="pt-2 border-t border-white/5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Positions & Experience ({(props.items || []).length})
              </h4>

              <div className="space-y-4">
                {(props.items || []).map((item, idx) => (
                  <div key={item.id || idx} className="p-3.5 glass rounded-2xl border border-white/[0.08] space-y-3 bg-white/[0.01]">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-xs font-bold text-indigo-400">Position #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newItems = props.items.filter((_, i) => i !== idx);
                          handlePropChange('items', newItems);
                        }}
                        className="p-1 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold block mb-1">Role / Title</label>
                      <TextInput
                        value={item.role}
                        onChange={(e) => {
                          const newItems = [...props.items];
                          newItems[idx] = { ...newItems[idx], role: e.target.value };
                          handlePropChange('items', newItems);
                        }}
                        placeholder="e.g. Senior Full Stack Engineer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-500 font-semibold block mb-1">Company</label>
                        <TextInput
                          value={item.company}
                          onChange={(e) => {
                            const newItems = [...props.items];
                            newItems[idx] = { ...newItems[idx], company: e.target.value };
                            handlePropChange('items', newItems);
                          }}
                          placeholder="e.g. TechCorp Solutions"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 font-semibold block mb-1">Period / Duration</label>
                        <TextInput
                          value={item.period}
                          onChange={(e) => {
                            const newItems = [...props.items];
                            newItems[idx] = { ...newItems[idx], period: e.target.value };
                            handlePropChange('items', newItems);
                          }}
                          placeholder="2023 - Present"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold block mb-1">Impact Description</label>
                      <TextArea
                        rows={3}
                        value={item.description}
                        onChange={(e) => {
                          const newItems = [...props.items];
                          newItems[idx] = { ...newItems[idx], description: e.target.value };
                          handlePropChange('items', newItems);
                        }}
                        placeholder="Led architecture of platform serving 2M users..."
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold block mb-1">Highlights & Achievements</label>
                      <TagEditor
                        tags={item.highlights || []}
                        onChange={(newHighlights) => {
                          const newItems = [...props.items];
                          newItems[idx] = { ...newItems[idx], highlights: newHighlights };
                          handlePropChange('items', newItems);
                        }}
                        placeholder="e.g. CI/CD, Micro-services..."
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const newItems = [
                      ...(props.items || []),
                      {
                        id: `exp_${Date.now()}`,
                        role: 'Product Lead / Engineer',
                        company: 'Innovative Studio',
                        period: '2022 - Present',
                        description: 'Architected scalable systems and delivered polished user experiences.',
                        highlights: ['Leadership', 'System Design']
                      }
                    ];
                    handlePropChange('items', newItems);
                  }}
                  className="w-full py-2.5 rounded-xl border border-dashed border-white/20 hover:border-indigo-500/50 hover:bg-indigo-500/5 text-xs font-semibold flex items-center justify-center gap-1.5 text-slate-400 hover:text-white transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Experience Entry</span>
                </button>
              </div>
            </div>
          </>
        )}

        {selectedComp.type === 'SkillsCloud' && (
          <>
            <Field label="Section Heading">
              <TextInput
                value={props.heading}
                onChange={(e) => handlePropChange('heading', e.target.value)}
                placeholder="Tools of the Trade"
              />
            </Field>

            <Field label="Subheading">
              <TextInput
                value={props.subheading}
                onChange={(e) => handlePropChange('subheading', e.target.value)}
                placeholder="Technologies I use daily..."
              />
            </Field>

            <div className="pt-2 border-t border-white/5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Skill Categories ({(props.categories || []).length})
              </h4>

              <div className="space-y-4">
                {(props.categories || []).map((cat, idx) => (
                  <div key={idx} className="p-3.5 glass rounded-2xl border border-white/[0.08] space-y-3 bg-white/[0.01]">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-xs font-bold text-indigo-400">Category #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newCategories = props.categories.filter((_, i) => i !== idx);
                          handlePropChange('categories', newCategories);
                        }}
                        className="p-1 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold block mb-1">Category Title</label>
                      <TextInput
                        value={cat.name}
                        onChange={(e) => {
                          const newCategories = [...props.categories];
                          newCategories[idx] = { ...newCategories[idx], name: e.target.value };
                          handlePropChange('categories', newCategories);
                        }}
                        placeholder="e.g. Frontend, Backend, Cloud & DevOps"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold block mb-1">Skills in this Category</label>
                      <TagEditor
                        tags={cat.skills || []}
                        onChange={(newSkills) => {
                          const newCategories = [...props.categories];
                          newCategories[idx] = { ...newCategories[idx], skills: newSkills };
                          handlePropChange('categories', newCategories);
                        }}
                        placeholder="Add technology..."
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const newCategories = [
                      ...(props.categories || []),
                      {
                        name: 'Specialized Skills',
                        skills: ['System Design', 'Performance Tuning', 'Security']
                      }
                    ];
                    handlePropChange('categories', newCategories);
                  }}
                  className="w-full py-2.5 rounded-xl border border-dashed border-white/20 hover:border-indigo-500/50 hover:bg-indigo-500/5 text-xs font-semibold flex items-center justify-center gap-1.5 text-slate-400 hover:text-white transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Skill Category</span>
                </button>
              </div>
            </div>
          </>
        )}

        {selectedComp.type === 'TestimonialsCarousel' && (
          <>
            <Field label="Section Heading">
              <TextInput
                value={props.heading}
                onChange={(e) => handlePropChange('heading', e.target.value)}
                placeholder="Don't Take My Word For It"
              />
            </Field>

            <div className="pt-2 border-t border-white/5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Client Testimonials ({(props.items || []).length})
              </h4>

              <div className="space-y-4">
                {(props.items || []).map((item, idx) => (
                  <div key={item.id || idx} className="p-3.5 glass rounded-2xl border border-white/[0.08] space-y-3 bg-white/[0.01]">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-xs font-bold text-indigo-400">Review #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newItems = props.items.filter((_, i) => i !== idx);
                          handlePropChange('items', newItems);
                        }}
                        className="p-1 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-500 font-semibold block mb-1">Author Name</label>
                        <TextInput
                          value={item.author}
                          onChange={(e) => {
                            const newItems = [...props.items];
                            newItems[idx] = { ...newItems[idx], author: e.target.value };
                            handlePropChange('items', newItems);
                          }}
                          placeholder="e.g. Sarah Chen"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 font-semibold block mb-1">Role / Company</label>
                        <TextInput
                          value={item.role}
                          onChange={(e) => {
                            const newItems = [...props.items];
                            newItems[idx] = { ...newItems[idx], role: e.target.value };
                            handlePropChange('items', newItems);
                          }}
                          placeholder="e.g. CEO, NexGen"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold block mb-1">Quote / Feedback</label>
                      <TextArea
                        rows={3}
                        value={item.quote}
                        onChange={(e) => {
                          const newItems = [...props.items];
                          newItems[idx] = { ...newItems[idx], quote: e.target.value };
                          handlePropChange('items', newItems);
                        }}
                        placeholder="Working together was the best decision we made..."
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold block mb-1">Author Avatar</label>
                      <MediaUploadField
                        value={item.avatar}
                        onChange={(e) => {
                          const newItems = [...props.items];
                          newItems[idx] = { ...newItems[idx], avatar: e.target.value };
                          handlePropChange('items', newItems);
                        }}
                        onUploadComplete={(url) => {
                          const newItems = [...props.items];
                          newItems[idx] = { ...newItems[idx], avatar: url };
                          handlePropChange('items', newItems);
                        }}
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const newItems = [
                      ...(props.items || []),
                      {
                        id: `t_${Date.now()}`,
                        author: 'Jane Doe',
                        role: 'Director of Product',
                        quote: 'An exceptional collaborator who brought clarity, speed, and craftsmanship to our launch.',
                        avatar: ''
                      }
                    ];
                    handlePropChange('items', newItems);
                  }}
                  className="w-full py-2.5 rounded-xl border border-dashed border-white/20 hover:border-indigo-500/50 hover:bg-indigo-500/5 text-xs font-semibold flex items-center justify-center gap-1.5 text-slate-400 hover:text-white transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Testimonial</span>
                </button>
              </div>
            </div>
          </>
        )}

        {selectedComp.type === 'ContactSection' && (
          <>
            <Field label="Section Title">
              <TextInput
                value={props.heading}
                onChange={(e) => handlePropChange('heading', e.target.value)}
                placeholder="Ready to Create Something Great?"
              />
            </Field>

            <Field label="Subheading">
              <TextArea
                rows={3}
                value={props.subheading}
                onChange={(e) => handlePropChange('subheading', e.target.value)}
                placeholder="Whether you have a project in mind or just want to explore possibilities..."
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

            <Field label="Phone / WhatsApp Number" badge="Pro Feature">
              <TextInput
                value={props.phone}
                onChange={(e) => handlePropChange('phone', e.target.value)}
                placeholder="+1 (555) 000-0000"
              />
            </Field>

            <Field label="Location / Availability">
              <TextInput
                value={props.location}
                onChange={(e) => handlePropChange('location', e.target.value)}
                placeholder="Available Worldwide / San Francisco, CA"
              />
            </Field>

            <Field label="Response Time Guarantee">
              <TextInput
                value={props.responseTime}
                onChange={(e) => handlePropChange('responseTime', e.target.value)}
                placeholder="Usually responds within 24 hours"
              />
            </Field>
          </>
        )}

        {selectedComp.type === 'MediaGallery' && (
          <>
            <Field label="Section Heading">
              <TextInput
                value={props.heading}
                onChange={(e) => handlePropChange('heading', e.target.value)}
                placeholder="Visual Showcase"
              />
            </Field>

            <Field label="Subheading">
              <TextInput
                value={props.subheading}
                onChange={(e) => handlePropChange('subheading', e.target.value)}
                placeholder="A glimpse into the craft."
              />
            </Field>

            <div className="pt-2 border-t border-white/5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Media Tiles ({(props.items || []).length})
              </h4>

              <div className="space-y-4">
                {(props.items || []).map((item, idx) => (
                  <div key={item.id || idx} className="p-3.5 glass rounded-2xl border border-white/[0.08] space-y-3 bg-white/[0.01]">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-xs font-bold text-indigo-400">Media Tile #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newItems = props.items.filter((_, i) => i !== idx);
                          handlePropChange('items', newItems);
                        }}
                        className="p-1 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold block mb-1">Title</label>
                      <TextInput
                        value={item.title}
                        onChange={(e) => {
                          const newItems = [...props.items];
                          newItems[idx] = { ...newItems[idx], title: e.target.value };
                          handlePropChange('items', newItems);
                        }}
                        placeholder="e.g. Brand Guidelines & Motion"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold block mb-1">Description</label>
                      <TextArea
                        rows={2}
                        value={item.description}
                        onChange={(e) => {
                          const newItems = [...props.items];
                          newItems[idx] = { ...newItems[idx], description: e.target.value };
                          handlePropChange('items', newItems);
                        }}
                        placeholder="Brief summary..."
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold block mb-1">Image or Video Asset</label>
                      <MediaUploadField
                        accept="image/*,video/*"
                        value={item.url}
                        onChange={(e) => {
                          const val = e.target.value;
                          const isVid = /\.(mp4|webm|mov)(\?.*)?$/i.test(val) || val.includes('/video/upload/');
                          const newItems = [...props.items];
                          newItems[idx] = { ...newItems[idx], url: val, type: isVid ? 'video' : 'image' };
                          handlePropChange('items', newItems);
                        }}
                        onUploadComplete={(url, resourceType) => {
                          const isVid = resourceType === 'video' || /\.(mp4|webm|mov)(\?.*)?$/i.test(url) || url.includes('/video/upload/');
                          const newItems = [...props.items];
                          newItems[idx] = { ...newItems[idx], url, type: isVid ? 'video' : 'image' };
                          handlePropChange('items', newItems);
                        }}
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const newItems = [
                      ...(props.items || []),
                      {
                        id: `m_${Date.now()}`,
                        title: 'New Showcase Item',
                        description: 'Visual exploration and design craft.',
                        type: 'image',
                        url: ''
                      }
                    ];
                    handlePropChange('items', newItems);
                  }}
                  className="w-full py-2.5 rounded-xl border border-dashed border-white/20 hover:border-indigo-500/50 hover:bg-indigo-500/5 text-xs font-semibold flex items-center justify-center gap-1.5 text-slate-400 hover:text-white transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Media Tile</span>
                </button>
              </div>
            </div>
          </>
        )}

        {selectedComp.type === 'PremiumEmbed' && (
          <>
            <Field label="Section Title">
              <TextInput
                value={props.heading}
                onChange={(e) => handlePropChange('heading', e.target.value)}
                placeholder="Interactive Prototype"
              />
            </Field>

            <Field label="Embed Type" badge="Pro Feature">
              <SelectInput
                value={props.embedType || 'figma'}
                onChange={(e) => handlePropChange('embedType', e.target.value)}
                options={[
                  { value: 'figma', label: '🎨 Figma Prototype' },
                  { value: 'youtube', label: '🎬 YouTube Video' },
                  { value: 'spline', label: '💎 Spline 3D Embed (Studio)' },
                  { value: 'custom', label: '🌐 Custom Web Iframe / Prototype' }
                ]}
              />
            </Field>

            <Field 
              label="Embed URL / Iframe Code"
              tip="Paste the share link or whole iframe embed snippet. URLs are automatically extracted."
            >
              <TextArea
                rows={4}
                value={props.embedUrl}
                onChange={(e) => {
                  let val = e.target.value;
                  // If user pasted a full iframe tag, auto extract src
                  if (val.includes('<iframe')) {
                    const srcMatch = val.match(/src="([^"]+)"/);
                    if (srcMatch) val = srcMatch[1];
                  }
                  handlePropChange('embedUrl', val);
                }}
                placeholder={
                  props.embedType === 'figma'
                    ? 'https://www.figma.com/embed?embed_host=share&url=...'
                    : props.embedType === 'spline'
                    ? 'https://my.spline.design/your-scene/...'
                    : props.embedType === 'youtube'
                    ? 'https://www.youtube.com/embed/...'
                    : 'https://...'
                }
              />
            </Field>

            <Field label="Container Height">
              <SelectInput
                value={props.height || '600px'}
                onChange={(e) => handlePropChange('height', e.target.value)}
                options={[
                  { value: '450px', label: 'Compact (450px)' },
                  { value: '600px', label: 'Standard (600px)' },
                  { value: '750px', label: 'Expanded (750px)' },
                  { value: '900px', label: 'Full Viewport (900px)' }
                ]}
              />
            </Field>
          </>
        )}

        {selectedComp.type === 'AdvancedMetrics' && (
          <>
            <Field label="Section Heading">
              <TextInput
                value={props.heading}
                onChange={(e) => handlePropChange('heading', e.target.value)}
                placeholder="Impact & Scale"
              />
            </Field>

            <div className="pt-2 border-t border-white/5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Metrics & KPIs ({(props.metrics || []).length})
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Studio Feature
                </span>
              </div>

              <div className="space-y-4">
                {(props.metrics || []).map((metric, idx) => (
                  <div key={metric.id || idx} className="p-3.5 glass rounded-2xl border border-white/[0.08] space-y-3 bg-white/[0.01]">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-xs font-bold text-amber-400">KPI Metric #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newMetrics = props.metrics.filter((_, i) => i !== idx);
                          handlePropChange('metrics', newMetrics);
                        }}
                        className="p-1 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-500 font-semibold block mb-1">Value (Big Stat)</label>
                        <TextInput
                          value={metric.value}
                          onChange={(e) => {
                            const newMetrics = [...props.metrics];
                            newMetrics[idx] = { ...newMetrics[idx], value: e.target.value };
                            handlePropChange('metrics', newMetrics);
                          }}
                          placeholder="e.g. $10M+ or 99.9%"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 font-semibold block mb-1">Icon Style</label>
                        <SelectInput
                          value={metric.icon || 'trending'}
                          onChange={(e) => {
                            const newMetrics = [...props.metrics];
                            newMetrics[idx] = { ...newMetrics[idx], icon: e.target.value };
                            handlePropChange('metrics', newMetrics);
                          }}
                          options={[
                            { value: 'trending', label: '📈 Trending' },
                            { value: 'users', label: '👥 Users' },
                            { value: 'target', label: '🎯 Target' },
                            { value: 'zap', label: '⚡ Performance' }
                          ]}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold block mb-1">Metric Label / Context</label>
                      <TextInput
                        value={metric.label}
                        onChange={(e) => {
                          const newMetrics = [...props.metrics];
                          newMetrics[idx] = { ...newMetrics[idx], label: e.target.value };
                          handlePropChange('metrics', newMetrics);
                        }}
                        placeholder="e.g. Revenue Generated / Active Monthly Users"
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const newMetrics = [
                      ...(props.metrics || []),
                      {
                        id: `m_${Date.now()}`,
                        value: '100K+',
                        label: 'Metric Title',
                        icon: 'trending'
                      }
                    ];
                    handlePropChange('metrics', newMetrics);
                  }}
                  className="w-full py-2.5 rounded-xl border border-dashed border-white/20 hover:border-amber-500/50 hover:bg-amber-500/5 text-xs font-semibold flex items-center justify-center gap-1.5 text-slate-400 hover:text-white transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Data Metric</span>
                </button>
              </div>
            </div>
          </>
        )}

        {selectedComp.type === 'RichTextSection' && (
          <>
            <Field label="Section Badge / Pill" tip="Small highlight tag above the main title">
              <TextInput
                value={props.badge}
                onChange={(e) => handlePropChange('badge', e.target.value)}
                placeholder="e.g. Technical Case Study / Deep Dive"
              />
            </Field>

            <Field label="Section Heading">
              <TextInput
                value={props.heading}
                onChange={(e) => handlePropChange('heading', e.target.value)}
                placeholder="e.g. Architecture & Problem Breakdown"
              />
            </Field>

            <Field label="Subheading / Summary">
              <TextArea
                rows={2}
                value={props.subheading}
                onChange={(e) => handlePropChange('subheading', e.target.value)}
                placeholder="Brief summary or context..."
              />
            </Field>

            <Field label="Content Alignment">
              <SelectInput
                value={props.alignment || 'left'}
                onChange={(e) => handlePropChange('alignment', e.target.value)}
                options={[
                  { value: 'left', label: 'Left Aligned (Editorial)' },
                  { value: 'center', label: 'Centered (Feature)' }
                ]}
              />
            </Field>

            {/* Template Presets */}
            <div className="p-3 rounded-2xl glass border border-white/[0.08] bg-white/[0.01] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Insert Sample Template</span>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    handlePropChange('content', `## Engineering Challenge\n\nWhen scaling to over **500K concurrent users**, database connection pooling became the primary bottleneck.\n\n> "Simplicity is prerequisite for reliability." - Edsger W. Dijkstra\n\n### Technical Decisions\n\n- **Zero-Copy Buffers**: Reduced latency by 45%.\n- **Distributed Consensus**: Implemented Raft with edge failover.\n\n\`\`\`javascript\n// High-throughput WebSocket dispatcher\nexport function dispatch(socket, data) {\n  return socket.write(Buffer.from(data));\n}\n\`\`\`\n\n### Business Outcome\n\nMaintained **99.99% uptime** during Black Friday traffic surges.`);
                  }}
                  className="px-2.5 py-1.5 rounded-xl glass border border-white/10 hover:border-indigo-500/40 text-[11px] text-slate-300 hover:text-white font-semibold text-center transition"
                >
                  🚀 System Deep-Dive
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handlePropChange('content', `## Design Philosophy\n\nGreat interfaces feel invisible. Every interaction should give the user confidence and momentum.\n\n### Core Principles\n\n- **Content First**: Remove every decorative element that doesn't aid clarity.\n- **Sub-100ms Feedback**: Animate state changes with physical spring physics.\n- **Universal Access**: WCAG AAA compliant contrast and full screen-reader semantic trees.\n\n> "Good design is as little design as possible." - Dieter Rams`);
                  }}
                  className="px-2.5 py-1.5 rounded-xl glass border border-white/10 hover:border-indigo-500/40 text-[11px] text-slate-300 hover:text-white font-semibold text-center transition"
                >
                  🎨 Design Philosophy
                </button>
              </div>
            </div>

            {/* Markdown Quick Toolbar */}
            <Field label="Markdown & Code Editor" tip="Supports ## H2, ### H3, **bold**, *italic*, > quotes, ```code blocks```, lists, and links">
              <div className="flex flex-wrap gap-1 p-1.5 rounded-xl glass border border-white/[0.08] mb-1.5 bg-slate-900/50">
                {[
                  { label: 'H2', insert: '\n## Section Title\n' },
                  { label: 'H3', insert: '\n### Subsection Title\n' },
                  { label: 'Bold', insert: '**bold text**' },
                  { label: 'Italic', insert: '*italic text*' },
                  { label: 'Quote', insert: '\n> "Quote or highlight text"\n' },
                  { label: 'Code', insert: '\n```javascript\n// Code snippet here\nconst result = execute();\n```\n' },
                  { label: 'List', insert: '\n- First key point\n- Second key point\n- Third key point\n' },
                  { label: 'Link', insert: '[Link Title](https://example.com)' }
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      const prev = props.content || '';
                      handlePropChange('content', prev ? `${prev}\n${item.insert}` : item.insert);
                    }}
                    className="px-2 py-1 rounded-lg text-[10px] font-mono font-bold bg-white/5 hover:bg-indigo-500/20 text-slate-300 hover:text-indigo-300 border border-white/10 transition"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <textarea
                rows={12}
                value={props.content ?? ''}
                onChange={(e) => handlePropChange('content', e.target.value)}
                placeholder="Write your case study prose, architecture notes, and markdown here..."
                className="input-field w-full p-3 rounded-xl text-xs font-mono bg-slate-950/80 border border-white/10 text-slate-200 placeholder-slate-600 focus:border-indigo-500 transition resize-y leading-relaxed"
              />
            </Field>
          </>
        )}

      </div>
    </aside>
  );
}
