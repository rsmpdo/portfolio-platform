export const demoLayouts = {
  "minimalist-editorial": {
    theme: { primaryColor: "#0f172a", secondaryColor: "#64748b" },
    components: [
      { 
        type: "HeroBanner", 
        title: "Editorial Hero", 
        isVisible: true, 
        props: {
          headline: "Clarity through Design.",
          subheadline: "I craft minimalist, high-impact digital experiences focusing on typography and whitespace.",
          ctaText: "Explore Work",
          avatarUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=500&q=80"
        } 
      },
      { 
        type: "AboutMe", 
        title: "Designer Bio", 
        isVisible: true, 
        props: {
          heading: "Less is More.",
          bio: "With over 8 years in the design industry, I believe that true elegance lies in simplicity. I strip away the unnecessary to reveal the core message of every product.",
          skills: ["Figma", "Typography", "UX Research", "Design Systems"]
        } 
      },
      { 
        type: "ProjectsGrid", 
        title: "Selected Works", 
        isVisible: true, 
        props: {
          heading: "Selected Works (2024-2026)",
          items: [
            { id: '1', title: 'Vogue Redesign', description: 'A concept redesign focusing on clean editorial layouts.', tags: ['UI/UX', 'Print'], liveUrl: 'https://example.com' },
            { id: '2', title: 'Mono Typography', description: 'Custom typeface designed for coding environments.', tags: ['Typeface', 'Branding'], liveUrl: 'https://example.com' }
          ]
        } 
      }
    ]
  },
  "dark-cyber": {
    theme: { primaryColor: "#10b981", secondaryColor: "#059669" },
    components: [
      { 
        type: "HeroBanner", 
        title: "Cyber Hero", 
        isVisible: true, 
        props: {
          headline: "SYSTEM.ONLINE",
          subheadline: "> Full Stack Engineer specializing in secure, high-throughput microservices.",
          ctaText: "INITIATE_HANDSHAKE",
          avatarUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80"
        } 
      },
      { 
        type: "SkillsCloud", 
        title: "Tech Stack", 
        isVisible: true, 
        props: {
          heading: "Core Technologies",
          skills: "Rust, Go, Kubernetes, gRPC, React, Node.js, WebGL, Docker, PostgreSQL"
        } 
      },
      { 
        type: "ProjectsGrid", 
        title: "Deployments", 
        isVisible: true, 
        props: {
          heading: "Recent Deployments",
          items: [
            { id: '1', title: 'Nexus Router', description: 'High-performance load balancer written in Rust.', tags: ['Rust', 'Networking'], githubUrl: 'https://github.com' },
            { id: '2', title: 'CyberSec Toolkit', description: 'Zero-day vulnerability scanner for edge computing.', tags: ['Go', 'Security'], githubUrl: 'https://github.com' }
          ]
        } 
      }
    ]
  },
  "creative-director": {
    theme: { primaryColor: "#e11d48", secondaryColor: "#be123c" },
    components: [
      { 
        type: "HeroBanner", 
        title: "Creative Hero", 
        isVisible: true, 
        props: {
          headline: "Bold Ideas. Relentless Execution.",
          subheadline: "Award-winning Creative Director shaping the visual culture of tomorrow's biggest brands.",
          ctaText: "View Showreel",
          avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80"
        } 
      },
      { 
        type: "MediaGallery", 
        title: "Director's Reel", 
        isVisible: true, 
        props: {
          heading: "Campaign Gallery",
          subheading: "Highlights from our recent global brand activations.",
          items: [
            { id: 'm1', type: 'image', url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=80', title: 'Neon Nights', description: 'Nike Summer Campaign' },
            { id: 'm2', type: 'image', url: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=800&q=80', title: 'Urban Flow', description: 'Red Bull Street Series' },
            { id: 'm3', type: 'image', url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80', title: 'Desert Mirage', description: 'Vogue Editorial Spread' }
          ]
        } 
      },
      { 
        type: "ContactSection", 
        title: "Let's Talk", 
        isVisible: true, 
        props: {
          heading: "Ready for the next big campaign?",
          messagePlaceholder: "Tell me about your brand vision..."
        } 
      }
    ]
  },
  "interactive-showcase": {
    theme: { primaryColor: "#3b82f6", secondaryColor: "#2563eb" },
    components: [
      { 
        type: "HeroBanner", 
        title: "Showcase Hero", 
        isVisible: true, 
        props: {
          headline: "I Create Digital Magic.",
          subheadline: "Specializing in WebGL, Three.js, and immersive motion experiences.",
          ctaText: "Play Demo",
          avatarUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80"
        } 
      },
      { 
        type: "ProjectsGrid", 
        title: "Interactive Projects", 
        isVisible: true, 
        props: {
          heading: "Immersive Experiences",
          items: [
            { id: '1', title: 'Awwwards Winning Site', description: 'A fully 3D interactive portfolio for a luxury car brand.', tags: ['Three.js', 'WebGL'], liveUrl: 'https://example.com' },
            { id: '2', title: 'Particle Engine', description: 'Custom GLSL shader particle engine for web browsers.', tags: ['GLSL', 'React Three Fiber'], liveUrl: 'https://example.com' }
          ]
        } 
      },
      { 
        type: "ExperienceTimeline", 
        title: "Journey", 
        isVisible: true, 
        props: {} 
      }
    ]
  },
  "luxury-motion-pro": {
    theme: { primaryColor: "#d97706", secondaryColor: "#b45309" },
    components: [
      { 
        type: "HeroBanner", 
        title: "Luxury Hero", 
        isVisible: true, 
        props: {
          headline: "Crafting Elegance.",
          subheadline: "Senior UI/UX Designer translating high-end luxury into seamless digital prototypes.",
          ctaText: "Discover",
          avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
        } 
      },
      { 
        type: "MediaGallery", 
        title: "High-Res Prototypes", 
        isVisible: true, 
        props: {
          heading: "Prototype Gallery",
          subheading: "Interactive flows and high-fidelity screen recordings.",
          items: [
            { id: 'm1', type: 'image', url: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80', title: 'Rolex App Concept', description: 'Watch Customizer Flow' },
            { id: 'm2', type: 'image', url: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80', title: 'Cartier E-commerce', description: 'Checkout Experience' }
          ]
        } 
      },
      {
        type: "PremiumEmbed",
        title: "Figma Prototype",
        isVisible: true,
        props: {
          heading: "Live Figma Interactive Prototype",
          embedUrl: "https://www.figma.com/embed?clip_board=0&embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fdummy123",
          embedType: "figma",
          isProFeature: true
        }
      },
      { 
        type: "ProjectsGrid", 
        title: "Case Studies", 
        isVisible: true, 
        props: {
          heading: "In-Depth Case Studies",
          items: [
            { id: '1', title: 'LVMH Digital Transformation', description: 'Leading the redesign of core digital assets across 4 brands.', tags: ['Strategy', 'UI/UX'], liveUrl: 'https://example.com' }
          ]
        } 
      }
    ]
  },
  "fintech-saas-pro": {
    theme: { primaryColor: "#2563eb", secondaryColor: "#1d4ed8" },
    components: [
      { 
        type: "HeroBanner", 
        title: "SaaS Hero", 
        isVisible: true, 
        props: {
          headline: "Building Scalable SaaS.",
          subheadline: "Product Lead focused on driving ARR, user retention, and enterprise-grade fintech solutions.",
          ctaText: "View Case Studies",
          avatarUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=500&q=80"
        } 
      },
      { 
        type: "ExperienceTimeline", 
        title: "Product Journey", 
        isVisible: true, 
        props: {
          heading: "Professional History"
        } 
      },
      { 
        type: "SkillsCloud", 
        title: "Core Metrics", 
        isVisible: true, 
        props: {
          heading: "Areas of Expertise",
          skills: "Product Strategy, Agile, Scrum, JIRA, SQL, Amplitude, Mixpanel, A/B Testing, SaaS Metrics"
        } 
      },
      { 
        type: "ProjectsGrid", 
        title: "Enterprise Builds", 
        isVisible: true, 
        props: {
          heading: "Key Product Launches",
          items: [
            { id: '1', title: 'Stripe Analytics Dashboard', description: 'Led the team that built the internal metrics aggregator.', tags: ['Product', 'Fintech'], liveUrl: 'https://example.com' }
          ]
        } 
      }
    ]
  },
  "ai-neural-labs-pro": {
    theme: { primaryColor: "#8b5cf6", secondaryColor: "#6d28d9" },
    components: [
      { 
        type: "HeroBanner", 
        title: "Neural Lab Hero", 
        isVisible: true, 
        props: {
          headline: "Training the Future.",
          subheadline: "Machine Learning Researcher optimizing LLMs and computer vision pipelines.",
          ctaText: "Read Papers",
          avatarUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80"
        } 
      },
      { 
        type: "SkillsCloud", 
        title: "ML Frameworks", 
        isVisible: true, 
        props: {
          heading: "Tech Stack",
          skills: "PyTorch, TensorFlow, CUDA, Python, HuggingFace, OpenAI API, LangChain"
        } 
      },
      { 
        type: "ProjectsGrid", 
        title: "Research Papers", 
        isVisible: true, 
        props: {
          heading: "Published Research & Models",
          items: [
            { id: '1', title: 'Efficient Attention Mechanisms', description: 'Reduced transformer training time by 40%.', tags: ['NLP', 'Research'], liveUrl: 'https://arxiv.org' },
            { id: '2', title: 'Vision-Language Alignments', description: 'Open-source multimodal model fine-tuned on medical imaging.', tags: ['Computer Vision', 'PyTorch'], githubUrl: 'https://github.com' }
          ]
        } 
      }
    ]
  },
  "global-agency-studio": {
    theme: { primaryColor: "#64748b", secondaryColor: "#475569" },
    components: [
      { 
        type: "HeroBanner", 
        title: "Agency Hero", 
        isVisible: true, 
        props: {
          headline: "We Are Studio Global.",
          subheadline: "An independent digital product agency partnering with the world's most ambitious brands.",
          ctaText: "Our Capabilities",
          avatarUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80"
        } 
      },
      { 
        type: "MediaGallery", 
        title: "Client Roster", 
        isVisible: true, 
        props: {
          heading: "Our Clients",
          subheading: "Transforming industries across the globe.",
          items: [
            { id: 'm1', type: 'image', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', title: 'Corporate Rebranding', description: 'Tech Giant Inc.' },
            { id: 'm2', type: 'image', url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80', title: 'Office Expansion', description: 'Global Logistics' }
          ]
        } 
      },
      { 
        type: "ProjectsGrid", 
        title: "Global Campaigns", 
        isVisible: true, 
        props: {
          heading: "Featured Work",
          items: [
            { id: '1', title: 'Spotify Wrapped 2025', description: 'Interactive web experience for millions of users.', tags: ['Web3', 'Interactive'], liveUrl: 'https://example.com' }
          ]
        } 
      }
    ]
  },
  "haute-couture-studio": {
    theme: { primaryColor: "#be185d", secondaryColor: "#9d174d" },
    components: [
      { 
        type: "HeroBanner", 
        title: "Couture Hero", 
        isVisible: true, 
        props: {
          headline: "Avant-Garde.",
          subheadline: "Capturing the essence of high fashion through the lens of modern photography.",
          ctaText: "View Gallery",
          avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
        } 
      },
      { 
        type: "MediaGallery", 
        title: "Runway Gallery", 
        isVisible: true, 
        props: {
          heading: "Paris Fashion Week '26",
          subheading: "Exclusive backstage and runway captures.",
          items: [
            { id: 'm1', type: 'image', url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80', title: 'Spring Collection', description: 'Balenciaga Runway' },
            { id: 'm2', type: 'image', url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80', title: 'Midnight Silk', description: 'Backstage Prep' },
            { id: 'm3', type: 'image', url: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&w=800&q=80', title: 'Avant-Garde', description: 'Editorial Shoot' }
          ]
        } 
      }
    ]
  },
  "spatial-architect-studio": {
    theme: { primaryColor: "#059669", secondaryColor: "#047857" },
    components: [
      { 
        type: "HeroBanner", 
        title: "Architectural Hero", 
        isVisible: true, 
        props: {
          headline: "Form & Function.",
          subheadline: "Award-winning architectural firm designing sustainable, modern spaces.",
          ctaText: "Explore Projects",
          avatarUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=500&q=80"
        } 
      },
      { 
        type: "MediaGallery", 
        title: "CAD Renders", 
        isVisible: true, 
        props: {
          heading: "Concept Renders",
          subheading: "3D visualizations of upcoming sustainable eco-villages.",
          items: [
            { id: 'm1', type: 'image', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', title: 'Eco Villa', description: 'Exterior Render' },
            { id: 'm2', type: 'image', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', title: 'Minimalist Interior', description: 'Living Space Design' }
          ]
        } 
      },
      {
        type: "PremiumEmbed",
        title: "3D Model Viewer",
        isVisible: true,
        props: {
          heading: "Interactive Spline 3D Scene",
          embedUrl: "https://my.spline.design/dummy",
          embedType: "spline",
          isProFeature: true
        }
      },
      { 
        type: "ProjectsGrid", 
        title: "Spatial Designs", 
        isVisible: true, 
        props: {
          heading: "Completed Structures",
          items: [
            { id: '1', title: 'The Glass Pavilion', description: 'A 10,000 sq ft modern art museum built into a mountainside.', tags: ['Commercial', 'Sustainable'], liveUrl: 'https://example.com' }
          ]
        } 
      }
    ]
  }
};
