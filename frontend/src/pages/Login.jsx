import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, verifyTwoFactorLogin, cancelTwoFactor, clearError } from '../store/authSlice';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { LogIn, Lock, Mail, AlertCircle, Loader2, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, requiresTwoFactor, twoFactorTempToken, loading, error } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');

  useEffect(() => {
    dispatch(clearError());
    dispatch(cancelTwoFactor());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      const searchParams = new URLSearchParams(window.location.search);
      const redirect = searchParams.get('redirect');
      const plan = searchParams.get('plan');
      if (redirect === 'pricing') {
        navigate(`/pricing${plan ? `?checkout=${plan}` : ''}`);
      } else {
        navigate('/templates');
      }
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const handleVerifyTwoFactor = (e) => {
    e.preventDefault();
    if (!twoFactorCode.trim()) return;
    dispatch(verifyTwoFactorLogin({ tempToken: twoFactorTempToken, code: twoFactorCode.trim() }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 pt-28 pb-16">
        <div className="w-full max-w-md">
          {/* Header text */}
          <div className="text-center mb-10">
            <h1 className="font-heading font-black text-4xl text-white mb-3">Welcome back.</h1>
            <p className="text-slate-400">Your portfolio is waiting for you.</p>
          </div>

          <div className="glass gradient-border rounded-3xl p-8 shadow-2xl">
            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {requiresTwoFactor ? (
              <form onSubmit={handleVerifyTwoFactor} className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-white block mb-0.5">
                      Two-Factor Authentication Required
                    </span>
                    Open your Authenticator app (Google Authenticator, Authy, 1Password) and enter the 6-digit verification code or a backup recovery code.
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    6-Digit Authenticator or Recovery Code
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-indigo-400 absolute left-4 top-3.5" />
                    <input
                      type="text"
                      required
                      autoFocus
                      value={twoFactorCode}
                      onChange={(e) => setTwoFactorCode(e.target.value)}
                      placeholder="e.g. 123456 or A1B2-C3D4"
                      className="input-field w-full pl-11 pr-4 py-3 rounded-xl text-sm font-mono tracking-widest"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !twoFactorCode.trim()}
                  className="btn-primary w-full py-3.5 rounded-xl text-white font-bold flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify & Sign In</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTwoFactorCode('');
                    dispatch(cancelTwoFactor());
                  }}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-semibold transition"
                >
                  ← Back to Email & Password
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-600 absolute left-4 top-3.5" />
                    <input
                      type="email" required value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="input-field w-full pl-11 pr-4 py-3 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
                    <Link
                      to="/forgot-password"
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-600 absolute left-4 top-3.5" />
                    <input
                      type="password" required value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="input-field w-full pl-11 pr-4 py-3 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit" disabled={loading}
                  className="btn-primary w-full py-3.5 rounded-xl text-white font-bold flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
              <p className="text-sm text-slate-500">
                New here?{' '}
                <Link to={`/register${location.search}`} className="text-indigo-400 font-semibold hover:text-indigo-300 transition underline-hover">
                  Create your portfolio free →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
