import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { User, Mail, ShieldCheck, Crown, Sparkles, LogOut, Trash2, ArrowRight, LayoutTemplate, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import API from '../services/api';

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
