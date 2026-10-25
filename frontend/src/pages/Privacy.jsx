import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import {
  Shield,
  EyeOff,
  Lock,
  Database,
  UserCheck,
  Server,
  Globe2,
  Mail,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function Privacy() {
  const lastUpdated = 'October 25, 2026';

  const sections = [
    {
      id: 'commitment',
      icon: Shield,
      title: '1. Our Privacy Philosophy',
      content: (
        <>
          <p className="text-slate-300 leading-relaxed text-sm mb-3">
            At PortfolioCraft, we believe that privacy is a foundational human right. Our business model is simple and honest: creators pay us for professional design tools, custom domains, and platform hosting. We do not sell your personal data, monetize your portfolio traffic, or license your creative work to third-party ad networks.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
            {[
              { title: 'Zero Data Brokerage', desc: 'We never sell or rent your personal information to third parties.' },
              { title: 'Cookieless Visitor Analytics', desc: 'Visitor stats use anonymized hashes with no cross-site tracking.' },
              { title: 'Total Data Portability', desc: 'Export or delete your layouts, case studies, and account anytime.' }
            ].map((card, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold text-white">{card.title}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </>
      )
    },
    {
      id: 'collection',
      icon: Database,
      title: '2. Information We Collect',
      content: (
        <>
          <p className="text-slate-300 leading-relaxed text-sm mb-3">
            We collect only the minimum necessary information required to deliver, secure, and maintain your portfolios:
          </p>
          <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mb-3">
            <li><strong>Account Information:</strong> Name, email address, password hash (encrypted via Bcrypt with 10 salt rounds), and chosen subscription plan.</li>
            <li><strong>Portfolio Content:</strong> Headings, bio text, project images, case studies, resume data, and external links you explicitly input.</li>
            <li><strong>Payment Data:</strong> Billing details and subscriptions are processed directly through PCI-compliant payment gateways. We never store raw credit card numbers.</li>
            <li><strong>Technical Telemetry:</strong> Anonymized server logs, browser types, and response latencies solely for system health and DDoS protection.</li>
          </ul>
        </>
      )
    },
    {
      id: 'analytics',
      icon: EyeOff,
      title: '3. Cookieless Creator Analytics',
      content: (
        <>
          <p className="text-slate-300 leading-relaxed text-sm mb-3">
            Our Creator Analytics Dashboard provides profile views, unique visitors, recruiter ATS resume downloads, and traffic sources without intruding on visitor privacy.
          </p>
          <p className="text-slate-300 leading-relaxed text-sm">
            We do not place tracking cookies, fingerprint visitor hardware, or build behavioral ad profiles. Unique visitors are aggregated using non-reversible cryptographic daily hashes that cannot be reverse-engineered into individual identities.
          </p>
        </>
      )
    },
    {
      id: 'processors',
      icon: Server,
      title: '4. Third-Party Service Providers',
      content: (
        <>
          <p className="text-slate-300 leading-relaxed text-sm mb-3">
            We work with select, audited infrastructure partners who adhere to rigorous data protection standards (GDPR, SOC 2 Type II, ISO 27001):
          </p>
          <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mb-3">
            <li><strong>Cloud Infrastructure:</strong> Managed server clusters and CDN edge networks for low-latency portfolio delivery.</li>
            <li><strong>Payment Gateways:</strong> PCI-DSS certified payment processors for secure subscription billing.</li>
            <li><strong>Transactional Email:</strong> Resend / secure SMTP services for password resets and verification emails.</li>
          </ul>
        </>
      )
    },
    {
      id: 'rights',
      icon: UserCheck,
      title: '5. Your Rights & Data Ownership (GDPR & CCPA)',
      content: (
        <>
          <p className="text-slate-300 leading-relaxed text-sm mb-3">
            Regardless of where you reside, we extend comprehensive data protection rights to all creators:
          </p>
          <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mb-3">
            <li><strong>Right to Access & Rectify:</strong> Inspect and modify all personal details via your Profile Settings.</li>
            <li><strong>Right to Erasure ("Right to Be Forgotten"):</strong> Request full permanent deletion of your account, portfolios, and uploaded assets.</li>
            <li><strong>Right to Data Portability:</strong> Export your portfolio JSON and media at any time.</li>
            <li><strong>Opt-Out of Non-Essential Communications:</strong> Unsubscribe from community newsletters with a single click.</li>
          </ul>
        </>
      )
    },
    {
      id: 'security',
      icon: Lock,
      title: '6. Security & Encryption Standards',
      content: (
        <>
          <p className="text-slate-300 leading-relaxed text-sm mb-3">
            All data transmitted between your browser and our servers is secured using modern TLS 1.3 encryption. Data stored in our database clusters is encrypted at rest using industry-standard AES-256 protocols.
          </p>
          <p className="text-slate-300 leading-relaxed text-sm">
            For more technical details on our infrastructure safeguards, please read our dedicated <Link to="/security" className="text-indigo-400 underline hover:text-indigo-300">Security & Trust page</Link>.
          </p>
        </>
      )
    },
    {
      id: 'contact',
      icon: Mail,
      title: '7. Privacy Inquiries & Data Protection Officer',
      content: (
        <>
          <p className="text-slate-300 leading-relaxed text-sm mb-3">
            If you wish to exercise your data protection rights, request account deletion, or ask questions about our compliance, please reach out to our team:
          </p>
          <div className="p-4 rounded-xl glass border border-white/10 space-y-1.5 text-xs text-slate-300 font-mono">
            <p className="text-white font-bold font-sans text-sm">PortfolioCraft Privacy Office</p>
            <p>Email: privacy@portfoliocraft.io</p>
            <p>Address: 548 Market St, Suite 42100, San Francisco, CA 94104, USA</p>
          </div>
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header Banner */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
              <Shield className="w-3.5 h-3.5" />
              <span>Privacy & Trust</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              We respect your creative independence and personal privacy. Learn how we handle, store, and protect your data across the PortfolioCraft ecosystem.
            </p>
            <p className="text-xs font-mono text-slate-500 mt-4">
              Last updated: {lastUpdated} • GDPR, CCPA & Global Compliant
            </p>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-12">
            {sections.slice(0, 6).map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="p-3.5 rounded-2xl glass border border-white/[0.08] hover:border-emerald-500/40 hover:bg-white/[0.04] transition group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <sec.icon className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition" />
                  <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition truncate">
                    {sec.title.split('. ')[1]}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 block truncate">Jump to section</span>
              </a>
            ))}
          </div>

          {/* Sections Stream */}
          <div className="space-y-8">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="p-6 sm:p-8 rounded-3xl glass border border-white/[0.08] hover:border-white/15 transition scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <section.icon className="w-4 h-4" />
                  </div>
                  <h2 className="font-heading font-bold text-lg sm:text-xl text-white">
                    {section.title}
                  </h2>
                </div>
                <div>{section.content}</div>
              </section>
            ))}
          </div>

          {/* Footer Callout */}
          <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-indigo-500/10 to-transparent border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-bold text-base text-white">Need to export or delete your data?</h3>
              <p className="text-xs text-slate-400 mt-1">Our privacy team handles all data subject access requests promptly.</p>
            </div>
            <Link
              to="/contact"
              className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shrink-0"
            >
              <span>Contact Privacy Office</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
