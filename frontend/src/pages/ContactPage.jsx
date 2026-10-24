import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ContactSection from '../components/portfolio/ContactSection';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-12 space-y-4">
        {/* General Support & Platform Inquiries */}
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

        {/* Enterprise & Custom Solutions — Contact Sales */}
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
