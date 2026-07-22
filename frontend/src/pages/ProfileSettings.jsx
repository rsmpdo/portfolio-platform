import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { User, Mail, ShieldCheck, Crown, Sparkles, LogOut, Trash2, ArrowRight, LayoutTemplate, CheckCircle2, AlertCircle, Loader2, MessageSquare, Inbox, Eye, Reply } from 'lucide-react';
import API from '../services/api';
import { useEffect } from 'react';

function MessagesInbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

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

  const deleteMessage = async (id) => {
    if (!window.confirm('Delete this contact message?')) return;
    try {
      await API.delete(`/messages/${id}`);
      fetchMessages();
    } catch (err) {
      console.error('Delete message error:', err);
    }
  };

  return (
    <div className="glass-card gradient-border rounded-3xl p-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
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
        <button
          onClick={fetchMessages}
          className="btn-ghost px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5"
        >
          <span>Refresh Inbox</span>
        </button>
      </div>

      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center text-slate-500 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
          <span className="text-xs">Loading your messages...</span>
        </div>
      ) : messages.length === 0 ? (
        <div className="py-12 glass rounded-2xl border border-white/[0.06] flex flex-col items-center justify-center text-center p-6">
          <MessageSquare className="w-10 h-10 text-slate-600 mb-3" />
          <h3 className="font-bold text-slate-300 text-sm mb-1">No Messages Received Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm">
            When visitors submit your portfolio's contact form, their inquiries will show up right here!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
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
                    onClick={() => deleteMessage(msg._id)}
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
    </div>
  );
}

export default function ProfileSettings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('WARNING: Are you sure you want to permanently delete your account and portfolio? This action CANNOT be undone.')) {
      return;
    }

    try {
      setLoading(true);
      await API.delete(`/admin/user/${user.id || user._id}`);
      dispatch(logout());
      navigate('/');
    } catch (err) {
      // Fallback
      dispatch(logout());
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-4xl mx-auto w-full">
        {/* Page Header */}
        <div className="mb-10 pb-6 border-b border-white/[0.06] flex items-center justify-between">
          <div>
            <div className="badge badge-indigo inline-flex mb-2">
              <User className="w-3.5 h-3.5" />
              <span>Account Settings</span>
            </div>
            <h1 className="font-heading font-black text-3xl text-white">User Profile & Subscription</h1>
          </div>
          <Link
            to="/editor"
            className="btn-primary px-4 py-2.5 rounded-xl text-white text-xs font-bold flex items-center gap-2"
          >
            <LayoutTemplate className="w-4 h-4" />
            <span>Open Portfolio Editor</span>
          </Link>
        </div>

        <div className="space-y-8">
          {/* Profile Overview Card */}
          <div className="glass-card gradient-border rounded-3xl p-8">
            <h2 className="font-heading font-bold text-xl text-white mb-6">Profile Information</h2>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border-2 border-indigo-500/40 flex items-center justify-center font-heading font-black text-2xl text-indigo-400">
                  {user.username?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white mb-1 flex items-center gap-2">
                    <span>{user.username}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                      user.role === 'admin' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {user.role}
                    </span>
                  </h3>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>

              {/* Plan Status Badge */}
              <div className="glass p-4 rounded-2xl border border-white/10 flex items-center gap-4 shrink-0">
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Plan</div>
                  <div className="font-heading font-bold text-sm text-white uppercase flex items-center gap-1.5 mt-0.5">
                    {user.plan === 'studio' ? (
                      <>
                        <Crown className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Studio Plan</span>
                      </>
                    ) : user.plan === 'pro' ? (
                      <>
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span className="text-indigo-400">Pro Creator</span>
                      </>
                    ) : (
                      <span className="text-slate-400">Free Standard</span>
                    )}
                  </div>
                </div>

                <Link
                  to="/pricing"
                  className="btn-primary px-3 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1"
                >
                  <span>{user.plan === 'free' ? 'Upgrade Plan' : 'Manage Subscription'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* ─── Received Contact Messages Inbox ────────────────────────── */}
          <MessagesInbox />

          {/* Quick Actions */}
          <div className="glass-card gradient-border rounded-3xl p-8">
            <h2 className="font-heading font-bold text-xl text-white mb-6">Account Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleLogout}
                className="p-4 rounded-2xl glass border border-white/10 hover:border-white/20 flex items-center justify-between group transition text-left"
              >
                <div>
                  <div className="font-bold text-white text-sm mb-1 group-hover:text-indigo-400 transition flex items-center gap-2">
                    <LogOut className="w-4 h-4 text-indigo-400" />
                    <span>Sign Out</span>
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
                    <span>View Pricing Plans</span>
                  </div>
                  <p className="text-slate-500 text-xs">Explore Pro and Studio features, templates, and analytics.</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Danger Zone — Account Deletion */}
          <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20">
            <h2 className="font-heading font-bold text-xl text-red-400 mb-2 flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              <span>Danger Zone</span>
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Permanently delete your account, your user credentials, and your live portfolio layout from PortfolioCraft. This action is permanent and cannot be undone.
            </p>

            <button
              onClick={handleDeleteAccount}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 font-bold text-xs transition flex items-center gap-2 disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              <span>Delete My Account Permanently</span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
