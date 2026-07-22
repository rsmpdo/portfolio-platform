import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { ShieldAlert, Users, DollarSign, Crown, Sparkles, Layers, Mail, AlertCircle, Trash2, Eye, EyeOff, CheckCircle2, Loader2, Send, Inbox, Reply, Briefcase, RefreshCw, ExternalLink } from 'lucide-react';
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

function JobApplicationsSection() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await API.get('/careers/admin');
      if (res.data.success) {
        setApplications(res.data.applications || []);
      }
    } catch (err) {
      console.error('Fetch job applications error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleUpdateStatus = async (appId, newStatus) => {
    try {
      setUpdatingId(appId);
      await API.put(`/careers/admin/${appId}/status`, { status: newStatus });
      fetchApplications();
    } catch (err) {
      alert('Failed to update status: ' + (err.response?.data?.message || err.message));
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteApp = async (appId) => {
    if (!window.confirm('Delete this job application record?')) return;
    try {
      await API.delete(`/careers/admin/${appId}`);
      fetchApplications();
    } catch (err) {
      alert('Failed to delete application: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="glass-card gradient-border rounded-3xl p-8 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <span>Careers Job Applications</span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold font-mono border border-indigo-500/30">
                {applications.length} Received
              </span>
            </h2>
            <p className="text-slate-400 text-xs">Review and manage candidate applications submitted via the Careers page</p>
          </div>
        </div>

        <button
          onClick={fetchApplications}
          className="px-3.5 py-1.5 rounded-xl glass border border-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh List</span>
        </button>
      </div>

      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center text-slate-500 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
          <span className="text-xs">Loading job applications...</span>
        </div>
      ) : applications.length === 0 ? (
        <div className="py-12 text-center text-slate-500 glass rounded-2xl border border-white/5">
          <Briefcase className="w-8 h-8 mx-auto mb-2 opacity-40 text-indigo-400" />
          <p className="text-sm font-semibold text-slate-400 mb-1">No Job Applications Received Yet</p>
          <p className="text-xs text-slate-500">Applications submitted by candidates on the /careers page will appear here instantly.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-500 uppercase font-mono tracking-wider border-b border-white/5 pb-3">
                <th className="pb-3 px-3">Ref ID</th>
                <th className="pb-3 px-3">Candidate</th>
                <th className="pb-3 px-3">Position</th>
                <th className="pb-3 px-3">Links</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {applications.map((app) => (
                <tr key={app._id} className="hover:bg-white/[0.02] transition">
                  <td className="py-3.5 px-3 font-mono text-indigo-300 font-bold whitespace-nowrap">
                    {app.referenceId}
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-white text-sm">{app.fullName}</div>
                    <div className="text-slate-400 text-xs flex items-center gap-1 font-mono">
                      <Mail className="w-3 h-3 text-slate-500" />
                      <span>{app.email}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="font-semibold text-slate-200">{app.jobTitle}</div>
                    <div className="text-slate-500 text-[10px] uppercase tracking-widest font-mono">{app.department}</div>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex flex-col gap-1">
                      <a
                        href={app.portfolioUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-400 hover:underline text-xs flex items-center gap-1 font-mono"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Portfolio / GitHub</span>
                      </a>
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-white text-xs flex items-center gap-1 font-mono"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Resume / CV</span>
                      </a>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <select
                      value={app.status}
                      disabled={updatingId === app._id}
                      onChange={(e) => handleUpdateStatus(app._id, e.target.value)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold font-mono border cursor-pointer focus:outline-none ${
                        app.status === 'shortlisted'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : app.status === 'reviewed'
                          ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                          : app.status === 'rejected'
                          ? 'bg-red-500/20 text-red-400 border-red-500/30'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      }`}
                    >
                      <option value="pending" className="bg-slate-900 text-amber-300 font-bold">Pending</option>
                      <option value="reviewed" className="bg-slate-900 text-indigo-300 font-bold">Reviewed</option>
                      <option value="shortlisted" className="bg-slate-900 text-emerald-300 font-bold">Shortlisted</option>
                      <option value="rejected" className="bg-slate-900 text-red-300 font-bold">Rejected</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleDeleteApp(app._id)}
                      className="p-1.5 rounded-xl hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition"
                      title="Delete Application"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
      setLoading(true);
      let hasErrors = false;

      try {
        const statsRes = await API.get('/admin/stats');
        if (statsRes.data.success) setStats(statsRes.data.stats);
      } catch (err) {
        console.error('Fetch stats error:', err);
      }

      try {
        const usersRes = await API.get('/admin/users');
        if (usersRes.data.success) setUsersList(usersRes.data.users);
      } catch (err) {
        console.error('Fetch users error:', err);
      }

      try {
        const layoutsRes = await API.get('/admin/layouts');
        if (layoutsRes.data.success) setLayoutsList(layoutsRes.data.layouts);
      } catch (err) {
        console.error('Fetch layouts error:', err);
      }

      setLoading(false);
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
                      {usersList.map((u) => {
                        if (!u) return null;
                        return (
                          <tr key={u._id || Math.random()} className="hover:bg-white/[0.02] transition">
                            <td className="p-4 font-bold text-white flex items-center gap-2">
                              <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono">
                                {(u.username || u.email || 'U')[0].toUpperCase()}
                              </span>
                              <span>{u.username || u.email?.split('@')[0] || 'User'}</span>
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
                            <td className="p-4 text-slate-500">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
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
                        );
                      })}
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
                      {layoutsList.map((l) => {
                        const isProtectedShowcase = ['alex', 'marcus', 'elena', 'demo', 'sample'].includes((l.handle || '').toLowerCase());
                        return (
                          <tr key={l._id} className="hover:bg-white/[0.02] transition">
                            <td className="p-4 font-bold text-white flex items-center gap-2">
                              <span>{l.title || 'Untitled Portfolio'}</span>
                              {isProtectedShowcase && (
                                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono font-bold shrink-0">
                                  System Showcase
                                </span>
                              )}
                            </td>
                            <td className="p-4 text-indigo-400 font-mono">/p/{l.handle}</td>
                            <td className="p-4 text-slate-300">{l.userId?.username || 'User'}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                                l.isPublished ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                              }`}>
                                {l.isPublished ? 'Published' : 'Hidden / Banned'}
                              </span>
                            </td>
                            <td className="p-4 text-right space-x-2 whitespace-nowrap">
                              <a
                                href={`/p/${l.handle}`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 rounded-lg btn-ghost text-slate-300 hover:text-white inline-flex items-center gap-1"
                              >
                                <Eye className="w-3.5 h-3.5" /> View
                              </a>
                              {isProtectedShowcase ? (
                                <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-500 text-xs font-bold border border-white/5 cursor-not-allowed inline-flex items-center gap-1" title="System showcase portfolio cannot be unpublished">
                                  Protected
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleTogglePublish(l._id)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                                    l.isPublished ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                                  }`}
                                >
                                  {l.isPublished ? 'Ban Portfolio' : 'Unban Portfolio'}
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* ─── Platform Contact Messages Inbox ────────────────────────── */}
            <AdminMessagesSection />

            {/* ─── Careers Job Applications Management ────────────────────────── */}
            <JobApplicationsSection />
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
