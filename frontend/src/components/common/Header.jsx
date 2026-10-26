import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { LayoutTemplate, LogOut, LogIn, UserPlus, ShieldAlert, Menu, X, User } from 'lucide-react';
import LogoIcon from './LogoIcon';

const NAV_ITEMS = [
  { name: 'Features', path: '/features' },
  { name: 'Templates', path: '/templates' },
  { name: 'Showcase', path: '/showcase' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact', path: '/contact' }
];

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    setMobileMenuOpen(false);
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/[0.08] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl glass border border-indigo-500/30 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <LogoIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="font-heading font-bold text-sm sm:text-base text-white tracking-tight">
            Portfolio<span className="gradient-text">Craft</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-xs font-semibold transition flex items-center h-16 border-b-2 whitespace-nowrap ${
                location.pathname === item.path
                  ? 'text-indigo-400 border-indigo-500 font-bold'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5">
          {isAuthenticated ? (
            <>
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="hidden sm:flex px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold items-center gap-1.5 hover:bg-amber-500/30 transition"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </Link>
              )}
              <Link
                to="/editor"
                className="btn-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 whitespace-nowrap"
              >
                <LayoutTemplate className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden xs:inline sm:inline">My Portfolio</span>
              </Link>
              <Link
                to="/profile"
                className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center hover:border-indigo-400 transition shrink-0"
                title="Profile & Settings"
              >
                <span className="text-xs font-bold text-indigo-400 uppercase">
                  {user?.username?.[0] || 'U'}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="hidden sm:flex p-1.5 rounded-lg btn-ghost text-slate-400 hover:text-white"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:flex btn-ghost px-3.5 py-2 rounded-xl text-slate-300 hover:text-white text-xs font-semibold items-center gap-1.5 whitespace-nowrap"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
              <Link
                to="/register"
                className="btn-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 whitespace-nowrap"
              >
                <UserPlus className="w-3.5 h-3.5 shrink-0" />
                <span>Get Started</span>
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl glass border border-white/10 text-slate-200 hover:text-white transition flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-indigo-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/[0.08] bg-slate-950/95 backdrop-blur-2xl px-4 sm:px-6 py-4 shadow-2xl animate-fadeIn">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-between ${
                      isActive
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold'
                        : 'bg-white/[0.03] text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.05]'
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-2">
              {isAuthenticated ? (
                <>
                  <div className="flex flex-wrap items-center gap-2">
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-3 py-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold flex items-center gap-1.5"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Admin</span>
                      </Link>
                    )}
                    <Link
                      to="/editor"
                      onClick={() => setMobileMenuOpen(false)}
                      className="btn-primary px-3.5 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <LayoutTemplate className="w-3.5 h-3.5" />
                      <span>My Portfolio</span>
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <User className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Profile ({user?.username || 'Account'})</span>
                    </Link>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 w-full">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-ghost py-2.5 rounded-xl text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-white/10"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-primary py-2.5 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Get Started Free</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
    </header>
  );
}
