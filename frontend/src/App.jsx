import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from './store/authSlice';
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
  if (user && !user.isVerified) {
    return <VerifyPending />;
  }
  return children;
}

function AdminRoute({ children }) {
  const { isAuthenticated, token, user } = useSelector((state) => state.auth);
  if (!isAuthenticated && !token) {
    return <Navigate to="/login" replace />;
  }
  if (user && user.role !== 'admin') {
    return <Navigate to="/editor" replace />;
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
