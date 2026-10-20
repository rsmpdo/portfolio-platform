import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { demoLayouts } from '../data/demoLayouts';
import ComponentRenderer from '../components/portfolio/ComponentRenderer';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function TemplatePreview() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const template = demoLayouts[templateId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [templateId]);

  if (!template) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-2">Template Not Found</h2>
        <Link to="/templates" className="text-indigo-400 hover:underline">Go back to templates</Link>
      </div>
    );
  }

  // Convert template layout data to the format expected by the editor renderer
  const mockLayout = {
    title: `${template.name} Demo`,
    theme: { ...template.theme, templateId },
    components: template.components.map((c, i) => ({
      id: `preview_${i}`,
      type: c.type,
      title: c.title,
      order: i,
      isVisible: true,
      props: c.props || {}
    }))
  };

  const handleUseTemplate = () => {
    const planAccess = templateId.includes('pro') ? 'pro' : templateId.includes('studio') ? 'studio' : 'free';
    const currentPlan = user?.plan || 'free';

    if (!user) {
      navigate('/register?redirect=templates');
      return;
    }
    if (planAccess === 'pro' && currentPlan === 'free') {
      navigate('/pricing?checkout=pro');
      return;
    }
    if (planAccess === 'studio' && (currentPlan === 'free' || currentPlan === 'pro')) {
      navigate('/pricing?checkout=studio');
      return;
    }
    navigate(`/editor?template=${templateId}`);
  };

  return (
    <div
      className="min-h-screen flex flex-col portfolio-theme-root transition-colors duration-300"
      style={{
        backgroundColor: mockLayout.theme?.backgroundColor || '#050811',
        color: mockLayout.theme?.textColor || '#f8fafc',
        '--theme-primary': mockLayout.theme?.primaryColor || '#6366f1',
        '--theme-secondary': mockLayout.theme?.secondaryColor || '#a855f7',
        '--theme-bg': mockLayout.theme?.backgroundColor || '#050811',
        '--theme-surface': mockLayout.theme?.surfaceColor || '#111827',
        '--theme-text': mockLayout.theme?.textColor || '#f8fafc',
        '--theme-muted': mockLayout.theme?.textMutedColor || '#94a3b8'
      }}
    >
      {/* Top Demo Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 md:mx-8 mt-4">
          <div className="glass-dark rounded-2xl px-6 h-14 flex items-center justify-between shadow-2xl border border-indigo-500/30">
            <div className="flex items-center gap-4">
              <Link to="/templates" className="text-slate-400 hover:text-white transition flex items-center gap-1 text-sm font-semibold">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Editor Templates</span>
              </Link>
              <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
              <span className="font-heading font-bold text-sm text-white hidden sm:flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Editor Template Preview: <span className="text-indigo-400">{template.name}</span>
              </span>
            </div>

            <button
              onClick={handleUseTemplate}
              className="btn-primary px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-2"
            >
              <span>Use This Template</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Components Stream using the specific template structural logic */}
      <main className="flex-1 pt-24 pb-12">
        {mockLayout.components
          .sort((a, b) => a.order - b.order)
          .map((comp) => (
            <ComponentRenderer 
              key={comp.id} 
              component={comp} 
              isEditing={false} 
              templateId={mockLayout.theme.templateId}
              accentColor={mockLayout.theme?.primaryColor || '#6366f1'}
              theme={mockLayout.theme}
            />
          ))}
      </main>
    </div>
  );
}
