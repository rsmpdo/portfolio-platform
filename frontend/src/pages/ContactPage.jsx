import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ContactSection from '../components/portfolio/ContactSection';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <ContactSection
          props={{
            heading: "Get in Touch with PortfolioCraft",
            subheading: "Have questions, feature requests, or partnership inquiries? We're here to help.",
            email: "support@portfoliocraft.com",
            location: "San Francisco, CA & Remote Worldwide",
            responseTime: "Responds within 12 hours"
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
