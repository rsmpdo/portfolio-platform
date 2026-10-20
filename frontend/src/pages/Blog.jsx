import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import {
  Sparkles,
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
  ExternalLink
} from 'lucide-react';

const STORAGE_KEY = 'portfoliocraft_bookmarked_blogs';

const posts = [
  {
    id: 'product-design-structure',
    title: 'How to Structure a Product Design Portfolio That Gets You Hired at Tech Unicorns',
    category: 'Career & Portfolio Strategy',
    date: 'July 20, 2026',
    author: 'Alex Morgan',
    authorRole: 'Staff Designer & Mentor',
    authorAvatar:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    readTime: '10 min read',
    image:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    excerpt:
      'Learn the exact section hierarchy, narrative frameworks, and metric positioning top 1% candidates use to land staff roles at Airbnb, Figma, and Stripe.',
    content: [
      {
        heading: '1. The First 5 Seconds: The Executive Summary Rule',
        text: "Design leads and hiring managers review over 50 portfolios per day. If your hero banner doesn't immediately answer who you are, what you specialize in, and what business impact you deliver, 80% of reviewers will bounce before scrolling further.\n\nYour hero section should present a clear value thesis: 'Product Designer specializing in high-throughput enterprise SaaS interfaces and design systems.' Avoid vague phrases like 'I create digital experiences.' Be precise."
      },
      {
        heading: '2. The 4-Step Narrative Framework for Case Studies',
        text: "A compelling case study is not a dump of Figma frames. It's a story of problem-solving under constraints. Follow this structure for every project:\n\n• The Context & Business Challenge: What was broken, and why did the business care?\n• User Discovery & Constraints: What research insights drove your design decisions?\n• Trade-offs & Iterations: What visual approaches did you test and reject, and why?\n• Measured Business Impact: Did revenue increase? Did task completion time drop?"
      },
      {
        heading: '3. Quantifying Design Impact: Metrics Over Pixels',
        text: "Unicorn design teams hire problem solvers, not just UI polishers. Instead of writing 'I redesigned the checkout flow,' frame it as: 'Redesigned 3-step checkout flow, increasing mobile conversion rates by 34% and reducing cart abandonment by $1.2M annually.'"
      },
      {
        heading: '4. Building an Unforgettable Micro-Interaction Hierarchy',
        text: 'Interactive prototypes and subtle micro-animations (such as 3D hover transforms, active tab indicator lines, and smooth modal transitions) prove that you care about execution quality down to the last pixel.'
      },
      {
        heading: '5. Frictionless Contact & Conversion Hooks',
        text: 'Never force recruiters to search for your email or LinkedIn. Every portfolio should conclude with a prominent Contact section displaying your direct email, location/remote availability, and average response time.'
      }
    ],
    takeaways: [
      'Craft an explicit 5-second Hero thesis specifying your core domain.',
      'Lead case studies with measurable business metrics alongside visual artifacts.',
      'Include interactive prototypes and live product links for every project.',
      'Keep contact channels prominent and friction-free at the bottom of every page.'
    ]
  },
  {
    id: 'copywriting-mistakes',
    title: '10 Portfolio Copywriting Mistakes That Are Costing You Inbound Clients',
    category: 'Copywriting & Positioning',
    date: 'July 18, 2026',
    author: 'Marcus Vance',
    authorRole: 'Full Stack Engineer & Tech Lead',
    authorAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    readTime: '8 min read',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    excerpt:
      'Stop listing raw tech frameworks. Learn how positioning your work around client ROI turns passive visitors into high-paying inbound leads.',
    content: [
      {
        heading: '1. The Framework Laundry List Trap',
        text: "Listing 'React, Redux, Node.js, MongoDB' tells a client what tools you own, but fails to explain what problems you solve for them. Clients buy solutions to business problems. Shift your positioning from 'I code in JavaScript' to 'I architect high-performance web platforms that handle millions of users seamlessly.'"
      },
      {
        heading: "2. The Generic 'Passionate Developer' Bio",
        text: "Phrases like 'Passionate coder eager for opportunities' sound junior and interchangeable. Replace them with explicit authority statements: 'Senior Full Stack Engineer with 6+ years building real-time financial dashboards and cloud microservices.'"
      },
      {
        heading: '3. Hiding Project Outcomes Behind Technical Jargon',
        text: "Don't drown readers in technical implementation details before explaining what the project achieved. Always start project descriptions with a high-level summary of purpose and result."
      },
      {
        heading: '4. Neglecting Social Proof & Client Testimonials',
        text: 'Potential clients trust what other founders say about you far more than what you say about yourself. Always include quotes from previous founders or team leads validating your work ethic and delivery speed.'
      },
      {
        heading: '5. Lacking Clear Calls to Action (CTAs)',
        text: "Ensure every section guides the reader toward reaching out. Use explicit, inviting CTA text like 'Ready to Build Something Extraordinary? Send Me a Message.'"
      }
    ],
    takeaways: [
      'Position your technical skills around business outcomes and client ROI.',
      'Replace generic bio lines with specific, authoritative domain experience.',
      'Incorporate client testimonials and social proof prominently.',
      'Provide unambiguous CTAs that make reaching out effortless.'
    ]
  },
  {
    id: 'dark-mode-glassmorphism',
    title: 'Why Modern Dark Mode & Glassmorphism Win Attention in 2026',
    category: 'Design Systems & Aesthetics',
    date: 'June 30, 2026',
    author: 'Elena Rostova',
    authorRole: 'Creative Director & Brand Strategist',
    authorAvatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    readTime: '9 min read',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    excerpt:
      'A deep dive into dark mode contrast psychology, backdrop-filter glassmorphism, and modern CSS design system architecture.',
    content: [
      {
        heading: '1. Visual Contrast Psychology in Modern Interfaces',
        text: 'Dark mode reduces cognitive fatigue and allows product screenshots to pop off the screen with vibrant energy. However, true dark mode is not pure black (`#000000`) — it relies on deep slate background tokens like `#080c14` paired with crisp `#f1f5f9` text.'
      },
      {
        heading: '2. Mastering Backdrop-Filter Glassmorphism',
        text: 'Glassmorphism creates depth and layer hierarchy without visual bulk. Combine `backdrop-filter: blur(20px)` with semi-transparent background overlays (`rgba(255,255,255,0.03)`) and 1px subtle linear gradient borders for a luxury finish.'
      },
      {
        heading: '3. Micro-Animations & Ambient Lighting',
        text: 'Ambient radial gradient blurs behind hero containers create floating depth. Subtle hover transforms (`translateY(-2px)`) give buttons and cards a responsive, living feel.'
      },
      {
        heading: '4. Maintaining Perfect Accessibility & Contrast',
        text: 'High-end design never compromises readability. Ensure contrast ratios exceed WCAG AA standards (at least 4.5:1 ratio) for all typography and interactive pill badges.'
      },
      {
        heading: '5. Building Scalable CSS Design System Tokens',
        text: 'Structure your styling with CSS custom properties for background colors, border glows, text colors, and font families to maintain aesthetic consistency across every page.'
      }
    ],
    takeaways: [
      'Use deep slate background tones (#080c14) rather than harsh pure black.',
      'Pair backdrop-filter blur with subtle 1px linear gradient borders.',
      'Ensure category badges use high-contrast solid dark backdrops over images.',
      'Maintain strict WCAG contrast standards for maximum legibility.'
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

    // Copy to clipboard immediately so the user always gets the link right away
    try {
      await navigator.clipboard.writeText(url);
      triggerToast('Article link copied to clipboard!');
    } catch {
      // Fallback
    }

    // Also toggle the quick-share menu for social sharing (X, LinkedIn, Native Share)
    setShareMenuPostId((prev) => (prev === post.id ? null : post.id));
  };

  const handleSocialShare = (e, platform, post) => {
    if (e) e.stopPropagation();
    const url = encodeURIComponent(getPostShareUrl(post));
    const text = encodeURIComponent(`${post.title} — via PortfolioCraft`);

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
    } else if (platform === 'native' && navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: getPostShareUrl(post)
      }).catch(() => {});
    }
    setShareMenuPostId(null);
  };

  const displayedPosts =
    filterMode === 'saved'
      ? posts.filter((p) => bookmarks.includes(p.id))
      : posts;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      {/* Floating Toast Notification */}
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

      <main className="flex-1 pt-32 pb-20 px-6 max-w-6xl mx-auto w-full">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="badge badge-indigo inline-flex mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Masterclass Guides & Insights</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-white mb-6">
            The PortfolioCraft<br />
            <span className="gradient-text">Blog & Guides</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            In-depth guides on portfolio design, personal branding, and winning client work. Bookmark your favorite guides or share them with your team.
          </p>
        </div>

        {/* Filter Bar: All Articles vs Saved Bookmarks */}
        <div className="flex items-center justify-center gap-3 mb-12">
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
        </div>

        {/* Empty Bookmarks State */}
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
          /* 3 Full Readable Articles Cards */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {displayedPosts.map((post) => {
              const isBookmarked = bookmarks.includes(post.id);
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card gradient-border rounded-3xl overflow-hidden flex flex-col justify-between group cursor-pointer relative"
                  onClick={() => handleOpenPost(post)}
                >
                  <div>
                    {/* Cover Image with HIGH CONTRAST SOLID BADGE & Quick Bookmark/Share */}
                    <div className="h-52 overflow-hidden relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* High contrast badge overlay over image */}
                      <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-slate-950/95 border border-indigo-500/50 text-indigo-300 font-bold text-xs shadow-2xl backdrop-blur-md flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-indigo-400" />
                        <span>{post.category}</span>
                      </div>

                      {/* Quick Bookmark & Share Actions on Card */}
                      <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
                        <button
                          onClick={(e) => toggleBookmark(e, post.id)}
                          className={`p-2 rounded-xl backdrop-blur-md border transition ${
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
                          onClick={(e) => handleShareClick(e, post)}
                          className="p-2 rounded-xl bg-slate-950/85 border border-white/15 text-slate-300 hover:text-white backdrop-blur-md transition"
                          title="Copy & Share Article Link"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Date & Read Time */}
                      <div className="flex items-center gap-2 text-xs text-slate-300 font-medium mb-3">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{post.date}</span>
                        <span className="text-slate-500">•</span>
                        <Clock className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{post.readTime}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading font-bold text-xl text-white mb-3 group-hover:text-indigo-400 transition-colors leading-snug">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-slate-300 text-xs leading-relaxed mb-6">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Read Button */}
                  <div className="p-6 pt-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenPost(post);
                      }}
                      className="btn-primary w-full py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2"
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
      </main>

      {/* Comprehensive Masterclass Article Reader Modal */}
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
              {/* Close Button */}
              <button
                onClick={handleClosePost}
                className="absolute top-6 right-6 p-2.5 rounded-2xl glass text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Category & Metadata */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-bold text-xs">
                  {selectedPost.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">{selectedPost.date}</span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-400 font-medium">{selectedPost.readTime}</span>
              </div>

              {/* Title */}
              <h1 className="font-heading font-black text-3xl md:text-5xl text-white leading-tight mb-6">
                {selectedPost.title}
              </h1>

              {/* Author Info + Working Bookmark & Share Controls */}
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
                  </div>
                </div>

                <div className="flex items-center gap-2.5 relative">
                  {/* Working Bookmark Button */}
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

                  {/* Working Share Button + Dropdown */}
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

              {/* Cover Image */}
              <div className="h-72 md:h-96 rounded-3xl overflow-hidden mb-10 border border-white/10 shadow-2xl">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Article Content Sections */}
              <div className="space-y-10 mb-12 text-slate-200 leading-relaxed">
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

              {/* Key Takeaways */}
              <div className="glass gradient-border rounded-3xl p-8 border border-indigo-500/30 bg-indigo-500/5 mb-10">
                <h4 className="font-heading font-bold text-xl text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  <span>Key Actionable Takeaways</span>
                </h4>
                <ul className="space-y-3">
                  {selectedPost.takeaways.map((item, idx) => (
                    <li key={idx} className="text-sm text-slate-200 flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 mt-2 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Reader Bar */}
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
