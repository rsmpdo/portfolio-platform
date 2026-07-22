import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Mail, ArrowRight, LogOut, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { logout } from '../store/authSlice';
import Header from '../components/common/Header';
import API from '../services/api';

export default function VerifyPending() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      setMessage('');
      setError('');
      
      await API.post('/auth/resend-verification');
      
      setMessage('Verification email sent! Check your inbox.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="glass max-w-md w-full p-8 rounded-3xl text-center">
          <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-indigo-400" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">Check your email</h2>
          
          <p className="text-slate-400 mb-6 leading-relaxed">
            We've sent a verification link to <span className="text-white font-semibold">{user?.email}</span>. 
            Please click the link to verify your account and unlock the Editor.
          </p>

          {message && (
            <div className="p-3 mb-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-400 text-sm text-left">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <p>{message}</p>
            </div>
          )}

          {error && (
            <div className="p-3 mb-6 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm text-left">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-3">
            <button 
              onClick={handleResend}
              disabled={loading || !!message}
              className="btn-primary w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 text-white disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Resend Verification Email</span>}
            </button>
            
            <button 
              onClick={handleLogout}
              className="btn-ghost w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 text-slate-400 hover:text-white transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
