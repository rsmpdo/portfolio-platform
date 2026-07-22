import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, MessageSquare, MapPin, Clock, Loader2 } from 'lucide-react';
import API from '../../services/api';

export default function ContactSection({ props = {} }) {
  const {
    heading = "Ready to Create Something Great?",
    subheading = "Whether you have a project in mind or just want to explore possibilities — let's start a conversation.",
    email = 'hello@example.com',
    location = 'Available Worldwide · Remote Friendly',
    responseTime = 'Usually responds within 24 hours'
  } = props;

  const [form, setForm] = useState({ name: '', userEmail: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const pathname = window.location.pathname;
      const pathParts = pathname.split('/').filter(Boolean);
      const recipientHandle = pathParts.length > 0 && pathParts[0] === 'p' ? pathParts[1] : '';

      await API.post('/messages', {
        recipientHandle,
        senderName: form.name,
        senderEmail: form.userEmail,
        message: form.message
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: '', userEmail: '', message: '' });
      }, 4000);
    } catch (err) {
      console.error('Submit contact message error:', err);
      alert('Failed to send message: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="glass gradient-border rounded-[2rem] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Left Panel */}
            <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600/20 to-purple-600/10 p-10 border-r border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="badge badge-indigo inline-flex mb-6">
                  <MessageSquare className="w-3 h-3" />
                  <span>Get In Touch</span>
                </div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-white leading-tight mb-4">
                  {heading}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  {subheading}
                </p>
              </div>

              <div className="space-y-4">
                <a href={`mailto:${email}`} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-indigo-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Email Me</p>
                    <p className="text-sm text-white font-medium group-hover:text-indigo-400 transition underline-hover">{email}</p>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-indigo-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Location</p>
                    <p className="text-sm text-white font-medium">{location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-emerald-400">
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
            <div className="lg:col-span-3 p-10">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-400 text-sm">Thanks for reaching out. You'll hear back soon.</p>
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
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Your Email</label>
                      <input
                        type="email" required value={form.userEmail}
                        onChange={e => setForm({ ...form, userEmail: e.target.value })}
                        placeholder="alex@company.com"
                        className="input-field w-full px-4 py-3 rounded-xl text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Your Message</label>
                    <textarea
                      rows={5} required value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your project, vision, or just say hi..."
                      className="input-field w-full px-4 py-3 rounded-xl text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary w-full py-3.5 rounded-xl text-white font-bold flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                  <p className="text-center text-xs text-slate-600">No spam, ever. Just a genuine reply from a real person.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
