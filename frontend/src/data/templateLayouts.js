export const templateLayouts = {
  "minimalist-editorial": {
    theme: { templateId: "minimalist-editorial", primaryColor: "#0f172a", secondaryColor: "#64748b" },
    components: [
      {
        type: "HeroBanner",
        title: "Minimal Hero",
        isVisible: true,
        props: {
          badgeText: "EDITORIAL & DIGITAL ARCHITECTURE",
          headline: "Crafting Timeless Digital Products & Minimalist Experiences",
          subheadline: "Focusing on typography, spatial grid harmony, and essential interaction design.",
          ctaText: "Explore Portfolio",
          avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80"
        }
      },
      {
        type: "AboutMe",
        title: "Editorial Story",
        isVisible: true,
        props: {
          heading: "The Philosophy of Reduction",
          bio: "Design is not about adding until nothing more can be added, but removing until nothing can be taken away. Based in Stockholm, crafting interfaces for global brands.",
          skills: ["Editorial Layouts", "Typography", "Systems Architecture", "Brand Strategy"]
        }
      },
      {
        type: "ProjectsGrid",
        title: "Selected Works",
        isVisible: true,
        props: {
          heading: "Selected Works (2024 - 2026)",
          items: [
            {
              id: "p1",
              title: "Monochrome Journal",
              description: "High-contrast digital publication platform engineered for immersive long-form reading.",
              imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
              tags: ["React", "Typography", "Editorial"]
            },
            {
              id: "p2",
              title: "Nordic Living Space",
              description: "Minimalist e-commerce catalog for architectural furniture and lighting design.",
              imageUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80",
              tags: ["E-Commerce", "Spatial", "Minimal"]
            }
          ]
        }
      }
    ]
  },

  "dark-cyber": {
    theme: { templateId: "dark-cyber", primaryColor: "#10b981", secondaryColor: "#059669" },
    components: [
      {
        type: "HeroBanner",
        title: "Cyber Hero",
        isVisible: true,
        props: {
          badgeText: "$ ./init_cyber_core.sh --prod",
          headline: "Full Stack Cyber Security & Systems Architect",
          subheadline: "Deploying high-throughput distributed systems, zero-trust infrastructure, and low-latency APIs.",
          ctaText: "Initialize Terminal",
          avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80"
        }
      },
      {
        type: "SkillsCloud",
        title: "Tech Stack Matrix",
        isVisible: true,
        props: {
          heading: "Core Infrastructure & Protocols",
          skills: ["Kubernetes", "Rust", "Go", "Distributed Systems", "Zero Trust", "GraphQL", "Docker", "eBPF"]
        }
      },
      {
        type: "ExperienceTimeline",
        title: "Cyber Deployment Log",
        isVisible: true,
        props: {
          heading: "Deployment & Systems History",
          items: [
            {
              period: "2024 - Present",
              role: "Principal Infrastructure Architect",
              company: "CyberPulse Defense",
              description: "Engineered real-time threat telemetry processing 45B events daily with sub-millisecond response latency."
            },
            {
              period: "2022 - 2024",
              role: "Lead Systems Engineer",
              company: "Vector Security",
              description: "Architected automated CI/CD security pipelines and eBPF kernel packet inspection systems."
            }
          ]
        }
      },
      {
        type: "ProjectsGrid",
        title: "System Builds",
        isVisible: true,
        props: {
          heading: "Production Systems",
          items: [
            {
              id: "p1",
              title: "Aegis Zero-Trust Mesh",
              description: "Decentralized identity and access management protocol built on Rust and WireGuard.",
              imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
              tags: ["Rust", "Security", "Networking"]
            }
          ]
        }
      }
    ]
  },

  "creative-director": {
    theme: { templateId: "creative-director", primaryColor: "#e11d48", secondaryColor: "#be123c" },
    components: [
      {
        type: "HeroBanner",
        title: "Creative Hero",
        isVisible: true,
        props: {
          badgeText: "DIRECTOR & VISUAL STORYTELLER",
          headline: "Crafting Cinematic Campaigns & Visionary Visual Worlds",
          subheadline: "Leading brand narratives, high-fashion films, and global creative direction.",
          ctaText: "View Showreel",
          avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80"
        }
      },
      {
        type: "MediaGallery",
        title: "Director's Reel",
        isVisible: true,
        props: {
          heading: "Cinematic Reel & Visuals",
          items: [
            {
              id: "m1",
              title: "Neon Genesis Campaign",
              description: "Commercial film direction for luxury sportswear.",
              url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
            },
            {
              id: "m2",
              title: "Midnight Horizon",
              description: "Experimental visual art installation.",
              url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
            }
          ]
        }
      },
      {
        type: "TestimonialsCarousel",
        title: "Client Endorsements",
        isVisible: true,
        props: {
          heading: "Industry Endorsements",
          items: [
            {
              quote: "Brought an unmatched level of elegance and storytelling vision to our global brand campaign.",
              author: "Elena Rostova",
              role: "Global Head of Brand, Luxe Global"
            }
          ]
        }
      }
    ]
  },

  "interactive-showcase": {
    theme: { templateId: "interactive-showcase", primaryColor: "#3b82f6", secondaryColor: "#2563eb" },
    components: [
      {
        type: "HeroBanner",
        title: "Showcase Hero",
        isVisible: true,
        props: {
          badgeText: "INTERACTIVE EXPERIENCES & WEBGL",
          headline: "Pushing the Boundaries of Interactive Motion Design",
          subheadline: "Creating immersive WebGL visualizer tools and micro-animated digital products.",
          ctaText: "Launch Experience",
          avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80"
        }
      },
      {
        type: "ProjectsGrid",
        title: "Interactive Builds",
        isVisible: true,
        props: {
          heading: "Interactive Applications",
          items: [
            {
              id: "p1",
              title: "3D Quantum Visualizer",
              description: "Real-time particle simulation built with Three.js and WebGL shaders.",
              imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
              tags: ["Three.js", "WebGL", "React"]
            }
          ]
        }
      }
    ]
  },

  "luxury-motion-pro": {
    theme: { templateId: "luxury-motion-pro", primaryColor: "#d97706", secondaryColor: "#b45309" },
    components: [
      {
        type: "HeroBanner",
        title: "Luxury Hero",
        isVisible: true,
        props: {
          badgeText: "✨ BESPOKE MOTION & FINE ART DIRECTION",
          headline: "Exquisite Digital Craftsmanship for Ultra-Luxury Brands",
          subheadline: "Specializing in high-end editorial aesthetics, metallic gold motion accents, and cinematic brand presence.",
          ctaText: "Discover Collection",
          avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=500&q=80"
        }
      },
      {
        type: "PremiumEmbed",
        title: "Figma Prototype Embed",
        isVisible: true,
        props: {
          title: "Luxury Watch Customizer Prototype",
          embedUrl: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/sample"
        }
      },
      {
        type: "MediaGallery",
        title: "High-Res Prototypes",
        isVisible: true,
        props: {
          heading: "Luxury Craft Gallery",
          items: [
            {
              id: "m1",
              title: "Aurum Chronograph",
              description: "Interactive 3D watch customizer interface.",
              url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
            },
            {
              id: "m2",
              title: "Vogue Private Lounge",
              description: "Virtual luxury concierge dashboard.",
              url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
            }
          ]
        }
      },
      {
        type: "ProjectsGrid",
        title: "Bespoke Case Studies",
        isVisible: true,
        props: {
          heading: "Featured Case Studies",
          items: [
            {
              id: "p1",
              title: "Maison de L'Or",
              description: "Redefining digital storefront elegance for Paris haute joaillerie.",
              imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
              tags: ["Luxury", "Bespoke", "Paris"]
            }
          ]
        }
      }
    ]
  },

  "fintech-saas-pro": {
    theme: { templateId: "fintech-saas-pro", primaryColor: "#2563eb", secondaryColor: "#1d4ed8" },
    components: [
      {
        type: "HeroBanner",
        title: "SaaS Hero",
        isVisible: true,
        props: {
          badgeText: "ENTERPRISE FINTECH & SAAS ARCHITECTURE",
          headline: "Scaling Next-Generation Financial Infrastructure",
          subheadline: "Architecting microservices handling $2.5B+ in automated transaction flow with zero downtime.",
          ctaText: "Explore Architecture",
          avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80"
        }
      },
      {
        type: "ExperienceTimeline",
        title: "Product Journey",
        isVisible: true,
        props: {
          heading: "Engineering Milestones",
          items: [
            {
              period: "2023 - 2026",
              role: "VP of Engineering",
              company: "PayFlow Scale",
              description: "Scaled real-time settlement engine processing 100k requests/sec."
            }
          ]
        }
      }
    ]
  },

  "ai-neural-labs-pro": {
    theme: { templateId: "ai-neural-labs-pro", primaryColor: "#8b5cf6", secondaryColor: "#6d28d9" },
    components: [
      {
        type: "HeroBanner",
        title: "Neural Lab Hero",
        isVisible: true,
        props: {
          badgeText: "PRO TIER / NEURAL ENGINE V4.2",
          headline: "Deep Learning Research & Autonomous Intelligence",
          subheadline: "Building multi-modal transformer architectures, synthetic dataset generation, and LLM optimization.",
          ctaText: "Read AI Research",
          avatarUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=500&q=80"
        }
      },
      {
        type: "AdvancedMetrics",
        title: "Model Performance Metrics",
        isVisible: true,
        props: {
          heading: "Neural Network Benchmarks",
          metrics: [
            { label: "Inference Latency", value: "4.2ms" },
            { label: "MMLU Benchmark Score", value: "91.8%" },
            { label: "Parameters Trained", value: "70B" },
            { label: "Throughput", value: "12k t/s" }
          ]
        }
      },
      {
        type: "SkillsCloud",
        title: "ML Frameworks",
        isVisible: true,
        props: {
          heading: "AI & Data Stack",
          skills: ["PyTorch", "Transformers", "CUDA", "TensorRT", "LangChain", "vLLM", "Python", "Ray"]
        }
      }
    ]
  },

  "global-agency-studio": {
    theme: { templateId: "global-agency-studio", primaryColor: "#64748b", secondaryColor: "#475569" },
    components: [
      {
        type: "HeroBanner",
        title: "Agency Hero",
        isVisible: true,
        props: {
          badgeText: "GLOBAL DIGITAL AGENCY & PRODUCT STUDIO",
          headline: "We Partner With Industry Leaders To Build Iconic Digital Brands",
          subheadline: "Full-service strategy, motion graphics, and software engineering for Fortune 500 companies.",
          ctaText: "Start Project",
          avatarUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=500&q=80"
        }
      },
      {
        type: "AdvancedMetrics",
        title: "Agency Impact",
        isVisible: true,
        props: {
          heading: "Agency Scale & Impact",
          metrics: [
            { label: "Global Offices", value: "4 Cities" },
            { label: "Awards Won", value: "48 Awwwards" },
            { label: "Client Capital Raised", value: "$1.4B+" },
            { label: "Active Users Reached", value: "120M+" }
          ]
        }
      }
    ]
  },

  "haute-couture-studio": {
    theme: { templateId: "haute-couture-studio", primaryColor: "#be185d", secondaryColor: "#9d174d" },
    components: [
      {
        type: "HeroBanner",
        title: "Couture Hero",
        isVisible: true,
        props: {
          badgeText: "HAUTE COUTURE & LUXURY ATELIER",
          headline: "Redefining Runway Elegance and Digital Craftsmanship",
          subheadline: "Private fashion collections, bespoke tailoring, and luxury editorial showcases.",
          ctaText: "View Runway Collection",
          avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80"
        }
      },
      {
        type: "MediaGallery",
        title: "Runway Gallery",
        isVisible: true,
        props: {
          heading: "Paris Autumn/Winter Collection",
          items: [
            {
              id: "m1",
              title: "Silk Noir Gown",
              description: "Hand-embroidered silk couture gown.",
              url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"
            }
          ]
        }
      }
    ]
  },

  "spatial-architect-studio": {
    theme: { templateId: "spatial-architect-studio", primaryColor: "#059669", secondaryColor: "#047857" },
    components: [
      {
        type: "HeroBanner",
        title: "Architectural Hero",
        isVisible: true,
        props: {
          badgeText: "SPATIAL ARCHITECTURE & 3D DESIGN FIRM",
          headline: "Designing Sustainable Physical Spaces & 3D Spatial Environments",
          subheadline: "Merging modern Scandinavian architecture, structural engineering, and spatial VR visualizers.",
          ctaText: "Explore 3D Models",
          avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80"
        }
      },
      {
        type: "ProjectsGrid",
        title: "Spatial Projects",
        isVisible: true,
        props: {
          heading: "Architectural Works",
          items: [
            {
              id: "p1",
              title: "Glasshouse Pavilion",
              description: "Zero-emission solar residential pavilion overlooking the Stockholm archipelago.",
              imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
              tags: ["Architecture", "3D CAD", "Sustainable"]
            }
          ]
        }
      }
    ]
  }
};
