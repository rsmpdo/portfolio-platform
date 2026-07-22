export const ALEX_PORTFOLIO = {
  title: "Alex Morgan — Senior Product Designer & Creative Technologist",
  handle: "alex",
  theme: { primaryColor: "#6366f1", secondaryColor: "#a855f7" },
  components: [
    {
      id: "hero_alex",
      type: "HeroBanner",
      title: "Hero Section",
      order: 0,
      isVisible: true,
      props: {
        headline: "Crafting Digital Products People Love to Use",
        subheadline: "Senior Product Designer & Creative Technologist with 7+ years transforming complex enterprise software into sleek, accessible user experiences.",
        ctaText: "Explore Selected Work",
        ctaLink: "#projects",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
        githubUrl: "https://github.com",
        linkedinUrl: "https://linkedin.com",
        twitterUrl: "https://twitter.com",
        availableForWork: true
      }
    },
    {
      id: "about_alex",
      type: "AboutMe",
      title: "About Me",
      order: 1,
      isVisible: true,
      props: {
        heading: "Obsessed with Details, Focused on Impact",
        bio: "Over the past 7 years, I've worked with Y-Combinator startups, fintech unicorns, and global agencies to design and ship products used by millions worldwide.",
        skills: ["Product Design", "React & Next.js", "Design Systems", "UI/UX Research", "Figma", "Micro-Animations"],
        experienceYears: "7+",
        completedProjects: "50+",
        happyClients: "35+"
      }
    },
    {
      id: "projects_alex",
      type: "ProjectsGrid",
      title: "Selected Projects",
      order: 2,
      isVisible: true,
      props: {
        heading: "Featured Design Case Studies",
        subheading: "A look at recent mobile & web platforms I've designed and engineered.",
        items: [
          {
            id: "p1",
            title: "Fintech Mobile Dashboard",
            description: "Redesigned the core wealth management platform for 200,000 active investors, increasing daily retention by 34%.",
            imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            tags: ["Product Design", "React", "Tailwind CSS"],
            githubUrl: "https://github.com",
            liveUrl: "https://example.com"
          },
          {
            id: "p2",
            title: "AI Canvas Creative Engine",
            description: "An intuitive web canvas interface allowing design teams to generate and iterate on brand assets powered by AI.",
            imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
            tags: ["Full Stack", "TypeScript", "Node.js"],
            githubUrl: "https://github.com",
            liveUrl: "https://example.com"
          },
          {
            id: "p3",
            title: "Luxury E-Commerce Experience",
            description: "End-to-end UX architecture for luxury brand catalog, raising mobile conversion rate by 42%.",
            imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
            tags: ["UI/UX", "Next.js", "GraphQL"],
            githubUrl: "https://github.com",
            liveUrl: "https://example.com"
          }
        ]
      }
    },
    {
      id: "exp_alex",
      type: "ExperienceTimeline",
      title: "Experience",
      order: 3,
      isVisible: true,
      props: {
        heading: "Professional Experience",
        items: [
          {
            id: "e1",
            role: "Lead Product Designer",
            company: "Verve Digital Studio",
            period: "2022 — Present",
            description: "Directing design strategy across 12 core product lines.",
            highlights: ["Design Systems", "Team Leadership", "Product Strategy"]
          }
        ]
      }
    },
    {
      id: "contact_alex",
      type: "ContactSection",
      title: "Contact Section",
      order: 4,
      isVisible: true,
      props: {
        heading: "Let's Build Something Great Together",
        email: "alex.morgan@example.com",
        location: "San Francisco, CA · Remote",
        responseTime: "Responds within 24 hours"
      }
    }
  ]
};

export const MARCUS_PORTFOLIO = {
  title: "Marcus Vance — Full Stack Engineer & Cloud Architect",
  handle: "demo",
  theme: { primaryColor: "#10b981", secondaryColor: "#3b82f6" },
  components: [
    {
      id: "hero_marcus",
      type: "HeroBanner",
      title: "Hero Section",
      order: 0,
      isVisible: true,
      props: {
        headline: "High-Performance Cloud & Backend Systems",
        subheadline: "Full Stack Engineer & Cloud Architect specializing in distributed Node.js microservices, GraphQL APIs, and real-time WebSockets.",
        ctaText: "View Code & Architecture",
        ctaLink: "#projects",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
        githubUrl: "https://github.com",
        linkedinUrl: "https://linkedin.com",
        twitterUrl: "https://twitter.com",
        availableForWork: true
      }
    },
    {
      id: "about_marcus",
      type: "AboutMe",
      title: "About Me",
      order: 1,
      isVisible: true,
      props: {
        heading: "Engineered for Speed, Reliability & Scale",
        bio: "I build robust backend infrastructure and high-throughput web applications. Passionate about clean code, automated testing, and CI/CD deployment pipelines.",
        skills: ["Node.js & Express", "TypeScript", "Docker & AWS", "MongoDB & Redis", "GraphQL", "CI/CD Pipelines"],
        experienceYears: "6+",
        completedProjects: "45+",
        happyClients: "28+"
      }
    },
    {
      id: "projects_marcus",
      type: "ProjectsGrid",
      title: "Selected Engineering Work",
      order: 2,
      isVisible: true,
      props: {
        heading: "Backend & Systems Projects",
        subheading: "High-throughput cloud architecture and real-time distributed platforms.",
        items: [
          {
            id: "mp1",
            title: "Cloud Infrastructure Portal",
            description: "Automated Kubernetes cluster management dashboard reducing provisioning time from hours to seconds.",
            imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
            tags: ["Docker", "Kubernetes", "Node.js"],
            githubUrl: "https://github.com",
            liveUrl: "https://example.com"
          },
          {
            id: "mp2",
            title: "Real-time Messaging Protocol",
            description: "WebSocket streaming server supporting 100,000 concurrently connected clients with sub-20ms latency.",
            imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
            tags: ["WebSockets", "Redis", "TypeScript"],
            githubUrl: "https://github.com",
            liveUrl: "https://example.com"
          },
          {
            id: "mp3",
            title: "Developer CLI & Analytics Engine",
            description: "Distributed telemetry engine processing over 50 million log events per day for dev teams.",
            imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80",
            tags: ["CLI", "Go", "PostgreSQL"],
            githubUrl: "https://github.com",
            liveUrl: "https://example.com"
          }
        ]
      }
    },
    {
      id: "skills_marcus",
      type: "SkillsCloud",
      title: "Tech Stack",
      order: 3,
      isVisible: true,
      props: {
        heading: "Engineering Stack",
        categories: [
          { name: "Backend", skills: ["Node.js", "Express", "GraphQL", "gRPC", "WebSockets"] },
          { name: "Database & Cloud", skills: ["MongoDB", "PostgreSQL", "Redis", "AWS", "Docker"] }
        ]
      }
    },
    {
      id: "contact_marcus",
      type: "ContactSection",
      title: "Contact",
      order: 4,
      isVisible: true,
      props: {
        heading: "Let's Discuss System Architecture",
        email: "marcus.vance@example.com",
        location: "Austin, TX · Remote",
        responseTime: "Responds within 12 hours"
      }
    }
  ]
};

export const ELENA_PORTFOLIO = {
  title: "Elena Rostova — Creative Director & Brand Strategist",
  handle: "sample",
  theme: { primaryColor: "#ec4899", secondaryColor: "#f59e0b" },
  components: [
    {
      id: "hero_elena",
      type: "HeroBanner",
      title: "Hero Section",
      order: 0,
      isVisible: true,
      props: {
        headline: "Defining Visual Identities for World-Class Brands",
        subheadline: "Creative Director with a decade of expertise directing brand campaigns, editorial publications, and high-impact digital experiences.",
        ctaText: "Explore Brand Campaigns",
        ctaLink: "#projects",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
        githubUrl: "https://github.com",
        linkedinUrl: "https://linkedin.com",
        twitterUrl: "https://twitter.com",
        availableForWork: true
      }
    },
    {
      id: "about_elena",
      type: "AboutMe",
      title: "About Me",
      order: 1,
      isVisible: true,
      props: {
        heading: "Where Emotion Meets Strategy",
        bio: "I lead multidisciplinary creative teams crafting iconic visual design systems, brand positioning, and interactive exhibitions for global fashion, art, and tech brands.",
        skills: ["Creative Direction", "Brand Identity", "Editorial Design", "3D Exhibition", "Art Direction", "Typography"],
        experienceYears: "10+",
        completedProjects: "80+",
        happyClients: "50+"
      }
    },
    {
      id: "projects_elena",
      type: "ProjectsGrid",
      title: "Selected Brand Campaigns",
      order: 2,
      isVisible: true,
      props: {
        heading: "Iconic Brand Campaigns",
        subheading: "Art direction and visual design systems produced for international fashion and tech clients.",
        items: [
          {
            id: "ep1",
            title: "Global Brand Identity System",
            description: "Comprehensive rebrand, custom typography, and physical collateral for an international fashion house.",
            imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80",
            tags: ["Brand Strategy", "Typography", "Art Direction"],
            githubUrl: "https://github.com",
            liveUrl: "https://example.com"
          },
          {
            id: "ep2",
            title: "Editorial Design Magazine",
            description: "Award-winning quarterly print & digital publication celebrating contemporary architecture and industrial design.",
            imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
            tags: ["Editorial", "Print", "Digital Publishing"],
            githubUrl: "https://github.com",
            liveUrl: "https://example.com"
          },
          {
            id: "ep3",
            title: "Interactive 3D Art Exhibition",
            description: "Immersive spatial experience combining physical light installations with real-time generative digital art.",
            imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
            tags: ["3D Design", "Generative Art", "Exhibition"],
            githubUrl: "https://github.com",
            liveUrl: "https://example.com"
          }
        ]
      }
    },
    {
      id: "testimonials_elena",
      type: "TestimonialsCarousel",
      title: "Client Praise",
      order: 3,
      isVisible: true,
      props: {
        heading: "Client & Industry Praise",
        items: [
          {
            id: "et1",
            quote: "Elena transformed our visual narrative. The brand direction she crafted instantly elevated our market presence worldwide.",
            author: "Sophia Laurent",
            role: "Chief Marketing Officer, Maison Luxe",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80"
          }
        ]
      }
    },
    {
      id: "contact_elena",
      type: "ContactSection",
      title: "Contact",
      order: 4,
      isVisible: true,
      props: {
        heading: "Inquire About Creative Direction",
        email: "elena.rostova@example.com",
        location: "New York & Paris · Remote",
        responseTime: "Responds within 24 hours"
      }
    }
  ]
};

export const SAMPLE_PORTFOLIO = ALEX_PORTFOLIO;
