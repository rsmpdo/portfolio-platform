import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import {
  ArrowRight, ArrowLeft, CheckCircle2, Upload, AlertCircle,
  Loader2, ShieldCheck, CreditCard, User, FileText, Globe,
  Phone, Hash, Building2, Lock
} from "lucide-react";
import API from "../services/api";

const BANK_DETAILS = {
  accountName: "PortfolioCraft Inc.",
  bank: "Wise (formerly TransferWise)",
  accountNumber: "9876543210",
  routingAch: "026073150",
  swift: "CMFGUS33",
  currency: "USD",
  note: "Wise accepts bank transfers from any country worldwide."
};

const PLAN_INFO = {
  pro: { name: "Pro Creator", amount: 12, color: "indigo", features: ["2 Portfolio Sites", "Interactive Embeds", "Premium Animations", "Advanced Contact Forms", "SEO Meta Optimization"] },
  studio: { name: "Studio & Team", amount: 29, color: "purple", features: ["5 Portfolio Sites", "Everything in Pro", "Cinematic Video Backgrounds", "3D Spline Embeds", "White-Label Branding"] }
};

const STEPS = ["Payment Info", "Your Details", "Upload Documents", "Confirmation"];

export default function PaymentForm() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((s) => s.auth);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: user?.username || "",
    nationalIdNumber: "",
    country: "",
    phone: ""
  });
  const [nationalIdFile, setNationalIdFile] = useState(null);
  const [paymentSlipFile, setPaymentSlipFile] = useState(null);
  const [nationalIdPreview, setNationalIdPreview] = useState(null);
  const [paymentSlipPreview, setPaymentSlipPreview] = useState(null);

  const plan = PLAN_INFO[planId];

  if (!plan) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Invalid plan.</div>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-6 pt-32">
          <div className="glass gradient-border rounded-3xl p-10 max-w-md w-full text-center">
            <Lock className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
            <h2 className="font-heading font-black text-2xl text-white mb-3">Login Required</h2>
            <p className="text-slate-400 text-sm mb-6">Please log in or create an account to proceed with your plan upgrade.</p>
            <Link to="/login" className="btn-primary w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2">
              Login to Continue <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (type === "nationalId") { setNationalIdFile(file); setNationalIdPreview(url); }
    else { setPaymentSlipFile(file); setPaymentSlipPreview(url); }
  };

  const handleSubmit = async () => {
    if (!nationalIdFile || !paymentSlipFile) { setError("Please upload both documents."); return; }
    setSubmitting(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("plan", planId);
      fd.append("fullName", form.fullName);
      fd.append("nationalIdNumber", form.nationalIdNumber);
      fd.append("country", form.country);
      fd.append("phone", form.phone);
      fd.append("nationalId", nationalIdFile);
      fd.append("paymentSlip", paymentSlipFile);
      await API.post("/payment/submit", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const colorClass = plan.color === "purple" ? "indigo" : "indigo";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />
      <main className="flex-1 pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Page Title */}
          <div className="text-center mb-10">
            <div className="badge badge-indigo inline-flex mb-4">
              <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
              <span>Secure Manual Payment</span>
            </div>
            <h1 className="font-heading font-black text-3xl md:text-4xl text-white mb-2">
              Upgrade to <span className="gradient-text">{plan.name}</span>
            </h1>
            <p className="text-slate-400 text-sm">One-time payment · No recurring charges · Lifetime access</p>
          </div>

          {/* Step Indicator */}
          {step < 3 && (
            <div className="flex items-center justify-center gap-2 mb-10">
              {STEPS.slice(0, 3).map((label, i) => (
                <React.Fragment key={i}>
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      i < step ? "bg-emerald-500 text-white" : i === step ? "bg-indigo-500 text-white ring-4 ring-indigo-500/30" : "bg-slate-800 text-slate-500"
                    }`}>
                      {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                    </div>
                    <span className={`text-xs font-semibold hidden sm:block ${i === step ? "text-white" : "text-slate-500"}`}>{label}</span>
                  </div>
                  {i < 2 && <div className={`flex-1 h-px max-w-12 ${i < step ? "bg-emerald-500/50" : "bg-slate-700"}`} />}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* ─── STEP 0: Bank Transfer Instructions ───────────────── */}
          {step === 0 && (
            <div className="space-y-6">
              {/* Plan Summary */}
              <div className="glass gradient-border rounded-3xl p-6 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-1">You are purchasing</p>
                  <h2 className="font-heading font-black text-2xl text-white">{plan.name}</h2>
                  <ul className="mt-2 space-y-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className="text-xs text-slate-400 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center glass rounded-2xl px-8 py-5 border border-indigo-500/20">
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">One-Time Payment</p>
                  <p className="font-heading font-black text-5xl text-white">${plan.amount}</p>
                  <p className="text-xs text-emerald-400 font-semibold mt-1">USD · No Subscription</p>
                </div>
              </div>

              {/* Important Notice */}
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-bold text-amber-300 mb-1">Important — Please Read</p>
                    <p className="text-slate-400 leading-relaxed">This is a <strong className="text-white">one-time bank transfer purchase</strong>, not a monthly subscription. You pay once and get lifetime access to the {plan.name} features. After transferring, upload your payment slip below so our team can verify and upgrade your account within <strong className="text-white">1–3 business days</strong>.</p>
                  </div>
                </div>
              </div>

              {/* Bank Account Details */}
              <div className="glass gradient-border rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-lg">Bank Transfer Details</h3>
                    <p className="text-xs text-slate-500">Transfer exactly <span className="text-indigo-400 font-bold">${plan.amount} USD</span> to the account below</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Account Name", value: BANK_DETAILS.accountName, icon: User },
                    { label: "Bank", value: BANK_DETAILS.bank, icon: Building2 },
                    { label: "Account Number", value: BANK_DETAILS.accountNumber, icon: Hash },
                    { label: "Routing Number (ACH)", value: BANK_DETAILS.routingAch, icon: Hash },
                    { label: "SWIFT / BIC", value: BANK_DETAILS.swift, icon: Globe },
                    { label: "Currency", value: BANK_DETAILS.currency, icon: CreditCard }
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="bg-slate-900/60 rounded-2xl p-4 border border-white/[0.06]">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                        <Icon className="w-3 h-3" /> {label}
                      </p>
                      <p className="font-mono font-bold text-white text-sm select-all">{value}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-slate-500 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-indigo-400" />
                  {BANK_DETAILS.note}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <Link to="/pricing" className="btn-ghost px-6 py-3 rounded-xl text-slate-400 hover:text-white text-sm font-semibold flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back to Pricing
                </Link>
                <button onClick={() => setStep(1)} className="btn-primary px-8 py-3 rounded-xl font-bold text-white flex items-center gap-2">
                  I have transferred the money <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ─── STEP 1: Personal Details ──────────────────────────── */}
          {step === 1 && (
            <div className="glass gradient-border rounded-3xl p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white text-xl">Personal Details</h3>
                  <p className="text-xs text-slate-500">Required for identity verification and payment matching</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Full Legal Name <span className="text-red-400">*</span></label>
                  <input
                    type="text" required
                    value={form.fullName}
                    onChange={e => setForm({ ...form, fullName: e.target.value })}
                    placeholder="As it appears on your National ID"
                    className="input-field w-full px-4 py-3 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">National ID / Passport Number <span className="text-red-400">*</span></label>
                  <input
                    type="text" required
                    value={form.nationalIdNumber}
                    onChange={e => setForm({ ...form, nationalIdNumber: e.target.value })}
                    placeholder="e.g. A12345678"
                    className="input-field w-full px-4 py-3 rounded-xl text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Country <span className="text-red-400">*</span></label>
                  <input
                    type="text" required
                    value={form.country}
                    onChange={e => setForm({ ...form, country: e.target.value })}
                    placeholder="e.g. United States"
                    className="input-field w-full px-4 py-3 rounded-xl text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Phone Number (with country code) <span className="text-red-400">*</span></label>
                  <input
                    type="tel" required
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="e.g. +1 555 000 0000"
                    className="input-field w-full px-4 py-3 rounded-xl text-sm font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <button onClick={() => setStep(0)} className="btn-ghost px-6 py-3 rounded-xl text-slate-400 hover:text-white text-sm font-semibold flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => {
                    if (!form.fullName || !form.nationalIdNumber || !form.country || !form.phone) {
                      setError("Please fill in all personal details."); return;
                    }
                    setError(""); setStep(2);
                  }}
                  className="btn-primary px-8 py-3 rounded-xl font-bold text-white flex items-center gap-2"
                >
                  Continue to Upload <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {error && <p className="text-red-400 text-xs flex items-center gap-2 mt-2"><AlertCircle className="w-4 h-4" />{error}</p>}
            </div>
          )}

          {/* ─── STEP 2: Document Upload ───────────────────────────── */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="glass gradient-border rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-xl">Upload Documents</h3>
                    <p className="text-xs text-slate-500">Clear photos or scans only · JPG, PNG, PDF accepted · Max 10MB each</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* National ID Upload */}
                  <div>
                    <p className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-indigo-400" /> National ID / Passport <span className="text-red-400">*</span>
                    </p>
                    <label className={`relative flex flex-col items-center justify-center w-full h-44 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${nationalIdFile ? "border-emerald-500/50 bg-emerald-500/5" : "border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5"}`}>
                      <input type="file" accept="image/*,.pdf" className="hidden" onChange={e => handleFileChange(e, "nationalId")} />
                      {nationalIdPreview ? (
                        <img src={nationalIdPreview} alt="National ID" className="w-full h-full object-cover rounded-2xl opacity-80" />
                      ) : (
                        <div className="text-center p-4">
                          <Upload className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                          <p className="text-xs text-slate-400">Click to upload National ID or Passport</p>
                          <p className="text-[10px] text-slate-600 mt-1">Front side clearly visible</p>
                        </div>
                      )}
                      {nationalIdFile && (
                        <div className="absolute bottom-2 left-2 right-2 bg-emerald-500/20 rounded-xl px-3 py-1.5 text-xs text-emerald-400 font-semibold truncate text-center">
                          ✓ {nationalIdFile.name}
                        </div>
                      )}
                    </label>
                  </div>

                  {/* Payment Slip Upload */}
                  <div>
                    <p className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-indigo-400" /> Bank Transfer Receipt / Payment Slip <span className="text-red-400">*</span>
                    </p>
                    <label className={`relative flex flex-col items-center justify-center w-full h-44 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${paymentSlipFile ? "border-emerald-500/50 bg-emerald-500/5" : "border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5"}`}>
                      <input type="file" accept="image/*,.pdf" className="hidden" onChange={e => handleFileChange(e, "paymentSlip")} />
                      {paymentSlipPreview ? (
                        <img src={paymentSlipPreview} alt="Payment Slip" className="w-full h-full object-cover rounded-2xl opacity-80" />
                      ) : (
                        <div className="text-center p-4">
                          <Upload className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                          <p className="text-xs text-slate-400">Click to upload your bank transfer receipt</p>
                          <p className="text-[10px] text-slate-600 mt-1">Must show amount, date & account</p>
                        </div>
                      )}
                      {paymentSlipFile && (
                        <div className="absolute bottom-2 left-2 right-2 bg-emerald-500/20 rounded-xl px-3 py-1.5 text-xs text-emerald-400 font-semibold truncate text-center">
                          ✓ {paymentSlipFile.name}
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-slate-900/60 border border-white/[0.06] text-xs text-slate-400 leading-relaxed">
                  <Lock className="w-3.5 h-3.5 text-indigo-400 inline mr-1.5" />
                  Your documents are encrypted and stored securely. They are used solely for payment verification and will not be shared with any third party.
                </div>
              </div>

              {error && <div className="flex items-center gap-2 text-red-400 text-xs p-3 rounded-xl bg-red-500/10 border border-red-500/20"><AlertCircle className="w-4 h-4 shrink-0" />{error}</div>}

              <div className="flex items-center justify-between gap-4">
                <button onClick={() => setStep(1)} className="btn-ghost px-6 py-3 rounded-xl text-slate-400 hover:text-white text-sm font-semibold flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn-primary px-8 py-3 rounded-xl font-bold text-white flex items-center gap-2 disabled:opacity-60"
                >
                  {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <><ShieldCheck className="w-4 h-4" /> Submit for Review</>}
                </button>
              </div>
            </div>
          )}

          {/* ─── STEP 3: Confirmation ──────────────────────────────── */}
          {step === 3 && (
            <div className="glass gradient-border rounded-3xl p-10 text-center max-w-lg mx-auto">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="font-heading font-black text-3xl text-white mb-3">Submission Received!</h2>
              <p className="text-slate-400 leading-relaxed mb-2">
                Your payment request for the <strong className="text-white">{plan.name}</strong> plan has been submitted successfully.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Our team will review your documents and upgrade your account within <strong className="text-white">1–3 business days</strong>. You will receive a confirmation email at <strong className="text-indigo-400">{user?.email}</strong> once approved.
              </p>
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/[0.06] text-xs text-slate-400 mb-8">
                <p className="font-semibold text-slate-300 mb-1">What happens next?</p>
                <ol className="space-y-1 text-left list-decimal list-inside">
                  <li>Admin reviews your National ID and payment slip</li>
                  <li>Your plan is upgraded manually by our team</li>
                  <li>You receive a confirmation email</li>
                  <li>Log in to access your new premium features</li>
                </ol>
              </div>
              <Link to="/editor" className="btn-primary w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2">
                Go to Portfolio Editor <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
