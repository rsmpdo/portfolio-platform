import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ContactSection from '../components/portfolio/ContactSection';
import {
  Headphones,
  Building2,
  Globe,
  ShieldCheck,
  Clock,
  MessageSquare,
  MapPin,
  Phone,
  Mail,
  CheckCircle2
} from 'lucide-react';

const inquiryChannels = [
  {
    icon: Headphones,
    title: 'Creator Support & Technical Help',
    description:
      'Need assistance configuring your custom handle, optimizing Cloudinary media assets, or fine-tuning responsive breakpoints in the visual editor? Our US-based support engineers are ready to walk you through every detail.',
    meta: 'Average response: Under 12 hours'
  },
  {
    icon: Building2,
    title: 'Enterprise & Agency Licensing',
    description:
      'Scaling across multiple design pods, creative directors, or engineering teams? We provide centralized seat management, custom white-label domains, and bespoke SLA agreements tailored to your organization.',
    meta: 'Dedicated Solutions Architect assigned'
  },
  {
    icon: ShieldCheck,
    title: 'Billing, Verification & Account Security',
    description:
      'Have questions regarding one-time Pro or Studio upgrades, Wise bank transfer verification, or corporate invoicing? Our billing operations team ensures smooth, transparent account provisioning.',
    meta: 'Priority verification & receipts'
  },
  {
    icon: Globe,
    title: 'Partnerships, Press & Education',
    description:
      'We partner with design bootcamps, computer science universities, and creator collectives worldwide to equip emerging talent with studio-grade portfolio infrastructure.',
    meta: 'Global cohort & campus programs'
  }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20">
        <section className="px-6 max-w-5xl mx-auto text-center mb-16">
          <div className="badge badge-indigo inline-flex mb-4">
            <Headphones className="w-3.5 h-3.5" />
            <span>Global Support & Enterprise Advisory</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-white mb-6 leading-tight">
            We’re Here to Help You<br />
            <span className="gradient-text">Build, Launch & Scale</span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-4">
            Whether you are an independent product designer preparing for your next career leap, a full-stack engineer documenting complex system architecture, or a global creative agency onboarding fifty seats, our team is committed to giving you direct, human support.
          </p>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
            With headquarters in San Francisco and enterprise operations in New York, PortfolioCraft routes every inquiry directly to product specialists and solutions engineers—never automated chatbots or scripted ticket queues.
          </p>
        </section>

        <section className="px-6 max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inquiryChannels.map((channel, idx) => {
              const Icon = channel.icon;
              return (
                <div
                  key={idx}
                  className="glass-card gradient-border rounded-3xl p-7 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-white">
                      {channel.title}
                    </h3>
                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                      {channel.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/[0.06] flex items-center gap-2 text-xs font-semibold text-emerald-400">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{channel.meta}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="px-6 max-w-5xl mx-auto mb-10">
          <div className="glass gradient-border rounded-3xl p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400">
                <MapPin className="w-4 h-4" />
                <span>United States Operations</span>
              </div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-white">
                Direct Access to Our US Product & Sales Teams
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Choose the appropriate form below based on your needs. Use our <strong className="text-white">General Inquiries & Support</strong> desk for platform questions, account assistance, or feedback, or scroll down to our <strong className="text-white">Enterprise & Custom Solutions</strong> desk to connect with our sales leadership regarding multi-seat deployments and custom infrastructure.
              </p>
            </div>
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
                  West Coast HQ · San Francisco
                </div>
                <p className="text-xs text-slate-300">548 Market St, Suite 42100, San Francisco, CA 94104</p>
                <p className="text-xs text-slate-400 font-mono mt-1">+1 (415) 890-5400 · Mon–Fri, 8am–6pm PST</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">
                  East Coast Enterprise · New York
                </div>
                <p className="text-xs text-slate-300">350 Fifth Ave, Suite 4820, New York, NY 10118</p>
                <p className="text-xs text-slate-400 font-mono mt-1">+1 (800) 555-0199 · Priority Enterprise Desk</p>
              </div>
            </div>
          </div>
        </section>

        <ContactSection
          props={{
            badgeText: "General Inquiries & Support",
            heading: "Get in Touch with PortfolioCraft",
            subheading: "Have questions, feature requests, or general platform inquiries? Our US-based support team is here to help.",
            email: "support@portfoliocraft.io",
            emailLabel: "Support Email",
            location: "548 Market St, Suite 42100, San Francisco, CA 94104, USA",
            locationLabel: "US Headquarters",
            phone: "+1 (415) 890-5400",
            phoneLabel: "US Support Line",
            responseTime: "Responds within 12 hours",
            buttonText: "Send Message"
          }}
        />

        <section className="px-6 max-w-5xl mx-auto pt-8 pb-2">
          <div className="glass-card rounded-3xl p-8 border border-white/[0.08] space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400">
              <Building2 className="w-4 h-4" />
              <span>For Agencies, Studios & Large Organizations</span>
            </div>
            <h2 className="font-heading font-black text-2xl md:text-3xl text-white">
              Looking for Enterprise-Grade Portfolio Infrastructure?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Leading design agencies, engineering consultancies, and universities rely on PortfolioCraft Enterprise to showcase talent at scale. We provide custom domain routing, centralized brand governance, SAML single sign-on (SSO), dedicated cloud edge allocation, and tailored invoicing. Fill out the enterprise form below to schedule an architecture consultation with our sales team.
            </p>
          </div>
        </section>

        <div id="enterprise-sales">
          <ContactSection
            props={{
              isEnterprise: true,
              badgeText: "Enterprise & Custom Solutions",
              heading: "Scale with PortfolioCraft Enterprise",
              subheading: "Need multi-seat agency licensing, custom white-label infrastructure, SSO & security compliance, or dedicated SLAs? Connect directly with our Enterprise Sales team.",
              email: "sales@portfoliocraft.io",
              emailLabel: "Enterprise Sales Desk",
              location: "350 Fifth Ave, Suite 4820, New York, NY 10118, USA",
              locationLabel: "Enterprise Sales Office",
              phone: "+1 (800) 555-0199",
              phoneLabel: "Direct Sales Line (Toll-Free US)",
              responseTime: "Priority SLA · Responds within 2 hours",
              buttonText: "Contact Sales",
              messagePlaceholder: "Tell our sales team about your organization size, custom workflow needs, white-label requirements, or timeline...",
              enterpriseFeatures: [
                "Unlimited Studio Portfolios & Multi-Team Workspaces",
                "Custom Domain Routing & Full White-Label Infrastructure",
                "SAML SSO, Role-Based Access Control & SOC2 Compliance",
                "Dedicated Solutions Architect & 99.99% Uptime SLA"
              ]
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
