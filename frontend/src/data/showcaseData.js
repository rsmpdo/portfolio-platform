export const SHOWCASE_CREATORS = [
  {
    handle: 'alex',
    name: 'Alex Morgan',
    role: 'Senior Product Designer & Creative Technologist',
    location: 'San Francisco, CA',
    experience: '7+ Years Experience',
    accentColor: '#6366f1',
    secondaryColor: '#a855f7',
    bgColor: '#060814',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    headline: 'Crafting Digital Products People Love to Use',
    bio: 'Senior Product Designer & Creative Technologist with 7+ years transforming complex enterprise software into sleek, accessible user experiences for Y-Combinator startups and global fintech leaders.',
    quote: 'Got 3 inbound job offers within 10 days of launching my portfolio here.',
    contact: {
      email: 'alex.morgan@vervedigital.io',
      phone: '+1 (415) 890-4321',
      website: 'https://alexmorgan.design',
      location: 'San Francisco, CA (Mission District Studio)',
      timezone: 'PST (UTC-8)',
      availability: 'Available for Q4 Design Systems & Product Sprints',
      responseTime: 'Usually responds within 4 hours',
      hourlyRate: '$165 – $220 / hr · Fixed Retainers Available',
      socials: [
        { label: 'LinkedIn', handle: 'in/alexmorgan-ux', url: 'https://linkedin.com' },
        { label: 'Dribbble', handle: '@alexmorgan', url: 'https://dribbble.com' },
        { label: 'GitHub', handle: '@alexmorgan-ui', url: 'https://github.com' },
        { label: 'X / Twitter', handle: '@alexmorgandesign', url: 'https://x.com' }
      ]
    },
    stats: [
      { value: '7+', label: 'Years Experience' },
      { value: '50+', label: 'Products Shipped' },
      { value: '35+', label: 'Global Clients' },
      { value: '3.2M', label: 'Daily Active Users' }
    ],
    skills: [
      'Product Strategy',
      'Design Systems (Figma Tokens)',
      'Interactive Prototyping',
      'React & Next.js',
      'Tailwind CSS',
      'Motion & Micro-Interactions',
      'User Research & Usability Testing',
      'WCAG AAA Accessibility'
    ],
    experienceTimeline: [
      {
        role: 'Lead Product Designer',
        company: 'Verve Digital Studio',
        period: '2022 — Present',
        description: 'Directing design strategy and multi-brand token design systems across 12 flagship SaaS and fintech product lines serving 3.2M daily users.'
      },
      {
        role: 'Senior UI/UX Designer',
        company: 'NovaPay Financial',
        period: '2019 — 2022',
        description: 'Spearheaded the mobile banking & wealth management redesign serving 200K+ active retail investors, boosting 30-day retention by 34%.'
      },
      {
        role: 'Product Designer',
        company: 'Pulse Labs (YC W19)',
        period: '2018 — 2019',
        description: 'Designed the core zero-to-one B2B analytics workspace and interactive onboarding flows that helped close a $14M Series A.'
      }
    ],
    projects: [
      {
        id: 'alex-p1',
        title: 'Fintech Mobile Dashboard',
        category: 'Fintech · Mobile & Web UI',
        client: 'NovaPay Financial (Series C)',
        role: 'Lead Product Designer & Design System Architect',
        timeline: '18 Weeks (Jan – May 2025)',
        team: '2 Product Designers, 5 React Native Engineers, 1 Data PM',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        summary: 'Redesigned the core wealth management platform for 200,000+ active investors, increasing daily retention by 34% and cutting trade execution time in half.',
        overview: 'NovaPay Financial needed a complete overhaul of their flagship iOS, Android, and Web wealth management suite. Retail and high-net-worth investors were churning during volatile market hours because portfolio telemetry was buried three levels deep inside legacy tabular menus.\n\nWe re-architected the entire information hierarchy around real-time streaming asset cards, customizable risk heatmaps, and a single-thumb fractional order sheet that executes trades in under 1.8 seconds.',
        challenge: 'Legacy wealth management dashboards overwhelmed retail investors with 40+ column tables, delayed P&L calculations, and fragmented tax-lot analytics. Over 62% of mobile users abandoned multi-leg order flows before confirmation.',
        solution: 'Designed a modular card-based telemetry interface powered by a 120-component Figma & React Native token system, real-time WebSocket delta indicators, biometric swipe-to-trade execution, and WCAG AAA dark-mode contrast.',
        impact: '+34% Daily Retention · 4.9★ App Store Rating · $1.4B Assets Tracked',
        metrics: [
          { value: '+34%', label: '30-Day Retention', detail: 'Up from 41% to 75% across active retail cohorts' },
          { value: '1.8s', label: 'Order Execution', detail: 'Reduced from 6.4s average trade completion time' },
          { value: '4.9★', label: 'App Store Rating', detail: 'Based on 18,400+ verified investor reviews' },
          { value: '$1.4B', label: 'AUM Tracked', detail: 'Total portfolio volume managed on the new UI' }
        ],
        process: [
          {
            phase: '01. Quantitative Telemetry & Investor Interviews',
            detail: 'Shadowed 28 active retail and options traders alongside Mixpanel funnel analysis to pinpoint exact drop-off steps during market open.'
          },
          {
            phase: '02. Tokenized Financial Design System',
            detail: 'Created "NovaUI" — a semantic design token system supporting instant dark/OLED/light switching and high-density numeric tabular typography.'
          },
          {
            phase: '03. High-Frequency Data Visualization',
            detail: 'Prototyped 60fps interactive candlestick & allocation rings using Skia and D3.js with haptic scrubbing across historical timeframes.'
          },
          {
            phase: '04. Staged Rollout & A/B Validation',
            detail: 'Shipped to a 10% beta cohort first, refining the one-tap recurring investment drawer before 100% global rollout.'
          }
        ],
        deliverables: [
          '120+ Component Figma & React Native Design System',
          'Interactive Skia / D3 Portfolio Allocation Charts',
          'Single-Thumb Biometric Order Sheet & Risk Preview',
          'Automated Tax-Loss Harvesting Visual Explainer'
        ],
        gallery: [
          {
            url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
            caption: 'Real-time portfolio telemetry command center with asset allocation rings'
          },
          {
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
            caption: 'Multi-account net worth projection and automated tax-lot analyzer'
          },
          {
            url: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1000&q=80',
            caption: 'Mobile fractional trade ticket with instant margin impact indicators'
          }
        ],
        testimonial: {
          quote: 'Alex transformed our most complex trading workflows into an interface our users genuinely love opening every morning. Our Series C investors specifically praised the product polish.',
          author: 'David Chen',
          role: 'VP of Product, NovaPay Financial'
        },
        tags: ['Product Design', 'Design System', 'React Native', 'D3.js', 'Figma Tokens', 'Fintech'],
        liveUrl: 'https://portfoliocraft.io/showcase/alex'
      },
      {
        id: 'alex-p2',
        title: 'AI Canvas Creative Engine',
        category: 'Generative AI · Web Application',
        client: 'Kinetix AI Studio',
        role: 'Principal Product Designer',
        timeline: '14 Weeks (Jun – Sep 2025)',
        team: '1 Designer, 4 WebGL/TypeScript Engineers, 2 ML Researchers',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        summary: 'An infinite-canvas multiplayer web application allowing brand teams to chain generative AI models, non-destructive layers, and vector exports.',
        overview: 'Creative agencies were frustrated with chat-based prompt boxes that forced designers to generate images one by one without spatial context or brand consistency.\n\nWe designed Kinetix Canvas — a hardware-accelerated infinite 2D workspace where design teams wire visual style nodes, mask regions in real time, and collaborate with live multiplayer cursors.',
        challenge: 'Creative teams struggled with linear Discord-style prompt tools that lacked spatial organization, brand color locking, layer masking, and real-time multiplayer collaboration.',
        solution: 'Built a spatial node-graph canvas with WebGL viewport rendering, live multiplayer cursors, non-destructive style layers, and one-click SVG/Figma export.',
        impact: '85,000+ Active Creators · 60% Faster Campaign Delivery · 91 NPS Score',
        metrics: [
          { value: '85K+', label: 'Active Creators', detail: 'Onboarded within 90 days of public launch' },
          { value: '60%', label: 'Faster Production', detail: 'Average reduction in ad campaign iteration cycles' },
          { value: '60fps', label: 'Canvas Frame Rate', detail: 'Smooth WebGL zoom with 500+ high-res artboards' },
          { value: '91', label: 'Creator NPS', detail: 'Highest user satisfaction score in category' }
        ],
        process: [
          {
            phase: '01. Workflow Ethnography with Art Directors',
            detail: 'Observed 15 agency creative directors combining Midjourney, Photoshop, and Figma to identify friction in asset handoffs.'
          },
          {
            phase: '02. Node-Graph vs. Layer Stack Hybrid UI',
            detail: 'Invented a collapsible node connector system that feels as approachable as Figma frames while exposing deep diffusion controls on demand.'
          },
          {
            phase: '03. Multiplayer Presence & Comment Pins',
            detail: 'Designed contextual spatial annotations, live cursor chat, and side-by-side branch comparisons for client approval.'
          },
          {
            phase: '04. Direct Figma & SVG Bridge Plugin',
            detail: 'Shipped a companion Figma plugin enabling one-click transfer of generated vector layers and color palettes.'
          }
        ],
        deliverables: [
          'Infinite Spatial Canvas UX & Shortcut System',
          'Visual Diffusion Node Graph & Brand Seed Locker',
          'Real-time Multiplayer Presence & Review Mode',
          'Companion Figma Sync Plugin'
        ],
        gallery: [
          {
            url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
            caption: 'Infinite node-graph canvas with live style-transfer pipelines'
          },
          {
            url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1000&q=80',
            caption: 'Non-destructive inpainting brush and regional prompt inspector'
          },
          {
            url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=80',
            caption: 'Brand palette enforcement & multi-format campaign export drawer'
          }
        ],
        testimonial: {
          quote: 'Kinetix feels like the missing link between Figma and generative AI. Alex nailed the spatial ergonomics on the very first prototype.',
          author: 'Sora Takahashi',
          role: 'Co-Founder & CEO, Kinetix AI'
        },
        tags: ['Spatial UI', 'TypeScript', 'WebGL', 'Figma Plugin', 'Generative AI'],
        liveUrl: 'https://portfoliocraft.io/showcase/alex'
      },
      {
        id: 'alex-p3',
        title: 'Luxury E-Commerce Experience',
        category: 'E-Commerce · Brand & Motion',
        client: 'Maison Valmont Paris',
        role: 'Lead Digital Experience Designer',
        timeline: '12 Weeks (Oct – Dec 2025)',
        team: '2 Designers, 3 Next.js Engineers, 1 3D Technical Artist',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        summary: 'End-to-end UX architecture and editorial storefront for a European luxury house, raising mobile conversion by 42% and AOV by 28%.',
        overview: 'Maison Valmont sought to transform their slow, template-bound e-commerce store into a flagship digital flagship that mirrored the serenity and craftsmanship of their Paris atelier.\n\nWe blended cinematic scroll choreography, interactive 3D leather and hardware inspection, and an ultra-fast headless Shopify Plus checkout with Apple Pay express drawers.',
        challenge: 'Translating the tactile, high-touch flagship boutique experience into a fast, mobile-first digital storefront without sacrificing Core Web Vitals.',
        solution: 'Combined editorial lookbook storytelling with instant slide-over bag checkout, 60fps Framer Motion transitions, and interactive 3D garment inspection.',
        impact: '+42% Mobile Conversion · +28% Average Order Value · 1.1s LCP Load',
        metrics: [
          { value: '+42%', label: 'Mobile Conversion', detail: 'Driven by one-tap express bag & size concierge' },
          { value: '+28%', label: 'Avg Order Value', detail: 'Boosted by interactive "Complete the Look" styling' },
          { value: '1.1s', label: 'LCP Page Speed', detail: 'Edge-cached Next.js storefront across 35 countries' },
          { value: '-31%', label: 'Return Rate', detail: 'Reduced via interactive fit predictor & fabric zoom' }
        ],
        process: [
          {
            phase: '01. Boutique Mystery Shopping & Funnel Audit',
            detail: 'Analyzed how flagship stylists guide clients in-store and mapped those sensory touchpoints to digital micro-interactions.'
          },
          {
            phase: '02. Editorial Lookbook Commerce Architecture',
            detail: 'Designed shoppable runway chapters where every full-bleed photograph reveals hotspot garment cards without leaving the story.'
          },
          {
            phase: '03. 4K Macro Texture & 3D Turntable Viewer',
            detail: 'Integrated progressive WebGL textures allowing shoppers to inspect stitching, grain, and drape under studio lighting.'
          },
          {
            phase: '04. Frictionless Multi-Currency Express Checkout',
            detail: 'Streamlined checkout from 5 pages to a single slide-over drawer with localized duties, taxes, and concierge packaging options.'
          }
        ],
        deliverables: [
          'Headless Next.js + Shopify Plus Design System',
          'Interactive Shoppable Runway Lookbook Engine',
          '3D Product Turntable & Macro Texture Loupe',
          'Slide-Over Concierge Bag & Express Checkout'
        ],
        gallery: [
          {
            url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
            caption: 'Headless storefront architecture and responsive editorial grid'
          },
          {
            url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
            caption: 'Tactile product detail view with macro material inspection'
          },
          {
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
            caption: 'Global conversion telemetry and A/B checkout performance'
          }
        ],
        testimonial: {
          quote: 'Our online flagship now outsells our physical boutiques combined while maintaining the exact prestige our heritage demands.',
          author: 'Camille Laurent',
          role: 'Chief Digital Officer, Maison Valmont'
        },
        tags: ['Editorial UX', 'Next.js', 'Framer Motion', 'Shopify Plus', '3D Commerce'],
        liveUrl: 'https://portfoliocraft.io/showcase/alex'
      }
    ]
  },
  {
    handle: 'marcus',
    name: 'Marcus Vance',
    role: 'Full Stack Engineer & Cloud Architect',
    location: 'Austin, TX',
    experience: '6+ Years Experience',
    accentColor: '#10b981',
    secondaryColor: '#06b6d4',
    bgColor: '#040d0a',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    headline: 'High-Performance Cloud & Distributed Systems',
    bio: 'Full Stack Engineer & Cloud Architect specializing in distributed Node.js and Go microservices, real-time WebSocket protocols, and zero-downtime Kubernetes infrastructure.',
    quote: 'The visual editor saved me weeks of coding my site from scratch.',
    contact: {
      email: 'marcus.vance@cloudscale.dev',
      phone: '+1 (512) 640-9812',
      website: 'https://marcusvance.dev',
      location: 'Austin, TX (Downtown Tech Corridor)',
      timezone: 'CST (UTC-6)',
      availability: 'Open for Cloud Architecture Audits & Fractional CTO Engagements',
      responseTime: 'Usually responds within 2 hours',
      hourlyRate: '$190 – $250 / hr · Architecture Sprints Available',
      socials: [
        { label: 'GitHub', handle: '@mvance-cloud', url: 'https://github.com' },
        { label: 'LinkedIn', handle: 'in/marcusvance-eng', url: 'https://linkedin.com' },
        { label: 'X / Twitter', handle: '@marcusvancedev', url: 'https://x.com' },
        { label: 'StackOverflow', handle: 'top 0.5% Go/K8s', url: 'https://stackoverflow.com' }
      ]
    },
    stats: [
      { value: '99.99%', label: 'System Uptime' },
      { value: '50M+', label: 'Daily Events Processed' },
      { value: '45+', label: 'Systems Architected' },
      { value: '<18ms', label: 'P99 API Latency' }
    ],
    skills: [
      'Go (Golang) & Rust',
      'Node.js & TypeScript',
      'Kubernetes & Helm',
      'AWS / GCP & Terraform',
      'PostgreSQL, ClickHouse & Redis',
      'gRPC, GraphQL & WebSockets',
      'Distributed Tracing (OpenTelemetry)',
      'React & Next.js Dashboards'
    ],
    experienceTimeline: [
      {
        role: 'Principal Systems Architect',
        company: 'CloudScale Infrastructure',
        period: '2022 — Present',
        description: 'Architecting multi-region Kubernetes clusters and high-throughput telemetry pipelines handling 50M+ events/day with 99.99% SLA.'
      },
      {
        role: 'Senior Full Stack Engineer',
        company: 'StreamLine Core',
        period: '2020 — 2022',
        description: 'Built distributed WebSocket messaging relays supporting 100,000+ concurrent connections and sub-18ms global P99 latency.'
      },
      {
        role: 'Platform Infrastructure Engineer',
        company: 'DataForge Systems',
        period: '2018 — 2020',
        description: 'Automated multi-account AWS Terraform provisioning and CI/CD canary pipelines for 85 microservices.'
      }
    ],
    projects: [
      {
        id: 'marcus-p1',
        title: 'Cloud Infrastructure Portal',
        category: 'DevOps · Cloud Orchestration',
        client: 'CloudScale Enterprise',
        role: 'Lead Cloud Architect & Full Stack Tech Lead',
        timeline: '20 Weeks (Q1–Q2 2025)',
        team: '4 Go Backend Engineers, 2 SREs, 2 React Engineers',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
        summary: 'Automated multi-cloud Kubernetes cluster management control plane reducing provisioning time from 4 hours to 12 seconds.',
        overview: 'Enterprise platform teams across 14 product divisions were bottlenecked by manual ticket-driven cloud provisioning. Spinning up an isolated staging environment or production microservice required 4+ hours of manual Terraform PR reviews and IAM debugging.\n\nI architected an internal developer platform (IDP) written in Go and React that exposes golden-path infrastructure templates, live cluster topology maps, automated FinOps spot-instance rebalancing, and one-click canary rollbacks.',
        challenge: 'Engineering teams spent hours manually configuring Terraform modules, debugging cross-account IAM policies, and over-provisioning EC2/EKS nodes across AWS and GCP.',
        solution: 'Engineered a unified self-service Kubernetes control plane in Go & React with live eBPF service-mesh topology visualization, FinOps cost anomaly alerts, and instant GitOps rollback.',
        impact: '92% Faster Provisioning · $320K Annual Cloud Savings · Zero Unplanned Outages',
        metrics: [
          { value: '12 sec', label: 'Env Provisioning', detail: 'Down from 4.2 hours of manual DevOps ticket queues' },
          { value: '$320K', label: 'Annual AWS Savings', detail: 'Via automated spot-node bin-packing & idle reaper' },
          { value: '99.99%', label: 'Cluster Uptime', detail: 'Multi-AZ active-active failover across 3 regions' },
          { value: '240+', label: 'Daily Deploys', detail: 'Self-service zero-downtime canary deployments' }
        ],
        process: [
          {
            phase: '01. Infrastructure Audit & FinOps Telemetry',
            detail: 'Instrumented 18 production EKS clusters with OpenCost and Prometheus to identify 38% idle compute waste.'
          },
          {
            phase: '02. Declarative Go Operator & CRD Engine',
            detail: 'Wrote custom Kubernetes Operators in Go that reconcile application manifests, RDS databases, and Vault secrets automatically.'
          },
          {
            phase: '03. Real-time Service Mesh Topology Graph',
            detail: 'Built a React + WebGL topology canvas streaming live Cilium eBPF packet flows, HTTP error rates, and P99 latencies between pods.'
          },
          {
            phase: '04. Automated Canary & Chaos Verification',
            detail: 'Integrated Argo Rollouts with automated Prometheus metric gates that halt and revert bad deployments within 8 seconds.'
          }
        ],
        deliverables: [
          'Custom Kubernetes Go Operator & Terraform Engine',
          'Live eBPF Service Mesh Topology Visualizer',
          'Automated FinOps Cost Anomaly & Right-Sizing Daemon',
          'RBAC Self-Service Developer Portal & Audit Trail'
        ],
        gallery: [
          {
            url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
            caption: 'Multi-region Kubernetes cluster health & node utilization matrix'
          },
          {
            url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
            caption: 'Real-time FinOps cost attribution and spot-instance savings telemetry'
          },
          {
            url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
            caption: 'eBPF service mesh dependency graph with P99 latency heatmaps'
          }
        ],
        testimonial: {
          quote: 'Marcus single-handedly eliminated our DevOps provisioning backlog while cutting our AWS bill by over $26,000 a month.',
          author: 'Rajesh Patel',
          role: 'VP of Engineering, CloudScale Enterprise'
        },
        tags: ['Kubernetes', 'Go', 'Terraform', 'React', 'eBPF', 'AWS'],
        liveUrl: 'https://portfoliocraft.io/showcase/marcus'
      },
      {
        id: 'marcus-p2',
        title: 'Real-time Chat Protocol',
        category: 'Distributed Systems · WebSockets',
        client: 'StreamLine Core',
        role: 'Principal Distributed Systems Engineer',
        timeline: '16 Weeks (Q3 2025)',
        team: '3 Systems Engineers, 1 Security Cryptography Lead',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        summary: 'End-to-end encrypted WebSocket streaming engine supporting 100,000 concurrently connected clients with sub-18ms global latency.',
        overview: 'StreamLine needed a high-frequency collaborative messaging and presence bus capable of powering live financial trading rooms and multiplayer productivity apps without message drops during regional network partitions.\n\nWe engineered a horizontally scalable edge relay network using Go, Redis Streams, and Conflict-Free Replicated Data Types (CRDTs) with binary Protobuf framing.',
        challenge: 'Scaling stateful pub/sub connections across horizontal server nodes without message drop, split-brain state corruption, or garbage-collection latency spikes.',
        solution: 'Implemented a custom Go epoll WebSocket gateway backed by Redis Streams, CRDT state synchronization, automatic edge failover, and LZ4 binary protocol compression.',
        impact: '100K+ Concurrent Users/Node · <18ms Global P99 Latency · 68% Bandwidth Reduction',
        metrics: [
          { value: '100K+', label: 'Connections / Node', detail: 'Zero-copy epoll socket handling in 1.4GB RAM' },
          { value: '<18ms', label: 'Global P99 Latency', detail: 'Edge-routed across 9 global Anycast PoPs' },
          { value: '-68%', label: 'Payload Size', detail: 'Achieved via Protobuf framing + LZ4 compression' },
          { value: '100%', label: 'Message Delivery', detail: 'Guaranteed exactly-once replay via sequence cursors' }
        ],
        process: [
          {
            phase: '01. Kernel Tuning & Zero-Copy Socket Architecture',
            detail: 'Replaced standard HTTP upgraded goroutines with a custom netpoll event loop, cutting per-connection memory overhead by 74%.'
          },
          {
            phase: '02. CRDT Offline-First State Convergence',
            detail: 'Designed a hybrid logical clock (HLC) and Yjs-compatible CRDT layer so reconnecting mobile clients merge edits deterministically.'
          },
          {
            phase: '03. End-to-End Double Ratchet Encryption',
            detail: 'Implemented client-side WebCrypto X25519 key exchange so edge relays route ciphertext with zero knowledge of payload contents.'
          },
          {
            phase: '04. Distributed Load Testing at 1M Connections',
            detail: 'Orchestrated a 50-node k6 chaos cluster simulating flaky cellular handoffs and sudden regional node termination.'
          }
        ],
        deliverables: [
          'High-Throughput Go Netpoll WebSocket Gateway',
          'CRDT Conflict-Free Synchronization SDK (TypeScript)',
          'End-to-End WebCrypto Double-Ratchet Security Layer',
          'Grafana Real-Time Socket Telemetry Dashboard'
        ],
        gallery: [
          {
            url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
            caption: 'Global Anycast edge relay routing and P99 latency distribution'
          },
          {
            url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1000&q=80',
            caption: 'Protobuf binary wire protocol inspector and CRDT vector clock tree'
          },
          {
            url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
            caption: '1,000,000 concurrent socket load test benchmark in Grafana'
          }
        ],
        testimonial: {
          quote: 'Our latency dropped from 140ms to 16ms overnight, and our infrastructure footprint shrank by half. World-class systems engineering.',
          author: 'Elena Kovic',
          role: 'CTO, StreamLine Core'
        },
        tags: ['WebSockets', 'Go', 'Redis Streams', 'CRDTs', 'Protobuf', 'TypeScript'],
        liveUrl: 'https://portfoliocraft.io/showcase/marcus'
      },
      {
        id: 'marcus-p3',
        title: 'Developer CLI Analytics',
        category: 'Developer Tools · Telemetry',
        client: 'TracePulse DevTools',
        role: 'Creator & Lead Systems Engineer',
        timeline: '14 Weeks (Q4 2025)',
        team: '2 Rust/Go Engineers, 1 Frontend Engineer',
        image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
        summary: 'High-speed CLI and ClickHouse observability engine processing over 50 million build, test, and runtime log events per day.',
        overview: 'Modern monorepos generate terabytes of unstructured CI/CD and container logs daily, yet developers still waste hours grepping raw text files when a flaky integration test or microservice deploy fails.\n\nWe built TracePulse — a zero-config CLI binary and ClickHouse ingestion engine that parses, indexes, and correlates distributed OpenTelemetry traces and build logs in under 80 milliseconds.',
        challenge: 'CI/CD bottlenecks and flaky test regressions were hidden inside millions of unstructured log lines across thousands of daily microservice builds.',
        solution: 'Created a lightweight Go/Rust CLI daemon paired with a columnar ClickHouse analytics engine and keyboard-first TUI/Web trace inspector.',
        impact: '50M+ Daily Logs Indexed · 3.4x Faster CI Debugging · 12,000+ GitHub Stars',
        metrics: [
          { value: '50M+', label: 'Daily Events', detail: 'Ingested with sub-second columnar compression' },
          { value: '75ms', label: 'Query Latency', detail: 'Full-text regex search across 30 days of logs' },
          { value: '3.4x', label: 'Faster Triage', detail: 'Mean time to resolution (MTTR) for CI failures' },
          { value: '12.4K', label: 'GitHub Stars', detail: 'Adopted by 400+ engineering organizations' }
        ],
        process: [
          {
            phase: '01. Lock-Free Ring Buffer CLI Collector',
            detail: 'Engineered a cross-platform CLI wrapper that captures stdout/stderr and OpenTelemetry spans with <0.3% CPU overhead.'
          },
          {
            phase: '02. ClickHouse Columnar Schema Optimization',
            detail: 'Designed ZSTD-compressed materialized views and bloom-filter indices reducing storage costs by 82% compared to Elasticsearch.'
          },
          {
            phase: '03. Automated Flaky Test & Anomaly Detector',
            detail: 'Built statistical regression Fingerprinting that automatically groups identical stack traces and flags newly introduced slowdowns.'
          },
          {
            phase: '04. Keyboard-First Web & Terminal Flamegraphs',
            detail: 'Shipped both a terminal UI (BubbleTea) and a React web flamegraph viewer for instant span waterfall inspection.'
          }
        ],
        deliverables: [
          'Cross-Platform CLI Binary (macOS, Linux, Windows)',
          'ClickHouse High-Throughput Ingestion Pipeline',
          'Interactive Flamegraph & Span Waterfall Viewer',
          'GitHub Actions & GitLab CI Native Integration'
        ],
        gallery: [
          {
            url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1000&q=80',
            caption: 'CLI trace waterfall and build bottleneck flamegraph inspector'
          },
          {
            url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
            caption: 'ClickHouse query performance and log fingerprint clustering'
          },
          {
            url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
            caption: 'Real-time CI/CD flaky test radar and regression alerts'
          }
        ],
        testimonial: {
          quote: 'We replaced a $14,000/month logging vendor with Marcus’s ClickHouse pipeline and got 10x faster search speeds.',
          author: 'Liam O’Connor',
          role: 'Head of Platform, Velocity Labs'
        },
        tags: ['Go', 'Rust', 'ClickHouse', 'OpenTelemetry', 'Docker', 'CLI'],
        liveUrl: 'https://portfoliocraft.io/showcase/marcus'
      }
    ]
  },
  {
    handle: 'elena',
    name: 'Elena Rostova',
    role: 'Creative Director & Brand Strategist',
    location: 'London, UK',
    experience: '10+ Years Experience',
    accentColor: '#f43f5e',
    secondaryColor: '#f59e0b',
    bgColor: '#0d0609',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    headline: 'Defining Visual Identities for World-Class Brands',
    bio: 'Creative Director with a decade of expertise directing global brand campaigns, editorial publications, and immersive 3D digital exhibitions across London, Paris, and New York.',
    quote: 'Clients constantly compliment the smooth micro-animations and typography.',
    contact: {
      email: 'elena@atelierrostova.co.uk',
      phone: '+44 20 7946 0921',
      website: 'https://atelierrostova.co.uk',
      location: 'Shoreditch High St, London, UK',
      timezone: 'BST / GMT (UTC+1)',
      availability: 'Booking Q4 Brand Identity & Creative Direction Commissions',
      responseTime: 'Usually responds within 6 hours',
      hourlyRate: '$210 – $280 / hr · Full Brand Sprints from $18k',
      socials: [
        { label: 'Behance', handle: '@atelierrostova', url: 'https://behance.net' },
        { label: 'Instagram', handle: '@elena.rostova.art', url: 'https://instagram.com' },
        { label: 'LinkedIn', handle: 'in/elenarostova-cd', url: 'https://linkedin.com' },
        { label: 'Awwwards', handle: 'Jury Member 2025–26', url: 'https://awwwards.com' }
      ]
    },
    stats: [
      { value: '14', label: 'International Design Awards' },
      { value: '60+', label: 'Global Brand Launches' },
      { value: '10 Yrs', label: 'Creative Direction' },
      { value: '500K+', label: 'Exhibition Visitors' }
    ],
    skills: [
      'Executive Creative Direction',
      'Global Brand Identity Systems',
      'Bespoke & Variable Typography',
      '3D Art Direction (Cinema4D / Octane)',
      'Editorial & Print Architecture',
      'WebGL Scrollytelling Direction',
      'Luxury Packaging & Spatial Retail',
      ' Sonic & Motion Branding'
    ],
    experienceTimeline: [
      {
        role: 'Founder & Executive Creative Director',
        company: 'Atelier Rostova London',
        period: '2021 — Present',
        description: 'Leading a multidisciplinary studio of 14 designers, 3D artists, and typographers crafting iconic brand worlds for cultural and luxury leaders.'
      },
      {
        role: 'Design Director',
        company: 'Monolith Creative Agency',
        period: '2017 — 2021',
        description: 'Directed global rebrands, custom typefaces, and digital flagships for European museums, architecture biennales, and fashion houses.'
      },
      {
        role: 'Senior Art Director',
        company: 'Studio Nord Paris',
        period: '2015 — 2017',
        description: 'Spearheaded editorial print direction, exhibition catalogs, and kinetic identity systems across Paris and Milan.'
      }
    ],
    projects: [
      {
        id: 'elena-p1',
        title: 'Global Brand Identity System',
        category: 'Brand Identity · Design Language',
        client: 'Aethelgard Cultural Foundation (Zurich & London)',
        role: 'Executive Creative Director',
        timeline: '22 Weeks (Jan – Jun 2025)',
        team: '3 Brand Designers, 2 Type Foundry Collaborators, 2 Motion Designers',
        image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
        summary: 'Comprehensive visual rebranding, bespoke variable serif typeface, and kinetic motion guidelines across 28 international markets.',
        overview: 'Following the merger of three European contemporary art and architecture foundations, Aethelgard needed a cohesive brand architecture capable of flexing from monumental museum signage in Zurich to generative social campaigns and bilingual digital publications.\n\nWe crafted a living identity system anchored by "Aethelgard Serif" — a custom optical-size variable typeface whose stroke contrast responds dynamically to ambient sound and scroll velocity.',
        challenge: 'Unifying a fragmented global brand presence across 6 sub-brands, digital products, physical museum spaces, and broadcast media in 28 countries.',
        solution: 'Crafted a kinetic identity system anchored by a bespoke variable serif typeface, generative architectural grid rules, and an interactive online brand portal.',
        impact: 'Red Dot Best of the Best · +65% Unprompted Brand Recall · 28 Global Markets Unified',
        metrics: [
          { value: '+65%', label: 'Brand Recall', detail: 'Measured across post-launch international audience surveys' },
          { value: '28', label: 'Global Markets', detail: 'Rolled out across physical venues & digital platforms' },
          { value: '4 Axes', label: 'Custom Variable Font', detail: 'Weight, Optical Size, Italic & Contrast axes' },
          { value: 'Red Dot', label: 'Best of the Best', detail: '2025 Brand & Communication Design Winner' }
        ],
        process: [
          {
            phase: '01. Cultural Semiotics & Archival Research',
            detail: 'Immersed in 70 years of Swiss typographic posters and brutalist museum architecture to establish a timeless strategic foundation.'
          },
          {
            phase: '02. Bespoke Variable Typeface Engineering',
            detail: 'Co-designed a 540-glyph variable serif family supporting Latin, Cyrillic, and Greek scripts with razor-sharp editorial terminals.'
          },
          {
            phase: '03. Generative Motion & Spatial Wayfinding',
            detail: 'Developed procedural After Effects & WebGL shaders that drive lobby LED walls, exhibition titles, and social templates.'
          },
          {
            phase: '04. Interactive Living Brand Book',
            detail: 'Replaced static 200-page PDFs with a live web-based design system portal featuring instant asset generators for regional teams.'
          }
        ],
        deliverables: [
          'Bespoke Multi-Script Variable Typeface ("Aethelgard Serif")',
          'Global Brand Architecture & Sub-Brand Lockup System',
          'Procedural Motion & Broadcast Title Toolkit',
          'Interactive Web Brand Guidelines & Environmental Wayfinding'
        ],
        gallery: [
          {
            url: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1000&q=80',
            caption: 'Core visual identity system, color chroma tokens, and typographic specimens'
          },
          {
            url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80',
            caption: 'Exhibition catalog print system and Swiss grid layout proportions'
          },
          {
            url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
            caption: 'Environmental museum wayfinding and large-format architectural banners'
          }
        ],
        testimonial: {
          quote: 'Elena gave our institution a visual voice that feels simultaneously museum-worthy and radically contemporary. Every international chapter adopted the system effortlessly.',
          author: 'Dr. Henrik Lindqvist',
          role: 'Director General, Aethelgard Foundation'
        },
        tags: ['Brand Strategy', 'Variable Typography', 'Motion Design', 'Wayfinding', 'Identity System'],
        liveUrl: 'https://portfoliocraft.io/showcase/elena'
      },
      {
        id: 'elena-p2',
        title: 'Editorial Design Magazine',
        category: 'Editorial · Digital & Print',
        client: 'MONOLITH Quarterly (London / Milan)',
        role: 'Creative Director & Editorial Architect',
        timeline: '16 Weeks (Jul – Oct 2025)',
        team: '2 Editorial Designers, 2 Creative Technologists, 1 Print Production Lead',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
        summary: 'Art direction, tactile print monograph, and interactive digital edition for an acclaimed quarterly architecture and contemporary culture journal.',
        overview: 'MONOLITH Quarterly wanted to bridge the divide between their collector-grade 240-page print anthology and their digital readership without resorting to generic blog templates.\n\nWe art-directed both the physical Embossed Linen Edition and an award-winning interactive web publication featuring synchronized audio essays, architectural blueprint loupes, and fluid editorial scrollytelling.',
        challenge: 'Preserving the poise, pacing, and typographic nuance of fine print publishing within an interactive browser experience across desktop and tablet.',
        solution: 'Designed an asymmetric 12-column Swiss grid system with fluid scrollytelling, 8K zoomable architectural plates, footnote marginalia drawers, and spatial audio interviews.',
        impact: '180K Paid Digital Subscribers · Awwwards Site of the Month · 94% Print Sell-Through',
        metrics: [
          { value: '180K', label: 'Paid Subscribers', detail: '+115% digital subscription growth in 2 quarters' },
          { value: '14.2m', label: 'Avg Session Time', detail: 'Industry-leading deep reading engagement' },
          { value: '94%', label: 'Print Sell-Through', detail: 'Limited 25,000 hardbound linen print run' },
          { value: 'SOTM', label: 'Awwwards Winner', detail: 'Voted Site of the Month & FWA Winner' }
        ],
        process: [
          {
            phase: '01. Editorial Pacing & Dual-Medium Grid System',
            detail: 'Created a unified proportional grid that translates seamlessly between 240x320mm uncoated paper signatures and responsive CSS Grid viewports.'
          },
          {
            phase: '02. Bespoke Footnote & Marginalia Mechanics',
            detail: 'Engineered interactive side-column scholar notes, expandable architectural floorplans, and inline citation previews.'
          },
          {
            phase: '03. Synchronized Ambient Audio Essays',
            detail: 'Produced studio-recorded architect conversations with word-by-word transcript highlighting and ambient acoustic soundscapes.'
          },
          {
            phase: '04. Tactile Print Finishing & Foil Production',
            detail: 'Supervised stochastic offset printing in Milan using three Pantone spot inks, blind debossing, and exposed Smyth-sewn bindings.'
          }
        ],
        deliverables: [
          '240-Page Hardbound Print Monograph Art Direction',
          'Interactive Scrollytelling Digital Edition',
          'Synchronized Audio Essay Player & Transcript Engine',
          'High-Resolution Architectural Blueprint Inspector'
        ],
        gallery: [
          {
            url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80',
            caption: 'Hardbound print spread and asymmetric editorial typography hierarchy'
          },
          {
            url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1000&q=80',
            caption: 'Interactive digital monograph with marginalia & audio transcript sync'
          },
          {
            url: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1000&q=80',
            caption: 'Bespoke essay openers and kinetic chapter transitions'
          }
        ],
        testimonial: {
          quote: 'Elena elevated MONOLITH from an independent architecture journal into a global design object coveted by collectors and digital subscribers alike.',
          author: 'Marco Bellini',
          role: 'Editor-in-Chief, MONOLITH Quarterly'
        },
        tags: ['Editorial Design', 'Art Direction', 'Typography', 'Print Production', 'Scrollytelling'],
        liveUrl: 'https://portfoliocraft.io/showcase/elena'
      },
      {
        id: 'elena-p3',
        title: 'Interactive 3D Art Exhibition',
        category: 'Spatial Web · 3D Exhibition',
        client: 'Tate & Lumina Digital Biennale',
        role: 'Creative Director & Spatial Experience Lead',
        timeline: '18 Weeks (Sep – Dec 2025)',
        team: '3 3D Environment Artists, 2 Three.js/GLSL Engineers, 1 Sound Designer',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
        summary: 'Immersive WebGL virtual museum experience attracting over 500,000 global visitors with 60fps real-time raymarched lighting and spatial audio.',
        overview: 'Commissioned for the Lumina Digital Biennale, this virtual pavilion invited global audiences to explore 18 monumental digital sculptures and generative light installations inside a brutalist subterranean concrete gallery rendered entirely in the browser.\n\nVisitors navigate effortlessly through four atmospheric chambers featuring real-time reflections, reactive spatial soundscapes, and curatorial director commentary.',
        challenge: 'Creating a museum-grade spatial 3D exhibition accessible instantly in desktop and mobile browsers without multi-gigabyte app downloads or frame drops.',
        solution: 'Collaborated with GLSL shader artists to build KTX2-compressed octree lightmaps, instanced architectural geometry, and WebAudio HRTF spatial commentary.',
        impact: '500K+ Virtual Visitors · FWA of the Day · 18.5 Min Average Exhibition Visit',
        metrics: [
          { value: '500K+', label: 'Global Visitors', detail: 'Across 112 countries during opening quarter' },
          { value: '18.5m', label: 'Avg Dwell Time', detail: '3.8x longer than standard museum websites' },
          { value: '60fps', label: 'Mobile WebGL', detail: 'Adaptive resolution scaling on iOS & Android' },
          { value: 'FWA', label: 'Of The Day', detail: 'Honored for WebGL Innovation & Art Direction' }
        ],
        process: [
          {
            phase: '01. Architectural Curatorial Spatial Planning',
            detail: 'Designed a four-wing subterranean concrete & water pavilion in Blender and Cinema4D tailored to guide visitor sightlines naturally.'
          },
          {
            phase: '02. Octane Lightmap Baking & KTX2 Compression',
            detail: 'Baked global illumination into ultra-compact GPU textures, reducing initial scene download size from 180MB to 8.4MB.'
          },
          {
            phase: '03. Custom GLSL Water & Caustics Shaders',
            detail: 'Authored real-time planar reflections and procedural light caustics that react to visitor movement and artwork proximity.'
          },
          {
            phase: '04. Binaural Spatial Audio & Curatorial Tour',
            detail: 'Positioned 360-degree binaural audio stems and voiceover triggers that crossfade organically as visitors walk between sculptures.'
          }
        ],
        deliverables: [
          '4-Wing Architectural 3D Pavilion (Cinema4D & Three.js)',
          'Custom GLSL Caustics & Real-Time Reflection Shaders',
          'Binaural WebAudio Soundscape & Curatorial Audio Guide',
          'Interactive Exhibition Catalog & Collectible Mint Pass'
        ],
        gallery: [
          {
            url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
            caption: 'Main subterranean atrium with real-time water reflections and light sculptures'
          },
          {
            url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
            caption: 'Generative shader installation chamber with interactive audio reactivity'
          },
          {
            url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
            caption: 'Curatorial plaque overlay and 360-degree sculpture inspection mode'
          }
        ],
        testimonial: {
          quote: 'Elena and her studio redefined what a digital museum exhibition can feel like. Half a million visitors experienced our biennale without a single ticket barrier.',
          author: 'Claire Vance-Sterling',
          role: 'Chief Curator, Lumina Digital Biennale'
        },
        tags: ['Three.js', 'GLSL Shaders', '3D Art Direction', 'Spatial Audio', 'Curatorial'],
        liveUrl: 'https://portfoliocraft.io/showcase/elena'
      }
    ]
  }
];

export function getShowcaseCreator(handle = '') {
  const clean = handle.toLowerCase().trim();
  if (clean === 'demo' || clean === 'marcus') return SHOWCASE_CREATORS[1];
  if (clean === 'sample' || clean === 'elena') return SHOWCASE_CREATORS[2];
  if (clean === 'alex') return SHOWCASE_CREATORS[0];
  return SHOWCASE_CREATORS.find((c) => c.handle === clean) || null;
}
