import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Server,
  KeyRound,
  RefreshCw,
  Zap,
  CheckCircle2,
  Mail,
  ArrowRight,
  Cpu,
  Smartphone
} from 'lucide-react';

export default function Security() {
  const lastUpdated = 'October 29, 2026';

  const securityPillars = [
    {
      icon: Smartphone,
      title: 'Authenticator App 2FA (TOTP)',
      desc: 'Protect your account with RFC 6238 Time-Based One-Time Passwords via Google Authenticator, Authy, 1Password, or Microsoft Authenticator, complete with 8 one-time backup recovery codes.'
    },
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      desc: 'All traffic between clients and our platform is encrypted with TLS 1.3. Stored database clusters and backup snapshots use AES-256 bit encryption at rest.'
    },
    {
      icon: KeyRound,
      title: 'Hardened Credential Security',
      desc: 'User passwords are protected with one-way Bcrypt hashing (10 salt rounds) and multi-step verification for sensitive actions like password changes and account deletion.'
    },
    {
      icon: Zap,
      title: 'API Rate Limiting & Abuse Defense',
      desc: 'Sensitive authentication endpoints (/login, /2fa/login-verify, /register, /forgot-password) are protected with dynamic IP rate-limiting to prevent brute-force attacks.'
    },
    {
      icon: Server,
      title: '99.99% Edge High Availability',
      desc: 'Portfolio assets are cached and distributed across worldwide global edge points of presence, ensuring high speed and resilience against regional outages.'
    },
    {
      icon: Cpu,
      title: 'Strict Sandbox & Isolation',
      desc: 'Custom code embeds and rich text sections are rendered with content sanitization to prevent Cross-Site Scripting (XSS) and injection vulnerabilities.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header Banner */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Trust & Infrastructure</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
              Security & <span className="gradient-text">Trust</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              We engineer enterprise-grade security into every layer of PortfolioCraft so you can showcase your work with total confidence and peace of mind.
            </p>
            <p className="text-xs font-mono text-slate-500 mt-4">
              Last updated: {lastUpdated} • Zero trust architecture
            </p>
          </div>

          {/* Security Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {securityPillars.map((pillar, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl glass border border-white/[0.08] hover:border-indigo-500/30 transition space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-md">
                  <pillar.icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-base text-white">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* Two-Factor Authentication (2FA) Spotlight Card */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card gradient-border border border-indigo-500/30 space-y-6 mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-heading font-bold text-lg sm:text-xl text-white">
                      Two-Factor Authentication (2FA)
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                      Available Now
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Hardware-grade TOTP verification for all creator and studio accounts.
                  </p>
                </div>
              </div>

              <Link
                to="/profile"
                className="btn-primary px-4 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 self-start sm:self-auto shrink-0"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Enable 2FA in Settings</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  title: '1. QR & Setup Key Pairing',
                  desc: 'Scan the generated QR code or copy the Base32 setup key into Google Authenticator, Authy, 1Password, or Microsoft Authenticator.'
                },
                {
                  title: '2. 6-Digit TOTP Sign-In Gate',
                  desc: 'Every sign-in requires a rotating 30-second cryptographic 6-digit verification code after password authentication.'
                },
                {
                  title: '3. One-Time Recovery Codes',
                  desc: 'Receive 8 single-use emergency backup recovery codes upon activation so you never lose access if you switch devices.'
                }
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5"
                >
                  <h4 className="text-xs font-bold text-indigo-300">{step.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance & Standards */}
          <div className="p-6 sm:p-8 rounded-3xl glass border border-white/[0.08] space-y-6 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-lg sm:text-xl text-white">Compliance & Best Practices</h2>
                <p className="text-xs text-slate-400">Built to global standards for digital safety and privacy.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: 'GDPR Compliant', desc: 'Full compliance with EU General Data Protection Regulations and creator rights.' },
                { title: 'PCI-DSS Validated', desc: 'Zero local storage of cardholder data; payments processed via certified tier-1 gateways.' },
                { title: 'CCPA Compliant', desc: 'Compliant with California Consumer Privacy Act standards and right to opt-out.' }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Responsible Vulnerability Disclosure Program */}
          <div className="p-6 sm:p-8 rounded-3xl glass border border-white/[0.08] space-y-4 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h2 className="font-heading font-bold text-lg sm:text-xl text-white">
                Vulnerability Disclosure Program
              </h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              We welcome reports from ethical security researchers and developers. If you discover a potential vulnerability or security flaw within PortfolioCraft:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
              <li>Please email details promptly to <a href="mailto:security@portfoliocraft.io" className="text-indigo-400 font-mono font-bold underline hover:text-indigo-300">security@portfoliocraft.io</a>.</li>
              <li>Provide detailed steps or proof-of-concept material to reproduce the issue.</li>
              <li>Please allow reasonable time for our engineering team to remediate the vulnerability before public disclosure.</li>
            </ul>
            <p className="text-xs text-slate-400 leading-relaxed pt-2">
              We commit to acknowledging received reports within 24 hours and keeping researchers updated throughout the mitigation process.
            </p>
          </div>

          {/* Footer Callout */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-emerald-500/10 to-transparent border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-bold text-base text-white">Have security or enterprise questions?</h3>
              <p className="text-xs text-slate-400 mt-1">Our engineering team is ready to provide architecture answers.</p>
            </div>
            <Link
              to="/contact"
              className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shrink-0"
            >
              <span>Contact Security Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
