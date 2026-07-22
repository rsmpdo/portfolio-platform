import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { Sparkles, LayoutTemplate, LogOut, LogIn, UserPlus, ShieldAlert } from 'lucide-react';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 md:mx-8 mt-4">
        <div className="glass-dark rounded-2xl px-6 h-14 flex items-center justify-between shadow-xl shadow-black/20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl btn-primary flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-base text-white tracking-tight">
              Portfolio<span className="gradient-text">Craft</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/features" className="text-xs font-semibold text-slate-400 hover:text-white transition underline-hover">
              Features
            </Link>
            <Link to="/templates" className="text-xs font-semibold text-slate-400 hover:text-white transition underline-hover">
              Templates
            </Link>
            <Link to="/showcase" className="text-xs font-semibold text-slate-400 hover:text-white transition underline-hover">
              Showcase
            </Link>
            <Link to="/pricing" className="text-xs font-semibold text-slate-400 hover:text-white transition underline-hover">
              Pricing
            </Link>
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-500/30 transition"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </Link>
                )}
                <Link
                  to="/editor"
                  className="btn-primary px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-2"
                >
                  <LayoutTemplate className="w-3.5 h-3.5" />
                  <span>My Portfolio</span>
                </Link>
                <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                    <span className="text-xs font-bold text-indigo-400 uppercase">
                      {user?.username?.[0] || 'U'}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-1.5 rounded-lg btn-ghost text-slate-400 hover:text-white"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn-ghost px-4 py-2 rounded-xl text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/register"
                  className="btn-primary px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Get Started Free</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
