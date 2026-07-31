import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Clock } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-6 mt-20">
        <div className="glass max-w-lg w-full p-10 rounded-3xl text-center shadow-2xl border border-emerald-500/30">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>

          <h2 className="text-3xl font-bold text-white mb-3">Submission Received!</h2>

          <p className="text-slate-400 mb-4 leading-relaxed">
            Your payment request has been submitted successfully. Our team will verify your documents and upgrade your account.
          </p>

          <div className="flex items-center justify-center gap-2 mb-8 text-amber-400 text-sm font-semibold">
            <Clock className="w-4 h-4" />
            <span>Review time: 1–3 business days</span>
          </div>

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

