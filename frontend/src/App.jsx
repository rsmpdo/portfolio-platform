import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, elevateToAdmin } from './store/authSlice';
import Header from './components/common/Header';
import { KeyRound, ShieldAlert, AlertCircle, Loader2 } from 'lucide-react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Editor from './pages/Editor';
import PublicPortfolio from './pages/PublicPortfolio';
import Features from './pages/Features';
import Templates from './pages/Templates';
import Showcase from './pages/Showcase';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import ProfileSettings from './pages/ProfileSettings';
import VerifyEmail from './pages/VerifyEmail';
import VerifyPending from './pages/VerifyPending';
import PaymentSuccess from './pages/PaymentSuccess';
import TemplatePreview from './pages/TemplatePreview';

function PrivateRoute({ children }) {
  const { isAuthenticated, token, user } = useSelector((state) => state.auth);
  if (!isAuthenticated && !token) {
    return <Navigate to="/login" replace />;
  }
  if (user && !user.isVerified && user.role !== 'admin') {
    return <VerifyPending />;
  }
  return children;
}

function AdminUnlockCard() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [secretCode, setSecretCode] = useState('');
  const [localError, setLocalError] = useState('');

  const handleElevate = (e) => {
    e.preventDefault();
    setLocalError('');
    if (!secretCode) {
      setLocalError('Please enter the Administrator Secret Code');
      return;
    }
    dispatch(elevateToAdmin(secretCode));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <Header />
      <div className="w-full max-w-md glass gradient-border rounded-3xl p-8 shadow-2xl mt-20 text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4 text-amber-400">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h2 className="font-heading font-black text-2xl text-white mb-2">Admin Access Required</h2>
        <p className="text-slate-400 text-xs leading-relaxed mb-6">
          Logged in as <span className="text-indigo-400 font-mono font-bold">{user?.email}</span>. Enter the Administrator Secret Code to unlock full site control & contact messages.
        </p>

        {(localError || error) && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{localError || error}</span>
          </div>
        )}

        <form onSubmit={handleElevate} className="space-y-4">
          <div>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-amber-500 absolute left-4 top-3.5" />
              <input
                type="password"
                required
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                placeholder="Enter Admin Secret Code"
                className="input-field w-full pl-11 pr-4 py-3 rounded-xl text-xs border-amber-500/30 font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg shadow-indigo-500/20"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4 text-amber-400" />}
            <span>Elevate Account to Administrator</span>
          </button>
        </form>
      </div>
    </div>
  );
}

function AdminRoute({ children }) {
  const { isAuthenticated, token, user, loading } = useSelector((state) => state.auth);

  if (loading || (token && !user)) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
        <Header />
        <div className="flex flex-col items-center gap-3 mt-20">
          <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
          <p className="text-slate-400 text-xs font-mono">Verifying administrator credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && !token) {
    return <Navigate to="/login" replace />;
  }

  if (!user || user.role !== 'admin') {
    return <AdminUnlockCard />;
  }

  return children;
}

export default function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Disable right click context menu site-wide
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [token, dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/features" element={<Features />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/preview/:templateId" element={<TemplatePreview />} />
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route
          path="/editor"
          element={
            <PrivateRoute>
              <Editor />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfileSettings />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route path="/p/:handle" element={<PublicPortfolio />} />
        <Route path="/portfolio/:handle" element={<PublicPortfolio />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
