import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import {
  ShieldAlert,
  Users,
  DollarSign,
  Crown,
  Layers,
  Mail,
  AlertCircle,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  Loader2,
  Send,
  Inbox,
  Reply,
  Briefcase,
  RefreshCw,
  ExternalLink,
  FileText,
  XCircle,
  Clock,
  Lock,
  Unlock,
  KeyRound,
  Search,
  Filter,
  X
} from 'lucide-react';
import API from '../services/api';

function AdminMessagesSection() {
  const [messages, setMessages] = useState([]);
  const [recipientStats, setRecipientStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  // Filters for Recipient Contact Analytics Table
  const [statTypeFilter, setStatTypeFilter] = useState('all'); // 'all' | 'user' | 'showcase' | 'platform'
  const [statSearch, setStatSearch] = useState('');

  // Filters for Chronological Contact Events Log
  const [msgReadFilter, setMsgReadFilter] = useState('all'); // 'all' | 'unread' | 'read'
  const [msgTypeFilter, setMsgTypeFilter] = useState('all'); // 'all' | 'user' | 'showcase' | 'platform'
  const [msgSearch, setMsgSearch] = useState('');

  // Delete Message Popup Modal State
  const [deleteMsgTarget, setDeleteMsgTarget] = useState(null);
  const [deletingMsg, setDeletingMsg] = useState(false);

  // Password Authorization State for Message Bodies
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockedBodies, setUnlockedBodies] = useState({});
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const fetchAdminMessages = async () => {
    try {
      setLoading(true);
      const res = await API.get('/messages/admin');
      if (res.data.success) {
        setMessages(res.data.messages || []);
        setRecipientStats(res.data.recipientStats || []);
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

  const handleUnlockMessages = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (!authPassword.trim()) {
      setAuthError('Please enter your Admin Password or Administrator Secret Code.');
      return;
    }

    try {
      setAuthLoading(true);
      const res = await API.post('/messages/admin/unlock', { password: authPassword });
      if (res.data.success) {
        setUnlockedBodies(res.data.unlockedBodies || {});
        setIsUnlocked(true);
        setShowUnlockModal(false);
        setAuthPassword('');
      }
    } catch (err) {
      setAuthError(
        err.response?.data?.message || 'Invalid password or authorization code. Access denied.'
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLockMessages = () => {
    setIsUnlocked(false);
    setUnlockedBodies({});
  };

  const toggleReadStatus = async (id) => {
    try {
      await API.get(`/messages/${id}/read`);
      fetchAdminMessages();
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
      fetchAdminMessages();
    } catch (err) {
      console.error('Delete message error:', err);
    } finally {
      setDeletingMsg(false);
    }
  };

  const filteredRecipientStats = recipientStats.filter((stat) => {
    const matchesType =
      statTypeFilter === 'all' ? true : (stat.recipientType || 'user') === statTypeFilter;
    const q = statSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      (stat.recipientName || '').toLowerCase().includes(q) ||
      (stat.route || '').toLowerCase().includes(q) ||
      (stat.recipientEmail || '').toLowerCase().includes(q) ||
      (stat.lastSender?.name || '').toLowerCase().includes(q) ||
      (stat.lastSender?.email || '').toLowerCase().includes(q);
    return matchesType && matchesSearch;
  });

  const filteredMessages = messages.filter((msg) => {
    const matchesRead =
      msgReadFilter === 'all'
        ? true
        : msgReadFilter === 'unread'
        ? !msg.isRead
        : msg.isRead;
    const matchesType =
      msgTypeFilter === 'all' ? true : (msg.recipientType || 'user') === msgTypeFilter;
    const q = msgSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      (msg.senderName || '').toLowerCase().includes(q) ||
      (msg.senderEmail || '').toLowerCase().includes(q) ||
      (msg.recipientName || '').toLowerCase().includes(q) ||
      (msg.recipientRoute || '').toLowerCase().includes(q) ||
      (msg.subject || '').toLowerCase().includes(q);
    return matchesRead && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-400" />
              <span>User & Showcase Contact Frequency Analytics</span>
              {unreadCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs animate-pulse">
                  {unreadCount} Unread
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Tracks which Users and Showcase Creators are contacted via contact forms, how many times, and by whom.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {isUnlocked ? (
              <button
                onClick={handleLockMessages}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Lock Message Bodies</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setAuthError('');
                  setShowUnlockModal(true);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Unlock Message Bodies</span>
              </button>
            )}

            <button
              onClick={fetchAdminMessages}
              className="btn-ghost px-3.5 py-1.5 rounded-xl text-xs text-slate-300 hover:text-white font-semibold flex items-center gap-1.5 border border-white/10"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 p-3.5 rounded-2xl glass border border-white/[0.06]">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: `All Recipients (${recipientStats.length})` },
              { id: 'user', label: `User Portfolios (${recipientStats.filter((s) => (s.recipientType || 'user') === 'user').length})` },
              { id: 'showcase', label: `Showcase Creators (${recipientStats.filter((s) => s.recipientType === 'showcase').length})` },
              { id: 'platform', label: `Platform Inquiries (${recipientStats.filter((s) => s.recipientType === 'platform').length})` }
            ].map((pill) => (
              <button
                key={pill.id}
                type="button"
                onClick={() => setStatTypeFilter(pill.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  statTypeFilter === pill.id
                    ? 'btn-primary text-white'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={statSearch}
              onChange={(e) => setStatSearch(e.target.value)}
              placeholder="Filter recipient or route..."
              className="input-field w-full pl-9 pr-8 py-2 rounded-xl text-xs"
            />
            {statSearch && (
              <button
                type="button"
                onClick={() => setStatSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="glass gradient-border rounded-3xl overflow-hidden">
          {loading ? (
            <div className="py-10 text-center text-slate-500 text-xs flex flex-col items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
              <span>Loading contact frequency analytics...</span>
            </div>
          ) : filteredRecipientStats.length === 0 ? (
            <div className="py-10 text-center text-slate-500 text-xs">
              No matching contact analytics found for the current filter.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.02] border-b border-white/[0.06] text-slate-400 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-4">Contacted Person / Portfolio</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Times Contacted</th>
                    <th className="p-4">Unique Senders</th>
                    <th className="p-4">Most Recent Sender & Topic</th>
                    <th className="p-4">Last Contacted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {filteredRecipientStats.map((stat) => (
                    <tr key={stat.key} className="hover:bg-white/[0.02] transition">
                      <td className="p-4">
                        <div className="font-bold text-white text-sm">{stat.recipientName}</div>
                        <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mt-0.5">
                          <span>{stat.route}</span>
                          {stat.recipientEmail && (
                            <span className="text-slate-500">({stat.recipientEmail})</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        {stat.recipientType === 'showcase' ? (
                          <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold uppercase">
                            Showcase Creator
                          </span>
                        ) : stat.recipientType === 'platform' ? (
                          <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase">
                            Platform Inquiry
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold uppercase">
                            User Portfolio
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono font-bold text-xs">
                          <span>{stat.totalContacts}</span>
                          <span>{stat.totalContacts === 1 ? 'Time' : 'Times'}</span>
                        </div>
                        {stat.unreadCount > 0 && (
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                            {stat.unreadCount} unread
                          </span>
                        )}
                      </td>
                      <td className="p-4 font-mono font-bold text-slate-300">
                        {stat.uniqueSendersCount} {stat.uniqueSendersCount === 1 ? 'person' : 'people'}
                      </td>
                      <td className="p-4">
                        {stat.lastSender ? (
                          <div>
                            <div className="font-semibold text-white">
                              {stat.lastSender.name}{' '}
                              <span className="text-indigo-300 font-mono text-[11px]">
                                ({stat.lastSender.email})
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 truncate max-w-xs">
                              Topic: {stat.lastSender.subject}
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-500 italic">No inquiries yet</span>
                        )}
                      </td>
                      <td className="p-4 font-mono text-slate-400 whitespace-nowrap">
                        {stat.lastContactedAt
                          ? new Date(stat.lastContactedAt).toLocaleString()
                          : ' - '}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
            <Inbox className="w-4 h-4 text-indigo-400" />
            <span>Recent Contact Form Events Log ({filteredMessages.length} / {messages.length})</span>
          </h3>
          {isUnlocked ? (
            <span className="text-[11px] text-emerald-400 font-mono font-bold flex items-center gap-1.5">
              <Unlock className="w-3.5 h-3.5" />
              <span>Authorized: Full message bodies visible</span>
            </span>
          ) : (
            <button
              onClick={() => {
                setAuthError('');
                setShowUnlockModal(true);
              }}
              className="text-[11px] text-amber-400 hover:text-amber-300 font-mono font-bold flex items-center gap-1.5 underline underline-offset-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Message bodies locked - Click to authorize with password</span>
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4 p-3.5 rounded-2xl glass border border-white/[0.06]">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-white/10 text-xs">
              {[
                { id: 'all', label: `All (${messages.length})` },
                { id: 'unread', label: `Unread (${unreadCount})` },
                { id: 'read', label: `Read (${messages.length - unreadCount})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMsgReadFilter(tab.id)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition ${
                    msgReadFilter === tab.id
                      ? 'bg-indigo-500 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <select
              value={msgTypeFilter}
              onChange={(e) => setMsgTypeFilter(e.target.value)}
              className="input-field px-3 py-1.5 rounded-xl text-xs bg-slate-900 border-white/10 font-semibold"
            >
              <option value="all">All Target Types</option>
              <option value="user">User Portfolios</option>
              <option value="showcase">Showcase Creators</option>
              <option value="platform">Platform Inquiries</option>
            </select>
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={msgSearch}
              onChange={(e) => setMsgSearch(e.target.value)}
              placeholder="Search sender, recipient, or topic..."
              className="input-field w-full pl-9 pr-8 py-2 rounded-xl text-xs"
            />
            {msgSearch && (
              <button
                type="button"
                onClick={() => setMsgSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="glass gradient-border rounded-3xl p-6">
          {loading ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              Loading contact activity log...
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              No contact form submissions match the current filter.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMessages.map((msg) => (
                <div
                  key={msg._id}
                  className={`p-4 rounded-2xl glass border transition-all space-y-3 ${
                    !msg.isRead ? 'border-amber-500/40 bg-amber-500/5' : 'border-white/[0.06]'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        {!msg.isRead ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase">
                            Unread
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase">
                            Read
                          </span>
                        )}
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold uppercase">
                          Contacted: {msg.recipientName} ({msg.recipientRoute})
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                          Total Contacted: {msg.recipientTotalContacts}x
                        </span>
                      </div>

                      <div className="text-xs text-slate-200">
                        <span className="text-slate-400">From Sender: </span>
                        <strong className="text-white">{msg.senderName}</strong>{' '}
                        <span className="font-mono text-indigo-300">({msg.senderEmail})</span>
                        {msg.subject && (
                          <>
                            <span className="text-slate-500 mx-2">·</span>
                            <span className="text-slate-300">
                              Inquiry Type: <strong>{msg.subject}</strong>
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0 text-xs">
                      <span className="text-[11px] font-mono text-slate-400 mr-1">
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>

                      {!isUnlocked && (
                        <button
                          onClick={() => {
                            setAuthError('');
                            setShowUnlockModal(true);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-semibold flex items-center gap-1 transition"
                          title="Enter password to view message body"
                        >
                          <Lock className="w-3 h-3" />
                          <span>Unlock Body</span>
                        </button>
                      )}

                      <button
                        onClick={() => toggleReadStatus(msg._id)}
                        className={`px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition border ${
                          msg.isRead
                            ? 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                            : 'bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/30 text-emerald-300'
                        }`}
                        title={msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{msg.isRead ? 'Mark Unread' : 'Mark as Read'}</span>
                      </button>

                      <a
                        href={`mailto:${msg.senderEmail}?subject=Re: ${encodeURIComponent(msg.subject || 'PortfolioCraft Inquiry')}`}
                        className="p-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 font-semibold flex items-center gap-1 transition"
                        title="Reply via Email"
                      >
                        <Reply className="w-3.5 h-3.5" />
                      </a>

                      <button
                        type="button"
                        onClick={() => setDeleteMsgTarget(msg)}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition"
                        title="Delete Log Entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {isUnlocked && unlockedBodies[msg._id] !== undefined && (
                    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/25 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1">
                        <Unlock className="w-3 h-3" />
                        <span>Unlocked Inquiry Message Body:</span>
                      </div>
                      {unlockedBodies[msg._id]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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
                  <h3 className="font-heading font-bold text-base text-white">Delete Contact Log Entry?</h3>
                  <p className="text-[11px] text-slate-400">
                    From {deleteMsgTarget.senderName} → {deleteMsgTarget.recipientName}
                  </p>
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
              Are you sure you want to permanently remove this contact log entry from platform records?
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
                <span>Delete Log Entry</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {showUnlockModal && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowUnlockModal(false)}
        >
          <div
            className="glass gradient-border rounded-3xl p-7 max-w-md w-full shadow-2xl border border-amber-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-white">
                  Admin Password Authorization
                </h3>
                <p className="text-xs text-slate-400">
                  Verify identity to view private contact message bodies
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Enter your <strong>Admin Account Password</strong> or the{' '}
              <strong>Administrator Secret Code</strong> to unlock and read full message bodies for this session.
            </p>

            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleUnlockMessages} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Admin Password / Secret Code
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="Enter password or secret code..."
                  className="input-field w-full px-4 py-3 rounded-xl text-xs font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUnlockModal(false)}
                  className="px-4 py-2.5 rounded-xl glass text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={authLoading}
                  className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 disabled:opacity-60"
                >
                  {authLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Unlock className="w-3.5 h-3.5" />
                  )}
                  <span>Authorize & Unlock</span>
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

function JobApplicationsSection() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // Filters for Job Applications & CVs
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'reviewed' | 'shortlisted' | 'rejected'
  const [deptFilter, setDeptFilter] = useState('all');
  const [cvSearch, setCvSearch] = useState('');

  // Delete Application Popup Modal State
  const [deleteAppTarget, setDeleteAppTarget] = useState(null);
  const [deletingApp, setDeletingApp] = useState(false);

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
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const confirmDeleteApp = async () => {
    if (!deleteAppTarget) return;
    try {
      setDeletingApp(true);
      await API.delete(`/careers/admin/${deleteAppTarget._id}`);
      setDeleteAppTarget(null);
      fetchApplications();
    } catch (err) {
      console.error('Failed to delete application:', err);
    } finally {
      setDeletingApp(false);
    }
  };

  const departments = Array.from(
    new Set(applications.map((a) => a.department).filter(Boolean))
  );

  const filteredApplications = applications.filter((app) => {
    const matchesStatus =
      statusFilter === 'all' ? true : (app.status || 'pending') === statusFilter;
    const matchesDept =
      deptFilter === 'all' ? true : (app.department || '') === deptFilter;
    const q = cvSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      (app.fullName || '').toLowerCase().includes(q) ||
      (app.email || '').toLowerCase().includes(q) ||
      (app.referenceId || '').toLowerCase().includes(q) ||
      (app.jobTitle || '').toLowerCase().includes(q) ||
      (app.department || '').toLowerCase().includes(q);
    return matchesStatus && matchesDept && matchesSearch;
  });

  return (
    <div className="glass-card gradient-border rounded-3xl p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <span>Careers Job Applications & CVs</span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold font-mono border border-indigo-500/30">
                {filteredApplications.length} / {applications.length} Shown
              </span>
            </h2>
            <p className="text-slate-400 text-xs">
              Filter, review, and manage candidate CVs and job applications submitted via the Careers page
            </p>
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

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-6 p-3.5 rounded-2xl glass border border-white/[0.06]">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: `All CVs (${applications.length})` },
            { id: 'pending', label: `Pending (${applications.filter((a) => (a.status || 'pending') === 'pending').length})` },
            { id: 'reviewed', label: `Reviewed (${applications.filter((a) => a.status === 'reviewed').length})` },
            { id: 'shortlisted', label: `Shortlisted (${applications.filter((a) => a.status === 'shortlisted').length})` },
            { id: 'rejected', label: `Rejected (${applications.filter((a) => a.status === 'rejected').length})` }
          ].map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => setStatusFilter(pill.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                statusFilter === pill.id
                  ? 'btn-primary text-white'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white'
              }`}
            >
              {pill.label}
            </button>
          ))}

          {departments.length > 0 && (
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="input-field px-3 py-1.5 rounded-xl text-xs bg-slate-900 border-white/10 font-semibold ml-1"
            >
              <option value="all">All Departments</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="relative w-full lg:w-72">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={cvSearch}
            onChange={(e) => setCvSearch(e.target.value)}
            placeholder="Search candidate, email, Ref ID, role..."
            className="input-field w-full pl-9 pr-8 py-2 rounded-xl text-xs"
          />
          {cvSearch && (
            <button
              type="button"
              onClick={() => setCvSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center text-slate-500 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
          <span className="text-xs">Loading job applications...</span>
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="py-12 text-center text-slate-500 glass rounded-2xl border border-white/5">
          <Briefcase className="w-8 h-8 mx-auto mb-2 opacity-40 text-indigo-400" />
          <p className="text-sm font-semibold text-slate-400 mb-1">
            {applications.length === 0 ? 'No Job Applications Received Yet' : 'No Matching Applications Found'}
          </p>
          <p className="text-xs text-slate-500">
            {applications.length === 0
              ? 'Applications submitted by candidates on the /careers page will appear here instantly.'
              : 'Try adjusting or clearing your status, department, or search filters.'}
          </p>
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
              {filteredApplications.map((app) => (
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
                      type="button"
                      onClick={() => setDeleteAppTarget(app)}
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

      {deleteAppTarget && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => !deletingApp && setDeleteAppTarget(null)}
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
                  <h3 className="font-heading font-bold text-base text-white">Delete Job Application?</h3>
                  <p className="text-[11px] text-slate-400">
                    {deleteAppTarget.fullName} ({deleteAppTarget.referenceId})
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDeleteAppTarget(null)}
                disabled={deletingApp}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              Are you sure you want to permanently remove the application for <strong className="text-white">{deleteAppTarget.jobTitle}</strong> submitted by <strong className="text-white">{deleteAppTarget.fullName}</strong>?
            </p>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteAppTarget(null)}
                disabled={deletingApp}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteApp}
                disabled={deletingApp}
                className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 transition disabled:opacity-50"
              >
                {deletingApp ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>Delete Application</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Active Section ('users' | 'portfolios' | 'messages' | 'payments' | 'careers') - No 'all' section
  const [activeTab, setActiveTab] = useState('users');

  const [stats, setStats] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [layoutsList, setLayoutsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  // Section 1: User Accounts & Plan Control Filters & Selected User Inspector
  const [userPlanFilter, setUserPlanFilter] = useState('all'); // 'all' | 'free' | 'pro' | 'studio'
  const [userRoleFilter, setUserRoleFilter] = useState('all'); // 'all' | 'standard' | 'admin'
  const [userSearch, setUserSearch] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Section 2: Portfolio Content Moderation Filters
  const [layoutStatusFilter, setLayoutStatusFilter] = useState('all'); // 'all' | 'published' | 'unpublished' | 'banned' | 'showcase'
  const [layoutSearch, setLayoutSearch] = useState('');

  // Section 4: Manual Payment Requests Filters
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all'); // 'all' | 'pending' | 'approved' | 'rejected'
  const [paymentPlanFilter, setPaymentPlanFilter] = useState('all'); // 'all' | 'pro' | 'studio'
  const [paymentSearch, setPaymentSearch] = useState('');

  // Warning Modal State
  const [warnUser, setWarnUser] = useState(null);
  const [warningMessage, setWarningMessage] = useState('');
  const [sendingWarn, setSendingWarn] = useState(false);

  // Payment Requests State
  const [paymentRequests, setPaymentRequests] = useState([]);
  const [reviewingRequest, setReviewingRequest] = useState(null); // { id, action: 'approve'|'reject' }
  const [reviewNote, setReviewNote] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);

  // Admin Password Authorization Modal State for Delete User & Ban Portfolio
  const [adminAuthModal, setAdminAuthModal] = useState(null); // { type: 'delete-user' | 'toggle-ban', targetUser?, targetLayout? }
  const [adminAuthPassword, setAdminAuthPassword] = useState('');
  const [adminAuthError, setAdminAuthError] = useState('');
  const [adminAuthLoading, setAdminAuthLoading] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);

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

      try {
        const prRes = await API.get('/admin/payment-requests');
        if (prRes.data.success) setPaymentRequests(prRes.data.requests);
      } catch (err) {
        console.error('Fetch payment requests error:', err);
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

  const handleDeleteUser = (userObj) => {
    setAdminAuthModal({ type: 'delete-user', targetUser: userObj });
    setAdminAuthPassword('');
    setAdminAuthError('');
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

  const handleToggleBan = (layoutObj) => {
    setAdminAuthModal({ type: 'toggle-ban', targetLayout: layoutObj });
    setAdminAuthPassword('');
    setAdminAuthError('');
  };

  const handleConfirmAdminProtectedAction = async (e) => {
    e.preventDefault();
    if (!adminAuthModal) return;
    setAdminAuthError('');

    if (!adminAuthPassword.trim()) {
      setAdminAuthError('Please enter your Admin Password or Administrator Secret Code.');
      return;
    }

    try {
      setAdminAuthLoading(true);
      if (adminAuthModal.type === 'delete-user') {
        const targetId = adminAuthModal.targetUser._id;
        const res = await API.delete(`/admin/user/${targetId}`, {
          data: { password: adminAuthPassword },
          headers: { 'x-admin-password': adminAuthPassword }
        });
        if (res.data.success) {
          setUsersList(usersList.filter((u) => u._id !== targetId));
          setLayoutsList(layoutsList.filter((l) => String(l.userId?._id || l.userId) !== String(targetId)));
          setActionMessage(`User ${adminAuthModal.targetUser.email} and associated portfolios deleted.`);
          setTimeout(() => setActionMessage(''), 3500);
          setAdminAuthModal(null);
          setAdminAuthPassword('');
        }
      } else if (adminAuthModal.type === 'toggle-ban') {
        const layoutId = adminAuthModal.targetLayout._id;
        const res = await API.put(
          `/admin/layout/${layoutId}/toggle-ban`,
          { password: adminAuthPassword },
          { headers: { 'x-admin-password': adminAuthPassword } }
        );
        if (res.data.success) {
          setLayoutsList(
            layoutsList.map((l) =>
              l._id === layoutId ? { ...l, isBanned: res.data.layout.isBanned } : l
            )
          );
          setActionMessage(
            res.data.layout.isBanned
              ? `Portfolio /p/${adminAuthModal.targetLayout.handle} banned - hidden from public.`
              : `Portfolio /p/${adminAuthModal.targetLayout.handle} unbanned.`
          );
          setTimeout(() => setActionMessage(''), 3500);
          setAdminAuthModal(null);
          setAdminAuthPassword('');
        }
      }
    } catch (err) {
      setAdminAuthError(
        err.response?.data?.message || 'Invalid password or authorization code. Action denied.'
      );
    } finally {
      setAdminAuthLoading(false);
    }
  };

  const handleReviewRequest = async () => {
    if (!reviewingRequest) return;
    setReviewLoading(true);
    try {
      const endpoint = reviewingRequest.action === 'approve'
        ? `/admin/payment-request/${reviewingRequest.id}/approve`
        : `/admin/payment-request/${reviewingRequest.id}/reject`;
      const res = await API.put(endpoint, { adminNote: reviewNote });
      if (res.data.success) {
        setPaymentRequests(paymentRequests.map(r =>
          r._id === reviewingRequest.id ? { ...r, status: reviewingRequest.action === 'approve' ? 'approved' : 'rejected', adminNote: reviewNote } : r
        ));
        setActionMessage(res.data.message);
        setTimeout(() => setActionMessage(''), 4000);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Review action failed');
    } finally {
      setReviewLoading(false);
      setReviewingRequest(null);
      setReviewNote('');
    }
  };

  // Filtered Lists
  const filteredUsers = usersList.filter((u) => {
    if (!u) return false;
    const plan = (u.plan || 'free').toLowerCase();
    const role = (u.role || 'standard').toLowerCase();
    const matchesPlan = userPlanFilter === 'all' ? true : plan === userPlanFilter;
    const matchesRole = userRoleFilter === 'all' ? true : role === userRoleFilter;
    const q = userSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      (u.username || '').toLowerCase().includes(q) ||
      (u.fullName || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q);
    return matchesPlan && matchesRole && matchesSearch;
  });

  const selectedUser = usersList.find((u) => u && u._id === selectedUserId) || null;
  const selectedUserLayouts = selectedUser
    ? layoutsList.filter(
        (l) => l && String(l.userId?._id || l.userId || '') === String(selectedUser._id)
      )
    : [];

  const filteredLayouts = layoutsList.filter((l) => {
    if (!l) return false;
    const isProtectedShowcase = ['alex', 'marcus', 'elena', 'demo', 'sample'].includes(
      (l.handle || '').toLowerCase()
    );
    const matchesStatus =
      layoutStatusFilter === 'all'
        ? true
        : layoutStatusFilter === 'banned'
        ? !!l.isBanned
        : layoutStatusFilter === 'showcase'
        ? isProtectedShowcase
        : layoutStatusFilter === 'published'
        ? !l.isBanned && !!l.isPublished
        : !l.isBanned && !l.isPublished;
    const q = layoutSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      (l.title || '').toLowerCase().includes(q) ||
      (l.handle || '').toLowerCase().includes(q) ||
      (l.userId?.username || '').toLowerCase().includes(q) ||
      (l.userId?.email || '').toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const filteredPaymentRequests = paymentRequests.filter((r) => {
    if (!r) return false;
    const matchesStatus =
      paymentStatusFilter === 'all' ? true : (r.status || 'pending') === paymentStatusFilter;
    const matchesPlan =
      paymentPlanFilter === 'all' ? true : (r.plan || '').toLowerCase() === paymentPlanFilter;
    const q = paymentSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      (r.userId?.username || '').toLowerCase().includes(q) ||
      (r.email || '').toLowerCase().includes(q) ||
      (r.fullName || '').toLowerCase().includes(q) ||
      (r.country || '').toLowerCase().includes(q);
    return matchesStatus && matchesPlan && matchesSearch;
  });

  const pendingPaymentsCount = paymentRequests.filter((r) => r.status === 'pending').length;

  const adminSections = [
    {
      id: 'users',
      label: 'User Accounts & Plan Control',
      count: usersList.length,
      icon: Users
    },
    {
      id: 'portfolios',
      label: 'Portfolio Moderation',
      count: layoutsList.length,
      icon: Layers
    },
    {
      id: 'messages',
      label: 'Contact Analytics & Messages',
      icon: Mail
    },
    {
      id: 'payments',
      label: 'Payment Requests',
      count: paymentRequests.length,
      badge: pendingPaymentsCount > 0 ? `${pendingPaymentsCount} Pending` : null,
      icon: FileText
    },
    {
      id: 'careers',
      label: 'Job Applications & CVs',
      icon: Briefcase
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
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
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('users');
                  setUserPlanFilter('all');
                }}
                className="glass-card gradient-border rounded-3xl p-6 text-left transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Users</span>
                  <Users className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="font-heading font-black text-3xl text-white">{stats?.totalUsers || 0}</div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('payments')}
                className="glass-card gradient-border rounded-3xl p-6 text-left transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Revenue</span>
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="font-heading font-black text-3xl text-white">${stats?.totalRevenue || 0}</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('users');
                  setUserPlanFilter('pro');
                }}
                className="glass-card gradient-border rounded-3xl p-6 text-left transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pro Subscribers</span>
                  <Crown className="w-5 h-5 text-amber-400" />
                </div>
                <div className="font-heading font-black text-3xl text-white">{stats?.proUsers || 0}</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('users');
                  setUserPlanFilter('studio');
                }}
                className="glass-card gradient-border rounded-3xl p-6 text-left transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Studio Subscribers</span>
                  <Crown className="w-5 h-5 text-pink-400" />
                </div>
                <div className="font-heading font-black text-3xl text-white">{stats?.studioUsers || 0}</div>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl glass border border-white/[0.08]">
              {adminSections.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeTab === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setActiveTab(sec.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                      isActive
                        ? 'btn-primary text-white shadow-lg shadow-indigo-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{sec.label}</span>
                    {sec.count !== undefined && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-white/[0.06] text-slate-400'
                        }`}
                      >
                        {sec.count}
                      </span>
                    )}
                    {sec.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold animate-pulse">
                        {sec.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {activeTab === 'users' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-400" />
                    <span>User Accounts & Plan Control ({filteredUsers.length} / {usersList.length})</span>
                  </h2>
                  {(userPlanFilter !== 'all' || userRoleFilter !== 'all' || userSearch) && (
                    <button
                      type="button"
                      onClick={() => {
                        setUserPlanFilter('all');
                        setUserRoleFilter('all');
                        setUserSearch('');
                      }}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 self-start sm:self-auto"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reset Filters</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4 p-4 rounded-2xl glass border border-white/[0.06]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1 mr-1">
                      <Filter className="w-3 h-3 text-indigo-400" />
                      <span>Plan:</span>
                    </span>
                    {[
                      { id: 'all', label: `All Plans (${usersList.length})` },
                      {
                        id: 'free',
                        label: `Free (${usersList.filter((u) => (u?.plan || 'free') === 'free').length})`
                      },
                      {
                        id: 'pro',
                        label: `Pro $12 (${usersList.filter((u) => u?.plan === 'pro').length})`
                      },
                      {
                        id: 'studio',
                        label: `Studio $29 (${usersList.filter((u) => u?.plan === 'studio').length})`
                      }
                    ].map((pill) => (
                      <button
                        key={pill.id}
                        type="button"
                        onClick={() => setUserPlanFilter(pill.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                          userPlanFilter === pill.id
                            ? 'btn-primary text-white'
                            : 'bg-white/[0.04] text-slate-400 hover:text-white'
                        }`}
                      >
                        {pill.label}
                      </button>
                    ))}

                    <select
                      value={userRoleFilter}
                      onChange={(e) => setUserRoleFilter(e.target.value)}
                      className="input-field px-3 py-1.5 rounded-xl text-xs bg-slate-900 border-white/10 font-semibold ml-1"
                    >
                      <option value="all">All Roles</option>
                      <option value="standard">Standard Users</option>
                      <option value="admin">Admins Only</option>
                    </select>
                  </div>

                  <div className="relative w-full lg:w-72">
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      placeholder="Search username or email..."
                      className="input-field w-full pl-9 pr-8 py-2 rounded-xl text-xs"
                    />
                    {userSearch && (
                      <button
                        type="button"
                        onClick={() => setUserSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="glass gradient-border rounded-3xl overflow-hidden">
                  {filteredUsers.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 text-xs">
                      No users match the selected plan, role, or search query.
                    </div>
                  ) : (
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
                          {filteredUsers.map((u) => {
                            if (!u) return null;
                            const isSelected = selectedUserId === u._id;
                            return (
                              <tr
                                key={u._id || Math.random()}
                                onClick={() => setSelectedUserId((prev) => (prev === u._id ? null : u._id))}
                                className={`cursor-pointer transition ${
                                  isSelected
                                    ? 'bg-indigo-500/15 border-l-2 border-indigo-400'
                                    : 'hover:bg-white/[0.03]'
                                }`}
                              >
                                <td className="p-4 font-bold text-white flex items-center gap-2">
                                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono ${
                                    isSelected ? 'bg-indigo-500 text-white' : 'bg-indigo-500/20 text-indigo-400'
                                  }`}>
                                    {(u.username || u.email || 'U')[0].toUpperCase()}
                                  </span>
                                  <div>
                                    <span className="block">{u.username || u.email?.split('@')[0] || 'User'}</span>
                                    {u.fullName && (
                                      <span className="block text-[10px] font-normal text-slate-400">{u.fullName}</span>
                                    )}
                                  </div>
                                </td>
                                <td className="p-4 text-slate-300 font-mono">{u.email}</td>
                                <td className="p-4">
                                  <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase ${
                                    u.role === 'admin' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'
                                  }`}>
                                    {u.role}
                                  </span>
                                </td>
                                <td className="p-4" onClick={(e) => e.stopPropagation()}>
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
                                <td className="p-4 text-right space-x-2 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                                  <button
                                    type="button"
                                    onClick={() => setSelectedUserId((prev) => (prev === u._id ? null : u._id))}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition ${
                                      isSelected
                                        ? 'bg-indigo-500/25 text-indigo-300 border border-indigo-500/40'
                                        : 'btn-ghost text-indigo-400 hover:text-indigo-300'
                                    }`}
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>{isSelected ? 'Selected' : 'View Details'}</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setWarnUser(u)}
                                    className="px-3 py-1.5 rounded-lg btn-ghost text-amber-400 hover:text-amber-300 text-xs font-semibold"
                                  >
                                    Warn User
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteUser(u)}
                                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400"
                                    title="Delete User (Requires Admin Password)"
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
                  )}
                </div>

                <div className="mt-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                      <FileText className="w-5 h-5 text-indigo-400" />
                      <span>
                        Selected User Profile, Bio & Links
                        {selectedUser ? ` - @${selectedUser.username || selectedUser.email?.split('@')[0]}` : ''}
                      </span>
                    </h3>
                    {selectedUser && (
                      <button
                        type="button"
                        onClick={() => setSelectedUserId(null)}
                        className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 self-start sm:self-auto"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Clear Selection</span>
                      </button>
                    )}
                  </div>

                  <div className="glass gradient-border rounded-3xl overflow-hidden">
                    {!selectedUser ? (
                      <div className="py-12 px-6 text-center">
                        <Users className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-300 font-semibold text-sm mb-1">
                          No user selected
                        </p>
                        <p className="text-slate-500 text-xs">
                          Click any user row or the <span className="text-indigo-400 font-semibold">View Details</span> button in the table above to inspect their full profile, bio, social URLs, and portfolios.
                        </p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-white/[0.02] border-b border-white/[0.06] text-slate-400 uppercase tracking-wider font-bold">
                            <tr>
                              <th className="p-4 w-56">Profile Field</th>
                              <th className="p-4">Value / Details</th>
                              <th className="p-4 w-64">Additional Metadata</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/[0.06]">
                            <tr className="hover:bg-white/[0.02] transition">
                              <td className="p-4 font-bold text-slate-300">Username & Full Name</td>
                              <td className="p-4">
                                <div className="flex items-center gap-2.5">
                                  <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-mono font-bold text-sm">
                                    {(selectedUser.username || selectedUser.email || 'U')[0].toUpperCase()}
                                  </span>
                                  <div>
                                    <p className="font-bold text-white text-sm">
                                      {selectedUser.fullName || <span className="text-slate-500 italic font-normal">Full name not set</span>}
                                    </p>
                                    <p className="font-mono text-indigo-400 text-[11px]">
                                      @{selectedUser.username || selectedUser.email?.split('@')[0] || 'user'}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 font-mono text-[11px] text-slate-500">
                                ID: {selectedUser._id}
                              </td>
                            </tr>

                            <tr className="hover:bg-white/[0.02] transition">
                              <td className="p-4 font-bold text-slate-300">Email & Verification</td>
                              <td className="p-4 font-mono text-slate-200">{selectedUser.email}</td>
                              <td className="p-4">
                                <span
                                  className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase inline-flex items-center gap-1 ${
                                    selectedUser.isVerified
                                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                  }`}
                                >
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>{selectedUser.isVerified ? 'Verified Email' : 'Unverified'}</span>
                                </span>
                              </td>
                            </tr>

                            <tr className="hover:bg-white/[0.02] transition">
                              <td className="p-4 font-bold text-slate-300">Headline & Location</td>
                              <td className="p-4 text-slate-200">
                                {selectedUser.headline ? (
                                  <span className="font-semibold text-white">{selectedUser.headline}</span>
                                ) : (
                                  <span className="text-slate-500 italic">No headline provided</span>
                                )}
                              </td>
                              <td className="p-4 text-slate-300">
                                <span className="text-slate-500 mr-1.5">Location:</span>
                                {selectedUser.location ? (
                                  <span className="text-slate-200 font-semibold">{selectedUser.location}</span>
                                ) : (
                                  <span className="text-slate-500 italic">Not specified</span>
                                )}
                              </td>
                            </tr>

                            <tr className="hover:bg-white/[0.02] transition">
                              <td className="p-4 font-bold text-slate-300">Personal Bio / About</td>
                              <td className="p-4 text-slate-200 leading-relaxed whitespace-pre-wrap" colSpan={2}>
                                {selectedUser.bio ? (
                                  selectedUser.bio
                                ) : (
                                  <span className="text-slate-500 italic">No bio written by this user yet.</span>
                                )}
                              </td>
                            </tr>

                            <tr className="hover:bg-white/[0.02] transition">
                              <td className="p-4 font-bold text-slate-300">Social & External Links</td>
                              <td className="p-4" colSpan={2}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                  {[
                                    { label: 'Personal Website', url: selectedUser.website },
                                    { label: 'GitHub', url: selectedUser.github },
                                    { label: 'LinkedIn', url: selectedUser.linkedin },
                                    { label: 'Instagram / Social URL', url: selectedUser.twitter }
                                  ].map((item) => (
                                    <div
                                      key={item.label}
                                      className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between gap-1"
                                    >
                                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        {item.label}
                                      </span>
                                      {item.url ? (
                                        <a
                                          href={item.url.startsWith('http') ? item.url : `https://${item.url}`}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-indigo-400 hover:text-indigo-300 font-mono text-[11px] truncate inline-flex items-center gap-1"
                                          title={item.url}
                                        >
                                          <span className="truncate">{item.url}</span>
                                          <ExternalLink className="w-3 h-3 shrink-0" />
                                        </a>
                                      ) : (
                                        <span className="text-slate-600 italic text-[11px]">Not linked</span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </td>
                            </tr>

                            <tr className="hover:bg-white/[0.02] transition">
                              <td className="p-4 font-bold text-slate-300">Plan & Account Status</td>
                              <td className="p-4">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="px-2.5 py-1 rounded-full font-bold text-[10px] uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                    Plan: {(selectedUser.plan || 'free').toUpperCase()}
                                  </span>
                                  <span className="px-2.5 py-1 rounded-full font-bold text-[10px] uppercase bg-slate-800 text-slate-300">
                                    Role: {(selectedUser.role || 'standard').toUpperCase()}
                                  </span>
                                </div>
                              </td>
                              <td className="p-4 text-slate-400">
                                Joined: {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString() : 'N/A'}
                              </td>
                            </tr>

                            <tr className="hover:bg-white/[0.02] transition">
                              <td className="p-4 font-bold text-slate-300">
                                Owned Portfolios ({selectedUserLayouts.length})
                              </td>
                              <td className="p-4" colSpan={2}>
                                {selectedUserLayouts.length === 0 ? (
                                  <span className="text-slate-500 italic">This user has not created any portfolios yet.</span>
                                ) : (
                                  <div className="flex flex-wrap gap-2.5">
                                    {selectedUserLayouts.map((l) => (
                                      <div
                                        key={l._id}
                                        className="px-3.5 py-2 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3"
                                      >
                                        <div>
                                          <p className="font-bold text-white text-xs">{l.title || 'Untitled'}</p>
                                          <p className="font-mono text-[11px] text-indigo-400">/p/{l.handle}</p>
                                        </div>
                                        <span
                                          className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                                            l.isBanned
                                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                              : l.isPublished
                                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                              : 'bg-slate-800 text-slate-400'
                                          }`}
                                        >
                                          {l.isBanned ? 'Banned' : l.isPublished ? 'Published' : 'Draft'}
                                        </span>
                                        <Link
                                          to={`/p/${l.handle}`}
                                          target="_blank"
                                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-indigo-400 hover:text-indigo-300 transition"
                                          title="Open Live Portfolio"
                                        >
                                          <ExternalLink className="w-3.5 h-3.5" />
                                        </Link>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'portfolios' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-indigo-400" />
                    <span>Portfolio Content Moderation ({filteredLayouts.length} / {layoutsList.length})</span>
                  </h2>
                  {(layoutStatusFilter !== 'all' || layoutSearch) && (
                    <button
                      type="button"
                      onClick={() => {
                        setLayoutStatusFilter('all');
                        setLayoutSearch('');
                      }}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 self-start sm:self-auto"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reset Filters</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4 p-4 rounded-2xl glass border border-white/[0.06]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1 mr-1">
                      <Filter className="w-3 h-3 text-indigo-400" />
                      <span>Status:</span>
                    </span>
                    {[
                      { id: 'all', label: `All Portfolios (${layoutsList.length})` },
                      {
                        id: 'published',
                        label: `Published (${layoutsList.filter((l) => !l.isBanned && l.isPublished).length})`
                      },
                      {
                        id: 'unpublished',
                        label: `Unpublished (${layoutsList.filter((l) => !l.isBanned && !l.isPublished).length})`
                      },
                      {
                        id: 'banned',
                        label: `Banned (${layoutsList.filter((l) => l.isBanned).length})`
                      },
                      {
                        id: 'showcase',
                        label: `System Showcase (${layoutsList.filter((l) => ['alex', 'marcus', 'elena', 'demo', 'sample'].includes((l.handle || '').toLowerCase())).length})`
                      }
                    ].map((pill) => (
                      <button
                        key={pill.id}
                        type="button"
                        onClick={() => setLayoutStatusFilter(pill.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                          layoutStatusFilter === pill.id
                            ? 'btn-primary text-white'
                            : 'bg-white/[0.04] text-slate-400 hover:text-white'
                        }`}
                      >
                        {pill.label}
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full lg:w-72">
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={layoutSearch}
                      onChange={(e) => setLayoutSearch(e.target.value)}
                      placeholder="Search title, /p/handle, or owner..."
                      className="input-field w-full pl-9 pr-8 py-2 rounded-xl text-xs"
                    />
                    {layoutSearch && (
                      <button
                        type="button"
                        onClick={() => setLayoutSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="glass gradient-border rounded-3xl overflow-hidden">
                  {filteredLayouts.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 text-xs">
                      No portfolios match the selected status or search query.
                    </div>
                  ) : (
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
                          {filteredLayouts.map((l) => {
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
                                  {l.isBanned ? (
                                    <span className="px-2.5 py-1 rounded-full font-bold text-[10px] bg-red-500/20 text-red-400 border border-red-500/30">
                                      🚫 Banned
                                    </span>
                                  ) : l.isPublished ? (
                                    <span className="px-2.5 py-1 rounded-full font-bold text-[10px] bg-emerald-500/20 text-emerald-400">
                                      Published
                                    </span>
                                  ) : (
                                    <span className="px-2.5 py-1 rounded-full font-bold text-[10px] bg-slate-500/20 text-slate-400">
                                      Unpublished
                                    </span>
                                  )}
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
                                    <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-500 text-xs font-bold border border-white/5 cursor-not-allowed inline-flex items-center gap-1" title="System showcase portfolio cannot be modified">
                                      Protected
                                    </span>
                                  ) : (
                                    <>
                                      <button
                                        onClick={() => handleTogglePublish(l._id)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                                          l.isPublished
                                            ? 'bg-slate-500/10 text-slate-400 hover:bg-slate-500/20'
                                            : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                                        }`}
                                        title={l.isPublished ? 'Unpublish this portfolio' : 'Publish this portfolio'}
                                      >
                                        {l.isPublished ? (
                                          <><EyeOff className="w-3 h-3 inline mr-1" />Unpublish</>
                                        ) : (
                                          <><Eye className="w-3 h-3 inline mr-1" />Publish</>  
                                        )}
                                      </button>
                                      <button
                                        onClick={() => handleToggleBan(l)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                                          l.isBanned
                                            ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                                            : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                                        }`}
                                        title={l.isBanned ? 'Unban this portfolio (Requires Password)' : 'Ban this portfolio (Requires Password)'}
                                      >
                                        {l.isBanned ? '✓ Unban' : '🚫 Ban'}
                                      </button>
                                    </>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'messages' && <AdminMessagesSection />}

            {activeTab === 'payments' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-400" />
                    <span>Manual Payment Requests ({filteredPaymentRequests.length} / {paymentRequests.length})</span>
                    {pendingPaymentsCount > 0 && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs animate-pulse">
                        {pendingPaymentsCount} Pending
                      </span>
                    )}
                  </h2>
                  {(paymentStatusFilter !== 'all' || paymentPlanFilter !== 'all' || paymentSearch) && (
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentStatusFilter('all');
                        setPaymentPlanFilter('all');
                        setPaymentSearch('');
                      }}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 self-start sm:self-auto"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reset Filters</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4 p-4 rounded-2xl glass border border-white/[0.06]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1 mr-1">
                      <Filter className="w-3 h-3 text-indigo-400" />
                      <span>Status:</span>
                    </span>
                    {[
                      { id: 'all', label: `All Requests (${paymentRequests.length})` },
                      {
                        id: 'pending',
                        label: `Pending (${paymentRequests.filter((r) => (r.status || 'pending') === 'pending').length})`
                      },
                      {
                        id: 'approved',
                        label: `Approved (${paymentRequests.filter((r) => r.status === 'approved').length})`
                      },
                      {
                        id: 'rejected',
                        label: `Rejected (${paymentRequests.filter((r) => r.status === 'rejected').length})`
                      }
                    ].map((pill) => (
                      <button
                        key={pill.id}
                        type="button"
                        onClick={() => setPaymentStatusFilter(pill.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                          paymentStatusFilter === pill.id
                            ? 'btn-primary text-white'
                            : 'bg-white/[0.04] text-slate-400 hover:text-white'
                        }`}
                      >
                        {pill.label}
                      </button>
                    ))}

                    <select
                      value={paymentPlanFilter}
                      onChange={(e) => setPaymentPlanFilter(e.target.value)}
                      className="input-field px-3 py-1.5 rounded-xl text-xs bg-slate-900 border-white/10 font-semibold ml-1"
                    >
                      <option value="all">All Plans</option>
                      <option value="pro">Pro ($12)</option>
                      <option value="studio">Studio ($29)</option>
                    </select>
                  </div>

                  <div className="relative w-full lg:w-72">
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={paymentSearch}
                      onChange={(e) => setPaymentSearch(e.target.value)}
                      placeholder="Search user, full name, or country..."
                      className="input-field w-full pl-9 pr-8 py-2 rounded-xl text-xs"
                    />
                    {paymentSearch && (
                      <button
                        type="button"
                        onClick={() => setPaymentSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="glass gradient-border rounded-3xl overflow-hidden">
                  {filteredPaymentRequests.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 text-xs">
                      {paymentRequests.length === 0
                        ? 'No payment requests submitted yet.'
                        : 'No payment requests match the selected filters.'}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-white/[0.02] border-b border-white/[0.06] text-slate-400 uppercase tracking-wider font-bold">
                          <tr>
                            <th className="p-4">Submitted</th>
                            <th className="p-4">User</th>
                            <th className="p-4">Full Name</th>
                            <th className="p-4">Plan</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Country</th>
                            <th className="p-4">Documents</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.06]">
                          {filteredPaymentRequests.map((r) => (
                            <tr key={r._id} className={`hover:bg-white/[0.02] transition ${r.status === 'pending' ? 'border-l-2 border-amber-500/40' : ''}`}>
                              <td className="p-4 text-slate-500 font-mono">{new Date(r.createdAt).toLocaleDateString()}</td>
                              <td className="p-4">
                                <div className="font-bold text-white">{r.userId?.username || 'Unknown'}</div>
                                <div className="text-slate-500 font-mono">{r.email}</div>
                              </td>
                              <td className="p-4 text-slate-300 font-semibold">{r.fullName}</td>
                              <td className="p-4">
                                <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase ${
                                  r.plan === 'studio' ? 'bg-purple-500/20 text-purple-400' : 'bg-indigo-500/20 text-indigo-400'
                                }`}>{r.plan}</span>
                              </td>
                              <td className="p-4 font-mono font-bold text-white">${r.amount} USD</td>
                              <td className="p-4 text-slate-400">{r.country}</td>
                              <td className="p-4">
                                <div className="flex flex-col gap-1.5">
                                  <a href={r.nationalIdUrl} target="_blank" rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-[10px] font-semibold underline underline-offset-2">
                                    <Eye className="w-3 h-3" /> National ID
                                  </a>
                                  <a href={r.paymentSlipUrl} target="_blank" rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-[10px] font-semibold underline underline-offset-2">
                                    <Eye className="w-3 h-3" /> Payment Slip
                                  </a>
                                </div>
                              </td>
                              <td className="p-4">
                                {r.status === 'pending' && (
                                  <span className="px-2.5 py-1 rounded-full font-bold text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1 w-fit">
                                    <Clock className="w-3 h-3" /> Pending
                                  </span>
                                )}
                                {r.status === 'approved' && (
                                  <span className="px-2.5 py-1 rounded-full font-bold text-[10px] bg-emerald-500/20 text-emerald-400 flex items-center gap-1 w-fit">
                                    <CheckCircle2 className="w-3 h-3" /> Approved
                                  </span>
                                )}
                                {r.status === 'rejected' && (
                                  <span className="px-2.5 py-1 rounded-full font-bold text-[10px] bg-red-500/20 text-red-400 flex items-center gap-1 w-fit">
                                    <XCircle className="w-3 h-3" /> Rejected
                                  </span>
                                )}
                                {r.adminNote && r.status !== 'pending' && (
                                  <p className="text-[10px] text-slate-500 mt-1 max-w-[160px] truncate" title={r.adminNote}>{r.adminNote}</p>
                                )}
                              </td>
                              <td className="p-4 text-right whitespace-nowrap">
                                {r.status === 'pending' ? (
                                  <div className="flex items-center gap-2 justify-end">
                                    <button
                                      onClick={() => { setReviewingRequest({ id: r._id, action: 'approve', user: r.userId?.username || r.email, plan: r.plan }); setReviewNote(''); }}
                                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                                    >
                                      ✓ Approve
                                    </button>
                                    <button
                                      onClick={() => { setReviewingRequest({ id: r._id, action: 'reject', user: r.userId?.username || r.email, plan: r.plan }); setReviewNote(''); }}
                                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-500/10 text-red-400 hover:bg-red-500/20"
                                    >
                                      ✕ Reject
                                    </button>
                                  </div>
                                ) : (
                                  <span className="text-slate-600 text-[10px] font-mono">Reviewed</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'careers' && <JobApplicationsSection />}
          </div>
        )}
      </main>
      {reviewingRequest && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="glass gradient-border rounded-3xl max-w-md w-full p-8 shadow-2xl">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
              reviewingRequest.action === 'approve' ? 'bg-emerald-500/20' : 'bg-red-500/20'
            }`}>
              {reviewingRequest.action === 'approve'
                ? <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                : <XCircle className="w-6 h-6 text-red-400" />
              }
            </div>
            <h3 className="font-heading font-bold text-xl text-white mb-1 text-center">
              {reviewingRequest.action === 'approve' ? 'Approve Payment Request' : 'Reject Payment Request'}
            </h3>
            <p className="text-slate-400 text-xs mb-6 text-center">
              {reviewingRequest.action === 'approve'
                ? <>This will upgrade <span className="text-indigo-400 font-mono">{reviewingRequest.user}</span> to the <span className="text-amber-400 font-bold uppercase">{reviewingRequest.plan}</span> plan and notify them by email.</>
                : <>This will reject the request and send a notification email to <span className="text-indigo-400 font-mono">{reviewingRequest.user}</span>.</>
              }
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">
                  Admin Note <span className="text-slate-600">(optional - included in email)</span>
                </label>
                <textarea
                  rows={3}
                  value={reviewNote}
                  onChange={e => setReviewNote(e.target.value)}
                  placeholder={reviewingRequest.action === 'approve'
                    ? 'Your payment has been verified and your plan has been upgraded.'
                    : 'Payment slip was unclear. Please resubmit with a clearer image showing the amount and date.'
                  }
                  className="input-field w-full px-3.5 py-2.5 rounded-xl text-xs resize-none"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setReviewingRequest(null); setReviewNote(''); }}
                  className="btn-ghost px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReviewRequest}
                  disabled={reviewLoading}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 text-white ${
                    reviewingRequest.action === 'approve' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-red-600 hover:bg-red-500'
                  } disabled:opacity-60`}
                >
                  {reviewLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {reviewingRequest.action === 'approve' ? '✓ Confirm Approve' : '✕ Confirm Reject'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

      {adminAuthModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => !adminAuthLoading && setAdminAuthModal(null)}
        >
          <div
            className="glass gradient-border rounded-3xl max-w-md w-full p-8 shadow-2xl border border-red-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                <KeyRound className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-white">
                  {adminAuthModal.type === 'delete-user'
                    ? 'Confirm User Account Deletion'
                    : adminAuthModal.targetLayout?.isBanned
                    ? 'Confirm Portfolio Unban'
                    : 'Confirm Portfolio Ban'}
                </h3>
                <p className="text-xs text-slate-400">
                  Admin password authorization required
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-slate-300 leading-relaxed mb-5">
              {adminAuthModal.type === 'delete-user' ? (
                <>
                  You are about to permanently delete user{' '}
                  <strong className="text-white">
                    {adminAuthModal.targetUser?.username || 'User'}
                  </strong>{' '}
                  (<span className="text-indigo-300 font-mono">{adminAuthModal.targetUser?.email}</span>) and erase all of their portfolios and messages. This action cannot be undone.
                </>
              ) : (
                <>
                  You are about to{' '}
                  <strong className="text-white">
                    {adminAuthModal.targetLayout?.isBanned ? 'UNBAN' : 'BAN'}
                  </strong>{' '}
                  portfolio{' '}
                  <strong className="text-white">
                    {adminAuthModal.targetLayout?.title || 'Untitled'}
                  </strong>{' '}
                  (<span className="text-indigo-300 font-mono">/p/{adminAuthModal.targetLayout?.handle}</span>).
                </>
              )}
            </div>

            {adminAuthError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{adminAuthError}</span>
              </div>
            )}

            <form onSubmit={handleConfirmAdminProtectedAction} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Enter Admin Password or Secret Code *
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={adminAuthPassword}
                  onChange={(e) => setAdminAuthPassword(e.target.value)}
                  placeholder="Enter admin password or secret code..."
                  className="input-field w-full px-4 py-3 rounded-xl text-xs font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  disabled={adminAuthLoading}
                  onClick={() => setAdminAuthModal(null)}
                  className="btn-ghost px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adminAuthLoading}
                  className={`px-5 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 disabled:opacity-60 ${
                    adminAuthModal.type === 'toggle-ban' && adminAuthModal.targetLayout?.isBanned
                      ? 'bg-emerald-600 hover:bg-emerald-500'
                      : 'bg-red-600 hover:bg-red-500'
                  }`}
                >
                  {adminAuthLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Lock className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {adminAuthModal.type === 'delete-user'
                      ? 'Authorize & Delete User'
                      : adminAuthModal.targetLayout?.isBanned
                      ? 'Authorize & Unban Portfolio'
                      : 'Authorize & Ban Portfolio'}
                  </span>
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
