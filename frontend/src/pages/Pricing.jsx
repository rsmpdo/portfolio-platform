import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Sparkles, Check, HelpCircle, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: "Free Forever",
    price: "$0",
    period: "forever",
    description: "Everything you need to launch a professional portfolio today.",
    features: [
      "Full Visual CMS Editor",
      "Up to 5 Portfolio Sections",
      "Cloudinary Image Uploads",
      "Custom Slug (/p/username)",
      "Standard SSL & Edge Hosting"
    ],
    cta: "Start Free",
    popular: false
  },
  {
    name: "Pro Creator",
    price: "$12",
    period: "per month",
    description: "For professionals who want custom domains, analytics, and premium themes.",
    features: [
      "Everything in Free",
      "Unlimited Portfolio Sections",
      "Custom Domain Support (yourname.com)",
      "High-Res Video Uploads",
      "SEO Meta Optimization",
      "Priority Customer Support"
    ],
    cta: "Start Pro Trial",
    popular: true
  },
  {
    name: "Studio & Team",
    price: "$29",
    period: "per month",
    description: "Designed for small agencies, design teams, and multiple portfolio sites.",
    features: [
      "Everything in Pro",
      "Up to 5 Team Portfolios",
      "Custom CSS Injection",
      "White-Label Branding",
      "Dedicated Account Manager"
    ],
    cta: "Get Started",
    popular: false
  }
];

const faqs = [
  { q: "Is the free plan really free forever?", a: "Yes! No credit card is required to sign up. You can build, publish, and update your portfolio for free." },
  { q: "Can I use my own custom domain?", a: "Yes, Pro and Team plan users can link their custom domain (e.g. yourname.com) seamlessly." },
  { q: "Do I need coding knowledge?", a: "Not at all! Everything is controlled via a visual drag-and-drop CMS editor." }
];

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge badge-indigo inline-flex mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple Transparent Pricing</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-white mb-6">
            Invest in Your<br />
            <span className="gradient-text">Personal Brand</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Start for free, upgrade when you're ready to take your portfolio to the next level.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {plans.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`glass-card gradient-border rounded-3xl p-8 flex flex-col justify-between relative ${
                p.popular ? 'border-indigo-500/50 glow-indigo' : ''
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 btn-primary px-4 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-lg">
                  Most Popular
                </div>
              )}
              <div>
                <h3 className="font-heading font-bold text-2xl text-white mb-2">{p.name}</h3>
                <p className="text-slate-400 text-xs mb-6 leading-relaxed">{p.description}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-heading font-black text-4xl text-white">{p.price}</span>
                  <span className="text-slate-500 text-xs">{p.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((feat, fIdx) => (
                    <li key={fIdx} className="text-xs text-slate-300 flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/register"
                className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 ${
                  p.popular ? 'btn-primary text-white' : 'btn-ghost text-slate-300 hover:text-white'
                }`}
              >
                <span>{p.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-2xl text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="glass rounded-2xl p-6 cursor-pointer border border-white/[0.06] hover:border-indigo-500/30 transition"
              >
                <div className="flex items-center justify-between font-semibold text-white text-sm">
                  <span>{f.q}</span>
                  <HelpCircle className="w-4 h-4 text-indigo-400" />
                </div>
                {openFaq === i && (
                  <p className="text-slate-400 text-xs mt-3 leading-relaxed border-t border-white/[0.06] pt-3">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
