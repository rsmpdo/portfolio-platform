import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ContactSection({ props = {} }) {
  const {
    heading = 'Let\'s Work Together',
    subheading = 'Feel free to reach out for collaborations, job opportunities, or project inquiries.',
    email = 'alex.morgan@example.com',
    messagePlaceholder = 'Hi Alex, I loved your portfolio! Let\'s connect...'
  } = props;

  const [form, setForm] = useState({ name: '', userEmail: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', userEmail: '', message: '' });
    }, 4000);
  };

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-8 md:p-12 rounded-3xl border border-slate-800 relative overflow-hidden"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
              <MessageSquare className="w-4 h-4" />
              <span>Contact & Connect</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">{heading}</h2>
            {subheading && <p className="text-slate-400 mt-4 text-base md:text-lg max-w-xl mx-auto">{subheading}</p>}

            {email && (
              <div className="mt-6 inline-flex items-center gap-2 text-indigo-400 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 text-sm font-medium">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${email}`} className="hover:underline">{email}</a>
              </div>
            )}
          </div>

          {submitted ? (
            <div className="text-center py-10 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
              <p className="text-slate-300 text-sm mt-1">Thank you for reaching out. I'll respond as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">Your Email</label>
                  <input
                    type="email"
                    required
                    value={form.userEmail}
                    onChange={(e) => setForm({ ...form, userEmail: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">Message</label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={messagePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
