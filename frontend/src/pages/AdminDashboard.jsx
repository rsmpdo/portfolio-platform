import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { ShieldAlert, Users, DollarSign, Crown, Sparkles, Layers, Mail, AlertCircle, Trash2, Eye, EyeOff, CheckCircle2, Loader2, Send, Inbox, Reply } from 'lucide-react';
import API from '../services/api';

function AdminMessagesSection() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchAdminMessages = async () => {
    try {
      setLoading(true);
      const res = await API.get('/messages/admin');
      if (res.data.success) {
        setMessages(res.data.messages || []);
        setUnreadCount(res.data.unreadCount || 0);
      }
    } catch (err) {
      console.error('Fetch admin messages error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminMessages();
  }, []);

  const toggleReadStatus = async (id) => {
    try {
      await API.get(`/messages/${id}/read`);
      fetchAdminMessages();
    } catch (err) {
      console.error('Toggle read error:', err);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Delete this message permanently from platform logs?')) return;
    try {
      await API.delete(`/messages/${id}`);
      fetchAdminMessages();
    } catch (err) {
      console.error('Delete message error:', err);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
          <Mail className="w-5 h-5 text-indigo-400" />
          <span>Platform Contact Messages & Inquiries ({messages.length})</span>
          {unreadCount > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs animate-pulse">
              {unreadCount} Unread
            </span>
          )}
        </h2>
        <button
          onClick={fetchAdminMessages}
          className="btn-ghost px-3 py-1 rounded-xl text-xs text-slate-400 hover:text-white font-semibold flex items-center gap-1"
        >
          <span>Refresh Messages</span>
        </button>
      </div>

      <div className="glass gradient-border rounded-3xl p-6">
        {loading ? (
          <div className="py-10 text-center text-slate-500 text-xs flex flex-col items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
            <span>Fetching site-wide contact messages...</span>
          </div>
        ) : messages.length === 0 ? (
          <div className="py-10 text-center text-slate-500 text-xs">
            No contact messages recorded on the platform yet.
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`p-4 rounded-2xl glass border transition-all ${
                  !msg.isRead ? 'border-amber-500/40 bg-amber-500/5' : 'border-white/[0.06]'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2 pb-2 border-b border-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center">
                      {msg.senderName?.[0]?.toUpperCase() || 'S'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white">{msg.senderName}</span>
                        <span className="text-xs font-mono text-indigo-300">({msg.senderEmail})</span>
                        {msg.isSiteAdminMessage ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase">
                            Site Inquiry
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono">
                            Target: /p/{msg.recipientHandle || 'portfolio'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 text-xs">
                    <span className="text-[10px] font-mono text-slate-500 mr-1">
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                    <a
                      href={`mailto:${msg.senderEmail}?subject=Re: ${encodeURIComponent(msg.subject || 'PortfolioCraft Inquiry')}`}
                      className="p-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 font-semibold flex items-center gap-1 transition"
                    >
                      <Reply className="w-3 h-3" />
                      <span>Reply</span>
                    </a>
                    <button
                      onClick={() => toggleReadStatus(msg._id)}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition"
                      title={msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteMessage(msg._id)}
                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition"
                      title="Delete Message"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {msg.subject && (
                  <div className="text-xs font-semibold text-slate-300 mb-1">Subject: {msg.subject}</div>
                )}
                <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [stats, setStats] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [layoutsList, setLayoutsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  // Warning Modal State
  const [warnUser, setWarnUser] = useState(null);
  const [warningMessage, setWarningMessage] = useState('');
  const [sendingWarn, setSendingWarn] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const [statsRes, usersRes, layoutsRes] = await Promise.all([
          API.get('/admin/stats'),
          API.get('/admin/users'),
          API.get('/admin/layouts')
        ]);

        if (statsRes.data.success) setStats(statsRes.data.stats);
        if (usersRes.data.success) setUsersList(usersRes.data.users);
        if (layoutsRes.data.success) setLayoutsList(layoutsRes.data.layouts);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch admin dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handlePlanChange = async (userId, newPlan) => {
    try {
      const res = await API.put(`/admin/user/${userId}/plan`, { plan: newPlan });
      if (res.data.success) {
        setUsersList(usersList.map((u) => (u._id === userId ? { ...u, plan: newPlan } : u)));
        setActionMessage(`Updated plan for user to ${newPlan}`);
        setTimeout(() => setActionMessage(''), 3000);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update plan');
    }
  };

  const handleSendWarning = async (e) => {
    e.preventDefault();
    if (!warnUser || !warningMessage) return;

    try {
      setSendingWarn(true);
      const res = await API.put(`/admin/user/${warnUser._id}/warn`, { warningMessage });
      if (res.data.success) {
        setActionMessage(`Warning sent to ${warnUser.email}`);
        setWarnUser(null);
        setWarningMessage('');
        setTimeout(() => setActionMessage(''), 3000);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send warning');
    } finally {
      setSendingWarn(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user and their portfolio?')) return;

    try {
      const res = await API.delete(`/admin/user/${userId}`);
      if (res.data.success) {
        setUsersList(usersList.filter((u) => u._id !== userId));
        setActionMessage('User and portfolio deleted');
        setTimeout(() => setActionMessage(''), 3000);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  const handleTogglePublish = async (layoutId) => {
    try {
      const res = await API.put(`/admin/layout/${layoutId}/toggle-publish`);
      if (res.data.success) {
        setLayoutsList(layoutsList.map((l) => (l._id === layoutId ? { ...l, isPublished: res.data.layout.isPublished } : l)));
        setActionMessage('Updated portfolio publication status');
        setTimeout(() => setActionMessage(''), 3000);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update layout status');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/[0.06]">
          <div>
            <div className="badge badge-indigo inline-flex mb-3">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Moderation Dashboard</span>
            </div>
            <h1 className="font-heading font-black text-3xl md:text-4xl text-white">
              System Control & Moderation
            </h1>
          </div>

          {actionMessage && (
            <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{actionMessage}</span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 text-indigo-400 animate-spin mx-auto mb-4" />
            <p className="text-slate-500 text-sm">Loading admin metrics & users...</p>
          </div>
        ) : error ? (
          <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm max-w-md mx-auto text-center">
            {error}
          </div>
        ) : (
          <div className="space-y-12">
            {/* System Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="glass-card gradient-border rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Users</span>
                  <Users className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="font-heading font-black text-3xl text-white">{stats?.totalUsers || 0}</div>
              </div>

              <div className="glass-card gradient-border rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Revenue</span>
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="font-heading font-black text-3xl text-white">${stats?.totalRevenue || 0}</div>
              </div>

              <div className="glass-card gradient-border rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pro Subscribers</span>
                  <Crown className="w-5 h-5 text-amber-400" />
                </div>
                <div className="font-heading font-black text-3xl text-white">{stats?.proUsers || 0}</div>
              </div>

              <div className="glass-card gradient-border rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Studio Subscribers</span>
                  <Sparkles className="w-5 h-5 text-pink-400" />
                </div>
                <div className="font-heading font-black text-3xl text-white">{stats?.studioUsers || 0}</div>
              </div>
            </div>

            {/* Users Moderation Section */}
            <div>
              <h2 className="font-heading font-bold text-xl text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400" />
                <span>User Accounts & Plan Control ({usersList.length})</span>
              </h2>

              <div className="glass gradient-border rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/[0.02] border-b border-white/[0.06] text-slate-400 uppercase tracking-wider font-bold">
                      <tr>
                        <th className="p-4">User</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Current Plan</th>
                        <th className="p-4">Registered</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06]">
                      {usersList.map((u) => (
                        <tr key={u._id} className="hover:bg-white/[0.02] transition">
                          <td className="p-4 font-bold text-white flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono">
                              {u.username[0].toUpperCase()}
                            </span>
                            <span>{u.username}</span>
                          </td>
                          <td className="p-4 text-slate-300 font-mono">{u.email}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase ${
                              u.role === 'admin' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="p-4">
                            <select
                              value={u.plan || 'free'}
                              onChange={(e) => handlePlanChange(u._id, e.target.value)}
                              className="input-field px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-900 border-white/10"
                            >
                              <option value="free">FREE</option>
                              <option value="pro">PRO ($12)</option>
                              <option value="studio">STUDIO ($29)</option>
                            </select>
                          </td>
                          <td className="p-4 text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => setWarnUser(u)}
                              className="px-3 py-1.5 rounded-lg btn-ghost text-amber-400 hover:text-amber-300 text-xs font-semibold"
                            >
                              Warn User
                            </button>
                            <button
                              onClick={() => handleDeleteUser(u._id)}
                              className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Layouts Moderation Section */}
            <div>
              <h2 className="font-heading font-bold text-xl text-white mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                <span>Portfolio Content Moderation ({layoutsList.length})</span>
              </h2>

              <div className="glass gradient-border rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/[0.02] border-b border-white/[0.06] text-slate-400 uppercase tracking-wider font-bold">
                      <tr>
                        <th className="p-4">Portfolio Title</th>
                        <th className="p-4">Handle URL</th>
                        <th className="p-4">Owner</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Moderation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06]">
                      {layoutsList.map((l) => (
                        <tr key={l._id} className="hover:bg-white/[0.02] transition">
                          <td className="p-4 font-bold text-white">{l.title || 'Untitled Portfolio'}</td>
                          <td className="p-4 text-indigo-400 font-mono">/p/{l.handle}</td>
                          <td className="p-4 text-slate-300">{l.userId?.username || 'User'}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                              l.isPublished ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                              {l.isPublished ? 'Published' : 'Hidden / Banned'}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <a
                              href={`/p/${l.handle}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-lg btn-ghost text-slate-300 hover:text-white inline-flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" /> View
                            </a>
                            <button
                              onClick={() => handleTogglePublish(l._id)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                                l.isPublished ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                              }`}
                            >
                              {l.isPublished ? 'Ban Portfolio' : 'Unban Portfolio'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* ─── Contact Messages Moderation Section ────────────────── */}
            <AdminMessagesSection />
          </div>
        )}
      </main>

      {/* Moderation Warning Modal */}
      {warnUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="glass gradient-border rounded-3xl max-w-md w-full p-8 shadow-2xl relative">
            <h3 className="font-heading font-bold text-xl text-white mb-2">Send Moderation Warning</h3>
            <p className="text-slate-400 text-xs mb-6">
              Send an official compliance notice email to <span className="text-indigo-400 font-mono">{warnUser.email}</span>.
            </p>

            <form onSubmit={handleSendWarning} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">Warning Message</label>
                <textarea
                  rows={4}
                  required
                  value={warningMessage}
                  onChange={(e) => setWarningMessage(e.target.value)}
                  placeholder="Please remove inappropriate text/images from your portfolio within 24 hours..."
                  className="input-field w-full px-3.5 py-2.5 rounded-xl text-xs resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setWarnUser(null)}
                  className="btn-ghost px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sendingWarn}
                  className="btn-primary px-5 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2"
                >
                  {sendingWarn ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>Send Warning Email</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
