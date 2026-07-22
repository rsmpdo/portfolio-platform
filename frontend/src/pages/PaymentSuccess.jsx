import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Optionally trigger a re-fetch of the user profile here to update their plan instantly in Redux
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-6 mt-20">
        <div className="glass max-w-md w-full p-8 rounded-3xl text-center shadow-2xl border border-emerald-500/30">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">Payment Successful!</h2>
          
          <p className="text-slate-400 mb-8 leading-relaxed">
            Thank you for your purchase. Your account has been upgraded, and an official receipt has been sent to your email.
          </p>

          {sessionId && (
            <div className="mb-8 p-4 bg-slate-900/50 rounded-xl border border-white/10 text-left text-xs font-mono">
              <span className="text-slate-500 block mb-1">Session ID:</span>
              <span className="text-emerald-400 truncate block">{sessionId}</span>
            </div>
          )}

          <Link to="/editor" className="btn-primary w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2">
            <span>Go to Portfolio Editor</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
