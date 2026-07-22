import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { Sparkles, Layout, LogOut, User, LogIn, UserPlus } from 'lucide-react';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-lg text-white tracking-tight">
            Portfolio<span className="text-indigo-400">Craft</span>
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/editor"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-indigo-500/20 transition"
              >
                <Layout className="w-4 h-4" />
                <span>CMS Editor</span>
              </Link>

              <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
                <span className="text-xs font-medium text-slate-300 hidden sm:inline-block">
                  {user?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-500/20 transition"
              >
                <UserPlus className="w-4 h-4" />
                <span>Get Started</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
