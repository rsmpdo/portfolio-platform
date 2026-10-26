import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setUser } from '../store/authSlice';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import {
  User,
  Mail,
  ShieldCheck,
  Crown,
  Zap,
  LogOut,
  Trash2,
  ArrowRight,
  LayoutTemplate,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
  Inbox,
  Eye,
  Reply,
  Plus,
  Layers,
  ExternalLink,
  X,
  Lock,
  KeyRound,
  MapPin,
  Globe,
  Briefcase,
  FileText,
  Settings,
  Save
} from 'lucide-react';
import API from '../services/api';

function PortfoliosManager() {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  const [maxAllowed, setMaxAllowed] = useState(1);
  const [plan, setPlan] = useState('free');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [portfolioNotice, setPortfolioNotice] = useState('');

  // Delete Portfolio Popup Modal State
  const [deletePortfolioTarget, setDeletePortfolioTarget] = useState(null);
  const [deletingPortfolio, setDeletingPortfolio] = useState(false);
  const [deletePortfolioError, setDeletePortfolioError] = useState('');
  
  const [form, setForm] = useState({
    title: '',
    handle: '',
    templateId: 'minimalist-editorial'
  });

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const res = await API.get('/layouts/my-portfolios');
      if (res.data.success) {
        setPortfolios(res.data.layouts || []);
        setMaxAllowed(res.data.maxAllowed || 1);
        setPlan(res.data.plan || 'free');
      }
    } catch (err) {
      console.error('Fetch portfolios error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const handleCreatePortfolio = async (e) => {
    e.preventDefault();
    setCreateError('');
    try {
      setCreating(true);
      const res = await API.post('/layouts/new', form);
      if (res.data.success) {
        setShowModal(false);
        setForm({ title: '', handle: '', templateId: 'minimalist-editorial' });
        fetchPortfolios();
        navigate(`/editor?id=${res.data.layout._id}`);
      }
    } catch (err) {
      setCreateError(err.response?.data?.message || 'Failed to create portfolio');
    } finally {
      setCreating(false);
    }
  };

  const openDeletePortfolioModal = (portfolioItem) => {
    setDeletePortfolioError('');
    setDeletePortfolioTarget(portfolioItem);
  };

  const closeDeletePortfolioModal = () => {
    if (deletingPortfolio) return;
    setDeletePortfolioTarget(null);
    setDeletePortfolioError('');
  };

  const confirmDeletePortfolio = async () => {
    if (!deletePortfolioTarget) return;
    try {
      setDeletingPortfolio(true);
      setDeletePortfolioError('');
      await API.delete(`/layouts/id/${deletePortfolioTarget._id}`);
      setDeletePortfolioTarget(null);
      fetchPortfolios();
    } catch (err) {
      setDeletePortfolioError(err.response?.data?.message || 'Failed to delete portfolio');
    } finally {
      setDeletingPortfolio(false);
    }
  };

  const handleTogglePublishPortfolio = async (layoutId, currentStatus) => {
    try {
      setPortfolioNotice('');
      await API.put('/layouts/me', { _id: layoutId, isPublished: !currentStatus });
      fetchPortfolios();
    } catch (err) {
      setPortfolioNotice(err.response?.data?.message || 'Failed to update publication status');
    }
  };

  const isLimitReached = portfolios.length >= maxAllowed;

  return (
    <div className="glass-card gradient-border rounded-3xl p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <span>My Portfolios</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
                plan === 'studio' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
              }`}>
                {portfolios.length} / {maxAllowed} Used ({plan.toUpperCase()})
              </span>
            </h2>
            <p className="text-slate-400 text-xs">
              {plan === 'studio' 
                ? 'Studio tier allows up to 5 multi-portfolio showcases' 
                : plan === 'pro' 
                ? 'Pro tier allows up to 3 portfolios. Upgrade to Studio for 5 portfolios!' 
                : 'Free tier allows 1 portfolio. Upgrade to Pro for 3 portfolios, or Studio for 5!'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            if (isLimitReached) {
              setPortfolioNotice(`Portfolio limit reached (${portfolios.length}/${maxAllowed}). ${plan === 'free' ? 'Upgrade to Pro for 3 portfolios, or Studio for 5!' : plan === 'pro' ? 'Upgrade to Studio plan to unlock 5 portfolios!' : ''}`);
            } else {
              setPortfolioNotice('');
              setCreateError('');
              setShowModal(true);
            }
          }}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            isLimitReached 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5' 
              : 'btn-primary text-white shadow-lg shadow-indigo-500/20'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Create New Portfolio ({portfolios.length}/{maxAllowed})</span>
        </button>
      </div>

      {portfolioNotice && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPortfolioNotice('')}
        >
          <div
            className="glass gradient-border rounded-3xl max-w-md w-full p-6 md:p-7 relative shadow-2xl border border-amber-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider inline-block mb-1">
                    Portfolio Notice
                  </span>
                  <h3 className="font-heading font-bold text-lg text-white">
                    Plan Limit Reached
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPortfolioNotice('')}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs leading-relaxed mb-6 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{portfolioNotice}</span>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setPortfolioNotice('')}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition"
              >
                Close
              </button>
              {plan !== 'studio' && (
                <Link
                  to="/pricing"
                  onClick={() => setPortfolioNotice('')}
                  className="btn-primary px-5 py-2.5 rounded-xl text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <span>Upgrade Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      {loading ? (
        <div className="py-8 flex flex-col items-center justify-center text-slate-500 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
          <span className="text-xs">Loading your portfolios...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolios.map((item) => (
            <div key={item._id} className="p-5 rounded-2xl glass border border-white/[0.08] hover:border-indigo-500/30 transition flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 text-[10px] font-mono font-bold capitalize">
                    {item.theme?.templateId || 'minimalist-editorial'}
                  </span>
                  {/* Status Badge */}
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider flex items-center gap-1.5 ${
                    item.isPublished 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.isPublished ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                    <span>{item.isPublished ? '🟢 Live Published' : '🟠 Draft (Unpublished)'}</span>
                  </span>
                </div>
                <h3 className="font-heading font-bold text-base text-white mb-1">{item.title || 'Untitled Portfolio'}</h3>
                <p className="text-xs font-mono text-indigo-300">/p/{item.handle}</p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/[0.04]">
                <a
                  href={`/p/${item.handle}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Live</span>
                </a>

                <div className="flex items-center gap-2">
                  {/* Inline Publish / Unpublish Toggle */}
                  <button
                    onClick={() => handleTogglePublishPortfolio(item._id, item.isPublished)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                      item.isPublished
                        ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    <span>{item.isPublished ? 'Unpublish' : 'Publish'}</span>
                  </button>

                  <button
                    onClick={() => navigate(`/editor?id=${item._id}`)}
                    className="btn-primary px-3 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5"
                  >
                    <LayoutTemplate className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  {portfolios.length > 1 && (
                    <button
                      type="button"
                      onClick={() => openDeletePortfolioModal(item)}
                      className="p-1.5 rounded-xl hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition"
                      title="Delete Portfolio"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Create Portfolio Modal (Portaled to document.body) ────────────────────────── */}
      {showModal && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="glass gradient-border rounded-3xl max-w-md w-full p-6 md:p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl glass text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading font-bold text-xl text-white mb-1">Create New Portfolio</h3>
            <p className="text-xs text-slate-400 mb-6">
              Create another portfolio under your account ({portfolios.length + 1} of {maxAllowed} allowed).
            </p>

            {createError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{createError}</span>
              </div>
            )}

            <form onSubmit={handleCreatePortfolio} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Portfolio Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Architecture Studio Showcase"
                  className="input-field w-full px-3.5 py-2.5 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Custom URL Handle *</label>
                <div className="flex items-center">
                  <span className="px-3 py-2.5 rounded-l-xl bg-slate-900 border border-r-0 border-white/10 text-xs font-mono text-slate-500">/p/</span>
                  <input
                    type="text"
                    required
                    value={form.handle}
                    onChange={(e) => setForm({ ...form, handle: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                    placeholder="arch-studio"
                    className="input-field w-full px-3.5 py-2.5 rounded-r-xl rounded-l-none text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Design Preset Template</label>
                <select
                  value={form.templateId}
                  onChange={(e) => setForm({ ...form, templateId: e.target.value })}
                  className="input-field w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-900 border-white/15 cursor-pointer"
                >
                  <option value="minimalist-editorial">Minimalist Editorial</option>
                  <option value="dark-cyber">Dark Cyberpunk</option>
                  <option value="creative-director">Creative Director</option>
                  <option value="interactive-showcase">Interactive Showcase</option>
                  <option value="luxury-motion-pro">Luxury Motion Pro</option>
                  <option value="fintech-saas-pro">Fintech SaaS Pro</option>
                  <option value="ai-neural-labs-pro">AI Neural Labs Pro</option>
                  <option value="global-agency-studio">Global Agency Studio</option>
                  <option value="haute-couture-studio">Haute Couture Studio</option>
                  <option value="spatial-architect-studio">Spatial Architect Studio</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-ghost px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 disabled:opacity-60"
                >
                  {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  <span>Create Portfolio</span>
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* ─── Delete Portfolio Confirmation Popup Modal (Portaled to document.body) ────────────────────────── */}
      {deletePortfolioTarget && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeDeletePortfolioModal}
        >
          <div
            className="glass gradient-border rounded-3xl max-w-md w-full p-6 md:p-7 relative shadow-2xl border border-red-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-[10px] font-bold uppercase tracking-wider inline-block mb-1">
                    Permanent Action
                  </span>
                  <h3 className="font-heading font-bold text-lg text-white">
                    Delete Portfolio Layout?
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={closeDeletePortfolioModal}
                disabled={deletingPortfolio}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Target Portfolio Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 mb-4">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 text-[10px] font-mono font-bold capitalize">
                  {deletePortfolioTarget.theme?.templateId || 'minimalist-editorial'}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  deletePortfolioTarget.isPublished
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {deletePortfolioTarget.isPublished ? 'Live Published' : 'Draft'}
                </span>
              </div>
              <div className="font-heading font-bold text-sm text-white">
                {deletePortfolioTarget.title || 'Untitled Portfolio'}
              </div>
              <div className="text-xs font-mono text-indigo-300 mt-0.5">
                /p/{deletePortfolioTarget.handle}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs text-slate-300 leading-relaxed mb-5 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>
                Are you sure you want to delete <strong className="text-white">{deletePortfolioTarget.title || 'this portfolio'}</strong>? All sections, projects, and custom styling inside this portfolio layout will be permanently removed. This action cannot be undone.
              </span>
            </div>

            {deletePortfolioError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{deletePortfolioError}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={closeDeletePortfolioModal}
                disabled={deletingPortfolio}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeletePortfolio}
                disabled={deletingPortfolio}
                className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 transition disabled:opacity-50 shadow-lg shadow-red-500/25"
              >
                {deletingPortfolio ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                <span>Yes, Delete Portfolio</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

function MessagesInbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'unread' | 'read'
  const [deleteMsgTarget, setDeleteMsgTarget] = useState(null);
  const [deletingMsg, setDeletingMsg] = useState(false);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await API.get('/messages/me');
      if (res.data.success) {
        setMessages(res.data.messages || []);
        setUnreadCount(res.data.unreadCount || 0);
      }
    } catch (err) {
      console.error('Fetch messages error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleReadStatus = async (id) => {
    try {
      await API.get(`/messages/${id}/read`);
      fetchMessages();
    } catch (err) {
      console.error('Toggle read error:', err);
    }
  };

  const confirmDeleteMessage = async () => {
    if (!deleteMsgTarget) return;
    try {
      setDeletingMsg(true);
      await API.delete(`/messages/${deleteMsgTarget._id}`);
      setDeleteMsgTarget(null);
      fetchMessages();
    } catch (err) {
      console.error('Delete message error:', err);
    } finally {
      setDeletingMsg(false);
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (filterMode === 'unread') return !m.isRead;
    if (filterMode === 'read') return m.isRead;
    return true;
  });

  return (
    <div className="glass-card gradient-border rounded-3xl p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Inbox className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <span>Received Portfolio Messages</span>
              {unreadCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500 text-white font-bold text-xs animate-pulse">
                  {unreadCount} New
                </span>
              )}
            </h2>
            <p className="text-slate-400 text-xs">Inquiries sent by visitors via your public portfolio contact form.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-white/10 text-xs">
            {[
              { id: 'all', label: `All (${messages.length})` },
              { id: 'unread', label: `Unread (${unreadCount})` },
              { id: 'read', label: `Read (${messages.length - unreadCount})` }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterMode(tab.id)}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  filterMode === tab.id
                    ? 'bg-indigo-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={fetchMessages}
            className="btn-ghost px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5"
          >
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center text-slate-500 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
          <span className="text-xs">Loading your messages...</span>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="py-12 glass rounded-2xl border border-white/[0.06] flex flex-col items-center justify-center text-center p-6">
          <MessageSquare className="w-10 h-10 text-slate-600 mb-3" />
          <h3 className="font-bold text-slate-300 text-sm mb-1">
            {messages.length === 0 ? 'No Messages Received Yet' : `No ${filterMode} messages`}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm">
            {messages.length === 0
              ? "When visitors submit your portfolio's contact form, their inquiries will show up right here!"
              : 'Switch the filter above to view all of your received inquiries.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg) => (
            <div
              key={msg._id}
              className={`p-5 rounded-2xl glass border transition-all ${
                !msg.isRead ? 'border-indigo-500/40 bg-indigo-500/5' : 'border-white/[0.06] opacity-90'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 pb-3 border-b border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-white text-sm shrink-0">
                    {msg.senderName?.[0]?.toUpperCase() || 'S'}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <span>{msg.senderName}</span>
                      {!msg.isRead && (
                        <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"></span>
                      )}
                    </h4>
                    <span className="text-xs font-mono text-indigo-300">{msg.senderEmail}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-mono text-slate-500 mr-2">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                  <a
                    href={`mailto:${msg.senderEmail}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                    className="p-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Reply</span>
                  </a>
                  <button
                    onClick={() => toggleReadStatus(msg._id)}
                    className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition text-xs flex items-center gap-1"
                    title={msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteMsgTarget(msg)}
                    className="p-2 rounded-xl hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition"
                    title="Delete Message"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {msg.subject && (
                <div className="text-xs font-bold text-slate-300 mb-1.5">Subject: {msg.subject}</div>
              )}
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ─── Delete Message Confirmation Popup Modal (Portaled to document.body) ────────────────────────── */}
      {deleteMsgTarget && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => !deletingMsg && setDeleteMsgTarget(null)}
        >
          <div
            className="glass gradient-border rounded-3xl max-w-md w-full p-6 relative shadow-2xl border border-red-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white">Delete Contact Message?</h3>
                  <p className="text-[11px] text-slate-400">From {deleteMsgTarget.senderName} ({deleteMsgTarget.senderEmail})</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDeleteMsgTarget(null)}
                disabled={deletingMsg}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              Are you sure you want to permanently remove this inquiry from your inbox? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteMsgTarget(null)}
                disabled={deletingMsg}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteMessage}
                disabled={deletingMsg}
                className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 transition disabled:opacity-50"
              >
                {deletingMsg ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>Delete Message</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default function ProfileSettings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Active Section Navigation ('profile' | 'portfolios' | 'messages' | 'settings')
  const [activeSection, setActiveSection] = useState('profile');

  // Personal Profile Info & Bio Form State
  const [profileForm, setProfileForm] = useState({
    fullName: '',
    username: '',
    headline: '',
    bio: '',
    location: '',
    website: '',
    github: '',
    linkedin: '',
    twitter: ''
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileError, setProfileError] = useState('');

  // Password Update Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 2-Step Account Deletion Modal State
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteStep, setDeleteStep] = useState(1); // 1 = Warning & Checkboxes, 2 = Password Authentication
  const [confirmUnderstood, setConfirmUnderstood] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    if (user) {
      setProfileForm({
        fullName: user.fullName || '',
        username: user.username || '',
        headline: user.headline || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        github: user.github || '',
        linkedin: user.linkedin || '',
        twitter: user.twitter || ''
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="glass rounded-3xl p-8 max-w-sm text-center">
          <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white mb-2">Sign In Required</h2>
          <p className="text-xs text-slate-400 mb-6">Please sign in to access your profile settings.</p>
          <Link to="/login" className="btn-primary inline-block w-full py-3 rounded-xl font-bold text-xs text-white">
            Sign In Now
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileSuccess('');
    setProfileError('');
    try {
      setSavingProfile(true);
      const res = await API.put('/auth/profile', profileForm);
      if (res.data?.success) {
        dispatch(setUser(res.data.user));
        setProfileSuccess(res.data.message || 'Profile information updated successfully!');
      }
    } catch (err) {
      setProfileError(err.response?.data?.message || 'Failed to update profile information.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordSuccess('');
    setPasswordError('');

    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      setPasswordError('Please fill in both your current password and new password.');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New password and confirmation password do not match.');
      return;
    }

    try {
      setSavingPassword(true);
      const res = await API.put('/auth/password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      if (res.data?.success) {
        setPasswordSuccess(res.data.message || 'Password updated successfully!');
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Failed to update password.');
    } finally {
      setSavingPassword(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const openDeleteModal = () => {
    setDeleteStep(1);
    setConfirmUnderstood(false);
    setDeletePassword('');
    setDeleteError('');
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    if (loading) return;
    setShowDeleteModal(false);
    setDeleteStep(1);
    setConfirmUnderstood(false);
    setDeletePassword('');
    setDeleteError('');
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (!deletePassword.trim()) {
      setDeleteError('Please enter your current password to verify account deletion.');
      return;
    }

    try {
      setLoading(true);
      setDeleteError('');
      const res = await API.post('/auth/delete-account', {
        password: deletePassword
      });
      if (res.data?.success) {
        setShowDeleteModal(false);
        dispatch(logout());
        navigate('/');
      }
    } catch (err) {
      setDeleteError(err.response?.data?.message || 'Password verification failed. Account was not deleted.');
    } finally {
      setLoading(false);
    }
  };

  const navTabs = [
    { id: 'profile', label: 'Personal Info & Bio', icon: User },
    { id: 'portfolios', label: 'My Portfolios', icon: LayoutTemplate },
    { id: 'messages', label: 'Received Messages', icon: Inbox },
    { id: 'settings', label: 'Account Settings & Deletion', icon: Settings }
  ];

  const showProfile = activeSection === 'profile';
  const showPortfolios = activeSection === 'portfolios';
  const showMessages = activeSection === 'messages';
  const showSettings = activeSection === 'settings';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-5xl mx-auto w-full">
        {/* Page Header */}
        <div className="mb-6 pb-6 border-b border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="badge badge-indigo inline-flex mb-2">
              <User className="w-3.5 h-3.5" />
              <span>User Account & Profile</span>
            </div>
            <h1 className="font-heading font-black text-3xl text-white">Account Hub & Profile Settings</h1>
            <p className="text-slate-400 text-xs mt-1">
              Manage your personal info and bio, portfolios, visitor contact messages, and account security settings.
            </p>
          </div>
          <Link
            to="/editor"
            className="btn-primary px-4 py-2.5 rounded-xl text-white text-xs font-bold flex items-center gap-2 self-start md:self-auto"
          >
            <LayoutTemplate className="w-4 h-4" />
            <span>Open Portfolio Editor</span>
          </Link>
        </div>

        {/* Top Profile Identity Banner */}
        <div className="glass-card gradient-border rounded-3xl p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border-2 border-indigo-500/40 flex items-center justify-center font-heading font-black text-2xl text-indigo-400 shrink-0">
                {(user.fullName || user.username)?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="font-heading font-bold text-xl text-white">
                    {user.fullName || user.username}
                  </h2>
                  <span className="text-xs font-mono text-indigo-400">@{user.username}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                    user.role === 'admin'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {user.role}
                  </span>
                </div>
                {user.headline && (
                  <p className="text-xs font-semibold text-slate-200 mb-1">{user.headline}</p>
                )}
                {user.bio && (
                  <p className="text-xs text-slate-400 max-w-xl leading-relaxed mb-2 line-clamp-2">{user.bio}</p>
                )}
                <div className="flex flex-wrap items-center gap-4 text-slate-400 text-xs">
                  <span className="flex items-center gap-1.5 font-mono">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>{user.email}</span>
                  </span>
                  {user.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{user.location}</span>
                    </span>
                  )}
                  {user.website && (
                    <a
                      href={user.website.startsWith('http') ? user.website : `https://${user.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-indigo-400 hover:underline"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Website</span>
                    </a>
                  )}
                  {user.github && (
                    <a
                      href={user.github.startsWith('http') ? user.github : `https://${user.github}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-indigo-400 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {user.linkedin && (
                    <a
                      href={user.linkedin.startsWith('http') ? user.linkedin : `https://${user.linkedin}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-indigo-400 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {user.twitter && (
                    <a
                      href={user.twitter.startsWith('http') ? user.twitter : `https://${user.twitter}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-indigo-400 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>X / Twitter</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Plan Status Badge */}
            <div className="glass p-4 rounded-2xl border border-white/10 flex items-center gap-4 shrink-0 self-start md:self-center">
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Plan</div>
                <div className="font-heading font-bold text-sm text-white uppercase flex items-center gap-1.5 mt-0.5">
                  {user.plan === 'studio' ? (
                    <>
                      <Crown className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Studio Plan (5 Portfolios)</span>
                    </>
                  ) : user.plan === 'pro' ? (
                    <>
                      <Zap className="w-4 h-4 text-indigo-400" />
                      <span className="text-indigo-400">Pro Creator (3 Portfolios)</span>
                    </>
                  ) : (
                    <span className="text-slate-400">Free Standard (1 Portfolio)</span>
                  )}
                </div>
              </div>

              <Link
                to="/pricing"
                className="btn-primary px-3 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1"
              >
                <span>{user.plan === 'free' ? 'Upgrade Plan' : 'Manage Plan'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Section Switcher Navigation Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-2 rounded-2xl glass border border-white/[0.08]">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSection(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                  isActive
                    ? 'btn-primary text-white shadow-lg shadow-indigo-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="space-y-8">
          {/* ─── SECTION 1: Update Personal Information & Bio ────────────────────────── */}
          {showProfile && (
            <section className="glass-card gradient-border rounded-3xl p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-xl text-white">
                      Personal Information & Bio
                    </h2>
                    <p className="text-slate-400 text-xs">
                      Update your display name, username, professional headline, bio, location, and social links.
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-bold">
                  Profile Info
                </span>
              </div>

              {profileSuccess && (
                <div className="mb-5 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{profileSuccess}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setProfileSuccess('')}
                    className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {profileError && (
                <div className="mb-5 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{profileError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setProfileError('')}
                    className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Full Name / Display Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.fullName}
                      onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                      placeholder="e.g. Elena Vance"
                      className="input-field w-full px-3.5 py-2.5 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Username (@handle)
                    </label>
                    <input
                      type="text"
                      required
                      value={profileForm.username}
                      onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                      placeholder="username"
                      className="input-field w-full px-3.5 py-2.5 rounded-xl text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Professional Headline / Role
                    </label>
                    <div className="relative">
                      <Briefcase className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={profileForm.headline}
                        onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                        placeholder="e.g. Principal Product Designer & Creative Technologist"
                        className="input-field w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                        placeholder="e.g. San Francisco, CA / Remote"
                        className="input-field w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      About Me / Bio
                    </label>
                    <span className="text-[10px] font-mono text-slate-500">
                      {profileForm.bio.length} / 1000 chars
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    maxLength={1000}
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    placeholder="Write a short bio about your background, design philosophy, or engineering expertise..."
                    className="input-field w-full px-3.5 py-2.5 rounded-xl text-xs leading-relaxed resize-y"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Personal Website URL
                    </label>
                    <input
                      type="text"
                      value={profileForm.website}
                      onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                      placeholder="https://yourwebsite.com"
                      className="input-field w-full px-3.5 py-2.5 rounded-xl text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      GitHub Profile URL
                    </label>
                    <input
                      type="text"
                      value={profileForm.github}
                      onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                      placeholder="https://github.com/username"
                      className="input-field w-full px-3.5 py-2.5 rounded-xl text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      LinkedIn Profile URL
                    </label>
                    <input
                      type="text"
                      value={profileForm.linkedin}
                      onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                      className="input-field w-full px-3.5 py-2.5 rounded-xl text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      X / Twitter Profile URL
                    </label>
                    <input
                      type="text"
                      value={profileForm.twitter}
                      onChange={(e) => setProfileForm({ ...profileForm, twitter: e.target.value })}
                      placeholder="https://x.com/username"
                      className="input-field w-full px-3.5 py-2.5 rounded-xl text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-4 border-t border-white/[0.06]">
                  <p className="text-[11px] text-slate-500">
                    Registered Email: <span className="text-slate-300 font-mono">{user.email}</span>
                  </p>
                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="btn-primary px-5 py-2.5 rounded-xl text-white text-xs font-bold flex items-center gap-2 disabled:opacity-60"
                  >
                    {savingProfile ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>Save Profile Information</span>
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* ─── SECTION 2: My Portfolios Management ────────────────────────── */}
          {showPortfolios && <PortfoliosManager />}

          {/* ─── SECTION 3: Received Contact Messages Inbox ────────────────────────── */}
          {showMessages && <MessagesInbox />}

          {/* ─── SECTION 4: Account Settings, Security & Deletion ────────────────────────── */}
          {showSettings && (
            <div className="space-y-8">
              {/* Password & Security Settings Card */}
              <section className="glass-card gradient-border rounded-3xl p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-xl text-white">
                        Account Security & Password
                      </h2>
                      <p className="text-slate-400 text-xs">
                        Update your account password to keep your portfolios and inbox secure.
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-bold">
                    Security Settings
                  </span>
                </div>

                {passwordSuccess && (
                  <div className="mb-5 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{passwordSuccess}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPasswordSuccess('')}
                      className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {passwordError && (
                  <div className="mb-5 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{passwordError}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPasswordError('')}
                      className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <form onSubmit={handleUpdatePassword} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      placeholder="Enter current password"
                      className="input-field w-full px-3.5 py-2.5 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      New Password (min 6 chars)
                    </label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      placeholder="Enter new password"
                      className="input-field w-full px-3.5 py-2.5 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      placeholder="Confirm new password"
                      className="input-field w-full px-3.5 py-2.5 rounded-xl text-xs"
                    />
                  </div>

                  <div className="md:col-span-3 flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={savingPassword}
                      className="btn-primary px-5 py-2.5 rounded-xl text-white text-xs font-bold flex items-center gap-2 disabled:opacity-60"
                    >
                      {savingPassword ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <KeyRound className="w-4 h-4" />
                      )}
                      <span>Update Password</span>
                    </button>
                  </div>
                </form>
              </section>

              {/* Session & Subscription Quick Actions */}
              <section className="glass-card gradient-border rounded-3xl p-8">
                <h2 className="font-heading font-bold text-xl text-white mb-2">Session & Subscription Actions</h2>
                <p className="text-slate-400 text-xs mb-6">
                  Manage your active browser session or upgrade your portfolio tier.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="p-4 rounded-2xl glass border border-white/10 hover:border-white/20 flex items-center justify-between group transition text-left"
                  >
                    <div>
                      <div className="font-bold text-white text-sm mb-1 group-hover:text-indigo-400 transition flex items-center gap-2">
                        <LogOut className="w-4 h-4 text-indigo-400" />
                        <span>Sign Out of Account</span>
                      </div>
                      <p className="text-slate-500 text-xs">Safely terminate your current session on this browser.</p>
                    </div>
                  </button>

                  <Link
                    to="/pricing"
                    className="p-4 rounded-2xl glass border border-white/10 hover:border-white/20 flex items-center justify-between group transition text-left"
                  >
                    <div>
                      <div className="font-bold text-white text-sm mb-1 group-hover:text-indigo-400 transition flex items-center gap-2">
                        <Crown className="w-4 h-4 text-amber-400" />
                        <span>View & Upgrade Pricing Plans</span>
                      </div>
                      <p className="text-slate-500 text-xs">Explore Pro (3 portfolios) and Studio (5 portfolios) features.</p>
                    </div>
                  </Link>
                </div>
              </section>

              {/* Danger Zone - Account Deletion */}
              <section className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h2 className="font-heading font-bold text-xl text-red-400 mb-1 flex items-center gap-2">
                      <Trash2 className="w-5 h-5" />
                      <span>Danger Zone - Account Deletion</span>
                    </h2>
                    <p className="text-slate-400 text-xs leading-relaxed max-w-2xl">
                      Permanently delete your account, your user credentials, your received messages, and all of your live/draft portfolio layouts from PortfolioCraft. Requires 2-step confirmation and password authentication.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-[10px] font-bold uppercase tracking-wider self-start">
                    2-Step Password Protected
                  </span>
                </div>

                <button
                  type="button"
                  onClick={openDeleteModal}
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 font-bold text-xs transition flex items-center gap-2 disabled:opacity-60"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  <span>Delete My Account Permanently</span>
                </button>
              </section>
            </div>
          )}
        </div>
      </main>

      {/* ─── 2-Step Account Deletion Confirmation & Password Authentication Modal (Portaled to document.body) ─── */}
      {showDeleteModal && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeDeleteModal}
        >
          <div
            className="glass gradient-border rounded-3xl p-7 max-w-md w-full border border-red-500/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header & Step Indicator */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400">
                  {deleteStep === 1 ? <Trash2 className="w-5 h-5" /> : <KeyRound className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-[10px] font-bold uppercase tracking-wider">
                      Step {deleteStep} of 2
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                      {deleteStep === 1 ? 'Impact Confirmation' : 'Password Verification'}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    {deleteStep === 1 ? 'Delete Your Account?' : 'Confirm with Password'}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={closeDeleteModal}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step Progress Bar */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <div className="h-1.5 rounded-full bg-red-500" />
              <div className={`h-1.5 rounded-full transition-colors ${deleteStep === 2 ? 'bg-red-500' : 'bg-white/10'}`} />
            </div>

            {deleteStep === 1 ? (
              /* STEP 1: Warning & Explicit Acknowledgement */
              <div>
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 mb-5">
                  <div className="text-xs font-bold text-red-300 mb-2 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Warning: This action is irreversible</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    Deleting account <span className="text-white font-semibold">@{user.username}</span> ({user.email}) will immediately and permanently erase:
                  </p>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span>All published & draft portfolios and custom handles</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span>All projects, case studies, and custom theme configurations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span>Your contact message inbox and account subscription</span>
                    </li>
                  </ul>
                </div>

                <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 cursor-pointer hover:border-red-500/30 transition mb-6">
                  <input
                    type="checkbox"
                    checked={confirmUnderstood}
                    onChange={(e) => setConfirmUnderstood(e.target.checked)}
                    className="mt-0.5 rounded border-white/20 text-red-500 focus:ring-red-500"
                  />
                  <span className="text-xs text-slate-300 leading-relaxed select-none">
                    I understand that deleting my account and portfolios is <strong className="text-white">permanent</strong> and cannot be undone.
                  </span>
                </label>

                <div className="flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={closeDeleteModal}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!confirmUnderstood}
                    onClick={() => {
                      setDeleteError('');
                      setDeleteStep(2);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-red-500/25"
                  >
                    <span>Continue to Step 2</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* STEP 2: Password Authentication */
              <form onSubmit={handleDeleteAccount} className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-white/10 text-xs text-slate-300 leading-relaxed">
                  Final step: Please enter the password for <span className="text-white font-semibold">{user.email}</span> to authenticate and permanently delete your account.
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Current Account Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={deletePassword}
                      onChange={(e) => {
                        setDeletePassword(e.target.value);
                        setDeleteError('');
                      }}
                      placeholder="Enter your password to confirm..."
                      autoFocus
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                    />
                  </div>
                  {deleteError && (
                    <div className="flex items-center gap-1.5 text-red-400 text-[11px] mt-2 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{deleteError}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setDeleteError('');
                      setDeleteStep(1);
                    }}
                    disabled={loading}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition"
                  >
                    ← Back to Step 1
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={closeDeleteModal}
                      disabled={loading}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 text-xs font-bold transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !deletePassword.trim()}
                      className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 transition disabled:opacity-50 shadow-lg shadow-red-500/25"
                    >
                      {loading ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                      <span>Permanently Delete Account</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>,
        document.body
      )}

      <Footer />
    </div>
  );
}
