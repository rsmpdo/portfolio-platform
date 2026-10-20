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
    stats: [
      { value: '7+', label: 'Years Experience' },
      { value: '50+', label: 'Products Shipped' },
      { value: '35+', label: 'Global Clients' },
      { value: '3.2M', label: 'Daily Active Users' }
    ],
    skills: ['Product Strategy', 'Design Systems', 'Figma & Prototyping', 'React & Next.js', 'Tailwind CSS', 'Motion & Micro-Interactions'],
    experienceTimeline: [
      {
        role: 'Lead Product Designer',
        company: 'Verve Digital Studio',
        period: '2022 — Present',
        description: 'Directing design strategy and multi-brand design systems across 12 flagship SaaS and fintech product lines.'
      },
      {
        role: 'Senior UI/UX Designer',
        company: 'NovaPay Financial',
        period: '2019 — 2022',
        description: 'Spearheaded the mobile banking redesign serving 200K+ active investors, boosting retention by 34%.'
      }
    ],
    projects: [
      {
        id: 'alex-p1',
        title: 'Fintech Mobile Dashboard',
        category: 'Fintech · Mobile & Web UI',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
        summary: 'Redesigned the core wealth management platform for 200,000+ active investors, increasing daily retention by 34%.',
        challenge: 'Legacy wealth management dashboards overwhelmed retail investors with dense tables and fragmented portfolio analytics.',
        solution: 'Designed a modular card-based telemetry interface with real-time asset allocation rings, instant trade execution, and dark-mode accessibility.',
        impact: '+34% Daily Retention · 4.9★ App Store Rating · $1.4B Assets Tracked',
        tags: ['Product Design', 'Design System', 'React Native', 'D3.js'],
        liveUrl: 'https://portfoliocraft.io/showcase/alex'
      },
      {
        id: 'alex-p2',
        title: 'AI Canvas Creative Engine',
        category: 'Generative AI · Web Application',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
        summary: 'An intuitive infinite-canvas web application allowing design teams to generate and iterate on brand assets powered by AI.',
        challenge: 'Creative teams struggled with prompt-based AI tools that lacked spatial organization and real-time multiplayer collaboration.',
        solution: 'Built a spatial node-graph canvas with live multiplayer cursors, non-destructive style layers, and one-click vector export.',
        impact: '85,000+ Active Creators · 60% Faster Campaign Delivery',
        tags: ['Spatial UI', 'TypeScript', 'WebGL', 'Figma Plugin'],
        liveUrl: 'https://portfoliocraft.io/showcase/alex'
      },
      {
        id: 'alex-p3',
        title: 'Luxury E-Commerce Experience',
        category: 'E-Commerce · Brand & Motion',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
        summary: 'End-to-end UX architecture and editorial storefront for a European luxury house, raising mobile conversion by 42%.',
        challenge: 'Translating the tactile, high-touch flagship boutique experience into a fast, mobile-first digital storefront.',
        solution: 'Combined editorial lookbook storytelling with instant drawer checkout, 60fps micro-transitions, and 3D garment inspection.',
        impact: '+42% Mobile Conversion · 1.2s Page Load Time',
        tags: ['Editorial UX', 'Next.js', 'Framer Motion', 'Shopify Plus'],
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
    stats: [
      { value: '99.99%', label: 'System Uptime' },
      { value: '50M+', label: 'Daily Events Processed' },
      { value: '45+', label: 'Systems Architected' },
      { value: '<18ms', label: 'P99 API Latency' }
    ],
    skills: ['Node.js & Go', 'Kubernetes & Docker', 'AWS & Terraform', 'PostgreSQL & Redis', 'GraphQL & gRPC', 'React & TypeScript'],
    experienceTimeline: [
      {
        role: 'Principal Systems Architect',
        company: 'CloudScale Infrastructure',
        period: '2022 — Present',
        description: 'Architecting multi-region Kubernetes clusters and high-throughput telemetry pipelines handling 50M+ events/day.'
      },
      {
        role: 'Senior Full Stack Engineer',
        company: 'StreamLine Core',
        period: '2020 — 2022',
        description: 'Built distributed WebSocket messaging relays supporting 100,000+ concurrent connections.'
      }
    ],
    projects: [
      {
        id: 'marcus-p1',
        title: 'Cloud Infrastructure Portal',
        category: 'DevOps · Cloud Orchestration',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
        summary: 'Automated Kubernetes cluster management dashboard reducing cloud provisioning time from hours to 12 seconds.',
        challenge: 'Engineering teams spent hours manually configuring Terraform modules and debugging IAM policies across AWS and GCP.',
        solution: 'Engineered a unified self-service control plane with live topology visualization, automated cost anomaly alerts, and one-click rollback.',
        impact: '92% Faster Provisioning · $320K Annual Cloud Savings',
        tags: ['Kubernetes', 'Go', 'Terraform', 'React'],
        liveUrl: 'https://portfoliocraft.io/showcase/marcus'
      },
      {
        id: 'marcus-p2',
        title: 'Real-time Chat Protocol',
        category: 'Distributed Systems · WebSockets',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
        summary: 'End-to-end encrypted WebSocket streaming engine supporting 100,000 concurrently connected clients with sub-20ms latency.',
        challenge: 'Scaling stateful pub/sub connections across horizontal server nodes without message drop or latency spikes.',
        solution: 'Implemented a custom Redis Streams & CRDT synchronization layer with automatic edge failover and binary protocol compression.',
        impact: '100K+ Concurrent Users · <18ms Global Latency',
        tags: ['WebSockets', 'Redis Streams', 'TypeScript', 'Node.js'],
        liveUrl: 'https://portfoliocraft.io/showcase/marcus'
      },
      {
        id: 'marcus-p3',
        title: 'Developer CLI Analytics',
        category: 'Developer Tools · Telemetry',
        image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1000&q=80',
        summary: 'High-speed CLI and observability engine processing over 50 million build and runtime log events per day.',
        challenge: 'CI/CD bottlenecks were hidden inside unstructured logs across thousands of daily microservice deployments.',
        solution: 'Created a zero-config Rust/Go CLI agent paired with a real-time ClickHouse analytics dashboard for instant trace inspection.',
        impact: '50M+ Daily Logs · 3.4x Faster CI Debugging',
        tags: ['Go', 'ClickHouse', 'Docker', 'CLI'],
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
    stats: [
      { value: '14', label: 'International Design Awards' },
      { value: '60+', label: 'Global Brand Launches' },
      { value: '10 Yrs', label: 'Creative Direction' },
      { value: '500K+', label: 'Exhibition Visitors' }
    ],
    skills: ['Creative Direction', 'Brand Identity', 'Editorial Typography', '3D Art Direction', 'Motion Campaigns', 'Luxury Packaging'],
    experienceTimeline: [
      {
        role: 'Founder & Executive Creative Director',
        company: 'Atelier Rostova London',
        period: '2021 — Present',
        description: 'Leading a multidisciplinary studio of 14 designers, 3D artists, and typographers crafting iconic brand worlds.'
      },
      {
        role: 'Design Director',
        company: 'Monolith Creative Agency',
        period: '2017 — 2021',
        description: 'Directed global rebrands and digital flagships for cultural institutions and luxury fashion houses.'
      }
    ],
    projects: [
      {
        id: 'elena-p1',
        title: 'Global Brand Identity System',
        category: 'Brand Identity · Design Language',
        image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1000&q=80',
        summary: 'Comprehensive visual rebranding, bespoke variable typeface, and motion guidelines across 28 international markets.',
        challenge: 'Unifying a fragmented global brand presence across digital products, physical retail spaces, and broadcast media.',
        solution: 'Crafted a kinetic identity system anchored by a custom variable serif typeface and generative color palettes.',
        impact: 'Red Dot Best of the Best · +65% Brand Recall',
        tags: ['Brand Strategy', 'Typography', 'Motion Design', 'Identity'],
        liveUrl: 'https://portfoliocraft.io/showcase/elena'
      },
      {
        id: 'elena-p2',
        title: 'Editorial Design Magazine',
        category: 'Editorial · Digital & Print',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80',
        summary: 'Art direction and interactive digital edition for an acclaimed quarterly architecture and contemporary culture journal.',
        challenge: 'Preserving the poise and typographic nuance of fine print publishing within an interactive browser experience.',
        solution: 'Designed an asymmetric grid system with fluid scrollytelling, high-resolution zoomable plates, and audio essays.',
        impact: '180K Digital Subscribers · Awwwards Site of the Month',
        tags: ['Editorial Design', 'Art Direction', 'Typography', 'WebGL'],
        liveUrl: 'https://portfoliocraft.io/showcase/elena'
      },
      {
        id: 'elena-p3',
        title: 'Interactive 3D Art Exhibition',
        category: 'Spatial Web · 3D Exhibition',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
        summary: 'Immersive WebGL virtual museum experience attracting over 500,000 global visitors during its opening quarter.',
        challenge: 'Creating a museum-grade spatial exhibition accessible on both desktop browsers and mobile devices without frame drops.',
        solution: 'Collaborated with 3D shader artists to build baked-lighting architectural galleries with spatial audio commentary.',
        impact: '500K+ Virtual Visitors · FWA of the Day',
        tags: ['Three.js', '3D Direction', 'Spatial Audio', 'Curatorial'],
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
