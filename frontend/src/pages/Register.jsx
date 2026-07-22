import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, clearError } from '../store/authSlice';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { UserPlus, Lock, Mail, User, AlertCircle, Loader2, ArrowRight, CheckCircle, ShieldAlert, KeyRound } from 'lucide-react';

const perks = [
  'Your portfolio live in under 5 minutes',
  'Beautiful templates — no design skills needed',
  'Custom domain support',
  'Unlimited projects and updates'
];

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdminRegister, setIsAdminRegister] = useState(false);
  const [adminSecretCode, setAdminSecretCode] = useState('');
  const [localError, setLocalError] = useState('');

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
    setLocalError('');
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }
    if (isAdminRegister && !adminSecretCode) {
      setLocalError('Please enter the Administrator Secret Code.');
      return;
    }
    dispatch(
      registerUser({
        username,
        email,
        password,
        ...(isAdminRegister && { adminSecretCode })
      })
    );
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 pt-28 pb-16">
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left — Value Pitch */}
            <div className="hidden lg:block">
              <h1 className="font-heading font-black text-5xl text-white leading-tight mb-6">
                Start building<br />
                <span className="gradient-text">your future today.</span>
              </h1>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                Join thousands of creators who turned their passion into opportunities — with a portfolio that actually gets them noticed.
              </p>
              <div className="space-y-4">
                {perks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span className="text-slate-300 text-sm">{perk}</span>
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="mt-12 glass rounded-2xl p-5 border border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[
                      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=40&h=40&fit=crop',
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
                      'https://images.unsplash.com/photo-1494790108755-2616b612b1e2?w=40&h=40&fit=crop'
                    ].map((src, i) => (
                      <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-slate-950 object-cover" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-400">
                    <span className="text-white font-semibold">10,000+</span> creators already building
                  </p>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div>
              <div className="text-center mb-8 lg:text-left">
                <h2 className="font-heading font-black text-3xl text-white mb-2 lg:hidden">Create Your Portfolio</h2>
                <p className="text-slate-400 text-sm">Free forever. No credit card needed.</p>
              </div>

              <div className="glass gradient-border rounded-3xl p-8 shadow-2xl">
                {displayError && (
                  <div className="mb-5 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{displayError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Username</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-600 absolute left-4 top-3.5" />
                      <input
                        type="text" required value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="yourname"
                        className="input-field w-full pl-11 pr-4 py-3 rounded-xl text-sm"
                      />
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5">Your portfolio will be at /p/{username || 'yourname'}</p>
                  </div>

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
                        type="password" required minLength="6" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min. 6 characters"
                        className="input-field w-full pl-11 pr-4 py-3 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Confirm Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-600 absolute left-4 top-3.5" />
                      <input
                        type="password" required value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat your password"
                        className="input-field w-full pl-11 pr-4 py-3 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  {/* Optional Admin Registration Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAdminRegister}
                        onChange={(e) => setIsAdminRegister(e.target.checked)}
                        className="w-4 h-4 rounded bg-slate-900 border-white/10 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                        Register as Administrator (Requires Secret Code)
                      </span>
                    </label>
                  </div>

                  {isAdminRegister && (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                      <label className="block text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">Administrator Secret Code</label>
                      <div className="relative">
                        <KeyRound className="w-4 h-4 text-amber-500 absolute left-4 top-3.5" />
                        <input
                          type="password"
                          required={isAdminRegister}
                          value={adminSecretCode}
                          onChange={(e) => setAdminSecretCode(e.target.value)}
                          placeholder="Enter Admin Secret Code"
                          className="input-field w-full pl-11 pr-4 py-3 rounded-xl text-sm border-amber-500/30"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit" disabled={loading}
                    className="btn-primary w-full py-3.5 rounded-xl text-white font-bold flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>{isAdminRegister ? 'Register Administrator Account' : 'Create My Portfolio'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-600 pt-1">
                    By signing up, you agree to our Terms & Privacy Policy.
                  </p>
                </form>

                <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
                  <p className="text-sm text-slate-500">
                    Already have an account?{' '}
                    <Link to={`/login${location.search}`} className="text-indigo-400 font-semibold hover:text-indigo-300 transition underline-hover">
                      Sign in →
                    </Link>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
