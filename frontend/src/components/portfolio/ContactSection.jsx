import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, MessageSquare, MapPin, Clock, Phone, Loader2, Building2, ShieldCheck } from 'lucide-react';
import API from '../../services/api';

export default function ContactSection({ props = {}, viewportMode }) {
  const {
    badgeText = 'Get In Touch',
    heading = "Ready to Create Something Great?",
    subheading = "Whether you have a project in mind or just want to explore possibilities — let's start a conversation.",
    email = 'support@portfoliocraft.io',
    location = '548 Market St, Suite 42100, San Francisco, CA 94104, USA',
    phone = '+1 (415) 890-5400',
    responseTime = 'Usually responds within 24 hours',
    emailLabel = 'Email Us',
    phoneLabel = 'Call / WhatsApp',
    locationLabel = 'Location',
    buttonText = 'Send Message',
    subject = '',
    messagePlaceholder = 'Tell me about your project, vision, or just say hi...',
    isEnterprise = false,
    enterpriseFeatures = []
  } = props;

  const isMobile = viewportMode === 'mobile';
  const isTablet = viewportMode === 'tablet';
  const isSmall = isMobile || isTablet;

  const [form, setForm] = useState({
    name: '',
    userEmail: '',
    company: '',
    teamSize: '10-50 seats',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const pathname = window.location.pathname;
      const pathParts = pathname.split('/').filter(Boolean);
      const isPortfolioRoute = pathParts.length > 1 && ['p', 'portfolio', 'showcase'].includes(pathParts[0]);
      const recipientHandle = isPortfolioRoute ? pathParts[1].toLowerCase() : '';

      const compiledMessage = isEnterprise
        ? `[Enterprise Inquiry — Company: ${form.company || 'N/A'} | Scope/Team Size: ${form.teamSize}]\n\n${form.message}`
        : form.message;

      const resolvedSubject =
        subject ||
        (isEnterprise
          ? `Enterprise Sales Inquiry (${form.company || 'Organization'})`
          : isPortfolioRoute
          ? 'Portfolio Contact Inquiry'
          : 'Platform Support Inquiry');

      await API.post('/messages', {
        recipientHandle,
        isSiteAdminMessage: !isPortfolioRoute,
        senderName: form.name,
        senderEmail: form.userEmail,
        subject: resolvedSubject,
        message: compiledMessage
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: '', userEmail: '', company: '', teamSize: '10-50 seats', message: '' });
      }, 4000);
    } catch (err) {
      console.error('Submit contact message error:', err);
      alert('Failed to send message: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`${isSmall ? 'py-12 px-4' : 'py-20 px-6'} relative`}>
      <div className="max-w-5xl mx-auto">
        <div className="glass gradient-border rounded-[2rem] overflow-hidden">
          <div className={`grid ${isSmall ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-5'}`}>
            {/* Left Panel */}
            <div className={`${isSmall ? 'p-6' : 'lg:col-span-2 p-6 sm:p-10'} ${
              isEnterprise
                ? 'bg-gradient-to-br from-purple-600/20 via-indigo-600/15 to-amber-500/10'
                : 'bg-gradient-to-br from-indigo-600/20 to-purple-600/10'
            } border-b lg:border-b-0 lg:border-r border-white/[0.06] flex flex-col justify-between`}>
              <div>
                <div className="badge badge-indigo inline-flex mb-6">
                  {isEnterprise ? <Building2 className="w-3 h-3" /> : <MessageSquare className="w-3 h-3" />}
                  <span>{badgeText}</span>
                </div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white leading-tight mb-4">
                  {heading}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {subheading}
                </p>

                {isEnterprise && enterpriseFeatures.length > 0 && (
                  <div className="space-y-2.5 mb-8 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 mb-1">
                      Enterprise Capabilities
                    </p>
                    {enterpriseFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <a href={`mailto:${email}`} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-indigo-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">{emailLabel}</p>
                    <p className="text-sm text-white font-medium group-hover:text-indigo-400 transition underline-hover">{email}</p>
                  </div>
                </a>
                <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-indigo-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">{phoneLabel}</p>
                    <p className="text-sm text-white font-medium group-hover:text-indigo-400 transition underline-hover">{phone}</p>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-indigo-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5 font-sans">{locationLabel}</p>
                    <p className="text-sm text-white font-medium">{location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-emerald-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Response Time</p>
                    <p className="text-sm text-emerald-400 font-medium">{responseTime}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-3 p-6 sm:p-10">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white mb-2">
                    {isEnterprise ? 'Sales Inquiry Received!' : 'Message Sent!'}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {isEnterprise
                      ? 'An Enterprise Solutions Architect will reach out to you shortly.'
                      : "Thanks for reaching out. You'll hear back soon."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Your Name</label>
                      <input
                        type="text" required value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Alex Johnson"
                        className="input-field w-full px-4 py-3 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        {isEnterprise ? 'Work Email' : 'Your Email'}
                      </label>
                      <input
                        type="email" required value={form.userEmail}
                        onChange={e => setForm({ ...form, userEmail: e.target.value })}
                        placeholder="alex@company.com"
                        className="input-field w-full px-4 py-3 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  {isEnterprise && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          required
                          value={form.company}
                          onChange={e => setForm({ ...form, company: e.target.value })}
                          placeholder="Acme Design Studio Inc."
                          className="input-field w-full px-4 py-3 rounded-xl text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                          Team Size / Solution Tier
                        </label>
                        <select
                          value={form.teamSize}
                          onChange={e => setForm({ ...form, teamSize: e.target.value })}
                          className="input-field w-full px-4 py-3 rounded-xl text-sm bg-slate-900 border border-white/10 text-slate-200"
                        >
                          <option value="10-50 seats">Agency / Studio (10–50 seats)</option>
                          <option value="50-250 seats">Mid-Market Organization (50–250 seats)</option>
                          <option value="250+ Enterprise">Global Enterprise (250+ seats)</option>
                          <option value="University / Education">University & Cohort Licensing</option>
                          <option value="Custom White-Label">Custom White-Label Infrastructure</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      {isEnterprise ? 'Project Requirements & Goals' : 'Your Message'}
                    </label>
                    <textarea
                      rows={5} required value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder={messagePlaceholder}
                      className="input-field w-full px-4 py-3 rounded-xl text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3.5 rounded-xl text-white font-bold flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    <span>{buttonText}</span>
                  </button>
                  <p className="text-center text-xs text-slate-600">
                    {isEnterprise
                      ? 'Protected by enterprise NDA & strict confidentiality standards.'
                      : 'No spam, ever. Just a genuine reply from a real person.'}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
