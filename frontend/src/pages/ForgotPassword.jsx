import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import API from '../services/api';
import { Mail, ArrowRight, ArrowLeft, AlertCircle, CheckCircle2, Loader2, KeyRound } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      const res = await API.post('/auth/forgot-password', { email });
      if (res.data.success) {
        setSuccessMessage(res.data.message || 'Password reset link sent to your email.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Unable to send reset link. Please check the email and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 pt-28 pb-16">
        <div className="w-full max-w-md">
          {/* Header icon and text */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4 text-indigo-400">
              <KeyRound className="w-7 h-7" />
            </div>
            <h1 className="font-heading font-black text-3xl text-white mb-2">Forgot Password</h1>
            <p className="text-slate-400 text-sm">
              Enter your account email and we'll send you a secure link to reset your password.
            </p>
          </div>

          <div className="glass gradient-border rounded-3xl p-8 shadow-2xl">
            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {successMessage ? (
              <div className="text-center py-4 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-white">Check Your Inbox</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {successMessage}
                </p>
                <p className="text-xs text-slate-500">
                  The link will expire in 10 minutes. Check your spam folder if you don't see it within a minute.
                </p>
                <div className="pt-4 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSuccessMessage('');
                      setEmail('');
                    }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    Didn't receive it? Try another email
                  </button>
                  <Link
                    to="/login"
                    className="btn-primary w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 mt-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to Login</span>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Account Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-600 absolute left-4 top-3.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="input-field w-full pl-11 pr-4 py-3 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3.5 rounded-xl text-white font-bold flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="pt-2 text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-medium transition"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Sign In</span>
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
