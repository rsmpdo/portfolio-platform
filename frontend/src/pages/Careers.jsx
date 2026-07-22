import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Sparkles, Briefcase, MapPin, ArrowRight, X, CheckCircle2, Upload, FileText, Send, Loader2 } from 'lucide-react';

const JOBS = [
  {
    id: 'fullstack-dev',
    title: "Senior Full Stack Engineer (React/Node)",
    location: "Remote Worldwide",
    type: "Full-time",
    department: "Engineering",
    description: "We are looking for an experienced Full Stack Engineer to lead the core layout engine development. You will work on real-time rendering, drag-and-drop state machines, and high-performance canvas systems.",
    requirements: [
      "5+ years experience with React, Node.js, and MongoDB",
      "Deep understanding of web performance, DOM manipulation, and canvas optimization",
      "Experience building CMS, site builders, or dynamic block editors"
    ]
  },
  {
    id: 'lead-designer',
    title: "Lead UI/UX Designer",
    location: "Remote Worldwide",
    type: "Full-time",
    department: "Design",
    description: "Join us as Lead Designer to create state-of-the-art portfolio templates, glassmorphic UI systems, and micro-animations that make creator showcases feel premium and alive.",
    requirements: [
      "Strong portfolio showing modern web apps, dark modes, and interactive UI systems",
      "Proficiency in Figma, Tailwind CSS design tokens, and CSS animations",
      "Obsession with typography, spacing, and micro-interactions"
    ]
  },
  {
    id: 'devops-infra',
    title: "DevOps & Cloud Infrastructure Engineer",
    location: "Remote Worldwide",
    type: "Full-time",
    department: "Infrastructure",
    description: "Help us scale PortfolioCraft to millions of creator pageviews per day with high availability, global CDN caching, and edge serverless architectures.",
    requirements: [
      "Experience with Docker, Kubernetes, AWS, Vercel, and CDN edge networks",
      "Strong background in CI/CD automation, MongoDB cluster tuning, and Redis caching",
      "Knowledge of Web Application Firewalls (WAF) and DDoS protection"
    ]
  }
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    portfolioUrl: '',
    resumeUrl: '',
    coverNote: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setSubmitted(false);
    setForm({ fullName: '', email: '', portfolioUrl: '', resumeUrl: '', coverNote: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setAppId(`APP-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-5xl mx-auto w-full">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge badge-indigo inline-flex mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Join Our Team</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-white mb-6">
            Build the Future of<br />
            <span className="gradient-text">Creator Portfolios</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            We are a fast-moving, remote-first team passionate about design, performance, and empowering creators around the globe.
          </p>
        </div>

        {/* Job Listings */}
        <div className="space-y-4 mb-20">
          {JOBS.map((job) => (
            <div key={job.id} className="glass gradient-border rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-indigo-500/40 transition">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-bold uppercase tracking-wider">
                    {job.department}
                  </span>
                  <span className="text-slate-500 text-xs">•</span>
                  <span className="text-xs text-slate-400 font-medium">{job.type}</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-1">{job.title}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{job.location}</span>
                </div>
              </div>
              <button
                onClick={() => handleOpenModal(job)}
                className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 shrink-0"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* ─── Job Application Modal ────────────────────────── */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="glass gradient-border rounded-3xl max-w-2xl w-full p-6 md:p-8 relative shadow-2xl my-8">
            {/* Close Button */}
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-5 right-5 p-2 rounded-xl glass text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-white">Application Received!</h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for applying for the <span className="text-white font-semibold">{selectedJob.title}</span> role.
                  We have recorded your details under Reference ID <span className="text-indigo-400 font-mono font-bold">{appId}</span>.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="btn-primary px-6 py-2.5 rounded-xl text-xs font-bold text-white"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6 pb-6 border-b border-white/[0.06]">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                    {selectedJob.department}
                  </span>
                  <h2 className="font-heading font-bold text-2xl text-white mb-2">{selectedJob.title}</h2>
                  <p className="text-slate-400 text-xs leading-relaxed mb-3">{selectedJob.description}</p>
                  
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Requirements:</h4>
                    <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                      {selectedJob.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span>Your Application Details</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder="Jane Doe"
                        className="input-field w-full px-3.5 py-2.5 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="jane@example.com"
                        className="input-field w-full px-3.5 py-2.5 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Portfolio or GitHub URL *</label>
                      <input
                        type="url"
                        required
                        value={form.portfolioUrl}
                        onChange={(e) => setForm({ ...form, portfolioUrl: e.target.value })}
                        placeholder="https://github.com/janedoe"
                        className="input-field w-full px-3.5 py-2.5 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">Resume / CV Link *</label>
                      <input
                        type="url"
                        required
                        value={form.resumeUrl}
                        onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
                        placeholder="https://drive.google.com/resume.pdf"
                        className="input-field w-full px-3.5 py-2.5 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Cover Note / Why Join Us?</label>
                    <textarea
                      rows={3}
                      value={form.coverNote}
                      onChange={(e) => setForm({ ...form, coverNote: e.target.value })}
                      placeholder="Tell us about your recent projects and passion..."
                      className="input-field w-full p-3 rounded-xl text-xs resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedJob(null)}
                      className="btn-ghost px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary px-6 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 disabled:opacity-60"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      <span>Submit Application</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
