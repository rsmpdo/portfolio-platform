import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Mail, ArrowRight, LogOut } from 'lucide-react';
import { logout } from '../store/authSlice';
import Header from '../components/common/Header';

export default function VerifyPending() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="glass max-w-md w-full p-8 rounded-3xl text-center">
          <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-indigo-400" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">Check your email</h2>
          
          <p className="text-slate-400 mb-8 leading-relaxed">
            We've sent a verification link to <span className="text-white font-semibold">{user?.email}</span>. 
            Please click the link to verify your account and unlock the Editor.
          </p>

          <div className="space-y-3">
            <button className="btn-primary w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 text-white">
              <span>Resend Verification Email</span>
            </button>
            
            <button 
              onClick={handleLogout}
              className="btn-ghost w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 text-slate-400 hover:text-white transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
