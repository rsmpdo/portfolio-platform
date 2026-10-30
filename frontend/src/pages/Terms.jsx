import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import {
  FileText,
  ShieldCheck,
  Scale,
  CreditCard,
  AlertTriangle,
  UserCheck,
  HelpCircle,
  Mail,
  ArrowRight
} from 'lucide-react';

export default function Terms() {
  const lastUpdated = 'October 25, 2026';

  const sections = [
    {
      id: 'acceptance',
      icon: Scale,
      title: '1. Acceptance of Terms',
      content: (
        <>
          <p className="text-slate-300 leading-relaxed text-sm mb-3">
            By creating an account, browsing, or using the PortfolioCraft platform (the "Service"), you agree to be bound by these Terms of Service ("Terms") and our Privacy Policy. If you do not agree to these Terms, you may not access or use the Service.
          </p>
          <p className="text-slate-300 leading-relaxed text-sm">
            These Terms apply to all visitors, registered creators, teams, and clients who access or use the Service. You represent that you are at least 16 years of age or the age of legal majority in your jurisdiction.
          </p>
        </>
      )
    },
    {
      id: 'accounts',
      icon: UserCheck,
      title: '2. Accounts & Security',
      content: (
        <>
          <p className="text-slate-300 leading-relaxed text-sm mb-3">
            When you register an account, you must provide accurate, current, and complete information. You are solely responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.
          </p>
          <p className="text-slate-300 leading-relaxed text-sm">
            You must notify us immediately at <a href="mailto:security@portfoliocraft.io" className="text-indigo-400 underline hover:text-indigo-300">security@portfoliocraft.io</a> upon discovering any unauthorized access or breach of security. PortfolioCraft cannot and will not be liable for any loss or damage arising from your failure to protect your credentials.
          </p>
        </>
      )
    },
    {
      id: 'intellectual-property',
      icon: ShieldCheck,
      title: '3. Intellectual Property & Creator Ownership',
      content: (
        <>
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 mb-4">
            <p className="text-xs font-semibold text-indigo-300">
              Creator Ownership Guarantee: You retain 100% full copyright and intellectual property rights to all case studies, project media, text, graphics, and designs you upload to PortfolioCraft.
            </p>
          </div>
          <p className="text-slate-300 leading-relaxed text-sm mb-3">
            By publishing your portfolio on the Service, you grant PortfolioCraft a limited, non-exclusive, worldwide license solely to host, cache, format, and display your public portfolio on your custom URL and, if selected, within our public Showcase directory.
          </p>
          <p className="text-slate-300 leading-relaxed text-sm">
            All PortfolioCraft logos, software architecture, UI components, themes, and platform designs are the exclusive intellectual property of PortfolioCraft and its licensors.
          </p>
        </>
      )
    },
    {
      id: 'acceptable-use',
      icon: AlertTriangle,
      title: '4. Acceptable Use Policy',
      content: (
        <>
          <p className="text-slate-300 leading-relaxed text-sm mb-3">
            You agree not to misuse the Service or assist anyone else in doing so. Specifically, you agree not to:
          </p>
          <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mb-3">
            <li>Upload malicious code, phishing scripts, spyware, or harmful payloads.</li>
            <li>Infringe the copyright, trademark, patent, or proprietary rights of any third party.</li>
            <li>Engage in unauthorized web scraping, automated extraction, or denial-of-service attacks.</li>
            <li>Impersonate any person, brand, enterprise, or entity without legal authorization.</li>
            <li>Publish defamatory, abusive, harassing, hateful, or unlawful material.</li>
          </ul>
          <p className="text-slate-300 leading-relaxed text-sm">
            We reserve the right to immediately suspend or terminate any portfolio or account found violating our Acceptable Use Policy without prior notice.
          </p>
        </>
      )
    },
    {
      id: 'subscriptions',
      icon: CreditCard,
      title: '5. Subscriptions, Payments & Cancellations',
      content: (
        <>
          <p className="text-slate-300 leading-relaxed text-sm mb-3">
            PortfolioCraft provides both free and paid subscription tiers (Pro Creator at $12/month and Studio at $29/month). Paid subscriptions are billed in advance on a recurring monthly or annual basis via secure payment processors.
          </p>
          <p className="text-slate-300 leading-relaxed text-sm mb-3">
            <strong>Cancellation:</strong> You may cancel your subscription at any time via your Profile Settings. Upon cancellation, your paid features (custom domains, white-label branding, analytics) remain active until the end of your current billing period.
          </p>
          <p className="text-slate-300 leading-relaxed text-sm">
            <strong>Refunds:</strong> We offer a 14-day money-back guarantee for first-time subscribers who are not satisfied with our premium tiers. To request a refund, contact <a href="mailto:support@portfoliocraft.io" className="text-indigo-400 underline hover:text-indigo-300">support@portfoliocraft.io</a>.
          </p>
        </>
      )
    },
    {
      id: 'liability',
      icon: Scale,
      title: '6. Limitation of Liability & Warranty Disclaimer',
      content: (
        <>
          <p className="text-slate-300 leading-relaxed text-sm mb-3">
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied, including fitness for a particular purpose or non-infringement. While we target 99.99% edge availability, we do not guarantee uninterrupted or error-free operation.
          </p>
          <p className="text-slate-300 leading-relaxed text-sm">
            To the maximum extent permitted by applicable law, PortfolioCraft shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or loss of profits, data, or business opportunities arising from your use of the Service.
          </p>
        </>
      )
    },
    {
      id: 'contact',
      icon: Mail,
      title: '7. Contact Information',
      content: (
        <>
          <p className="text-slate-300 leading-relaxed text-sm mb-3">
            If you have questions about these Terms of Service or require legal clarifications, please reach out to our legal department:
          </p>
          <div className="p-4 rounded-xl glass border border-white/10 space-y-1.5 text-xs text-slate-300 font-mono">
            <p className="text-white font-bold font-sans text-sm">PortfolioCraft Legal Operations</p>
            <p>Email: legal@portfoliocraft.io</p>
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-4">
              <FileText className="w-3.5 h-3.5" />
              <span>Legal Agreement</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Please read these terms carefully before creating your portfolio. By accessing PortfolioCraft, you agree to these legal standards and creator commitments.
            </p>
            <p className="text-xs font-mono text-slate-500 mt-4">
              Last updated: {lastUpdated} • Effective globally
            </p>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-12">
            {sections.slice(0, 6).map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="p-3.5 rounded-2xl glass border border-white/[0.08] hover:border-indigo-500/40 hover:bg-white/[0.04] transition group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <sec.icon className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition" />
                  <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition truncate">
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
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
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
          <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-bold text-base text-white">Questions about our legal terms?</h3>
              <p className="text-xs text-slate-400 mt-1">Our support team is available 24/7 to help resolve inquiries.</p>
            </div>
            <Link
              to="/contact"
              className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shrink-0"
            >
              <span>Contact Legal Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
