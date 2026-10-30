import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import API from '../services/api';
import {
  BookOpen,
  Clock,
  ArrowRight,
  X,
  Calendar,
  CheckCircle2,
  Share2,
  Bookmark,
  Check,
  Copy,
  ExternalLink,
  Award,
  Layers,
  Lightbulb,
  BarChart3,
  Code2,
  ShieldCheck,
  Zap,
  Mail,
  Loader2
} from 'lucide-react';

const STORAGE_KEY = 'portfoliocraft_bookmarked_blogs';

const posts = [
  {
    id: 'product-design-structure',
    title: 'How to Structure a Product Design Portfolio That Gets You Hired at Tech Unicorns',
    category: 'Career & Portfolio Strategy',
    date: 'July 20, 2026',
    author: 'Alex Morgan',
    authorRole: 'Staff Product Designer & Hiring Committee Lead',
    authorAvatar:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    readTime: '14 min read',
    level: 'Advanced Career Playbook',
    audience: 'Product Designers, UX Leads & Design Systems Architects',
    image:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    excerpt:
      'Learn the exact section hierarchy, narrative frameworks, and metric positioning top 1% candidates use to land staff and principal roles at Airbnb, Figma, Linear, and Stripe.',
    overview:
      'Hiring committees at high-growth technology companies evaluate portfolios in two distinct passes: a 45-second asynchronous triage scan by a design recruiter or hiring manager, followed by a 30-minute deep-dive presentation during the onsite loop. Most portfolios fail because they are written like chronological diaries ("First we did sticky notes, then we made wireframes") rather than executive product narratives.\n\nIn this comprehensive masterclass, we break down the exact architectural blueprint used by Senior, Staff, and Principal designers who consistently receive multiple competing offers.',
    beforeAfter: {
      weak: '"I redesigned the mobile onboarding flow and conducted 5 usability tests to make the interface cleaner and easier to navigate."',
      strong: '"Re-architected the 4-step KYC onboarding funnel for 200K+ mobile users, eliminating 6 redundant form fields and lifting Day-1 activation from 48% to 79% (+$4.2M annualized ARR)."'
    },
    content: [
      {
        heading: '1. The First 5 Seconds: The Above-the-Fold Value Thesis',
        text: "Design VPs and hiring managers review 40 to 70 portfolios per open requisition. If your hero banner doesn't immediately communicate who you are, what problem domain you specialize in, and the scale of impact you deliver, over 75% of reviewers will close the tab before scrolling to your first project.\n\nAvoid generic filler statements like 'Passionate UX thinker crafting delightful human-centered experiences.' Instead, anchor your hero banner around a concrete 3-part formula: [Role & Seniority] + [Core Domain / Technical Specialty] + [Proof of Scale or Outcome].\n\nFor example: 'Senior Product Designer specializing in high-frequency B2B fintech workflows, multi-brand Figma token systems, and zero-to-one AI tooling - previously shipping products used by 3.2M daily active users.' Pair this headline with immediate quick-jump links to your 3 flagship case studies and a visible availability badge."
      },
      {
        heading: '2. The 4-Act Case Study Architecture That Wins Onsite Loops',
        text: "A high-converting case study is not an exhaustive archive of every sticky note and wireframe you produced. It is an executive narrative of decision-making under real business and engineering constraints. Structure each of your 3 flagship case studies into four scannable acts:\n\n• Act I - Executive Context & The High-Stakes Problem: Open with a metadata bar (Client, Role, Timeline, Squad Size) and a 4-card KPI outcome strip at the very top. Do not hide the results at the bottom! State clearly what was broken in the legacy product and why the business prioritized fixing it.\n• Act II - Discovery, Telemetry & Key Insights: Share the 2 or 3 sharpest insights uncovered from product analytics (Mixpanel/Amplitude drop-off funnels) and user shadowing. Show how data invalidated your team's initial assumptions.\n• Act III - Explorations, Trade-offs & System Architecture: Hiring managers at Stripe and Figma look specifically for how you navigate trade-offs. Show Option A and Option B that you rejected, explain the technical or usability constraints that led you to Option C, and highlight how your solution scaled across the design system.\n• Act IV - Production Polish, Edge Cases & Measured Impact: Showcase high-resolution dark/light UI states, loading skeletons, error recovery states, and the post-launch metrics validated via A/B testing."
      },
      {
        heading: '3. Quantifying Design Impact When You Lack Direct Revenue Numbers',
        text: "One of the most common questions designers ask is: 'How do I show metrics if my project hasn't launched yet or if my company doesn't share revenue figures?' Top candidates use four tiers of quantitative and qualitative proof:\n\n1. Task Efficiency & Ergonomic Metrics: Measure time-on-task and interaction cost before and after your redesign (e.g., 'Reduced multi-leg order execution from 14 clicks and 42 seconds down to 3 clicks and 6.5 seconds').\n2. Funnel & Adoption Telemetry: Track activation rate, feature discovery percentage, 30-day retention, or reduction in customer support tickets (e.g., 'Cut password-reset support tickets by 64% within 30 days of launch').\n3. Design System Velocity: If you built component libraries, measure engineering adoption and design-to-dev handoff speed (e.g., '120 tokenized components adopted across 6 product squads, reducing UI QA bugs by 48%').\n4. Validated Prototype Benchmarks: For pre-launch products, run Maze or moderated benchmark studies with 15 target users and report the task completion success rate and System Usability Scale (SUS) score."
      },
      {
        heading: '4. Showcasing Systems Thinking & Cross-Functional Leadership',
        text: "What separates a mid-level UI designer from a Staff Product Designer is scope of influence. Unicorn hiring committees want evidence that you don't work in a silo. Dedicate a section of each case study to how you partnered with Product Management, Frontend Engineering, and Data Science.\n\nInclude artifacts such as your Figma token taxonomy (`--theme-surface`, `--theme-primary`), state-machine diagrams for complex async flows, and redline accessibility specs (WCAG AA/AAA contrast ratios and keyboard focus order). Showing that you understand React component props, CSS grid constraints, and API latency states immediately earns the respect of engineering interviewers."
      },
      {
        heading: '5. Visual Pacing, Captioning & Scannability Rules',
        text: "Never place three long paragraphs of text in a row without a visual anchor, and never drop a massive screenshot without a descriptive caption. Every image in your case study should have a concise caption explaining what the viewer is looking at and why it matters.\n\nUse a 2-column comparison layout ('The Legacy Bottleneck' in rose vs. 'The Re-Architected Solution' in emerald) so a busy VP of Design who only skims headings, KPI cards, and image captions still absorbs 90% of your story in under 60 seconds."
      },
      {
        heading: '6. Frictionless Conversion Hooks & Recruiter Ergonomics',
        text: "Once a hiring manager is impressed by your case study, make reaching out effortless. Include a one-click 'Copy Email' button, your current city and timezone, your target role/advisory availability, and a direct inquiry form at the bottom of your portfolio. Never hide your contact details behind a downloadable PDF resume."
      }
    ],
    takeaways: [
      'Place a 4-card KPI outcome strip at the very top of every case study - never bury results at the bottom.',
      'Write a sharp 5-second Hero value thesis combining your seniority, domain specialty, and proof of scale.',
      'Document at least two design trade-offs (rejected concepts and why they failed) in every flagship project.',
      'Quantify impact using task completion speed, support ticket reduction, or design system adoption when revenue metrics are private.',
      'Include real production states: empty states, error recovery, mobile breakpoints, and design token architecture.',
      'Provide a one-click copyable email address, timezone, and direct contact form on your portfolio.'
    ]
  },
  {
    id: 'copywriting-mistakes',
    title: '10 Portfolio Copywriting Mistakes That Are Costing You Inbound Clients',
    category: 'Copywriting & Positioning',
    date: 'July 18, 2026',
    author: 'Marcus Vance',
    authorRole: 'Principal Cloud Architect & Technical Advisor',
    authorAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    readTime: '12 min read',
    level: 'Client Acquisition & Positioning',
    audience: 'Full Stack Engineers, Freelancers, Consultants & Studio Founders',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    excerpt:
      'Stop listing raw tech frameworks without business context. Learn how positioning your engineering and creative work around client ROI turns passive visitors into high-paying inbound retainers.',
    overview:
      'Most developers and independent creators treat their portfolio copy as an afterthought - slapping together a list of programming languages ("React, Node.js, Docker, PostgreSQL") and a few GitHub links. Yet when founders, CTOs, and agency directors look to hire a $150–$250/hr consultant or a senior engineer, they aren’t buying syntax; they are buying risk reduction, speed to market, and revenue growth.\n\nIn this deep-dive guide, we dissect the biggest copywriting pitfalls that commoditize your talent and show you word-for-word how to rewrite your portfolio for high-ticket inbound conversion.',
    beforeAfter: {
      weak: '"Full Stack Developer experienced in React, Node.js, Express, and MongoDB. Check out my e-commerce app and chat app below."',
      strong: '"Principal Full Stack & Cloud Architect helping Series A–C SaaS companies eliminate API bottlenecks, scale WebSocket infrastructure to 100K+ concurrent users, and cut AWS spend by 35%."'
    },
    content: [
      {
        heading: '1. The "Framework Laundry List" Trap (Commoditizing Yourself)',
        text: "When your headline says 'React, TypeScript, Node.js, and AWS Developer,' you immediately place yourself in direct price competition with 500,000 other developers listing the exact same keywords. Clients and CTOs only care about tools insofar as those tools solve an expensive business bottleneck.\n\nReframe every technical skill around the capability it unlocks. Instead of 'Kubernetes & Terraform,' write 'Zero-Downtime Multi-Region Cloud Orchestration (Kubernetes & Terraform).' Instead of 'PostgreSQL & Redis,' write 'Sub-20ms High-Throughput Data & Caching Pipelines.' Lead with the business outcome, and let the framework names serve as supporting technical proof."
      },
      {
        heading: '2. Weak, Apologetic or Junior-Sounding Bio Openers',
        text: "Phrases like 'Aspiring software engineer passionate about learning new technologies' or 'I love turning coffee into code' signal inexperience and low authority. Even mid-level engineers accidentally undersell themselves by writing passive bios.\n\nReplace passive biographies with an authoritative executive summary: state your years of production experience, the types of systems or brands you have architected, your reliability benchmarks (e.g., '99.99% uptime across 50M+ daily events'), and the exact engagements you are currently accepting."
      },
      {
        heading: '3. Describing Features Instead of the Expensive Problem You Solved',
        text: "Look at how most project cards are written: 'Built a real-time analytics dashboard using Next.js, Tailwind, and ClickHouse with authentication and charts.' That describes what the software is, not why it mattered.\n\nRewrite every project summary using the Problem → Architecture → Quantified Result triad:\n• The Expensive Problem: 'Engineering squads were losing 6+ hours per week grepping unstructured CI/CD logs during failed microservice deployments.'\n• The Architecture: 'Engineered a lock-free Rust/Go CLI collector and ClickHouse columnar ingestion pipeline with interactive flamegraphs.'\n• The Quantified Result: 'Indexed 50M+ daily log events with 75ms query latency, accelerating incident triage by 3.4x and replacing a $14k/mo vendor.'"
      },
      {
        heading: '4. Hiding Technical Depth Behind Vague Marketing Buzzwords',
        text: "While business context hooks decision-makers, senior technical reviewers still need proof of engineering rigor. Avoid hollow adjectives like 'blazingly fast,' 'super scalable,' or 'modern architecture.'\n\nReplace every adjective with a verifiable number or architectural mechanism: instead of 'blazingly fast,' write 'P99 API latency under 18ms via Redis Streams and LZ4 binary Protobuf framing.' Concrete specifics build instant credibility with both non-technical founders and staff engineers."
      },
      {
        heading: '5. Missing Social Proof & Contextual Client Testimonials',
        text: "A single 2-sentence quote from a former VP of Engineering, CTO, or Founder next to your project case study carries ten times more persuasive weight than anything you write about yourself.\n\nDon't quarantine testimonials on a separate page nobody clicks. Embed a specific quote directly inside each project case study validating the exact metric or turnaround time you delivered (e.g., 'Marcus eliminated our DevOps provisioning backlog while cutting our AWS bill by $26,000 a month')."
      },
      {
        heading: '6. Vague Calls-to-Action ("Contact Me") vs. Scoped Engagement CTAs',
        text: "Ending your portfolio with a bland 'Feel free to reach out if you want to chat' creates decision friction. Prospective clients don't know if you're available, what types of projects you take on, or how fast you reply.\n\nInclude an explicit Availability & Engagement card above your contact form: state your current booking window (e.g., 'Accepting Q4 Architecture Sprints & Advisory Retainers'), your typical response time ('Usually responds within 4 hours'), and a project scope selector right inside the inquiry form."
      }
    ],
    takeaways: [
      'Never lead with a raw list of frameworks - pair every technology with the business capability it delivers.',
      'Rewrite every project summary using the Problem → Architecture → Quantified Result formula.',
      'Replace vague adjectives ("fast", "scalable") with verifiable engineering metrics (<18ms P99 latency, 99.99% SLA).',
      'Embed a client or engineering leader testimonial directly inside each flagship case study.',
      'Display live availability status, typical response time, and engagement scope options in your Contact section.',
      'Eliminate passive or cliché bio phrases in favor of concrete production authority.'
    ]
  },
  {
    id: 'dark-mode-glassmorphism',
    title: 'Why Modern Dark Mode & Glassmorphism Win Attention in 2026',
    category: 'Design Systems & Aesthetics',
    date: 'June 30, 2026',
    author: 'Elena Rostova',
    authorRole: 'Executive Creative Director & Awwwards Jury Member',
    authorAvatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    readTime: '13 min read',
    level: 'Design Systems & Visual Direction',
    audience: 'Creative Directors, UI Engineers & Brand Designers',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    excerpt:
      'A comprehensive masterclass in dark-mode luminance hierarchy, optical backdrop-filter glassmorphism, CSS custom property architecture, and 60fps micro-interaction choreography.',
    overview:
      'When an art director, founder, or recruiter lands on your portfolio, they form a subconscious judgment about your craft quality within 50 milliseconds - long before they read a single word of copy. In 2026, atmospheric dark-mode interfaces paired with subtle optical glassmorphism and fluid micro-interactions have become the gold standard for developer tools, AI platforms, and luxury digital flagships.\n\nIn this visual engineering guide, we explore the exact color science, elevation tokens, border shaders, and typographic contrast rules that make dark interfaces feel tactile, luminous, and effortless to read.',
    beforeAfter: {
      weak: 'Pure #000000 black backgrounds with harsh #FFFFFF borders, muddy drop shadows, and unreadable low-contrast gray body text.',
      strong: 'Layered obsidian-slate canvas tokens (#050811 → #111827), 1px specular gradient borders (rgba(255,255,255,0.08)), radial ambient light blooms, and WCAG AAA typographic hierarchy.'
    },
    content: [
      {
        heading: '1. The Color Science of Atmospheric Dark Mode (Why Pure Black Fails)',
        text: "Amateur dark mode designs use pure hex black (`#000000`) as their primary background and pure white (`#FFFFFF`) for body copy. On modern OLED and Mini-LED displays, this creates extreme halation (visual vibration where white text bleeds into black pixels) and destroys depth perception because nothing can be darker than a `#000000` shadow.\n\nInstead, build a 3-tier luminance elevation hierarchy infused with a subtle cool indigo, emerald, or rose undertone:\n• Canvas Base (`--theme-bg`): Deep obsidian slate (`#050811` or `#09090b`) that absorbs glare.\n• Elevated Surface Card (`--theme-surface`): Rich midnight (`#111827` or `rgba(255, 255, 255, 0.03)`) for project cards and interactive containers.\n• Floating Modal / Popover Layer: Higher-luminance translucent glass (`rgba(15, 23, 42, 0.88)`) paired with `backdrop-filter: blur(20px)`. In dark mode, closer surfaces are lighter, not darker."
      },
      {
        heading: '2. Engineering Optical Glassmorphism & Specular 1px Borders',
        text: "True glassmorphism is not just cranking up CSS blur. Without edge definition, translucent cards blend into background gradients and lose structural clarity. The secret used by Apple VisionOS, Linear, and Stripe is the **1px Specular Highlight Border**.\n\nIn physical optics, light catches the top and left edges of a glass pane. Replicate this by pairing `backdrop-filter: blur(16px) saturate(180%)` with a subtle `1px solid rgba(255, 255, 255, 0.08)` border and a linear gradient mask that transitions from `rgba(99, 102, 241, 0.35)` at the top-left corner down to `rgba(255, 255, 255, 0.03)` at the bottom-right. This creates an unmistakable jewel-like edge that frames your project imagery."
      },
      {
        heading: '3. Ambient Radial Light Blooms & Chromatic Framing',
        text: "Why do high-end portfolios feel 'alive' while standard templates feel flat? The answer is ambient environmental lighting. By placing two large, low-opacity radial blurs (`width: 500px; filter: blur(140px); opacity: 0.20`) using your `--theme-primary` and `--theme-secondary` colors behind your hero and project sections, your translucent glass cards naturally pick up subtle color refractions as the user scrolls.\n\nWhen showcasing product screenshots inside dark cards, frame them with a `1px` inner border (`border-white/10`) and a soft bottom gradient vignette so bright UI screenshots integrate harmoniously into the dark canvas."
      },
      {
        heading: '4. Typographic Hierarchy & High-Contrast Pill Badges',
        text: "Expressive typography is the backbone of editorial authority. Pair a geometric high-impact display font (such as Cabinet Grotesk, Space Grotesk, or Syne) at tight tracking (`-0.03em`) and heavy weights (`800–900`) for headlines with a highly legible humanist sans-serif (`Plus Jakarta Sans` or `Inter`) for long-form case studies, and a crisp monospace (`JetBrains Mono`) for metrics, dates, and code tags.\n\nCrucial accessibility rule: when placing category badges over project cover photos, never use low-opacity light backgrounds. Always anchor image overlay badges with a solid high-contrast dark backdrop (`bg-slate-950/90 backdrop-blur-md border border-white/15`) so the label remains 100% legible over both bright and dark photography."
      },
      {
        heading: '5. Live CSS Custom Property Token Architecture',
        text: "A modern portfolio should never hardcode hex values across dozens of components. By binding your entire visual system to six root CSS custom properties (`--theme-primary`, `--theme-secondary`, `--theme-bg`, `--theme-surface`, `--theme-text`, and `--theme-muted`), you can switch your entire portfolio from *Midnight Indigo* to *Cyber Emerald*, *Sunset Rose*, or even *Clean Alabaster Light* in a single click while preserving every contrast ratio."
      },
      {
        heading: '6. Choreographing 60fps Micro-Interactions Without Layout Shift',
        text: "Motion should guide attention, never delay the user. Restrict hover and scroll animations to GPU-composited properties (`transform` and `opacity`). Use subtle spring physics (`stiffness: 300, damping: 24`) for modal entrances, gentle `scale(1.04)` image zooms on project cards, and instant visual feedback on copy and bookmark actions."
      }
    ],
    takeaways: [
      'Avoid pure #000000 black - use a 3-tier obsidian-to-slate elevation scale (#050811 → #111827 → translucent glass).',
      'Define glassmorphic containers with 1px specular borders (rgba(255,255,255,0.08)) and subtle gradient highlights.',
      'Use ambient radial light blurs (blur(140px) at 15–25% opacity) to give translucent cards realistic depth.',
      'Ensure badges over cover images use a solid high-contrast backdrop (bg-slate-950/90) for guaranteed WCAG legibility.',
      'Architect your theme around 6 semantic CSS variables (--theme-primary through --theme-muted) for instant palette switching.',
      'Animate only GPU-accelerated transform and opacity properties to maintain locked 60fps scrolling.'
    ]
  }
];

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPost, setSelectedPost] = useState(null);
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'saved'
  const [shareMenuPostId, setShareMenuPostId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState(null);

  const handleNewsletterSubscribe = async (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterLoading(true);
    setNewsletterStatus(null);
    try {
      const res = await API.post('/newsletter/subscribe', { email: newsletterEmail.trim() });
      setNewsletterStatus({
        type: 'success',
        text: res.data?.message || 'Subscribed successfully! Check your inbox for our welcome email.'
      });
      setNewsletterEmail('');
      triggerToast('Subscribed to the PortfolioCraft Newsletter!');
    } catch (err) {
      setNewsletterStatus({
        type: 'error',
        text: err.response?.data?.message || 'Unable to subscribe right now. Please try again.'
      });
    } finally {
      setNewsletterLoading(false);
    }
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2600);
  };

  // Support deep-linking via ?post=<id>
  useEffect(() => {
    const postId = searchParams.get('post');
    if (postId) {
      const match = posts.find((p) => p.id === postId);
      if (match) {
        setSelectedPost(match);
      }
    }
  }, [searchParams]);

  const handleOpenPost = (post) => {
    setSelectedPost(post);
    setShareMenuPostId(null);
    setSearchParams({ post: post.id }, { replace: true });
  };

  const handleClosePost = () => {
    setSelectedPost(null);
    setShareMenuPostId(null);
    if (searchParams.has('post')) {
      searchParams.delete('post');
      setSearchParams(searchParams, { replace: true });
    }
  };

  const toggleBookmark = (e, postId) => {
    if (e) e.stopPropagation();
    setBookmarks((prev) => {
      const exists = prev.includes(postId);
      const updated = exists ? prev.filter((id) => id !== postId) : [...prev, postId];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      triggerToast(exists ? 'Removed from Saved Bookmarks' : 'Saved to your Bookmarks!');
      return updated;
    });
  };

  const getPostShareUrl = (post) => {
    return `${window.location.origin}/blog?post=${post.id}`;
  };

  const handleShareClick = async (e, post) => {
    if (e) e.stopPropagation();
    const url = getPostShareUrl(post);

    try {
      await navigator.clipboard.writeText(url);
      triggerToast('Article link copied to clipboard!');
    } catch {
      // Fallback
    }

    setShareMenuPostId((prev) => (prev === post.id ? null : post.id));
  };

  const handleSocialShare = (e, platform, post) => {
    if (e) e.stopPropagation();
    const url = encodeURIComponent(getPostShareUrl(post));
    const text = encodeURIComponent(`${post.title} - via PortfolioCraft`);

    if (platform === 'twitter') {
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        '_blank',
        'noopener,noreferrer'
      );
    } else if (platform === 'linkedin') {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        '_blank',
        'noopener,noreferrer'
      );
    } else if (platform === 'native' && navigator.share) {
      navigator
        .share({
          title: post.title,
          text: post.excerpt,
          url: getPostShareUrl(post)
        })
        .catch(() => {});
    }
    setShareMenuPostId(null);
  };

  const displayedPosts =
    filterMode === 'saved' ? posts.filter((p) => bookmarks.includes(p.id)) : posts;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed top-24 right-6 z-[70] px-4 py-3 rounded-2xl glass-dark border border-indigo-500/40 text-white text-xs font-bold shadow-2xl flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-[1440px] mx-auto w-full">
        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="badge badge-indigo inline-flex mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Masterclass Guides & Insights</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-white mb-6 leading-tight">
            The PortfolioCraft<br />
            <span className="gradient-text">Blog & Guides</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed text-center max-w-2xl mx-auto">
            In-depth masterclasses on portfolio architecture, career positioning, and design systems to help you stand out.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              filterMode === 'all'
                ? 'btn-primary text-white shadow-lg'
                : 'glass text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>All Articles ({posts.length})</span>
          </button>
          <button
            onClick={() => setFilterMode('saved')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              filterMode === 'saved'
                ? 'btn-primary text-white shadow-lg'
                : 'glass text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${
                bookmarks.length > 0 ? 'fill-amber-400 text-amber-400' : ''
              }`}
            />
            <span>Saved Bookmarks ({bookmarks.length})</span>
          </button>
          <a
            href="#blog-newsletter"
            className="px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 glass border border-indigo-500/40 text-indigo-300 hover:text-white hover:bg-indigo-500/20"
          >
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            <span>Subscribe to Newsletter</span>
          </a>
        </div>

        {displayedPosts.length === 0 ? (
          <div className="glass gradient-border rounded-3xl p-12 text-center max-w-lg mx-auto mb-20">
            <Bookmark className="w-10 h-10 text-indigo-400 mx-auto mb-3 opacity-80" />
            <h3 className="font-heading font-bold text-xl text-white mb-2">
              No Saved Bookmarks Yet
            </h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Click the Bookmark icon on any masterclass article card or inside the article reader to save it here for quick reading later.
            </p>
            <button
              onClick={() => setFilterMode('all')}
              className="btn-primary px-6 py-2.5 rounded-xl text-xs font-bold text-white"
            >
              Browse All Articles
            </button>
          </div>
        ) : (
          /* 3 Full Readable Articles Cards (Only the button opens the article) */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {displayedPosts.map((post) => {
              const isBookmarked = bookmarks.includes(post.id);
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card gradient-border rounded-3xl overflow-hidden flex flex-col justify-between group relative"
                >
                  <div>
                    <div className="h-52 overflow-hidden relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700"
                      />

                      <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-slate-950/95 border border-indigo-500/50 text-indigo-300 font-bold text-xs shadow-2xl backdrop-blur-md flex items-center gap-1.5">
                        <BookOpen className="w-3 h-3 text-indigo-400" />
                        <span>{post.category}</span>
                      </div>

                      <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => toggleBookmark(e, post.id)}
                          className={`p-2 rounded-xl backdrop-blur-md border transition cursor-pointer ${
                            isBookmarked
                              ? 'bg-amber-500/20 border-amber-400/50 text-amber-400'
                              : 'bg-slate-950/85 border-white/15 text-slate-300 hover:text-white'
                          }`}
                          title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Article'}
                        >
                          <Bookmark
                            className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleShareClick(e, post)}
                          className="p-2 rounded-xl bg-slate-950/85 border border-white/15 text-slate-300 hover:text-white backdrop-blur-md transition cursor-pointer"
                          title="Copy & Share Article Link"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-slate-300 font-medium mb-3">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{post.date}</span>
                        <span className="text-slate-500">•</span>
                        <Clock className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="font-heading font-bold text-xl text-white mb-3 leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-slate-300 text-xs leading-relaxed mb-4">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-[11px] text-slate-400">
                        <span className="flex items-center gap-1.5 font-semibold text-indigo-300">
                          <Layers className="w-3.5 h-3.5" />
                        </span>
                        <span>By {post.author}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      type="button"
                      onClick={() => handleOpenPost(post)}
                      className="btn-primary w-full py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Read In-Depth Masterclass</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
        <section className="mt-24 pt-20 border-t border-white/[0.07]">
          <div className="max-w-4xl mx-auto text-center mb-14">
            <div className="badge badge-indigo inline-flex mb-3">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Editorial Philosophy</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white mb-5">
              Why We Write <span className="gradient-text">Exhaustive Masterclasses</span>
            </h2>
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed text-center max-w-3xl mx-auto">
              <p>
                The internet is saturated with generic career advice: "keep it brief," "use bright colors," or "add a creative tagline." Yet when senior practitioners apply to Staff-level engineering roles, Principal Product Design positions, or pitch five-figure consulting retainers, those superficial tips fall flat. Executive hiring committees evaluate candidates on systems thinking, commercial literacy, and the ability to articulate trade-offs under real-world constraints.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm">
                Every guide published in the PortfolioCraft masterclass series is authored by active industry practitioners who have sat on hiring panels at unicorn technology firms and tier-one design agencies. We write long-form, deeply technical playbooks because career-defining outcomes are never won through shortcuts; they are earned by mastering the architecture of proof.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="glass-card gradient-border rounded-3xl p-7 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white">
                Pillar 01: Narrative & KPI Framing
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Learn how to structure case studies around the 4-act executive arc: Context & Problem, Discovery & Telemetry, Explorations & Trade-Offs, and Quantified Business Impact.
              </p>
              <p className="text-slate-400 text-xs leading-relaxed">
                By presenting quantifiable telemetry - such as activation lift, latency reductions, or customer support savings - your case studies prove real business returns rather than decorative aesthetics.
              </p>
            </div>

            <div className="glass-card gradient-border rounded-3xl p-7 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white">
                Pillar 02: Positioning & Inbound Conversion
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Stop listing raw programming languages without business context. Learn how reframing your technical skills around risk reduction and commercial speed attracts high-ticket inbound clients.
              </p>
              <p className="text-slate-400 text-xs leading-relaxed">
                Discover how displaying clear booking windows, expected response times, and structured inquiry forms directly inside your portfolio eliminates friction for busy hiring managers and founders.
              </p>
            </div>

            <div className="glass-card gradient-border rounded-3xl p-7 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white">
                Pillar 03: Visual Optics & Design Tokens
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Master the optical physics of modern dark mode: 3-tier elevation hierarchies, specular 1px borders, ambient radial light blooms, and fluid 60fps micro-interaction choreography.
              </p>
              <p className="text-slate-400 text-xs leading-relaxed">
                Understand how a unified 6-token CSS architecture empowers you to switch entire palettes while strictly maintaining WCAG AAA contrast and instant cross-device responsiveness.
              </p>
            </div>
          </div>

          <div className="glass rounded-3xl p-8 sm:p-12 border border-white/[0.08] max-w-4xl mx-auto space-y-5 text-left">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-indigo-400" />
              <h3 className="font-heading font-black text-2xl text-white">
                The PortfolioCraft Peer-Review Standard
              </h3>
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Before any masterclass is published on our platform, it undergoes a multi-stage review process by our Practitioner Advisory Board. We verify that every formula, case study structure, and code example has been tested in real interview loops or validated in production environments.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              We reject sponsored product placements, superficial listicles, and unsubstantiated claims. Our singular benchmark is utility: whether reading a guide directly equips a creator to communicate their value with greater precision, negotiate higher compensation, and land career-defining opportunities.
            </p>
          </div>

          {/* Newsletter Subscription Section */}
          <div
            id="blog-newsletter"
            className="mt-16 glass-card gradient-border rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto text-center relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-black text-2xl sm:text-4xl text-white mb-3">
              Subscribe to Weekly <span className="gradient-text">Masterclasses & Tips</span>
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-7 leading-relaxed">
              Get new executive portfolio playbooks, case study breakdowns, and hiring manager insights delivered straight to your inbox.
            </p>

            <form
              onSubmit={handleNewsletterSubscribe}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
            >
              <div className="relative w-full">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="input-field w-full pl-11 pr-4 py-3.5 rounded-xl text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={newsletterLoading}
                className="btn-primary w-full sm:w-auto px-6 py-3.5 rounded-xl text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-60 shadow-lg"
              >
                {newsletterLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Mail className="w-4 h-4" />
                )}
                <span>Subscribe to Newsletter</span>
              </button>
            </form>

            {newsletterStatus && (
              <div
                className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border ${
                  newsletterStatus.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-red-500/10 border-red-500/30 text-red-300'
                }`}
              >
                {newsletterStatus.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                <span>{newsletterStatus.text}</span>
              </div>
            )}
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-6 overflow-y-auto"
            onClick={handleClosePost}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="glass gradient-border rounded-3xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto p-6 md:p-12 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClosePost}
                className="absolute top-6 right-6 p-2.5 rounded-2xl glass text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-bold text-xs">
                  {selectedPost.category}
                </span>
                {selectedPost.level && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    <span>{selectedPost.level}</span>
                  </span>
                )}
                <span className="text-xs text-slate-400 font-medium">{selectedPost.date}</span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-400 font-medium">{selectedPost.readTime}</span>
              </div>

              <h1 className="font-heading font-black text-3xl md:text-5xl text-white leading-tight mb-6">
                {selectedPost.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/[0.08] relative">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedPost.authorAvatar}
                    alt={selectedPost.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
                  />
                  <div>
                    <div className="font-bold text-white text-base">{selectedPost.author}</div>
                    <div className="text-xs text-indigo-400 font-semibold">
                      {selectedPost.authorRole}
                    </div>
                    {selectedPost.audience && (
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Target Audience: {selectedPost.audience}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 relative">
                  <button
                    onClick={(e) => toggleBookmark(e, selectedPost.id)}
                    className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition ${
                      bookmarks.includes(selectedPost.id)
                        ? 'bg-amber-500/15 border-amber-400/50 text-amber-300'
                        : 'glass border-white/10 text-slate-300 hover:text-white'
                    }`}
                    title={
                      bookmarks.includes(selectedPost.id)
                        ? 'Remove from Bookmarks'
                        : 'Save to Bookmarks'
                    }
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        bookmarks.includes(selectedPost.id) ? 'fill-amber-400 text-amber-400' : ''
                      }`}
                    />
                    <span>
                      {bookmarks.includes(selectedPost.id) ? 'Bookmarked' : 'Bookmark'}
                    </span>
                  </button>

                  <div className="relative">
                    <button
                      onClick={(e) => handleShareClick(e, selectedPost)}
                      className="px-3.5 py-2 rounded-xl glass border border-white/10 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-2 transition"
                      title="Share Article"
                    >
                      <Share2 className="w-4 h-4 text-indigo-400" />
                      <span>Share</span>
                    </button>

                    {shareMenuPostId === selectedPost.id && (
                      <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-dark border border-white/15 shadow-2xl p-2 z-50 space-y-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(getPostShareUrl(selectedPost));
                            triggerToast('Article link copied to clipboard!');
                            setShareMenuPostId(null);
                          }}
                          className="w-full px-3 py-2 rounded-xl hover:bg-white/10 text-left text-xs font-semibold text-white flex items-center justify-between transition"
                        >
                          <span>Copy Direct Link</span>
                          <Copy className="w-3.5 h-3.5 text-indigo-400" />
                        </button>
                        <button
                          onClick={(e) => handleSocialShare(e, 'twitter', selectedPost)}
                          className="w-full px-3 py-2 rounded-xl hover:bg-white/10 text-left text-xs font-semibold text-slate-200 flex items-center justify-between transition"
                        >
                          <span>Share on X / Twitter</span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                        <button
                          onClick={(e) => handleSocialShare(e, 'linkedin', selectedPost)}
                          className="w-full px-3 py-2 rounded-xl hover:bg-white/10 text-left text-xs font-semibold text-slate-200 flex items-center justify-between transition"
                        >
                          <span>Share on LinkedIn</span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="h-72 md:h-96 rounded-3xl overflow-hidden mb-8 border border-white/10 shadow-2xl">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {selectedPost.overview && (
                <div className="p-6 md:p-8 rounded-3xl bg-indigo-500/10 border border-indigo-500/25 mb-8 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-300">
                    <Lightbulb className="w-4 h-4 text-indigo-400" />
                    <span>Executive Overview</span>
                  </div>
                  <p className="text-sm md:text-base text-slate-200 leading-relaxed whitespace-pre-line">
                    {selectedPost.overview}
                  </p>
                </div>
              )}

              {selectedPost.beforeAfter && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/25 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-rose-400">
                      ❌ Common Weak Approach
                    </div>
                    <p className="text-xs md:text-sm text-slate-300 italic leading-relaxed">
                      {selectedPost.beforeAfter.weak}
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/25 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      ✅ High-Converting Masterclass Approach
                    </div>
                    <p className="text-xs md:text-sm text-slate-200 font-medium leading-relaxed">
                      {selectedPost.beforeAfter.strong}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-8 mb-12 text-slate-200 leading-relaxed">
                {selectedPost.content.map((sec, i) => (
                  <div
                    key={i}
                    className="glass p-6 md:p-8 rounded-2xl border border-white/[0.06]"
                  >
                    <h3 className="font-heading font-bold text-xl md:text-2xl text-white mb-4 flex items-center gap-2">
                      <span className="text-indigo-400">#</span>
                      {sec.heading}
                    </h3>
                    <div className="text-sm md:text-base leading-relaxed text-slate-300 whitespace-pre-line">
                      {sec.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass gradient-border rounded-3xl p-8 border border-indigo-500/30 bg-indigo-500/5 mb-10">
                <h4 className="font-heading font-bold text-xl text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  <span>Masterclass Implementation Checklist & Takeaways</span>
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedPost.takeaways.map((item, idx) => (
                    <li
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs md:text-sm text-slate-200 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => toggleBookmark(e, selectedPost.id)}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition ${
                      bookmarks.includes(selectedPost.id)
                        ? 'bg-amber-500/15 border-amber-400/50 text-amber-300'
                        : 'glass border-white/10 text-slate-300 hover:text-white'
                    }`}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        bookmarks.includes(selectedPost.id) ? 'fill-amber-400 text-amber-400' : ''
                      }`}
                    />
                    <span>
                      {bookmarks.includes(selectedPost.id) ? 'Bookmarked' : 'Bookmark Guide'}
                    </span>
                  </button>
                  <button
                    onClick={(e) => handleShareClick(e, selectedPost)}
                    className="px-4 py-2.5 rounded-xl glass border border-white/10 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-2 transition"
                  >
                    <Share2 className="w-4 h-4 text-indigo-400" />
                    <span>Copy Share Link</span>
                  </button>
                </div>

                <button
                  onClick={handleClosePost}
                  className="btn-primary px-8 py-3 rounded-2xl text-xs font-bold text-white"
                >
                  Close Masterclass Reader
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
