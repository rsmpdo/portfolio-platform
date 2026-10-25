import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, elevateToAdmin } from './store/authSlice';
import Header from './components/common/Header';
import { KeyRound, ShieldAlert, AlertCircle, Loader2, ArrowUp } from 'lucide-react';
import Home from './pages/Home';
import VerifyPending from './pages/VerifyPending';

// Lazy-loaded routes for optimal initial bundle size and near-instant load times
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Features = lazy(() => import('./pages/Features'));
const Templates = lazy(() => import('./pages/Templates'));
const TemplatePreview = lazy(() => import('./pages/TemplatePreview'));
const Showcase = lazy(() => import('./pages/Showcase'));
const ShowcasePortfolio = lazy(() => import('./pages/ShowcasePortfolio'));
const Pricing = lazy(() => import('./pages/Pricing'));
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const Careers = lazy(() => import('./pages/Careers'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const PaymentForm = lazy(() => import('./pages/PaymentForm'));
const Editor = lazy(() => import('./pages/Editor'));
const ProfileSettings = lazy(() => import('./pages/ProfileSettings'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const PublicPortfolio = lazy(() => import('./pages/PublicPortfolio'));

function PageFallbackLoader() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center animate-pulse">
        <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
      </div>
    </div>
  );
}

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

function ScrollToTopAndBackToTopButton() {
  const { pathname } = useLocation();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Always scroll to top when switching between pages
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  // Show floating Go-to-Top arrow button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showBackToTop) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Go to top of page"
      title="Back to top"
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-2xl btn-primary text-white shadow-2xl shadow-indigo-500/40 border border-white/20 flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
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
      <ScrollToTopAndBackToTopButton />
      <Suspense fallback={<PageFallbackLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/features" element={<Features />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/preview/:templateId" element={<TemplatePreview />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/showcase/:handle" element={<ShowcasePortfolio />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment/:planId" element={<PaymentForm />} />
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
      </Suspense>
    </Router>
  );
}
