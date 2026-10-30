import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import {
  Layers,
  MousePointer2,
  Upload,
  ShieldCheck,
  Zap,
  Palette,
  Globe,
  Smartphone,
  BarChart3,
  ArrowRight,
  Cpu,
  Code2,
  CheckCircle2,
  Compass
} from 'lucide-react';

const featureCategories = [
  {
    title: "Visual CMS Editor",
    icon: MousePointer2,
    desc: "Drag, drop, reorder, and customize every section in real time. Our structured visual state machine gives you total layout control without writing a single line of boilerplate code, while preserving clean semantic hierarchy.",
    details: ["Real-time live preview", "Responsive viewport switcher (Desktop, Tablet, Mobile)", "Reorderable section hierarchy"]
  },
  {
    title: "Cloudinary CDN Media Uploads",
    icon: Upload,
    desc: "Upload high-resolution UI mockups, architectural renders, and looping video backgrounds directly into your canvas. Every asset is automatically compressed, converted to modern formats, and served from edge nodes.",
    details: ["Instant asset optimization", "Video & image support", "Fast global CDN delivery"]
  },
  {
    title: "Curated Designer Themes",
    icon: Palette,
    desc: "Crafted by senior design directors. Switch effortlessly between minimalist editorial layouts, dark cyberpunk terminals, or luxury studio themes - and fine-tune six granular CSS color tokens with live canvas feedback.",
    details: ["Dark & Light mode support", "Custom primary & secondary color pickers", "Pre-built typography pairings"]
  },
  {
    title: "Custom Slugs & Instant Publishing",
    icon: Globe,
    desc: "Publish your portfolio to a clean, shareable handle (`/p/username`) in a single click. Switch between draft mode and live production anytime, or manage up to five independent portfolios under one account.",
    details: ["Clean SEO-friendly URLs", "Instant updates with zero downtime", "Multi-portfolio account scaling"]
  },
  {
    title: "100% Mobile Responsive",
    icon: Smartphone,
    desc: "Recruiters and clients review portfolios on everything from 5K studio displays to smartphones on the go. Every section automatically adapts its grid, typography scale, and touch interactions to fit any screen.",
    details: ["Fluid typography scaling", "Touch-friendly carousel navigation", "Built-in device frame simulator"]
  },
  {
    title: "High Conversion Copy & Structure",
    icon: BarChart3,
    desc: "Engineered around how hiring managers and executive clients actually evaluate talent. Highlight measurable KPIs, interactive prototypes, and verified client testimonials in the first fifteen seconds.",
    details: ["Direct lead-routing contact forms", "Client testimonial carousels", "Structured experience timelines"]
  }
];

const disciplineNarratives = [
  {
    role: 'Product Designers & Creative Directors',
    summary:
      'Present end-to-end design systems, interactive Figma prototypes, and high-resolution visual galleries without fighting rigid grid templates.',
    body:
      'Traditional website builders flatten complex design work into static thumbnails. PortfolioCraft lets you embed live interactive Figma canvases, pair visual explorations with structured problem-solution narratives, and customize every surface color token so your portfolio itself serves as proof of your visual taste.'
  },
  {
    role: 'Full-Stack, Cloud & AI Engineers',
    summary:
      'Go beyond a plain GitHub profile by combining architectural timelines, live deployment links, and quantified system performance metrics.',
    body:
      'Hiring managers want to understand the scale and business impact of the code you ship. With our categorized Skills Cloud, Experience Timeline, and Data Metrics components, you can clearly articulate latency reductions, throughput gains, and production architecture alongside links to your repositories and live demos.'
  },
  {
    role: 'Boutique Studios, Agencies & Consultants',
    summary:
      'Run multiple specialized showcases under a single Studio account with white-label branding, custom color palettes, and direct inquiry routing.',
    body:
      'When pitching high-ticket retainers, generic agency decks fall flat. Our Studio tier enables you to spin up tailored portfolio microsites for different industry verticals, remove all platform watermarks, embed cinematic looping video headers, and capture client leads directly into your team inbox.'
  }
];

export default function Features() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-6xl mx-auto w-full space-y-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="badge badge-indigo inline-flex mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Platform Architecture & Features</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-white mb-6">
            Built for Creators Who<br />
            <span className="gradient-text">Demand Perfection</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-4">
            Everything you need to showcase your finest work, attract premier clients, and land top-tier opportunities, engineered into one cohesive, high-speed visual publishing platform.
          </p>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Most creators are forced to choose between spending weeks coding a custom portfolio from scratch or settling for generic drag and drop website builders that look cluttered and load slowly. PortfolioCraft eliminates that trade-off by combining a structured, zero-code CMS with the visual polish of an award-winning digital design studio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureCategories.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="glass-card gradient-border rounded-3xl p-8 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{item.desc}</p>
              </div>
              <ul className="space-y-2 border-t border-white/[0.06] pt-4">
                {item.details.map((detail, dIdx) => (
                  <li key={dIdx} className="text-xs text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <section className="glass gradient-border rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400">
              <Cpu className="w-4 h-4" />
              <span>Real-Time Visual State Engine</span>
            </div>
            <h2 className="font-heading font-black text-2xl md:text-4xl text-white leading-tight">
              Design Once. Switch Templates & Color Tokens Non-Destructively.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              At the core of PortfolioCraft is a decoupled content-and-presentation architecture. Unlike traditional page builders where changing your theme breaks your layout and forces you to rebuild every page from scratch, PortfolioCraft stores your projects, experience timeline, skills, and media in a clean, structured schema.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              This means you can switch instantaneously between 10 industry-specialized templates - from <strong className="text-slate-200">Minimalist Editorial</strong> and <strong className="text-slate-200">Dark Mode Cyber</strong> to <strong className="text-slate-200">Fintech SaaS Pro</strong> and <strong className="text-slate-200">Global Agency Studio</strong> - while your underlying content adapts automatically to the new typographic hierarchy and grid system.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                '6 granular CSS color tokens with 1-click presets',
                'Interactive Desktop, Tablet & Mobile viewport frames',
                'Live section visibility toggles & instant reordering',
                'Interactive Figma, YouTube & 3D Spline embeds'
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                <Code2 className="w-4 h-4" />
                <span>Zero-Bloat Production Output</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-white">
                Engineered for Instant First-Contentful Paint
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every published portfolio compiles down to lightweight React components styled with native CSS custom properties and hardware-accelerated motion. There are no heavy third-party tracking scripts or bloated iframe wrappers slowing down your page when a recruiter clicks your link.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Privacy-First Lead Capture</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-white">
                Built-In Inquiry Routing & Analytics
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your portfolio includes a dedicated contact engine that routes recruiter messages and client project briefs straight to your personal dashboard, without exposing your private email address to automated web scrapers.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">
              <Compass className="w-4 h-4" />
              <span>Built for Your Discipline</span>
            </div>
            <h2 className="font-heading font-black text-3xl md:text-4xl text-white mb-4">
              How Different Creators Use PortfolioCraft
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Whether you are shipping distributed backend systems, leading brand identity overhauls, or scaling a boutique design agency, our modular section library adapts to tell your story with authority.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {disciplineNarratives.map((item, idx) => (
              <div
                key={idx}
                className="glass-card rounded-3xl p-7 border border-white/[0.08] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-bold text-xs">
                    0{idx + 1}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-white">
                    {item.role}
                  </h3>
                  <p className="text-slate-200 text-xs font-semibold leading-relaxed">
                    {item.summary}
                  </p>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="glass gradient-border rounded-[2rem] p-12 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-heading font-black text-3xl md:text-4xl text-white mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="text-slate-400 text-base mb-8">
              Start building your portfolio for free in less than 5 minutes. No credit card required.
            </p>
            <Link
              to="/register"
              className="btn-primary inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-white font-bold text-base"
            >
              <span>Build Free Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
