import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import API from '../services/api';
import {
  Briefcase,
  MapPin,
  ArrowRight,
  X,
  CheckCircle2,
  FileText,
  Send,
  Loader2,
  Globe,
  Laptop,
  HeartHandshake,
  GraduationCap,
  Compass,
  Award,
  Clock,
  ShieldCheck,
  Users,
  Code2
} from 'lucide-react';

const CULTURE_PILLARS = [
  {
    icon: Compass,
    title: 'High-Autonomy, Low-Bureaucracy',
    description:
      'We hire builders who thrive on ownership. Instead of endless status meetings, we work asynchronously with clear written RFCs, rapid prototypes, and direct customer feedback loops.'
  },
  {
    icon: Code2,
    title: 'Obsessive Craftsmanship',
    description:
      'Whether we are shaving 40ms off an edge API response or tuning cubic-bezier spring curves in our visual editor, we care deeply about the details that make software feel magical.'
  },
  {
    icon: Users,
    title: 'Creator-First Empathy',
    description:
      'Many of us are designers, open-source maintainers, and visual artists ourselves. Every feature we ship is designed to help fellow creators land life-changing career opportunities.'
  }
];

const BENEFITS = [
  {
    icon: Award,
    title: 'Top-Tier US Compensation & Equity',
    description:
      'Competitive base salaries benchmarked against San Francisco & New York tech tiers, plus meaningful early-stage equity packages for every full-time team member.'
  },
  {
    icon: Laptop,
    title: '$4,000 Home Studio & Hardware Grant',
    description:
      'Build your dream workspace with a top-spec MacBook Pro or Linux workstation, 4K/5K studio display, ergonomic seating, and high-speed fiber internet reimbursement.'
  },
  {
    icon: HeartHandshake,
    title: 'Comprehensive Health & Wellness',
    description:
      '100% covered medical, dental, and vision insurance for US employees, or an equivalent monthly healthcare & wellness stipend for international team members.'
  },
  {
    icon: GraduationCap,
    title: '$2,500 Annual Learning & Conference Budget',
    description:
      'Expense technical books, design system courses, cloud certifications, or tickets and travel to premier global engineering and design conferences.'
  },
  {
    icon: Clock,
    title: 'Flexible PTO & Mandatory Rest',
    description:
      'Take the time you need to recharge with flexible paid time off, local national holidays, paid parental leave, and company-wide winter recharge weeks.'
  },
  {
    icon: Globe,
    title: 'Biannual Global Team Retreats',
    description:
      'Twice a year, we fly the entire team together to inspiring destinations across North America and Europe for a week of architecture sprints, great food, and connection.'
  }
];

const HIRING_STEPS = [
  {
    step: '01',
    title: 'Application & Portfolio Review',
    description:
      'Share your work, GitHub, or case studies with us. Every application is reviewed directly by an engineering or design lead within 5 business days.'
  },
  {
    step: '02',
    title: '30-Minute Intro & Craft Chat',
    description:
      'A candid conversation with a hiring lead to discuss your past projects, what excites you about creator tools, and how we collaborate at PortfolioCraft.'
  },
  {
    step: '03',
    title: 'Practical Pairing Session',
    description:
      'No whiteboard trick puzzles. You will pair with two team members on a realistic UI architecture or systems design problem similar to our daily work.'
  },
  {
    step: '04',
    title: 'Founder Conversation & Offer',
    description:
      'Meet our co-founders to align on long-term product vision, role impact, and career growth - followed by a transparent, fast-turnaround offer.'
  }
];

const JOBS = [
  {
    id: 'fullstack-dev',
    title: "Senior Full Stack Engineer",
    location: "San Francisco, CA or Remote Worldwide",
    type: "Full-time",
    department: "Engineering",
    compensation: "$165,000 – $195,000 USD + Equity",
    description: "We are looking for an experienced Full Stack Engineer to lead the core layout engine development. You will work on real-time rendering, drag-and-drop state machines, and high-performance canvas systems.",
    requirements: [
      "5+ years experience building modern web applications, APIs, and distributed document stores",
      "Deep understanding of web performance, DOM manipulation, and canvas optimization",
      "Experience building CMS platforms, site builders, or dynamic block editors"
    ]
  },
  {
    id: 'lead-designer',
    title: "Lead UI/UX Designer",
    location: "New York, NY or Remote Worldwide",
    type: "Full-time",
    department: "Design",
    compensation: "$155,000 – $185,000 USD + Equity",
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
    location: "San Francisco, CA or Remote Worldwide",
    type: "Full-time",
    department: "Infrastructure",
    compensation: "$160,000 – $190,000 USD + Equity",
    description: "Help us scale PortfolioCraft to millions of creator pageviews per day with high availability, global CDN caching, and edge serverless architectures.",
    requirements: [
      "Experience with Docker, Kubernetes, AWS, Vercel, and CDN edge networks",
      "Strong background in CI/CD automation, database cluster tuning, and Redis caching",
      "Knowledge of Web Application Firewalls (WAF) and DDoS protection"
    ]
  },
  {
    id: 'solutions-architect',
    title: "Enterprise Solutions Engineer",
    location: "New York, NY or Remote US",
    type: "Full-time",
    department: "Enterprise & Growth",
    compensation: "$145,000 – $175,000 USD + Equity",
    description: "Partner with design agencies, universities, and enterprise engineering organizations to architect custom white-label portfolio deployments, SSO integrations, and bespoke team workflows.",
    requirements: [
      "3+ years in Solutions Engineering, Sales Engineering, or Technical Consulting for SaaS platforms",
      "Familiarity with SAML/OIDC SSO, DNS/custom domain routing, and modern frontend stacks",
      "Exceptional written and verbal communication skills with executive and technical stakeholders"
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
  const [error, setError] = useState('');

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setSubmitted(false);
    setError('');
    setForm({ fullName: '', email: '', portfolioUrl: '', resumeUrl: '', coverNote: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/careers/apply', {
        jobId: selectedJob?.id,
        jobTitle: selectedJob?.title,
        department: selectedJob?.department,
        fullName: form.fullName,
        email: form.email,
        portfolioUrl: form.portfolioUrl,
        resumeUrl: form.resumeUrl,
        coverNote: form.coverNote
      });

      if (res.data.success) {
        setSubmitted(true);
        setAppId(res.data.referenceId || `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`);
      }
    } catch (err) {
      console.error('Career application error:', err);
      setError(err.response?.data?.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-[1440px] mx-auto w-full space-y-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="badge badge-indigo inline-flex mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Careers at PortfolioCraft</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-white mb-6">
            Build the Future of<br />
            <span className="gradient-text">Creator Portfolios</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-4">
            We are a fast-moving, product-obsessed team headquartered in San Francisco with distributed engineers and designers around the globe. Together, we are building the visual publishing engine that powers over 10,000+ creators across 140+ countries.
          </p>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            At PortfolioCraft, we believe software tools should feel inspiring, instantaneous, and deeply respectful of the creator’s craft. If you love solving complex UI architecture challenges and shipping work that directly helps people get hired, you will feel right at home here.
          </p>
        </div>

        <section className="glass gradient-border rounded-3xl p-8 md:p-12 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400">
              <Compass className="w-4 h-4" />
              <span>Our Engineering & Design Culture</span>
            </div>
            <h2 className="font-heading font-black text-2xl md:text-4xl text-white leading-tight">
              Small Senior Teams. Massive Creative Leverage.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              We intentionally keep our teams compact, senior, and cross-functional. Every engineer has a seat at the design table, and every designer understands the underlying component architecture. We ship to production multiple times a day, measure our success by creator outcomes, and protect long stretches of uninterrupted maker time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CULTURE_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.07] space-y-3"
                >
                  <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white">{pillar.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="badge badge-indigo inline-flex mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Perks & Benefits</span>
            </div>
            <h2 className="font-heading font-black text-3xl md:text-4xl text-white mb-3">
              Designed to Support Your Best Work
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We invest heavily in the health, autonomy, and long-term growth of every person on our team - wherever you call home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="glass-card rounded-3xl p-7 border border-white/[0.08] hover:border-indigo-500/30 transition space-y-3"
                >
                  <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white">{benefit.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
                <Briefcase className="w-4 h-4" />
                <span>Open Positions</span>
              </div>
              <h2 className="font-heading font-black text-3xl md:text-4xl text-white">
                Join Our Growing Team
              </h2>
            </div>
            <p className="text-slate-400 text-xs md:text-sm max-w-md">
              All roles are open to candidates in our San Francisco & New York hubs or remote worldwide within overlapping collaboration hours.
            </p>
          </div>

          <div className="space-y-4">
            {JOBS.map((job) => (
              <div key={job.id} className="glass gradient-border rounded-2xl p-6 md:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-indigo-500/40 transition">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-bold uppercase tracking-wider">
                      {job.department}
                    </span>
                    <span className="text-slate-500 text-xs">•</span>
                    <span className="text-xs text-slate-400 font-medium">{job.type}</span>
                    {job.compensation && (
                      <>
                        <span className="text-slate-500 text-xs">•</span>
                        <span className="text-xs text-emerald-400 font-semibold">{job.compensation}</span>
                      </>
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white">{job.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{job.description}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{job.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleOpenModal(job)}
                  className="btn-primary px-6 py-3 rounded-xl text-xs font-bold text-white flex items-center gap-2 shrink-0"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card gradient-border rounded-3xl p-8 md:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-heading font-black text-2xl md:text-4xl text-white mb-3">
              Our Transparent Hiring Process
            </h2>
            <p className="text-slate-400 text-sm">
              We respect your time and energy. No unpaid spec work, no multi-week take-home marathons, and clear feedback at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIRING_STEPS.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.07] space-y-2.5"
              >
                <span className="inline-block px-2.5 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-mono font-black text-xs">
                  STEP {item.step}
                </span>
                <h3 className="font-heading font-bold text-base text-white">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="glass gradient-border rounded-3xl max-w-2xl w-full p-6 md:p-8 relative shadow-2xl my-8">
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
