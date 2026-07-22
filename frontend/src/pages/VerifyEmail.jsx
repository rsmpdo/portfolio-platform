import React, { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../store/authSlice';
import API from '../services/api';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Header from '../components/common/Header';

export default function VerifyEmail() {
  const { token: paramToken } = useParams();
  const [searchParams] = useSearchParams();
  const queryToken = searchParams.get('token');
  const token = paramToken || queryToken;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');
  const hasCalledRef = useRef(false);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided in link.');
      return;
    }

    if (hasCalledRef.current) return;
    hasCalledRef.current = true;

    const verifyToken = async () => {
      try {
        const res = await API.get(`/auth/verify-email/${token}`);
        if (res.data.success) {
          setStatus('success');
          setMessage(res.data.message);
          dispatch(fetchCurrentUser());
        }
      } catch (err) {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Verification failed. The token may be invalid or expired.');
      }
    };
    verifyToken();
  }, [token, dispatch]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="glass max-w-md w-full p-8 rounded-3xl text-center">
          {status === 'loading' && (
            <div className="flex flex-col items-center">
              <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Verifying Email...</h2>
              <p className="text-slate-400">Please wait while we verify your account.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Email Verified!</h2>
              <p className="text-slate-400 mb-8">{message}</p>
              <Link to="/editor" className="btn-primary w-full py-3 rounded-xl font-semibold text-white">
                Go to Editor
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Verification Failed</h2>
              <p className="text-slate-400 mb-8">{message}</p>
              <Link to="/login" className="btn-ghost w-full py-3 rounded-xl font-semibold text-white border border-white/10 hover:bg-white/5 transition">
                Return to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
