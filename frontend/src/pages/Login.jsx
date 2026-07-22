import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, clearError } from '../store/authSlice';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { LogIn, Lock, Mail, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(clearError());
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
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Password</label>
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
